import { Protocol } from '../../drpm/protocol/index.js';
import { Logger } from '../../utils/logger.js';

export class ProtocolCommand {
  static async configure(): Promise<void> {
    try {
      await Protocol.configure();
      process.exit(0);
    } catch (error: any) {
      Logger.error(error);
      process.exit(1);
    }
  }

  static async query(): Promise<void> {
    try {
      await Protocol.query();
      process.exit(0);
    } catch (error: any) {
      Logger.error(error);
      process.exit(1);
    }
  }
}