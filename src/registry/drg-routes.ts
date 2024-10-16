'use strict';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { ensureDir } from 'fs-extra';
import { ResponseUtils } from '../utils/drpm/dwn-response.js';
import { Logger } from '../utils/logger.js';
import { DRG_DIR } from '../config.js';
import { DpkManager } from '../utils/dpk/dpk-manager.js';
import { DpkRegistry } from '../utils/dpk/dpk-registry.js';
import { DrgRouteUtils } from '../utils/drpm/drg-route-utils.js';

await ensureDir(DRG_DIR).catch(err => Logger.error('Error ensuring registryd directory:', err));

const drg = express();
drg.use(cors());
drg.use(express.json());
drg.use(express.urlencoded({ extended: true }));
drg.use(express.raw({ type: 'application/octet-stream', limit: '10gb' }));
drg.use((req: Request, _: Response, next: NextFunction) => {
  Logger.log(`${req.method} ${req.url}`);
  next();
});

drg.get(['/', '/health'], (req: Request, res: Response) => {
  Logger.log(`[${req.baseUrl}/${req.path}] { ok: true }`);
  res.status(200).json({ ok: true });
});

// http://localhost:2092/@drg/did:dht/8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo/tool5/^6.1.0
// http://localhost:2092/drpm/dht/8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo/aHR0cHM6Ly9kcG0uc29mdHdhcmUvcHJvdG9jb2xzL2RwbQ/package/release
drg.get('/:scope/:method/:id/:name/:version', async (req: Request, res: Response) => {
  const defaultError = 'Failed to fetch and save metadata';
  const route = req?.params[0] ?? '/:scope/:method/:id/:nameVersion';
  Logger.log(`${req.method} ${route}: ${req.url}`);
  try {
    const {_, method, id, name, version: semver} = req.params ?? {};
    const missing = DrgRouteUtils.checkReqParams({method, id, name, semver});
    if(missing.length > 0) {
      res.status(400).json({ error: `Missing required params: ${missing.join(', ')}` });
      return;
    }

    const { version, prefix } = DrgRouteUtils.isPrefixed(semver)
      ? DrgRouteUtils.findPrefix(semver)
      : { version: semver, prefix: '' };

    const did = `did:${method ?? 'dht'}:${id}`;
    Logger.log('name, version, prefix', name, version, prefix);
    
    const metadataPath = DpkRegistry.getDpkMetadataPath({name, version});
    const tarballPath = DpkRegistry.getDpkTarballPath({name, version})
    // No metadata (thus no tarball) found, fetch both
    if (!await DpkRegistry.loadDpkMetadata(metadataPath)) {
      Logger.debug(`No metadata found at ${metadataPath}`);
      Logger.debug(`Fetching metadata and tarball for ${name}@${version} ...`);
      const { ok, code, status, message } = await DpkManager.fetchDpk({
        did,
        dpk : { name, version, path: 'package/release' }
      });
      if(ResponseUtils.fail({ ok, code, status })) {
        Logger.error(`[${route}] Error fetching tarball:`, message);
        res.status(404).json({ error: `${defaultError}: ${message}` });
        return;
      }

      Logger.info(`Saved metadata for ${name}@${version} to ${metadataPath}`);
    // Metadata, but no tarball found, fetch it
    } else if (!await DpkRegistry.loadDpkTarball(tarballPath)) {
    const dpk = { name, version, prefix, path: 'package/release' };

    if (!await DpkRegistry.loadDpkTarball(tarballPath)) {
      Logger.debug(`No tarball found, fetching ...`);
      
      const { ok, code, status, message } = await DpkManager.fetchDpk({ did, dpk });
      
      if(ResponseUtils.fail({ ok, code, status })) {
        Logger.error(`[${route}] Error fetching tarball:`, message);
        res.status(404).json({ error: `${defaultError}: ${message}` });
        return;
      }
    }
    Logger.info(`Serving tarball ${tarballPath} ...`);
    res.status(200).sendFile(tarballPath, { headers: { 'Content-Type': 'application/octet-stream' }});
  } catch (error: any) {
    Logger.error(`[${route}] Error fetching or saving metadata`, error);
    res.status(500).json({ error: `${defaultError}: ${error.message}` });
    return;
  }
});

export default drg;
