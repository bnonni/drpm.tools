declare const _default: {
    protocol: string;
    published: boolean;
    types: {
        package: {
            schema: string;
            dataFormats: string[];
        };
    };
    structure: {
        package: {
            $tags: {
                name: {
                    type: string;
                };
                version: {
                    type: string;
                };
                integrity: {
                    type: string;
                };
                $requiredTags: string[];
            };
            $actions: {
                who: string;
                can: string[];
            }[];
        };
    };
};
export default _default;
//# sourceMappingURL=protocol.d.ts.map