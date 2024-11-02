import drpm from '../../utils/dwn/protocol.js';
import { Logger } from '../../utils/logger.js';
import { stringify } from '../../utils/misc.js';
import { ResponseUtils } from '../../utils/response.js';
import { ConnectCommand } from './connect.js';

export class ProtocolCommand {
  static async configure() {
    const { web5, did } = await ConnectCommand.connect();
    const { status: config, protocol = null } = await web5.dwn.protocols.configure({
      message : { definition: drpm }
    });

    if(ResponseUtils.dwnFail({ status: config })) {
      throw new Error(
        `DrpmProtocolConfigure: Failed to configure local DWN - Configure Fail Status: ${stringify(config)}`
      );
    }

    if (!protocol) {
      throw new Error(
        `DrpmProtocolConfigure: Failed to configure local DWN - No Protocol Returned: ${stringify(config)}`
      );
    }

    const { status: send } = await protocol.send(did);

    if(ResponseUtils.dwnFail({ status: send })) {
      const badSend = '';
      Logger.error(badSend, send);
      throw new Error(`DrpmProtocolConfigure: Failed to configure remote DWN - Send Fail Status: ${stringify(send)}`);
    }

    Logger.log(`Protocol configured: ${stringify({...send, ...protocol?.['_metadata']})}`);
    process.exit(0);
  }

  static async query() {
    const { web5 } = await ConnectCommand.connect();
    const { status, protocols = [] } = await web5.dwn.protocols.query({
      message : { filter: { protocol: drpm.protocol } }
    });

    if(ResponseUtils.dwnFail({ status })) {
      throw new Error(
        `DrpmProtocolQuery: Failed to query local DWN - Query Fail Status: ${stringify(status)}`
      );
    }

    if (!protocols.length) {
      throw new Error(
        `DrpmProtocolQuery: Failed to query local DWN - No Protocols Returned: ${stringify(status)}`
      );
    }

    const jsonProtocols = await Promise.all(protocols.map(async protocol => protocol.toJSON()));
    Logger.log(`Queried ${jsonProtocols.length} Protocol(s)!`, stringify(jsonProtocols));
    process.exit(0);
  }
}