export default {
  'protocol'  : 'https://dpm.software/protocols/dpm',
  'published' : true,
  'types'     : {
    'package' : {
      'dataFormats' : [
        'application/json'
      ]
    },
    'icon' : {
      'dataFormats' : [
        'image/gif',
        'image/png',
        'image/jpeg'
      ]
    },
    'release' : {
      'schema'      : 'https://www.rfc-editor.org/rfc/rfc1952.html',
      'dataFormats' : [
        'application/gzip'
      ]
    },
    'admin' : {
      'dataFormats' : [
        'application/json'
      ]
    }
  },
  'structure' : {
    'package' : {
      '$tags' : {
        'name' : {
          'type' : 'string'
        },
        '$requiredTags' : [
          'name'
        ]
      },
      '$actions' : [
        {
          'who' : 'author',
          'of'  : 'package',
          'can' : [
            'create',
            'update',
            'delete'
          ]
        },
        {
          'role' : 'package/admin',
          'can'  : [
            'co-update'
          ]
        }
      ],
      'admin' : {
        '$role'    : true,
        '$actions' : [
          {
            'who' : 'author',
            'of'  : 'package',
            'can' : [
              'create',
              'update',
              'delete'
            ]
          }
        ]
      },
      'icon' : {
        '$actions' : [
          {
            'who' : 'author',
            'of'  : 'package',
            'can' : [
              'create',
              'update',
              'delete',
              'co-update',
              'co-delete'
            ]
          },
          {
            'role' : 'package/admin',
            'can'  : [
              'create',
              'update',
              'delete',
              'co-update',
              'co-delete'
            ]
          }
        ]
      },
      'release' : {
        '$tags' : {
          'version' : {
            'type' : 'string'
          },
          'integrity' : {
            'type' : 'string'
          },
          '$requiredTags' : [
            'version',
            'integrity'
          ]
        },
        '$actions' : [
          {
            'who' : 'author',
            'of'  : 'package',
            'can' : [
              'create',
              'update',
              'delete'
            ]
          },
          {
            'role' : 'package/admin',
            'can'  : [
              'create',
              'update',
              'delete'
            ]
          }
        ]
      }
    }
  }
};