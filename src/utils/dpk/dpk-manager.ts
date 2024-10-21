import { DidDht, DidResolutionOptions, DidResolutionResult, DidWeb, UniversalResolver } from '@web5/dids';
import { DRPM_DWN_URL } from '../../config.js';
import { DrgRouteUtils } from '../drpm/drg-route-utils.js';
import { DrlBuilder } from '../drpm/drl-builder.js';
import { ResponseUtils } from '../drpm/dwn-response.js';
import { Logger } from '../logger.js';
import { DpkData, DpkDwnResponse, DpkRequest, DrgResponse } from '../types.js';
import { DpkRegistry } from './dpk-registry.js';

// TODO: Add DID BTC resolver
export class DidBtc {
  public static methodName = 'btc';
  public static async resolve(didUri: string, _options?: DidResolutionOptions): Promise<DidResolutionResult> {
    return await DidDht.resolve(didUri);
  }
}

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb, DidBtc] });;

// const DID_METHODS_SUPPORTED: any = [DidDht, DidWeb, DidBtc];
const DID_METHOD_MAP: any = {};

export class DrpmResolver {
  public didResolvers: Array<any> = [DidDht, DidWeb, DidBtc];
  public universalResolver;

  constructor() {
    this.universalResolver  = new UniversalResolver({ didResolvers: this.didResolvers });;
  }

  public addMethod(method: string): UniversalResolver {
    this.didResolvers.push(DID_METHOD_MAP[method]);
    return this.universalResolver = new UniversalResolver({ didResolvers: this.didResolvers });
  }
}

export class DpkManager {
  // Get DWeb Node endpoints from Did Doc on respective network based on DID Method
  static async getDwnEndpoints(did: string) {
    Logger.info(`DpkManager: DidResolver`, DidResolver);
    const resolution = await DidResolver.resolve(did);
    Logger.info(`DpkManager: resolution ${resolution}`);
    const { didDocument } = resolution;
    Logger.info(`DpkManager: Resolved didDocument ${didDocument}`);
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
  static async fetchPackage({ builder, name }: {builder: DrlBuilder; name: string;}): Promise<DrgResponse> {
    try {
      const drl = builder.buildDrlQuery({ filters: { protocolPath: 'package' }});
      Logger.debug(`DpkManager: Using DRL ${drl} to fetch DPK ${name} ...`);

      const response: Response = await fetch(drl);
      if (ResponseUtils.fetchFail(response)) {
        Logger.error('DpkManager: DWeb Node request failed', response);
        return DrgRouteUtils.routeFailure({ error: response.statusText });

      }
      Logger.debug(`DpkManager: DWeb Node response=`, response);

      const data: DpkDwnResponse = await response.json();
      if (!data) {
        Logger.error('DpkManager: DWeb Node request failed - no data', response);
        return DrgRouteUtils.routeFailure({ error: 'No data returned'});
      }
      Logger.debug(`DpkManager: DWeb Node response data=`, data);

      const { entries } = data ?? {};
      if (!entries || !entries.length){
        return DrgRouteUtils.routeFailure({ error: 'No entries found' });
      }

      const entry = entries.length > 1
        ? (entries.sort((a, b) => a.descriptor.dateCreated > b.descriptor.dateCreated ? -1 : 1))?.pop()
        : entries?.pop();

      if (!entry) {
        return DrgRouteUtils.routeFailure({ error: 'No entry found' });
      }

      const {latest: version, name: packageName} = entry?.descriptor.tags;

      if (!version) {
        Logger.error(`DpkManager: No latest version ${version}`, response);
      } else if (name !== packageName) {
        Logger.error(`DpkManager: Response name ${packageName} does not match requested name ${name}`, response);
      }

      return DrgRouteUtils.routeSuccess({ data: entry });
    } catch(error: any) {
      Logger.error('DpkManager: DWeb Node request error catch', error);
      return DrgRouteUtils.routeFailure({ error: error.message });
    }
  }

  // Fetch DPK release from DWeb Node DRPM protocol at package/release protocol path
  static async fetchPackageRelease(
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

      Logger.debug(`DpkManager: Using DRL ${drl} to fetch DPK ${name}@${version} ...`);

      const response: Response = await fetch(drl);
      if (ResponseUtils.fetchFail(response)) {
        Logger.error('DpkManager: DWeb Node request error', response);
        return DrgRouteUtils.routeFailure({ error: response.statusText });
      }
      Logger.debug(`DpkManager: DWeb Node request success`, response);
      if (response.headers.get('content-type') !== 'application/octet-stream') {
        Logger.error('DpkManager: DWeb Node request error - bad content-type', response);
        return DrgRouteUtils.routeFailure({ error: `Bad content-type: ${response.headers.get('content-type')}` });
      }

      const data = response.body;
      if (!data) {
        Logger.error('DpkManager: DWeb Node request failed - no data', response);
        return DrgRouteUtils.routeFailure({ error: 'No tarball data returned' });
      }

      if(!await DpkRegistry.saveDpkTarball({ name, version, data })) {
        Logger.error('DpkManager: Failed to save tarball');
        return DrgRouteUtils.routeFailure({ error: 'Failed to save tarball' });
      }

      return DrgRouteUtils.routeSuccess({ data: response });
    } catch(error: any) {
      Logger.error('DpkManager: DWeb Node request failed', error);
      return DrgRouteUtils.routeFailure({ error: error.message });
    }
  }

  static async fetchBoth({ did, dpk: { name, version }}: DpkRequest): Promise<DrgResponse> {
    try {
      const responses: DpkData = {};

      for(const path of ['package', 'package/release']) {
        const response: DrgResponse = await this.fetchDpk({ did, dpk: { name, version, path }});

        if(ResponseUtils.fail(response)) {
          Logger.error(`DpkManager: DWeb Node ${path} request error`, response);
          return DrgRouteUtils.routeFailure({ error: response.error });
        }
        responses[path] = response.data;
      }

      return DrgRouteUtils.routeSuccess({ data: responses });
    } catch(error: any) {
      Logger.error('DpkManager: DWeb Node request error catch', error);
      return DrgRouteUtils.routeFailure({ error: error.message });
    }
  }

  // Fetch DPK from DWeb Node: either metadata or release
  static async fetchDpk({ did, dpk: { name, version, path }}: DpkRequest): Promise<DrgResponse> {
    try {
      for (const endpoint of await DpkManager.getDwnEndpoints(did)) {
        Logger.info(`DpkManager: Fetching DPK ${name}@${version} from ${endpoint} ...`);

        const builder = DrlBuilder.create({ did, endpoint });
        const response: DrgResponse = path === 'package' || !version
          ? await this.fetchPackage({ builder, name })
          : await this.fetchPackageRelease({ builder, name, version });

        if (ResponseUtils.fail(response)) {
          Logger.error('DpkManager: Error during DWeb Node request, continuing ...', response);
          continue;
        }

        if(!response.data) {
          Logger.error('DpkManager: No data returned from DWeb Node request, continuing ...', response);
          continue;
        }

        return DrgRouteUtils.routeSuccess({ data: response });
      }

      return DrgRouteUtils.routeFailure({ error: 'All DWeb Node requests failed' });
    } catch(error: any) {
      Logger.error('DpkManager: Error catch during DWeb Node request', error);
      return DrgRouteUtils.routeFailure({ error: error.message });
    }
  }
}