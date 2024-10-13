export default {
  "_id": "@dcx-protocol/issuer",
  "_rev": "22-d520b1f9a0e71a592cb3364b22b6709f",
  "name": "@dcx-protocol/issuer",
  "dist-tags": {
    "latest": "7.0.0"
  },
  "versions": {
    "0.0.11": {
      "name": "@dcx-protocol/issuer",
      "version": "0.0.11",
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
      "_id": "@dcx-protocol/issuer@0.0.11",
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
        "shasum": "9b523c22e46a7726ddf4cace42de9802b14bf169",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-0.0.11.tgz",
        "fileCount": 36,
        "integrity": "sha512-UD1OYYpHa/t44p+zbExX/UAsL8qCM7uodAgK4+cB6pmHP7ewQNRCvSOGiaFfDShAFlS/PUobDYV6zEpN9ddL6g==",
        "signatures": [
          {
            "sig": "MEUCIQD09rVJ7/KbuwGRNOCVIMd0Ntcv/vv0GDGCuNJ4NaaThAIgXB8hkoYMK0kBtIMHHwoeZOT8AtKFtbtKVOHX/eSmKqs=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 247636
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-0.0.11.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.js",
        "test": "pnpm run test:unit && pnpm run test:e2e",
        "build": "pnpm run build:esm && pnpm run build:cjs",
        "clean": "rimraf dist",
        "lint:fix": "eslint . --fix -c ../../eslint.config.js",
        "test:e2e": "echo TODO: Add e2e test && exit 0",
        "workflow": "pnpm install --frozen-lockfile && pnpm run build && pnpm run test",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && tsc -p tsconfig.json",
        "test:unit": "echo TODO: Add unit tests && exit 0"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/aa9a6f4665547485cc4d30cee91d77fa/dcx-protocol-issuer-0.0.11.tgz",
      "_integrity": "sha512-UD1OYYpHa/t44p+zbExX/UAsL8qCM7uodAgK4+cB6pmHP7ewQNRCvSOGiaFfDShAFlS/PUobDYV6zEpN9ddL6g==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "dependencies": {
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@dvcx/common": "npm:@dcx-protocol/common@0.0.9",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "dotenv": "^16.4.5",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "typescript": "^5.5.3",
        "@types/node": "^20.14.11"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_0.0.11_1721597752908_0.7580569304322384",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.0.12": {
      "name": "@dcx-protocol/issuer",
      "version": "0.0.12",
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
      "_id": "@dcx-protocol/issuer@0.0.12",
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
        "shasum": "b4044168e26fa2979761202edd42511313b85ee5",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-0.0.12.tgz",
        "fileCount": 36,
        "integrity": "sha512-6lbetYHJwu0RtqP4dKp0UmBAD/NXbpn/OBkJSRWH6MtJLgi/mfSAkM7u4akCoc7s4CuMIViGpq8ik9KRl4ZhNw==",
        "signatures": [
          {
            "sig": "MEUCIQDQNGPm2Y6k7wx3Oig+aK8vT4+6sLuMvDJ3Z9GtcYFBWAIgOMsy+oM5sNijxMsNbTOquftzTBsOEEK0ZwqQI1ecT7k=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 248694
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-0.0.12.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.js",
        "test": "pnpm run test:unit && pnpm run test:e2e",
        "build": "pnpm run build:esm && pnpm run build:cjs",
        "clean": "rimraf dist",
        "lint:fix": "eslint . --fix -c ../../eslint.config.js",
        "test:e2e": "echo TODO: Add e2e test && exit 0",
        "workflow": "pnpm install --frozen-lockfile && pnpm run build && pnpm run test",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && tsc -p tsconfig.json",
        "test:unit": "echo TODO: Add unit tests && exit 0"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/72a72a9a3a965722e099a66b8fee7c9b/dcx-protocol-issuer-0.0.12.tgz",
      "_integrity": "sha512-6lbetYHJwu0RtqP4dKp0UmBAD/NXbpn/OBkJSRWH6MtJLgi/mfSAkM7u4akCoc7s4CuMIViGpq8ik9KRl4ZhNw==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "dependencies": {
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "0.0.10"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "dotenv": "^16.4.5",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "typescript": "^5.5.3",
        "@types/node": "^20.14.11"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_0.0.12_1721599661041_0.7709280271483805",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.0.13": {
      "name": "@dcx-protocol/issuer",
      "version": "0.0.13",
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
      "_id": "@dcx-protocol/issuer@0.0.13",
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
        "shasum": "bd63b452c00e39d539d86321f2688a391a0e2493",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-0.0.13.tgz",
        "fileCount": 36,
        "integrity": "sha512-nf/4w03SbzMLg/5DUFNzN6zz3JM1xPEsIAniiPd/T2zieR2FNsjIysuNy38kpvnwX17XZDjOL46b0h+S3L6p6Q==",
        "signatures": [
          {
            "sig": "MEYCIQDXlTDWutEotr+9Q8wvx6gAFSzc1h67Ejjx7v0+1z07AQIhAN2kvMomyAJNL0pKrzZ1LJHNE7P4LSnBbY7qyuMZbAq6",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 217140
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-0.0.13.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.js",
        "test": "pnpm run test:unit && pnpm run test:e2e",
        "build": "pnpm run build:esm && pnpm run build:cjs",
        "clean": "rimraf dist",
        "lint:fix": "eslint . --fix -c ../../eslint.config.js",
        "test:e2e": "echo TODO: Add e2e test && exit 0",
        "workflow": "pnpm install --frozen-lockfile && pnpm run build && pnpm run test",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && tsc -p tsconfig.json",
        "test:unit": "echo TODO: Add unit tests && exit 0"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/b77ca3b0c0d54a9df0925f2da369be9c/dcx-protocol-issuer-0.0.13.tgz",
      "_integrity": "sha512-nf/4w03SbzMLg/5DUFNzN6zz3JM1xPEsIAniiPd/T2zieR2FNsjIysuNy38kpvnwX17XZDjOL46b0h+S3L6p6Q==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "dependencies": {
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "0.0.11"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "dotenv": "^16.4.5",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "typescript": "^5.5.3",
        "@types/node": "^20.14.11"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_0.0.13_1721769097427_0.6805574421732177",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.0.14": {
      "name": "@dcx-protocol/issuer",
      "version": "0.0.14",
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
      "_id": "@dcx-protocol/issuer@0.0.14",
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
        "shasum": "e5945bd4136b65bc1c64bfa11c94b921bb14e090",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-0.0.14.tgz",
        "fileCount": 36,
        "integrity": "sha512-Fu1seQSE2PryGiFZaiBakgm/c40oBh0cUfsS3+xNcNzkRHXHupJ5T7rpbGY2hwYZagg+tm765NhMvvnV1nQg3Q==",
        "signatures": [
          {
            "sig": "MEUCIAiG2u4Cb3vW3v4RjARsSN28L5IWJJM41CVEBUU1bX61AiEA/tib/nGYDvaWtEzEi2Wsocg1ll67jAZN4ds4yKFOooA=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 202878
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-0.0.14.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/c407cf9a95d8255eb2dfe83c45967e7d/dcx-protocol-issuer-0.0.14.tgz",
      "_integrity": "sha512-Fu1seQSE2PryGiFZaiBakgm/c40oBh0cUfsS3+xNcNzkRHXHupJ5T7rpbGY2hwYZagg+tm765NhMvvnV1nQg3Q==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "0.0.12"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_0.0.14_1722981191639_0.6513359234036011",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.0.15": {
      "name": "@dcx-protocol/issuer",
      "version": "0.0.15",
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
      "_id": "@dcx-protocol/issuer@0.0.15",
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
        "shasum": "0eba23806f6c00a3ddc1f5b6fc69e9dc811ebad7",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-0.0.15.tgz",
        "fileCount": 36,
        "integrity": "sha512-aTXx1ccd6V1qUMDNUaXU3tJdZfmutoprMCe7sjJtM4Fpu7mXj6BoKChsY8GZfUcHbR22xPpJD1Yk3EfwuMNsIw==",
        "signatures": [
          {
            "sig": "MEMCIEHtYHIT1hRe3jin7Wjl/GIoytt0bDPVLEhPOPSdRTfRAh8tQyVlOxTamKPU5PyE1qMLTAl6iQtBfEEpzLDcUwyx",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 203820
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-0.0.15.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/f398da77b09d2b56b7162c3f7f4f589f/dcx-protocol-issuer-0.0.15.tgz",
      "_integrity": "sha512-aTXx1ccd6V1qUMDNUaXU3tJdZfmutoprMCe7sjJtM4Fpu7mXj6BoKChsY8GZfUcHbR22xPpJD1Yk3EfwuMNsIw==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "0.0.13"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_0.0.15_1723218572569_0.521867212155565",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.1.0": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@0.1.0",
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
        "shasum": "ce9234f68036d9ce56fb1d19e069e7914b5a1752",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-0.1.0.tgz",
        "fileCount": 36,
        "integrity": "sha512-SwCeYvXjQYcah1LMXLscTEKWrPJwXHMON0zerq2PtDAZhxBUfOr+VcczubKrkqzlstpIMTDfB1zAV1t7hkp5QQ==",
        "signatures": [
          {
            "sig": "MEYCIQCBoax6gwwJb0Nyc61UP0awC65RPPw+JTh8g72mBfOd2QIhAMc61pG+6VY4yvYMoMsNykU6rvSuq7tpTqr8JZxGVXUD",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 203722
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-0.1.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/4366102324edea78956ec1b0897c3a2c/dcx-protocol-issuer-0.1.0.tgz",
      "_integrity": "sha512-SwCeYvXjQYcah1LMXLscTEKWrPJwXHMON0zerq2PtDAZhxBUfOr+VcczubKrkqzlstpIMTDfB1zAV1t7hkp5QQ==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "0.1.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_0.1.0_1723500906836_0.09000638114446935",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.2.0": {
      "name": "@dcx-protocol/issuer",
      "version": "0.2.0",
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
      "_id": "@dcx-protocol/issuer@0.2.0",
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
        "shasum": "e32306976d89d23426e114b76a37c26d6960ae37",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-0.2.0.tgz",
        "fileCount": 36,
        "integrity": "sha512-vLG+GvRjrGnVY2uCfKg1oZ6c6TxxN7hRLYdVeyp8xiKw6vgeWB95nl5jUxDycAszdXElkfgbrszLKVx9gFbVmg==",
        "signatures": [
          {
            "sig": "MEQCIFBZ/hI8PaWngwt6vye21/fp6VtLFnsYAMLc4UFTjUzPAiB5OG7IzUQ29DN46Jk664RqQgj2UI0o8OKfomh0HLdBFA==",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 204967
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-0.2.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "version:major": "pnpm version major",
        "version:minor": "pnpm version minor",
        "version:patch": "pnpm version patch",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/22a97f3e54efe3a4be40976400d753fe/dcx-protocol-issuer-0.2.0.tgz",
      "_integrity": "sha512-vLG+GvRjrGnVY2uCfKg1oZ6c6TxxN7hRLYdVeyp8xiKw6vgeWB95nl5jUxDycAszdXElkfgbrszLKVx9gFbVmg==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.6.2",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "0.1.2"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_0.2.0_1723550825987_0.6389548754970027",
        "host": "s3://npm-registry-packages"
      }
    },
    "1.0.0": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@1.0.0",
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
        "shasum": "e70d149219018d19260c3f0490573369530662bc",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-1.0.0.tgz",
        "fileCount": 26,
        "integrity": "sha512-usrSIvx9bBHOmQ1PJ3rpuYdm8KYxXy3oQx0B3lOegHNAEMi6uHq/rlnrsd7ufp0diLC3yEYfkC0X7be4YMN7wg==",
        "signatures": [
          {
            "sig": "MEQCICmp8iDf1covak6Xrvx0gI8NQFEYIHrf3zab/nQmdgJAAiBHO3p01EyZO+eeCbkuouV2lOoC2vKe+e7W+dBplcHB/g==",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 152801
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-1.0.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "version:major": "pnpm version major",
        "version:minor": "pnpm version minor",
        "version:patch": "pnpm version patch",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/82109d075642e38764f2da74b2227ed1/dcx-protocol-issuer-1.0.0.tgz",
      "_integrity": "sha512-usrSIvx9bBHOmQ1PJ3rpuYdm8KYxXy3oQx0B3lOegHNAEMi6uHq/rlnrsd7ufp0diLC3yEYfkC0X7be4YMN7wg==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "20.16.0",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "1.0.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_1.0.0_1723587287821_0.2056434849620805",
        "host": "s3://npm-registry-packages"
      }
    },
    "3.1.0": {
      "name": "@dcx-protocol/issuer",
      "version": "3.1.0",
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
      "_id": "@dcx-protocol/issuer@3.1.0",
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
        "shasum": "5bc2a33e10ec2ec4ac8a367e0624b7b0b8342588",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-3.1.0.tgz",
        "fileCount": 21,
        "integrity": "sha512-S+3hmvrvZalCVghFRd/oDcWnU6suFdKQ12VmIDnrcZFYlt3a2UoK56+M+sw1seljgtkeUBntOFl2vQL2nZbc5A==",
        "signatures": [
          {
            "sig": "MEQCIGWLJBktRqPOAf2mjCkofKIDBfdIQ0sUUK9TuqLtqkhrAiBUGC52zK/3+0YH+x4FcFVgft4SCsdn8H3kJrABqjAYXw==",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 150593
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-3.1.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/53592b31adf366e0592ec023b2121e7f/dcx-protocol-issuer-3.1.0.tgz",
      "_integrity": "sha512-S+3hmvrvZalCVghFRd/oDcWnU6suFdKQ12VmIDnrcZFYlt3a2UoK56+M+sw1seljgtkeUBntOFl2vQL2nZbc5A==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.5.0",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "2.2.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_3.1.0_1723833019919_0.1199413529435911",
        "host": "s3://npm-registry-packages"
      }
    },
    "3.1.1": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@3.1.1",
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
        "shasum": "e53d36c0572cbf886ebd9a33c4ca69a640e534e0",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-3.1.1.tgz",
        "fileCount": 21,
        "integrity": "sha512-R1n2ghcvztnPZGKbZcbd8pvHLtQWSzI0K3ZWM54kAVObZB9XeZlLQPZr0DsmSj5ZD3q6jCeiIrIqRXJbI5jklw==",
        "signatures": [
          {
            "sig": "MEUCIQDzX4ivEJnqwp8oCaJunvAswwWrYKJwmbMCfAdJkURN1gIgamcS7DRBs3sXUForNlKLlqy1qzggTXD/V8Vvosa+fOc=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 150593
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-3.1.1.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/e0e8fa0ee62fbb430ff32c0cae9a6ba7/dcx-protocol-issuer-3.1.1.tgz",
      "_integrity": "sha512-R1n2ghcvztnPZGKbZcbd8pvHLtQWSzI0K3ZWM54kAVObZB9XeZlLQPZr0DsmSj5ZD3q6jCeiIrIqRXJbI5jklw==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.5.0",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "2.2.1"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_3.1.1_1723835386967_0.859242222805916",
        "host": "s3://npm-registry-packages"
      }
    },
    "3.1.2": {
      "name": "@dcx-protocol/issuer",
      "version": "3.1.2",
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
      "_id": "@dcx-protocol/issuer@3.1.2",
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
        "shasum": "336643e99806f3a050cb1e127b42f57e9211b0be",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-3.1.2.tgz",
        "fileCount": 21,
        "integrity": "sha512-9XzJe2xLpouWqSonwP00cWUS5suieT4P/wXOZSFoxnNrj9HXIUR65DuhmU0T2ctZdBGauTGAROJ3eHFl2NLunQ==",
        "signatures": [
          {
            "sig": "MEYCIQDKPHvv/qBmFD2+8O0mBq1ybqjLIPad2/HEsRaKX7FL1QIhAKIgdrNmP3LDBoZZvmmBpfK8EDaVquLP/HzfxnBUMa+2",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 151194
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-3.1.2.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/6a7f42bff382fa8ced06097ab8c03992/dcx-protocol-issuer-3.1.2.tgz",
      "_integrity": "sha512-9XzJe2xLpouWqSonwP00cWUS5suieT4P/wXOZSFoxnNrj9HXIUR65DuhmU0T2ctZdBGauTGAROJ3eHFl2NLunQ==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.5.0",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "2.2.2"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_3.1.2_1723840802907_0.1212862774701966",
        "host": "s3://npm-registry-packages"
      }
    },
    "4.0.0": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@4.0.0",
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
        "shasum": "79fadc1dfa368a324e956c0bba6b6e945c840efb",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-4.0.0.tgz",
        "fileCount": 21,
        "integrity": "sha512-ByCX9tO0W/20IIFMEoOkBlmgN9a+ZHBzg3reQ0x6PDCeVq7mdcy1cKaiXBgTL0LG4O+0i3p0ZFh8NbenyGOmTA==",
        "signatures": [
          {
            "sig": "MEUCIE4FR1YRRNMaR5k5Dp+6rpHjNe9ZvXQaBOPo3YkyQql9AiEAs5XxQqPOsMFYG4pQA0PJ3FL0KGwLp/BBoH0sfXrijIw=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 151100
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-4.0.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/8c68af8d9621269b414daa5f391e614e/dcx-protocol-issuer-4.0.0.tgz",
      "_integrity": "sha512-ByCX9tO0W/20IIFMEoOkBlmgN9a+ZHBzg3reQ0x6PDCeVq7mdcy1cKaiXBgTL0LG4O+0i3p0ZFh8NbenyGOmTA==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.5.0",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "3.0.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_4.0.0_1723857055438_0.6079069752283426",
        "host": "s3://npm-registry-packages"
      }
    },
    "4.1.0": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@4.1.0",
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
        "shasum": "d7aa88eaaca26060dc67b7e7266c9c47a9a37e94",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-4.1.0.tgz",
        "fileCount": 21,
        "integrity": "sha512-bTjpN+w57MW8xq6fbGgLz4Tbg20tE3FhM36Dicz1GNYgYUS+sTwAgFI9kmdPybdLTNpFIGov6qbJ7nkrgh4/PA==",
        "signatures": [
          {
            "sig": "MEUCIQDkQbw7zmmT9M6seKDJUvzsPA64QxQ1FHvxIKH/yFrL/wIgc26WSD3fqanq/hRz73fjz0Hri7YTtvknbePpWwGFqf8=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 152371
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-4.1.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/d240ccc5e1da86080f952b50c15375f3/dcx-protocol-issuer-4.1.0.tgz",
      "_integrity": "sha512-bTjpN+w57MW8xq6fbGgLz4Tbg20tE3FhM36Dicz1GNYgYUS+sTwAgFI9kmdPybdLTNpFIGov6qbJ7nkrgh4/PA==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.5.0",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "3.1.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_4.1.0_1723858961125_0.8604579927940113",
        "host": "s3://npm-registry-packages"
      }
    },
    "5.0.0": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@5.0.0",
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
        "shasum": "2bc65a3b935288b3a94797b3ce4852ec8e33c010",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-5.0.0.tgz",
        "fileCount": 21,
        "integrity": "sha512-b6V4zHPxcb0DOL+5lhfNwR+nQiIiABHXNXd1P/Z0Z4U1nUevDz3UeN+7E1X5Tf9Ki7+kZXHjH9thIBXgqLrqYQ==",
        "signatures": [
          {
            "sig": "MEUCIQCfaxsO/g/LJClcTjkyRkYyjDisjn4Kf2RJ7g8j6pnihAIgEl91JAmMAs7vT509xQTUhiyQOXe7MwlM47mWeFp+OHs=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 146377
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-5.0.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/be18d9a6b785ac2f89905c4bb013face/dcx-protocol-issuer-5.0.0.tgz",
      "_integrity": "sha512-b6V4zHPxcb0DOL+5lhfNwR+nQiIiABHXNXd1P/Z0Z4U1nUevDz3UeN+7E1X5Tf9Ki7+kZXHjH9thIBXgqLrqYQ==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "20.16.0",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "3.2.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_5.0.0_1724203902847_0.8817747328353904",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.6.1": {
      "name": "@dcx-protocol/issuer",
      "version": "0.6.1",
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
      "_id": "@dcx-protocol/issuer@0.6.1",
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
        "shasum": "db41d4cf780d900e40bc00ad149902cc6db6f631",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-0.6.1.tgz",
        "fileCount": 21,
        "integrity": "sha512-91LmOnUpT3tAabnIVthjZv4f4vVCJlZwtOhKBeBVh0WQZOZIOPOIrCAzG/yiKvhNxRajA2LhlZFFYvHjBL5rzQ==",
        "signatures": [
          {
            "sig": "MEQCIGcrOIulyybwTS62WhtIyqWFcTrd82Fj7t1sF0RHPT6TAiBm5h4/yKNDRbKrwfPqgnd9Kj9GmmDTvNe11fgj5B/tDA==",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 146377
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-0.6.1.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/f9d8fa14ba978d6dc1784d82c039fc24/dcx-protocol-issuer-0.6.1.tgz",
      "_integrity": "sha512-91LmOnUpT3tAabnIVthjZv4f4vVCJlZwtOhKBeBVh0WQZOZIOPOIrCAzG/yiKvhNxRajA2LhlZFFYvHjBL5rzQ==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "20.16.0",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "0.4.3"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_0.6.1_1724215538991_0.3812162208159622",
        "host": "s3://npm-registry-packages"
      }
    },
    "0.7.0": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@0.7.0",
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
        "shasum": "0dc2712de63ceaf5429a5dc1db95729c90830144",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-0.7.0.tgz",
        "fileCount": 21,
        "integrity": "sha512-Wv+W8hPqY84kOI+tTm7tU+ddiDZK8MOfjbfayIzo9wf6tj+mKsMiMdc5ZRoU8+jID3twgxlJnsfA5FFNfrubdA==",
        "signatures": [
          {
            "sig": "MEUCIGK7oKSwC8+j3IvkTF7e2pQrPsPMzUVlb77h/5sv82JhAiEAv1Y6HTD7BtAix+VBWRbngoDFB5otzQNFBEN4lHqUZpg=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 145552
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-0.7.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/3864fd821f32d35113d8e89c8652f8e0/dcx-protocol-issuer-0.7.0.tgz",
      "_integrity": "sha512-Wv+W8hPqY84kOI+tTm7tU+ddiDZK8MOfjbfayIzo9wf6tj+mKsMiMdc5ZRoU8+jID3twgxlJnsfA5FFNfrubdA==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.1",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "20.16.0",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "0.4.3"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_0.7.0_1724384783882_0.6771852886298242",
        "host": "s3://npm-registry-packages"
      }
    },
    "1.1.0": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@1.1.0",
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
        "shasum": "8aeefd5150ee1db5abad858c56b8d304e6287bac",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-1.1.0.tgz",
        "fileCount": 21,
        "integrity": "sha512-pPsYMX7kwk2ZEdYwLyZ8h21oMscxvW028MjnOtuC3WVHT+TWCyAZQLAXJEYp81KfkgJEzaA3BKdQGbt1XYJ+Aw==",
        "signatures": [
          {
            "sig": "MEUCIQDhdXLWW1RwS7RU6hJNGc7N7olc+GIVnjgSVtjbPm7kZgIgF3Qi5QRq6TqR5wbIgi71fNfXF2pYSqsESQhCxkfwykc=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 146990
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-1.1.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/f3da033b5ee9c412bddf53533703da2c/dcx-protocol-issuer-1.1.0.tgz",
      "_integrity": "sha512-pPsYMX7kwk2ZEdYwLyZ8h21oMscxvW028MjnOtuC3WVHT+TWCyAZQLAXJEYp81KfkgJEzaA3BKdQGbt1XYJ+Aw==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.5.0",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "1.1.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_1.1.0_1724452732782_0.82039197892034",
        "host": "s3://npm-registry-packages"
      }
    },
    "1.2.0": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@1.2.0",
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
        "shasum": "1db6d51b401ca5194295dbe4e737213f88f14752",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-1.2.0.tgz",
        "fileCount": 21,
        "integrity": "sha512-PRBvstkgtrfm03sRHC+pk+GEYVEdVOwg8cC1+6v851o6iMkpum+UhgqzbQO0ZcR15BvkPKQ1Pt1pdje37pqw1A==",
        "signatures": [
          {
            "sig": "MEYCIQCWHZMJ9PY+ClqHXF6J8S+hXXbTUTlWlnyXLx3RyeUbdgIhALtepWXg2A/re+vErFeFb7ylTfJduKfiIKHL/dMo5DPg",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 146990
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-1.2.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/a91eab053b7da2c98c132234d7877659/dcx-protocol-issuer-1.2.0.tgz",
      "_integrity": "sha512-PRBvstkgtrfm03sRHC+pk+GEYVEdVOwg8cC1+6v851o6iMkpum+UhgqzbQO0ZcR15BvkPKQ1Pt1pdje37pqw1A==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.5.0",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "1.2.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_1.2.0_1724452998415_0.4284108507875841",
        "host": "s3://npm-registry-packages"
      }
    },
    "1.3.0": {
      "name": "@dcx-protocol/issuer",
      "version": "1.3.0",
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
      "_id": "@dcx-protocol/issuer@1.3.0",
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
        "shasum": "d2ab4415a7d573998444ce5f97917a087dd9cbe9",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-1.3.0.tgz",
        "fileCount": 21,
        "integrity": "sha512-phpRL+4BJNtQU1/QcuHDaGTXmOFyZNDMvN3+Wp0ZlfBXqRi4fH/uULnePrOXETmSgvKTwIuIh7r4GCTjxfCWQg==",
        "signatures": [
          {
            "sig": "MEUCIQCghXS7BPvLkiOHak5g6IbN7CVB4HOalmhefpSHhELA3QIgAYCIMBS3060WdePubQrWiXGNeEkaErsyD+e47FKOEgs=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 148028
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-1.3.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/aefa51902e5954dd9f69c951dfbfd893/dcx-protocol-issuer-1.3.0.tgz",
      "_integrity": "sha512-phpRL+4BJNtQU1/QcuHDaGTXmOFyZNDMvN3+Wp0ZlfBXqRi4fH/uULnePrOXETmSgvKTwIuIh7r4GCTjxfCWQg==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.2",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "20.17.0",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "2.0.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_1.3.0_1724707529099_0.7353777434467015",
        "host": "s3://npm-registry-packages"
      }
    },
    "2.0.0": {
      "name": "@dcx-protocol/issuer",
      "version": "2.0.0",
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
      "_id": "@dcx-protocol/issuer@2.0.0",
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
        "shasum": "1a8aa598b69fd924904ddb095f4c6fe0d3d85fa3",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-2.0.0.tgz",
        "fileCount": 26,
        "integrity": "sha512-9gp3WwzJa6kY0X80Zp2k8vdkHHhPVSAV0IkjCX+ItzI5EujVxESScpcbCsLA4gdUQtzv3W0pETxuag+6xdrf9Q==",
        "signatures": [
          {
            "sig": "MEUCIQCMkb0LLra0iuRo81drt/HVQw4iMO/JbvzjS1nfXltOugIgeDUqUUFZtVjGOZY8lwANBFwWaBs6w1v2K7xXjghsAoM=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 150982
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-2.0.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/08ca7f19411f64013f2ffc432dc57933/dcx-protocol-issuer-2.0.0.tgz",
      "_integrity": "sha512-9gp3WwzJa6kY0X80Zp2k8vdkHHhPVSAV0IkjCX+ItzI5EujVxESScpcbCsLA4gdUQtzv3W0pETxuag+6xdrf9Q==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.2",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "20.17.0",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "3.1.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_2.0.0_1724803187255_0.4186729476758262",
        "host": "s3://npm-registry-packages"
      }
    },
    "3.0.0": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@3.0.0",
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
        "shasum": "d5f89b3d8103489089f86fc5a7a2a56c044d849f",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-3.0.0.tgz",
        "fileCount": 26,
        "integrity": "sha512-MZ6Hw5APpm483SOCa2pXn1GjlnFMGOAV2e7lwZ+Jv3jssoIP37n5ADKxVDlfexkWmCmwsgCD6aTWQIASwbD/fQ==",
        "signatures": [
          {
            "sig": "MEYCIQCRLDRhDmy7aOA9WDPggw9ZSK0xWdDAa+s8IDRu/7DdJgIhAORt54CQ1VaI8VWdHAhwH0L6MaOrVsBkFqP53swZhrNb",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 150982
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-3.0.0.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/fbf4dd89ca7628cbd3e0fe7987536c99/dcx-protocol-issuer-3.0.0.tgz",
      "_integrity": "sha512-MZ6Hw5APpm483SOCa2pXn1GjlnFMGOAV2e7lwZ+Jv3jssoIP37n5ADKxVDlfexkWmCmwsgCD6aTWQIASwbD/fQ==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.8.2",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "20.17.0",
      "dependencies": {
        "chalk": "^5.3.0",
        "@web5/api": "^0.10.0",
        "@web5/dids": "^1.1.2",
        "@web5/agent": "0.4.1",
        "@scure/bip39": "^1.3.0",
        "@web5/common": "^1.0.2",
        "@web5/crypto": "^1.0.2",
        "@noble/ciphers": "0.5.3",
        "ed25519-keygen": "^0.6.2",
        "@web5/user-agent": "^0.4.1",
        "@web5/credentials": "^1.0.4",
        "@dcx-protocol/common": "4.0.0"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.6.1",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.0",
        "globals": "^15.8.0",
        "playwright": "^1.45.3",
        "typescript": "^5.5.3",
        "@types/chai": "^4.3.16",
        "@types/node": "^20.14.11",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.0",
        "abstract-level": "^2.0.0",
        "@playwright/test": "^1.45.3",
        "@web/test-runner": "^0.18.2",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.17.0",
        "eslint-plugin-mocha": "^10.4.3",
        "mocha-junit-reporter": "^2.2.1",
        "@types/readable-stream": "^4.0.15",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.16.1",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.16.1"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_3.0.0_1724804291234_0.5709978396955251",
        "host": "s3://npm-registry-packages"
      }
    },
    "5.0.1": {
      "name": "@dcx-protocol/issuer",
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
      "_id": "@dcx-protocol/issuer@5.0.1",
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
        "shasum": "68a5e21a8a671d4c57caaec4db8a60e68503c342",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-5.0.1.tgz",
        "fileCount": 26,
        "integrity": "sha512-Yt9iA+sIuJo/+IZhEybozkHfIIrnw1AOSvGH2AlC9TFxNOJO2Qxxhu3OCtc383M9OOAPeyodUI66dkm9wCveUA==",
        "signatures": [
          {
            "sig": "MEUCIQC0qEn0ADFHrrkpKRnmFQyyyneFNKSpzC9p40y6Jh5+1AIgbQM8vzl8kdrD0miLNkol8g360slcj5QS8BvnTERxmzI=",
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
          }
        ],
        "unpackedSize": 153461
      },
      "main": "./dist/cjs/index.js",
      "type": "module",
      "_from": "file:dcx-protocol-issuer-5.0.1.tgz",
      "types": "./dist/types/index.d.ts",
      "module": "./dist/esm/index.js",
      "engines": {
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
      },
      "scripts": {
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "test": "pnpm test:node",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "clean": "rimraf dist coverage tests/compiled",
        "version": "tsx ../../scripts/version.ts issuer",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
      },
      "_npmUser": {
        "name": "bnonni",
        "email": "bnonni@formfree.com"
      },
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/046812c247f36c38b4887613cd837c38/dcx-protocol-issuer-5.0.1.tgz",
      "_integrity": "sha512-Yt9iA+sIuJo/+IZhEybozkHfIIrnw1AOSvGH2AlC9TFxNOJO2Qxxhu3OCtc383M9OOAPeyodUI66dkm9wCveUA==",
      "repository": {
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
        "type": "git"
      },
      "_npmVersion": "10.5.0",
      "description": "DCX Issuer protocol and server",
      "directories": {},
      "_nodeVersion": "21.7.3",
      "dependencies": {
        "@web5/api": "^0.10.0",
        "@web5/agent": "^0.6.1",
        "@web5/common": "^1.0.2",
        "ed25519-keygen": "^0.6.2",
        "@web5/credentials": "^1.1.1",
        "@dcx-protocol/common": "5.0.1"
      },
      "publishConfig": {
        "access": "public"
      },
      "_hasShrinkwrap": false,
      "devDependencies": {
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "mocha": "^10.7.3",
        "dotenv": "^16.4.5",
        "eslint": "^8.57.0",
        "rimraf": "^6.0.1",
        "esbuild": "^0.23.1",
        "globals": "^15.9.0",
        "playwright": "^1.46.1",
        "typescript": "^5.5.4",
        "@types/chai": "^4.3.19",
        "@types/node": "^20.16.2",
        "@types/mocha": "^10.0.7",
        "@types/eslint": "^9.6.1",
        "@playwright/test": "^1.46.1",
        "@web/test-runner": "^0.18.3",
        "chai-as-promised": "^8.0.0",
        "typescript-eslint": "^7.18.0",
        "eslint-plugin-mocha": "^10.5.0",
        "mocha-junit-reporter": "^2.2.1",
        "@types/chai-as-promised": "^7.1.8",
        "@typescript-eslint/parser": "^7.18.0",
        "@web/test-runner-playwright": "^0.11.0",
        "@typescript-eslint/eslint-plugin": "^7.18.0"
      },
      "_npmOperationalInternal": {
        "tmp": "tmp/issuer_5.0.1_1724971439720_0.2031837803616774",
        "host": "s3://npm-registry-packages"
      }
    },
    "7.0.0": {
      "name": "@dcx-protocol/issuer",
      "version": "7.0.0",
      "description": "DCX Issuer protocol and server",
      "type": "module",
      "main": "./dist/cjs/index.js",
      "module": "./dist/esm/index.js",
      "types": "./dist/types/index.d.ts",
      "homepage": "https://github.com/TBD54566975/incubation-dcx#readme",
      "bugs": {
        "url": "https://github.com/TBD54566975/incubation-dcx/issues"
      },
      "repository": {
        "type": "git",
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git"
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
      "exports": {
        ".": {
          "types": "./dist/types/index.d.ts",
          "import": "./dist/esm/index.js"
        }
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
        "node": "\u003E=18.0.0 || \u003C22.0.0"
      },
      "dependencies": {
        "@web5/agent": "^0.6.1",
        "@web5/api": "^0.10.0",
        "@web5/common": "^1.0.2",
        "@web5/credentials": "^1.1.1",
        "ed25519-keygen": "^0.6.2",
        "@dcx-protocol/common": "7.0.0"
      },
      "devDependencies": {
        "@playwright/test": "^1.46.1",
        "@types/chai": "^4.3.19",
        "@types/chai-as-promised": "^7.1.8",
        "@types/eslint": "^9.6.1",
        "@types/mocha": "^10.0.7",
        "@types/node": "^20.16.2",
        "@typescript-eslint/eslint-plugin": "^7.18.0",
        "@typescript-eslint/parser": "^7.18.0",
        "@web/test-runner": "^0.18.3",
        "@web/test-runner-playwright": "^0.11.0",
        "c8": "^10.1.2",
        "chai": "^5.1.1",
        "chai-as-promised": "^8.0.0",
        "dotenv": "^16.4.5",
        "esbuild": "^0.23.1",
        "eslint": "^8.57.0",
        "eslint-plugin-mocha": "^10.5.0",
        "globals": "^15.9.0",
        "mocha": "^10.7.3",
        "mocha-junit-reporter": "^2.2.1",
        "playwright": "^1.46.1",
        "rimraf": "^6.0.1",
        "typescript": "^5.5.4",
        "typescript-eslint": "^7.18.0"
      },
      "scripts": {
        "clean": "rimraf dist coverage tests/compiled",
        "build": "pnpm clean && pnpm build:esm && pnpm build:cjs",
        "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
        "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
        "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json",
        "test": "pnpm test:node",
        "test:e2e": "tsx tests/e2e/*.spec.ts -t",
        "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
        "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
        "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
        "version": "tsx ../../scripts/version.ts issuer"
      },
      "_id": "@dcx-protocol/issuer@7.0.0",
      "_integrity": "sha512-xmMz74elrLWvKu4lbTCwpJiz1tkeAbonrkwUe742DX1EOBqmB80h1RdFgMKwx8WeajtsrOkHMJiFo88oCzn/wA==",
      "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/7a08ea6676e6176bd2bb9d7444883668/dcx-protocol-issuer-7.0.0.tgz",
      "_from": "file:dcx-protocol-issuer-7.0.0.tgz",
      "_nodeVersion": "20.17.0",
      "_npmVersion": "10.8.2",
      "dist": {
        "integrity": "sha512-xmMz74elrLWvKu4lbTCwpJiz1tkeAbonrkwUe742DX1EOBqmB80h1RdFgMKwx8WeajtsrOkHMJiFo88oCzn/wA==",
        "shasum": "1235f749b6fe00ebffc8275580f5fec0d31a5dcc",
        "tarball": "https://registry.npmjs.org/@dcx-protocol/issuer/-/issuer-7.0.0.tgz",
        "fileCount": 26,
        "unpackedSize": 168021,
        "signatures": [
          {
            "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA",
            "sig": "MEUCIGkvT0MBETkhh0+/U9bWOaFjCSkHo9zLibfwe7fogGNjAiEA63lSwNH0N5RLYe6lYOb11aMPzcaHICIV7m4WM1Sceg4="
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
        "tmp": "tmp/issuer_7.0.0_1725579466671_0.5624037591748334"
      },
      "_hasShrinkwrap": false
    }
  },
  "time": {
    "created": "2024-07-21T21:35:52.745Z",
    "modified": "2024-09-05T23:37:47.091Z",
    "0.0.11": "2024-07-21T21:35:53.081Z",
    "0.0.12": "2024-07-21T22:07:41.290Z",
    "0.0.13": "2024-07-23T21:11:37.677Z",
    "0.0.14": "2024-08-06T21:53:11.853Z",
    "0.0.15": "2024-08-09T15:49:32.735Z",
    "0.1.0": "2024-08-12T22:15:06.999Z",
    "0.2.0": "2024-08-13T12:07:06.182Z",
    "1.0.0": "2024-08-13T22:14:48.009Z",
    "3.1.0": "2024-08-16T18:30:20.155Z",
    "3.1.1": "2024-08-16T19:09:47.178Z",
    "3.1.2": "2024-08-16T20:40:03.119Z",
    "4.0.0": "2024-08-17T01:10:55.692Z",
    "4.1.0": "2024-08-17T01:42:41.340Z",
    "5.0.0": "2024-08-21T01:31:43.067Z",
    "0.6.1": "2024-08-21T04:45:39.136Z",
    "0.7.0": "2024-08-23T03:46:24.056Z",
    "1.1.0": "2024-08-23T22:38:52.977Z",
    "1.2.0": "2024-08-23T22:43:18.585Z",
    "1.3.0": "2024-08-26T21:25:29.299Z",
    "2.0.0": "2024-08-27T23:59:47.490Z",
    "3.0.0": "2024-08-28T00:18:11.468Z",
    "5.0.1": "2024-08-29T22:43:59.913Z",
    "7.0.0": "2024-09-05T23:37:46.871Z"
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
  "description": "DCX Issuer protocol and server",
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
  "readme": "# @dcx-protocol/issuer\n\nIssuer side of the DCX protocol\n- [`/packages/issuer/src/dcx-issuer.ts`](/packages/issuer/src/handlers.ts) core logic for the issuer side of the DCX protocol\n- [`/packages/issuer/src/dcx-issuer-protocol.ts`](/packages/issuer/src/dcx-issuer-protocol.ts) DWN protocol definition used by the DCX issuer\n\n\n## Package Version\n\n|                   package                      |                             npm                           |                               issues                            |                               prs                            |\n| ---------------------------------------------- | :-------------------------------------------------------: | :-------------------------------------------------------------: | :----------------------------------------------------------: |\n| [@dcx-protocol/issuer](/packages/issuer/)      | [![NPM Package][issuer-npm-badge]][issuer-npm-link]       | [![Open Issues][issuer-issues-badge]][issuer-issues-link]       | [![Open PRs][issuer-pulls-badge]][issuer-pulls-link]         |\n\n[issuer-npm-badge]: https://img.shields.io/npm/v/@dcx-protocol/issuer.svg?&color=green&santize=true\n[issuer-npm-link]: https://www.npmjs.com/package/@dcx-protocol/issuer\n[issuer-issues-badge]: https://img.shields.io/github/issues/TBD54566975/incubation-dcx/package:%20issuer?label=issues\n[issuer-issues-link]: https://github.com/TBD54566975/incubation-dcx/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+issuer%22\n[issuer-pulls-badge]: https://img.shields.io/github/issues-pr/TBD54566975/incubation-dcx/package%3A%20issuer?label=PRs\n[issuer-pulls-link]: https://github.com/TBD54566975/incubation-dcx/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+issuer%22",
  "readmeFilename": "README.md"
}