#!/usr/bin/env node

import { Web5 } from '@web5/api';
import { Logger } from '../../utils/logger.js';
import { cleanProfile } from '../../utils/misc.js';
import { DidWebFacade, ProfileCommand } from './profile.js';
import { AgentDidApi, DwnDidStore, AgentDidResolverCache } from '@web5/agent';
import { BearerDid, DidDht, DidJwk } from '@web5/dids';
import { Web5UserAgent } from '@web5/user-agent';
import { ProfileData } from '../../utils/types.js';

export class Web5DRPM {
  static async connect() {
    const profile = await ProfileCommand.load() ?? {};
    if(profile.current === 'web') {
      Logger.info(`Connecting with web profile: ${cleanProfile(profile.web)}`);
      return await Web5DRPM.didWeb(profile.web);
    }
    if(profile.current === 'dht') {
      Logger.info(`Connecting with dht profile: ${cleanProfile(profile.dht)}`);
      return await Web5DRPM.didDht(profile.dht);
    }
    throw new Error('No profile found');
  }

  static async didWeb(data: ProfileData){
    try {
      const { portableDid, password, dwnEndpoints, did, web5DataPath } = data ?? {};
      if(!portableDid) throw new Error('No portable DID found in profile');
      const agent = await Web5UserAgent.create({
        dataPath : web5DataPath,
        agentDid : await BearerDid.import({ portableDid }),
        didApi   : new AgentDidApi({
          store         : new DwnDidStore(),
          didMethods    : [DidDht, DidJwk, DidWebFacade],
          resolverCache : new AgentDidResolverCache({
            location : `${web5DataPath}/DID_RESOLVERCACHE`
          }),
        })
      });
      return await Web5.connect({
        agent,
        password,
        connectedDid     : did,
        sync             : '30s',
        didCreateOptions : { dwnEndpoints },
        techPreview      : { dwnEndpoints }
      });
    } catch (error: any) {
      Logger.error('ConnectCommand: Failed to connect to Web5 using DidWeb', error);
      process.exit(1);
    }
  }
  static async didDht(data: ProfileData) {
    try {
      const { password, dwnEndpoints, did } = data ?? {};
      return await Web5.connect({
        password,
        connectedDid     : did,
        sync             : '30s',
        didCreateOptions : { dwnEndpoints },
        techPreview      : { dwnEndpoints },
      });
    } catch (error: any) {
      Logger.error('ConnectCommand: Failed to connect to Web5 using DidDHT', error);
      process.exit(1);
    }
  }
}