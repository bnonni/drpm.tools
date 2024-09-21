type QueryFilters = {
    name: string;
    version: string;
    [key: string]: string;
};
export declare function encodeURIQueryFilters(queryFilters: QueryFilters): string;
export declare function getDwnEndpoints(did: string): Promise<any[]>;
export declare function fetchResource(did: string, name: string, version: string): Promise<string>;
export declare function writeNodeModule(did: string, name: string, version: string, dpackage: Blob): Promise<unknown>;
export {};
//# sourceMappingURL=utils.d.ts.map