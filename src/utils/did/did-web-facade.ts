import { CryptoApi, LocalKeyManager } from '@web5/crypto';
import {
  BearerDid,
  DidDocument,
  DidJwkCreateOptions,
  DidVerificationMethod,
  DidWeb
} from '@web5/dids';

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