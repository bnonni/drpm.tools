import { DidDht, DidWeb, UniversalResolver } from '@web5/dids';
import { DidBtc } from '../did-btc.js';

const DID_METHOD_MAP: any = {};

export class DrpmResolver {
  public didResolvers: Array<any> = [DidDht, DidWeb, DidBtc];
  public universalResolver;

  constructor() {
    this.universalResolver  = new UniversalResolver({ didResolvers: this.didResolvers });;
  }

  public addMethod(method: string): UniversalResolver {
    this.didResolvers.push(DID_METHOD_MAP[method]);
    return this.universalResolver = new UniversalResolver({ didResolvers: this.didResolvers });
  }
}