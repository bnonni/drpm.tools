'use strict';

import cors from 'cors';
import express, { Request, Response } from 'express';
import { ensureDir } from 'fs-extra';
import {
  REGISTRY_DIR,
  Logger,
  ResponseUtils,
  fetchDPK,
  loadMetadata,
  loadTarball,
  getMetadataPath,
  getTarballPath,
  saveMetadata,
} from '../index.js';

await ensureDir(REGISTRY_DIR).catch(err => Logger.error('Error ensuring registry directory:', err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'application/octet-stream', limit: '10gb' }));
app.use((req, _, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (_: Request, res: Response) => {
  Logger.log('http://registry.dpm.software.local => { ok: true }');
  res.status(200).json({ ok: true });
});

app.get('/health', (_: Request, res: Response) => {
  Logger.log('http://registry.dpm.software.local/health => { ok: true }');
  res.status(200).json({ ok: true });
});

app.get('/:scope/:name/:didversion', async (req: Request, res: Response) => {
  const errorJson = { error: 'Failed to fetch and store dpk metadata' };
  const route = '/@dpm/:name/:did/:version';
  const {scope, name, didversion} = req.params;
  if(!(scope || name || didversion)) {
    Logger.error('GET /@dpm/:name/:did/:version - missing scope, name, or didversion');
    res.status(400).json({ error: 'Missing scope, name, or did(^|~)version' });

  }
  Logger.log('req.params', req.params);
  const [did, version] = didversion.split('^'); // ~
  Logger.log('did, version', did, version);
  try {
    const metadataPath = getMetadataPath(name, version);
    Logger.debug('metadataPath', metadataPath);
    const metadata = await loadMetadata(metadataPath);

    if (!metadata) {
      Logger.debug('!metadata', !metadata);
      const { ok, code = 500, status, message } = await fetchDPK({ did, dpk: { name, protocolPath: 'package' }});
      if(ResponseUtils.fail({ ok, code, status })) {
        Logger.error('Error fetching package:', message);
        res.status(code).json({ error: 'Error fetching package: ' + message });
        return;
      }
      Logger.debug(`Fetched DPK from DWN: ok=${ok} code=${code} status=${status}`);
      await saveMetadata(name, version, message);
      Logger.info(`Saved metadata for ${name}@${version} to ${metadataPath}`);
    }
    const registryTgzUrl = metadata.versions[version].dist.tarball;
    Logger.log('registryTgzUrl', registryTgzUrl);
    res.redirect(registryTgzUrl);
  } catch (error: any) {
    Logger.error('GET /@dpm/:name/:did/:version - error fetching package', error);
    res.status(500).json(errorJson);
    return;
  }
});

app.get('/:scope/:name/:didVersion/-/:tarball', async (req: Request, res: Response) => {
  try {
    const scope = req.params.scope;
    Logger.log('scope', scope);
    const name = req.params.name;
    Logger.log('name', name);
    // const did = req.params.did;
    // Logger.log('did', did);
    // const version = req.params.version;
    // Logger.log('version', version);
    const didVersion = req.params.didVersion;
    Logger.log('didVersion', didVersion);
    const [did, version] = didVersion.split('^'); // ~
    Logger.log('did, version', did, version);
    const tarball = req.params.tarball;
    Logger.log('tarball', tarball);
    const tarballPath = getTarballPath(name, version);
    Logger.log('tarballPath', tarballPath);
    let tgz = await loadTarball(tarballPath);
    Logger.log('tgz', tgz);

    if (!tgz) {
      Logger.log('!tgz', !tgz);
      const dpk = await fetchDPK({ did, dpk: { name, version, protocolPath: 'package/release' }});
      const { ok, code, status, message } = dpk;
      Logger.log('{ok, code, status}', {ok, code, status});
      Logger.log('message', message);
      if(ResponseUtils.fail(dpk)) {
        res.status(500).json({ error: `Error fetching package release: ${status}` });
        return;
      }
    }
    Logger.info(`Serving tarball ${tarballPath}`);
    res.status(200).sendFile(tarballPath, { headers: { 'Content-Type': 'application/octet-stream' }});
  } catch (error: any) {
    Logger.error('[GET] - /:scope/:name/:did/:version/-/:tarball', error);
    res.status(500).json({ error: error.message ?? 'Server error' });
    return;
  }
});

export default app;
