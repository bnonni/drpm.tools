import { Record, Web5 } from '@web5/api';
import { readFile } from 'fs/promises';
import { Integrity } from '../../src/utils/integrity.js';
import dwnProtocol from '../../src/utils/protocol.js';
import metadata from './data/npks/tool5/metadata.js';
// package/release { name, version, dpk, integrity, parentId }
// package { name }

async function createRelease({ version, dpk, integrity, parentId }) {
  const { record, status } = await web5.dwn.records.create({
    message : {
      parentContextId : parentId,
      published       : true,
      dataFormat      : 'application/octet-stream',
      schema          : dwnProtocol.types.release.schema,
      protocolPath    : 'package/release',
      protocol        : dwnProtocol.protocol,
      tags            : { version, integrity }
    },
    store : true,
    data  : dpk,
  });
  if (!record) {
    return {record: {} as Record, status};
  }
  console.log('createRelease => status', status);
  console.log('createRelease => recordId', record.id);
  const {status: send} = await record.send(did);
  return {status: send, record};
}

async function createPackage({ name }: { name: string; }) {
  const { record, status } = await web5.dwn.records.create({
    store   : true,
    data    : metadata,
    message : {
      published    : true,
      dataFormat   : 'application/json',
      schema       : dwnProtocol.types.package.schema,
      protocolPath : 'package',
      protocol     : dwnProtocol.protocol,
      tags         : { name }
    },
  });
  console.log('createPackage => status', status);
  if (!record) {
    throw new Error('Failed to create dpk');
  }
  console.log('createPackage => status', status);
  console.log('createPackage => recordId', record.id);
  const { status: send } = await record.send(did);
  return {status: send, record};
}

// async function queryPackages({name}) {
//   const { status, records = [] } = await web5.dwn.records.query({
//     from    : did,
//     message : {
//       filter : {
//         dataFormat   : 'application/json',
//         schema       : dwnProtocol.types.package.schema,
//         protocolPath : 'package',
//         protocol     : dwnProtocol.protocol,
//         tags         : { name },
//       },
//     },
//   });

//   const reads = await Promise.all(records.map(async (record) => {
//     return await record.data.json();
//   }));

//   return { status, records, reads };
// }

// async function queryReleases({ version, integrity, parentId }) {
//   const { status, records = [] } = await web5.dwn.records.query({
//     from    : did,
//     message : {
//       filter : {
//         parentId,
//         dataFormat   : 'application/json',
//         schema       : dwnProtocol.types.release.schema,
//         protocolPath : 'package/release',
//         protocol     : dwnProtocol.protocol,
//         tags         : {
//           version,
//           integrity
//         },
//       },
//     },
//   });

//   const reads = await Promise.all(records.map(async (record) => {
//     return await record.data.json();
//   }));

//   return { status, records, reads };
// }

const password = 'correct horse battery staple';
const dwnEndpoints = ['http://localhost:3000'];
const name = 'tool5';
const tgzPath = `/Users/bryan/Projects/TBD/bnonni/drpm/drpm.tools/lib/dpm/data/npks/tool5/tool5-6.1.0.tgz`;
const version = '6.1.0';
const { web5, did } = await Web5.connect({
  password,
  sync             : '30s',
  techPreview      : { dwnEndpoints },
  didCreateOptions : { dwnEndpoints }
});
console.log('web5Connect => did', did);
const parentPackageRecordId = 'bafyreidfw2bsvcmrnrcknsfi5gwrcnedhht64v5z64hk5nv2a5udfffus4';
const integrity = await Integrity.sha512IntegrityFile(tgzPath);
const tarball = await readFile(tgzPath);

if (process.argv.slice(2).includes('package')) {
  const { status: packageStatus, record: packageRecord } = await createPackage({ name });
  console.log('Created package => status', packageStatus);
  console.log('Created package => record.id', packageRecord.id);
} else {
  const { status: releaseStatus, record: releaseRecord } = await createRelease({ version, dpk: tarball, integrity, parentId: parentPackageRecordId });
  console.log('Created release => status', releaseStatus);
  console.log('Created release => record.id', releaseRecord.id);
}