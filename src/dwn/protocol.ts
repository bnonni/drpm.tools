import packageSchema from './schema/package.js';

export default {
  protocol  : 'https://test.dpm.software/protocol',
  published : true,
  types     : {
    package : {
      schema      : packageSchema.$id,
      dataFormats : ['application/gzip'],
    },
  },
  structure : {
    package : {
      $tags : {
        name : {
          type : 'string',
        },
        version : {
          type : 'string',
        },
        integrity : {
          type : 'string',
        },
        $requiredTags : ['name', 'version', 'integrity'],
      },
      $actions : [
        {
          who : 'anyone',
          can : ['read'],
        },
      ],
    },
  },
};
