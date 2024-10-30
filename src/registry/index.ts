import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { Logger } from '../utils/logger.js';
import { healthCheck, npmInstall, npmPublish } from './routes.js';

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

// GET route to handle health check
registry.use(['/', '/health'], healthCheck);

// GET route to handle npm install
// E.g. list dpk in dependencies "@drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo": "^6.1.0"
// E.g. running `npm install @drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo`
registry.get(['/:scope/:name~:id', '/:scope/:name~:method~:id'], npmInstall);

// PUT route to handle metadata publishing
// E.g. naming dpk `@drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo` and running `npm publish`
// E.g. naming dpl `tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo` and running `npm publish --registry=http://localhost:2092`
registry.put(['/:scope/:name~:id', '/:scope/:name~:method~:id'], npmPublish);

export default registry;
