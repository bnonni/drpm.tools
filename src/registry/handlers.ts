import { Request, Response } from 'express';
import { pipeline } from 'stream/promises';
import { pack } from 'tar-stream';
import zlib from 'zlib';
import { DManager } from '../utils/dpk/manager.js';
import { DrlBuilder } from '../utils/dwn/drl-builder.js';
import { Logger } from '../utils/logger.js';
import { ResponseUtils } from '../utils/response.js';
import { RegistryUtils } from './utils.js';

export class RegistryHandlers {
  public static async home(_: Request, res: Response): Promise<any> {
    return res.status(200).json({ ok: true });
  }

  public static async health(_: Request, res: Response): Promise<any> {
    return res.status(200).json({ message: 'Registry is up and running!' });
  }

  public static async install(req: Request, res: Response): Promise<any> {
    try {
      const { scope, name, method = 'dht', id } = req.params ?? {};
      const dependency = method === 'dht' ? `${scope}/${name}~${id}` : `${scope}/${name}~${method}~${id}`;;
      Logger.log(`Installing ${dependency} ...`);

      const missing = RegistryUtils.checkReqParams({scope, name, method, id}) ?? [];
      if(missing.length > 0) {
        const missingList = missing.join(', ');
        Logger.error(`RegistryHandlers: Missing required params - ${missingList}`);
        return res.status(404).json({ error: `Missing required params: ${missingList}` });
      }

      const response = await DManager.readPackageRecord({ name: dependency });
      const {data} = response ?? {};
      if(ResponseUtils.fail(response)) {
        const {code, error} = response;
        Logger.error(`RegistryHandlers: Failed to find or fetch version`, response.error);
        return res.status(code).json({ error });
      }

      const isValid = Object.keys(data).some(key => ['dist-tags', 'versions'].includes(key));
      if(!isValid) {
        Logger.error(`RegistryHandlers: Invalid metadata`, data);
        return res.status(404).json({ error: 'Invalid metadata: missing keys "dist-tags" and "versions"' });
      }

      const {'dist-tags': distTags, versions, endpoint} = data;
      const version = distTags.latest;

      const did = `did:${method}:${id}`;
      Logger.debug(`Using ${did} to find dwnEndpoints ...`);

      versions[version].dist.tarball = DrlBuilder
        .create({did, endpoint})
        .buildDrlRead({
          protocolPath : 'package/release',
          filters      : {
            tags    : [
              { subKey: 'name', value: name },
              { subKey: 'version', value: version }
            ],
          }
        });

      Logger.log(`Returing tarball url ${data.versions[version].dist.tarball} for npm install`);

      return res.status(200).json(data);
    } catch (error: any) {
      Logger.error(`Error fetching or saving metadata or tarball`, error);
      return res.status(404).json({ error: `Failed to install package: ${error.message}` });
    }
  }

  public static async publish(req: Request, res: Response): Promise<any> {
    try {
      const { scope, name, method = 'dht', id } = req.params ?? {};

      if(method !== 'dht') {
        return res.status(404).json({ error: `Unsupported DID method ${method}. DRPM only supports DHT method at this time` });
      }

      const metadata = req.body;
      const isValid = Object.keys(metadata).some(key => ['dist-tags', 'versions'].includes(key));
      if(!isValid) {
        Logger.error(`RegistryHandlers: Invalid metadata`, metadata);
        return res.status(404).json({ error: 'Invalid metadata: missing keys "dist-tags" and "versions"' });
      }
      const { 'dist-tags': distTags, _attachments, versions } = metadata;
      const version = distTags.latest;
      const attachment = Buffer.from(_attachments[`${scope}/${name}~${id}-${version}.tgz`]?.data, 'base64');
      const integrity = versions[version].dist.integrity;

      const missing = RegistryUtils.checkReqParams({name, id}) ?? [];
      if(missing.length > 0) {
        const missingList = missing.join(', ');
        Logger.error(`RegistryHandlers: Missing required params - ${missingList}`);
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
        Logger.error(`RegistryHandlers: Failed to upload tarball`, error);
        return res.status(code).json({ error });
      }

      Logger.log(`Tarball uploaded successfully!`, relRes.data);

      return res.status(200).json({ message: 'Tarball uploaded successfully' });
    } catch (error: any) {
      Logger.error('Error during publish:', error);
      return res.status(404).json({ error: `Failed to publish package: ${error.message}` });
    }
  }
}

export const home = (_: Request, res: Response): any => {
  return res.status(200).json({ ok: true });
};

export const health = (_: Request, res: Response): any => {
  return res.status(200).json({ message: 'Registry is up and running!' });
};

export const npmInstall = async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name, method, id } = req.params ?? {};
    const dependency = !method ? `${scope}/${name}~${id}` : `${scope}/${name}~${method}~${id}`;;
    Logger.log(`Installing ${dependency} ...`);

    if(method) {
      Logger.log('Deleting req param method ...');
      delete req.params.method;
    }
    const missing = RegistryUtils.checkReqParams(req.params) ?? [];
    if(missing.length > 0) {
      const missingList = missing.join(', ');
      Logger.error(`RegistryHandlers: Missing required params - ${missingList}`);
      return res.status(404).json({ error: `Missing required params: ${missingList}` });
    }

    const response = await DManager.readPackageRecord({ name: dependency });
    const {data} = response ?? {};
    if(ResponseUtils.fail(response)) {
      const {code, error} = response;
      Logger.error(`RegistryHandlers: Failed to find or fetch version`, response.error);
      return res.status(code).json({ error });
    }

    const isValid = Object.keys(data).some(key => ['dist-tags', 'versions'].includes(key));
    if(!isValid) {
      Logger.error(`RegistryHandlers: Invalid metadata`, data);
      return res.status(404).json({ error: 'Invalid metadata: missing keys "dist-tags" and "versions"' });
    }

    const {'dist-tags': distTags, versions, endpoint} = data;
    const version = distTags.latest;

    const did = !method ? `did:dht:${id}` : `did:${method}:${id}`;
    Logger.debug(`Using ${did} to find dwnEndpoints ...`);

    versions[version].dist.tarball = DrlBuilder
      .create({did, endpoint})
      .buildDrlRead({
        protocolPath : 'package/release',
        filters      : {
          tags    : [
            { subKey: 'name', value: name },
            { subKey: 'version', value: version }
          ],
        }
      });

    Logger.log(`Returing tarball url ${data.versions[version].dist.tarball} for npm install`);

    return res.status(200).json(data);
  } catch (error: any) {
    Logger.error(`Error fetching or saving metadata or tarball`, error);
    return res.status(404).json({ error: `Failed to install package: ${error.message}` });
  }
};

export const npmPublish = async (req: Request, res: Response): Promise<any> => {
  try {
    const { scope, name, method, id } = req.params ?? {};

    if(method) {
      return res.status(404).json({ error: `Unsupported DID method ${method}. DRPM only supports DHT method at this time` });
    }

    const metadata = req.body;
    const isValid = Object.keys(metadata).some(key => ['dist-tags', 'versions'].includes(key));
    if(!isValid) {
      Logger.error(`RegistryHandlers: Invalid metadata`, metadata);
      return res.status(404).json({ error: 'Invalid metadata: missing keys "dist-tags" and "versions"' });
    }
    const { 'dist-tags': distTags, _attachments, versions } = metadata;
    const version = distTags.latest;
    const attachment = Buffer.from(_attachments[`${scope}/${name}~${id}-${version}.tgz`]?.data, 'base64');
    const integrity = versions[version].dist.integrity;

    const missing = RegistryUtils.checkReqParams({name, id}) ?? [];
    if(missing.length > 0) {
      const missingList = missing.join(', ');
      Logger.error(`RegistryHandlers: Missing required params - ${missingList}`);
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
      Logger.error(`RegistryHandlers: Failed to upload tarball`, error);
      return res.status(code).json({ error });
    }

    Logger.log(`Tarball uploaded successfully!`, relRes.data);

    return res.status(200).json({ message: 'Tarball uploaded successfully' });
  } catch (error: any) {
    Logger.error('Error during publish:', error);
    return res.status(404).json({ error: `Failed to publish package: ${error.message}` });
  }
};
