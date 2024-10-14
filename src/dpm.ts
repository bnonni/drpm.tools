import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import { createWriteStream } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import DRL_READ_PROTOCOLS, { REGISTRY_DIR } from './registry/config.js';
import { Logger } from './utils/logger.js';
import { DpkRequest, DpkResponse, QueryFilters } from './utils/types.js';

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });
const trailingSlashRegex = /\/$/;

export async function findEntryPoint(modulePath: string): Promise<string> {
  const packageJsonPath = join('node_modules', modulePath, 'package.json');
  const packageJsonContent = await readFile(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonContent);
  const entryPoint = (packageJson.type === 'module' ? packageJson.module : packageJson.main) ?? packageJson.main;
  return entryPoint;
}

// TODO: Refactor to be more dynamic and generic for handling all possible query filters
export function encodeURIQueryFilters(queryFilters: QueryFilters): string {
  const { name, version } = queryFilters;
  const encodedName = encodeURIComponent(`filter.tags.name=${name}`);
  const encodedVersion = encodeURIComponent(`filter.tags.version=${version}`);
  return `${encodedName}&${encodedVersion}`;
}

export async function getDwnEndpoints(did: string) {
  const { didDocument } = await DidResolver.resolve(did);
  const services = didDocument?.service;
  const didServiceEndpoint = services?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint ?? ['http://localhost:3000/'];
  const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
  return serviceEndpoints.map(endpoint => endpoint.replace(trailingSlashRegex, ''));
}

export async function fetchDPK({ did, dpk: { name, version, protocolPath }}: DpkRequest): Promise<DpkResponse> {
  try {

    for (const endpoint of await getDwnEndpoints(did)) {
      const DRL = `${endpoint}/${did}/${DRL_READ_PROTOCOLS}/${protocolPath}?${
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
        const tarballPath = `${REGISTRY_DIR}/${name}/${version}/${name}-${version}.tgz`;
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