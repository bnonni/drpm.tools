import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import { mkdir } from 'fs/promises';
import * as tar from 'tar';
import * as zlib from 'zlib';

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });
const trailingSlashRegex = /\/$/;
type QueryFilters = { packageName: string; version: string; [key: string]: string }

// TODO: Refactor to be more dynamic and generic for handling all possible query filters
export function encodeURIQueryFilters(queryFilters: QueryFilters) {
  const { packageName, version } = queryFilters;
  const encodedName = encodeURIComponent(`filter.tags.name=${packageName}`);
  const encodedVersion = encodeURIComponent(`filter.tags.version=${version}`);
  return `${encodedName}&${encodedVersion}`;
}

export async function getDwnEndpoints(did: string) {
  try {
    console.log('getDwnEndpoints did', did);
    const { didDocument } = await DidResolver.resolve(did);
    console.log('getDwnEndpoints didDocument', didDocument);
    const services = didDocument?.service;
    const didServiceEndpoint = services?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint ?? ['https://dwn.dpm.softare'];
    const serviceEndpoints = Array.isArray(didServiceEndpoint) ? didServiceEndpoint : [didServiceEndpoint];
    console.log('getDwnEndpoints serviceEndpoints', serviceEndpoints);
    return serviceEndpoints.map(endpoint => endpoint.replace(trailingSlashRegex, ''));
  } catch (error) {
    console.error('getDwnEndpoints error', error);
    throw new Error('DWeb Node endpoints resolution failed: ' + error);
  }
}

export async function fetchResource(did: string, packageName: string, version: string): Promise<string> {
  console.log('fetchResource: did, packageName, version', did, packageName, version);
  const endpoints = await getDwnEndpoints(did);
  console.log('fetchResource endpoints', endpoints);

  if (!endpoints?.length) {
    console.error('DWeb Node resolution failed: no valid endpoints found');
    throw new Error('DWeb Node resolution failed: no valid endpoints found.');
  }

  for (const endpoint of endpoints) {
    console.log('fetchResource for endpoint', endpoint);
    try {
      const url = `${endpoint}/${encodeURIComponent(did)}/query?${encodeURIQueryFilters({ packageName, version })}`;
      console.log('fetchResource from:', url);
      const response = await fetch(url);
      console.log('fetchResource response', response);
      if (!response.ok) {
        console.log(`DWN endpoint error: ${response.status}`);
        continue;
      }
      const data = await response.json();
      console.log('fetchResource data', data);
      // TODO: Add integrity check; grab integrity hash from response data and compare to hash in lockfile
      const { code, name: dPackageName, version: dVersion, /*integrity*/ } = data;
      const tgzBuffer = Buffer.from(code.data);
      const unzipped = zlib.gunzipSync(tgzBuffer);

      const drl = `${process.cwd()}/node_modules/${did}/${dPackageName}/${dVersion}`;
      console.log('fetchResource: mkdir', drl);
      await mkdir(drl, { recursive: true });
      writeNodeModule(drl, unzipped);
      return drl;
    } catch (error) {
      console.log(`DWN endpoint error: ${error}`);
      throw new Error('DWeb Node request failed: ' + error);
    }
  }

  console.error('DWeb Node request failed: no valid response from any endpoint.');
  throw new Error('DWeb Node request failed: no valid response from any endpoint.');
}

export function writeNodeModule(drl: string, data: any) {
  try {
    console.log('writeNodeModule: writing code to', drl);
    tar.extract({
      cwd   : drl, // Extract to the target directory
      strip : 1, // Remove the root folder from the tarball path
    }).end(data);
    console.log(`Successfully extracted to ${drl}`);
  } catch (error) {
    console.error('Error extracting the tarball:', error);
  }
}