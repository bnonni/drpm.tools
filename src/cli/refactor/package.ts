import { DWeb5, Web5Connection } from '../../drpm/dweb5.js';
import dwn from '../../utils/dwn/protocol.js';
import { Logger } from '../../utils/logger.js';
import { ResponseUtils } from '../../utils/response.js';
import { DpkMetadata } from '../../utils/types.js';
import { ICommand } from '../drpm.js';

export class PackageCommand implements ICommand {
  async execute(options: any, subcommand?: string): Promise<void> {
    options.connection = await DWeb5.connect();
    if (subcommand === 'package') {
      await this.publish(options);
    } else {
      await this.release(options);
    }
  }

  private async publish({ metadata, connection: { web5, did } }: { metadata: DpkMetadata; connection: Web5Connection }) {
    try {
      const { 'dist-tags': distTags, name } = metadata ?? {};
      const { record: _package = null, status } = await web5.dwn.records.create({
        store   : true,
        data    : metadata,
        message : {
          published    : true,
          dataFormat   : 'application/json',
          schema       : dwn.types.package.schema,
          protocolPath : 'package',
          protocol     : dwn.protocol,
          tags         : { name, latest: distTags.latest },
        },
      });

      if (ResponseUtils.dwnFail({ status }) || !_package) {
        Logger.error('Failed to create local package record', status);
        throw new Error('Failed to create package record');
      }

      const {status: sent} = await _package.send(did);
      Logger.log('Package record created and sent to remote!', {status, sent});

    } catch (error: any) {
      Logger.error('Error during package record creation', error);
      throw error;
    }
  }

  private async release(options: {
    parentId: string;
    name: string;
    version: string;
    integrity: string;
    data: any
    connection: Web5Connection;
  }) {
    try {
      const { parentId, name, version, integrity, data, connection: { web5, did } } = options ?? {};
      const { record: release = null, status } = await web5.dwn.records.create({
        data,
        store   : true,
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

      if (ResponseUtils.dwnFail({ status }) || !release) {
        Logger.error('Failed to create local release record', status);
        throw new Error('Failed to create release record');
      }

      Logger.log('Local release record created!', status);
      const {status: sent} = await release.send(did);
      Logger.log('Release record created and sent to remote!', {status, sent});

    } catch (error: any) {
      Logger.error('Error during release record creation', error);
      throw error;
    }
  }
}