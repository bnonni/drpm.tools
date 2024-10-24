'use strict';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { ensureDir } from 'fs-extra';
import { join } from 'path';
import { DRPM_DRG_DIR, DRPM_DRG_URL } from '../config.js';
import { DIntegrity } from '../utils/dpk/integrity.js';
import { DManager } from '../utils/dpk/manager.js';
import { DRegistryUtils } from '../utils/dpk/registry-utils.js';
import { DRegistry } from '../utils/dpk/registry.js';
import { Logger } from '../utils/logger.js';
import { stringify } from '../utils/misc.js';
import { ResponseUtils } from '../utils/response.js';

type RequestParams = Request['params'];

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
    const response = await DManager.readDpk({ did, dpk: { name, path: 'package' } });
    if (ResponseUtils.fail(response)) {
      Logger.error(`DrgRoutes: Error fetching metadata`, response.error);
      return DRegistryUtils.routeFailure({ error: response.error });
    }
    dpkMetadata = response?.data;
    if(!dpkMetadata) {
      Logger.error(`DrgRoutes: Failed to fetch metadata`, response);
      const error = response?.error ?? response?.status ?? 'Failed to find version';
      return DRegistryUtils.routeFailure({ error });
    }
    await DRegistry.saveMetadataToPath({ path: dpkMetadataPath, metadata: dpkMetadata });
    Logger.debug(`Found and saved metadata to ${dpkMetadataPath}`);
  }

  return DRegistryUtils.routeSuccess({ data: dpkMetadata });
}

async function handleTarballRequest({did, name, version}: {did: string; name: string; version: string}): Promise<any> {
  const dpkPath = DRegistry.getDpkPath({ name });
  const dpkTarballPath = `${dpkPath}/${name}-${version}.tgz`;
  let dpkTarball = await DRegistry.loadDpkTarball(dpkTarballPath);

  if (!dpkTarball) {
    await ensureDir(dpkPath);
    Logger.debug(`Tarball not found for ${name} at ${dpkTarballPath}, fetching ...`);
    const response = await DManager.readDpk({ did, dpk: { name, version, path: 'package/release' } });
    if (ResponseUtils.fail(response)) {
      Logger.error(`DrgRoutes: Error fetching tarball`, response.data);
      return DRegistryUtils.routeFailure({ error: response.error });
    }
    dpkTarball = response?.data;
    if(!dpkTarball) {
      Logger.error(`DrgRoutes: Failed to fetch tarball`, response);
      const error = response?.error ?? response?.status ?? 'Failed to find version';
      return DRegistryUtils.routeFailure({ error });
    }
    await DRegistry.saveTarballToPath({ path: dpkTarballPath, tarball: dpkTarball });
    Logger.debug(`Found and saved tarball to ${dpkTarballPath}`);
  }

  return DRegistryUtils.routeSuccess({ data: dpkTarballPath });
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

drg.get(['/', '/health'], (_: Request, res: Response) => {
  res.status(200).json({ ok: true, message: 'Registry is up and running!' });
});

// "@drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo": "^6.1.0"
// @drpm/react~web~dwn.nonni.org
// @drpm/next~btc~xg4x-ay5y-q5zq-232
drg.get(['/:scope/:name~:id', '/:scope/:name~:method~:id'], async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name, method, id } = req.params ?? {};
    const dependency = !method ? `${scope}/${name}~${id}` : `${scope}/${name}~${method}~${id}`;;
    Logger.log(`${dependency} => ${stringify(req.params)}`);

    const missing = DRegistryUtils.checkReqParams(req.params) ?? [];
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

    const version = dpkDistTags?.latest ?? DRegistryUtils.lookupDependencyVersion({dependency})?.version;
    if(!version) {
      Logger.error(`DrgRoutes: Failed to find or fetch version`, metadataResponse.error);
      return res.send(404).json({ error: 'Failed to find or fetch version' });
    }
    Logger.debug(`Found DPK version=${version}`);

    const did = !method ? `did:dht:${id}` : `did:${method}:${id}`;
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
    const { scope, name, method, id } = req.params ?? {};
    if(method) {
      return res.status(404).json({ error: 'Method not yet supported' });
    }
    const packageMetadata = req.body;
    Logger.log(`new packageMetadata=${stringify(packageMetadata)}`);

    const dependency = !method ? `${scope}/${name}~${id}` : `${scope}/${name}~${method}~${id}`;;
    Logger.log(`${dependency} => ${stringify(req.params)}`);

    const missing = DRegistryUtils.checkReqParams(req.params) ?? [];
    if(missing.length > 0) {
      const missingList = missing.join(', ');
      Logger.error(`DrgRoutes: Missing required params - ${missingList}`);
      return res.status(404).json({ error: `Missing required params: ${missingList}` });;
    }

    const dpkPath = join(DRPM_DRG_DIR, name);
    if(!dpkPath) {
      await ensureDir(dpkPath);
    }

    const metadataPath = `${dpkPath}/metadata.json`;
    const dpkMetadata = await DRegistry.loadDpkMetadata(metadataPath);
    Logger.log(`existing dpkMetadata=${stringify(dpkMetadata)}`);

    const metadata = !dpkMetadata
      ? DRegistryUtils.createMetadata(packageMetadata)
      : DRegistryUtils.updateMetadata(dpkMetadata, packageMetadata);

    Logger.log(`final metadata=${stringify(metadata)}`);

    await DRegistry.saveMetadataToPath({ path: metadataPath, metadata });
    Logger.log(`Metadata saved to ${metadataPath}`);

    const response = await DManager.createPackage({ metadata });

    // !method ? {} : await DManager.createPackageDidWeb({ metadata, did: `did:${method}:${id}`});

    if(ResponseUtils.fail(response)) {
      Logger.error(`DrgRoute: Failed to publish package metadata`, response.error);
      return res.send(response.code).json({ error: response.error });
    }

    const tarballUrl = !method
      ? `${DRPM_DRG_URL}/${scope}/${name}~${id}/-/package.tgz?parentId=${response.data.id}`
      : `${DRPM_DRG_URL}/${scope}/${name}~${method}~${id}/-/package.tgz?parentId=${response.data.id}`;

    return res.status(201).json({tarballUrl});
  } catch (error: any) {
    Logger.error('Error during publish:', error);
    return res.status(404).json({ error: 'Failed to publish package metadata.' });
  }
});

// POST route to handle tarball upload without using multer
drg.post(['/:scope/:name~:id/-/package.tgz', '/:scope/:name~:method~:id/-/package.tgz'], async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.params;
    const { parentId } = req.query as { parentId: string };
    const version = req.body.version || DRegistryUtils.lookupCurrentVersion() || 'latest';

    const dpkPath = join(DRPM_DRG_DIR, name);
    if(!dpkPath) {
      await ensureDir(dpkPath);
    }
    const tarballPath = join(dpkPath, `${name}-${version}.tgz`);
    const tarball = await DRegistry.saveTarballToPath({ path: tarballPath, tarball: req.body });
    if(!tarball) {
      Logger.error(`DrgRoutes: Failed to save tarball to ${tarballPath}`);
      return res.status(404).json({ error: 'Failed to save tarball.' });
    }
    const integrity = await DIntegrity.sha512IntegrityStream(req.body);
    const release = req.body;
    Logger.log(`Integrity=${integrity}`);
    const response = await DManager.createPackageRelease({ parentId, version, integrity, release});
    if(ResponseUtils.fail(response)) {
      Logger.error(`DrgRoutes: Failed to upload tarball`, response.error);
      return res.send(404).json({ error: response.error });
    }
    Logger.log('response', response);
    Logger.log('response.data', response.data);
    Logger.log(`Tarball uploaded successfully to ${tarballPath}`);

    res.status(200).json({ message: 'Tarball uploaded successfully' });
  } catch (error: any) {
    Logger.error('Error during tarball upload:', error);
    res.status(500).json({ error: 'Failed to upload tarball.' });
  }
});

export default drg;
