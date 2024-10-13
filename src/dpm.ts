import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import { createWriteStream } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { REGISTRY_DIR } from './registry/config.js';
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
      const baseDRL = `${endpoint}/${did}/read/protocols/aHR0cHM6Ly9kcG0uc29mdHdhcmUvcHJvdG9jb2xzL2RwbQ`;
      const queryDRL = protocolPath === 'package'
        ? `${baseDRL}/${protocolPath}?filter.tags.name=${name}`
        : `${baseDRL}/${protocolPath}?filter.tags.version=${version}`;
      Logger.debug(`Querying DRL ${queryDRL} ...`);
      const query: Response = await fetch(queryDRL);
      if (!query || !query.ok) {
        Logger.error(`DWeb Node response error: ${query.status}`);
        continue;
      }
      const octetStream = query.headers.get('content-type') === 'application/octet-stream';
      const data = octetStream ? query : await query.json();
      Logger.debug('fetchDPK => data', data);
      if (!data) {
        Logger.error('DWeb Node request failed: no record data returned from read');
        continue;
      }
      // Handle the response based on content-type
      if (octetStream) {
        Logger.debug('Handling octet-stream tarball response');
        // Create a temporary tarball path
        const tarballPath = `${REGISTRY_DIR}/${name}/${version}/${name}-${version}.tgz`;
        // Pipe the octet-stream to a local file
        const fileStream = createWriteStream(tarballPath);
        await pipeline(query.body as ReadableStream<Uint8Array>, fileStream);
        Logger.debug('Tarball successfully saved to', tarballPath);
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