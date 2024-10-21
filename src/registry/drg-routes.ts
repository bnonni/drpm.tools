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

await ensureDir(DRG_DIR).catch(Logger.error);

const defaultError = 'Failed to fetch and save dpk metadata and tarball';

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

// @drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo
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
        Logger.error(`Error fetching package`, response.data);
        return res.status(404).json({ error: `${defaultError}: ${response.data}` });
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
        Logger.error(`Error fetching package`, response.data);
        return res.status(404).json({ error: `${defaultError}: ${response.data}` });
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
    res.status(404).json({ error: `${defaultError}: ${error.message}` });
    return;
  }
});

export default drg;
