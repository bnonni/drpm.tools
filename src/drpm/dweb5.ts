import { Web5 } from '@web5/api';
import { DRPM_PROFILE } from '../config.js';
import { DidWebAgent } from '../utils/did/did-web-facade.js';
import { Logger } from '../utils/logger.js';
import { cleanProfile } from '../utils/misc.js';
import { DidWebConnectOptions } from '../utils/types.js';
import { DhtProfile } from './profile/dht-profile.js';
import { Profile } from './profile/index.js';

export class DWeb5 {
  static web5: Web5;
  static did: string;

  static async connect(verbose: boolean = false) {
    try {
      if(this.web5 && this.did) {
        return { web5: this.web5, did: this.did };
      }

      const { current, dht, web } = await Profile.load() ?? {};
      if(verbose) Logger.info(`Loaded ${current} profile from ${DRPM_PROFILE}`);

      if(current === 'web') {
        if(verbose) Logger.info(`Connecting with web profile: ${cleanProfile(web)}`);
        const { web5DataPath, portableDid, recoveryPhrase } = web;
        if(!portableDid) {
          throw new Error('No portable DID found in profile');
        }
        const agent = await DidWebAgent.create({ dataPath: web5DataPath, portableDid });
        if(await agent.firstLaunch()) {
          agent.initialize({ password: recoveryPhrase });
        }
        const { web5, did } = await this.connectWeb({ data: web, agent, sync: '30s' });

        this.web5 = web5;
        this.did = did;

        return { web5, did };
      }

      if(current === 'dht') {
        if(verbose) Logger.info(`Connecting with dht profile: ${cleanProfile(dht)}`);
        const { success, error, web5, did } = await DhtProfile.connect(dht);
        if(!success) {
          Logger.error('DWeb5: Failed to connect to DHT profile');
          throw new Error(error);
        }
        this.web5 = web5;
        this.did = did;
        return { web5, did };
      }

      Logger.error('DWeb5: No profile found');
      process.exit(1);
    } catch (error: any) {
      Logger.error(error);
      process.exit(1);
    }
  }

  static async connectWeb({ data: { password, dwnEndpoints, did }, agent, sync }: DidWebConnectOptions) {
    try {
      sync ??= 'off';
      return await Web5.connect({
        sync, agent, password,
        connectedDid     : did,
        didCreateOptions : { dwnEndpoints },
      });
    } catch (error: any) {
      Logger.error(error);
      process.exit(1);
    }
  }
}