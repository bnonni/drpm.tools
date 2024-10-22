import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import { DRPM_DWN_URL } from '../../config.js';
import { DrgRoutes } from '../drg-routes.js';
import { DrlBuilder } from '../drl-builder.js';
import { ResponseUtils } from '../response.js';
import { Logger } from '../logger.js';
import { DpkData, DpkDwnResponse, DpkRequest, DrgResponse } from '../types.js';
import { DRegistry } from './registry.js';
import { DidBtc } from '../did-btc.js';

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb, DidBtc] });

export class DManager {
  // Get DWeb Node endpoints from Did Doc on respective network based on DID Method
  static async getDwnEndpoints(did: string) {
    Logger.info(`DManager: DidResolver`, DidResolver);
    const resolution = await DidResolver.resolve(did);
    Logger.info(`DManager: resolution ${resolution}`);
    const { didDocument } = resolution;
    Logger.info(`DManager: Resolved didDocument ${didDocument}`);
    const services = didDocument?.service;
    const didServiceEndpoint = services?.find(
      service => service.type === 'DecentralizedWebNode'
    )?.serviceEndpoint ?? (
      process.env.NODE_ENV === 'development'
        ? ['http://localhost:3000']
        : [DRPM_DWN_URL]
    );
    const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
    return serviceEndpoints.map(endpoint => endpoint.replace(/\/$/, ''));
  }

  // Fetch DPK metadata from DWeb Node DRPM protocol at /package protocol path
  static async getPackage({ builder, name }: {builder: DrlBuilder; name: string;}): Promise<DrgResponse> {
    try {
      const drl = builder.buildDrlQuery({ filters: { protocolPath: 'package' }});
      Logger.debug(`DManager: Using DRL ${drl} to fetch DPK ${name} ...`);

      const response: Response = await fetch(drl);
      if (ResponseUtils.fetchFail(response)) {
        Logger.error('DManager: DWeb Node request failed', response);
        return DrgRoutes.routeFailure({ error: response.statusText });

      }
      Logger.debug(`DManager: DWeb Node response=`, response);

      const data: DpkDwnResponse = await response.json();
      if (!data) {
        Logger.error('DManager: DWeb Node request failed - no data', response);
        return DrgRoutes.routeFailure({ error: 'No data returned'});
      }
      Logger.debug(`DManager: DWeb Node response data=`, data);

      const { entries } = data ?? {};
      if (!entries || !entries.length){
        return DrgRoutes.routeFailure({ error: 'No entries found' });
      }

      const entry = entries.length > 1
        ? (entries.sort((a, b) => a.descriptor.dateCreated > b.descriptor.dateCreated ? -1 : 1))?.pop()
        : entries?.pop();

      if (!entry) {
        return DrgRoutes.routeFailure({ error: 'No entry found' });
      }

      const {latest: version, name: packageName} = entry?.descriptor.tags;

      if (!version) {
        Logger.error(`DManager: No latest version ${version}`, response);
      } else if (name !== packageName) {
        Logger.error(`DManager: Response name ${packageName} does not match requested name ${name}`, response);
      }

      return DrgRoutes.routeSuccess({ data: entry });
    } catch(error: any) {
      Logger.error('DManager: DWeb Node request error catch', error);
      return DrgRoutes.routeFailure({ error: error.message });
    }
  }

  // Fetch DPK release from DWeb Node DRPM protocol at package/release protocol path
  static async getPackageRelease(
    { builder, name, version }: {builder: DrlBuilder; name: string; version: string }
  ): Promise<DrgResponse> {
    try {
      const drl = builder.buildDrlRead({
        protocolPath : 'package/release',
        filters      : {
          tags    : [
            { subKey: 'name', value: name },
            { subKey: 'version', value: version }
          ],
        }
      });

      Logger.debug(`DManager: Using DRL ${drl} to fetch DPK ${name}@${version} ...`);

      const response: Response = await fetch(drl);
      if (ResponseUtils.fetchFail(response)) {
        Logger.error('DManager: DWeb Node request error', response);
        return DrgRoutes.routeFailure({ error: response.statusText });
      }
      Logger.debug(`DManager: DWeb Node request success`, response);
      if (response.headers.get('content-type') !== 'application/octet-stream') {
        Logger.error('DManager: DWeb Node request error - bad content-type', response);
        return DrgRoutes.routeFailure({ error: `Bad content-type: ${response.headers.get('content-type')}` });
      }

      const data = response.body;
      if (!data) {
        Logger.error('DManager: DWeb Node request failed - no data', response);
        return DrgRoutes.routeFailure({ error: 'No tarball data returned' });
      }

      if(!await DRegistry.saveDpkTarball({ name, version, data })) {
        Logger.error('DManager: Failed to save tarball');
        return DrgRoutes.routeFailure({ error: 'Failed to save tarball' });
      }

      return DrgRoutes.routeSuccess({ data: response });
    } catch(error: any) {
      Logger.error('DManager: DWeb Node request failed', error);
      return DrgRoutes.routeFailure({ error: error.message });
    }
  }

  static async getMetadataRelease({ did, dpk: { name, version }}: DpkRequest): Promise<DrgResponse> {
    try {
      const responses: DpkData = {};

      for(const path of ['package', 'package/release']) {
        const response: DrgResponse = await this.getDpk({ did, dpk: { name, version, path }});

        if(ResponseUtils.fail(response)) {
          Logger.error(`DManager: DWeb Node ${path} request error`, response);
          return DrgRoutes.routeFailure({ error: response.error });
        }
        responses[path] = response.data;
      }

      return DrgRoutes.routeSuccess({ data: responses });
    } catch(error: any) {
      Logger.error('DManager: DWeb Node request error catch', error);
      return DrgRoutes.routeFailure({ error: error.message });
    }
  }

  // Fetch DPK from DWeb Node: either metadata or release
  static async getDpk({ did, dpk: { name, version, path }}: DpkRequest): Promise<DrgResponse> {
    try {
      for (const endpoint of await DManager.getDwnEndpoints(did)) {
        Logger.info(`DManager: Fetching DPK ${name}@${version} from ${endpoint} ...`);

        const builder = DrlBuilder.create({ did, endpoint });
        const response: DrgResponse = path === 'package' || !version
          ? await this.getPackage({ builder, name })
          : await this.getPackageRelease({ builder, name, version });

        if (ResponseUtils.fail(response)) {
          Logger.error('DManager: Error during DWeb Node request, continuing ...', response);
          continue;
        }

        if(!response.data) {
          Logger.error('DManager: No data returned from DWeb Node request, continuing ...', response);
          continue;
        }

        return DrgRoutes.routeSuccess({ data: response });
      }

      return DrgRoutes.routeFailure({ error: 'All DWeb Node requests failed' });
    } catch(error: any) {
      Logger.error('DManager: Error catch during DWeb Node request', error);
      return DrgRoutes.routeFailure({ error: error.message });
    }
  }
}