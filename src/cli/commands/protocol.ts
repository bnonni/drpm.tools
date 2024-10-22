import { Web5 } from '@web5/api';
import drpm from '../../utils/drpm/protocol.js';
import { DpmProfile } from './profile.js';
import { Logger } from '../../utils/logger.js';
import { ResponseUtils } from '../../utils/response.js';

export async function web5Connect(){
  const {password, dwnEndpoint} = await DpmProfile.loadProfile();
  return await Web5.connect({
    password,
    didCreateOptions : { dwnEndpoints: dwnEndpoint },
    techPreview      : { dwnEndpoints: dwnEndpoint },
    sync             : 'off'
  });
}

export class DpmProtocol {
  static async configure() {
    const { web5, did } = await web5Connect();
    const { status: config, protocol = null } = await web5.dwn.protocols.configure({
      message : { definition: drpm }
    });

    if(ResponseUtils.dwnFail({ status: config })) {
      const badStatus = 'DpmProtocol: Failed to configure DRPM protocol in local DWN - Bad Status';
      Logger.error(badStatus, config);
      throw new Error(badStatus + JSON.stringify(config, null, 2));
    }

    if (!protocol) {
      const noProtocol = 'DpmProtocol: Failed to configure DRPM protocol in local DWN - No Protocol';
      Logger.error(noProtocol, config);
      throw new Error(noProtocol + JSON.stringify(config, null, 2));
    }

    const { status: send } = await protocol.send(did);

    if(ResponseUtils.dwnFail({ status: send })) {
      const badSend = 'DpmProtocol: Failed to send DRPM protocol to remote DWN';
      Logger.error(badSend, send);
      throw new Error(badSend + JSON.stringify(send, null, 2));
    }

    Logger.log('DpmProtocol: Configured DRPM protocol', send);
  }

  static async query() {
    const { web5 } = await web5Connect();
    const { status, protocols = [] } = await web5.dwn.protocols.query({
      message : { filter: { protocol: drpm.protocol } }
    });

    if(ResponseUtils.dwnFail({ status })) {
      const badStatus = 'DpmProtocol: Failed to query protocols from local DWN - Bad Status';
      Logger.error(badStatus, status);
      throw new Error(badStatus + JSON.stringify(status, null, 2));
    }

    if (!protocols.length) {
      const noProtocols = 'DpmProtocol: Failed to query protocols from local DWN - Bad Status';
      Logger.error(noProtocols, status);
      throw new Error(noProtocols + JSON.stringify(status, null, 2));
    }

    const protocolJsons = await Promise.all(protocols.map(async protocol => {
      return protocol.toJSON();
    }));

    Logger.log('Queried protocols from local DWN', protocolJsons);
  }
}