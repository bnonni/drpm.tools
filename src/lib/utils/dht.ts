import { Web5 } from '@web5/api';
import { Web5UserAgent } from '@web5/user-agent';
import fsx from 'fs-extra';
import { DRPM_HOME } from '../../config.js';
import { Logger } from '../../utils/logger.js';
import { cleanEndpoint, createPassword, scuid } from '../../utils/misc.js';
import { DhtProfileConnectParams, DidDhtCreateParams, PartialProfileJson } from '../../utils/types.js';
import { Profile } from '../profile.js';
// import cuid from '@bugsnag/cuid';

export class DhtAgent {
  userAgent: Web5UserAgent;
  recoveryPhrase?: string;
  connectedDid?: string;

  constructor({ userAgent }: { userAgent: Web5UserAgent }) {
    this.userAgent = userAgent;
  }

  static async create({ dataPath }: { dataPath: string }): Promise<DhtAgent> {
    const userAgent = await Web5UserAgent.create({ dataPath });
    return new DhtAgent({ userAgent });
  }

  async launch({ password }: { password: string }): Promise<void> {
    try {
      if(await this.userAgent.firstLaunch()) {
        this.recoveryPhrase = await this.userAgent.initialize({ password });
      }
      await this.userAgent.start({ password });
    } catch (error: any) {
      Logger.error(`Failed to setup agent: ${error.message}`);
      process.exit(1);

    }
  }

  json(): { userAgent: Web5UserAgent; recoveryPhrase: string; connectedDid: string } {
    return {
      userAgent      : this.userAgent,
      recoveryPhrase : this.recoveryPhrase!,
      connectedDid   : this.connectedDid!
    };
  }

  async identity({ dwnEndpoints }: { dwnEndpoints: string[]; recoveryPhrase: string }): Promise<string> {
    try {
      const identity = await this.userAgent.identity.create({
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
  static async create(params: DidDhtCreateParams): Promise<PartialProfileJson> {
    try {
      const dwnEndpoints = params.dwnEndpoints.split(',');
      const endpoints = dwnEndpoints
        .map((dwnEndpoint) => cleanEndpoint(dwnEndpoint))
        .filter(endpoint => !fsx.existsSync(`${DRPM_HOME}/DHT/${endpoint}`));

      const endpointPath = endpoints.length
        ? `${endpoints[0]}/0/DATA/AGENT`
        : `${cleanEndpoint(dwnEndpoints[0])}/${scuid()}/DATA/AGENT`;

      const dataPath = `${DRPM_HOME}/DHT/${endpointPath}`;
      const web5DataPath = params.web5DataPath ?? dataPath;
      const password = params.password ?? createPassword();

      const dhtAgent = await DhtAgent.create({ dataPath: web5DataPath });
      await dhtAgent.launch({ password });
      const { recoveryPhrase } = dhtAgent.json() ?? Profile.json.dht.recoveryPhrase;
      const connectedDid = await dhtAgent.identity({ dwnEndpoints, recoveryPhrase });
      const agent = dhtAgent.userAgent;

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
        name : 'dht',
        dht  : {
          did,
          password,
          web5DataPath,
          dwnEndpoints,
          recoveryPhrase,
        }
      };
    } catch (error: any) {
      Logger.error(`Failed to create DHT profile: ${error.message}`);
      throw error;
    }
  }

  // Used by cli in various contexts to use the existing profile to connect to Web5
  static async connect({
    did, password, dwnEndpoints, web5DataPath
  }: DhtProfileConnectParams): Promise<any> {
    try {
      const dhtAgent = await DhtAgent.create({ dataPath: web5DataPath });
      await dhtAgent.launch({ password });
      return await Web5.connect({
        password,
        connectedDid     : did,
        sync             : '30s',
        didCreateOptions : { dwnEndpoints },
        agent            : dhtAgent.userAgent,
      });
    } catch (error: any) {
      Logger.error(`Failed to connect to DHT profile: ${error.message}`);
      throw error;
    }
  }
}