import { Record } from '@web5/api';
import drpm from '../../utils/dwn/protocol.js';
import { Logger } from '../../utils/logger.js';
import { Web5DRPM } from './connect.js';

export class PublishCommand {
  static async package({ name, version, metadata }: { name: string; version: string; metadata: any }) {
    const { web5, did } = await Web5DRPM.connect();
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
    const { web5, did } = await Web5DRPM.connect();
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