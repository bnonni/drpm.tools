export default {
    $id: 'https://test.dpm.software/schema/package',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'DPM Software Package Schema',
    type: 'object',
    properties: {
        type: 'object',
        version: {
            type: 'string',
            description: 'semantic version',
            pattern: '^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(-(?:0|[1-9A-Za-z-][0-9A-Za-z-]*)(?:\\.(?:0|[1-9A-Za-z-][0-9A-Za-z-]*))*)?(\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?$'
        },
        name: {
            type: 'string',
            description: 'package name',
        },
        integrity: {
            type: 'string',
            description: 'sha512 hash of the package contents',
        },
        code: {
            type: 'buffer',
            description: 'the actual package code to be downloaded',
        },
    },
    additionalProperties: false,
    required: ['name', 'version', 'integrity', 'code'],
};
//# sourceMappingURL=package.js.map