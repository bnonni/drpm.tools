import { DidMethod, DidResolutionOptions } from '@web5/dids';
import { resolveDidBtc } from 'did-btc-sdk';

type DidBtcResolutionOptions = DidResolutionOptions & { transactions: string[], didIndex?: number };
export class DidBtc extends DidMethod {
  /**
   * Name of the DID method, as defined in the DID BTC specification.
   */
  public static methodName = 'btc';

  /**
   * @param _didUri DID URI to resolve; NOT USED
   * @param _options DID resolution options; MOSTLY NOT USED, contains required transactions and optional didIndex
   * @returns DID Document from BTC blockchain
   */
  public static resolve(_didUri: string, _options?: DidBtcResolutionOptions): any {
    const { transactions, didIndex } = _options!;
    return resolveDidBtc(transactions, didIndex);
  }
}