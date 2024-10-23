import { readFile } from 'fs/promises';
import { join } from 'path';
import { Logger } from '../src/utils/logger.js';

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
 * @summary resolve is a built-in hook that allows you to intercept and modify the
 * ResolveResponse of a module specifier. Function that takes in a normal
 * import (i.e. an import path), detects a DMI, converts to a DRL and fetches the resource.
 * @param specifier either normal code import or DMI (e.g. @drpm/packageName~method~id)
 * @param context pre-defined argument required for the resolve hook
 * @param defaultResolve pre-defined argument required for the resolve hook
 * @returns a promise that resolves to a ResolveResponse object
 */
export async function resolve(
  specifier: string,
  context: ResolveContext,
  defaultResolve: Function
): Promise<ResolveResponse> {
  if (specifier.match(/@drpm\/~.*/gi)) {
    Logger.log(`DMI detected! Resolving specifier ${specifier}`);
    const [name, method, id] = specifier.split('@drpm/')?.[1]?.split('~') ?? [];
    if (!(name && method && id)) {
      throw new Error(`DrpmHooks: Failed to resolve specifier ${specifier} - invalid DMI format`);
    }
    const did = !method ? `did:dht:${name}` : `did:${method}:${name}`;
    Logger.log('name, method, id, did', name, method, id, did);
    const dpkPath = join(process.cwd(), 'node_modules', specifier);
    const dpkPackageJson = JSON.parse(await readFile(join(dpkPath, 'package.json'), 'utf8'));
    const entryPoint = dpkPackageJson.module || dpkPackageJson.main;
    Logger.log(`Resolved path ${dpkPath} to dpk ${name} and entryPoint ${entryPoint}`);
    specifier = `${dpkPath}/${entryPoint}`;
    Logger.log(`Final specifier=${specifier}`);
  }
  Logger.log('resolve => specifier, context, defaultResolve', specifier, context, defaultResolve);
  return defaultResolve(specifier, context, defaultResolve);
}

export async function load(url: string, context: any, defaultLoad: Function) {
  if (url.includes('@drpm')) {
    Logger.log('DMI detected! Loading', url);
  }
  return defaultLoad(url, context, defaultLoad);
}