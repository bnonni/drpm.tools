import { DEFAULT_DWN_URL, DRPM_PROTOCOL_B64URL } from '../../config.js';
import dwn from './protocol.js';
import { Logger } from '../logger.js';
import { BaseDrl, DrlAddQueryFilterParams, DrlFiltersParams, DrlReadParams } from '../types.js';
import { DrlUtils } from './drl-utils.js';


export class DrlBuilder {
  baseDrl: string;
  path: string = '';
  query: string[] = [];

  constructor({ endpoint, did }: BaseDrl) {
    if (!did) throw new Error('DID required to build DRL');
    if (!endpoint) Logger.warn('No DWN Endpoint Found! Using the default endpoint is not recommended.');
    this.baseDrl = `${endpoint ?? DEFAULT_DWN_URL}/${did}`;
  }

  // Start building with base DRL
  static create({ did, endpoint }: BaseDrl): DrlBuilder {
    return new DrlBuilder({ did, endpoint });
  }

  // Add a generic path (e.g., query, read)
  addPath({pathSegment}: {pathSegment: string}): DrlBuilder {
    this.path = `${this.path}/${pathSegment}`;
    return this;
  }

  addProtocolEncoded(): DrlBuilder {
    this.path = `${this.path}/read/protocols/${DRPM_PROTOCOL_B64URL}`;
    return this;
  }

  // Add encoded protocol to the path
  addProtocol({protocol}: {protocol?: string}): DrlBuilder {
    const encodedProtocol = DrlUtils.base64urlEncode(protocol ?? dwn.protocol);
    this.path = `${this.path}/read/protocols/${encodedProtocol}`;
    return this;
  }

  // Add encoded protocol to the path
  addProtocolPath({protocolPath}: {protocolPath: string}): DrlBuilder {
    this.path = `${this.path}/${protocolPath}`;
    return this;
  }

  // Add filter query parameters dynamically
  addFilter({key, value, subKey}: DrlAddQueryFilterParams): DrlBuilder {
    const filter = subKey
      ? `filter.${key}.${subKey}=${value}`
      : `filter.${key}=${value}`;
    this.query.push(filter);
    return this;
  }

  // Add multiple filters dynamically, supporting arrays for filters like tags
  addFilters({ filters }: DrlFiltersParams): DrlBuilder {
    Object.keys(filters).forEach(key => {
      const filter = filters[key];
      // Case 1: Simple key-value pair, e.g., { 'protocolPath': 'package' }
      if (typeof filter === 'string') {
        this.addFilter({ key, value: filter });
      }
      // Case 2: List of objects with value and subKey,
      // e.g. { tags: [{ value: 'tool5', subKey: 'name' }, { value: '6.1.0', subKey: 'version' }] }
      else if (Array.isArray(filter)) {
        filter.forEach(({value, subKey}) => {
          this.addFilter({ key, value, subKey });
        });
      }
      // Case 3: Single object with value and subKey, e.g., { tags: { value: 'tool5', subKey: 'name' } }
      else if (DrlUtils.isJsonObject(filter)) {
        const {value, subKey} = filter ?? {};
        this.addFilter({ key, value, subKey });
      }
    });
    return this;
  }

  // Build and return the final DRL
  build(): string {
    const queryString = this.query.length ? `?${this.query.join('&')}` : '';
    console.log('this', this);
    return `${this.baseDrl}${this.path}${queryString}`;
  }

  // Handle building a query-based DRL
  buildDrlQuery({ filters }: DrlFiltersParams): string {
    this.addPath({ pathSegment: 'query' });
    this.addFilters({ filters });
    return this.build();
  }

  // Handle building a protocol read DRL with optional protocolPath and filters
  buildDrlRead({ protocolPath, filters }: DrlReadParams): string {
    this.addProtocol({});
    this.addProtocolPath({ protocolPath });
    this.addFilters({ filters });
    return this.build();
  }
}