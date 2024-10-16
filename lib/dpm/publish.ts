import { Record, Web5 } from '@web5/api';
import { createHash } from 'crypto';
import { readdir, readFile, writeFile } from 'fs/promises';
import dpm from '../../src/protocol.js';
import { join } from 'path';
import metadata from './data/dpk-metadata.js';

async function sha512Integrity(tgzFilepath: string): Promise<string> {
  console.log(`Computing sha512 integrity hash for ${tgzFilepath}`);
  const fileBuffer = await readFile(tgzFilepath);
  const hash = createHash('sha512').update(fileBuffer).digest('base64');
  return `sha512-${hash}`;
}

async function configureProtocol() {
  const { status, protocol } = await web5.dwn.protocols.configure({ message: { definition: dpm }});
  console.log('configureProtocol => status', status);

  if (!protocol) {
    throw new Error('Failed to configure dpm protocol');
  }
  console.log('configureProtocol => protocol', protocol);

  return await protocol.send(did);
};

async function releaseDPK({ version, dpk, integrity, parentId }) {
  const { record, status } = await web5.dwn.records.create({
    store   : true,
    data    : dpk,
    message : {
      parentContextId : parentId,
      published       : true,
      dataFormat      : 'application/octet-stream',
      schema          : dpm.types.release.schema,
      protocolPath    : 'package/release',
      protocol        : dpm.protocol,
      tags            : {
        version,
        integrity
      }
    },
  });
  if (!record) {
    return {record: {} as Record, status};
  }
  console.log('DPK published => releaseDPK => status', status);
  console.log('DPK published => createDPK => recordId', record.id);
  const {status: send} = await record.send(did);
  return {status: send, record};
}
const meta = {
  '_id'       : 'tool5',
  '_rev'      : '12-4fe997eb634ed55db1c0792553198834',
  'name'      : 'tool5',
  'dist-tags' : {
    'latest' : '5.0.1'
  },
  'versions' : {
    '5.0.1' : {
      'name'        : 'tool5',
      'version'     : '5.0.1',
      'description' : 'CLI tool for interacting with Web5',
      'type'        : 'module',
      'main'        : './dist/cjs/index.js',
      'module'      : './dist/esm/index.js',
      'types'       : './dist/types/index.d.ts',
      'bin'         : {
        'tool5' : 'dist/esm/tool5.js'
      },
      'exports' : {
        '.' : {
          'import'  : './dist/esm/index.js',
          'require' : './dist/cjs/index.js'
        },
        './package.json' : './package.json'
      },
      'scripts' : {
        'start'           : 'npm run build && node dist/esm/tool5.js',
        'wipe'            : 'rm -rf dist node_modules',
        'clean'           : 'rimraf dist',
        'build'           : 'npm run build:cjs && npm run build:esm',
        'build:cjs'       : 'rimraf dist/cjs && tsc -p tsconfig.cjs.json && echo \'{"type": "commonjs"}\' \u003E ./dist/cjs/package.json',
        'build:esm'       : 'rimraf dist/esm dist/types && tsc -p tsconfig.esm.json',
        'did:create'      : 'npm run build && node dist/esm/tool5.js -p did -a create',
        'cli:install'     : 'sh install-tool5.sh',
        'cli:uninstall'   : 'rm -rf dist node_modules',
        'update:outdated' : 'ncu --install always -u',
        'prepare'         : 'npm run build && chmod +x ./dist/esm/tool5.js'
      },
      'repository' : {
        'type' : 'git',
        'url'  : 'git+ssh://git@github.com/bnonni/tool5.git'
      },
      'author' : {
        'name' : 'Bryan Nonni',
        'url'  : 'https://github.com/bnonni'
      },
      'license' : 'ISC',
      'bugs'    : {
        'url' : 'https://github.com/bnonni/tool5/issues'
      },
      'homepage'     : 'https://github.com/bnonni/tool5#readme',
      'dependencies' : {
        '@web5/agent'       : '^0.6.1',
        '@web5/api'         : '^0.10.0',
        '@web5/common'      : '^1.0.2',
        '@web5/credentials' : '^1.1.1',
        '@web5/crypto'      : '^1.0.4',
        '@web5/dids'        : '^1.1.4',
        '@web5/user-agent'  : '^0.5.1',
        'chalk'             : '^5.3.0',
        'commander'         : '^12.1.0',
        'ed25519-keygen'    : '^0.6.2'
      },
      'devDependencies' : {
        '@eslint/js'                       : '^9.10.0',
        '@types/node'                      : '^22.5.4',
        '@types/readable-stream'           : '^4.0.15',
        '@typescript-eslint/eslint-plugin' : '^8.5.0',
        '@typescript-eslint/parser'        : '^8.5.0',
        'dotenv'                           : '^16.4.5',
        'eslint'                           : '^9.10.0',
        'globals'                          : '^15.9.0',
        'npm-check-updates'                : '^17.1.1',
        'rimraf'                           : '^6.0.1',
        'tsx'                              : '^4.19.1',
        'typescript'                       : '^5.6.2'
      },
      '_id'          : 'tool5@5.0.1',
      'gitHead'      : 'ecac56caf08a6c5198695fe1476cb462c5d7db80',
      '_nodeVersion' : '20.18.0',
      '_npmVersion'  : '10.8.2',
      'dist'         : {
        'integrity'    : 'sha512-gPClNFHEACDPrNPIY9nQ5CtgNzXLek1VKLkenI/RRKrrWSSyIVte0HloLzyQJFW0bXgFnv5TgtcUM+xHE7B6/w==',
        'shasum'       : 'dc12d542e446ae3025101bc3de6c0fb5886a8a49',
        'tarball'      : 'http://localhost:3000/did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo/read/protocols/aHR0cHM6Ly9kcG0uc29mdHdhcmUvcHJvdG9jb2xzL2RwbQ/package/release?filter.tags.version=5.0.1',
        'fileCount'    : 95,
        'unpackedSize' : 115474,
        'signatures'   : [
          {
            'keyid' : 'SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA',
            'sig'   : 'MEYCIQDhX2SZFZyV3rBaQp/tH0NRk1YWw6rF2KrietBA6xDIFQIhANJcAYMSl+mvNefhpxjyApSUK/CXFEnCeUSEQf113OPI'
          }
        ]
      },
      '_npmUser' : {
        'name'  : 'bnonni',
        'email' : 'development.xw3hd@passmail.com'
      },
      'directories' : {

      },
      'maintainers' : [
        {
          'name'  : 'bnonni',
          'email' : 'development.xw3hd@passmail.com'
        }
      ],
      '_npmOperationalInternal' : {
        'host' : 's3://npm-registry-packages',
        'tmp'  : 'tmp/tool5_5.0.1_1728514637169_0.3221744505985593'
      },
      '_hasShrinkwrap' : false
    }
  }
};

async function createDPK({ name }: { name: string; }) {
  const { record, status } = await web5.dwn.records.create({
    store   : true,
    data    : meta,
    message : {
      published    : true,
      dataFormat   : 'application/json',
      schema       : dpm.types.package.schema,
      protocolPath : 'package',
      protocol     : dpm.protocol,
      tags         : { name }
    },
  });
  if (!record) {
    throw new Error('Failed to create dpk');
  }
  console.log('DPK published => createDPK => status', status);
  console.log('DPK published => createDPK => recordId', record.id);
  const { status: send } = await record.send(did);
  return {status: send, record};
}

async function queryPackages({name}) {
  const { status, records = [] } = await web5.dwn.records.query({
    from    : did,
    message : {
      filter : {
        dataFormat   : 'application/json',
        schema       : dpm.types.package.schema,
        protocolPath : 'package',
        protocol     : dpm.protocol,
        tags         : { name },
      },
    },
  });

  const reads = await Promise.all(records.map(async (record) => {
    return await record.data.json();
  }));

  return { status, records, reads };
}

async function queryReleases({ version, integrity, parentId }) {
  const { status, records = [] } = await web5.dwn.records.query({
    from    : did,
    message : {
      filter : {
        parentId,
        dataFormat   : 'application/json',
        schema       : dpm.types.release.schema,
        protocolPath : 'package/release',
        protocol     : dpm.protocol,
        tags         : {
          version,
          integrity
        },
      },
    },
  });

  const reads = await Promise.all(records.map(async (record) => {
    return await record.data.json();
  }));

  return { status, records, reads };
}

const stringify = (obj: any) => JSON.stringify(obj, null, 2);

const password = 'correct horse battery staple';
const dwnEndpoints = ['http://localhost:3000'];
// const data: any = [];
const name = 'tool5';
const outDir = `${process.cwd()}/scripts/utils/npks/${name}`;
// const tarballs = await readdir(outDir);
const version = '5.0.1';
const tgz = 'tool5-5.0.1.tgz';
const { web5, did } = await Web5.connect({
  password,
  sync             : '30s',
  techPreview      : { dwnEndpoints },
  didCreateOptions : { dwnEndpoints }
});
console.log('web5Connect => did', did);

// Config protocol once
// const { status: configStatus } = await configureProtocol();
// console.log('Configured DPM protocol => configStatus', configStatus);

// Create DPK once
// const { status: dpkStatus, record: dpk } = await createDPK({ name });
// console.log('Created DPK => status', dpkStatus);
// console.log('Created DPK => record.id', dpk.id );
const parentPackageRecordId = 'bafyreicffieflrn7kb4xhzeoo3vc36cszgycj27qf4uuny3oqlobrngtki';
console.log(`DPK parentPackageRecordId =>`, parentPackageRecordId);

// Iterate over each version and publish the DPK release
// await Promise.all(data.map(async ({ version, tgz }) => {}));

const tgzPath = join(outDir, tgz);
console.log(`DPK name, version, tgz, tgzPath =>`, name, version, tgz, tgzPath);

const integrity = await sha512Integrity(tgzPath);
console.log(`Version ${version} integrity hash ${integrity}`);

const tarball = await readFile(tgzPath);
console.log('Read dpk tarball => dpk', tarball);

const {status, record} = await releaseDPK({
  version,
  dpk      : tarball,
  integrity,
  parentId : parentPackageRecordId
});
console.log('Release dpk version => status', status);
if(!Object.entries(record).length) {
  throw new Error('Failed to release dpk: no record returned, status: ' + stringify(status));
}
console.log('Release dpk record.id => record.id', record.id);

// const {reads: dpks} = await queryPackages({ name });
// console.log('Read package records query');
// await writeFile(join(outDir, `${name}-packages.json`), stringify(dpks));

// const {reads: releases} = await queryReleases({ version, integrity, parentId: parentPackageRecordId });
// await writeFile(join(outDir, `${name}-releases.json`), stringify(releases));
