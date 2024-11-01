import { AgentDidApi, DwnDidStore, AgentDidResolverCache } from '@web5/agent';
import { CryptoApi, LocalKeyManager } from '@web5/crypto';
import {
  BearerDid,
  DidDht,
  DidDocument,
  DidJwk,
  DidJwkCreateOptions,
  DidVerificationMethod,
  DidWeb,
  PortableDid
} from '@web5/dids';
import { Web5UserAgent } from '@web5/user-agent';

export class DidWebAgent {
  public static async create({ dataPath, portableDid }: { dataPath: string; portableDid: PortableDid }): Promise<Web5UserAgent> {
    return await Web5UserAgent.create({
      dataPath,
      agentDid : await BearerDid.import({ portableDid }),
      didApi   : new AgentDidApi({
        store         : new DwnDidStore(),
        didMethods    : [DidDht, DidJwk, DidWebFacade],
        resolverCache : new AgentDidResolverCache({
          location : `${dataPath}/DID_RESOLVERCACHE`
        }),
      })
    });
  }
}

export class DidWebFacade extends DidWeb {

  public static async create<TKms extends CryptoApi | undefined = undefined>({
    keyManager = new LocalKeyManager(),
    options = {}
  }: {
  keyManager?: TKms;
  options?: DidJwkCreateOptions<TKms>;
} = {}): Promise<BearerDid> {
    throw new Error('Method not implemented.' + keyManager + options);
  }

  public static async getSigningMethod({ didDocument, methodId }: { didDocument: DidDocument; methodId?: string; }): Promise<DidVerificationMethod> {
    throw new Error('Method not implemented.' + didDocument + methodId);
  }
}