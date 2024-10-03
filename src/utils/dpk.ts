import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import { mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { extract } from 'tar';
import { Logger } from './logger.js';
import { DwnResponse, QueryFilters } from './types.js';

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });
const trailingSlashRegex = /\/$/;

export async function findEntryPoint(modulePath: string): Promise<string> {
  Logger.debug('findEntryPoint => modulePath', modulePath);
  const packageJsonPath = join('node_modules', modulePath, 'package.json');
  Logger.debug('findEntryPoint => packageJsonPath', packageJsonPath);
  const packageJsonContent = await readFile(packageJsonPath, 'utf8');
  Logger.debug('findEntryPoint => packageJsonContent', packageJsonContent);
  const packageJson = JSON.parse(packageJsonContent);
  Logger.debug('findEntryPoint => packageJson', packageJson);
  const entryPoint = (packageJson.type === 'module' ? packageJson.module : packageJson.main) ?? packageJson.main;
  Logger.debug('findEntryPoint => entryPoint', entryPoint);
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
  Logger.debug('getDwnEndpoints => did', did);
  const { didDocument } = await DidResolver.resolve(did);
  Logger.debug('getDwnEndpoints => didDocument', JSON.stringify(didDocument, null, 2));
  const services = didDocument?.service;
  const didServiceEndpoint = services?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint ?? ['https://dwn.dpm.softare'];
  const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
  Logger.debug('getDwnEndpoints => serviceEndpoints', serviceEndpoints);
  return serviceEndpoints.map(endpoint => endpoint.replace(trailingSlashRegex, ''));
}

export async function fetchDPK(did: string, name: string, version: string): Promise<{ dmi: string; drl: string; dph: string }> {
  Logger.debug('fetchDPK => did, name, version', did, name, version);
  const endpoints = await getDwnEndpoints(did);
  Logger.debug('fetchDPK => endpoints', endpoints);

  if (!endpoints?.length) {
    Logger.error('DWeb Node resolution error: no valid endpoints found');
    throw new Error('DWeb Node resolution failed: no valid endpoints found.');
  }

  for (const endpoint of endpoints) {
    Logger.debug('fetchDPK => endpoint', endpoint);

    const baseDRL = `${endpoint}/${did}`;
    // Query endpoint for record
    const queryDRL = `${baseDRL}/query?filter.tags.name=${name}&filter.tags.version=${version}`;
    const query: Response = await fetch(queryDRL);
    Logger.debug(`Querying from DRL ${queryDRL} ...`);
    if (!query.ok) {
      Logger.error(`DWeb Node response error: ${query.status}`);
      continue;
    }
    const { status, entries } = await query.json() as DwnResponse;
    Logger.debug('fetchDPK => status', status);
    Logger.debug('fetchDPK => entries', entries);
    if (entries.length > 1) {
      Logger.error('DWeb Node response error: expected one record entry, received multiple');
      continue;
    }

    const entry = entries.shift();
    Logger.debug('fetchDPK => entry', entry);
    if (!entry) {
      Logger.error('DWeb Node response error: no record entry returned from query');
      continue;
    }
    const { recordId, descriptor } = entry ?? {};
    const drl = `${baseDRL}/read/records/${recordId}`;
    Logger.info(`Reading from DRL ${drl} ...`);
    const read: Response = await fetch(drl);
    if (!read.ok) {
      Logger.error(`DWeb Node response error: ${read.status}`);
      continue;
    }
    Logger.debug('fetchDPK => read, typeof read', read, typeof read);

    const dpk = read.body as ReadableStream<Uint8Array>;
    if (!dpk) {
      Logger.error('DWeb Node request failed: no record data returned from read');
      continue;
    }
    Logger.debug('fetchDPK => dpk', dpk);

    const dmi = `node_modules/${name}`;
    Logger.info(`Writing DPK to DMI path ${dmi}`);
    await mkdir(dmi, { recursive: true });
    await pipeline(dpk, extract({ C: dmi, strip: 1 }));

    Logger.info(`Successfully read DPK from DRL ${drl}`);
    Logger.info(`Successfully extracted DPK to DMI ${dmi}`);
    return { drl, dmi, dph: descriptor.tags.integrity };
  }
  Logger.error('DWeb Node request failed: no valid response from any endpoint.');
  throw new Error('DWeb Node request failed: no valid response from any endpoint.');
}