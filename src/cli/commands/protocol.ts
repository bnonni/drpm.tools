import { DWeb5 } from '../../drpm/dweb5.js';
import { Protocol } from '../../drpm/protocol/index.js';
import { ProtocolError } from '../../utils/errors.js';

export class ProtocolCommand {
  static async configure(): Promise<void> {
    try {
      const { web5, did } = await DWeb5.connect();
      await Protocol.configure({ web5, did });
      process.exit(0);
    } catch (error: any) {
      throw new ProtocolError(`Failed to create profile: ${error.message}`, 'ProtocolConfigure');
    }
  }

  static async query(): Promise<void> {
    try {
      const { web5, did } = await DWeb5.connect();
      await Protocol.query({ web5, did });
      process.exit(0);
    } catch (error: any) {
      throw new ProtocolError(`Failed to create profile: ${error.message}`, 'ProtocolConfigure');
    }
  }
}