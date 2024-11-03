import { Web5 } from '@web5/api';
import { DidWebAgent } from '../utils/did/did-web-facade.js';
import { Logger } from '../utils/logger.js';
import { cleanProfile } from '../utils/misc.js';
import { DrpmProfile } from './profile.js';
import { DidWebConnectOptions, DidDhtConnectOptions } from '../utils/types.js';
import { DRPM_PROFILE } from '../config.js';
import { Web5UserAgent } from '@web5/user-agent';

export class DrpmWeb5 {
  static web5: Web5;
  static did: string;

  static async connect() {
    if(this.web5 && this.did) {
      return { web5: this.web5, did: this.did };
    }

    const { current, dht, web } = await DrpmProfile.load() ?? {};
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
      const { web5, did } = await this.connectWeb({
        data  : web,
        sync  : '30s',
        agent
      });

      this.web5 = web5;
      this.did = did;

      return { web5, did };
    }

    if(current === 'dht') {
      Logger.info(`Connecting with dht profile: ${cleanProfile(dht)}`);
      const { web5, did } = await this.connectDht({
        data  : dht,
        sync  : '30s',
        agent : await Web5UserAgent.create({ dataPath: dht.web5DataPath })
      });

      this.web5 = web5;
      this.did = did;

      return { web5, did };
    }

    throw new Error('No profile found');
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
        techPreview      : { dwnEndpoints }
      });
    } catch (error: any) {
      Logger.error('DrpmWeb5: Failed to connect to Web5 using DidWeb', error);
      throw new Error('Failed to connect to Web5 using DidWeb: ' + error.message);
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
        techPreview      : { dwnEndpoints },
      });
    } catch (error: any) {
      Logger.error('DrpmWeb5: Failed to connect to Web5 using DidDHT', error);
      throw new Error('Failed to connect to Web5 using DidDHT: ' + error.message);
    }
  }
}