import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { DRPM_DWN_URL } from '../../config.js';
import { DpkRegistry } from './dpk-registry.js';
import { Logger } from '../logger.js';
import { Dpk, DpkRequest, DpkResponse } from '../types.js';
import { DrlBuilder } from '../drpm/drl-builder.js';
import { ResponseUtils } from '../drpm/dwn-response.js';

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });

export class DpkManager {
  // Get DWeb Node endpoints from Did Doc on respective network based on DID Method
  static async getDwnEndpoints(did: string) {
    const { didDocument } = await DidResolver.resolve(did);
    const services = didDocument?.service;
    const didServiceEndpoint = services?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint ?? [DRPM_DWN_URL];
    const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
    return serviceEndpoints.map(endpoint => endpoint.replace(/\/$/, ''));
  }

  // Fetch DPK metadata from DWeb Node DRPM protocol at /package protocol path
  static async fetchPackage({ drl, name, version }: Dpk & { drl: string; }): Promise<DpkResponse> {
    try {
      const query: Response = await fetch(drl);
      if (!query || !query.ok) {
        Logger.error(`DWeb Node response error: ${query.status}`);
        return { ok: false, code: 404, status: 'Not found' };
      }

      const data = await query.json();
      Logger.debug('fetchDPK => data', data);

      if (!data) {
        Logger.error(new Error('DWeb Node request failed: No data returned'));
        return { ok: false, code: 404, status: 'Not found' };
      }

      if(!await DpkRegistry.saveDpkMetadata({name, version, data})) {
        Logger.error('DRg Error: metadata not saved');
        return { ok: false, code: 500, status: 'Not found', message: 'Dpk metadata not saved' };
      }

      return { ok: true, code: 200, status: 'OK', message: data };
    } catch(error: any) {
      Logger.error('DWeb Node request failed:', error);
      return { ok: false, code: 500, status: 'Server error', message: error.message };
    }
  }

  // Fetch DPK release from DWeb Node DRPM protocol at package/release protocol path
  static async fetchPackageRelease({ drl, name, version }: Dpk & { drl: string; }): Promise<DpkResponse> {
    try {
      const query: Response = await fetch(drl);
      if (!query || !query.ok) {
        Logger.error(`DWeb Node response error: ${query.status}`);
        return { ok: false, code: 404, status: 'Not found' };
      }
      const isOctetStream = query.headers.get('content-type') === 'application/octet-stream';
      const data = isOctetStream ? query : await query.json();
      Logger.debug('fetchDPK => data', data);

      if (!data) {
        Logger.error(new Error('DWeb Node request failed: No data returned'));
        return { ok: false, code: 404, status: 'Not found' };
      }

      Logger.debug('Handling octet-stream tarball response');
      const tarballPath = DpkRegistry.getDpkTarballPath({name, version});
      await pipeline(query.body as ReadableStream<Uint8Array>, createWriteStream(tarballPath));
      Logger.debug(`Tarball successfully saved to ${tarballPath}`);
      return { ok: true, code: 200, status: 'OK', message: tarballPath };
    } catch(error: any) {
      Logger.error('DWeb Node request failed:', error);
      return { ok: false, code: 500, status: 'Server error', message: error.message };
    }
  }

  static async fetchBoth({ did, dpk: { name, version }}: DpkRequest): Promise<DpkResponse> {
    const responses: {[key: string]: any} = {
      'package'           : null,
      'package/release' : null
    };
    for(const path of ['package', 'package/release']) {
      const { ok, code, status, message } = await this.fetchDpk({ did, dpk: { name, version, path }});
      if(ok) responses.metadata = message;
      if(ResponseUtils.fail({ ok, code, status })) {
        const fetchError = `Error fetching ${path} for ${name}@${version}`;
        Logger.error(fetchError, message);
        return { ok: false, code: 404, status: 'Not found', message: `${fetchError}: ${message}` };
      }
      responses[path] = message;
    }
    return { ok: true, code: 200, status: 'OK', message: responses };
  }

  // Fetch DPK from DWeb Node: either metadata or release
  static async fetchDpk({ did, dpk: { name, version, path }}: DpkRequest): Promise<DpkResponse> {
    try {
      for (const endpoint of await this.getDwnEndpoints(did)) {
        const builder = DrlBuilder.create({ endpoint, did });
        const drl = path === 'package'
          ? builder.buildPackageDrl({ name, version })
          : builder.buildPackageReleaseDrl({ name, version });
        Logger.debug(`Fetching DPK ${name} release v${version} from DRL ${drl} ...`);
        const response: DpkResponse = path === 'package'
          ? await this.fetchPackage({ drl, name, version })
          : await this.fetchPackageRelease({ drl, name, version });
        if (!response || !response.ok) {
          Logger.error(`DWeb Node response error: ${response.status}`, response?.message);
          continue;
        }
        if(!response.message) {
          Logger.error(new Error('DWeb Node request failed: No data returned'));
          continue;
        }
        return { ok: true, code: 200, status: 'OK', message: response };
      }
      return { ok: false, code: 404, status: 'Not found' };
    } catch(error: any) {
      Logger.error('DWeb Node request failed:', error);
      return { ok: false, code: 500, status: 'Server error', message: error.message };
    }
  }
}