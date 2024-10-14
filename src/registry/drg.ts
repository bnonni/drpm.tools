'use strict';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { ensureDir } from 'fs-extra';
import { fetchDPK } from '../dpm.js';
import { ResponseUtils } from '../utils/dwn.js';
import { Logger } from '../utils/logger.js';
import { REGISTRY_DIR } from './config.js';
import {
  getDpkMetadataPath,
  getDpkTarballPath,
  loadDpkMetadata,
  loadDpkTarball,
  saveDpkMetadata,
} from './utils.js';

await ensureDir(REGISTRY_DIR).catch(err => Logger.error('Error ensuring registry directory:', err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'application/octet-stream', limit: '10gb' }));
app.use((req: Request, _: Response, next: NextFunction) => {
  Logger.log(`${req.method} ${req.url}`);
  next();
});

app.get(['/', '/health'], (req: Request, res: Response) => {
  Logger.log(`[${req.baseUrl}/${req.path}] { ok: true }`);
  res.status(200).json({ ok: true });
});

app.get('/:scope/:name/:didVersion', async (req: Request, res: Response) => {
  const defaultError = 'Failed to fetch and save metadata';
  const route = req?.params[0] ?? '/:scope/:name/:didVersion';
  try {
    const {scope, name, didVersion} = req.params ?? {};
    if(!(scope || name || didVersion)) {
      const missing = [scope, name, didVersion].filter(param => !param);
      Logger.error(`[${route}] Missing required params: ${missing.join(', ')}`);
      res.status(400).json({ error: 'Missing required params' });
      return;
    }
    const [did, version] = didVersion.split('^'); // ~
    const metadataPath = getDpkMetadataPath(name, version);
    const metadata = await loadDpkMetadata(metadataPath);
    if (!metadata) {
      Logger.debug(`No metadata found, fetching ...`);
      const { ok, code = 500, status, message } = await fetchDPK({ did, dpk: { name, version, protocolPath: 'package' }});
      if(ResponseUtils.fail({ ok, code, status })) {
        Logger.error(`[${route}] Error fetching metadata:`, message);
        res.status(code).json({ error: `${defaultError}: ${message}` });
        return;
      }
      if(!await saveDpkMetadata(name, version, message)) {
        Logger.error(`[${route}] Error saving metadata:`, message);
        res.status(code).json({ error: `${defaultError}: ${message}` });
        return;
      }
      Logger.info(`Saved metadata for ${name}@${version} to ${metadataPath}`);
    }
    res.redirect(metadata?.versions[version].dist.tarball);
  } catch (error: any) {
    Logger.error(`[${route}] Error fetching or saving metadata`, error);
    res.status(500).json({ error: `${defaultError}: ${error.message}` });
    return;
  }
});

app.get('/:scope/:name/:didVersion/-/:tarball', async (req: Request, res: Response) => {
  const defaultError = 'Failed to fetch and store tarball';
  const route = req?.params[0] ?? '/:scope/:name/:didVersion/-/:tarball';
  try {
    const { scope, name, didVersion } = req.params ?? {};
    if(!(scope || name || didVersion)) {
      const missing = [scope, name, didVersion].filter(param => !param);
      Logger.error(`[${route}] Missing required params: ${missing.join(', ')}`);
      res.status(400).json({ error: 'Missing required params' });
    }
    const [did, version] = didVersion.split('^'); // ~
    const tarballPath = getDpkTarballPath(name, version);
    if (!await loadDpkTarball(tarballPath)) {
      Logger.debug(`No tarball found, fetching ...`);
      const { ok, code, status, message } = await fetchDPK({ did, dpk: { name, version, protocolPath: 'package/release' }});
      if(ResponseUtils.fail({ ok, code, status })) {
        Logger.error(`[${route}] Error fetching tarball:`, message);
        res.status(404).json({ error: `${defaultError}: ${message}` });
        return;
      }
    }
    Logger.info(`Serving tarball ${tarballPath} ...`);
    res.status(200).sendFile(tarballPath, { headers: { 'Content-Type': 'application/octet-stream' }});
  } catch (error: any) {
    Logger.error(`[${route}] Error fetching or saving tarball`, error);
    res.status(404).json(`${defaultError}: ${error.message}`);
    return;
  }
});

export default app;
