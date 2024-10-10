export default {
  'name'      : 'tool5',
  'dist-tags' : {
    'latest' : '5.0.1'
  },
  'versions' : {
    '5.0.1' : {
      'name'        : 'tool5',
      'version'     : '5.0.1',
      'description' : 'CLI tool for interacting with Web5',
      'type'        : 'module',
      'main'        : './dist/cjs/index.js',
      'module'      : './dist/esm/index.js',
      'types'       : './dist/types/index.d.ts',
      'bin'         : {
        'tool5' : 'dist/esm/tool5.js'
      },
      'exports' : {
        '.' : {
          'import'  : './dist/esm/index.js',
          'require' : './dist/cjs/index.js'
        },
        './package.json' : './package.json'
      },
      'scripts' : {
        'start'           : 'npm run build && node dist/esm/tool5.js',
        'wipe'            : 'rm -rf dist node_modules',
        'clean'           : 'rimraf dist',
        'build'           : 'npm run build:cjs && npm run build:esm',
        'build:cjs'       : 'rimraf dist/cjs && tsc -p tsconfig.cjs.json && echo \'{"type": "commonjs"}\' > ./dist/cjs/package.json',
        'build:esm'       : 'rimraf dist/esm dist/types && tsc -p tsconfig.esm.json',
        'did:create'      : 'npm run build && node dist/esm/tool5.js -p did -a create',
        'cli:install'     : 'sh install-tool5.sh',
        'cli:uninstall'   : 'rm -rf dist node_modules',
        'update:outdated' : 'ncu --install always -u',
        'prepare'         : 'npm run build && chmod +x ./dist/esm/tool5.js'
      },
      'repository' : {
        'type' : 'git',
        'url'  : 'git+ssh://git@github.com/bnonni/tool5.git'
      },
      'author' : {
        'name' : 'Bryan Nonni',
        'url'  : 'https://github.com/bnonni'
      },
      'license' : 'ISC',
      'bugs'    : {
        'url' : 'https://github.com/bnonni/tool5/issues'
      },
      'homepage'     : 'https://github.com/bnonni/tool5#readme',
      'dependencies' : {
        '@web5/agent'       : '^0.6.1',
        '@web5/api'         : '^0.10.0',
        '@web5/common'      : '^1.0.2',
        '@web5/credentials' : '^1.1.1',
        '@web5/crypto'      : '^1.0.4',
        '@web5/dids'        : '^1.1.4',
        '@web5/user-agent'  : '^0.5.1',
        'chalk'             : '^5.3.0',
        'commander'         : '^12.1.0',
        'ed25519-keygen'    : '^0.6.2'
      },
      'devDependencies' : {
        '@eslint/js'                       : '^9.10.0',
        '@types/node'                      : '^22.5.4',
        '@types/readable-stream'           : '^4.0.15',
        '@typescript-eslint/eslint-plugin' : '^8.5.0',
        '@typescript-eslint/parser'        : '^8.5.0',
        'dotenv'                           : '^16.4.5',
        'eslint'                           : '^9.10.0',
        'globals'                          : '^15.9.0',
        'npm-check-updates'                : '^17.1.1',
        'rimraf'                           : '^6.0.1',
        'tsx'                              : '^4.19.1',
        'typescript'                       : '^5.6.2'
      },
      '_id'          : 'tool5@5.0.1',
      'gitHead'      : 'ecac56caf08a6c5198695fe1476cb462c5d7db80',
      '_nodeVersion' : '20.18.0',
      '_npmVersion'  : '10.8.2',
      'dist'         : {
        'integrity'    : 'sha512-gPClNFHEACDPrNPIY9nQ5CtgNzXLek1VKLkenI/RRKrrWSSyIVte0HloLzyQJFW0bXgFnv5TgtcUM+xHE7B6/w==',
        'shasum'       : 'dc12d542e446ae3025101bc3de6c0fb5886a8a49',
        'tarball'      : 'http://localhost:2092/@dpm/tool5/did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo^5.0.1/-/tool5-5.0.1.tgz',
        'fileCount'    : 95,
        'unpackedSize' : 115474,
        'signatures'   : [
          {
            'keyid' : 'SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA',
            'sig'   : 'MEYCIQDhX2SZFZyV3rBaQp/tH0NRk1YWw6rF2KrietBA6xDIFQIhANJcAYMSl+mvNefhpxjyApSUK/CXFEnCeUSEQf113OPI'
          }
        ]
      },
      '_npmUser' : {
        'name'  : 'bnonni',
        'email' : 'development.xw3hd@passmail.com'
      },
      'directories' : {},
      'maintainers' : [
        {
          'name'  : 'bnonni',
          'email' : 'development.xw3hd@passmail.com'
        }
      ],
      '_npmOperationalInternal' : {
        'host' : 's3://npm-registry-packages',
        'tmp'  : 'tmp/tool5_5.0.1_1728514637169_0.3221744505985593'
      },
      '_hasShrinkwrap' : false
    }
  },
  'time' : {
    'created'  : '2024-10-09T22:57:17.406Z',
    'modified' : '2024-10-09T22:57:17.406Z',
    '5.0.1'    : '2024-10-09T22:57:17.406Z'
  },
  'bugs' : {
    'url' : 'https://github.com/bnonni/tool5/issues'
  },
  'author' : {
    'name' : 'Bryan Nonni',
    'url'  : 'https://github.com/bnonni'
  },
  'license'    : 'ISC',
  'homepage'   : 'https://github.com/bnonni/tool5#readme',
  'repository' : {
    'type' : 'git',
    'url'  : 'git+ssh://git@github.com/bnonni/tool5.git'
  },
  'description' : 'CLI tool for interacting with Web5',
  'maintainers' : [
    {
      'name'  : 'bnonni',
      'email' : 'development.xw3hd@passmail.com'
    }
  ],
  'readme'         : '# Tool5\n\nA simple typescript cli for interacting with tbd web5-js.\n\n## Summary\n\nThis repo is meant to be instructional. Use the code and cli to experiement with interacting with the core web5-js primitives: DIDs, VCs, DWNs.\nThis repo is not meant to be a substitute for the web5-js library. It exposes a simple cli interface that is using the web5-js library "under the hood."\nTo add web5 to your project or to build a DWA (decentralized web app) with web5, visit the tbd web5-js repo: <https://github.com/TBD54566975/web5-js>\n\n## Quick Install\n\nTo install `tool5`, run one of the following commands\n\n```sh\n# quick install clone\ngit clone git@github.com:bnonni/tool5.git && cd tool5 && npm run cli:install\n```\n\n```sh\n# quick install script\nwget -O - https://raw.githubusercontent.com/bnonni/tool5/main/install-tool5.sh | sh\n```\n\n## Step-by-step Install\n\nRun each of the below commands to install `tool5` locally.\n\n```sh\n# clone repo & cd into dir\ngit clone git@github.com:bnonni/tool5.git && cd tool5\n# install dependencies & build project\nnpm install && npm run build\n# install cli\nnpm run install:cli\n# show help menu\ntool5 --help\n# create a new did:dht\ntool5 -p did -a create\n```\n\n### did\n\nActions you can take on DIDs\n\n* create: creates a new did\n* recover: recovers an existing did (coming soon)\n* publish: publishes a did to the dht network (coming soon)\n* resolve: resolves a did from the dht network (coming soon)\n\n### vc (coming soon)\n\nActions you can take on VCs\n\n* create: creates a new verifiable credential\n* verify: verifies an existing credential\n\n### dwn (coming soon)\n\nActions you can take on DWNs\n\n* create: creates a new dwn record\n* read: reads dwn records\n* update: updates an existing dwn record\n* delete: deletes a dwn record\n',
  'readmeFilename' : 'README.md'
};