import { Web5UserAgent } from '@web5/user-agent';
import { DEFAULT_RECOVERY_PHRASE, DEFAULT_WEB5DATAPATH } from '../../config.js';
import { createPassword } from '../../utils/misc.js';
import { DidDhtCreateParams, DrpmProfile, DrpmProfileData } from '../../utils/types.js';
import { DWeb5 } from '../dweb5.js';
import cuid from '@bugsnag/cuid';

export class DhtProfile {
  static async createAgent({ data }: { data: DrpmProfileData }): Promise<{agent: Web5UserAgent; data: DrpmProfileData}> {
    const agent = await Web5UserAgent.create({ dataPath: data.web5DataPath });

    if(await agent.firstLaunch()) {
      data.recoveryPhrase = await agent.initialize({ password: data.password });
    } else {
      throw new Error('Profile already exists. Use "drpm profile switch --dht" to load this profile.');
    }

    await agent.start({ password: data.password });

    const identity = await agent.identity.create({
      didMethod  : 'dht',
      metadata   : { name: 'DRPM' },
      didOptions : {
        services : [
          {
            id              : 'dwn',
            type            : 'DecentralizedWebNode',
            serviceEndpoint : data.dwnEndpoints,
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

    data.did = identity.metadata.connectedDid ?? identity.did.uri;

    return { agent, data };
  }

  // Helper function to create a new DHT profile
  static async create({ dwnEndpoints, password, recoveryPhrase, web5DataPath }: DidDhtCreateParams): Promise<Partial<DrpmProfile>> {
    const data = {
      did            : '',
      dwnEndpoints   : [dwnEndpoints],
      password       : password ?? createPassword(),
      recoveryPhrase : recoveryPhrase ?? DEFAULT_RECOVERY_PHRASE,
      web5DataPath   : web5DataPath ?? `${DEFAULT_WEB5DATAPATH}/DHT/${cuid()}/AGENT`
    };

    // TODO: Implement this block
    /*const { agent, data } = await this.createAgent({
      data : {
        password,
        web5DataPath,
        recoveryPhrase,
        did            : '',
        dwnEndpoints   : [dwnEndpoints],
      }
    });*/

    const { did } = await DWeb5.connectDht({ data });
    data.did = did;
    return { current: 'dht', dht: data };
  }
}