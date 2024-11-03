import { Web5 } from '@web5/api';
import { DRPM_PROFILE } from '../config.js';
import { DidWebAgent } from '../utils/did/did-web-facade.js';
import { Logger } from '../utils/logger.js';
import { cleanProfile } from '../utils/misc.js';
import { DidDhtConnectOptions, DidWebConnectOptions } from '../utils/types.js';
import { Profile } from './profile/index.js';

export class DWeb5 {
  static web5: Web5;
  static did: string;

  static async connect() {
    if(this.web5 && this.did) {
      return { web5: this.web5, did: this.did };
    }

    const { current, dht, web } = await Profile.load() ?? {};
    Logger.info(`Loaded ${current} profile from ${DRPM_PROFILE}`);

    if(current === 'web') {
      const { web5DataPath, portableDid, recoveryPhrase } = web;

      if(!portableDid) {
        throw new Error('No portable DID found in profile');
      }
      const agent = await DidWebAgent.create({ dataPath: web5DataPath, portableDid });
      if(await agent.firstLaunch()) {
        agent.initialize({ password: recoveryPhrase });
      }
      Logger.info(`Connecting with web profile: ${cleanProfile(web)}`);
      const { web5, did } = await this.connectWeb({ data: web, sync: '30s', agent });

      this.web5 = web5;
      this.did = did;

      return { web5, did };
    }

    if(current === 'dht') {
      Logger.info(`Connecting with dht profile: ${cleanProfile(dht)}`);
      const { web5, did } = await this.connectDht({ data: dht, sync: '30s' });

      this.web5 = web5;
      this.did = did;

      return { web5, did };
    }

    Logger.error('DWeb5: No profile found');
    process.exit(1);
  }

  static async connectWeb({ agent, data, sync = 'off' }: DidWebConnectOptions) {
    try {
      const { password, dwnEndpoints, did } = data ?? {};
      return await Web5.connect({
        sync,
        agent,
        password,
        connectedDid     : did,
        didCreateOptions : { dwnEndpoints },
      });
    } catch (error: any) {
      Logger.error(error);
      process.exit(1);
    }
  }
  static async connectDht({ data, agent, sync = 'off' }: DidDhtConnectOptions) {
    try {
      const { password, dwnEndpoints, did } = data ?? {};
      return await Web5.connect({
        sync,
        agent,
        password,
        connectedDid     : did,
        didCreateOptions : { dwnEndpoints },
      });
    } catch (error: any) {
      Logger.error(error);
      process.exit(1);
    }
  }
}