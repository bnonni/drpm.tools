export default {
    "_id": "@dcx-protocol/applicant",
    "_rev": "29-97e09044ac469d20b6d977989f472f79",
    "name": "@dcx-protocol/applicant",
    "dist-tags": {
        "latest": "7.0.0"
    },
    "versions": {
        "0.0.7": {
            "name": "@dcx-protocol/applicant",
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
            "_id": "@dcx-protocol/applicant@0.0.7",
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
                "shasum": "1cd4f61569c45716859e85768689793f59523a99",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-0.0.7.tgz",
                "fileCount": 232,
                "integrity": "sha512-Uzn0wvOc3vIhYDT7ze0md1Oengq1LwpC7Xq6wHud8Tv19xkuYNnvsO9FrUdMj/kG7gteTPWad+WlWvHTasm8fw==",
                "signatures": [
                    {
                        "sig": "MEUCIQCQhk7uzyv+OH2rcxcJN2BEr3XRqc9VbwoT6WnenGRVuwIgIX0avsidcgeLkIdL+Q9kIJ49SnJiL4CZ0nEsmjtzf08=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 1228778
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-0.0.7.tgz",
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
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:unit": "echo TODO: Add unit tests && exit 0"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/474d5e10c451d37baa701e868dded1c6/dcx-protocol-applicant-0.0.7.tgz",
            "_integrity": "sha512-Uzn0wvOc3vIhYDT7ze0md1Oengq1LwpC7Xq6wHud8Tv19xkuYNnvsO9FrUdMj/kG7gteTPWad+WlWvHTasm8fw==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.6.2",
            "dependencies": {
                "ms": "^2.1.3",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@dvcx/common": "npm:@dcx-protocol/common@0.0.9",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
            },
            "publishConfig": {
                "access": "public"
            },
            "_hasShrinkwrap": false,
            "devDependencies": {
                "dotenv": "^16.4.5",
                "rimraf": "^6.0.1",
                "esbuild": "^0.23.0",
                "@types/ms": "^0.7.34",
                "typescript": "^5.5.3",
                "@types/node": "^20.14.11",
                "@types/readable-stream": "^4.0.15"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_0.0.7_1721597732198_0.5214459063970054",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.0.8": {
            "name": "@dcx-protocol/applicant",
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
            "_id": "@dcx-protocol/applicant@0.0.8",
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
                "shasum": "10f52dcd35bcf62112ea04b598bf6eb5e6ebf73b",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-0.0.8.tgz",
                "fileCount": 232,
                "integrity": "sha512-BekdiuVDId/hBw6rBnYCa/5LVT0Z+KHV9l61CrghAjEATLv/HCDyAjO2t0pqfHFhEItL5sT54XuR0zTxJnkAWA==",
                "signatures": [
                    {
                        "sig": "MEYCIQCKTytpgbQi405ahuqXq3XYzz+faLjQtwBi9MQMslIyFwIhAIg9X7rgKYC5crdFJfRKhMySVLmrUba2vGWNzVCH6ha2",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 1228512
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-0.0.8.tgz",
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
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:unit": "echo TODO: Add unit tests && exit 0"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/a7dfb2d0773098aacd2d03e0cdd3d2ca/dcx-protocol-applicant-0.0.8.tgz",
            "_integrity": "sha512-BekdiuVDId/hBw6rBnYCa/5LVT0Z+KHV9l61CrghAjEATLv/HCDyAjO2t0pqfHFhEItL5sT54XuR0zTxJnkAWA==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.6.2",
            "dependencies": {
                "ms": "^2.1.3",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "0.0.10",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
            },
            "publishConfig": {
                "access": "public"
            },
            "_hasShrinkwrap": false,
            "devDependencies": {
                "dotenv": "^16.4.5",
                "rimraf": "^6.0.1",
                "esbuild": "^0.23.0",
                "@types/ms": "^0.7.34",
                "typescript": "^5.5.3",
                "@types/node": "^20.14.11",
                "@types/readable-stream": "^4.0.15"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_0.0.8_1721599645712_0.8360054380940884",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.0.9": {
            "name": "@dcx-protocol/applicant",
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
            "_id": "@dcx-protocol/applicant@0.0.9",
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
                "shasum": "db002e058cd8ce800bd780472c7cf90e6c00e7b8",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-0.0.9.tgz",
                "fileCount": 232,
                "integrity": "sha512-xxdE3EMkwcRzjCtYq0icEPDESZ1LdABmbiat9WSaOnxFy3ou34wiCU/vwvPdcibGKv352r4WHaPTGHvb6Ahryg==",
                "signatures": [
                    {
                        "sig": "MEMCHwQfR8Wtef1Ap0wPXIyc4qVcnVB6TqTlk01KbC83BVUCIHiFD1J/EVyBbXRpcqmunmCRFku2QIIjHTeD84HTtGZj",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 1187427
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-0.0.9.tgz",
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
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:unit": "echo TODO: Add unit tests && exit 0"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/eaf282e15387aac0bf3c3d7ba3dbfa7a/dcx-protocol-applicant-0.0.9.tgz",
            "_integrity": "sha512-xxdE3EMkwcRzjCtYq0icEPDESZ1LdABmbiat9WSaOnxFy3ou34wiCU/vwvPdcibGKv352r4WHaPTGHvb6Ahryg==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.6.2",
            "dependencies": {
                "ms": "^2.1.3",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "0.0.11",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
            },
            "publishConfig": {
                "access": "public"
            },
            "_hasShrinkwrap": false,
            "devDependencies": {
                "dotenv": "^16.4.5",
                "rimraf": "^6.0.1",
                "esbuild": "^0.23.0",
                "@types/ms": "^0.7.34",
                "typescript": "^5.5.3",
                "@types/node": "^20.14.11",
                "@types/readable-stream": "^4.0.15"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_0.0.9_1721769091325_0.4789720275901448",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.0.10": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@0.0.10",
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
                "shasum": "817d9c27623b889c779612150c88819596b2c35b",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-0.0.10.tgz",
                "fileCount": 36,
                "integrity": "sha512-hlnnN8RipgJeKVta/8CrjbIGyJPoB+0oCD3HYgfCqEtf4q4aqUgbZDHviTNFWadnxarfd5wd9jk4fU3gsn1LBQ==",
                "signatures": [
                    {
                        "sig": "MEQCIA+FUeLdR4lAQVxgW45E4jOb1V6VvR5qQt0Il8FJRkgoAiBqHdLUBK7zFOC1tLDJsoHozjqkFGjopB12seaz9mG7Gw==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 126395
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-0.0.10.tgz",
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
                "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm test",
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/804a5298aa33d07e3b6f12344cea7c4c/dcx-protocol-applicant-0.0.10.tgz",
            "_integrity": "sha512-hlnnN8RipgJeKVta/8CrjbIGyJPoB+0oCD3HYgfCqEtf4q4aqUgbZDHviTNFWadnxarfd5wd9jk4fU3gsn1LBQ==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.6.2",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "0.0.12",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_0.0.10_1722981172401_0.27456929551775877",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.0.11": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@0.0.11",
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
                "shasum": "1bb017f2ddc39bb026b67d13b9034e419a656a9e",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-0.0.11.tgz",
                "fileCount": 31,
                "integrity": "sha512-oQs+zaMFn1PqJ31vV4er+kL/0hR4OQ6nPLG07eyLWhUebQ9UfHKTvNr3LVzy3xBq7i4qH1xGPcd5OavDglnmPA==",
                "signatures": [
                    {
                        "sig": "MEUCIQDFmcppjaKo5djlQn548jISKxoutvvGTkG0HOeTquwYuwIgbWXkYTKomtukZDRTHjlmfxtWef9z7fqUKEBAZalKWQQ=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 163999
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-0.0.11.tgz",
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
                "workflow": "pnpm install --frozen-lockfile && pnpm build && pnpm test",
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' \u003E ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/4af967d1e817dfdd1e9d16079228b186/dcx-protocol-applicant-0.0.11.tgz",
            "_integrity": "sha512-oQs+zaMFn1PqJ31vV4er+kL/0hR4OQ6nPLG07eyLWhUebQ9UfHKTvNr3LVzy3xBq7i4qH1xGPcd5OavDglnmPA==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.6.2",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "0.0.13",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_0.0.11_1723218569303_0.5283199142412445",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.1.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@0.1.0",
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
                "shasum": "914c44e3b722d9f932e1dfd1da22e772bc0f2e0f",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-0.1.0.tgz",
                "fileCount": 31,
                "integrity": "sha512-m5Nt5eeHCt3ayPXFuLtiKF8hFgL7SyO9QQnG/GwlYVRGrQbT0VqDm5Mmx/h0LD3lSlvJcYxsbdra8+sYsv9S5g==",
                "signatures": [
                    {
                        "sig": "MEUCIH8l58gWqX2ZQFBOfmN1bLCbLpU3Ct9rMCzyH/oacoiLAiEAihxEmHRxceocGEphiiAqV1MmLvZaeG6uRyx6vl4Kid4=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 163663
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-0.1.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/6bed4aba5e87b9a891ce8f0d315cc949/dcx-protocol-applicant-0.1.0.tgz",
            "_integrity": "sha512-m5Nt5eeHCt3ayPXFuLtiKF8hFgL7SyO9QQnG/GwlYVRGrQbT0VqDm5Mmx/h0LD3lSlvJcYxsbdra8+sYsv9S5g==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.6.2",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "0.1.0",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_0.1.0_1723500899035_0.3555725587868246",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.1.1": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@0.1.1",
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
                "shasum": "70dfa04b5a831539ca98a007bc1f5854274d555c",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-0.1.1.tgz",
                "fileCount": 26,
                "integrity": "sha512-NaWUYFBimYHk980d6mAc9CjlcEpqcV+XFWoiODKhNF0EVZwFZcvdCeDPQpP7VfcF2iz0pkCD45AyymjiIcFV4w==",
                "signatures": [
                    {
                        "sig": "MEYCIQCGLryMc2pIJlPKfTt11lfnCSXiE8dnbz/eY0gnq5h3zgIhAMFvgN4hkhEbw7fUJGO+Q0mocdxe9OXImUQA2c/fpVdv",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 110501
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-0.1.1.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/bbb422848fc1492c3a19bed34c0f62b8/dcx-protocol-applicant-0.1.1.tgz",
            "_integrity": "sha512-NaWUYFBimYHk980d6mAc9CjlcEpqcV+XFWoiODKhNF0EVZwFZcvdCeDPQpP7VfcF2iz0pkCD45AyymjiIcFV4w==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.6.2",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "0.1.2",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_0.1.1_1723550810502_0.020494224835016395",
                "host": "s3://npm-registry-packages"
            }
        },
        "1.0.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@1.0.0",
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
                "shasum": "303d3a4bf1f7ef8a832db19754f5c51492d6e41e",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-1.0.0.tgz",
                "fileCount": 26,
                "integrity": "sha512-Pf5L3L7vjtUoqbH2pIaJn0nN7LnKF8MOo+VqgZQJAouXDqm3jJcVg+v0Je6SsAt/163fhyyiMYVR+yNMgHR+bQ==",
                "signatures": [
                    {
                        "sig": "MEYCIQDXov52QWM4NrGZVa/JXh8UAC76wkWMBqgeJPcCUvo7SwIhANw+FQEbCJsDMEAOjK4m/DUIXX4kqTVbS4mnyD0CNLpw",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 97784
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-1.0.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/8a227fdb5692f27eee3798b1c2e88327/dcx-protocol-applicant-1.0.0.tgz",
            "_integrity": "sha512-Pf5L3L7vjtUoqbH2pIaJn0nN7LnKF8MOo+VqgZQJAouXDqm3jJcVg+v0Je6SsAt/163fhyyiMYVR+yNMgHR+bQ==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "20.16.0",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "1.0.0",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_1.0.0_1723587281339_0.5983779589580227",
                "host": "s3://npm-registry-packages"
            }
        },
        "3.1.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@3.1.0",
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
                "shasum": "7ed6b007651ce05818ea14084423a143ad0abc09",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-3.1.0.tgz",
                "fileCount": 21,
                "integrity": "sha512-eOREtZEkEHWaF3Sptwhz2PCVvxrK/up9K9gcl809Zd5HRbFECBuHF5oo027BCCer/HQlA8X8n1jksVxtyUIkYQ==",
                "signatures": [
                    {
                        "sig": "MEQCIE8O15++grgI4QAzguHq+rtOwlJhWG5fFzMMsBm//SPYAiA32uY0iqJoLgs0LsYo715CQq/ZRSN2OyZUtpqGHLrE/A==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 118812
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-3.1.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/f29bfa291d33fec1df45675092b03431/dcx-protocol-applicant-3.1.0.tgz",
            "_integrity": "sha512-eOREtZEkEHWaF3Sptwhz2PCVvxrK/up9K9gcl809Zd5HRbFECBuHF5oo027BCCer/HQlA8X8n1jksVxtyUIkYQ==",
            "deprecated": "this package has been deprecated",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "2.2.0",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_3.1.0_1723833012901_0.21667731456687278",
                "host": "s3://npm-registry-packages"
            }
        },
        "3.1.1": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@3.1.1",
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
                "shasum": "67f12fdea4a4e7a89d9e101d4338574fc907a923",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-3.1.1.tgz",
                "fileCount": 21,
                "integrity": "sha512-1R0Xc0cddbcCTF/7wOb0GhsrD6Q11rfvhbRfTfcozb8IS5T7T21XT+JpUJBFgFSTFPVFhNcuX6PR/1Kp8DpHJg==",
                "signatures": [
                    {
                        "sig": "MEQCIBmhPyeAHsHVJML8IyebsokKY+J9fW10w687eb0u5748AiAolSQIODgiOMioCVNnwTIhXffBpzuSe6Htlsv4tI0rgw==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 118812
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-3.1.1.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/0717aad7db90a74a6e3a8d1bd5e116e9/dcx-protocol-applicant-3.1.1.tgz",
            "_integrity": "sha512-1R0Xc0cddbcCTF/7wOb0GhsrD6Q11rfvhbRfTfcozb8IS5T7T21XT+JpUJBFgFSTFPVFhNcuX6PR/1Kp8DpHJg==",
            "deprecated": "this package has been deprecated",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "2.2.1",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_3.1.1_1723835380287_0.08612829626224605",
                "host": "s3://npm-registry-packages"
            }
        },
        "3.1.2": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@3.1.2",
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
                "shasum": "ca41f18abafd83b3335410d98c0dac8471e825e8",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-3.1.2.tgz",
                "fileCount": 21,
                "integrity": "sha512-lShdyk192s4CX4D0lK2OuCAjjr6pBBdXCYfh7U2uH6GcI2yIwNIVuok1X8BGVrIHo1AJoae71tuF0XMRAuql0g==",
                "signatures": [
                    {
                        "sig": "MEUCIQDlGo70Ves3QWUQIwko9Uing+d8DOCAHOoSAPR4yzzldgIgJuBucm+H557y6+LWp5Y8EC6z6/jdTrySccqsakAy3lg=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 119398
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-3.1.2.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/2a4222c6001c5c133c497f539cd3ade0/dcx-protocol-applicant-3.1.2.tgz",
            "_integrity": "sha512-lShdyk192s4CX4D0lK2OuCAjjr6pBBdXCYfh7U2uH6GcI2yIwNIVuok1X8BGVrIHo1AJoae71tuF0XMRAuql0g==",
            "deprecated": "this package has been deprecated",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "2.2.2",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_3.1.2_1723840796489_0.945774961473538",
                "host": "s3://npm-registry-packages"
            }
        },
        "4.0.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@4.0.0",
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
                "shasum": "4860fbcc3f34f0ed427f5e59a0dceda3df049471",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-4.0.0.tgz",
                "fileCount": 21,
                "integrity": "sha512-p0apqiAf6xMEZ3p9Wx7YN7y9YEoLet057ZeZ14OTruquUl4IRj3RYop8KdN1SDavW5IQRoQnEwmImu3XUHTpnw==",
                "signatures": [
                    {
                        "sig": "MEYCIQCyrBSNqqd1EfFtik/OYsrBgAIf0IXHvih+9rfXXIK7pAIhAMayyKuQyfs0u4lsi7mrLq7cLUDOiCTTH3f/4ZbiV2Cr",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 112576
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-4.0.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/fae9396815f6bcee11eea27633b8dc3b/dcx-protocol-applicant-4.0.0.tgz",
            "_integrity": "sha512-p0apqiAf6xMEZ3p9Wx7YN7y9YEoLet057ZeZ14OTruquUl4IRj3RYop8KdN1SDavW5IQRoQnEwmImu3XUHTpnw==",
            "deprecated": "this package has been deprecated",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "3.0.0",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_4.0.0_1723857049095_0.9396864189636116",
                "host": "s3://npm-registry-packages"
            }
        },
        "4.1.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@4.1.0",
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
                "shasum": "b734ae16f0f5c6a222c1fbfd6fcb9c1b7784d273",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-4.1.0.tgz",
                "fileCount": 21,
                "integrity": "sha512-mpHQk+n6HqkW7VCruQiZvveoRD4FZs7hvwlX75EKj5YcYA5kSskySlWgVZD9ArhMNUg9hbd9nQbr/Sm/NeqC7Q==",
                "signatures": [
                    {
                        "sig": "MEQCICAJYfwLXRFXq3xPeLRtTl1xQrA/xQSlU2FXrxrcwaYvAiA5Ip47laMzQq83yWpni6sTF1u6+2Z4dtmfIq2LEOYsSw==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 112576
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-4.1.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/dadf9e875e3b8bad04a8ce6a89f6e4be/dcx-protocol-applicant-4.1.0.tgz",
            "_integrity": "sha512-mpHQk+n6HqkW7VCruQiZvveoRD4FZs7hvwlX75EKj5YcYA5kSskySlWgVZD9ArhMNUg9hbd9nQbr/Sm/NeqC7Q==",
            "deprecated": "this package has been deprecated",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "3.1.0",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_4.1.0_1723858955042_0.9776961742135206",
                "host": "s3://npm-registry-packages"
            }
        },
        "5.0.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@5.0.0",
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
                "shasum": "8966f07d730d8c61d7e392cc7af55d6be90e7003",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-5.0.0.tgz",
                "fileCount": 21,
                "integrity": "sha512-jungx8KLDyMdWWA9Dq/KmLI+Q7yVcT/UBMeL6h8usw5KSNKEMrfWaJtQffKVu/ivG425Y0/xZY88VjEsOxldlA==",
                "signatures": [
                    {
                        "sig": "MEUCIBzsfEgBX/1NGoKCZrYfb7DDOEkPJNXkf8Ow2ScYz+sSAiEArr4pISxi7epTWvzSa8+qNlX/syvGzahaaZXOAzMjWeo=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 116317
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-5.0.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/fd9964a5c887b370682ec324bca1f9b4/dcx-protocol-applicant-5.0.0.tgz",
            "_integrity": "sha512-jungx8KLDyMdWWA9Dq/KmLI+Q7yVcT/UBMeL6h8usw5KSNKEMrfWaJtQffKVu/ivG425Y0/xZY88VjEsOxldlA==",
            "deprecated": "this package has been deprecated",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "20.16.0",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "3.2.0",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_5.0.0_1724203896534_0.24816600898667285",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.6.1": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@0.6.1",
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
                "shasum": "7a2bbd470d5e363d08da9e5663297ea51574f1aa",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-0.6.1.tgz",
                "fileCount": 21,
                "integrity": "sha512-1Tb1LbtjnnfAX1V4iGPfLaM9abG0bwV+/rfHSPH7F0JAMnCe7QlN5WnR5zejCLgqqsVDYpUPfrQpWVbNTPEyQQ==",
                "signatures": [
                    {
                        "sig": "MEUCIQDR2A2jUVC9tEK8rLBAFE5o5Y0cMQI6OXIEoSgipZehpwIgPehG17h81xHxnqKafQpR8eF0mNCnguXCfBUrwB2TLXk=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 116245
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-0.6.1.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/11dffe749cada3beb02df6be717e3c4c/dcx-protocol-applicant-0.6.1.tgz",
            "_integrity": "sha512-1Tb1LbtjnnfAX1V4iGPfLaM9abG0bwV+/rfHSPH7F0JAMnCe7QlN5WnR5zejCLgqqsVDYpUPfrQpWVbNTPEyQQ==",
            "deprecated": "this package has been deprecated",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "20.16.0",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "0.4.3",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_0.6.1_1724215532805_0.11799423636516204",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.7.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@0.7.0",
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
                "shasum": "d2a457eb8ee1e328ed9e2829b8a0a37b7ac59eba",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-0.7.0.tgz",
                "fileCount": 21,
                "integrity": "sha512-oqFoY2lPFvzu3EE2CLFuNUAK7RqdWzyrjHKANqkcYUUVspgoBaz6WbAzdEpkatcMqBt6wiJYUKN/9W44pdvecw==",
                "signatures": [
                    {
                        "sig": "MEUCIQCHJz8JdKGVXyHWCagYgj88JujSFHKVvXAECOOvcopBVgIgCCKm8xuAutpvcEkZY+g0BOb1EVd1jk64lw0/ekD0cos=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 112250
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-0.7.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/2e27f651a8c8bf39a31732d488926bc0/dcx-protocol-applicant-0.7.0.tgz",
            "_integrity": "sha512-oqFoY2lPFvzu3EE2CLFuNUAK7RqdWzyrjHKANqkcYUUVspgoBaz6WbAzdEpkatcMqBt6wiJYUKN/9W44pdvecw==",
            "deprecated": "this package has been deprecated",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "20.16.0",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "0.4.3",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_0.7.0_1724384780924_0.7511749939101586",
                "host": "s3://npm-registry-packages"
            }
        },
        "1.1.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@1.1.0",
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
                "shasum": "06a73e133a5502c8834e82c83b2572c11dc81c2e",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-1.1.0.tgz",
                "fileCount": 21,
                "integrity": "sha512-8ObE/NWefonIXeOx1chzFG9lzbmFa1kHlT/lIf3o7VoYD012v7EvH2YfJGjFvL5xtOds2Yc34alkPxRZLNN80w==",
                "signatures": [
                    {
                        "sig": "MEQCIB/6gM8C7m0F3KQWVw08TlIACTEkbDYfNWSfR1ZmXao7AiBeI2+2P4X0xeIFjLziB+WxXz1rMqeEe5PgRMjG66A88g==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 112093
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-1.1.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/94b4ab8e478c89dd9f2bd6bbefaf3b26/dcx-protocol-applicant-1.1.0.tgz",
            "_integrity": "sha512-8ObE/NWefonIXeOx1chzFG9lzbmFa1kHlT/lIf3o7VoYD012v7EvH2YfJGjFvL5xtOds2Yc34alkPxRZLNN80w==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "1.1.0",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_1.1.0_1724452671328_0.7115270286609487",
                "host": "s3://npm-registry-packages"
            }
        },
        "1.2.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@1.2.0",
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
                "shasum": "8b66b1eed79d85815cfd13e5a8a40c20dd34f6f0",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-1.2.0.tgz",
                "fileCount": 21,
                "integrity": "sha512-36DBtL/Kzh9WePgf8WSG6vUVRZiYSm02Rn/OdSDMuCPOlAtR3uTgCina1JkKGEKjovX5KRGk8QhyUNUnqEI9eg==",
                "signatures": [
                    {
                        "sig": "MEYCIQDqqbgG2P2ARAsiKACzs0tyudkA8phXkrDB2yO6inaZogIhAPs1tooJyPsplMSZu5rH9+KhivZ4NJb23Rw9QM7k0EAp",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 112093
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-1.2.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/43664f62dacc086d1ed6d3fbac620fd3/dcx-protocol-applicant-1.2.0.tgz",
            "_integrity": "sha512-36DBtL/Kzh9WePgf8WSG6vUVRZiYSm02Rn/OdSDMuCPOlAtR3uTgCina1JkKGEKjovX5KRGk8QhyUNUnqEI9eg==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "1.2.0",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_1.2.0_1724452992144_0.9527137536083861",
                "host": "s3://npm-registry-packages"
            }
        },
        "2.0.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@2.0.0",
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
                "shasum": "a626cb7614f25eea9ec23b7cce0bb5695ac223a9",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-2.0.0.tgz",
                "fileCount": 26,
                "integrity": "sha512-NPL6w3o5PPl+l8F1ytmd2aKCjbCMNm3ufyxcSettQ4pRWGhFilbn5EUV4I4OTNlZJuQWUkuFUEsYCnYDQg/cvQ==",
                "signatures": [
                    {
                        "sig": "MEUCIGRBXfusuQ/LUCtpw+rnEMEhD2BD+2Gk6d25CudhH9tcAiEA14F/XM/7xbrIeo7e/9tYRxuBU/yeEhdmCy3OwAYf6/s=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 114250
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-2.0.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/94f06ae913adc33e490c4e85e0bb0f1f/dcx-protocol-applicant-2.0.0.tgz",
            "_integrity": "sha512-NPL6w3o5PPl+l8F1ytmd2aKCjbCMNm3ufyxcSettQ4pRWGhFilbn5EUV4I4OTNlZJuQWUkuFUEsYCnYDQg/cvQ==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.2",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "20.17.0",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "3.1.0",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_2.0.0_1724803183988_0.20423176226102324",
                "host": "s3://npm-registry-packages"
            }
        },
        "3.0.0": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@3.0.0",
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
                "shasum": "c8a63278f87d7dad6eb5eec065f715159c2ee814",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-3.0.0.tgz",
                "fileCount": 26,
                "integrity": "sha512-YrZfrADyBI+cEfM3JsowrgF5GbgCZao+kpLZ7+smMOrEEw44Jj3kVMbbXWe4xHfl9wiXZ73aXVF6qsZPuEZHWg==",
                "signatures": [
                    {
                        "sig": "MEYCIQDKZTQ1IK1tbORDiUbZM45Z32Vyxtv8Yjz4jAfAHu8cCAIhAJGma3W9rVfVqWh6CrkxH/iiOC1IryzEOS1GaBod01LA",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 114250
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-3.0.0.tgz",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/4a91e83a9203f5a8d3fef1bc429b8083/dcx-protocol-applicant-3.0.0.tgz",
            "_integrity": "sha512-YrZfrADyBI+cEfM3JsowrgF5GbgCZao+kpLZ7+smMOrEEw44Jj3kVMbbXWe4xHfl9wiXZ73aXVF6qsZPuEZHWg==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.2",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "20.17.0",
            "dependencies": {
                "ms": "^2.1.3",
                "chalk": "^5.3.0",
                "@web5/api": "^0.10.0",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "^0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "isomorphic-ws": "^5.0.0",
                "@noble/ciphers": "^0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "4.0.0",
                "@tbd54566975/dwn-sdk-js": "^0.4.4"
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
                "@types/ms": "^0.7.34",
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
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/readable-stream": "^4.0.15",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.16.1",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.16.1"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_3.0.0_1724804284328_0.4886729355873558",
                "host": "s3://npm-registry-packages"
            }
        },
        "5.0.1": {
            "name": "@dcx-protocol/applicant",
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
                "dcx",
                "dwn",
                "dweb node",
                "dwn protocol"
            ],
            "license": "Apache-2.0",
            "_id": "@dcx-protocol/applicant@5.0.1",
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
                "shasum": "d9c5d64c277408855584e54c86fb3b6dbc4f00be",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-5.0.1.tgz",
                "fileCount": 26,
                "integrity": "sha512-a5kFxmYGVVEcwbaytvj6mchYxBE09JI1R3rN72S2MK+M52ena5ZTaVX8pUo42M/1o5Q+s3W6ZIxZsx3XlOs8NQ==",
                "signatures": [
                    {
                        "sig": "MEQCIDc17h48Vy6AkLfa8Tt1TP8raM/cUoCXxChcmssyXNKHAiBiDAPlJh6h7xC3MeUWtAaj+R5EMJ3FxshrnZBqmUsKlw==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 116152
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-applicant-5.0.1.tgz",
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
                "version": "tsx ../../scripts/version.ts applicant",
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
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/c8db066a5de892cd74260be453fee2d2/dcx-protocol-applicant-5.0.1.tgz",
            "_integrity": "sha512-a5kFxmYGVVEcwbaytvj6mchYxBE09JI1R3rN72S2MK+M52ena5ZTaVX8pUo42M/1o5Q+s3W6ZIxZsx3XlOs8NQ==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Applicant protocol and server",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "@web5/api": "^0.10.0",
                "@web5/agent": "^0.6.1",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.5.1",
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
                "abstract-level": "^2.0.0",
                "@playwright/test": "^1.46.1",
                "@web/test-runner": "^0.18.3",
                "chai-as-promised": "^8.0.0",
                "typescript-eslint": "^7.18.0",
                "eslint-plugin-mocha": "^10.5.0",
                "node-stdlib-browser": "^1.2.0",
                "mocha-junit-reporter": "^2.2.1",
                "@types/chai-as-promised": "^7.1.8",
                "@typescript-eslint/parser": "^7.18.0",
                "@web/test-runner-playwright": "^0.11.0",
                "@typescript-eslint/eslint-plugin": "^7.18.0"
            },
            "_npmOperationalInternal": {
                "tmp": "tmp/applicant_5.0.1_1724971433974_0.6046947010011285",
                "host": "s3://npm-registry-packages"
            }
        },
        "7.0.0": {
            "name": "@dcx-protocol/applicant",
            "version": "7.0.0",
            "description": "DCX Applicant protocol and server",
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
                "dcx",
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
                "@web5/credentials": "^1.1.1",
                "@web5/user-agent": "^0.5.1",
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
                "abstract-level": "^2.0.0",
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
                "node-stdlib-browser": "^1.2.0",
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
                "version": "tsx ../../scripts/version.ts applicant"
            },
            "_id": "@dcx-protocol/applicant@7.0.0",
            "_integrity": "sha512-frNMw5s2Em6+kIZ4T9zVm0VbsULSF9LFUQ9TuAAwXr6ISKOi5inWpAhQQ8FlbKkhH2UNhfz2P8Rje+5/Zmh/HA==",
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/5e208c760666cc960a3fd1e80d38c8f5/dcx-protocol-applicant-7.0.0.tgz",
            "_from": "file:dcx-protocol-applicant-7.0.0.tgz",
            "_nodeVersion": "20.17.0",
            "_npmVersion": "10.8.2",
            "dist": {
                "integrity": "sha512-frNMw5s2Em6+kIZ4T9zVm0VbsULSF9LFUQ9TuAAwXr6ISKOi5inWpAhQQ8FlbKkhH2UNhfz2P8Rje+5/Zmh/HA==",
                "shasum": "61638a108d01df71324e299a06599f3515dce7f4",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/applicant/-/applicant-7.0.0.tgz",
                "fileCount": 26,
                "unpackedSize": 121937,
                "signatures": [
                    {
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA",
                        "sig": "MEUCIHONTzJeChGUQx5eZR/Du7bAmGb1IzVjb1k3TjqiemAbAiEAz6DiZNz1JFTetU8kUmbn7KpCEMW5b+86aTeiIgj96o8="
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
                "tmp": "tmp/applicant_7.0.0_1725579460028_0.6955725837975271"
            },
            "_hasShrinkwrap": false
        }
    },
    "time": {
        "created": "2024-07-21T21:35:32.096Z",
        "modified": "2024-09-05T23:37:40.381Z",
        "0.0.7": "2024-07-21T21:35:32.444Z",
        "0.0.8": "2024-07-21T22:07:26.083Z",
        "0.0.9": "2024-07-23T21:11:31.523Z",
        "0.0.10": "2024-08-06T21:52:52.614Z",
        "0.0.11": "2024-08-09T15:49:29.481Z",
        "0.1.0": "2024-08-12T22:14:59.243Z",
        "0.1.1": "2024-08-13T12:06:50.700Z",
        "1.0.0": "2024-08-13T22:14:41.558Z",
        "3.1.0": "2024-08-16T18:30:13.088Z",
        "3.1.1": "2024-08-16T19:09:40.461Z",
        "3.1.2": "2024-08-16T20:39:56.733Z",
        "4.0.0": "2024-08-17T01:10:49.348Z",
        "4.1.0": "2024-08-17T01:42:35.301Z",
        "5.0.0": "2024-08-21T01:31:36.746Z",
        "0.6.1": "2024-08-21T04:45:32.970Z",
        "0.7.0": "2024-08-23T03:46:21.111Z",
        "1.1.0": "2024-08-23T22:37:51.521Z",
        "1.2.0": "2024-08-23T22:43:12.341Z",
        "2.0.0": "2024-08-27T23:59:44.195Z",
        "3.0.0": "2024-08-28T00:18:04.477Z",
        "5.0.1": "2024-08-29T22:43:54.199Z",
        "7.0.0": "2024-09-05T23:37:40.172Z"
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
        "dcx",
        "dwn",
        "dweb node",
        "dwn protocol"
    ],
    "repository": {
        "type": "git",
        "url": "git+https://github.com/TBD54566975/incubation-dcx.git"
    },
    "description": "DCX Applicant protocol and server",
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
    "readme": "# @dcx-protocol/applicant\n\nApplicant side of the DCX protocol\n- [`/packages/applicant/src/dcx-applicant.ts`](/packages/applicant/src/dcx-applicant.ts) core logic for the applicant side of the DCX protocol\n- [`/packages/applicant/src/protocol.ts`](/packages/applicant/src/protocol.ts) DWN protocol definition used by the DCX applicant\n\n## Package Version\n\n|                   package                      |                             npm                           |                               issues                            |                               prs                            |\n| ---------------------------------------------- | :-------------------------------------------------------: | :-------------------------------------------------------------: | :----------------------------------------------------------: |\n| [@dcx-protocol/applicant](/packages/applicant) | [![NPM Package][applicant-npm-badge]][applicant-npm-link] | [![Open Issues][applicant-issues-badge]][applicant-issues-link] | [![Open PRs][applicant-pulls-badge]][applicant-pulls-link]   |\n\n[applicant-npm-badge]: https://img.shields.io/npm/v/@dcx-protocol/applicant.svg?&color=green&santize=true\n[applicant-npm-link]: https://www.npmjs.com/package/@dcx-protocol/applicant\n[applicant-issues-badge]: https://img.shields.io/github/issues/TBD54566975/incubation-dcx/package:%20applicant?label=issues\n[applicant-issues-link]: https://github.com/TBD54566975/incubation-dcx/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+applicant%22\n[applicant-pulls-badge]: https://img.shields.io/github/issues-pr/TBD54566975/incubation-dcx/package%3A%20applicant?label=PRs\n[applicant-pulls-link]: https://github.com/TBD54566975/incubation-dcx/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+issuer%22",
    "readmeFilename": "README.md"
}