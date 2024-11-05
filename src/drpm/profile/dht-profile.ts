import cuid from '@bugsnag/cuid';
import { Web5 } from '@web5/api';
import { Web5UserAgent } from '@web5/user-agent';
import { exists } from 'fs-extra';
import { DRPM_HOME } from '../../config.js';
import { Profile } from '../../drpm/profile/index.js';
import { Logger } from '../../utils/logger.js';
import { cleanEndpoint, createPassword } from '../../utils/misc.js';
import {
  DhtProfileConnectParams,
  DidDhtCreateParams,
  PartialDrpmProfile
} from '../../utils/types.js';

export class DhtAgent {
  agent: Web5UserAgent;
  recoveryPhrase?: string;
  connectedDid?: string;

  constructor({ agent }: { agent: Web5UserAgent }) {
    this.agent = agent;
  }

  static async create({ dataPath }: { dataPath: string }): Promise<Web5UserAgent> {
    return await Web5UserAgent.create({ dataPath });
  }

  async launch({ password }: { password: string }): Promise<void> {
    try {
      if(await this.agent.firstLaunch()) {
        this.recoveryPhrase = await this.agent.initialize({ password });
      }
      await this.agent.start({ password });
    } catch (error: any) {
      Logger.error(`Failed to setup agent: ${error.message}`);
      process.exit(1);

    }
  }

  json(): { agent: Web5UserAgent; recoveryPhrase: string; connectedDid: string } {
    return {
      agent          : this.agent,
      recoveryPhrase : this.recoveryPhrase!,
      connectedDid   : this.connectedDid!
    };
  }

  async identity({ dwnEndpoints }: { dwnEndpoints: string[]; recoveryPhrase: string }): Promise<string> {
    try {
      const identity = await this.agent.identity.create({
        didMethod  : 'dht',
        metadata   : { name: 'DRPM' },
        didOptions : {
          services : [
            {
              id              : 'dwn',
              type            : 'DecentralizedWebNode',
              serviceEndpoint : dwnEndpoints,
              enc             : '#enc',
              sig             : '#sig',
            }
          ],
          verificationMethods : [
            {
              algorithm : 'Ed25519',
              id        : 'sig',
              purposes  : ['assertionMethod', 'authentication']
            },
            {
              algorithm : 'secp256k1',
              id        : 'enc',
              purposes  : ['keyAgreement']
            }
          ]
        }
      });
      this.connectedDid = identity.metadata.connectedDid ?? identity.did.uri;
      return this.connectedDid;
    } catch (error: any) {
      Logger.error(`Failed to create agent identity: ${error.message}`);
      process.exit(1);

    }
  }
}


export class DhtProfile {
  // Used by cli drpm profile create to create new DHT profile
  static async create(params: DidDhtCreateParams): Promise<PartialDrpmProfile> {
    try {
      const dwnEndpoints = params.dwnEndpoints.split(',');
      const endpoints = params.dwnEndpoints
        .split(',')
        .map((endpoint: string) => cleanEndpoint(endpoint));

      const endpointPaths = [];
      for(const dwnEndpoint of endpoints) {
        if(!await exists(`${DRPM_HOME}/DATA/DHT/${dwnEndpoint}`)) {
          endpointPaths.push(dwnEndpoint);
        }
      }
      const endpointPath = endpointPaths.length
        ? `${endpointPaths[0]}/AGENT/MAIN`
        : `${dwnEndpoints[0]}/AGENT/${cuid()}`;
      const dataPath = `${DRPM_HOME}/DATA/DHT/${endpointPath}`;
      const password = params.password ?? createPassword();
      const web5DataPath = params.web5DataPath ?? dataPath;

      const agent = await DhtAgent.create({ dataPath: web5DataPath });
      const dhtAgent = new DhtAgent({ agent });

      await dhtAgent.launch({ password: password });
      const { recoveryPhrase } = dhtAgent.json() ?? await Profile.data();

      const connectedDid = await dhtAgent.identity({ dwnEndpoints, recoveryPhrase });
      const { did } = await Web5.connect({
        agent,
        password,
        connectedDid,
        sync             : 'off',
        didCreateOptions : { dwnEndpoints },
      });

      Logger.info('Syncing dwn, please wait ...');
      await agent.sync.sync();
      Logger.info('Syncing complete!');

      return {
        success : true,
        current : 'dht',
        dht     : {
          did,
          password,
          web5DataPath,
          dwnEndpoints   : dwnEndpoints,
          recoveryPhrase : recoveryPhrase,
        }
      };
    } catch (error: any) {
      Logger.error(`Failed to create DHT profile: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // Used by cli in various contexts to use the existing profile to connect to Web5
  static async connect({
    did, password, dwnEndpoints, web5DataPath
  }: DhtProfileConnectParams): Promise<any> {
    try {
      const agent = await DhtAgent.create({ dataPath: web5DataPath });
      const dhtAgent = new DhtAgent({ agent });
      await dhtAgent.launch({ password });

      const { web5, did: connectedDid } = await Web5.connect({
        agent,
        password,
        connectedDid     : did,
        sync             : '30s',
        didCreateOptions : { dwnEndpoints },
      });

      return { success: true, web5, did: connectedDid };
    } catch (error: any) {
      Logger.error(`Failed to connect to DHT profile: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}