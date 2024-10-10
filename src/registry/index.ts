'use strict';

import cors from 'cors';
import express, { Request, Response } from 'express';
import { ensureDir } from 'fs-extra';
import { fetchDPK } from '../dpm.js';
import { Logger } from '../utils/logger.js';
import { REGISTRY_DIR } from './config.js';
import { accessPackageTarball, getPackageTarballFilePath, loadPackageMetadata, savePackageMetadata, savePackageTarball } from './utils.js';
await ensureDir(REGISTRY_DIR).catch(err => Logger.error('Error ensuring registry directory:', err));
import customMetadata from './metadata.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'application/octet-stream', limit: '10gb' }));
app.use((req, _, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  Logger.log('http://registry.dpm.software.local => { ok: true }');
  res.status(200).json({ ok: true });
});

app.get('/health', (req: Request, res: Response) => {
  Logger.log('http://registry.dpm.software.local/health => { ok: true }');
  res.status(200).json({ ok: true });
});

app.get('/@dpm/:name/:didVersion', async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const didVersion = req.params.didVersion;
    Logger.log('name', name);
    Logger.log('didVersion', didVersion);
    const [did, version] = didVersion.split('^');
    Logger.log('did', did);
    Logger.log('version', version);
    const metadata = await loadPackageMetadata(name, version);

    if (metadata) {
      res.json(metadata);
    } else {
      const { ok, status, statusText, message } = await fetchDPK({did, dpk: { name }});
      Logger.debug('/@dpm/:name/:didVersion => fetchDPK => ok', ok);
      Logger.debug('/@dpm/:name/:didVersion => fetchDPK => status', status);
      Logger.debug('/@dpm/:name/:didVersion => fetchDPK => statusText', statusText);
      Logger.debug('/@dpm/:name/:didVersion => fetchDPK => message', message);
      if(!ok || status !== 200 || statusText !== 'Ok') {
        Logger.error('Error fetching dpk:', message);
        res.status(500).json({ error: 'Failed to fetch and store dpk metadata' });
      }
      Logger.debug('/@dpm/:name/:didVersion => savePackageMetadata');
      await savePackageMetadata(name, version, message);
      res.status(status).json(customMetadata);
    }
  } catch (error: any) {
    Logger.error('GET /@dpm/:name/:did/:version - error fetching DPK', error);
    res.status(500).json({ error: error.message ?? 'Failed to fetch and store dpk metadata' });
  }
});

app.get('/@dpm/:name/:didVersion/-/:tarball', async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const didVersion = req.params.didVersion;
    const [did, version] = didVersion.split('^');
    const tarballPath = getPackageTarballFilePath(name, version);
    let tarballPathExists = await accessPackageTarball(tarballPath);
    Logger.log('/@dpm/:name/:didVersion/-/:tarball => tarballPath', tarballPath);

    if (!tarballPathExists) {
      const { ok, status, statusText, message } = await fetchDPK({ did, dpk: { version, integrity: encodeURIComponent('sha512-gPClNFHEACDPrNPIY9nQ5CtgNzXLek1VKLkenI/RRKrrWSSyIVte0HloLzyQJFW0bXgFnv5TgtcUM+xHE7B6/w==') }});
      if(!ok || status !== 200 || statusText !== 'Ok') {
        Logger.error('Error fetching dpk release:', message);
        res.status(500).json({ error: 'Failed to fetch and store dpk tarball' });
      }
      await savePackageTarball(message as ReadableStream<Uint8Array>, tarballPath);
    }
    res.status(200).sendFile(tarballPath);
  } catch (error: any) {
    Logger.error('GET /@dpm/:name/:version/-/:tarball', error);
    res.status(502).json({ error: error.message ?? 'Failed to fetch and store dpk tarball' });
  }
});

export default app;
