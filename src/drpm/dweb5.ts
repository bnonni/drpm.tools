import { Web5 } from '@web5/api';
import { Logger } from '../utils/logger.js';
import { secureProfileContext } from '../utils/misc.js';
import { DhtProfile } from './utils/dht.js';
import { Profile } from './profile.js';
import { WebProfile } from './utils/web.js';
import { DRegistryPackageManagerError } from '../cli/commands/error.js';

export interface Web5Connection {
  web5: Web5;
  did: string;
}

export class DWeb5 {
  public static connection: Web5Connection;

  public static isConnected() {
    return this.connection !== undefined;
  }

  public static async connect({name, verbose = false}: {name: string; verbose?: boolean}): Promise<Web5Connection> {
    try {
      if(this.isConnected()) {
        return this.connection;
      }
      const profile = new Profile(name);
      const { web, dht } = await profile.load();
      const data = name === 'web' ? web : dht;

      if(verbose) { Logger.info(`Connecting with ${name} profile: ${secureProfileContext(data)}`); }

      if(name === 'web') {
        this.connection = await WebProfile.connect(data);
      }

      if(name === 'dht') {
        this.connection = await DhtProfile.connect(data);
      }

      if(!this.isConnected()) {
        throw new DRegistryPackageManagerError(`DWeb5: Current ${name} profile not found`);
      }

      if(verbose) { Logger.info(`Connected ${this.connection.did} to Web5 with ${name} profile context`); }

      return this.connection;
    } catch (error: any) {
      Logger.error(error);
      process.exit(1);
    }
  }

  public static connectSync(verbose: boolean = false): Web5Connection {
    try {
      if(this.isConnected()) {
        return this.connection;
      }
      const { name, web, dht } = Profile.staticLoad();
      const data = name === 'web' ? web : dht;

      if(verbose) {
        Logger.info(`Connecting with ${name} profile: ${secureProfileContext(data)}`);
      }

      if(name === 'web') {
        WebProfile.connect(data)
          .then(connection => this.connection = connection);
      }

      if(name === 'dht') {
        DhtProfile.connect(data)
          .then(connection => this.connection = connection);
      }

      if(!this.isConnected()) {
        throw new DRegistryPackageManagerError(`DWeb5: Current ${name} profile not found`);
      }

      return this.connection;
    } catch (error: any) {
      Logger.error(error);
      process.exit(1);
    }
  }
}