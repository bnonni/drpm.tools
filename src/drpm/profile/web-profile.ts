import cuid from '@bugsnag/cuid';
import { AgentDidApi, AgentDidResolverCache, DwnDidStore } from '@web5/agent';
import { Web5 } from '@web5/api';
import { BearerDid, DidDht, DidJwk } from '@web5/dids';
import { Web5UserAgent } from '@web5/user-agent';
import { exists } from 'fs-extra';
import { DRPM_HOME } from '../../config.js';
import { DidWebFacade } from '../../utils/did/did-web-facade.js';
import { Logger } from '../../utils/logger.js';
import { createPassword } from '../../utils/misc.js';
import { DidWebConnectOptions, DidWebCreateParams, DrpmProfile } from '../../utils/types.js';
import { Profile } from './index.js';

export class WebAgent {
  userAgent: Web5UserAgent;
  recoveryPhrase?: string;
  connectedDid?: string;

  constructor({ userAgent }: { userAgent: Web5UserAgent }) {
    this.userAgent = userAgent;
  }

  static async create({ dataPath }: { dataPath: string }): Promise<WebAgent> {
    const agentDid = await BearerDid.import({ portableDid: await DidJwk.create() });
    const didApi = new AgentDidApi({
      store         : new DwnDidStore(),
      didMethods    : [DidDht, DidJwk, DidWebFacade],
      resolverCache : new AgentDidResolverCache({ location: `${dataPath}/DID_RESOLVERCACHE` }),
    });
    const userAgent = await Web5UserAgent.create({ dataPath, agentDid, didApi});
    return new WebAgent({ userAgent });
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
}

export class WebProfile {
  // Helper function to create a new Web profile
  static async create(params: DidWebCreateParams): Promise<Partial<DrpmProfile>> {
    try {
      const password = params.password ?? createPassword();
      const connectedDid = params.did;
      const dataPath = `${DRPM_HOME}/DATA/WEB/AGENT/${connectedDid}`;

      const dwnEndpoints = params.dwnEndpoints.split(',');
      const altDataPath = await exists(dataPath) ? `${dataPath}/${cuid()}` : `${dataPath}/MAIN`;
      const web5DataPath = params.web5DataPath ?? altDataPath;

      const webAgent = await WebAgent.create({ dataPath: web5DataPath });
      await webAgent.launch({ password });
      const { recoveryPhrase: aPhrase } = webAgent.json();
      const agent = webAgent.userAgent;

      const { did, recoveryPhrase: cPhrase } = await Web5.connect({
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
        current : 'web',
        web     : {
          did,
          password,
          web5DataPath,
          dwnEndpoints,
          recoveryPhrase : aPhrase ?? cPhrase
        }
      };
    } catch (error: any) {
      Logger.error(`Failed to create WEB profile: ${error.message}`);
      throw error;
    }
  }

  // Used by cli in various contexts to use the existing profile to connect to Web5
  static async connect({
    did, password, dwnEndpoints, web5DataPath
  }: DidWebConnectOptions): Promise<any> {
    try {
      const webAgent = await WebAgent.create({ dataPath: web5DataPath });
      await webAgent.launch({ password });
      return await Web5.connect({
        password,
        connectedDid     : did,
        sync             : '30s',
        didCreateOptions : { dwnEndpoints },
        agent            : webAgent.userAgent,
      });
    } catch (error: any) {
      Logger.error(`Failed to connect to WEB profile: ${error.message}`);
      throw error;
    }
  }
}