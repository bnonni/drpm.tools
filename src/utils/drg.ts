import { Request } from 'express';
import { ensureDir, exists } from 'fs-extra';
import { createWriteStream } from 'fs';
import { access, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { REGISTRY_DIR } from '../drg/config.js';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';
import { Logger } from './logger.js';

export async function sha512Integrity(tgzFilepath: string): Promise<string> {
  const fileBuffer = await readFile(tgzFilepath);
  const hash = createHash('sha512').update(fileBuffer).digest('base64');
  return `sha512-${hash}`;
}

export async function ensureRegistryPackageDir(packageDirPath: string): Promise<any> {
  try {
    await ensureDir(packageDirPath);
    return true;
  } catch {
    return null;
  }
};

export function getRegistryPath(name: string, version: string): string {
  return join(REGISTRY_DIR, name, version);
};

export async function loadMetadata(metadataPath: string): Promise<{ [key: string]: any } | null> {
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

export async function loadTarball(tarballPath: string): Promise<any> {
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

export function getMetadataPath(name: string, version: string): string {
  return join(getRegistryPath(name, version), 'metadata.json');
};

export function getTarballPath(name: string, version: string): string {
  return join(getRegistryPath(name, version), `${name}-${version}.tgz`);
};

export async function saveTarball(tarball: ReadableStream<Uint8Array>, tarballPath: string): Promise<void> {
  Logger.log(`Saving tarball to ${tarballPath} ...`);
  await pipeline(tarball, createWriteStream(tarballPath));
}

export async function saveMetadata(name: string, version: string, metadata: any): Promise<void> {
  const packagePath = getRegistryPath(name, version);
  await ensureRegistryPackageDir(packagePath);
  const metadataPath = getMetadataPath(name, version);
  await writeFile(metadataPath, JSON.stringify(metadata, null, 2));
};