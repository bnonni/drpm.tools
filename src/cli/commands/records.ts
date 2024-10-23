import { Record } from '@web5/api';
import drpm from '../../utils/dwn/protocol.js';
import { DPM } from '../dpm.js';

const { web5, did } = await DPM.connect();

export async function createRelease({ version, dpk, integrity, parentId }: any) {
  const { record, status } = await web5.dwn.records.create({
    message : {
      parentContextId : parentId,
      published       : true,
      dataFormat      : 'application/octet-stream',
      schema          : drpm.types.release.schema,
      protocolPath    : 'package/release',
      protocol        : drpm.protocol,
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

export async function createPackage({ name, version, metadata }: { name: string; version: string; metadata: any }) {
  const { record, status } = await web5.dwn.records.create({
    store   : true,
    data    : metadata[version],
    message : {
      published    : true,
      dataFormat   : 'application/json',
      schema       : drpm.types.package.schema,
      protocolPath : 'package',
      protocol     : drpm.protocol,
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
//   const { status, records = [] } = await web5.web5.dwn.records.query({
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
//   const { status, records = [] } = await web5.web5.dwn.records.query({
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