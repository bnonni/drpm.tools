import { DwnInterface, DwnMessageDescriptor, DwnResponseStatus } from '@web5/agent';

export type Dpk = {
    name: string;
    version: string;
    protocolPath: string;
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
    encodedData: string;
};
export type DwnResponse = DwnResponseStatus & { entries: DwnResponseEntry[] };
export type DwnRecordDescriptor =
    | DwnMessageDescriptor[DwnInterface.RecordsWrite]
    | DwnMessageDescriptor[DwnInterface.RecordsDelete];