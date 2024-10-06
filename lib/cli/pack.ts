import { Web5 } from '@web5/api';
import { createHash } from 'crypto';
import * as tar from 'tar';
import { pathExists, readJson } from 'fs-extra/esm';

import path from 'path';
import { readdir, readFile } from 'fs/promises';
const packageDir = process.cwd();
const password = 'correct horse battery staple';
const dwnEndpoints = ['http://localhost:3000'];
const dpm = {
  protocol  : 'https://test.dpm.software/protocol',
  published : true,
  types     : {
    package : {
      schema      : 'https://test.dpm.software/schema/package',
      dataFormats : ['application/gzip'],
    },
  },
  structure : {
    package : {
      $tags : {
        name : {
          type : 'string',
        },
        version : {
          type : 'string',
        },
        integrity : {
          type : 'string',
        },
        $requiredTags : ['name', 'version', 'integrity'],
      },
      $actions : [
        {
          who : 'anyone',
          can : ['read'],
        },
      ],
    },
  },
};

async function web5Connect() {
  return await Web5.connect({ password, sync: 'off', techPreview: { dwnEndpoints }, didCreateOptions: { dwnEndpoints } });
}

async function configureDpmProtocol(web5: Web5, did: string) {
  const { status: configure, protocol } = await web5.dwn.protocols.configure({ message: { definition: dpm } });

  console.log('Configured DPM protocol', configure);

  if (!protocol) {
    throw new Error('Failed to configure protocol');
  }

  return await protocol.send(did);
}

async function getFilesToPack(packageDir: string): Promise<string[]> {
  const files = await readdir(packageDir);
  const filesToInclude: string[] = [];

  // Logic to include/exclude files (e.g., respect .npmignore, files in package.json, etc.)
  for (const file of files) {
    if (!['DATA/', 'node_modules/', 'package-lock.json', 'dist/', 'ignore/', '.DS_Store', '.git/'].includes(file)) {
      // Simplified inclusion logic: ignore node_modules and git
      filesToInclude.push(file);
    }
  }
  return filesToInclude;
}

async function sha512Integrity(tgzFilepath: string): Promise<string> {
  const fileBuffer = await readFile(tgzFilepath);
  const hash = createHash('sha512').update(fileBuffer).digest('base64');
  return `sha512-${hash}`;
}


async function dpmPack() {
  const packageJsonPath = path.join(packageDir, 'package.json');
  if (!await pathExists(packageJsonPath)) {
    throw new Error('package.json not found');
  }
  const packageJson = await readJson(packageJsonPath);
  const name = packageJson.name.replace('/', '-');
  const version = packageJson.version || '0.0.1';
  const tarballName = `${name}-${version}.tgz`;
  const tgzFilepath = path.join(packageDir, tarballName);
  const filesToInclude = await getFilesToPack(packageDir);
  await tar.c(
    {
      gzip : true,
      file : tgzFilepath,
      cwd  : packageDir
    },
    filesToInclude
  );
  console.log(`Packaged ${filesToInclude.length} files into ${tgzFilepath}`);

  const integrity = await sha512Integrity(tgzFilepath);
  console.log(`Computed integrity hash to be ${integrity}`);

  return { name, version, tgzFilepath, integrity };
}

async function createDpmRecord(web5: Web5, did: string, { name, version, dpackage, integrity }: { name: string, version: string, dpackage: any, integrity: any }) {
  const { record, status } = await web5.dwn.records.create({
    store   : true,
    data    : dpackage,
    message : {
      published    : true,
      dataFormat   : 'application/json',
      schema       : dpm.types.package.schema,
      protocolPath : 'package',
      protocol     : dpm.protocol,
      tags         : {
        name,
        version,
        integrity,
      },
    },
  });
  console.log('Create DPM package record status = ', status);
  if (!record) {
    throw new Error('Failed to create record');
  }
  console.log('Created DPM package record = ', record);
  return await record.send(did);
}

async function queryDpmRecords() {
  return await web5.dwn.records.query({
    from    : did,
    message : {
      filter : {
        schema       : dpm.types.package.schema,
        protocolPath : 'package',
        dataFormat   : 'application/json',
        protocol     : dpm.protocol,
        tags         : {
          name    : 'tool5',
          version : '1.0.2',
        },
      },
    },
  });
}

const { web5, did } = await web5Connect();

const { status: configure } = await configureDpmProtocol(web5, did);
console.log('configureDpmProtocol => status', configure);

const { name, version, tgzFilepath, integrity } = await dpmPack();
console.log('dpmPack => name, version', name, version);
console.log('dpmPack => tgzFilepath, integrity', tgzFilepath, integrity);

const { status: create } = await createDpmRecord(web5, did, { name, version, dpackage: { tgzFilepath }, integrity });
console.log('createDpmRecord => status', create);

const { status: query1, records: records1 = [] } = await queryDpmRecords();
console.log('query1 => status1', query1);
console.log('query1 => records1', records1);

const reads1 = await Promise.all(records1.map(async (record) => {
  await record.update({ published: true });
  await record.send(did);
  return await record.data.json();
}));
console.log('query1 => reads1', reads1);

const { status: query2, records: records2 = [] } = await queryDpmRecords();
console.log('query2 => status2', query2);
console.log('query2 => records2', records2);

const reads2 = await Promise.all(records2.map(async (record) => {
  return await record.data.json();
}));
console.log('query2 => reads2', reads2);