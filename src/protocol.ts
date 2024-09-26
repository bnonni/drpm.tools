export default {
  protocol  : 'https://dpm.software/.well-known/protocol',
  published : true,
  types     : {
    package : {
      schema      : 'https://dpm.software/.well-known/protocol',
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
        description : {
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
