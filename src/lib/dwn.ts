import drpm from '../utils/dwn/protocol.js';
import { ProtocolError } from '../utils/errors.js';
import { Logger } from '../utils/logger.js';
import { stringifier } from '../utils/misc.js';
import { ResponseUtils } from '../utils/response.js';
import { Protocol as DwnProtocol, Web5 } from '@web5/api';
import { DWeb5 } from './dweb5.js';

export class Dwn {
  web5: Web5;
  did: string;

  constructor() {
    const connection = DWeb5.connectSync();
    this.web5 = connection.web5;
    this.did = connection.did;
  }
}


export class DwnProtocols extends Dwn {
  async configure(): Promise<void> {
    try {
      const { status, protocol = null } = await this.web5.dwn.protocols.configure({ message: { definition: drpm }});

      if(ResponseUtils.dwnFail({ status }) || !protocol) {
        Logger.error('Failed to configure DWN protocol', status);
        throw new ProtocolError(`Failed to configure DWN protocol: ${stringifier(status)}`);
      }

      const { status: send } = await protocol.send(this.did);
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
  async query(): Promise<void> {
    try {
      const { status, protocols = [] } = await this.web5.dwn.protocols.query({
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


export class DwnRecords extends Dwn {
  async create(): Promise<void> {
    Logger.error('DwnRecords: create not implemented');
    process.exit(1);
  }
  async read(): Promise<void> {
    Logger.error('DwnRecords: read not implemented');
    process.exit(1);
  }

  async update(): Promise<void> {
    Logger.error('DwnRecords: update not implemented');
    process.exit(1);
  }

  async delete(): Promise<void> {
    Logger.error('DwnRecords: delete not implemented');
    process.exit(1);
  }
}


export class DwnSync extends Dwn {
  async start(): Promise<void> {
    Logger.error('DwnSync: start not implemented');
    process.exit(1);
  }
  async stop(): Promise<void> {
    Logger.error('DwnSync: stop not implemented');
    process.exit(1);
  }

  async sync(): Promise<void> {
    Logger.error('DwnSync: sync not implemented');
    process.exit(1);
  }
}