import { Web5 } from '@web5/api';
import { Web5UserAgent } from '@web5/user-agent';
import { readFile } from 'fs/promises';
import { DidWebAgent } from '../utils/did/did-web-facade.js';
import { Logger } from '../utils/logger.js';
import { cleanProfile } from '../utils/misc.js';
import { Profile, ProfileData } from '../utils/types.js';

export class RegistryConnect {
  static web5: Web5;
  static did: string;

  static async load(): Promise<Profile> {
    const profile = await readFile(`${process.cwd()}/.drpm/profile.json`, 'utf8');
    return JSON.parse(profile);
  }

  static async connect() {
    if(this.web5 && this.did) return { web5: this.web5, did: this.did };
    const { current, dht, web } = await this.load() ?? {};

    if(current === 'web') {
      const {web5DataPath, portableDid} = web;
      if(!portableDid) throw new Error('No portable DID found in profile');
      Logger.info(`Connecting with web profile: ${cleanProfile(web)}`);
      const agent = await DidWebAgent.create({ dataPath: web5DataPath, portableDid });
      const { web5, did } = await this.didWeb({ agent, data: web, sync: '30s' });
      this.web5 = web5;
      this.did = did;
      return { web5, did };
    } else if(current === 'dht') {
      Logger.info(`Connecting with dht profile: ${cleanProfile(dht)}`);
      const { web5, did } = await this.didDht({ data: dht,  });
      this.web5 = web5;
      this.did = did;
      return { web5, did };
    } else {
      throw new Error(`RegistryConnect: Current profile type ${current} not supported`);
    }
  }

  static async didWeb({ agent, data, sync = '30s' }: { agent: Web5UserAgent; data: ProfileData; sync?: string }) {
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
      Logger.error('RegistryConnect: Failed to connect to Web5 using DidWeb', error);
      throw error;
    }
  }
  static async didDht({data, sync = '30s'}: {data: ProfileData; sync?: string}) {
    try {
      const { password, dwnEndpoints, did } = data ?? {};
      return await Web5.connect({
        sync,
        password,
        connectedDid     : did,
        didCreateOptions : { dwnEndpoints },
        techPreview      : { dwnEndpoints },
      });
    } catch (error: any) {
      Logger.error('RegistryConnect: Failed to connect to Web5 using DidDHT', error);
      throw error;
    }
  }
}