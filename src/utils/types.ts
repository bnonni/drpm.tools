import { DwnInterface, DwnMessageDescriptor, DwnResponseStatus } from '@web5/agent';
import { DrlBuilder } from './dwn/drl-builder.js';
import { Request } from 'express';
import { PortableDid } from '@web5/dids';
import { Web5UserAgent } from '@web5/user-agent';
import { Web5 } from '@web5/api';

// DWN & HTTP Request/Response Types
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
export type Signature = {
    protected: string;
    signature: string
};
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

// DRL Types
export type BaseDrl = {
    did: string;
    endpoint?: string;
};
export type DrlQueryFilter = { subKey?: string; value: string };
export type DrlAddQueryFilterParams = { key: string } & DrlQueryFilter;
export type DrlFiltersParams = {
    filters: Record<string, string | Array<DrlQueryFilter> | DrlQueryFilter>;
};
export type DrlReadParams = { [key: string]: any; } & DrlFiltersParams;

// Registry Types
export type RegistrySaveDpkData = {
    name: string;
    version: string;
    data: any
};
export type RegistryGetDpkPath = {
    name: string;
    version: string
};
export interface RegistryResponse {
    ok: true | false;
    code: number;
    status: string;
    error?: string;
    data?: any;
};
export type ReadPackageParams = {
    builder: DrlBuilder;
    name: string
};
export type ReadReleaseParams = ReadPackageParams & { version: string };
export type CreatePackageParams = { metadata: DpkMetadata; web5: Web5; did: string };
export type CreateReleaseParams = {
    parentId: string;
    name: string;
    version: string;
    integrity: string;
    release: any
};
export type DependencyParam = { dependency: string };
export type PrefixResponse = {
    prefix: string;
    version: string
};
export type RouteSuccessParams = {
    code?: number;
    status?: string;
    data: any
};
export type RouteFailureParams = {
    code?: number;
    status?: string;
    error: any
};

// Dpk Types
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
};
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
    portableDid?: PortableDid;
};
export type SupportedMethods = 'web' | 'dht' | 'btc';
export type ProfileJson = {
    current: string;
    dht: ProfileData;
    web: ProfileData;
    btc: ProfileData;
    [key: string]: any;
};
export type PartialProfileJson = Partial<ProfileJson>;
export type ProfileOptions = {
      did?: string;
      password?: string;
      dwnEndpoints?: string;
      web5DataPath?: string
      recoveryPhrase?: string;
      context?: string;
};
export type ProfileJsonCreateBase = {
    dwnEndpoints: string;
    password?: string;
    recoveryPhrase?: string;
    web5DataPath?: string;
};
export type DhtProfileCreate = ProfileJsonCreateBase & { method: 'dht'; did?: string; };
export type WebProfileCreate = ProfileJsonCreateBase & { method: 'web'; did: string; };
export type BtcProfileCreate = ProfileJsonCreateBase & { method: 'btc'; did?: string; };

export type RequestParams = Request['params'];
export type CreatePackageDidWebParams = {
    did: string;
    metadata: DpkMetadata;
};
export type DidWebConnectOptions = {
    did: string;
    password: string;
    dwnEndpoints: string[];
    web5DataPath: string;
};
export type DidDhtConnectOptions = {
    data: Partial<ProfileData>;
    agent?: Web5UserAgent;
    sync?: string;
};
export type DidDhtCreateParams = {
    dwnEndpoints: string;
    password?: string;
    recoveryPhrase?: string;
    web5DataPath?: string;
    did?: string;
};
export type DhtProfileConnectParams = {
    did: string;
    password: string;
    dwnEndpoints: string[];
    recoveryPhrase: string;
    web5DataPath: string;
};
export type DidWebCreateParams = {
    did: string;
    dwnEndpoints: string;
    password?: string;
    recoveryPhrase?: string;
    web5DataPath?: string;
};
export type DWeb5Params = { web5: Web5; did: string };
export type DhtAgentConst = { agent: Web5UserAgent };
export type DhtAgentPassword = { password: string };
export type DhtAgentDataPath = { dataPath: string };
export type DhtAgentIdentity = { dwnEndpoints: string[]; recoveryPhrase: string };