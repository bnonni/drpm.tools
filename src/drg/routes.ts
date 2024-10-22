'use strict';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { createWriteStream } from 'fs';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { DRPM_DRG_DIR } from '../config.js';
import { DManager } from '../utils/dpk/manager.js';
import { DRegistry } from '../utils/dpk/registry.js';
import { DrgRoutes } from '../utils/drg-routes.js';
import { Logger } from '../utils/logger.js';
import { ResponseUtils } from '../utils/response.js';

type RequestParams = Request['params'];

const stringify = (data: any) => JSON.stringify(data, null, 2);

async function handleMetadataRequest(requestParams: RequestParams): Promise<any> {
  const { name, method, id } = requestParams;
  const did = !method ? `did:dht:${id}` : `did:${method}:${id}`;
  Logger.debug(`Using DID ${did}`);

  const dpkPath = DRegistry.getDpkPath({ name });
  const dpkMetadataPath = `${dpkPath}/metadata.json`;
  let dpkMetadata = await DRegistry.loadDpkMetadata(dpkMetadataPath);

  if (!dpkMetadata) {
    await ensureDir(dpkPath);
    Logger.debug(`Metadata not found for ${name} at ${dpkMetadataPath}, fetching ...`);
    const response = await DManager.getDpk({ did, dpk: { name, path: 'package' } });
    if (ResponseUtils.fail(response)) {
      Logger.error(`DrgRoutes: Error fetching metadata`, response.error);
      return DrgRoutes.routeFailure({ error: response.error });
    }
    dpkMetadata = response?.data;
    if(!dpkMetadata) {
      Logger.error(`DrgRoutes: Failed to fetch metadata`, response);
      const error = response?.error ?? response?.status ?? 'Failed to find version';
      return DrgRoutes.routeFailure({ error });
    }
    await DRegistry.saveMetadataToPath({ path: dpkMetadataPath, metadata: dpkMetadata });
    Logger.debug(`Found and saved metadata to ${dpkMetadataPath}`);
  }

  return DrgRoutes.routeSuccess({ data: dpkMetadata });
}

async function handleTarballRequest({did, name, version}: {did: string; name: string; version: string}): Promise<any> {
  const dpkPath = DRegistry.getDpkPath({ name });
  const dpkTarballPath = `${dpkPath}/${name}-${version}.tgz`;
  let dpkTarball = await DRegistry.loadDpkTarball(dpkTarballPath);

  if (!dpkTarball) {
    await ensureDir(dpkPath);
    Logger.debug(`Tarball not found for ${name} at ${dpkTarballPath}, fetching ...`);
    const response = await DManager.getDpk({ did, dpk: { name, version, path: 'package/release' } });
    if (ResponseUtils.fail(response)) {
      Logger.error(`DrgRoutes: Error fetching tarball`, response.data);
      return DrgRoutes.routeFailure({ error: response.error });
    }
    dpkTarball = response?.data;
    if(!dpkTarball) {
      Logger.error(`DrgRoutes: Failed to fetch tarball`, response);
      const error = response?.error ?? response?.status ?? 'Failed to find version';
      return DrgRoutes.routeFailure({ error });
    }
    await DRegistry.saveTarballToPath({ path: dpkTarballPath, tarball: dpkTarball });
    Logger.debug(`Found and saved tarball to ${dpkTarballPath}`);
  }

  return DrgRoutes.routeSuccess({ data: dpkTarballPath });
}

await ensureDir(DRPM_DRG_DIR).catch(Logger.error);

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

drg.use(['/', '/health'], (_: Request, res: Response) => {
  res.status(200).json({ ok: true, message: 'DRG is up and running!' });
});

// "@drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo": "^6.1.0"
drg.get('/:scope/:name~:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name, id } = req?.params ?? {};
    const dependency = `${scope}/${name}~${id}`;
    Logger.log(`${dependency} => ${scope}, ${name}, ${id}`);

    const missing = DrgRoutes.checkReqParams({ scope, name, id });
    if(missing.length > 0) {
      const missingList = missing.join(', ');
      Logger.error(`DrgRoutes: Missing required params - ${missingList}`);
      return res.status(404).json({ error: `Missing required params: ${missingList}` });;
    }

    const metadataResponse = await handleMetadataRequest(req.params);
    if(ResponseUtils.fail(metadataResponse)) {
      Logger.error(`DrgRoutes: Failed to find or fetch version`, metadataResponse.error);
      return res.send(404).json({ error: metadataResponse.error });
    }

    const metadata = metadataResponse?.data;
    Logger.debug(`Found or fetched DPK metadata=${stringify(metadata)}`);

    const dpkDistTags = metadata?.['dist-tags'];
    Logger.debug(`Found DPK metadata.dist-tags=${stringify(dpkDistTags)}`);

    const version = dpkDistTags?.latest ?? DrgRoutes.dependencyLookup({dependency})?.version;
    if(!version) {
      Logger.error(`DrgRoutes: Failed to find or fetch version`, metadataResponse.error);
      return res.send(404).json({ error: 'Failed to find or fetch version' });
    }
    Logger.debug(`Found DPK version=${version}`);

    const did = `did:dht:${id}`;
    Logger.debug(`Using DID ${did}`);
    const tarballResponse = await handleTarballRequest({did, name, version});
    if(ResponseUtils.fail(tarballResponse)) {
      Logger.error(`DrgRoutes: Failed to find or fetch tarball`, tarballResponse.error);
      return res.send(404).json({ error: tarballResponse.error });
    }

    const tarballPath = metadataResponse?.data;
    Logger.debug(`Sending tarball at path ${tarballPath}`);
    return res.status(200).sendFile(tarballPath, {
      headers : { 'Content-Type': 'application/octet-stream' }
    });

  } catch (error: any) {
    Logger.error(`Error fetching or saving metadata or tarball`, error);
    return res.status(404).json({ error: error.message });
  }
});

// @drpm/react~web~dwn.nonni.org
// @drpm/next~btc~xg4x-ay5y-q5zq-232
drg.get('/:scope/:name~:method~:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name, method, id } = req.params ?? {};
    const dependency = `${scope}/${name}~${method}~${id}`;
    Logger.log(`${dependency} => ${scope}, ${name}, ${method}, ${id}`);

    const missing = DrgRoutes.checkReqParams({ scope, name, id });
    if(missing.length > 0) {
      const missingList = missing.join(', ');
      Logger.error(`DrgRoutes: Missing required params - ${missingList}`);
      return res.status(404).json({ error: `Missing required params: ${missingList}` });;
    }

    const metadataResponse = await handleMetadataRequest(req.params);
    if(ResponseUtils.fail(metadataResponse)) {
      Logger.error(`DrgRoutes: Failed to find or fetch version`, metadataResponse.error);
      return res.send(404).json({ error: metadataResponse.error });
    }

    const metadata = metadataResponse?.data;
    Logger.debug(`Found or fetched DPK metadata=${stringify(metadata)}`);

    const dpkDistTags = metadata?.['dist-tags'];
    Logger.debug(`Found DPK metadata.dist-tags=${stringify(dpkDistTags)}`);

    const version = dpkDistTags?.latest ?? DrgRoutes.dependencyLookup({dependency})?.version;
    if(!version) {
      Logger.error(`DrgRoutes: Failed to find or fetch version`, metadataResponse.error);
      return res.send(404).json({ error: 'Failed to find or fetch version' });
    }
    Logger.debug(`Found DPK version=${version}`);

    const did = `did:${method}:${id}`;
    Logger.debug(`Using DID ${did}`);
    const tarballResponse = await handleTarballRequest({did, name, version});
    if(ResponseUtils.fail(tarballResponse)) {
      Logger.error(`DrgRoutes: Failed to find or fetch tarball`, tarballResponse.error);
      return res.send(404).json({ error: tarballResponse.error });
    }

    const tarballPath = metadataResponse?.data;
    Logger.debug(`Sending tarball at path ${tarballPath}`);
    return res.status(200).sendFile(tarballPath, {
      headers : { 'Content-Type': 'application/octet-stream' }
    });

  } catch (error: any) {
    Logger.error(`Error fetching or saving metadata or tarball`, error);
    return res.status(404).json({ error: error.message });
  }
});

// PUT route to handle metadata publishing
drg.put('/:scope/:name~:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name } = req.params;
    const packageData = req.body;

    const dpkPath = join(DRPM_DRG_DIR, name);
    const metadataPath = `${dpkPath}/metadata.json`;
    const dpkMetadata = await DRegistry.loadDpkMetadata(metadataPath);

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
    const metadataDir = join(DRPM_DRG_DIR, name);
    const metadataFilePath = join(metadataDir, `${name}.json`);

    await ensureDir(metadataDir); // Ensure the directory exists
    await writeFile(metadataFilePath, stringify(metadata));

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

    const tarballDir = join(DRPM_DRG_DIR, name);
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
