import { createHash } from 'crypto';
import { Request } from 'express';
import { createReadStream, createWriteStream } from 'fs';
import { ensureDir, exists } from 'fs-extra';
import { access, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import {
  DRPM_REGISTRY_DIR,
  DRPM_VERSION_PREFIXES,
  NPM_PACKAGE_JSON,
  PACKAGE_VERSION
} from '../config.js';
import { Logger } from '../utils/logger.js';
import {
  DependencyParam,
  PrefixResponse,
  RegistryGetDpkPath,
  RegistryResponse,
  RegistrySaveDpkData,
  RouteFailureParams,
  RouteSuccessParams
} from '../utils/types.js';

export class RegistryUtils {
  // Saves the tarball file to path $HOME/.drpm/registry/name/version/name-version.tgz
  static async saveDpkTarball({ name, version, data }: RegistrySaveDpkData): Promise<boolean | string> {
    const dpkAtVersionPath = this.getDpkVersionPath({name, version});
    try {
      await this.ensureDpkDir(dpkAtVersionPath);
      Logger.info(`Ensured dir at ${dpkAtVersionPath}`);
    } catch (error: any) {
      Logger.error(`DRegistry: Failed to ensure dir at ${dpkAtVersionPath}`, error);
      return false;
    }

    const dpkTarballPath = this.getDpkTarballPath({name, version});
    try {
      Logger.log(`Saving tarball to ${dpkTarballPath} ...`);
      await pipeline(data, createWriteStream(dpkTarballPath));
      return dpkTarballPath;
    } catch (error) {
      Logger.error(`DRegistry: Failed to save dpk tarball to ${dpkTarballPath} `, error);
      return false;
    }
  }

  // Saves the metadata file to path $HOME/.drpm/registry/name/version/metadata.json
  static async saveDpkMetadata({ name, version, data }: RegistrySaveDpkData): Promise<boolean> {
    const dpkAtVersionPath = this.getDpkVersionPath({name, version});
    try {
      await this.ensureDpkDir(dpkAtVersionPath);
    } catch (error: any) {
      Logger.error(`DRegistry: Failed to ensure dir at ${dpkAtVersionPath}`, error);
      return false;
    }

    const dpkMetadataPath = this.getDpkMetadataPath({name, version});
    try {
      await writeFile(dpkMetadataPath, JSON.stringify(data, null, 2));
      Logger.info(`Saved metadata to ${dpkMetadataPath}`);
      return true;
    } catch (error: any) {
      Logger.error(`DRegistry: Failed to save dpk metadata to ${dpkMetadataPath} `, error);
      return false;
    }
  }

  // Ensure the path to the $HOME/.drpm/registry/{dpk, dpk/version} directory exists
  static async ensureDpkDir(path: string): Promise<any> {
    try {
      await ensureDir(path);
      Logger.info(`Ensured dir at ${path}`);
      return true;
    } catch (error: any) {
      Logger.error(`DRegistry: Failed to ensure dir at ${path}`, error);
      throw error;
    }
  }

  // Get the path to the $HOME/.drpm/registry/name directory
  static getDpkPath({name}: {name: string}): string {
    Logger.info(`Getting dpk dir path for ${name}`);
    return join(DRPM_REGISTRY_DIR, name);
  };

  // Get the path to the $HOME/.drpm/registry/name directory
  static getDpkLatestPath({name}: {name: string}): string {
    Logger.info(`Getting dpk dir path for ${name}`);
    return join(DRPM_REGISTRY_DIR, name, 'latest');
  };

  // Get the path to the $HOME/.drpm/registry/name/version directory
  static getDpkVersionPath({name, version}: RegistryGetDpkPath): string {
    Logger.info(`Getting dpkVersion dir path for ${name}@${version}`);
    return join(DRPM_REGISTRY_DIR, name, version);
  };

  // Get the path to the $HOME/.drpm/registry/name/version/metadata.json file
  // e.g. /Users/username/.drpm/registry/tool5/6.1.0/metadata.json
  static getDpkMetadataPath({name, version}: RegistryGetDpkPath): string {
    Logger.info(`Getting metadata path for ${name}@${version}`);
    return join(DRPM_REGISTRY_DIR, name, version, 'metadata.json');
  };

  // Get the path to the $HOME/.drpm/registry/dpk/version/dpk-version.tgz file
  // e.g. /Users/username/.drpm/registry/tool5/6.1.0/tool5-6.1.0.tgz
  static getDpkTarballPath({name, version}: RegistryGetDpkPath): string {
    Logger.info(`Getting tarball path for ${name}@${version}`);
    return join(DRPM_REGISTRY_DIR, name, version, `${name}-${version}.tgz`);
  };

  static async saveMetadataToPath({path, metadata}: {path: string; metadata: any}): Promise<boolean> {
    try {
      await writeFile(path, JSON.stringify(metadata, null, 2));
      Logger.info(`Saved metadata to ${path}`);
      return true;
    } catch (error: any) {
      Logger.error(`DRegistry: Failed to save metadata to ${path} `, error);
      return false;
    }
  }

  static async saveTarballToPath({path, tarball}: {path: string; tarball: any}): Promise<boolean> {
    try {
      await pipeline(tarball, createWriteStream(path));
      Logger.info(`Saved tarball to ${path}`);
      return true;
    } catch (error: any) {
      Logger.error(`DRegistry: Failed to save tarball to ${path} `, error);
      return false;
    }
  }

  static async loadDpkMetadata(path: string): Promise<any> {
    try {
      if(!await exists(path)) {
        Logger.info(`DRegistry: metadata.json does not exist at path ${path}`);
        return null;
      }
      await access(path);
      const metadata = JSON.parse(await readFile(path, 'utf8'));
      return metadata;
    } catch (error: any) {
      Logger.error(`DRegistry: metadata.json does not exist at path ${path}`, error);
      throw error;
    }
  };

  static async loadDpkTarball(path: string): Promise<any> {
    try {
      if(!await exists(path)) {
        Logger.info(`DRegistry: tarball does not exist at path ${path}`);
        return null;
      }
      await access(path);
      return path;
    } catch (error: any) {
      Logger.error(`DRegistry: tarball does not exist at path ${path}`, error);
      throw error;
    }
  };

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
      tarball : `http://registry.drpm.software/@drpm/${name}/-/${name}-${version}.tgz`
    };
  }

  static updateMetadata(existingMetadata: any, newMetadata: any): any {
    const {name, version} = newMetadata;
    newMetadata.dist = !newMetadata.dist.tarball
      ? this.createDist(name, version)
      : newMetadata.dist;
    const tgzPath = join(DRPM_REGISTRY_DIR, name, `${name}-${version}.tgz`);
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
    return DRPM_VERSION_PREFIXES.some((prefix: string) => semver.startsWith(prefix));
  }

  static findPrefix(prefixed: string): PrefixResponse {
    const prefix = DRPM_VERSION_PREFIXES.find((prefix: string) => prefixed.startsWith(prefix));
    return !prefix
      ? { version: prefixed, prefix: '' }
      : { version: prefixed.slice(prefix.length), prefix };
  }

  static checkReqParams(params: Request['params']): string[][] {
    return Object.entries(params).filter(([k, v]) => !v && k);
  }

  static routeFailure({code, status, error}: RouteFailureParams): RegistryResponse {
    return { ok: false, code: code ?? 404, status: status ?? 'Not Found', error };
  }

  static routeSuccess({code, status, data}: RouteSuccessParams): RegistryResponse {
    return { ok: true, code: code ?? 200, status: status ?? 'OK', data };
  }

  static lookupCurrentVersion(): string {
    return NPM_PACKAGE_JSON?.version ?? PACKAGE_VERSION;
  }

  static lookupDependencyVersion({dependency}: DependencyParam): PrefixResponse {
    const semver = NPM_PACKAGE_JSON?.dependencies?.[dependency];
    const { prefix, version } = RegistryUtils.isPrefixed(semver)
      ? RegistryUtils.findPrefix(semver)
      : { prefix: '', version: semver };
    return {prefix, version};
  }
}
