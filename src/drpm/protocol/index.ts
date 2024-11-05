import drpm from '../../utils/dwn/protocol.js';
import { ProtocolError } from '../../utils/errors.js';
import { Logger } from '../../utils/logger.js';
import { stringifier } from '../../utils/misc.js';
import { ResponseUtils } from '../../utils/response.js';
import { Protocol as DwnProtocol } from '@web5/api';
import { DWeb5 } from '../dweb5.js';

export class Protocol {
  static async configure(): Promise<void> {
    try {
      const { web5, did } = await DWeb5.connect();
      console.log('configure did', did);
      const { status, protocol = null } = await web5.dwn.protocols.configure({
        message : {
          definition : drpm
        }
      });

      if(ResponseUtils.dwnFail({ status }) || !protocol) {
        Logger.error('Failed to configure DWN protocol', status);
        throw new ProtocolError(`Failed to configure DWN protocol: ${stringifier(status)}`);
      }

      const { status: send } = await protocol.send(did);
      if(ResponseUtils.dwnFail({ status: send })) {
        Logger.error('Failed to configure remote DWN', send);
        throw new ProtocolError(`Failed to send to DWN: ${stringifier(send)}`);
      }

      Logger.info(`Configured ${protocol.definition.protocol} protocol`, stringifier({...send, ...protocol?.['_metadata']}));
    } catch (error: any) {
      Logger.error(error);
      throw new ProtocolError(`Failed to configure dwn protocol: ${error.message}`, 'ProtocolConfigure');
    }
  }

  static async query(): Promise<void> {
    try {
      const { web5 } = await DWeb5.connect();
      const { status, protocols = [] } = await web5.dwn.protocols.query({
        message : { filter: { protocol: drpm.protocol } }
      });

      if(ResponseUtils.dwnFail({ status })) {
        Logger.error('Failed to query DWN protocols', status);
        throw new ProtocolError(`Failed to query DWN protocols: ${stringifier(status)}`);
      }

      const json = protocols.length
        ? protocols.map((protocol: DwnProtocol) => protocol.toJSON())
        : [];

      Logger.info(`Queried ${json.length} protocol(s)`, stringifier(json));
    } catch (error: any) {
      Logger.error(error);
      throw new ProtocolError(`Failed to query dwn protocols: ${error.message}`, 'ProtocolQuery');
    }
  }
}