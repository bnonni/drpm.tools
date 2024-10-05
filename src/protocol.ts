export default {
  protocol  : 'https://dpm.software/docs/protocol.json',
  published : true,
  types     : {
    package : {
      schema      : 'https://www.rfc-editor.org/rfc/rfc1952.html',
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
