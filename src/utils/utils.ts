import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import { gunzipSync } from 'zlib';
import { extract } from 'tar';
import { Logger } from './logger.js';
import { mkdir } from 'fs/promises';
import { Record } from '@web5/api';
// import { Convert } from '@web5/common';
import { createReadStream } from 'fs';

const execDir = process.cwd();
const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });
const trailingSlashRegex = /\/$/;
type QueryFilters = { name: string; version: string;[key: string]: string }
type DwnFetchEntry = Record & { encodedData: string }
type DwnFetchResponse = { status: { code: 200, detail: 'OK' }, entries: DwnFetchEntry[] }

// TODO: Refactor to be more dynamic and generic for handling all possible query filters
export function encodeURIQueryFilters(queryFilters: QueryFilters) {
  const { name, version } = queryFilters;
  const encodedName = encodeURIComponent(`filter.tags.name=${name}`);
  const encodedVersion = encodeURIComponent(`filter.tags.version=${version}`);
  return `${encodedName}&${encodedVersion}`;
}

export async function getDwnEndpoints(did: string) {
  Logger.log('getDwnEndpoints => did', did);
  const { didDocument } = await DidResolver.resolve(did);
  Logger.log('getDwnEndpoints => didDocument', JSON.stringify(didDocument, null, 2));
  const services = didDocument?.service;
  const didServiceEndpoint = services?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint ?? ['https://dwn.dpm.softare'];
  const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
  Logger.log('getDwnEndpoints => serviceEndpoints', serviceEndpoints);
  return serviceEndpoints.map(endpoint => endpoint.replace(trailingSlashRegex, ''));
}

export async function fetchResource(did: string, name: string, version: string): Promise<string> {
  Logger.log('fetchResource => did, name, version', did, name, version);
  const endpoints = await getDwnEndpoints(did);
  Logger.log('fetchResource => endpoints', endpoints);

  if (!endpoints?.length) {
    Logger.error('DWeb Node resolution error: no valid endpoints found');
    throw new Error('DWeb Node resolution failed: no valid endpoints found.');
  }

  for (const endpoint of endpoints) {
    Logger.log('fetchResource => endpoint', endpoint);
    const queryUrl = `${endpoint}/${did}/query?filter.tags.name=${name}&filter.tags.version=${version}`;
    Logger.log('fetchResource => queryUrl', queryUrl);
    const query: Response = await fetch(queryUrl);
    Logger.log('fetchResource => query', query);
    if (!query.ok) {
      Logger.log(`DWN endpoint error: ${query.status}`);
      continue;
    }
    const { status: qStatus, entries: qEntries } = await query.json() as DwnFetchResponse;
    Logger.log('fetchResource => qStatus', qStatus);
    Logger.log('fetchResource => qEntries', qEntries);
    const recordId = qEntries?.[0].id;
    // TODO: Add fetch(/read/recordId)
    const read: Response = await fetch(`${endpoint}/${did}/read/records/${recordId}`);
    Logger.log('fetchResource => read', read);
    const data = await read.json();
    Logger.log('fetchResource => data', data);
    // const dpackdata = new Blob([Convert.base64Url(dpack?.encodedData).toUint8Array()], { type: dpack.dataFormat });
    // Logger.log('fetchResource => dpackdata', dpackdata);
    const DMIpath = `file://${execDir}/node_modules/@${did}/${name}/${version}`;
    // const dpackage = await entries?.[0]?.data?.stream();
    // TODO: Add integrity check
    // TODO: Compute sha512 of package and compare to hash in lockfile
    Logger.log(`Writing DPK to DMI path ${DMIpath}`);
    await writeNodeModule(`@${did}`, name, version, dpackdata);
    Logger.log(`Successfully extracted to ${DMIpath}`);
    return DMIpath;
  }
  Logger.error('DWeb Node request failed: no valid response from any endpoint.');
  throw new Error('DWeb Node request failed: no valid response from any endpoint.');
}

export async function writeNodeModule(did: string, name: string, version: string, dpackage: Blob) {
  Logger.log('writeNodeModule => did, name, version, dpackage', did, name, version, dpackage);
  const arrayBuffer = await dpackage.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const decompressedBuffer = gunzipSync(buffer);
  Logger.log('records => record unzipped', decompressedBuffer);
  const dpmDir = `${execDir}/node_modules/${did}/${name}/${version}`;
  await mkdir(dpmDir, { recursive: true });
  const readStream = createReadStream(Buffer.from(decompressedBuffer));
  return new Promise((resolve, reject) => {
    readStream
      .pipe(extract({ cwd: dpmDir, strip: 1 }))
      .on('finish', resolve)
      .on('error', reject);
  });
}