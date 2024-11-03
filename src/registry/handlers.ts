import { Request, Response, Router } from 'express';
import { pipeline } from 'stream/promises';
import { pack } from 'tar-stream';
import zlib from 'zlib';
import { DManager } from '../utils/dpk/manager.js';
import { DrlBuilder } from '../utils/dwn/drl-builder.js';
import { Logger } from '../utils/logger.js';
import { ResponseUtils } from '../utils/response.js';
import { RegistryUtils } from './utils.js';

class RegistryHandlers {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initializeRoutes(): void {
    this.router.get('/', RegistryHandlers.home);
    this.router.get('/health', RegistryHandlers.health);
    /**
     * GET route to handle npm install request
     * @summary
     * To install using this route, run the registry server on localhost:2092 and do one of the following:
     * Option 1
     *  1.1) Manually add the package name to package.json dependencies: "@drpm/packageName~methodSpecificId": "[prefix]M.m.p"
     *  1.2) Run "npm install" in the root directory of your package
     *
     * Option 2
     *  2.1) Run "npm install @drpm/packageName~methodSpecificId" in the root directory of your package
     *
     * Option 3
     *  3.1) Run "npm install --registry http://localhost:2092 packageName~methodSpecificId" in the root directory of your package
     *
     * Option 4
     *  4.1) Manually add the package name to package.json dependencies: "packageName~methodSpecificId": "[prefix]M.m.p"
     *  4.2) Run "npm install --registry http://localhost:2092" in the root directory of your package
     */
    this.router.get(['/:scope/:name~:id', '/:scope/:name~:method~:id'], RegistryHandlers.install);
    /**
     * PUT route to handle npm publish request
     * @summary
     * To publish using this route, do one of the following:
     * Option 1
     *  1.1) Run the registry server on localhost:2092
     *  1.2) Set "name" in your package.json to one of the following:
     *      1.2.1) "name": "@drpm/packageName~methodSpecificId" (e.g. "@drpm/mydpk1~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo")
     *      1.2.2) "name": "@drpm/packageName~didMethod~methodSpecificId" (e.g. "@drpm/mydpk1~web~nonni.org")
     *  1.3) Run "npm publish" in the root directory of your package
     *
     * Option 2
     * 2.1) Run the registry server on localhost:2092
     * 2.2) Set "name" in your package.json to one of the following
     *      2.2.1) "name": "packageName~methodSpecificId" (e.g. "mydpk1~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo")
     *      2.2.2) "name": "packageName~didMethod~methodSpecificId" (e.g. "mydpk1~web~nonni.org")
     * 2.3) Run "npm publish --registry http://localhost:2092" in the root directory of your package
     */
    this.router.put(['/:scope/:name~:id', '/:scope/:name~:method~:id'], RegistryHandlers.publish);
  }

  private static async home(_: Request, res: Response): Promise<any> {
    return res.status(200).json({ ok: true });
  }

  private static async health(_: Request, res: Response): Promise<any> {
    return res.status(200).json({ message: 'Registry is up and running!' });
  }

  private static async install(req: Request, res: Response): Promise<any> {
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

  private static async publish(req: Request, res: Response): Promise<any> {
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
        for await (const chunk of source) { chunks.push(chunk); }
      });
      const release = Buffer.concat(chunks);
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
      // const record = relRes.data as Record;
      // , record.tags
      Logger.log(`Tarball uploaded successfully!`);

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

export default new RegistryHandlers().getRouter();
