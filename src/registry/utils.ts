import { Request } from 'express';
import { ensureDir } from 'fs-extra';
import { createWriteStream } from 'fs';
import { access, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { REGISTRY_DIR } from './config.js';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';

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

export function getRegistryPackagePath(name: string, version: string): string {
  return join(REGISTRY_DIR, name, version);
};

export async function loadPackageMetadata(name: string, version: string): Promise<any> {
  const metadataFilePath = getPackageMetadataFilePath(name, version);
  try {
    await access(metadataFilePath);
    const metadata = require(metadataFilePath);
    return metadata;
  } catch {
    return null;
  }
};

export async function accessPackageTarball(tarballPath: string): Promise<any> {
  try {
    await access(tarballPath);
    return tarballPath;
  } catch {
    return null;
  }
};

export function getPackageMetadataFilePath(name: string, version: string): string {
  return join(getRegistryPackagePath(name, version), 'metadata.json');
};

export function getPackageTarballFilePath(name: string, version: string): string {
  return join(getRegistryPackagePath(name, version), `${name}-${version}.tgz`);
};

export async function savePackageTarball(tarball: ReadableStream<Uint8Array>, tarballPath: string): Promise<void> {
  await pipeline(tarball, createWriteStream(tarballPath));
}

export async function savePackageMetadata(name: string, version: string, metadata: any): Promise<void> {
  const packagePath = getRegistryPackagePath(name, version);
  await ensureRegistryPackageDir(packagePath);
  const metadataFilePath = getPackageMetadataFilePath(name, version);
  await writeFile(metadataFilePath, JSON.stringify(metadata, null, 2));
};

export async function getTarballUrl(req: Request, name: string, version: string): Promise<string> {
  return `http://registry.localhost:2091/${name}/-/${name}-${version}.tgz`;
};
