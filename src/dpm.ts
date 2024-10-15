import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { DRG_DIR_PATH, DRPM_DWN_URL, DRL_PROTOCOL_PARAM } from './config.js';
import { Logger } from './utils/logger.js';
import { DpkRequest, DpkResponse } from './utils/types.js';

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });
const trailingSlashRegex = /\/$/;

export async function getDwnEndpoints(did: string) {
  const { didDocument } = await DidResolver.resolve(did);
  const services = didDocument?.service;
  const didServiceEndpoint = services?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint ?? [DRPM_DWN_URL];
  const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
  return serviceEndpoints.map(endpoint => endpoint.replace(trailingSlashRegex, ''));
}

export async function fetchDPK({ did, dpk: { name, version, protocolPath }}: DpkRequest): Promise<DpkResponse> {
  try {
    for (const endpoint of await getDwnEndpoints(did)) {
      const DRL = `${endpoint}/${did}/${DRL_PROTOCOL_PARAM}/${protocolPath}?${
        protocolPath === 'package'
          ? `filter.tags.name=${name}`
          : `filter.tags.version=${version}`
      }`;

      Logger.debug(`Fetching DPK ${name}@${version} from DRL ${DRL} ...`);

      const query: Response = await fetch(DRL);
      if (!query || !query.ok) {
        Logger.error(`DWeb Node response error: ${query.status}`);
        continue;
      }
      const isOctetStream = query.headers.get('content-type') === 'application/octet-stream';
      const data = isOctetStream ? query : await query.json();
      Logger.debug('fetchDPK => data', data);

      if (!data) {
        Logger.error(new Error('DWeb Node request failed: No data returned'));
        continue;
      }

      if (isOctetStream) {
        Logger.debug('Handling octet-stream tarball response');
        const tarballPath = `${DRG_DIR_PATH}/${name}/${version}/${name}-${version}.tgz`;
        await pipeline(query.body as ReadableStream<Uint8Array>, createWriteStream(tarballPath));
        Logger.debug(`Tarball successfully saved to ${tarballPath}`);
        return { ok: true, code: 200, status: 'OK', message: tarballPath };
      }

      return { ok: true, code: 200, status: 'OK', message: data };
    }
    return { ok: false, code: 404, status: 'Not found' };
  } catch(error: any) {
    Logger.error('DWeb Node request failed:', error);
    return { ok: false, code: 500, status: 'Server error', message: error.message };
  }
}