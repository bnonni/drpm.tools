import { DwnInterface, DwnMessageDescriptor, DwnResponseStatus } from '@web5/agent';

export type DpkIntegrityFormat = 'stream' | 'file';
export type DpkIntegrityData = ReadableStream<Uint8Array> | string;
export type DpkIntegrityParams = {
    format: DpkIntegrityFormat;
    data: DpkIntegrityData
};
export type BaseDrl = {
    did: string;
    endpoint?: string;
};
export type DrlQuery = {
    name: string;
    version: string;
};
export type DrgSaveDpkData = {
    name: string;
    version: string;
    data: any
};
export type DrgGetDpkPath = {
    name: string;
    version: string
};
export type Dpk = {
    name: string;
    version: string;
    path?: string;
}
export type DpkRequest = {
    did: string;
    dpk: Dpk;
};
export type DpkResponse = {
    ok: boolean;
    code: number;
    status: string;
    message?: any | ReadableStream<Uint8Array>;
};
export type QueryFilters = {
    name: string;
    version: string;
    [key: string]: string
};
export type DwnResponseEntry = DwnRecordDescriptor & {
    recordId: string;
    contextId: string;
    encodedData: string;
    descriptor: {
        tags: {
          name: string;
          version: string;
          integrity: string;
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
};
export type DwnResponse = DwnResponseStatus & { entries: DwnResponseEntry[] };
export type DwnRecordDescriptor =
    | DwnMessageDescriptor[DwnInterface.RecordsWrite]
    | DwnMessageDescriptor[DwnInterface.RecordsDelete];