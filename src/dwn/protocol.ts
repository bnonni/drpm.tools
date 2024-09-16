import packageSchema from './schema/package.js';

export default {
  protocol  : 'https://dpm.software/protocols/dpm',
  published : true,
  types     : {
    package : {
      schema      : packageSchema.$id,
      dataFormats : ['application/json', 'application/octet-stream'],
    },
  },
  structure : {
    package : {
      $tags : {
        name    : {
          type : 'string',
        },
        version : {
          type : 'string',
        },
        integrity : {
          type : 'string',
        },
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
