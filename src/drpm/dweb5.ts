import { Web5 } from '@web5/api';
import { DRegistryPackageManagerError } from '../cli/commands/error.js';
import { Logger } from '../utils/logger.js';
import { safeProfile } from '../utils/misc.js';
import { DhtProfile } from './profile/dht-profile.js';
import { Profile } from './profile/index.js';
import { WebProfile } from './profile/web-profile.js';

export interface Web5Connection {
  web5: Web5;
  did: string;
}

export class DWeb5 {
  public static connection: Web5Connection;

  public static isConnected() {
    return this.connection !== undefined;
  }

  public static async connect(verbose: boolean = false) {
    try {
      if(this.isConnected()) {
        return this.connection;
      }

      const { current, dht, web } = await Profile.load() ?? {};
      const data = current === 'web' ? web : dht;
      if(verbose) {
        Logger.info(`Connecting with ${current} profile: ${safeProfile(data)}`);
      }

      if(current === 'web') {
        this.connection = await WebProfile.connect(data);
        return this.connection;
      }

      if(current === 'dht') {
        this.connection = await DhtProfile.connect(data);
        return this.connection;
      }

      throw new DRegistryPackageManagerError(`DWeb5: Current ${current} profile not found`);
    } catch (error: any) {
      Logger.error(error);
      process.exit(1);
    }
  }
}