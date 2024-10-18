'use strict';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { ensureDir } from 'fs-extra';
import { DRG_DIR, NPM_PACKAGE_JSON } from '../config.js';
import { DpkManager } from '../utils/dpk/dpk-manager.js';
import { DpkRegistry } from '../utils/dpk/dpk-registry.js';
import { DrgRouteUtils } from '../utils/drpm/drg-route-utils.js';
import { ResponseUtils } from '../utils/drpm/dwn-response.js';
import { Logger } from '../utils/logger.js';

await ensureDir(DRG_DIR).catch(err => Logger.error('Error ensuring registryd directory:', err));

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

// "@did/dht...8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo...tool5": "^6.1.0"
drg.get('/:scope/*', async (req: Request, res: Response): Promise<any> => {
  const scope = req.params.scope;
  const [method, id, name] = req.params[0]?.split('...');
  console.log('scope, method, id, name', scope, method, id, name);
});

drg.get('/:scope/:name', async (req: Request, res: Response): Promise<any> => {
  const defaultError = 'Failed to fetch and save metadata';
  Logger.log(`${req.method} ${req.params}: ${req.url}`);

  try {
    const missing = DrgRouteUtils.checkReqParams({...req.params});
    if(missing.length > 0) {
      const missingString = missing.join(', ');
      Logger.error(`Missing required params: ${missingString}`);
      return res.status(400).json({ error: `Missing required params: ${missingString}` });;
    }

    const scope = req.params.scope;
    const name = req.params.name;
    Logger.error(`Looking up dependency using ${scope}/${name} ...`);
    const dependency = `${scope}/${name}`;
    const [semver, methodId] = NPM_PACKAGE_JSON?.dependencies[dependency]?.split('+') ?? [null, null];
    if(!(semver && methodId)) {
      Logger.error(`Unable to lookup dependency: ${dependency}`);
      return res.status(400).json({ error: `Unable to lookup dependency: invalid package ${scope}/${name}` });
    }
    const [method, methodSpecificId] = methodId.split('>');
    Logger.error(`method, methodSpecificId`, method, methodSpecificId);
    const did = `did:${method}:${methodSpecificId}`;
    const { version, prefix } = DrgRouteUtils.isPrefixed(semver)
      ? DrgRouteUtils.findPrefix(semver)
      : { version: semver, prefix: '' };
      // TODO: Lookup prefix to determine valid version range and fetch tarball based on that
    Logger.log('{name, version, prefix, did}', {name, version, prefix, did});

    const metadataPath = DpkRegistry.getDpkMetadataPath({name, version});
    const metadata = await DpkRegistry.loadDpkMetadata(metadataPath);
    const tarballPath = DpkRegistry.getDpkTarballPath({name, version});
    const tarball = await DpkRegistry.loadDpkTarball(tarballPath);

    // Metadata (implies taball does not exist); fetch both
    if (!metadata) {
      Logger.debug(`Fetching metadata and tarball for ${name}@${version} ...`);

      const response = await DpkManager.fetchBoth({ did, dpk: { name, version } });
      if(ResponseUtils.fail(response)) {
        Logger.error(`Error fetching metadata and tarball`, response.data);
        return res.status(404).json({ error: `${defaultError}: ${response.data}` });
      }

      Logger.info(`Saved metadata for ${name}@${version} to ${metadataPath}`);
      Logger.info(`Saved tarball for ${name}@${version} to ${tarballPath}`);
      return res.status(200).sendFile(tarballPath, { headers: { 'Content-Type': 'application/octet-stream' }});
    }

    // Metadata exists, but tarball does not; fetch it
    if (!tarball) {
      Logger.debug(`Fetching tarball for ${name}@${version} ...`);

      const response = await DpkManager.fetchDpk({ did, dpk: { name, version, path: 'package/release' } });

      if(ResponseUtils.fail(response)) {
        Logger.error(`Error fetching tarball`, response.data);
        return res.status(404).json({ error: `${defaultError}: ${response.data}` });
      }
    }

    Logger.info(`Serving tarball ${tarballPath} for ${name}@${version} ...`);
    return res.status(200).sendFile(tarballPath, { headers: { 'Content-Type': 'application/octet-stream' }});
  } catch (error: any) {
    Logger.error(`Error fetching or saving metadata or tarball`, error);
    res.status(404).json({ error: `${defaultError}: ${error.message}` });
    return;
  }
});

export default drg;
