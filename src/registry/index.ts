'use strict';

import express, { Request, Response } from 'express';
import { createWriteStream } from 'fs';
import { ensureDir } from 'fs-extra';
import { access, readdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { pipeline } from 'stream/promises';
import { fetchDPK } from '../dpm.js';
import { Logger } from '../utils/logger.js';

const app = express();
const REGISTRY_DPM_SOFTWARE = join(process.cwd(), '.registry');

// Helper to get package metadata path
function getPackageMetadataPath (path: string): string {
  return join(REGISTRY_DPM_SOFTWARE, path, 'package.json');
};

// Helper to get package tarball path
function getPackageTarballPath (path: string): string {
  return join(REGISTRY_DPM_SOFTWARE, path, 'package.tgz');
};

// Check if package exists locally
async function packageExists (path: string): Promise<boolean> {
  Logger.log('packageExists => path', path);
  try {
    const files = await access(path);
    Logger.log('packageExists => files', files);
    return true;
  } catch {
    return false;
  }
};

// Health check route
app.get('/health', (req: Request, res: Response) => {
  Logger.log('[registry] 0. GET /health');
  res.status(200).json({ ok: true });
});

// Intercept requests to fetch the package if not available locally
app.get('/@:scope%2f:dpk', async (req: Request, res: Response) => {
  try {
    const scope = decodeURIComponent(req.params.scope);
    Logger.log('[registry] 1. GET /@:scope/:dpk => scope', scope);
    const dpk = decodeURIComponent(req.params.dpk);
    Logger.log('[registry] 1. GET /@:scope/:dpk => dpk', dpk);
    const [_, method, id, name, version] = dpk.split('_');
    Logger.log('[registry] 1. GET /@:scope/:dpk => method, id, name, version', method, id, name, version);

    // if (await packageExists(dpk)) {
    //   return res.redirect(`/${scope}%2f${dpk}`);
    // }

    // Fetch the package tarball using the custom fetchDPK function
    // Fetch the package tarball using the custom fetchDPK function
    const { ok, status, statusText, message } = await fetchDPK(`did:${method}:${id}`, name, version);
    if(!ok || status !== 200) {
      Logger.error('[registry] Error fetching DPK:', message);
      throw new Error(message);
    }
    Logger.log('[registry] 1. GET /@:scope/:dpk => fetchDPK => ok', ok);
    Logger.log('[registry] 1. GET /@:scope/:dpk => fetchDPK => status', status);
    Logger.log('[registry] 1. GET /@:scope/:dpk => fetchDPK =>statusText', statusText);
    const dpkStream = message.body as ReadableStream<Uint8Array>;
    Logger.log('[registry] 1. GET /@:scope/:dpk => dpkStream', dpkStream);
    const tarballPath = getPackageTarballPath(dpk);
    Logger.log('[registry] 1. GET /@:scope/:dpk => tarballPath', tarballPath);
    const metadataPath = getPackageMetadataPath(dpk);
    Logger.log('[registry] 1. GET /@:scope/:dpk => metadataPath', metadataPath);
    const tarballPathExists = await packageExists(tarballPath);
    Logger.log('[registry] 1. GET /@:scope/:dpk => tarballPathExists', tarballPathExists);
    // Ensure local registry directories
    if(!tarballPathExists) {
      Logger.log('[registry] 1. GET /@:scope/:dpk => creating dir => tarballPath', tarballPath);
      await ensureDir(dirname(tarballPath));
    }

    // Save tarball and metadata locally
    if(!await packageExists(metadataPath)) {
      Logger.log('[registry] 1. GET /@:scope/:dpk => pipeline => dpkStream', dpkStream);
      await pipeline(dpkStream, createWriteStream(tarballPath));
      Logger.log('[registry] 1. GET /@:scope/:dpk => writeFile => metadataPath', metadataPath);
      await writeFile(metadataPath, JSON.stringify({ name: name, version, dist: {tarball: `http://localhost:3000/${scope}/${dpk}/package.tgz`} }));
    }

    if (tarballPathExists) {
      Logger.log('[registry] 1. GET /@:scope/:dpk => tarballPathExists', tarballPathExists);
      // res.sendFile(metadataPath);
      const rUrl = `/${scope}/${dpk}/package.json`;
      Logger.log('[registry] 1. GET /@:scope/:dpk => redirect => rUrl', rUrl);
      // res.redirect(rUrl);
      res.sendFile(metadataPath);
    } else {
      console.log(`1. GET  /${scope}/${dpk} => catch`);
      res.status(404).json({ error: 'Package not found in local registry' });
    }
  } catch (error) {
    Logger.error('[registry] Error fetching DPK:', error);
    res.status(500).json({ error: 'Failed to fetch and store package' });
  }
});

// Serve package tarball
app.get('/:scope/:dpk/:tarball', async (req: Request, res: Response) => {
  try {
    Logger.log('[registry] 2. GET /:scope/:dpk/-/:tarball');
    const scope = decodeURIComponent(req.params.scope);
    Logger.log('[registry] 2. GET /:scope/:dpk/-/:tarball => scope', scope);
    const dpk = decodeURIComponent(req.params.dpk);
    Logger.log('[registry] 2. GET /:scope/:dpk/-/:tarball => dpk', dpk);
    const tarballPath = getPackageTarballPath(dpk);

    if (await packageExists(tarballPath)) {
      res.status(200).sendFile(tarballPath);
    } else {
      res.status(404).json({ error: 'Tarball not found in local registry' });
    }
  } catch (error) {
    Logger.error('[registry] Error fetching DPK:', error);
    res.status(500).json({ error: '[registry] Failed to fetch and store package' });
  }
});

export default app;

/*
// Helper function to fetch and cache the package using fetchDPK
async function fetchdpk(dpk: string) {
  const [method, id, metadata] = dpk.replace('@dpm/', '').split('-');
  const [name, version = 'latest'] = metadata.split('@');
  // Fetch the package tarball stream
  const dpkDidPath = `${method}-${id}-${name}`;
  const did = `did:${method}:${id}`;
  const dpkStream = await fetchDPK(did, name, version);

  // Store tarball in the packages directory
  const packageDir = join(REGISTRY_DPM_SOFTWARE, dpkDidPath);
  await mkdir(packageDir, { recursive: true });
  const tarballPath = join(packageDir, `${name}-${version}.tgz`);
  await pipeline(dpkStream, createWriteStream(tarballPath));

  const tempExtractPath = join(packageDir, 'temp_extract');
  await mkdir(tempExtractPath, { recursive: true });
  await x({
    file : tarballPath,
    cwd  : tempExtractPath,
  });
  const packageJsonPath = join(tempExtractPath, 'package', 'package.json');
  if (!existsSync(packageJsonPath)) {
    throw new Error(`Invalid package: package.json is missing in ${dpk}`);
  }
  // Create metadata for the package
  const dpkMetadata = {
    name : `${did}/${name}`,
    version,
    dist : {
      tarball : `http://localhost:${port}/${did}/${name}/-/${name}-${version}.tgz`
    }
  };
  await writeFile(join(packageDir, 'metadata.json'), JSON.stringify(dpkMetadata));
  await rm(tempExtractPath, { recursive: true, force: true });
}
*/