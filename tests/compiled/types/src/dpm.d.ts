import { Resolution, ResolveContext } from './utils/types.js';
/**
 * resolve is a built-in hook that allows you to intercept and modify the resolution of a module specifier.
 * Function that takes in a  (i.e. an import path) and detects a DMI, converts to a DRL and fetches the resource.
 * @param specifier either normal code import or DMI (e.g. did:dht:web5/api/0.0.1)
 * @param context pre-defined argument required for the resolve hook
 * @param defaultResolve pre-defined argument required for the resolve hook
 * @returns a promise that resolves to a Resolution object
 */
export declare function resolve(specifier: string, context: ResolveContext, defaultResolve: Function): Promise<Resolution>;
export declare function load(url: string, context: any, defaultLoad: Function): Promise<any>;
//# sourceMappingURL=dpm.d.ts.map