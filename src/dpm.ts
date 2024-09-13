import { UniversalResolver, DidDht, DidWeb } from '@web5/dids';
import { Resolution, ResolveContext } from './types.js';

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });
const didUrlRegex = /^https?:\/\/dweb\/([^/]+)\/?(.*)?$/;

async function getDwnEndpoints(did: string) {
  try {
    console.log('getDwnEndpoints did', did);
    const { didDocument } = await DidResolver.resolve(did);
    let endpoints = didDocument?.service?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint;
    return (Array.isArray(endpoints) ? endpoints : [endpoints]).filter(url => url.startsWith('https'));
  } catch (error) {
    console.log('getDwnEndpoints error', error);
  }
}

async function fetchResource(did: string, drl: string): Promise<Response> {
  console.log('fetchResource did, drl', did, drl);
  const endpoints = await getDwnEndpoints(did);
  console.log('fetchResource endpoints', endpoints);
  if (!endpoints?.length) {
    console.log('DWeb Node resolution failed: no valid endpoints found');
    throw new Error('DWeb Node resolution failed: no valid endpoints found.');
  }
  for (const endpoint of endpoints) {
    console.log('fetchResource endpoint', endpoint);
    try {
      const url = drl.replace('https://dweb/', endpoint);
      console.log('fetchResource url', url);
      const response = await fetch(url);
      console.log('fetchResource response', response);
      if (!response.ok) {
        console.log(`DWN endpoint error: ${response.status}`);
        continue;
      }
      return response;
    } catch (error) {
      console.log(`DWN endpoint error: ${error}`);
      throw new Error('DWeb Node request failed: ' + error);
    }
  }
  const failedToFetchResource = 'DWeb Node request failed: no valid response from any endpoint.';
  console.log(failedToFetchResource);
  throw new Error(failedToFetchResource);
}

/**
 * resolve is a built-in hook that allows you to intercept and modify the resolution of a module specifier.
 * Function that takes in a  (i.e. an import path) and detects a DMI, converts to a DRL and fetches the resource.
 * @param specifier either normal code import or DMI (e.g. did:dht:web5/api/0.0.1)
 * @param context pre-defined argument required for the resolve hook
 * @param defaultResolve pre-defined argument required for the resolve hook
 * @returns a promise that resolves to a Resolution object
 */
export async function resolve(
  specifier: string,
  context: ResolveContext,
  defaultResolve: Function
): Promise<Resolution> {
  if (specifier && specifier.startsWith('did:dht:')) {
    console.log('DMI detected', specifier);
    const [did, packageName, version] = specifier.split('/') ?? [];
    console.log('did, packageName, version', did, packageName, version);
    if(!(did && packageName && version)) {
      throw new Error('DMI resolution failed: invalid DMI format' + specifier);
    }
    const drl = `https://dweb/${did}/read/records/dpm/package?filter.tags.name="${packageName}"&filter.tags.version="${version}"`;
    console.log('DRL created', drl);
    const response = await fetchResource(did, drl);
    const data = await response.json();
    console.log('DPM resolved DMI to DWN record', data);
  }
  return defaultResolve(specifier, context, defaultResolve);
}

export async function load(url: string, context: any, defaultLoad: Function) {
  if (url.startsWith('https://dweb/')) {
    console.log('DRL detected', url);
    const did = url.match(didUrlRegex)?.[1];
    if(!did) {
      throw new Error('DRL parsing failed: invalid DRL format - no DID present' + url);
    }
    console.log('DID parsed', did);
  }
  return defaultLoad(url, context, defaultLoad);
}