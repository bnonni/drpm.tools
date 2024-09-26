export type ResolveContext = {
    conditions: string[];
    importAttributes: {};
    parentURL: string;
};
export type Function = (...args: any[]) => any;
export type Resolution = {
    [key: string]: any;
    shortCircuit?: boolean;
};
//# sourceMappingURL=types.d.ts.map