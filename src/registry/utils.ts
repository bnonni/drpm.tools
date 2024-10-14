import { createHash } from 'crypto';
import { createWriteStream } from 'fs';
import { ensureDir, exists } from 'fs-extra';
import { access, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { Logger } from '../utils/logger.js';
import { REGISTRY_DIR_PATH } from './config.js';

export async function sha512Integrity(tarballPath: string): Promise<string> {
  const fileBuffer = await readFile(tarballPath);
  const hash = createHash('sha512').update(fileBuffer).digest('base64');
  return `sha512-${hash}`;
}

// Ensure the path to the .registryd/{dpk, dpk/version} directory exists
export async function ensureDpkDir(dpkDir: string): Promise<any> {
  try {
    await ensureDir(dpkDir);
  } catch {
    throw new Error(`Failed to ensure dir at ${dpkDir}`);
  }
};

// Get the path to the .registryd/dpk directory
export function getDpkPath(name: string): string {
  return join(REGISTRY_DIR_PATH, name);
};

// Get the path to the .registryd/dpk/version directory
export function getDpkVersionPath(name: string, version: string): string {
  return join(REGISTRY_DIR_PATH, name, version);
};

// Get the path to the .registryd/dpk/version/metadata.json file
export function getDpkMetadataPath(name: string, version: string): string {
  return join(getDpkVersionPath(name, version), 'metadata.json');
};

// Get the path to the .registryd/dpk/version/dpk-version.tgz file
export function getDpkTarballPath(name: string, version: string): string {
  return join(getDpkVersionPath(name, version), `${name}-${version}.tgz`);
};

export async function loadDpkMetadata(metadataPath: string): Promise<{ [key: string]: any } | null> {
  try {
    if(!await exists(metadataPath)) {
      return null;
    }
    await access(metadataPath);
    const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
    return metadata;
  } catch (error: any) {
    Logger.error(`metadata.json does not exist at path ${metadataPath}`, error);
    throw error;
  }
};

export async function loadDpkTarball(tarballPath: string): Promise<any> {
  try {
    if(!await exists(tarballPath)) {
      return null;
    }
    await access(tarballPath);
    return tarballPath;
  } catch (error: any) {
    Logger.error(`tgz files does not exist at path ${tarballPath}`, error);
    throw error;
  }
};

export async function saveDpkTarball(tarball: ReadableStream<Uint8Array>, tarballPath: string): Promise<void> {
  Logger.log(`Saving tarball to ${tarballPath} ...`);
  await pipeline(tarball, createWriteStream(tarballPath));
}


export async function saveDpkMetadata(name: string, version: string, metadata: { [key: string]: any }): Promise<boolean> {
  const dpkAtVersionPath = getDpkVersionPath(name, version);
  try {
    await ensureDpkDir(dpkAtVersionPath);
    Logger.info(`Ensured dir at ${dpkAtVersionPath}`);
  } catch (error: any) {
    Logger.error(`Failed to ensure dir at ${dpkAtVersionPath}`, error);
    return false;
  }

  const dpkMetadataPath = getDpkMetadataPath(name, version);
  try {
    await writeFile(dpkMetadataPath, JSON.stringify(metadata, null, 2));
    Logger.info(`Saved metadata to ${dpkMetadataPath}`);
    return true;
  } catch (error: any) {
    Logger.error(`Failed to save dpk metadata to ${dpkMetadataPath} `, error);
    return false;
  }
};
