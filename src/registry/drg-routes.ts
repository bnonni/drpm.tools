'use strict';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { ensureDir } from 'fs-extra';
import { DRG_DIR } from '../config.js';
import { DpkManager } from '../utils/dpk/dpk-manager.js';
import { DpkRegistry } from '../utils/dpk/dpk-registry.js';
import { DrgRouteUtils } from '../utils/drpm/drg-route-utils.js';
import { ResponseUtils } from '../utils/drpm/dwn-response.js';
import { Logger } from '../utils/logger.js';
import { rename, writeFile } from 'fs/promises';
import { join } from 'path';
import { createWriteStream } from 'fs';

// Utility functions to avoid redundant code
async function handleMetadataRequest(reqParams: any, fetchPath: string) {
  const { scope, name, method, id } = reqParams;
  const did = `did:${method}:${id}`;
  Logger.debug(`Using DID ${did}`);

  const latestDpkPath = DpkRegistry.getDpkLatestPath({ name });
  let latestDpkMetadata = await DpkRegistry.loadDpkMetadata(latestDpkPath);

  if (!latestDpkMetadata) {
    Logger.debug(`Metadata not found for ${name}@latest`, latestDpkPath);
    await ensureDir(latestDpkPath);
    Logger.debug(`Fetching metadata for ${name}@latest ...`);
    const response = await DpkManager.fetchDpk({ did, dpk: { name, path: fetchPath } });
    if (ResponseUtils.fail(response)) {
      Logger.error(`Error fetching package`, response.data);
      return { error: `${response.error}: ${response.data}` };
    }
    Logger.debug(`DPK version=`, response.data.descriptor.tags.latest);
    latestDpkMetadata = response.data;
    await DpkRegistry.saveDpkMetadata({ name, version: response.data.descriptor.tags.latest, data: response.data });
  }

  return latestDpkMetadata;
}

async function handleTarballRequest(name: string, version: string) {
  const tarballPath = DpkRegistry.getDpkTarballPath({ name, version });
  let tarball = await DpkRegistry.loadDpkTarball(tarballPath);

  if (!tarball) {
    Logger.debug(`Fetching tarball for ${name}@${version} ...`);
    const response = await DpkManager.fetchDpk({ did: `did:${name}:${version}`, dpk: { name, version, path: 'package/release' } });
    if (ResponseUtils.fail(response)) {
      Logger.error(`Error fetching tarball`, response.data);
      return { error: response.error };
    }
    tarball = response.data;
  }

  return tarballPath;
}

await ensureDir(DRG_DIR).catch(Logger.error);

const drg = express();
drg.use(cors());
drg.use(express.json());
drg.use(express.urlencoded({ extended: true }));
drg.use(express.raw({ type: 'application/octet-stream', limit: '10gb' }));
drg.use((req: Request, _: Response, next: NextFunction) => {
  req.url = decodeURIComponent(req.url);
  Logger.log(`${req.method} ${req.url}`);
  next();
});

// "@drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo": "^6.1.0"
drg.get('/:scope/:name~:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name, id } = req.params ?? {};
    console.log('scope, name, id', scope, name, id);
    const missing = DrgRouteUtils.checkReqParams({ scope, name, id });
    if(missing.length > 0 || !(scope || name || id)) {
      const missingList = missing.join(', ');
      Logger.error(`Missing required params: ${missingList}`);
      return res.status(404).json({ error: `Missing required params: ${missingList}` });;
    }
    const did = `did:dht:${id}`;
    Logger.debug(`Using DID ${did}`);
    const latestDpkPath = DpkRegistry.getDpkLatestPath({name});
    const latestDpkMetadata = await DpkRegistry.loadDpkMetadata(latestDpkPath);

    if(!latestDpkMetadata) {
      Logger.debug(`Metadata not found for ${name}@latest`, latestDpkPath);
      await ensureDir(latestDpkPath);
      Logger.debug(`Fetching metadata for ${name}@latest ...`);
      const response = await DpkManager.fetchDpk({ did, dpk: { name, path: 'package' } });
      if(ResponseUtils.fail(response)) {
        Logger.error(`Error fetching package`, response);
        return res.status(404).json({ error: response.error });
      }
      Logger.debug(`DPK response.data=`, response.data);
      const version = response.data.descriptor.tags.latest;
      Logger.debug(`DPK version=`, version);
      const saved = await DpkRegistry.saveDpkMetadata({ name, version, data: response.data });
      if(!saved) {
        Logger.error('DpkManager: Failed to save metadata');
        return DrgRouteUtils.routeFailure({ error: 'Failed to save metadata' });
      }
    }
    const version = latestDpkMetadata['dist-tags'].latest ?? DrgRouteUtils.dependencyLookup({dependency: `${scope}/${name}`}).version;
    Logger.debug(`Looking for DPK ${name}@${version} tarball ...`);
    if(!version) {
      return DrgRouteUtils.routeFailure({ error: 'Failed to find version' });
    }
    const tarballPath = DpkRegistry.getDpkTarballPath({name, version});
    const tarball = await DpkRegistry.loadDpkTarball(tarballPath);

    if (!tarball) {
      Logger.debug(`Fetching tarball for ${name}@latest ...`);

      const response = await DpkManager.fetchDpk({ did, dpk: { name, version, path: 'package/release' } });
      if(ResponseUtils.fail(response)) {
        Logger.error(`Error fetching tarball`, response.data);
        return DrgRouteUtils.routeFailure({ error: response.error });
      }
    }

    return res.status(200).sendFile(tarballPath, { headers: { 'Content-Type': 'application/octet-stream' }});

  } catch (error: any) {
    Logger.error(`Error fetching or saving metadata or tarball`, error);
    return DrgRouteUtils.routeFailure({ error: error.message });
  }
});

// @drpm/react~web~dwn.nonni.org
// @drpm/next~btc~xg4x-ay5y-q5zq-232
drg.get('/:scope/:name~:method~:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name, method, id } = req.params ?? {};
    console.log('scope, name, method, id', scope, name, method, id);

    const missing = DrgRouteUtils.checkReqParams({ scope, name, method, id });
    if(missing.length > 0 || !(scope || name || method || id)) {
      const missingList = missing.join(', ');
      Logger.error(`Missing required params: ${missingList}`);
      return res.status(404).json({ error: `Missing required params: ${missingList}` });;
    }
    const did = `did:${method}:${id}`;
    Logger.debug(`Using DID ${did}`);
    const latestDpkPath = DpkRegistry.getDpkLatestPath({name});
    const latestDpkMetadata = await DpkRegistry.loadDpkMetadata(latestDpkPath);

    if(!latestDpkMetadata) {
      Logger.debug(`Metadata not found for ${name}@latest`, latestDpkPath);
      await ensureDir(latestDpkPath);
      Logger.debug(`Fetching metadata for ${name}@latest ...`);
      const response = await DpkManager.fetchDpk({ did, dpk: { name, path: 'package' } });
      if(ResponseUtils.fail(response)) {
        Logger.error(`Error fetching package`, response);
        return res.status(404).json({ error: response.error });
      }
      Logger.debug(`DPK response.data=`, response.data);
      const version = response.data.descriptor.tags.latest;
      Logger.debug(`DPK version=`, version);
      const saved = await DpkRegistry.saveDpkMetadata({ name, version, data: response.data });
      if(!saved) {
        Logger.error('DpkManager: Failed to save metadata');
        return DrgRouteUtils.routeFailure({ error: 'Failed to save metadata' });
      }
    }
    const version = latestDpkMetadata['dist-tags'].latest ?? DrgRouteUtils.dependencyLookup({dependency: `${scope}/${name}`}).version;
    Logger.debug(`Looking for DPK ${name}@${version} tarball ...`);
    if(!version) {
      return DrgRouteUtils.routeFailure({ error: 'Failed to find version' });
    }
    const tarballPath = DpkRegistry.getDpkTarballPath({name, version});
    const tarball = await DpkRegistry.loadDpkTarball(tarballPath);

    if (!tarball) {
      Logger.debug(`Fetching tarball for ${name}@latest ...`);

      const response = await DpkManager.fetchDpk({ did, dpk: { name, version, path: 'package/release' } });
      if(ResponseUtils.fail(response)) {
        Logger.error(`Error fetching tarball`, response);
        return DrgRouteUtils.routeFailure({ error: response.error });
      }
    }

    return res.status(200).sendFile(tarballPath, { headers: { 'Content-Type': 'application/octet-stream' }});
  } catch (error: any) {
    Logger.error(`Error fetching or saving metadata or tarball`, error);
    res.status(404).json({ error: error.message });
    return;
  }
});

// PUT route to handle metadata publishing
drg.put('/:scope/:name~:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name } = req.params;
    const packageData = req.body;

    const dpkPath = join(DRG_DIR, name);
    const metadataPath = `${dpkPath}/metadata.json`;
    const dpkMetadata = await DpkRegistry.loadDpkMetadata(metadataPath);

    Logger.log(`Publishing metadata for @${scope}/${name}...`);

    // Metadata structure
    const metadata = !dpkMetadata ? {
      name,
      'dist-tags' : {
        latest : packageData.version
      },
      versions : {
        [packageData.version] : {
          ...packageData,
          dist         : {
            tarball : `http://endpoint/${scope}/${name}/-/package.tgz`,
            shasum  : 'generated-shasum' // Placeholder for actual shasum generation
          }
        }
      },
    } : {
      ...dpkMetadata,
      versions : {
        ...dpkMetadata.versions,
        [packageData.version] : {
          ...packageData,
          dist         : {
            tarball : `http://endpoint/${scope}/${name}/-/package.tgz`,
            shasum  : 'generated-shasum' // Placeholder for actual shasum generation
          }
        }
      },
    };

    // TODO: add publishDpk logic to dpk-manager

    // Store metadata in a file
    const metadataDir = join(DRG_DIR, name);
    const metadataFilePath = join(metadataDir, `${name}.json`);

    await ensureDir(metadataDir); // Ensure the directory exists
    await writeFile(metadataFilePath, JSON.stringify(metadata, null, 2));

    Logger.log(`Metadata saved for @${scope}/${name}`);

    // Respond with the URL for uploading the tarball
    res.status(201).json({tarballUrl: `http://endpoint/${scope}/${name}/-/package.tgz`});
  } catch (error: any) {
    Logger.error('Error during publish:', error);
    res.status(500).json({ error: 'Failed to publish package metadata.' });
  }
});

// POST route to handle tarball upload without using multer
drg.post('/:scope/:name/-/package.tgz', async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name } = req.params;
    const version = req.body.version || 'latest'; // Assuming version is passed in body or default to 'latest'

    const tarballDir = join(DRG_DIR, name);
    const tarballPath = join(tarballDir, `${name}-${version}.tgz`);

    await ensureDir(tarballDir); // Ensure the directory exists

    // Create a write stream for the tarball file
    const fileStream = createWriteStream(tarballPath);

    // Pipe the request body (which contains the tarball file) into the file stream
    req.pipe(fileStream);

    // Handle stream events
    fileStream.on('finish', () => {
      Logger.log(`Tarball uploaded successfully for @${scope}/${name}`);
      res.status(201).json({ message: 'Tarball uploaded successfully' });
    });

    fileStream.on('error', (err) => {
      Logger.error('Failed to store tarball:', err);
      res.status(500).json({ error: 'Failed to store tarball.' });
    });
  } catch (error: any) {
    Logger.error('Error during tarball upload:', error);
    res.status(500).json({ error: 'Failed to upload tarball.' });
  }
});

export default drg;
