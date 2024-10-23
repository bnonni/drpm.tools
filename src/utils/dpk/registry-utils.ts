import { Request } from 'express';
import {
  DPK_VERSION_PREFIXES,
  DRPM_DRG_DIR,
  DRPM_DRG_URL,
  NPM_PACKAGE_JSON,
  PACKAGE_VERSION
} from '../../config.js';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { DrgResponse } from '../types.js';
import { join } from 'path';

type DependencyParam = { dependency: string };
type PrefixResponse = { prefix: string, version: string };
type RouteSuccessParams = {code?: number; status?: string; data: any};
type RouteFailureParams = {code?: number; status?: string; error: any};

export class DRegistryUtils {
  static createMetadata(metadata: any): any {
    const {name, version} = metadata;
    metadata.dist = this.createDist(name, version);
    return {
      name,
      'dist-tags' : { latest: version },
      versions    : { [version]: { ...metadata }},
    };
  }

  static createDist(name: string, version: string): any {
    return {
      shasum  : '',
      tarball : `http://${DRPM_DRG_URL}/@drpm/${name}/-/${name}-${version}.tgz`
    };
  }

  static updateMetadata(existingMetadata: any, newMetadata: any): any {
    const {name, version} = newMetadata;
    newMetadata.dist = !newMetadata.dist.tarball
      ? this.createDist(name, version)
      : newMetadata.dist;
    const tgzPath = join(DRPM_DRG_DIR, name, `${name}-${version}.tgz`);
    newMetadata.dist.shasum = this.calculateShasum1(tgzPath);
    existingMetadata['dist-tags'].latest = version;
    existingMetadata.versions[version] = newMetadata;
    return existingMetadata;
  }

  static calculateShasum1(path: string): any {
    const hash = createHash('sha1');
    const stream = createReadStream(path);

    return new Promise((resolve, reject) => {
      stream.on('data', chunk => hash.update(chunk));

      stream.on('end', () => {
        const shasum = hash.digest('hex');
        resolve(shasum);
      });

      stream.on('error', (error) => reject(error));
    });
  }

  static isPrefixed(semver: string): boolean {
    return DPK_VERSION_PREFIXES.some((prefix: string) => semver.startsWith(prefix));
  }

  static findPrefix(prefixed: string): PrefixResponse {
    const prefix = DPK_VERSION_PREFIXES.find((prefix: string) => prefixed.startsWith(prefix));
    return !prefix
      ? { version: prefixed, prefix: '' }
      : { version: prefixed.slice(prefix.length), prefix };
  }

  static checkReqParams(params: Request['params']): string[][] {
    return Object.entries(params).filter(([k, v]) => !v && k);
  }

  static routeFailure({code, status, error}: RouteFailureParams): DrgResponse {
    return { ok: false, code: code ?? 404, status: status ?? 'Not Found', error };
  }

  static routeSuccess({code, status, data}: RouteSuccessParams): DrgResponse {
    return { ok: false, code: code ?? 200, status: status ?? 'OK', data };
  }

  static lookupCurrentVersion(): string {
    return NPM_PACKAGE_JSON?.version ?? PACKAGE_VERSION;
  }

  static lookupDependencyVersion({dependency}: DependencyParam): PrefixResponse {
    const semver = NPM_PACKAGE_JSON?.dependencies?.[dependency];
    const { prefix, version } = DRegistryUtils.isPrefixed(semver)
      ? DRegistryUtils.findPrefix(semver)
      : { prefix: '', version: semver };
    return {prefix, version};
  }
}
