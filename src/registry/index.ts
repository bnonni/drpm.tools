'use strict';

import cors from 'cors';
import express, { Request, Response } from 'express';
import { ensureDir } from 'fs-extra';
import { fetchDPK } from '../dpm.js';
import { ResponseUtils } from '../utils/dwn.js';
import { Logger } from '../utils/logger.js';
import { REGISTRY_DIR } from './config.js';

import {
  accessPackageTarball,
  getPackageMetadataFilePath,
  getPackageTarballFilePath,
  loadPackageMetadata,
  savePackageMetadata,
  savePackageTarball
} from './utils.js';

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

app.get('/:scope/:name/:didVersion', async (req: Request, res: Response) => {
  const errorJson = { error: 'Failed to fetch and store dpk metadata' };
  try {
    const scope = req.params.scope;
    Logger.log('scope', scope);
    const name = req.params.name;
    Logger.log('name', name);
    const didVersion = req.params.didVersion;
    Logger.log('didVersion', didVersion);
    const [did, version] = didVersion.split('^');
    Logger.log('did, version', did, version);
    const metadataFilePath = getPackageMetadataFilePath(name, version);
    Logger.debug('metadataFilePath', metadataFilePath);
    let metadata = await loadPackageMetadata(metadataFilePath);
    Logger.debug('metadata', metadata);

    if (!metadata) {
      Logger.debug('!metadata', !metadata);
      const dpk = await fetchDPK({did, dpk: { name: `${scope}/${name}` }});
      const { ok, code, status, message } = dpk;
      Logger.debug('{ok, code, status}', {ok, code, status });
      if(ResponseUtils.fail(dpk)) {
        Logger.error('Error fetching dpk:', message);
        throw new Error('Error fetching dpk release: ' + message);
      }
      await savePackageMetadata(name, version, message);
      metadata = await loadPackageMetadata(metadataFilePath);
      Logger.info(`Saved metadata for ${name}@${version} to ${metadataFilePath}`);
    }
    res.status(200).json(metadata);
  } catch (error: any) {
    Logger.error('GET /@dpm/:name/:did/:version - error fetching DPK', error);
    res.status(500).json(errorJson);
  }
});

app.get('/:scope/:name/-/:tarball', async (req: Request, res: Response) => {
  try {
    const scope = req.params.scope;
    Logger.log('scope', scope);
    const name = req.params.name;
    Logger.log('name', name);
    const didVersion = req.params.didVersion;
    Logger.log('didVersion', didVersion);
    const [did, version] = didVersion.split('^');
    Logger.log('did, version', did, version);
    const tarball = req.params.tarball;
    Logger.log('tarball', tarball);
    const tarballPath = getPackageTarballFilePath(name, version);
    Logger.log('tarballPath', tarballPath);
    let tarballPathExists = await accessPackageTarball(tarballPath);
    Logger.log('tarballPathExists', tarballPathExists);

    if (!tarballPathExists) {
      Logger.log('!tarballPathExists', !tarballPathExists);
      const dpk = await fetchDPK({ did, dpk : {
        version,
        integrity : encodeURIComponent('sha512-gPClNFHEACDPrNPIY9nQ5CtgNzXLek1VKLkenI/RRKrrWSSyIVte0HloLzyQJFW0bXgFnv5TgtcUM+xHE7B6/w==')
      }});
      const { ok, code, status, message } = dpk;
      Logger.log('{ok, code, status}', {ok, code, status});
      if(ResponseUtils.fail(dpk)) {
        Logger.error('Error fetching dpk release', message);
        throw new Error('Error fetching dpk release: ' + message);
      }
      await savePackageTarball(message as ReadableStream<Uint8Array>, tarballPath);
    }
    Logger.info(`Serving tarball ${tarballPath}`);
    res.status(200).sendFile(tarballPath, { headers: { 'Content-Type': 'application/octet-stream' }});
  } catch (error: any) {
    Logger.error('[GET] - /@:packageName/-/:tarball', error);
    res.status(500).json({ error: error.message ?? 'Server error' });
  }
});

export default app;
