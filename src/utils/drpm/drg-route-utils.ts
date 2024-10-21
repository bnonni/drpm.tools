import { Request } from 'express';
import { DPK_VERSION_PREFIXES, NPM_PACKAGE_JSON } from '../../config.js';
import { DpkMetadata, DpkTarball, DrgResponse } from '../types.js';

export class DrgRouteUtils {
  static isPrefixed(semver: string): boolean {
    return DPK_VERSION_PREFIXES.some(prefix => semver.startsWith(prefix));
  }

  static findPrefix(prefixed: string): { version: string, prefix: string } {
    const prefix = DPK_VERSION_PREFIXES.find(prefix => prefixed.startsWith(prefix));
    return !prefix
      ? { version: prefixed, prefix: '' }
      : { version: prefixed.slice(prefix.length), prefix };
  }

  static checkReqParams(params: Request['params']): string[][] {
    return Object.entries(params).filter(([k, v]) => !v && k);
  }

  static routeFailure({code, status, error}: {code?: number; status?: string; error: any}): DrgResponse {
    return { ok: false, code: code ?? 404, status: status ?? 'Not Found', error };
  }

  static routeSuccess({code, status, data}: {code?: number; status?: string; data: DpkTarball | DpkMetadata}): DrgResponse {
    return { ok: false, code: code ?? 200, status: status ?? 'OK', data };
  }

  static dependencyLookup({dependency}: {dependency: string}): { prefix: string, version: string } {
    const semver = NPM_PACKAGE_JSON?.dependencies?.[dependency];
    const { prefix, version } = DrgRouteUtils.isPrefixed(semver)
      ? DrgRouteUtils.findPrefix(semver)
      : { prefix: '', version: semver };
    return {prefix, version};
  }
}
