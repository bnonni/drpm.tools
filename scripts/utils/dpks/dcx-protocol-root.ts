export default {
  "_id": "@dcx-protocol/root",
  "_rev": "22-503c8392c36259a8a6f7727e55a5eb45",
  "name": "@dcx-protocol/root",
  "dist-tags": {
    "latest": "7.0.1"
  },
  "versions": {
    "0.0.6": {
      "name": "@dcx-protocol/root",
      "version": "0.0.6",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@0.0.6",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "475ae56a26574b96441f2b23b5663c09b5cdd91b",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-0.0.6.tgz",
        "fileCount": 123,
        "integrity": "sha512-34X7BIt5o086KbcMiUFToTM5m+lQHhKjfbQuklQnV4QPnoLaCrtgjYyYH0mi0Mx+HEtjVNGoyCmdSmCXw1cRRQ==",
        "signatures": [
          {
            "sig": "MEYCIQC8MHeLxmhO8B6/naExXWliLcC324Kwi/RlGzWZWJTiNwIhAO/ALUYMXj7wxw63zVNDlm/Jbnf6KtPq/p/4W7KfBTdH",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1141339
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-0.0.6.tgz",
      "engines": {
        "node": ">=18.0.0"
      },
      "scripts": {
        "test": "pnpm --recursive test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "version": "tsx scripts/version.ts",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm test"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/2575a23fb2b6cf33649bdc43d3705767/dcx-protocol-root-0.0.6.tgz",
      "_integrity": "sha512-34X7BIt5o086KbcMiUFToTM5m+lQHhKjfbQuklQnV4QPnoLaCrtgjYyYH0mi0Mx+HEtjVNGoyCmdSmCXw1cRRQ==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "dependencies": {
        "typescript-eslint": "^7.16.1"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "mocha": "^10.6.1",
        "eslint": "^8.57.0",
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@eslint/js": "^8.57.0",
        "@changesets/cli": "^2.27.7",
        "@npmcli/package-json": "^5.2.0",
        "@typescript-eslint/parser": "^7.16.1",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_0.0.6_1721597691822_0.632024112874989",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.0.7": {
      "name": "@dcx-protocol/root",
      "version": "0.0.7",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@0.0.7",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "babf16989cd344a761e3bf5d842bb9984ae18160",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-0.0.7.tgz",
        "fileCount": 120,
        "integrity": "sha512-lfea+TdXIapD4Nfo2Gx9TOo0sANc1jMckD5RPtP7548hF7u7Dr6vn3nOAAlQ8HQa8BMOy/A7qp5XgC22PXn1RA==",
        "signatures": [
          {
            "sig": "MEUCIQDqhlXsEEw9lu6I5nlO5dUxqJk44A7U/ShJichtexH9BgIgFv6ZG0ZLg3qKkitmzOMaDSBpAJbCtsFBmAF0RdYDM08=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1139574
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-0.0.7.tgz",
      "engines": {
        "node": ">=18.0.0"
      },
      "scripts": {
        "test": "pnpm --recursive test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "version": "tsx scripts/version.ts",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm test"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/446f0d27e267ac0eb111fba8798496d2/dcx-protocol-root-0.0.7.tgz",
      "_integrity": "sha512-lfea+TdXIapD4Nfo2Gx9TOo0sANc1jMckD5RPtP7548hF7u7Dr6vn3nOAAlQ8HQa8BMOy/A7qp5XgC22PXn1RA==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "dependencies": {
        "typescript-eslint": "^7.16.1"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "mocha": "^10.6.1",
        "eslint": "^8.57.0",
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@eslint/js": "^8.57.0",
        "@changesets/cli": "^2.27.7",
        "@npmcli/package-json": "^5.2.0",
        "@typescript-eslint/parser": "^7.16.1",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_0.0.7_1721599589406_0.9856346562517206",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.0.8": {
      "name": "@dcx-protocol/root",
      "version": "0.0.8",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@0.0.8",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "711a5587a95b7571e12fcc538917c3f14521ee28",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-0.0.8.tgz",
        "fileCount": 119,
        "integrity": "sha512-RFEahRpvszIo69QNkGiFw+BGdF+2hfb87OrKeKDAPnL9IRgWYFDMssGZ6NsVfQGXccYtPlWx+uY01OwO65GsVQ==",
        "signatures": [
          {
            "sig": "MEYCIQDMy3rfGmCVRkNDeNHJ/xygwrMHvgAAwtyKie0tIgSp4gIhAKS7UT860R05uPIcF+TgnUbXtaESGD9FMQorjlNwiHwq",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1147539
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-0.0.8.tgz",
      "engines": {
        "node": ">=18.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive lint",
        "test": "pnpm --recursive test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "version": "tsx scripts/version.ts",
        "lint:fix": "pnpm --recursive lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm test"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/a1472ef68c44c30028d31778fba35255/dcx-protocol-root-0.0.8.tgz",
      "_integrity": "sha512-RFEahRpvszIo69QNkGiFw+BGdF+2hfb87OrKeKDAPnL9IRgWYFDMssGZ6NsVfQGXccYtPlWx+uY01OwO65GsVQ==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "dependencies": {
        "typescript-eslint": "^7.16.1"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "mocha": "^10.6.1",
        "eslint": "^8.57.0",
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@eslint/js": "^8.57.0",
        "@changesets/cli": "^2.27.7",
        "@npmcli/package-json": "^5.2.0",
        "@typescript-eslint/parser": "^7.16.1",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_0.0.8_1721769046173_0.6339594038457994",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.0.9": {
      "name": "@dcx-protocol/root",
      "version": "0.0.9",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@0.0.9",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "1b47f7c0586fcc43563592c820d9c8610a64a9e5",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-0.0.9.tgz",
        "fileCount": 152,
        "integrity": "sha512-eGE9c0lxGRG+ikjvUzmdMf8nkPwsZ6MIznEuIgjoveCEE+zzLyoQJWoRJcm1wJzXe/bMynKEwqrG6hrHYqHuRg==",
        "signatures": [
          {
            "sig": "MEUCIHK5P/QOCM/KwhxAlY1v/KRJWJXbIPRexW69dafL2t9WAiEA779lBL9+D0xysU9cac1aCT92q3V9UkorwTyskfj45ac=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 26232277
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-0.0.9.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive lint",
        "test": "pnpm --recursive test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm build:tests:node && pnpm test:node",
        "test:node": "pnpm --recursive test:node",
        "build:common": "pnpm --filter common build",
        "build:issuer": "pnpm --filter issuer build",
        "build:applicant": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive build:tests:node",
        "test:node:common": "pnpm --filter common test:node",
        "test:node:issuer": "pnpm --filter issuer test:node",
        "test:node:applicant": "pnpm --filter applicant test:node"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/54ca0be761f43a835036960d1e14453d/dcx-protocol-root-0.0.9.tgz",
      "_integrity": "sha512-eGE9c0lxGRG+ikjvUzmdMf8nkPwsZ6MIznEuIgjoveCEE+zzLyoQJWoRJcm1wJzXe/bMynKEwqrG6hrHYqHuRg==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_0.0.9_1722981202749_0.08421659942408488",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.0.10": {
      "name": "@dcx-protocol/root",
      "version": "0.0.10",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@0.0.10",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "add7413d53249cde8b4f38d8572b9b8ca4092606",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-0.0.10.tgz",
        "fileCount": 177,
        "integrity": "sha512-ZiwzZZKKlvQZAMvj5bngonQNcg9F83rylW8CSRXH0nUtyu+yjwb4v3JhtYY0ChIBiCOFvjmxZdBtI6Es8S2Gfg==",
        "signatures": [
          {
            "sig": "MEQCIEDU2aE64HDfuitDFCib6UPpnp7j0yyDSETH9wxfXKx5AiBnHbK25ubDssJYme9EdFssFsajFKD5bOHrghU5n8EbyQ==",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1196859
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-0.0.10.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive lint",
        "test": "pnpm --recursive test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm build:tests:node",
        "test:node": "pnpm --recursive test:node",
        "build:common": "pnpm --filter common build",
        "build:issuer": "pnpm --filter issuer build",
        "build:applicant": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive build:tests:node",
        "test:node:common": "pnpm --filter common test:node",
        "test:node:issuer": "pnpm --filter issuer test:node",
        "test:node:applicant": "pnpm --filter applicant test:node"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/62e4854d517fd9a57d5028026b988f13/dcx-protocol-root-0.0.10.tgz",
      "_integrity": "sha512-ZiwzZZKKlvQZAMvj5bngonQNcg9F83rylW8CSRXH0nUtyu+yjwb4v3JhtYY0ChIBiCOFvjmxZdBtI6Es8S2Gfg==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_0.0.10_1723218564071_0.7167599570975145",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.1.0": {
      "name": "@dcx-protocol/root",
      "version": "0.1.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@0.1.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "79d039451beca03f5c4b9934a6b8678d5e595b1e",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-0.1.0.tgz",
        "fileCount": 150,
        "integrity": "sha512-EPjKIz7y4BnG4DkjSUEF7BGFfK4/vHxuGLTw8pUfcKA5ecLP3F5g2Gso6332qaskRIiKZDSxkWoQ549/9HqdUQ==",
        "signatures": [
          {
            "sig": "MEQCIBfgI8f7q/w/J5KfIJ2Ye4RSo46lY891KmuRICh53uI7AiAg8JmdBhDcIC9eFym74PEFWNZ/i8RBwoYp/rCGFTWFsQ==",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 21259495
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-0.1.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive lint",
        "test": "pnpm --recursive test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm build:tests:node",
        "test:node": "pnpm --recursive test:node",
        "build:common": "pnpm --filter common build",
        "build:issuer": "pnpm --filter issuer build",
        "publish:common": "pnpm --filter common publish",
        "publish:issuer": "pnpm --filter issuer publish",
        "build:applicant": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive build:tests:node",
        "test:node:common": "pnpm --filter common test:node",
        "test:node:issuer": "pnpm --filter issuer test:node",
        "publish:applicant": "pnpm --filter applicant publish",
        "test:node:applicant": "pnpm --filter applicant test:node",
        "version:major:common": "tsx scripts/version.ts major common",
        "version:major:issuer": "tsx scripts/version.ts major issuer",
        "version:minor:common": "tsx scripts/version.ts minor common",
        "version:minor:issuer": "tsx scripts/version.ts minor issuer",
        "version:patch:common": "tsx scripts/version.ts patch common",
        "version:patch:issuer": "tsx scripts/version.ts patch issuer",
        "version:major:applicant": "tsx scripts/version.ts major applicant",
        "version:minor:applicant": "tsx scripts/version.ts minor applicant",
        "version:patch:applicant": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/44335d56e85663fce271c9af5b7939b7/dcx-protocol-root-0.1.0.tgz",
      "_integrity": "sha512-EPjKIz7y4BnG4DkjSUEF7BGFfK4/vHxuGLTw8pUfcKA5ecLP3F5g2Gso6332qaskRIiKZDSxkWoQ549/9HqdUQ==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_0.1.0_1723501702842_0.5692699733598345",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.1.1": {
      "name": "@dcx-protocol/root",
      "version": "0.1.1",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@0.1.1",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "f0e41b344436c1e3d7c054144066183c19882632",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-0.1.1.tgz",
        "fileCount": 137,
        "integrity": "sha512-nd48AYva2rhIsGSmHsHyq0UWtOZCwJCrbiMTF1iN9Hz3T6TcBfi7Zg5oISttRQJWJSKLyxKOBZye5yrmIaI52A==",
        "signatures": [
          {
            "sig": "MEYCIQDdYexY41GWnDoLumfQaadmbdRy3mek/aLzRlwuO7YRBQIhAP8rNbNKbIpH5ll5DD9+UKIfKoN/bW2+ed+eLBomnBr2",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1174490
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-0.1.1.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive lint",
        "test": "pnpm --recursive test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm build:tests:node",
        "test:node": "pnpm --recursive test:node",
        "build:common": "pnpm --filter common build",
        "build:issuer": "pnpm --filter issuer build",
        "publish:common": "pnpm --filter common publish",
        "publish:issuer": "pnpm --filter issuer publish",
        "build:applicant": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive build:tests:node",
        "test:node:common": "pnpm --filter common test:node",
        "test:node:issuer": "pnpm --filter issuer test:node",
        "publish:applicant": "pnpm --filter applicant publish",
        "test:node:applicant": "pnpm --filter applicant test:node",
        "version:major:common": "tsx scripts/version.ts major common",
        "version:major:issuer": "tsx scripts/version.ts major issuer",
        "version:minor:common": "tsx scripts/version.ts minor common",
        "version:minor:issuer": "tsx scripts/version.ts minor issuer",
        "version:patch:common": "tsx scripts/version.ts patch common",
        "version:patch:issuer": "tsx scripts/version.ts patch issuer",
        "version:major:applicant": "tsx scripts/version.ts major applicant",
        "version:minor:applicant": "tsx scripts/version.ts minor applicant",
        "version:patch:applicant": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/9ef611580284c3c13fa16f391537c8fa/dcx-protocol-root-0.1.1.tgz",
      "_integrity": "sha512-nd48AYva2rhIsGSmHsHyq0UWtOZCwJCrbiMTF1iN9Hz3T6TcBfi7Zg5oISttRQJWJSKLyxKOBZye5yrmIaI52A==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_0.1.1_1723550829858_0.5995838933932127",
        "host": "s3://npm-registry-packages"
      }
    },
    "1.0.0": {
      "name": "@dcx-protocol/root",
      "version": "1.0.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@1.0.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "eabefa23a09039a7d3cc2ac1cef46d151634eb81",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-1.0.0.tgz",
        "fileCount": 134,
        "integrity": "sha512-OkPck3JqV8Tg5d03XVvw4y1joiMuIADW7NwXvxBtnwR5PTN/kJ9oDZ01nMx0Ozfh4fEDjstaTlHOMJisFW0A/g==",
        "signatures": [
          {
            "sig": "MEUCIQDBqQU2VNSG8cLJEHKAE+WGLrDFydp6C1e+l8PBHaQXnwIgXtW0vnbNyu8kj+YEGMDTA3Z0Fhi7bp1dmagbL/rS3ms=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1161809
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-1.0.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive lint",
        "test": "pnpm --recursive test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm build:tests:node",
        "test:node": "pnpm --recursive --stream test:node",
        "build:common": "pnpm --filter common build",
        "build:issuer": "pnpm --filter issuer build",
        "publish:common": "pnpm --filter common publish",
        "publish:issuer": "pnpm --filter issuer publish",
        "build:applicant": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive build:tests:node",
        "test:node:common": "pnpm --filter common test:node",
        "test:node:issuer": "pnpm --filter issuer test:node",
        "publish:applicant": "pnpm --filter applicant publish",
        "test:node:applicant": "pnpm --filter applicant test:node",
        "version:major:common": "tsx scripts/version.ts major common",
        "version:major:issuer": "tsx scripts/version.ts major issuer",
        "version:minor:common": "tsx scripts/version.ts minor common",
        "version:minor:issuer": "tsx scripts/version.ts minor issuer",
        "version:patch:common": "tsx scripts/version.ts patch common",
        "version:patch:issuer": "tsx scripts/version.ts patch issuer",
        "version:major:applicant": "tsx scripts/version.ts major applicant",
        "version:minor:applicant": "tsx scripts/version.ts minor applicant",
        "version:patch:applicant": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/1adb97762c7a65582da28796e2571eb5/dcx-protocol-root-1.0.0.tgz",
      "_integrity": "sha512-OkPck3JqV8Tg5d03XVvw4y1joiMuIADW7NwXvxBtnwR5PTN/kJ9oDZ01nMx0Ozfh4fEDjstaTlHOMJisFW0A/g==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "20.16.0",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_1.0.0_1723587262711_0.36845687952312334",
        "host": "s3://npm-registry-packages"
      }
    },
    "3.0.0": {
      "name": "@dcx-protocol/root",
      "version": "3.0.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@3.0.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "b40e354a7b892d143ca29a16cff0a105df69aa91",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-3.0.0.tgz",
        "fileCount": 186,
        "integrity": "sha512-+wOOJz16/cAwHB/TVlGrxfCcdrlEhiWdDmG0Ce6rd2ZRXUiEM8Qcry55bkV/Ia9bhoh3XI8464hQrGBiirWfVw==",
        "signatures": [
          {
            "sig": "MEUCICmmPmv2b3+0Cm07JmwmnENKyr1EADKTxdPZMCjpBxyVAiEA21EpT/DAiJagYKKd4ZiysG24QAXqk2997Qs7xIsSwnk=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1338155
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-3.0.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive lint",
        "test": "pnpm --recursive test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm build:tests:node",
        "test:node": "pnpm --recursive --stream test:node",
        "build:common": "pnpm --filter common build",
        "build:issuer": "pnpm --filter issuer build",
        "build:server": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "publish:common": "pnpm --filter common publish",
        "publish:issuer": "pnpm --filter issuer publish",
        "publish:server": "pnpm --filter issuer publish",
        "build:applicant": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive build:tests:node",
        "test:node:common": "pnpm --filter common test:node",
        "test:node:issuer": "pnpm --filter issuer test:node",
        "test:node:server": "pnpm --filter server test:node",
        "publish:applicant": "pnpm --filter applicant publish",
        "test:node:applicant": "pnpm --filter applicant test:node",
        "version:major:common": "tsx scripts/version.ts major common",
        "version:major:issuer": "tsx scripts/version.ts major issuer",
        "version:major:server": "tsx scripts/version.ts major server",
        "version:minor:common": "tsx scripts/version.ts minor common",
        "version:minor:issuer": "tsx scripts/version.ts minor issuer",
        "version:minor:server": "tsx scripts/version.ts minor server",
        "version:patch:common": "tsx scripts/version.ts patch common",
        "version:patch:issuer": "tsx scripts/version.ts patch issuer",
        "version:patch:server": "tsx scripts/version.ts patch server",
        "version:major:applicant": "tsx scripts/version.ts major applicant",
        "version:minor:applicant": "tsx scripts/version.ts minor applicant",
        "version:patch:applicant": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/4319f3949a3a4f62da0088e089ffeca3/dcx-protocol-root-3.0.0.tgz",
      "_integrity": "sha512-+wOOJz16/cAwHB/TVlGrxfCcdrlEhiWdDmG0Ce6rd2ZRXUiEM8Qcry55bkV/Ia9bhoh3XI8464hQrGBiirWfVw==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer"
      ],
      "_npmVersion": "10.5.0",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_3.0.0_1723832950314_0.9126874417020527",
        "host": "s3://npm-registry-packages"
      }
    },
    "3.0.2": {
      "name": "@dcx-protocol/root",
      "version": "3.0.2",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@3.0.2",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "ccb4c93249f15308b24980fbc51898dbbe2bd310",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-3.0.2.tgz",
        "fileCount": 155,
        "integrity": "sha512-/Nr9T1jMDMl+u6o5hwBX5gYRyd6vRn5H5In78c/OTyFCfWlmk4nTicCToDAqmm5ImmSt0uVP+2tqXkkvUv5x2w==",
        "signatures": [
          {
            "sig": "MEUCIB8Jzix3vItWKWsgy7t9umOmXTt+U52Hhxhp3/e85CBrAiEA0EjEWuzmiSV+egkYxJ1b2SnZac3icvkZs8lUT2Oc91w=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 10536190
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-3.0.2.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive lint",
        "test": "pnpm --recursive test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm build:tests:node",
        "test:node": "pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "build:common": "pnpm --filter common build",
        "build:issuer": "pnpm --filter issuer build",
        "build:server": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "publish:common": "pnpm --filter common publish",
        "publish:issuer": "pnpm --filter issuer publish",
        "publish:server": "pnpm --filter server publish",
        "build:applicant": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive build:tests:node",
        "test:node:common": "pnpm --filter common test:node",
        "test:node:issuer": "pnpm --filter issuer test:node",
        "test:node:server": "pnpm --filter server test:node",
        "publish:applicant": "pnpm --filter applicant publish",
        "test:node:applicant": "pnpm --filter applicant test:node",
        "version:major:common": "tsx scripts/version.ts major common",
        "version:major:issuer": "tsx scripts/version.ts major issuer",
        "version:major:server": "tsx scripts/version.ts major server",
        "version:minor:common": "tsx scripts/version.ts minor common",
        "version:minor:issuer": "tsx scripts/version.ts minor issuer",
        "version:minor:server": "tsx scripts/version.ts minor server",
        "version:patch:common": "tsx scripts/version.ts patch common",
        "version:patch:issuer": "tsx scripts/version.ts patch issuer",
        "version:patch:server": "tsx scripts/version.ts patch server",
        "version:major:applicant": "tsx scripts/version.ts major applicant",
        "version:minor:applicant": "tsx scripts/version.ts minor applicant",
        "version:patch:applicant": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/dfacaa8b20793ddd80f69ccbdcb65d46/dcx-protocol-root-3.0.2.tgz",
      "_integrity": "sha512-/Nr9T1jMDMl+u6o5hwBX5gYRyd6vRn5H5In78c/OTyFCfWlmk4nTicCToDAqmm5ImmSt0uVP+2tqXkkvUv5x2w==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer"
      ],
      "_npmVersion": "10.5.0",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_3.0.2_1723840814282_0.5109264498964377",
        "host": "s3://npm-registry-packages"
      }
    },
    "4.0.0": {
      "name": "@dcx-protocol/root",
      "version": "4.0.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@4.0.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "4b0240e0f04252fcb785986ae9de022e7c8ac6e7",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-4.0.0.tgz",
        "fileCount": 152,
        "integrity": "sha512-7u36XNI66kCS1miQepMDnfHwQSqmv4l3kBLfWZ6cQrXdQJLDhBi3lbeJhOyCXADZJZ7xjYd+ya6cNzuXNK1K8w==",
        "signatures": [
          {
            "sig": "MEYCIQDMttYB5nuEN/y9AbH395NLs4egvTSNMdGzsyURQpHWkAIhAJKsDnJR3/dx5TGxKdJrKcacKJRDld6pG5qXB4swhHDk",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1203998
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-4.0.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "common:build": "pnpm --filter common build",
        "issuer:build": "pnpm --filter issuer build",
        "server:build": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "common:publish": "pnpm --filter common publish",
        "issuer:publish": "pnpm --filter issuer publish",
        "server:publish": "pnpm --filter server publish",
        "applicant:build": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive --stream build:tests:node",
        "common:test:node": "pnpm --filter common test:node",
        "issuer:test:node": "pnpm --filter issuer test:node",
        "server:test:node": "pnpm --filter server test:node",
        "applicant:publish": "pnpm --filter applicant publish",
        "applicant:test:node": "pnpm --filter applicant test:node",
        "common:version:major": "tsx scripts/version.ts major common",
        "common:version:minor": "tsx scripts/version.ts minor common",
        "common:version:patch": "tsx scripts/version.ts patch common",
        "issuer:version:major": "tsx scripts/version.ts major issuer",
        "issuer:version:minor": "tsx scripts/version.ts minor issuer",
        "issuer:version:patch": "tsx scripts/version.ts patch issuer",
        "server:version:major": "tsx scripts/version.ts major server",
        "server:version:minor": "tsx scripts/version.ts minor server",
        "server:version:patch": "tsx scripts/version.ts patch server",
        "applicant:version:major": "tsx scripts/version.ts major applicant",
        "applicant:version:minor": "tsx scripts/version.ts minor applicant",
        "applicant:version:patch": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/6edf088bad39fad48f2f562cdd43a8e9/dcx-protocol-root-4.0.0.tgz",
      "_integrity": "sha512-7u36XNI66kCS1miQepMDnfHwQSqmv4l3kBLfWZ6cQrXdQJLDhBi3lbeJhOyCXADZJZ7xjYd+ya6cNzuXNK1K8w==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer",
        "packages/server"
      ],
      "_npmVersion": "10.5.0",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_4.0.0_1723857064195_0.6620916292541852",
        "host": "s3://npm-registry-packages"
      }
    },
    "4.1.0": {
      "name": "@dcx-protocol/root",
      "version": "4.1.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@4.1.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "c2df2e460e12ebdc6b23ced76cb106193f81373f",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-4.1.0.tgz",
        "fileCount": 168,
        "integrity": "sha512-C8aSuX8L8lmEEb14BWZ9gZZb4Slup9eOLRGcsfTkmyP9Mchd21jQ4PI8G8D5o2dteOspAyu0xmaV87P3pBTWPw==",
        "signatures": [
          {
            "sig": "MEQCIEjAZEx1V8NYTu3tiaIW+wZ/XnetrxAoOQM9PZAi+Nf1AiAtF859M061TXuSaAbY4MuH/aLLEMiaVHy6IpUxipWs0w==",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 37304589
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-4.1.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm lint && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "common:build": "pnpm --filter common build",
        "issuer:build": "pnpm --filter issuer build",
        "server:build": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "common:publish": "pnpm --filter common publish",
        "issuer:publish": "pnpm --filter issuer publish",
        "server:publish": "pnpm --filter server publish",
        "applicant:build": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive --stream build:tests:node",
        "common:test:node": "pnpm --filter common test:node",
        "issuer:test:node": "pnpm --filter issuer test:node",
        "server:test:node": "pnpm --filter server test:node",
        "applicant:publish": "pnpm --filter applicant publish",
        "applicant:test:node": "pnpm --filter applicant test:node",
        "common:version:major": "tsx scripts/version.ts major common",
        "common:version:minor": "tsx scripts/version.ts minor common",
        "common:version:patch": "tsx scripts/version.ts patch common",
        "issuer:version:major": "tsx scripts/version.ts major issuer",
        "issuer:version:minor": "tsx scripts/version.ts minor issuer",
        "issuer:version:patch": "tsx scripts/version.ts patch issuer",
        "server:version:major": "tsx scripts/version.ts major server",
        "server:version:minor": "tsx scripts/version.ts minor server",
        "server:version:patch": "tsx scripts/version.ts patch server",
        "applicant:version:major": "tsx scripts/version.ts major applicant",
        "applicant:version:minor": "tsx scripts/version.ts minor applicant",
        "applicant:version:patch": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/cee51912b0c5a0db06eed7c7d458eed7/dcx-protocol-root-4.1.0.tgz",
      "_integrity": "sha512-C8aSuX8L8lmEEb14BWZ9gZZb4Slup9eOLRGcsfTkmyP9Mchd21jQ4PI8G8D5o2dteOspAyu0xmaV87P3pBTWPw==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer",
        "packages/server"
      ],
      "_npmVersion": "10.5.0",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_4.1.0_1723858973152_0.7738866216245202",
        "host": "s3://npm-registry-packages"
      }
    },
    "5.0.0": {
      "name": "@dcx-protocol/root",
      "version": "5.0.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@5.0.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "07eb323e4a7560fa9cfb1ca17f3b9a798324c36b",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-5.0.0.tgz",
        "fileCount": 158,
        "integrity": "sha512-hOlkzMgT54ZlHts9KPsDU/vzbYKZ45rn9isFuTOZu41Pdj22BW/SVbciZ/Jw9IvUCi3QcvaYXMMOXJ8nT3U4kQ==",
        "signatures": [
          {
            "sig": "MEYCIQDhOfkQIPmuB7P6xZleR3jmAvntaD/uzujlc5u4Y9NqLQIhAKYNBBAgzOSHwPOkuvbuYMa/Vceikgljsf6Y8Pcyf3xS",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1214261
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-5.0.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm lint && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "build-test": "pnpm --recursive --stream build && pnpm --recursive --stream build:tests:node && pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "common:build": "pnpm --filter common build",
        "issuer:build": "pnpm --filter issuer build",
        "server:build": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "common:publish": "pnpm --filter common publish",
        "issuer:publish": "pnpm --filter issuer publish",
        "server:publish": "pnpm --filter server publish",
        "applicant:build": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive --stream build:tests:node",
        "common:test:node": "pnpm --filter common test:node",
        "issuer:test:node": "pnpm --filter issuer test:node",
        "server:test:node": "pnpm --filter server test:node",
        "applicant:publish": "pnpm --filter applicant publish",
        "applicant:test:node": "pnpm --filter applicant test:node",
        "common:version:major": "tsx scripts/version.ts major common",
        "common:version:minor": "tsx scripts/version.ts minor common",
        "common:version:patch": "tsx scripts/version.ts patch common",
        "issuer:version:major": "tsx scripts/version.ts major issuer",
        "issuer:version:minor": "tsx scripts/version.ts minor issuer",
        "issuer:version:patch": "tsx scripts/version.ts patch issuer",
        "server:version:major": "tsx scripts/version.ts major server",
        "server:version:minor": "tsx scripts/version.ts minor server",
        "server:version:patch": "tsx scripts/version.ts patch server",
        "applicant:version:major": "tsx scripts/version.ts major applicant",
        "applicant:version:minor": "tsx scripts/version.ts minor applicant",
        "applicant:version:patch": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/3a1e8125ca01b97f10f652e0f26e5fc1/dcx-protocol-root-5.0.0.tgz",
      "_integrity": "sha512-hOlkzMgT54ZlHts9KPsDU/vzbYKZ45rn9isFuTOZu41Pdj22BW/SVbciZ/Jw9IvUCi3QcvaYXMMOXJ8nT3U4kQ==",
      "deprecated": "this package has been deprecated",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer",
        "packages/server"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "20.16.0",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_5.0.0_1724203880177_0.23216329175104589",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.6.0": {
      "name": "@dcx-protocol/root",
      "version": "0.6.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@0.6.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "e779edd96872b663f49cdb1967d307d692e9c09d",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-0.6.0.tgz",
        "fileCount": 160,
        "integrity": "sha512-gHQEtP+MJWed2PPQm8QO9skWqvPzRMaScy8iKbJwU9pK1LAr38rIoVVHMs7DmF5yhTUy8K/K7dKmXNNxcecYDA==",
        "signatures": [
          {
            "sig": "MEUCIFlebFLm91VNHHLXcPsx//f10DFRTKnTFExH3umgz484AiEA8TKyq2U3YZ/XqjwZd9V6mCbOvsmScyFAa5mu7wiE/a4=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 10630058
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-0.6.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm install --frozen-lockfile && pnpm lint && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "build-test": "pnpm --recursive --stream build && pnpm --recursive --stream build:tests:node && pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "common:build": "pnpm --filter common build",
        "issuer:build": "pnpm --filter issuer build",
        "server:build": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "common:publish": "pnpm --filter common publish",
        "issuer:publish": "pnpm --filter issuer publish",
        "server:publish": "pnpm --filter server publish",
        "applicant:build": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive --stream build:tests:node",
        "common:test:node": "pnpm --filter common test:node",
        "issuer:test:node": "pnpm --filter issuer test:node",
        "server:test:node": "pnpm --filter server test:node",
        "applicant:publish": "pnpm --filter applicant publish",
        "applicant:test:node": "pnpm --filter applicant test:node",
        "common:version:major": "tsx scripts/version.ts major common",
        "common:version:minor": "tsx scripts/version.ts minor common",
        "common:version:patch": "tsx scripts/version.ts patch common",
        "issuer:version:major": "tsx scripts/version.ts major issuer",
        "issuer:version:minor": "tsx scripts/version.ts minor issuer",
        "issuer:version:patch": "tsx scripts/version.ts patch issuer",
        "server:version:major": "tsx scripts/version.ts major server",
        "server:version:minor": "tsx scripts/version.ts minor server",
        "server:version:patch": "tsx scripts/version.ts patch server",
        "applicant:version:major": "tsx scripts/version.ts major applicant",
        "applicant:version:minor": "tsx scripts/version.ts minor applicant",
        "applicant:version:patch": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/d3ffe42d9534bf29b2d5d58021611a68/dcx-protocol-root-0.6.0.tgz",
      "_integrity": "sha512-gHQEtP+MJWed2PPQm8QO9skWqvPzRMaScy8iKbJwU9pK1LAr38rIoVVHMs7DmF5yhTUy8K/K7dKmXNNxcecYDA==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer",
        "packages/server"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "20.16.0",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_0.6.0_1724215512870_0.1748039982792593",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.7.0": {
      "name": "@dcx-protocol/root",
      "version": "0.7.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@0.7.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "353d029d5ec44b274ea39c6b374e8558482ecbae",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-0.7.0.tgz",
        "fileCount": 174,
        "integrity": "sha512-W0YfMadmNpWOiN8lNtu8ZmsIr8w6HpdGVL2vcW/kBkqJoM70RHQgwri9GEwiX6goiM1HSe/gIXIylUu8YRtYYg==",
        "signatures": [
          {
            "sig": "MEUCIQDNIlsyNe4mFlynbfBSoO0SlYhvxt/6x1hcV4cdANV89gIgcyEO/jx3cUP7icCA03y0S9jWrKg0QyLTKq4omSp6FdI=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 37426289
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-0.7.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm lint && pnpm install --frozen-lockfile && pnpm lint && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "build-test": "pnpm --recursive --stream build && pnpm --recursive --stream build:tests:node && pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "common:build": "pnpm --filter common build",
        "issuer:build": "pnpm --filter issuer build",
        "server:build": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "common:publish": "pnpm --filter common publish",
        "issuer:publish": "pnpm --filter issuer publish",
        "server:publish": "pnpm --filter server publish",
        "applicant:build": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive --stream build:tests:node",
        "common:test:node": "pnpm --filter common test:node",
        "issuer:test:node": "pnpm --filter issuer test:node",
        "server:test:node": "pnpm --filter server test:node",
        "applicant:publish": "pnpm --filter applicant publish",
        "applicant:test:node": "pnpm --filter applicant test:node",
        "common:version:major": "tsx scripts/version.ts major common",
        "common:version:minor": "tsx scripts/version.ts minor common",
        "common:version:patch": "tsx scripts/version.ts patch common",
        "issuer:version:major": "tsx scripts/version.ts major issuer",
        "issuer:version:minor": "tsx scripts/version.ts minor issuer",
        "issuer:version:patch": "tsx scripts/version.ts patch issuer",
        "server:version:major": "tsx scripts/version.ts major server",
        "server:version:minor": "tsx scripts/version.ts minor server",
        "server:version:patch": "tsx scripts/version.ts patch server",
        "applicant:version:major": "tsx scripts/version.ts major applicant",
        "applicant:version:minor": "tsx scripts/version.ts minor applicant",
        "applicant:version:patch": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/9bf6a2d7a44bce6ca84042d6126d4e1c/dcx-protocol-root-0.7.0.tgz",
      "_integrity": "sha512-W0YfMadmNpWOiN8lNtu8ZmsIr8w6HpdGVL2vcW/kBkqJoM70RHQgwri9GEwiX6goiM1HSe/gIXIylUu8YRtYYg==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer",
        "packages/server"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "20.16.0",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_0.7.0_1724345303811_0.8831666304804284",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.8.0": {
      "name": "@dcx-protocol/root",
      "version": "0.8.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@0.8.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "f5808f5877e7c176a233128ba7e7d92608784df0",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-0.8.0.tgz",
        "fileCount": 155,
        "integrity": "sha512-vg3vQs5d3Stj7s2ZBjXmRLl2cX1oDgWW8F9RKw+L5IAK9i7eZ2/oVdqGX+yqL9gghrCgAO8yOiMMDETMf2RzbQ==",
        "signatures": [
          {
            "sig": "MEYCIQCmmwUDQcuZghdBi2c1BYp08lzgOhV528ZDYe3hlmY6fgIhAPUq9DAItJHROsASEwrenI2v7eodfEqJWieYXbTvYnx2",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1219058
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-0.8.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm lint && pnpm install --frozen-lockfile && pnpm lint && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "build-test": "pnpm --recursive --stream build && pnpm --recursive --stream build:tests:node && pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "common:build": "pnpm --filter common build",
        "issuer:build": "pnpm --filter issuer build",
        "server:build": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "common:publish": "pnpm --filter common publish",
        "issuer:publish": "pnpm --filter issuer publish",
        "server:publish": "pnpm --filter server publish",
        "applicant:build": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive --stream build:tests:node",
        "common:test:node": "pnpm --filter common test:node",
        "issuer:test:node": "pnpm --filter issuer test:node",
        "server:test:node": "pnpm --filter server test:node",
        "applicant:publish": "pnpm --filter applicant publish",
        "applicant:test:node": "pnpm --filter applicant test:node",
        "common:version:major": "tsx scripts/version.ts major common",
        "common:version:minor": "tsx scripts/version.ts minor common",
        "common:version:patch": "tsx scripts/version.ts patch common",
        "issuer:version:major": "tsx scripts/version.ts major issuer",
        "issuer:version:minor": "tsx scripts/version.ts minor issuer",
        "issuer:version:patch": "tsx scripts/version.ts patch issuer",
        "server:version:major": "tsx scripts/version.ts major server",
        "server:version:minor": "tsx scripts/version.ts minor server",
        "server:version:patch": "tsx scripts/version.ts patch server",
        "applicant:version:major": "tsx scripts/version.ts major applicant",
        "applicant:version:minor": "tsx scripts/version.ts minor applicant",
        "applicant:version:patch": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/067daea1ab03ab4d9afcaed56d4d9d02/dcx-protocol-root-0.8.0.tgz",
      "_integrity": "sha512-vg3vQs5d3Stj7s2ZBjXmRLl2cX1oDgWW8F9RKw+L5IAK9i7eZ2/oVdqGX+yqL9gghrCgAO8yOiMMDETMf2RzbQ==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer",
        "packages/server"
      ],
      "_npmVersion": "10.8.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "20.16.0",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_0.8.0_1724384822223_0.713558597747598",
        "host": "s3://npm-registry-packages"
      }
    },
    "1.1.0": {
      "name": "@dcx-protocol/root",
      "version": "1.1.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@1.1.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "80386d21e5ac558fb7fe2516c26c6d9ec9453a5a",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-1.1.0.tgz",
        "fileCount": 174,
        "integrity": "sha512-t9g4jRbkIeUy4gbZUC0CFTKRtKHAlslxNgGXAUJOe1iecCLWx9v8DwrxyISmW9guAIpSaMmU/6J6E336/ro2fQ==",
        "signatures": [
          {
            "sig": "MEQCIF7RQuPiVXShr56jrrm6B5z4Dw/tiwptDIsfn2NyskRrAiBCKGz83Qfcnmm8MESvCBE+5IYSX8a0808HxQlHvaJKVA==",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 37498275
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-1.1.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm lint && pnpm install --frozen-lockfile && pnpm lint && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "build-test": "pnpm --recursive --stream build && pnpm --recursive --stream build:tests:node && pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "common:build": "pnpm --filter common build",
        "issuer:build": "pnpm --filter issuer build",
        "server:build": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "common:publish": "pnpm --filter common publish",
        "issuer:publish": "pnpm --filter issuer publish",
        "server:publish": "pnpm --filter server publish",
        "applicant:build": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive --stream build:tests:node",
        "common:test:node": "pnpm --filter common test:node",
        "issuer:test:node": "pnpm --filter issuer test:node",
        "server:test:node": "pnpm --filter server test:node",
        "applicant:publish": "pnpm --filter applicant publish",
        "applicant:test:node": "pnpm --filter applicant test:node",
        "common:version:major": "tsx scripts/version.ts major common",
        "common:version:minor": "tsx scripts/version.ts minor common",
        "common:version:patch": "tsx scripts/version.ts patch common",
        "issuer:version:major": "tsx scripts/version.ts major issuer",
        "issuer:version:minor": "tsx scripts/version.ts minor issuer",
        "issuer:version:patch": "tsx scripts/version.ts patch issuer",
        "server:version:major": "tsx scripts/version.ts major server",
        "server:version:minor": "tsx scripts/version.ts minor server",
        "server:version:patch": "tsx scripts/version.ts patch server",
        "applicant:version:major": "tsx scripts/version.ts major applicant",
        "applicant:version:minor": "tsx scripts/version.ts minor applicant",
        "applicant:version:patch": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/43faa1f00eaeb7e67880f0a89b7d7ba1/dcx-protocol-root-1.1.0.tgz",
      "_integrity": "sha512-t9g4jRbkIeUy4gbZUC0CFTKRtKHAlslxNgGXAUJOe1iecCLWx9v8DwrxyISmW9guAIpSaMmU/6J6E336/ro2fQ==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer",
        "packages/server"
      ],
      "_npmVersion": "10.5.0",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_1.1.0_1724452655069_0.8983717587925799",
        "host": "s3://npm-registry-packages"
      }
    },
    "1.2.0": {
      "name": "@dcx-protocol/root",
      "version": "1.2.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@1.2.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "fb862ca0880a8a03f318c28e22dcb2ca96555210",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-1.2.0.tgz",
        "fileCount": 174,
        "integrity": "sha512-KZKgo9FX+0lGm7wDkxT55iTV2extF1K46tramEzrUIEsSOFJi7iVtMbmFDkGpGzjY4Jhh0tydRQCs7PrpGbaPg==",
        "signatures": [
          {
            "sig": "MEQCIBBuxjQLcm03z5T+RDlL/MuaA93EZkwRiU2uj39A1RO8AiAUkmeGykgXv26hNaoHzM5s8hx9smGDb/zG2zY3ajdgoQ==",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 37498275
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-1.2.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm lint && pnpm install --frozen-lockfile && pnpm lint && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "build-test": "pnpm --recursive --stream build && pnpm --recursive --stream build:tests:node && pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "common:build": "pnpm --filter common build",
        "issuer:build": "pnpm --filter issuer build",
        "server:build": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "common:publish": "pnpm --filter common publish",
        "issuer:publish": "pnpm --filter issuer publish",
        "server:publish": "pnpm --filter server publish",
        "applicant:build": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive --stream build:tests:node",
        "common:test:node": "pnpm --filter common test:node",
        "issuer:test:node": "pnpm --filter issuer test:node",
        "server:test:node": "pnpm --filter server test:node",
        "applicant:publish": "pnpm --filter applicant publish",
        "applicant:test:node": "pnpm --filter applicant test:node",
        "common:version:major": "tsx scripts/version.ts major common",
        "common:version:minor": "tsx scripts/version.ts minor common",
        "common:version:patch": "tsx scripts/version.ts patch common",
        "issuer:version:major": "tsx scripts/version.ts major issuer",
        "issuer:version:minor": "tsx scripts/version.ts minor issuer",
        "issuer:version:patch": "tsx scripts/version.ts patch issuer",
        "server:version:major": "tsx scripts/version.ts major server",
        "server:version:minor": "tsx scripts/version.ts minor server",
        "server:version:patch": "tsx scripts/version.ts patch server",
        "applicant:version:major": "tsx scripts/version.ts major applicant",
        "applicant:version:minor": "tsx scripts/version.ts minor applicant",
        "applicant:version:patch": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/5213a3362d42a1ec524139450e22f532/dcx-protocol-root-1.2.0.tgz",
      "_integrity": "sha512-KZKgo9FX+0lGm7wDkxT55iTV2extF1K46tramEzrUIEsSOFJi7iVtMbmFDkGpGzjY4Jhh0tydRQCs7PrpGbaPg==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer",
        "packages/server"
      ],
      "_npmVersion": "10.5.0",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_1.2.0_1724452959569_0.5463315990462092",
        "host": "s3://npm-registry-packages"
      }
    },
    "3.1.1": {
      "name": "@dcx-protocol/root",
      "version": "3.1.1",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@3.1.1",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "53f9f6d7a7dfe3fb404ef6eb6111dc58c45e76e9",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-3.1.1.tgz",
        "fileCount": 175,
        "integrity": "sha512-pf35uwnntCinLVS35/kz7gP5eqLfNYfl1QflKAFMAuYaew9KbxyupljpskQhCI3fQ7eI+xU7V3JhpWa21v1VrA==",
        "signatures": [
          {
            "sig": "MEYCIQDoupmJoGjy5mRPneYbEkcTr+rmswfKo0P2kAy7STmtMQIhAP4FlMCUArkp06KYNaGc7BwXpQqclGhXZytSWlAvVAGs",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 37518076
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-3.1.1.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm lint && pnpm install --frozen-lockfile && pnpm lint && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "build-test": "pnpm --recursive --stream build && pnpm --recursive --stream build:tests:node && pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "common:build": "pnpm --filter common build",
        "issuer:build": "pnpm --filter issuer build",
        "server:build": "pnpm --filter server build",
        "version:major": "tsx scripts/version.ts major",
        "version:minor": "tsx scripts/version.ts minor",
        "version:patch": "tsx scripts/version.ts patch",
        "common:publish": "pnpm --filter common publish",
        "issuer:publish": "pnpm --filter issuer publish",
        "server:publish": "pnpm --filter server publish",
        "applicant:build": "pnpm --filter applicant build",
        "build:tests:node": "pnpm --recursive --stream build:tests:node",
        "common:test:node": "pnpm --filter common test:node",
        "issuer:test:node": "pnpm --filter issuer test:node",
        "server:test:node": "pnpm --filter server test:node",
        "applicant:publish": "pnpm --filter applicant publish",
        "applicant:test:node": "pnpm --filter applicant test:node",
        "common:version:major": "tsx scripts/version.ts major common",
        "common:version:minor": "tsx scripts/version.ts minor common",
        "common:version:patch": "tsx scripts/version.ts patch common",
        "issuer:version:major": "tsx scripts/version.ts major issuer",
        "issuer:version:minor": "tsx scripts/version.ts minor issuer",
        "issuer:version:patch": "tsx scripts/version.ts patch issuer",
        "server:version:major": "tsx scripts/version.ts major server",
        "server:version:minor": "tsx scripts/version.ts minor server",
        "server:version:patch": "tsx scripts/version.ts patch server",
        "applicant:version:major": "tsx scripts/version.ts major applicant",
        "applicant:version:minor": "tsx scripts/version.ts minor applicant",
        "applicant:version:patch": "tsx scripts/version.ts patch applicant"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/525f0e5d6eafbb30f9d09c2999879ee8/dcx-protocol-root-3.1.1.tgz",
      "_integrity": "sha512-pf35uwnntCinLVS35/kz7gP5eqLfNYfl1QflKAFMAuYaew9KbxyupljpskQhCI3fQ7eI+xU7V3JhpWa21v1VrA==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer",
        "packages/server"
      ],
      "_npmVersion": "10.8.2",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "_nodeVersion": "20.17.0",
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.8.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.4.3",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_3.1.1_1724803360629_0.8461230433285496",
        "host": "s3://npm-registry-packages"
      }
    },
    "5.0.1": {
      "name": "@dcx-protocol/root",
      "version": "5.0.1",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@5.0.1",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "5d10dec6f6ce565c0c036a85a8609f97a17fafe9",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-5.0.1.tgz",
        "fileCount": 174,
        "integrity": "sha512-tm6I+wjFAET6ldyeICJoThAzOGpzqYPZxFTZdzTa9gVDXdAcBfagetM3HlDTfmKSRnS5VmLuM9F84gR/ATZg9w==",
        "signatures": [
          {
            "sig": "MEUCIGjKZG/tV4Nd+lbpZ/LkOuSrXAmjyec6tOH6F7VWDbJkAiEA4T0YINM41jiHfCux/RbLg/Jw3FVuuybvCr563MZkqqg=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 35464315
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-5.0.1.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "_server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm lint && pnpm install -r && pnpm lint && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "build-test": "pnpm --recursive --stream build && pnpm --recursive --stream build:tests:node && pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "build:tests:node": "pnpm --recursive --stream build:tests:node"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/88bafd3acb511e2479adfcbbe1ff50d1/dcx-protocol-root-5.0.1.tgz",
      "_integrity": "sha512-tm6I+wjFAET6ldyeICJoThAzOGpzqYPZxFTZdzTa9gVDXdAcBfagetM3HlDTfmKSRnS5VmLuM9F84gR/ATZg9w==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/applicant",
        "packages/common",
        "packages/issuer",
        "packages/server"
      ],
      "_npmVersion": "10.5.0",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "resolutions": {
        "@web5/dids": "^1.1.4",
        "@web5/agent": "^0.6.1",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.4",
        "@web5/user-agent": "^0.5.1",
        "@tbd54566975/dwn-sdk-js": "^0.4.6"
      },
      "_nodeVersion": "21.7.3",
      "dependencies": {
        "typescript": "^5.5.4"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.9.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.5.0",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.18.0"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_5.0.1_1724971099336_0.38439164514059954",
        "host": "s3://npm-registry-packages"
      }
    },
    "7.0.0": {
      "name": "@dcx-protocol/root",
      "version": "7.0.0",
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "license": "Apache-2.0",
      "_id": "@dcx-protocol/root@7.0.0",
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "contributors": [
        {
          "url": "https://github.com/bnonni",
          "name": "Bryan Nonni"
        },
        {
          "url": "https://github.com/ianpatton",
          "name": "Ian Patton"
        }
      ],
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "dist": {
        "shasum": "f2ffdda9e751876684ef5b00a6883b9450867171",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-7.0.0.tgz",
        "fileCount": 159,
        "integrity": "sha512-W8kCysXyTb2Dd7e3f5C1lqD1V7qqcw5mjnyy6G53aH5KQLvT9EFRmhIY69NtAu6pOeWzP8RNU1fopFLvfMdRmw==",
        "signatures": [
          {
            "sig": "MEQCIEiAG7R8ugrN43WjUf4evnlvCl6jRzoXGMixPryb9Db3AiBXen+UkQgCdK/vSZR3ZG3jOFIM/Lm031dnzDwUeEFxcA==",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 1231114
      },
      "type": "module",
      "_from": "file:dcx-protocol-root-7.0.0.tgz",
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "scripts": {
        "lint": "pnpm --recursive --stream lint",
        "test": "pnpm --recursive --stream test",
        "build": "pnpm --recursive --stream build",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "_server": "pnpm --filter server",
        "version": "tsx scripts/version.ts",
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "workflow": "pnpm lint && pnpm install -r && pnpm lint && pnpm build && pnpm build:tests:node",
        "applicant": "pnpm --filter applicant",
        "test:node": "pnpm --recursive --stream test:node",
        "build-test": "pnpm --recursive --stream build && pnpm --recursive --stream build:tests:node && pnpm --recursive --stream test:node",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "build:tests:node": "pnpm --recursive --stream build:tests:node"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/9e68adc5e66ed06e13cb26d54af34bf8/dcx-protocol-root-7.0.0.tgz",
      "_integrity": "sha512-W8kCysXyTb2Dd7e3f5C1lqD1V7qqcw5mjnyy6G53aH5KQLvT9EFRmhIY69NtAu6pOeWzP8RNU1fopFLvfMdRmw==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "workspaces": [
        "packages/*"
      ],
      "_npmVersion": "10.8.2",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "directories": {},
      "resolutions": {
        "@web5/dids": "^1.1.4",
        "@web5/agent": "^0.6.1",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.4",
        "@web5/user-agent": "^0.5.1",
        "@tbd54566975/dwn-sdk-js": "^0.4.6"
      },
      "_nodeVersion": "20.17.0",
      "dependencies": {
        "typescript": "^5.5.4"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "npkill": "^0.12.2",
        "globals": "^15.9.0",
        "audit-ci": "^7.1.0",
        "@changesets/cli": "^2.27.7",
        "eslint-plugin-mocha": "^10.5.0",
        "@npmcli/package-json": "^5.2.0",
        "@changesets/changelog-github": "^0.5.0",
        "@typescript-eslint/eslint-plugin": "^7.18.0"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/root_7.0.0_1725579452561_0.655437807018574",
        "host": "s3://npm-registry-packages"
      }
    },
    "7.0.1": {
      "name": "@dcx-protocol/root",
      "version": "7.0.1",
      "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
      "type": "module",
      "workspaces": [
        "packages/*"
      ],
      "repository": {
        "type": "git",
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git"
      },
      "keywords": [
        "decentralized",
        "decentralized-applications",
        "decentralized-identity",
        "decentralized-web",
        "vcs",
        "verifiable credentials",
        "web5",
        "decentralized credential exchange",
        "dwn",
        "dweb node",
        "dwn protocol"
      ],
      "publishConfig": {
        "access": "public"
      },
      "engines": {
        "node": ">=18.0.0 || <22.0.0"
      },
      "license": "Apache-2.0",
      "contributors": [
        {
          "name": "Bryan Nonni",
          "url": "https://github.com/bnonni"
        },
        {
          "name": "Ian Patton",
          "url": "https://github.com/ianpatton"
        }
      ],
      "devDependencies": {
        "@changesets/changelog-github": "^0.5.0",
        "@changesets/cli": "^2.27.7",
        "@npmcli/package-json": "^5.2.0",
        "@typescript-eslint/eslint-plugin": "^7.18.0",
        "audit-ci": "^7.1.0",
        "eslint-plugin-mocha": "^10.5.0",
        "globals": "^15.9.0",
        "npkill": "^0.12.2"
      },
      "resolutions": {
        "@tbd54566975/dwn-sdk-js": "^0.4.6",
        "@web5/agent": "^0.6.1",
        "@web5/user-agent": "^0.5.1",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.4",
        "@web5/dids": "^1.1.4"
      },
      "dependencies": {
        "typescript": "^5.5.4"
      },
      "scripts": {
        "audit-ci": "audit-ci --config ./audit-ci.json",
        "build": "pnpm --recursive --stream build",
        "build:tests:node": "pnpm --recursive --stream build:tests:node",
        "clean": "pnpm npkill -d $(pwd)/packages -t dist && pnpm npkill -d $(pwd) -t node_modules",
        "coverage": "codecov upload-process -t $CODECOV_TOKEN -r TBD54566975/incubation-dcx",
        "lint": "pnpm --recursive --stream lint",
        "lint:fix": "pnpm --recursive --stream lint:fix",
        "publish:all": "pnpm --filter applicant publish && pnpm --filter common publish && pnpm --filter issuer publish && pnpm --filter server publish",
        "test": "pnpm --recursive --stream test",
        "test:node": "pnpm --recursive --stream test:node",
        "workflow": "pnpm lint && pnpm install -r && pnpm lint && pnpm build && pnpm build:tests:node",
        "build-test": "pnpm --recursive --stream build && pnpm --recursive --stream build:tests:node && pnpm --recursive --stream test:node",
        "version": "tsx scripts/version.ts",
        "applicant": "pnpm --filter applicant",
        "common": "pnpm --filter common",
        "issuer": "pnpm --filter issuer",
        "_server": "pnpm --filter server"
      },
      "_id": "@dcx-protocol/root@7.0.1",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "_integrity": "sha512-2VvCxEI87EpH5USsht1kbEwD9IxY4X5u8giJ8m3/L2AIvZkZ2LyZTTuFWEyMgcLmZLlVxkU6ISa4cpqc/WAFgA==",
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/ad77518833cb4cad0130d1c973d42656/dcx-protocol-root-7.0.1.tgz",
      "_from": "file:dcx-protocol-root-7.0.1.tgz",
      "_nodeVersion": "20.17.0",
      "_npmVersion": "10.8.2",
      "dist": {
        "integrity": "sha512-2VvCxEI87EpH5USsht1kbEwD9IxY4X5u8giJ8m3/L2AIvZkZ2LyZTTuFWEyMgcLmZLlVxkU6ISa4cpqc/WAFgA==",
        "shasum": "78b58c1531a99d8d1b7838284234688301b15b89",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/root/-/root-7.0.1.tgz",
        "fileCount": 176,
        "unpackedSize": 35463839,
        "signatures": [
          {
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA",
            "sig": "MEYCIQCSa1oX22FLjLzcxzzIaCiqj3SqbPcbJTU8ZepPx5gSKQIhAMhT7I/KQI1z3BEMFCfGBa7BSB+7hAvb7BoYqesn9RFo"
          }
        ]
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "directories": {},
      "maintainers": [
        {
          "name": "bnonni",
          "email": "bnonni@formfree.com"
        }
      ],
      "_npmOperationalInternal": {
        "host": "s3://npm-registry-packages",
        "tmp": "tmp/root_7.0.1_1725645924110_0.1736511758817938"
      },
      "_hasShrinkwrap": false
    }
  },
  "time": {
    "created": "2024-07-21T21:34:51.713Z",
    "modified": "2024-09-06T18:05:24.672Z",
    "0.0.6": "2024-07-21T21:34:52.101Z",
    "0.0.7": "2024-07-21T22:06:29.654Z",
    "0.0.8": "2024-07-23T21:10:46.563Z",
    "0.0.9": "2024-08-06T21:53:22.986Z",
    "0.0.10": "2024-08-09T15:49:24.343Z",
    "0.1.0": "2024-08-12T22:28:23.100Z",
    "0.1.1": "2024-08-13T12:07:10.081Z",
    "1.0.0": "2024-08-13T22:14:22.986Z",
    "3.0.0": "2024-08-16T18:29:10.628Z",
    "3.0.2": "2024-08-16T20:40:14.598Z",
    "4.0.0": "2024-08-17T01:11:04.487Z",
    "4.1.0": "2024-08-17T01:42:53.502Z",
    "5.0.0": "2024-08-21T01:31:20.408Z",
    "0.6.0": "2024-08-21T04:45:13.048Z",
    "0.7.0": "2024-08-22T16:48:24.236Z",
    "0.8.0": "2024-08-23T03:47:02.467Z",
    "1.1.0": "2024-08-23T22:37:35.387Z",
    "1.2.0": "2024-08-23T22:42:39.876Z",
    "3.1.1": "2024-08-28T00:02:41.028Z",
    "5.0.1": "2024-08-29T22:38:19.695Z",
    "7.0.0": "2024-09-05T23:37:33.040Z",
    "7.0.1": "2024-09-06T18:05:24.441Z"
  },
  "bugs": {
    "url": "https://github.com/TBD54566975/incubation-dcx/issues"
  },
  "license": "Apache-2.0",
  "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
  "keywords": [
    "decentralized",
    "decentralized-applications",
    "decentralized-identity",
    "decentralized-web",
    "vcs",
    "verifiable credentials",
    "web5",
    "decentralized credential exchange",
    "dwn",
    "dweb node",
    "dwn protocol"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/TBD54566975/incubation-dcx.git"
  },
  "description": "DCX: Decentralized Credential Exchange. DWN protocol for verifiable credential exchange.",
  "contributors": [
    {
      "name": "Bryan Nonni",
      "url": "https://github.com/bnonni"
    },
    {
      "name": "Ian Patton",
      "url": "https://github.com/ianpatton"
    }
  ],
  "maintainers": [
    {
      "name": "bnonni",
      "email": "bnonni@formfree.com"
    }
  ],
  "readme": "# Decentralized Credential Exchange (DCX)\n\n[![codecov](https://codecov.io/github/TBD54566975/incubation-dcx/branch/main/graph/badge.svg?token=6PYX9498RD)](https://codecov.io/github/TBD54566975/incubation-dcx)\n\nDCX is a new Decentralized Web Node (DWN) protocol that securely and privately facilitates the decentralized exchange of a user's verifiable credentials for different verifiable credential. The npm package implements each side of the protocol along with a common library and a server.\n\nAs an open, permissionless, \"credentials in, credentials out\" server, DCX as like a asynchronous web server. It leverages Decentralized Identity primitives via TBD's Web5 platform. Primitives leveraged by DCX include DIDs, VCs, DWNs and Presentation Exchange, which includes Credential Manifests, Credential Applications, Credential Responses and Verifiable Presentations (VPs). The concept is to facilitate a decentralized exchange of credentials via DWN records. DCX actors (applicants and issuers) perform CRUD operations on their own and the counterparty's DWNs to communicate. These records server as a form of request/response model but in a completely asynchronous manner. The DWNs involved are always-online servers that sync to the client on an interval. In this way, a user can submit an application to the issuer's DWN, go offline for hours and come back online to find a response to that application from the issuer in their DWN. DWN protocols outline who can do what to which records. The records involved with DCX include: application, manifest, response and invoice. These record schemas represent the structure of the messages sent between the actors' DWNs. Records include all the details needed to achieve this exchange including information about the applicant, what VCs are required from the applicant as inputs to the issuer, what VCs the issuer will respond with to the applicant and the structure of applications, responses and invoices.\n\nTo learn more about the components of DCX and the underlying primitives its built on, check out [/docs/learn/README.md](/docs/learn/README.md).\n\nTo learn more about the architecture and sequences of the DCX system, check out [/docs/diagrams/README.md](/docs/diagrams/README.md).\n\nTo learn how to use DCX in your own project, check out [/docs/usage/README.md](/docs/usage/README.md).\n\n## Package Versions\n\n|                   package                      |                             npm                           |                               issues                            |                               prs                            |\n| ---------------------------------------------- | :-------------------------------------------------------: | :-------------------------------------------------------------: | :----------------------------------------------------------: |\n| [@dcx-protocol/root](/)                        | [![NPM Package][root-npm-badge]][root-npm-link]           | [![Open Issues][root-issues-badge]][root-issues-link]           | [![Open PRs][root-pulls-badge]][root-pulls-link]             |\n| [@dcx-protocol/applicant](/packages/applicant) | [![NPM Package][applicant-npm-badge]][applicant-npm-link] | [![Open Issues][applicant-issues-badge]][applicant-issues-link] | [![Open PRs][applicant-pulls-badge]][applicant-pulls-link]   |\n| [@dcx-protocol/common](/packages/common)       | [![NPM Package][common-npm-badge]][common-npm-link]       | [![Open Issues][common-issues-badge]][common-issues-link]       | [![Open PRs][common-pulls-badge]][common-pulls-link]         |\n| [@dcx-protocol/issuer](/packages/issuer/)      | [![NPM Package][issuer-npm-badge]][issuer-npm-link]       | [![Open Issues][issuer-issues-badge]][issuer-issues-link]       | [![Open PRs][issuer-pulls-badge]][issuer-pulls-link]         |\n| [@dcx-protocol/server](/packages/server/)      | [![NPM Package][server-npm-badge]][server-npm-link]       | [![Open Issues][server-issues-badge]][server-issues-link]       | [![Open PRs][server-pulls-badge]][server-pulls-link]         |\n\n## Project Resources\n\n| Resource                                   | Description                                                                   |\n| ------------------------------------------ | ----------------------------------------------------------------------------- |\n| [CODEOWNERS](./CODEOWNERS)                 | Outlines the project lead(s)                                                  |\n| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | Expected behavior for project contributors, promoting a welcoming environment |\n| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Developer guide to build, test, run, access CI, chat, discuss, file issues    |\n| [GOVERNANCE.md](./GOVERNANCE.md)           | Project governance                                                            |\n| [LICENSE](./LICENSE)                       | [![Apache License 2.0][apache-license-badge]](apache-license-link)            |\n\n[apache-license-badge]: https://img.shields.io/badge/license-Apache%202.0-blue.svg\n[apache-license-link]: https://opensource.org/licenses/Apache-2.0\n\n[root-npm-badge]: https://img.shields.io/npm/v/@dcx-protocol/root.svg?&color=green&santize=true\n[root-npm-link]: https://www.npmjs.com/package/@dcx-protocol/root\n[root-issues-badge]: https://img.shields.io/github/issues/TBD54566975/incubation-dcx/package:%20root?label=issues\n[root-issues-link]: https://github.com/TBD54566975/incubation-dcx/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+root%22\n[root-pulls-badge]: https://img.shields.io/github/issues-pr/TBD54566975/incubation-dcx/package%3A%20root?label=PRs\n[root-pulls-link]: https://github.com/TBD54566975/incubation-dcx/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+issuer%22\n\n[applicant-npm-badge]: https://img.shields.io/npm/v/@dcx-protocol/applicant.svg?&color=green&santize=true\n[applicant-npm-link]: https://www.npmjs.com/package/@dcx-protocol/applicant\n[applicant-issues-badge]: https://img.shields.io/github/issues/TBD54566975/incubation-dcx/package:%20applicant?label=issues\n[applicant-issues-link]: https://github.com/TBD54566975/incubation-dcx/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+applicant%22\n[applicant-pulls-badge]: https://img.shields.io/github/issues-pr/TBD54566975/incubation-dcx/package%3A%20applicant?label=PRs\n[applicant-pulls-link]: https://github.com/TBD54566975/incubation-dcx/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+issuer%22\n\n[common-npm-badge]: https://img.shields.io/npm/v/@dcx-protocol/common.svg?&color=green&santize=true\n[common-npm-link]: https://www.npmjs.com/package/@dcx-protocol/common\n[common-issues-badge]: https://img.shields.io/github/issues/TBD54566975/incubation-dcx/package:%20common?label=issues\n[common-issues-link]: https://github.com/TBD54566975/incubation-dcx/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+common%22\n[common-pulls-badge]: https://img.shields.io/github/issues-pr/TBD54566975/incubation-dcx/package%3A%20common?label=PRs\n[common-pulls-link]: https://github.com/TBD54566975/incubation-dcx/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+issuer%22\n\n[issuer-npm-badge]: https://img.shields.io/npm/v/@dcx-protocol/issuer.svg?&color=green&santize=true\n[issuer-npm-link]: https://www.npmjs.com/package/@dcx-protocol/issuer\n[issuer-issues-badge]: https://img.shields.io/github/issues/TBD54566975/incubation-dcx/package:%20issuer?label=issues\n[issuer-issues-link]: https://github.com/TBD54566975/incubation-dcx/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+issuer%22\n[issuer-pulls-badge]: https://img.shields.io/github/issues-pr/TBD54566975/incubation-dcx/package%3A%20issuer?label=PRs\n[issuer-pulls-link]: https://github.com/TBD54566975/incubation-dcx/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+issuer%22\n\n[server-npm-badge]: https://img.shields.io/npm/v/@dcx-protocol/server.svg?&color=green&santize=true\n[server-npm-link]: https://www.npmjs.com/package/@dcx-protocol/server\n[server-issues-badge]: https://img.shields.io/github/issues/TBD54566975/incubation-dcx/package:%20server?label=issues\n[server-issues-link]: https://github.com/TBD54566975/incubation-dcx/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+server%22\n[server-pulls-badge]: https://img.shields.io/github/issues-pr/TBD54566975/incubation-dcx/package%3A%20server?label=PRs\n[server-pulls-link]: https://github.com/TBD54566975/incubation-dcx/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+server%22\n",
  "readmeFilename": "README.md"
}