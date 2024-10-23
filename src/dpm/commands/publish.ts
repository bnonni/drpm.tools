import { Record } from '@web5/api';
import drpm from '../../utils/dwn/protocol.js';
import { DPM5 } from '../dpm5.js';
import { Logger } from '../../utils/logger.js';

const { web5, did } = await DPM5.connect();
export class PublishCommand {
  static async package({ name, version, metadata }: { name: string; version: string; metadata: any }) {
    const { record = null, status } = await web5.dwn.records.create({
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
    Logger.log('package => status', status);
    if (!record) {
      throw new Error('Failed to create dpk');
    }
    Logger.log('package => status', status);
    Logger.log('package => recordId', record.id);
    const { status: send } = await record.send(did);
    return {status: send, record};
  }

  static async release({ version, dpk, integrity, parentId }: any) {
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
    Logger.log('release => status', status);
    Logger.log('release => recordId', record.id);
    const {status: send} = await record.send(did);
    return {status: send, record};
  }
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