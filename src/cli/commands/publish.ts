import dwn from '../../utils/dwn/protocol.js';
import { Logger } from '../../utils/logger.js';
import { ResponseUtils } from '../../utils/response.js';
import { CreatePackageParams, CreateReleaseParams } from '../../utils/types.js';
import { DrpmConnect } from './connect.js';

export class DrpmPublish {
  static async package({ metadata }: CreatePackageParams) {
    try {
      const { web5, did } = await DrpmConnect.connect();
      const { record = null, status } = await web5.dwn.records.create({
        store   : true,
        data    : metadata,
        message : {
          published    : true,
          dataFormat   : 'application/json',
          schema       : dwn.types.package.schema,
          protocolPath : 'package',
          protocol     : dwn.protocol,
          tags         : {
            name   : metadata.name,
            latest : metadata['dist-tags'].latest
          },
        },
      });

      if (ResponseUtils.dwnFail({ status })) {
        const error = 'Failed to create local package record - Bad Status';
        Logger.error(`DrpmPublishPackage: ${error}`, status);
        throw new Error('DrpmPublishPackage: Failed to create package record');
      }

      if (!record) {
        const error = 'Failed to create local release record - Null Record';
        Logger.error(`DrpmPublishPackage: ${error}`, status);
        throw new Error('DrpmPublishPackage: Failed to create package record');
      }
      Logger.log('DrpmPublishPackage: Local package record created!', status);

      const { status: send } = await record.send(did);
      if (ResponseUtils.dwnFail({ status: send })) {
        const error = 'Failed to send package record to remote - Bad Status';
        Logger.error(`DrpmPublishPackage: ${error}`, send);
        throw new Error('DrpmPublishPackage: Failed to create package record');
      }

      Logger.debug('DrpmPublishPackage: package record sent to remote!', send);

      return {status: send, record};
    } catch (error: any) {
      Logger.error('DrpmPublishPackage: Error catch during DWebNode records create', error);
      throw new Error('DrpmPublishPackage: Failed to create package record: ' + error.message);
    }
  }

  static async release({ parentId, name, version, integrity, release }: CreateReleaseParams): Promise<any> {
    try {
      const { web5, did } = await DrpmConnect.connect();
      const { record = null, status } = await web5.dwn.records.create({
        store   : true,
        data    : release,
        message : {
          published       : true,
          parentContextId : parentId,
          dataFormat      : 'application/gzip',
          schema          : dwn.types.release.schema,
          protocolPath    : 'package/release',
          protocol        : dwn.protocol,
          tags            : { name, version, integrity }
        },
      });

      if (ResponseUtils.dwnFail({ status })) {
        const error = 'Failed to create local release record - Bad Status';
        Logger.error(`DrpmPublishRelease: ${error}`, status);
        throw new Error('DrpmPublishRelease: Failed to create release record');
      }

      if (!record) {
        const error = 'Failed to create local release record - Null Record';
        Logger.error(`DrpmPublishRelease: ${error}`, status);
        throw new Error('DrpmPublishRelease: Failed to create release record');
      }

      Logger.log('DrpmPublishRelease: Local release record created!', status);

      const { status: send } = await record.send(did);
      if (ResponseUtils.dwnFail({ status: send })) {
        const error = 'Failed to send release record to remote - Bad Status';
        Logger.error(`DrpmPublishRelease: ${error}`, send);
        throw new Error('DrpmPublishRelease: Failed to create release record');
      }

      Logger.debug('DrpmPublishRelease: release record sent to remote!', send);

      return {status: send, record};
    } catch (error: any) {
      Logger.error('DrpmPublishRelease: Error catch during DWebNode records create', error);
      throw new Error('DrpmPublishRelease: Failed to create release record: ' + error.message);
    }
  }
}