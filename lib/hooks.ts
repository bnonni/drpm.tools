import { Logger } from './utils/logger.js';
import { fetchDPK, findEntryPoint } from './utils/dpk.js';

type Function = (...args: any[]) => any;
type ResolveContext = {
  conditions: string[];
  importAttributes: {};
  parentURL: string;
};
type ResolveResponse = {
  [key: string]: any;
  shortCircuit?: boolean
};
/**
 * resolve is a built-in hook that allows you to intercept and modify the ResolveResponse of a module specifier.
 * Function that takes in a  (i.e. an import path) and detects a DMI, converts to a DRL and fetches the resource.
 * @param specifier either normal code import or DMI (e.g. did:dht:web5/api/0.0.1)
 * @param context pre-defined argument required for the resolve hook
 * @param defaultResolve pre-defined argument required for the resolve hook
 * @returns a promise that resolves to a ResolveResponse object
 */
export async function resolve(
  specifier: string,
  context: ResolveContext,
  defaultResolve: Function
): Promise<ResolveResponse> {
  if (specifier.match(/did:(dht|web):.*/gi)) {
    Logger.log('DMI detected! Resolving', specifier);
    const [did, name, version] = specifier.split('/') ?? [];
    Logger.log('DMI: did', did);
    Logger.log('DMI: name', name);
    Logger.log('DMI: version', version);
    if (!(did && name && version)) {
      throw new Error('DMI ResolveResponse failed: invalid DMI format' + specifier);
    }
    // Look at each DPK in package.json to determine module vs. cjs and entry point
    Logger.log('did, name, version', did, name, version);
    await fetchDPK(did.replace('@', ''), name, version);
    Logger.log('resolve => fetchDPK => specifier', specifier);

    const entryPoint = await findEntryPoint(specifier);
    Logger.log('resolve => findEntryPoint => Entry point found!', entryPoint);
    specifier = `${specifier}/${entryPoint}`;
    Logger.log('resolve => specifier', entryPoint);
  }
  console.log('resolve => specifier, context, defaultResolve', specifier, context, defaultResolve);
  return defaultResolve(specifier, context, defaultResolve);
}

export async function load(url: string, context: any, defaultLoad: Function) {
  if (url.includes('did:dht')) {
    Logger.log('DMI detected! Loading', url);
  }
  return defaultLoad(url, context, defaultLoad);
}