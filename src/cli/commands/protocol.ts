import drpm from '../../utils/dwn/protocol.js';
import { Logger } from '../../utils/logger.js';
import { stringify } from '../../utils/misc.js';
import { ResponseUtils } from '../../utils/response.js';
import { Web5DRPM } from './connect.js';

export class ProtocolCommand {
  static async configure() {
    const { web5, did } = await Web5DRPM.connect();
    const { status: config, protocol = null } = await web5.dwn.protocols.configure({
      message : { definition: drpm }
    });

    if(ResponseUtils.dwnFail({ status: config })) {
      throw new Error(
        `ProtocolConfigureError: Failed to configure local DWN - Configure Fail Status: ${stringify(config)}`
      );
    }

    if (!protocol) {
      throw new Error(
        `ProtocolConfigureError: Failed to configure local DWN - No Protocol Returned: ${stringify(config)}`
      );
    }

    const { status: send } = await protocol.send(did);

    if(ResponseUtils.dwnFail({ status: send })) {
      const badSend = '';
      Logger.error(badSend, send);
      throw new Error(`ProtocolSendError: Failed to configure remote DWN - Send Fail Status: ${stringify(send)}`);
    }

    Logger.log('Protocol Configured!', send);
    process.exit(0);
  }

  static async query() {
    const { web5 } = await Web5DRPM.connect();
    const { status, protocols = [] } = await web5.dwn.protocols.query({
      message : { filter: { protocol: drpm.protocol } }
    });

    if(ResponseUtils.dwnFail({ status })) {
      throw new Error(
        `ProtocolQueryError: Failed to query local DWN - Query Fail Status: ${stringify(status)}`
      );
    }

    if (!protocols.length) {
      throw new Error(
        `ProtocolQueryError: Failed to query local DWN - No Protocols Returned: ${stringify(status)}`
      );
    }

    const jsonProtocols = await Promise.all(protocols.map(async protocol => protocol.toJSON()));
    Logger.log(`Queried ${jsonProtocols.length} Protocol(s)!`, stringify(jsonProtocols));
    process.exit(0);
  }
}