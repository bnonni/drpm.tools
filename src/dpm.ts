import { Resolution, ResolveContext } from './types.js';
import { fetchResource } from './utils.js';

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
    console.log('DMI detected! Resolving', specifier);
    const [did, packageName, version] = specifier.split('/') ?? [];
    console.log('DMI: did', did);
    console.log('DMI: packageName', packageName);
    console.log('DMI: version', version);
    if(!(did && packageName && version)) {
      throw new Error('DMI resolution failed: invalid DMI format' + specifier);
    }
    console.log('did, packageName, version', did, packageName, version);
    const url = await fetchResource(did, packageName, version);
    console.log('DPM resolved DMI to DWN record');
    return {
      url          : `file:///${url}`,
      shortCircuit : true,
      context,
      defaultResolve,
    };
  }
  return defaultResolve(specifier, context, defaultResolve);
}

export async function load(url: string, context: any, defaultLoad: Function) {
  if (url.includes('did:dht')) {
    console.log('DMI detected! Loading', url);
  }
  return defaultLoad(url, context, defaultLoad);
}