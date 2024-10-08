import { Web5 } from '@web5/api';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import dpm from '../src/protocol.js';
// const dpm = {
//   protocol  : 'https://dpm.software/protocol',
//   published : true,
//   types     : {
//     package : {
//       schema      : 'https://dpm.software/schema/package',
//       dataFormats : ['application/gzip'],
//     },
//   },
//   structure : {
//     package : {
//       $tags : {
//         name : {
//           type : 'string',
//         },
//         version : {
//           type : 'string',
//         },
//         integrity : {
//           type : 'string',
//         },
//         $requiredTags : ['name', 'version', 'integrity'],
//       },
//       $actions : [
//         {
//           who : 'anyone',
//           can : ['read'],
//         },
//       ],
//     },
//   },
// };
const password = 'correct horse battery staple';
const dwnEndpoints = ['http://localhost:3000'];
const name = 'tool5';
const version = '5.0.0';
const dpackage = '/Users/bryan/Projects/TBD/bnonni/tool5/tool5-5.0.0.tgz';

async function sha512Integrity(tgzFilepath: string): Promise<string> {
  console.log(`Computing sha512 integrity hash for ${tgzFilepath}`);
  const fileBuffer = await readFile(tgzFilepath);
  const hash = createHash('sha512').update(fileBuffer).digest('base64');
  return `sha512-${hash}`;
}

async function createDpmRecord({ web5, did, name, version, dpk, integrity }: {
  web5: Web5;
  did: string;
  name: string;
  version: string;
  dpk: any;
  integrity: any
}) {
  const { record, status } = await web5.dwn.records.create({
    store   : true,
    data    : { name },
    message : {
      published    : true,
      dataFormat   : 'application/json',
      schema       : dpm.types.admin.schema,
      protocolPath : 'release',
      protocol     : dpm.protocol,
      tags         : { name },
      recipient    : 'did:dht:adminuser'
    },
  });
  console.log('createDpmRecord => record', record);
  if (!record) {
    throw new Error('Failed to create record');
  }
  console.log('DPK published => createDpmRecord => record ', record);
  console.log('DPK published => createDpmRecord => status', status);
  return await record.send(did);
}

async function queryDpmRecords() {
  const { status, records = [] } = await web5.dwn.records.query({
    from    : did,
    message : {
      filter : {
        schema       : dpm.types.package.schema,
        protocolPath : 'package',
        dataFormat   : 'application/json',
        protocol     : dpm.protocol,
        tags         : {
          name,
          version,
        },
      },
    },
  });

  const reads = await Promise.all(records.map(async (record) => {
    return await record.data.json();
  }));

  return { status, records, reads };
}

const { web5, did } = await Web5.connect({
  password,
  sync             : '30s',
  techPreview      : { dwnEndpoints },
  didCreateOptions : { dwnEndpoints }
});

const { status: configStatus, protocol } = await web5.dwn.protocols.configure({
  message : { definition: dpm }
});
console.log('dpmConfigureProtocol => configStatus', configStatus);
console.log('dpmConfigureProtocol => protocol', protocol);
if (!protocol) {
  throw new Error('Failed to config protocol');
}
const {status: configSendStatus} = await protocol.send(did);
console.log('dpmConfigureProtocol => configSendStatus', configSendStatus);

const integrity = await sha512Integrity(dpackage);
console.log(`Computed integrity hash to be ${integrity}`);
console.log('dpmPack => name, version, dpackage, integrity', name, version, dpackage, integrity);
const dpk = await readFile(dpackage);
const { status: createStatus } = await createDpmRecord({
  web5,
  did,
  name,
  version,
  dpk,
  integrity
});
console.log('createDpmRecord => createStatus', createStatus);

const { status, records, reads } = await queryDpmRecords();
console.log('queryDpmRecords => status', status);
console.log('queryDpmRecords => records', records);
console.log('query1 => reads', reads);