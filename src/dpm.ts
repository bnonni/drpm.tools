import { UniversalResolver, DidDht, DidWeb } from '@web5/dids';
import { Resolution, ResolveContext } from './types.js';

const DidResolver = new UniversalResolver({ didResolvers: [DidDht, DidWeb] });
const didUrlRegex = /^https?:\/\/dweb\/([^/]+)\/?(.*)?$/;
// const httpToHttpsRegex = /^http:/;
const trailingSlashRegex = /\/$/;

async function getDwnEndpoints(did: string) {
  const { didDocument } = await DidResolver.resolve(did);
  let endpoints = didDocument?.service?.find(service => service.type === 'DecentralizedWebNode')?.serviceEndpoint;
  return (Array.isArray(endpoints) ? endpoints : [endpoints]).filter(url => url.startsWith('http'));
}

async function fetchResource(did: string, drl: string) {
  const endpoints = await getDwnEndpoints(did);
  if (!endpoints?.length) {
    throw new Error('DWeb Node resolution failed: no valid endpoints found.');
  }
  for (const endpoint of endpoints) {
    try {
      const url = drl.replace('https://dweb/', endpoint.replace(trailingSlashRegex, ''));
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
      console.log(`DWN endpoint error: ${response.status}`);
      return new Error('DWeb Node request failed');
    }
    catch (error) {
      console.log(`DWN endpoint error: ${error}`);
      return new Error('DWeb Node request failed: ' + error);
    }
  }
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
  if (specifier.startsWith('did:dht:')) {
    console.log('DMI detected', specifier);
    const [did, packageName, version] = specifier.split('/') ?? [];
    if(!(did && packageName && version)) {
      throw new Error('DMI resolution failed: invalid DMI format' + specifier);
    }
    const drl = `https://dweb/${did}/read/records/dpm/package?filter.tags.name="${packageName}"&filter.tags.version="${version}"`;
    console.log('DRL created', drl);
    return { url: drl, shortCircuit: true };
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
    return await fetchResource(did, url);
  }
  return defaultLoad(url, context, defaultLoad);
}