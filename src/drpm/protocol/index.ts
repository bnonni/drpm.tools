import drpm from '../../utils/dwn/protocol.js';
import { ProtocolError } from '../../utils/errors.js';
import { Logger } from '../../utils/logger.js';
import { stringifier } from '../../utils/misc.js';
import { ResponseUtils } from '../../utils/response.js';
import { DWeb5Params } from '../../utils/types.js';

export class Protocol {
  static async configure({ web5, did }: DWeb5Params) {
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
  }

  static async query({ web5 }: DWeb5Params) {
    const { status, protocols = [] } = await web5.dwn.protocols.query({
      message : { filter: { protocol: drpm.protocol } }
    });

    if(ResponseUtils.dwnFail({ status })) {
      Logger.error('Failed to query DWN protocols', status);
      throw new ProtocolError(`Failed to query DWN protocols: ${stringifier(status)}`);
    }

    const json = protocols.length
      ? protocols.map(protocol => protocol.toJSON())
      : [];

    Logger.info(`Queried ${json.length} protocol(s)`, stringifier(json));
  }
}