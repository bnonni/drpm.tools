import { Resolution, ResolveContext } from './types.js';
import { fetchResource } from './utils.js';

const didUrlRegex = /^https?:\/\/dweb\/([^/]+)\/?(.*)?$/;

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
    const drl = `https://dweb/did:dht:sjqxjhiw6q7s6m4z34erj43e5w8dxztf6h9gdmtk767wpwt4a5ky/read/records/package?filter.tags.name="${packageName}"&filter.tags.version="${version}"`;
    console.log('DRL created', drl);
    const data = await fetchResource(did, drl, specifier);
    console.log('DPM resolved DMI to DWN record', data);
  }
  return defaultResolve(specifier, context, defaultResolve);
}

export function encodeURI(url: string) {
  const baseUrl = 'https://dwn.nonni.org/did:dht:sjqxjhiw6q7s6m4z34erj43e5w8dxztf6h9gdmtk767wpwt4a5ky/query';
  const filterTags = {
    name    : 'tool5',
    version : '1.0.2'
  };
  const queryString = `filter.tags.name=${encodeURIComponent(filterTags.name)}&filter.tags.version=${encodeURIComponent(filterTags.version)}`;
  const encodedUrl = `${baseUrl}?${queryString}`;
  console.log(encodedUrl);
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