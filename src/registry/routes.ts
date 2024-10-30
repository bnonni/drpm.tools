import { Request, Response } from 'express';
import { pipeline } from 'stream/promises';
import { pack } from 'tar-stream';
import zlib from 'zlib';
import { DManager } from '../utils/dpk/manager.js';
import { Logger } from '../utils/logger.js';
import { stringify } from '../utils/misc.js';
import { ResponseUtils } from '../utils/response.js';
import { RegistryUtils } from './utils.js';

export const healthCheck = (_: Request, res: Response) => {
  res.status(200).json({ ok: true, message: 'Registry is up and running!' });
};

export const npmInstall = async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name, method, id } = req.params ?? {};
    const dependency = !method ? `${scope}/${name}~${id}` : `${scope}/${name}~${method}~${id}`;;
    Logger.log(`${dependency} => ${stringify(req.params)}`);

    const missing = RegistryUtils.checkReqParams({scope, name, id}) ?? [];
    if(missing.length > 0) {
      const missingList = missing.join(', ');
      Logger.error(`RegistryRoutes: Missing required params - ${missingList}`);
      return res.status(404).json({ error: `Missing required params: ${missingList}` });
    }

    const did = !method ? `did:dht:${id}` : `did:${method}:${id}`;
    Logger.debug(`Using DID ${did}`);

    const metadataResponse = await DManager.readDpk({ did, dpk: { name: dependency, path: 'package' } });
    if(ResponseUtils.fail(metadataResponse)) {
      Logger.error(`RegistryRoutes: Failed to find or fetch version`, metadataResponse.error);
      return res.status(404).json({ error: metadataResponse.error });
    }

    const version = metadataResponse.data['dist-tags'].latest;
    const tarballResponse = await DManager.readDpk({ did, dpk: { version, name, path: 'package/release' }});
    Logger.debug('DManager.readDpk => tarballResponse', tarballResponse);
    if(ResponseUtils.fail(tarballResponse)) {
      Logger.error(`RegistryRoutes: Failed to find or fetch version`, metadataResponse.error);
      return res.status(404).json({ error: metadataResponse.error });
    }
    Logger.debug('DManager.readDpk => tarballResponse', tarballResponse);
    const dpkVersionPath = RegistryUtils.getDpkVersionPath({ name, version });
    const ensured = await RegistryUtils.ensureDpkDir(dpkVersionPath);
    if(!ensured) {
      Logger.error(`RegistryRoutes: Failed to ensure dir at ${dpkVersionPath}`);
      return res.status(404).json({ error: 'Failed to ensure directory' });
    }
    const path = `${dpkVersionPath}/${name}-${version}.tgz`;
    Logger.debug(`Saving tarball to ${path} ...`);
    const saved = await RegistryUtils.saveTarballToPath({ path, tarball: tarballResponse.data });
    if(!saved) {
      Logger.error(`RegistryRoutes: Failed to save tarball to path ${path}`);
      return res.status(404).json({ error: 'Failed to save tarball to path' });
    }
    Logger.debug(`Saved tarball to ${path}`);
    return res.status(200).sendFile(path);

  } catch (error: any) {
    Logger.error(`Error fetching or saving metadata or tarball`, error);
    return res.status(404).json({ error: `Failed to install package: ${error.message}` });
  }
};

export const npmPublish = async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name, method, id } = req.params ?? {};

    if(method) {
      return res.status(404).json({ error: `Method ${method} not supported` });
    }

    const metadata = req.body;
    const version = metadata['dist-tags'].latest;
    const attachment = Buffer.from(metadata._attachments[`${scope}/${name}~${id}-${version}.tgz`]?.data, 'base64');
    const integrity = metadata.versions[version].dist.integrity;

    Logger.log('metadata', metadata);
    Logger.log('version', version);
    Logger.log('attachment', attachment);
    Logger.log('integrity', integrity);

    const missing = RegistryUtils.checkReqParams({name, id}) ?? [];
    if(missing.length > 0) {
      const missingList = missing.join(', ');
      Logger.error(`RegistryRoutes: Missing required params - ${missingList}`);
      return res.status(404).json({
        error : `Missing required params: ${missingList}`
      });
    }

    const pkgRes = await DManager.createPackage({ metadata });
    if(ResponseUtils.fail(pkgRes)) {
      const {code, error} = pkgRes;
      Logger.error(`DrgRoute: Failed to publish package metadata`, error);
      return res.status(code).json({ error });
    }
    Logger.log('Package metadata published successfully!');

    const tarPack = pack();
    const gzip = zlib.createGzip();

    tarPack.entry({ name: `${name}~${id}-${version}.tgz` }, attachment);
    tarPack.finalize();

    const chunks: Buffer[] = [];
    await pipeline(tarPack, gzip, async (source) => {
      for await (const chunk of source) {
        chunks.push(chunk); // Collect chunks into an array
      }
    });
    const release = Buffer.concat(chunks);

    Logger.info('release', release);
    const relRes = await DManager.createPackageRelease({
      name,
      version,
      release,
      integrity,
      parentId : pkgRes.data,
    });

    if(ResponseUtils.fail(relRes)) {
      const {error, code} = relRes;
      Logger.error(`RegistryRoutes: Failed to upload tarball`, error);
      return res.status(code).json({ error });
    }

    Logger.log(`Tarball uploaded successfully!`, relRes.data);

    return res.status(200).json({ message: 'Tarball uploaded successfully' });
  } catch (error: any) {
    Logger.error('Error during publish:', error);
    return res.status(404).json({ error: `Failed to publish package: ${error.message}` });
  }
};