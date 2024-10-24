import { DwnInterface, DwnMessageDescriptor, DwnResponseStatus } from '@web5/agent';
import { DrlBuilder } from './dwn/drl-builder.js';

// Fetching
export type ResponseInfo = {
    ok: boolean;
    code: number;
    status: string;
    data?: any;
    error?: string;
};
export type DwnResponseInfo = {
    code: number;
    status?: string;
    detail: string;
};
export type DwnResponseEntry = DwnRecordDescriptor & {
    recordId: string;
    contextId: string;
    encodedData: string;
    descriptor: DpkDwnDescriptor;
    authorization: Authorization;
};
export type DpkDwnDescriptor = {
    tags: {
      name: string;
      version: string;
      integrity: string;
      [key: string]: any;
    },
    method: string;
    schema: string;
    dataCid: string;
    dataSize: number;
    protocol: string;
    interface: string;
    published: true,
    dataFormat: string;
    dateCreated: string;
    protocolPath: string;
    datePublished: string;
    messageTimestamp: string;
};
export type Signature = { protected: string; signature: string };
export type Authorization = {
    signature: {
        payload: string;
        signatures: Signature[]
    }
};
export type DpkDwnResponse = DwnResponseStatus & { entries: DwnResponseEntry[] };
export type DwnRecordDescriptor =
    | DwnMessageDescriptor[DwnInterface.RecordsWrite]
    | DwnMessageDescriptor[DwnInterface.RecordsDelete];

// DrlBuilder
export type BaseDrl = {
    did: string;
    endpoint?: string;
};
export type DrlQueryFilter = { subKey?: string; value: string };
export type DrlAddQueryFilterParams = { key: string } & DrlQueryFilter;
export type DrlFiltersParams = {
    filters:
        | Record<string, string
        | Array<DrlQueryFilter>
        | DrlQueryFilter>;
};
export type DrlReadParams = { [key: string]: any; } & DrlFiltersParams;

// Drg
export type DrgSaveDpkData = {
    name: string;
    version: string;
    data: any
};
export type DrgGetDpkPath = {
    name: string;
    version: string
};
export interface DrgResponse {
    ok: true | false;
    code: number;
    status: string;
    error?: string;
    data?: any;
};

// Dpk
export type DIntegrityFormat = 'stream' | 'file';
export type DIntegrityData = ReadableStream<Uint8Array> | string;
export type DIntegrityParams = {
    format: DIntegrityFormat;
    data: DIntegrityData
};
export type Dpk = {
    name: string;
    version?: string;
    path: string;
}
export type DpkRequest = {
    did: string;
    dpk: Dpk;
};
export type DpkRequestParams = Dpk & {
    builder: DrlBuilder;
    did?: string;
    endpoint?: string;
};
export type DpkMetadata = { [key: string]: any };
export type DpkTarball = ReadableStream<Uint8Array>;
export type DpkData = {
    'package'?: DpkMetadata;
    'package/release'?: DpkTarball;
    [key: string]: any;
};
export type ProfileData = {
    did: string;
    password: string;
    dwnEndpoints: string[];
    web5DataPath: string;
    recoveryPhrase: string;
};
export type ProfileOptions = {
      did?: string;
      password?: string;
      dwnEndpoints?: string;
      web5DataPath?: string
      recoveryPhrase?: string;
};
export type ProfileCreateParams = { dwnEndpoint: string; password?: string; };