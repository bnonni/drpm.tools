import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { Logger } from '../utils/logger.js';
import { RegistryHandlers } from './handlers.js';

const registry = express();
registry.use(cors());
registry.use(express.json());
registry.use(express.urlencoded({ extended: true }));
registry.use(express.raw({ type: 'application/octet-stream', limit: '10gb' }));
registry.use((req: Request, _: Response, next: NextFunction) => {
  req.url = decodeURIComponent(req.url);
  Logger.log(`${req.method} ${req.url}`);
  next();
});

registry.get('/', RegistryHandlers.home);
registry.get('/health', RegistryHandlers.health);

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
registry.get(['/:scope/:name~:id', '/:scope/:name~:method~:id'], RegistryHandlers.install);

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
registry.put(['/:scope/:name~:id', '/:scope/:name~:method~:id'], RegistryHandlers.publish);

export default registry;
