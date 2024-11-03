import { Web5 } from '@web5/api';
import { DrpmWeb5 } from '../../drpm/web5.js';
import { Logger } from '../../utils/logger.js';

export class ConnectCommand {
  static web5: Web5;
  static did: string;

  static async connect() {
    try {
      if(this.web5 && this.did) {
        return { web5: this.web5, did: this.did };
      }
      await DrpmWeb5.connect();

      this.web5 = DrpmWeb5.web5;
      this.did = DrpmWeb5.did;

      Logger.info(`Web5 connection success!`);
      return this;
    } catch (error: any) {
      Logger.error('DrpmConnect: Failed to connect', error);
      process.exit(1);
    }
  }
}