import { Record } from '@web5/api';
import { RegistryConnect } from '../../registry/connect.js';
import { RegistryUtils } from '../../registry/utils.js';
import { DidResolver } from '../did/resolver.js';
import { DrlBuilder } from '../dwn/drl-builder.js';
import dwn from '../dwn/protocol.js';
import { Logger } from '../logger.js';
import { ResponseUtils } from '../response.js';
import {
  CreatePackageParams,
  CreateReleaseParams,
  DpkData,
  DpkDwnResponse,
  DpkRequest,
  ReadPackageParams,
  ReadReleaseParams,
  RegistryResponse
} from '../types.js';

const { web5, did } = await RegistryConnect.connect();

// type CreatePackageDidWebParams = {metadata: any; did: string};

export class DManager {
  // Get DWeb Node endpoints from Did Doc on respective network based on DID Method
  static async getDwnEndpoints() {
    const { didDocument } = await DidResolver.resolve(did);
    Logger.info(`DManager: Resolved didDocument ${didDocument}`);
    const services = didDocument?.service;
    const didServiceEndpoint = services?.find(
      service => service.type === 'DecentralizedWebNode'
    )?.serviceEndpoint ?? (
      process.env.NODE_ENV === 'development'
        ? ['http://localhost:3000/']
        : ['https://dwn.drpm.tools']
    );
    const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
    return serviceEndpoints.map(endpoint => endpoint.replace(/\/$/, ''));
  }
  // Fetch DPK metadata from DWeb Node DRPM protocol at /package protocol path
  static async readPackage({ builder, name }: ReadPackageParams): Promise<RegistryResponse> {
    try {
      const drl = builder.buildDrlRead({ protocolPath: 'package', filters: { tags: [{ subKey: 'name', value: name }], }});
      Logger.debug(`DManager: Using DRL ${drl} to fetch DPK ${name} ...`);

      const response: Response = await fetch(drl);
      if (ResponseUtils.fetchFail(response)) {
        Logger.error('DManager: DWeb Node request failed', response);
        return RegistryUtils.routeFailure({ error: response.statusText });
      }

      const data: DpkDwnResponse = await response.json();
      if (!data) {
        Logger.error('DManager: DWeb Node request failed - no data', response);
        return RegistryUtils.routeFailure({ error: 'No data returned'});
      }
      // Logger.debug(`data`, data);

      return RegistryUtils.routeSuccess({ data });
    } catch(error: any) {
      Logger.error('DManager: DWeb Node request error catch', error);
      return RegistryUtils.routeFailure({ error: error.message });
    }
  }

  // Fetch DPK release from DWeb Node DRPM protocol at package/release protocol path
  static async readRelease({ builder, name, version }: ReadReleaseParams): Promise<RegistryResponse> {
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
        return RegistryUtils.routeFailure({ error: response.statusText });
      }

      Logger.debug(`DManager: DWeb Node request success`, response);

      if (response.headers.get('content-type') !== 'application/octet-stream') {
        Logger.error('DManager: DWeb Node request error - bad content-type', response);
        return RegistryUtils.routeFailure({ error: `Bad content-type: ${response.headers.get('content-type')}` });
      }

      const data = response.body;
      if (!data) {
        Logger.error('DManager: DWeb Node request failed - no data', response);
        return RegistryUtils.routeFailure({ error: 'No tarball data returned' });
      }

      // const tgzPath = await DRegistry.saveDpkTarball({ name: name.replace('@drpm/', '').split('~')[0], version, data });
      // if(!tgzPath) {
      //   Logger.error('DManager: Failed to save tarball');
      //   return RegistryUtils.routeFailure({ error: 'Failed to save tarball' });
      // }

      return RegistryUtils.routeSuccess({ data });
    } catch(error: any) {
      Logger.error('DManager: DWeb Node request failed', error);
      return RegistryUtils.routeFailure({ error: error.message });
    }
  }

  static async readBoth({ did, dpk: { name, version }}: DpkRequest): Promise<RegistryResponse> {
    try {
      const responses: DpkData = {};

      for(const path of ['package', 'package/release']) {
        const response: RegistryResponse = await this.readDpk({ did, dpk: { name, version, path }});

        if(ResponseUtils.fail(response)) {
          Logger.error(`DManager: DWeb Node ${path} request error`, response);
          return RegistryUtils.routeFailure({ error: response.error });
        }
        responses[path] = response.data;
      }

      return RegistryUtils.routeSuccess({ data: responses });
    } catch(error: any) {
      Logger.error('DManager: DWeb Node request error catch', error);
      return RegistryUtils.routeFailure({ error: error.message });
    }
  }

  // Fetch DPK from DWeb Node: either metadata or release
  static async readDpk({ did, dpk: { name, version, path }}: DpkRequest): Promise<RegistryResponse> {
    try {
      for (const endpoint of await this.getDwnEndpoints()) {
        Logger.info(`DManager: Fetching DPK ${name}@${version} from ${endpoint} ...`);

        const builder = DrlBuilder.create({ did, endpoint });
        const response: RegistryResponse = path === 'package/release' && version
          ?  await this.readRelease({ builder, name, version })
          : await this.readPackage({ builder, name });

        if (ResponseUtils.fail(response)) {
          Logger.error('DManager: Error during DWeb Node request, continuing ...', response);
          continue;
        }

        if(!response.data) {
          Logger.error('DManager: No data returned from DWeb Node request, continuing ...', response);
          continue;
        }

        return response;
      }

      return RegistryUtils.routeFailure({ error: 'All DWeb Node requests failed' });
    } catch(error: any) {
      Logger.error('DManager: Error catch during DWeb Node request', error);
      return RegistryUtils.routeFailure({ error: error.message });
    }
  }

  // static async createPackageDidWeb({ metadata, did }: CreatePackageDidWebParams): Promise<RegistryResponse> {
  //   try {
  //     // const userAgent = await Web5UserAgent.create();
  //     const _dwn = new DwnApi({
  //       agent : await Web5UserAgent.create(),
  //       did,
  //     });
  //     await RecordsWrite.create({
  //       data         : metadata,
  //       published    : true,
  //       dataFormat   : 'application/json',
  //       schema       : dwn.types.package.schema,
  //       protocolPath : 'package',
  //       protocol     : dwn.protocol,
  //       tags         : {
  //         name   : metadata.name,
  //         latest : metadata.version
  //       },
  //     });
  //     const {name, version} = metadata;
  //     for (const endpoint of await DManager.getDwnEndpoints(did)) {
  //       Logger.info(`DManager: Creating package record for ${name}@${version} at ${endpoint} ...`);

  //       const builder = DrlBuilder.create({ did, endpoint });
  //       const response: RegistryResponse = path === 'package' || !version
  //         ? await this.readPackage({ builder, name })
  //         : await this.readRelease({ builder, name, version });

  //       if (ResponseUtils.fail(response)) {
  //         Logger.error('DManager: Error during DWeb Node request, continuing ...', response);
  //         continue;
  //       }

  //       if(!response.data) {
  //         Logger.error('DManager: No data returned from DWeb Node request, continuing ...', response);
  //         continue;
  //       }

  //       return RegistryUtils.routeSuccess({ data: response });
  //     }

  //     return RegistryUtils.routeFailure({ error: 'All DWeb Node requests failed' });
  //   } catch(error: any) {
  //     Logger.error('DManager: Error catch during DWeb Node request', error);
  //     return RegistryUtils.routeFailure({ error: error.message });
  //   }
  // }

  static async createPackage({ metadata }: CreatePackageParams): Promise<RegistryResponse> {
    try {
      const { record, status: create } = await web5.dwn.records.create({
        store   : true,
        data    : metadata,
        message : {
          published    : true,
          dataFormat   : 'application/json',
          schema       : dwn.types.package.schema,
          protocolPath : 'package',
          protocol     : dwn.protocol,
          tags         : {
            name   : metadata.name,
            latest : metadata['dist-tags'].latest
          },
        },
      });

      if (ResponseUtils.dwnFail({ status: create })) {
        const error = 'Failed to create local package record - Failing DWN Status';
        Logger.error(`DManager: ${error}`, create);
        return RegistryUtils.routeFailure({ error: `${error}: ${create.detail}` });
      }

      if (!record) {
        const error = 'Failed to create local package record - No Record Returned';
        Logger.error(`DManager: ${error}`, create);
        return RegistryUtils.routeFailure({ error: `${error}: ${create.detail}` });
      }

      Logger.log('DManager: Package record created!', create);
      const data: Record = await record?.data.json();
      Logger.debug('DManager: Package record data parsed!', data);

      const { status: send } = await record.send(did);
      if (ResponseUtils.dwnFail({ status: send })) {
        const error = 'Failed to send remote package record - Failing DWN Status';
        Logger.error(`DManager: ${error}`, create);
        return RegistryUtils.routeFailure({ error: `${error}: ${create.detail}` });
      }
      Logger.debug('DManager: Package record sent!', send);
      return RegistryUtils.routeSuccess({ data: record.id });
    } catch (error: any) {
      Logger.error('DManager: Error catch during DWebNode records create', error);
      return RegistryUtils.routeFailure({ error: error.message });
    }
  }

  static async createPackageRelease({ parentId, name, version, integrity, release }: CreateReleaseParams): Promise<RegistryResponse> {
    try {
      const { record = null, status } = await web5.dwn.records.create({
        data    : release,
        store   : true,
        message : {
          published       : true,
          parentContextId : parentId,
          dataFormat      : 'application/octet-stream',
          schema          : dwn.types.release.schema,
          protocolPath    : 'package/release',
          protocol        : dwn.protocol,
          tags            : { name, version, integrity }
        },
      });
      if (ResponseUtils.dwnFail({ status })) {
        const error = 'Failed to create local release record - Failing DWN Status';
        Logger.error(`DManager: ${error}`, status);
        return RegistryUtils.routeFailure({ error: `${error}: ${status.detail}` });
      }

      if (!record) {
        const error = 'Failed to create local release record - No Record Returned';
        Logger.error(`DManager: ${error}`, status);
        return RegistryUtils.routeFailure({ error: `${error}: ${status.detail}` });
      }

      Logger.log('DManager: Release record created in local!', status);

      const { status: send } = await record.send(did);
      if (ResponseUtils.dwnFail({ status: send })) {
        const error = 'Failed to send release record to remote - Failed Send Status';
        Logger.error(`DManager: ${error}`, send);
        return RegistryUtils.routeFailure({ error: `${error}: ${send.detail}` });
      }
      Logger.debug('DManager: Release record sent to remote!', send);
      return RegistryUtils.routeSuccess({ data: record });
    } catch (error: any) {
      Logger.error('DManager: Error catch during DWebNode records create', error);
      return RegistryUtils.routeFailure({ error: error.message });
    }
  }
}