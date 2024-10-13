export default {
    "_id": "@dcx-protocol/server",
    "_rev": "16-138980bcbc6eb411411081f0160d0fdb",
    "name": "@dcx-protocol/server",
    "dist-tags": {
        "latest": "7.0.1"
    },
    "versions": {
        "0.0.1": {
            "name": "@dcx-protocol/server",
            "version": "0.0.1",
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
            "_id": "@dcx-protocol/server@0.0.1",
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
                "shasum": "43be740042546ce61298ddb247b72eff984062a9",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-0.0.1.tgz",
                "fileCount": 16,
                "integrity": "sha512-BEkYACUXNlsvcOTMrensuWOLGwowbSL2qc9tXPOZRRKZwK0dBZ17hp9W+++jGjiUyIbsEBHZUCUgObcIUxqHpQ==",
                "signatures": [
                    {
                        "sig": "MEUCIQCUy3dbGB+hBl5gluUduvJGCt+I/iL/VMIk22FRaLtwxQIgeELlvei8CXHz9QAU8M9lf07cgmlB3aA4BGgX+7Sy+pY=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 63692
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-0.0.1.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/c50e2bab3890fabb3473f5f68fbf3b23/dcx-protocol-server-0.0.1.tgz",
            "_integrity": "sha512-BEkYACUXNlsvcOTMrensuWOLGwowbSL2qc9tXPOZRRKZwK0dBZ17hp9W+++jGjiUyIbsEBHZUCUgObcIUxqHpQ==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Server Implementation",
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
                "@dcx-protocol/common": "2.2.0",
                "@dcx-protocol/issuer": "3.1.0"
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
                "tmp": "tmp/server_0.0.1_1723833095169_0.40393667983329595",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.1.0": {
            "name": "@dcx-protocol/server",
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
            "_id": "@dcx-protocol/server@0.1.0",
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
                "shasum": "baae969cd8bbffef5393d69fda1ffdda548c63a6",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-0.1.0.tgz",
                "fileCount": 16,
                "integrity": "sha512-TKeQc02b6eZsVWx9xWTRrukblZ17oh6Vf2LEYUaJMnDy6CBvikMG1XdRJOmlmv2Xs3HmXPXybKmj0aQLkPaZHg==",
                "signatures": [
                    {
                        "sig": "MEUCIG21PdpN2NIYjgjhVUXTgZ/dl7AM83liolGUYOUy2KT3AiEAivkFHQx0r01i+9PX7LrND7lFyyEcTQPcPSJBSf7YafQ=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 63692
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-0.1.0.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/1b120f6341472b231ce3069985f4dab4/dcx-protocol-server-0.1.0.tgz",
            "_integrity": "sha512-TKeQc02b6eZsVWx9xWTRrukblZ17oh6Vf2LEYUaJMnDy6CBvikMG1XdRJOmlmv2Xs3HmXPXybKmj0aQLkPaZHg==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Server Implementation",
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
                "@dcx-protocol/common": "2.2.1",
                "@dcx-protocol/issuer": "3.1.1"
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
                "tmp": "tmp/server_0.1.0_1723835713237_0.8207311441092544",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.1.1": {
            "name": "@dcx-protocol/server",
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
            "_id": "@dcx-protocol/server@0.1.1",
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
                "shasum": "5159a9745012e1154f0e0570475adf1073396741",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-0.1.1.tgz",
                "fileCount": 16,
                "integrity": "sha512-0cMjWbqtNR23p/kB9NwChgn0sbT/qOZYbAqghaWhpFMDvVCGa2pnOgsmNthr6ka05KYCv6mOKhNap7Kxdel4Mw==",
                "signatures": [
                    {
                        "sig": "MEYCIQCxxslfoMivCKolhDthoEGTJ1cCnlGNlf9rL92RhmQTFQIhAL4q45vhUsmVNas9pkClM3SgpTiEm5TGnr0fz0XVs7pV",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 64203
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-0.1.1.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/9c08dd6fe0d185155d37066fd58338cd/dcx-protocol-server-0.1.1.tgz",
            "_integrity": "sha512-0cMjWbqtNR23p/kB9NwChgn0sbT/qOZYbAqghaWhpFMDvVCGa2pnOgsmNthr6ka05KYCv6mOKhNap7Kxdel4Mw==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Server Implementation",
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
                "@dcx-protocol/common": "2.2.2",
                "@dcx-protocol/issuer": "3.1.2"
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
                "tmp": "tmp/server_0.1.1_1723840805652_0.4915645026701654",
                "host": "s3://npm-registry-packages"
            }
        },
        "1.0.0": {
            "name": "@dcx-protocol/server",
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
            "_id": "@dcx-protocol/server@1.0.0",
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
                "shasum": "f5f70c8fbbe5d2b705036cb49e8ce5a621c120be",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-1.0.0.tgz",
                "fileCount": 16,
                "integrity": "sha512-i2SKsz7qD3nffc6hEMKEpb34Jjmf2nW0KqnaeC6RpBLhkFr/9h7P5zKOdHjujw8RdUExa2P+T0oQxooWmdkC3Q==",
                "signatures": [
                    {
                        "sig": "MEUCIQCy6gYDhOu5+fYeMqZCu08zscfKqUcFhZjYediz3jw1yQIgKYiG/7Z/IubsJS9LDZw2kfr86cFDFpF2obaybeFKVBg=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 64203
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-1.0.0.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/f5f60c1d51d3c055caeba4fc3dbf4235/dcx-protocol-server-1.0.0.tgz",
            "_integrity": "sha512-i2SKsz7qD3nffc6hEMKEpb34Jjmf2nW0KqnaeC6RpBLhkFr/9h7P5zKOdHjujw8RdUExa2P+T0oQxooWmdkC3Q==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Server Implementation",
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
                "@dcx-protocol/common": "3.0.0",
                "@dcx-protocol/issuer": "4.0.0"
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
                "tmp": "tmp/server_1.0.0_1723857058436_0.6728396289507792",
                "host": "s3://npm-registry-packages"
            }
        },
        "1.1.0": {
            "name": "@dcx-protocol/server",
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
            "_id": "@dcx-protocol/server@1.1.0",
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
                "shasum": "77ad0236947630760e33f38fa777d6628c713770",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-1.1.0.tgz",
                "fileCount": 16,
                "integrity": "sha512-ztagSAwb0MYiftMz+NUEmJ8TAyWDYMt4tEAv6QdY+YCkSQo8wn7aQmQF8M9/RERZmbiQ5lM1GnmnvztWszWY3g==",
                "signatures": [
                    {
                        "sig": "MEYCIQCh83JOGQdXbbJo/e4uc+4jn077fb4xpIyMSjcYHXHv8QIhANCkVSq5hhU2IA+w/LwHq5Nlv6rdJ0sEsNEBkgHDZ/TB",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 64203
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-1.1.0.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/514ed01721f8cf074b2475205101d3aa/dcx-protocol-server-1.1.0.tgz",
            "_integrity": "sha512-ztagSAwb0MYiftMz+NUEmJ8TAyWDYMt4tEAv6QdY+YCkSQo8wn7aQmQF8M9/RERZmbiQ5lM1GnmnvztWszWY3g==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Server Implementation",
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
                "@dcx-protocol/common": "3.1.0",
                "@dcx-protocol/issuer": "4.1.0"
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
                "tmp": "tmp/server_1.1.0_1723858963906_0.46482794120360094",
                "host": "s3://npm-registry-packages"
            }
        },
        "2.0.0": {
            "name": "@dcx-protocol/server",
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
            "_id": "@dcx-protocol/server@2.0.0",
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
                "shasum": "e922ceec0a9363af76cf33a777a76bc11502ffce",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-2.0.0.tgz",
                "fileCount": 26,
                "integrity": "sha512-9AdfrNdXdd+jrRD5IItTde+xI1UjCSy5fjtyz5p+1Z8loN5gAxVrra//twc9gr3Pbu0CEZyn+VFRssn/mnPHYA==",
                "signatures": [
                    {
                        "sig": "MEQCIGV3OOdylQ4Mcs3PXu1CN78bhoAmf3tcuyHiAN80OqD2AiB077T5PUR00yMlLPpdBtjoZLHz1vT/1UW2f5wZo9khew==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 113935
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-2.0.0.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/03510055db3668b519b46da27ec6c5bb/dcx-protocol-server-2.0.0.tgz",
            "_integrity": "sha512-9AdfrNdXdd+jrRD5IItTde+xI1UjCSy5fjtyz5p+1Z8loN5gAxVrra//twc9gr3Pbu0CEZyn+VFRssn/mnPHYA==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Server Implementation",
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
                "@dcx-protocol/common": "3.2.0",
                "@dcx-protocol/issuer": "5.0.0",
                "@dcx-protocol/applicant": "5.0.0"
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
                "tmp": "tmp/server_2.0.0_1724203906087_0.937033771720758",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.3.1": {
            "name": "@dcx-protocol/server",
            "version": "0.3.1",
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
            "_id": "@dcx-protocol/server@0.3.1",
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
                "shasum": "0bc1e3a865e7de613703ff53f050920cc0502979",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-0.3.1.tgz",
                "fileCount": 26,
                "integrity": "sha512-9GhEwV12r+m+xSNWqgDzgRwt6ylBipk8XNogjU4sRFC41cdKgMWy/AOSFwUkZuAeAtZku0HoeeB/rLs1RcCg1w==",
                "signatures": [
                    {
                        "sig": "MEQCIBJUc8cJ2cgXNUHvLW4X7NAP3Ch61oXFELsTSaYStqZ9AiBhfVAZ8+wy4ETAZyU1yUq+3cgED4bR+k1nYSFTOR7wIQ==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 113807
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-0.3.1.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/fc2b35c88b406db60b56283d10c4c8f9/dcx-protocol-server-0.3.1.tgz",
            "_integrity": "sha512-9GhEwV12r+m+xSNWqgDzgRwt6ylBipk8XNogjU4sRFC41cdKgMWy/AOSFwUkZuAeAtZku0HoeeB/rLs1RcCg1w==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Server Implementation",
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
                "@dcx-protocol/common": "0.4.3",
                "@dcx-protocol/issuer": "0.6.1",
                "@dcx-protocol/applicant": "0.6.1"
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
                "tmp": "tmp/server_0.3.1_1724215541769_0.06751085547520619",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.4.1": {
            "name": "@dcx-protocol/server",
            "version": "0.4.1",
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
            "_id": "@dcx-protocol/server@0.4.1",
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
                "shasum": "d5802e173f100a455291ff7d30b0f8f0dda26e95",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-0.4.1.tgz",
                "fileCount": 26,
                "integrity": "sha512-mFvNThGG0jprPWaVg5O9xRoLYM5a7yhpu77yZgB4lxU5wZwlhLb1mIpNAUUSNDCFdLQIPpX6og8b0P3i6T4QjA==",
                "signatures": [
                    {
                        "sig": "MEYCIQCtv0z1ZaUKAhtXbQ0CV8xfPmb5soYKn2j5shegC1OepAIhAPJt2Ycdzv1VcDAaXsCiqGydzXNPt5duxa9+Qxx5D7wB",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 69966
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-0.4.1.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/65774532cf3fea826955013d3ae68a21/dcx-protocol-server-0.4.1.tgz",
            "_integrity": "sha512-mFvNThGG0jprPWaVg5O9xRoLYM5a7yhpu77yZgB4lxU5wZwlhLb1mIpNAUUSNDCFdLQIPpX6og8b0P3i6T4QjA==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Server Implementation",
            "directories": {},
            "_nodeVersion": "20.16.0",
            "dependencies": {
                "next": "^14.2.6",
                "chalk": "^5.3.0",
                "react": "^18.3.1",
                "@web5/api": "^0.10.0",
                "react-dom": "^18.3.1",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "@noble/ciphers": "0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "0.4.3",
                "@dcx-protocol/issuer": "0.6.1",
                "@dcx-protocol/applicant": "0.6.1"
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
                "@types/react": "^18.3.4",
                "@types/eslint": "^9.6.0",
                "abstract-level": "^2.0.0",
                "@playwright/test": "^1.45.3",
                "@types/react-dom": "^18.3.0",
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
                "tmp": "tmp/server_0.4.1_1724345295704_0.47931488107047504",
                "host": "s3://npm-registry-packages"
            }
        },
        "0.5.0": {
            "name": "@dcx-protocol/server",
            "version": "0.5.0",
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
            "_id": "@dcx-protocol/server@0.5.0",
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
                "shasum": "e79ce0f721ca8fbf596424d33975506667a938ee",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-0.5.0.tgz",
                "fileCount": 16,
                "integrity": "sha512-A0X3ZdbaTg+VeyATpUaeb1zBOkpPkJIJUllUmNAHaVXsVGZ5hK8a3O5Q6AmzBFJGXUQfHbLsjBqhihhdAuP5rQ==",
                "signatures": [
                    {
                        "sig": "MEUCIQCE2pXYUA0f+ZkvHWUHEhCzpmKvogOcj+ptnNBYwbYp0wIgJOrcFlN2Z9lOnLU1iresDtzlwJDLWoKeSPWMjUyni2M=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 101576
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-0.5.0.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/e3f2052b3f3fa6a39269b98d9d27ec09/dcx-protocol-server-0.5.0.tgz",
            "_integrity": "sha512-A0X3ZdbaTg+VeyATpUaeb1zBOkpPkJIJUllUmNAHaVXsVGZ5hK8a3O5Q6AmzBFJGXUQfHbLsjBqhihhdAuP5rQ==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.1",
            "description": "DCX Server Implementation",
            "directories": {},
            "_nodeVersion": "20.16.0",
            "dependencies": {
                "ms": "^2.1.3",
                "next": "^14.2.6",
                "chalk": "^5.3.0",
                "react": "^18.3.1",
                "@web5/api": "^0.10.0",
                "react-dom": "^18.3.1",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "@noble/ciphers": "0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "0.4.3",
                "@dcx-protocol/issuer": "0.7.0",
                "@dcx-protocol/applicant": "0.7.0"
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
                "@types/react": "^18.3.4",
                "@types/eslint": "^9.6.0",
                "abstract-level": "^2.0.0",
                "@playwright/test": "^1.45.3",
                "@types/react-dom": "^18.3.0",
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
                "tmp": "tmp/server_0.5.0_1724384786430_0.45469124207522293",
                "host": "s3://npm-registry-packages"
            }
        },
        "1.2.0": {
            "name": "@dcx-protocol/server",
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
            "_id": "@dcx-protocol/server@1.2.0",
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
                "shasum": "92b66308e506408545df1e1be7ab847272a55b80",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-1.2.0.tgz",
                "fileCount": 31,
                "integrity": "sha512-ndiuVFOy4637GKOR4s/CTkML3bkzV+z9dW8WkJu1EuS/hh9fMmrFF4oiui/4wUhvRkTDY/3T38H3a95JzPxROw==",
                "signatures": [
                    {
                        "sig": "MEQCIAa8uxHFyfDMtR8LzPBoJQ1Vf7m4Wa4proFx6a+2mu3GAiBz3Ois6r5T4qoS2sJN3seS1373Qq2aRq8xpqhbRrX8kQ==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 112429
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-1.2.0.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build": "pnpm clean && pnpm build:esm && pnpm build:cjs && pnpm build:tests:node",
                "clean": "rimraf dist coverage tests/compiled",
                "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
                "test:e2e": "tsx tests/e2e/*.spec.ts -t",
                "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/43c92c80335db0c8360cda8b8e1016e5/dcx-protocol-server-1.2.0.tgz",
            "_integrity": "sha512-ndiuVFOy4637GKOR4s/CTkML3bkzV+z9dW8WkJu1EuS/hh9fMmrFF4oiui/4wUhvRkTDY/3T38H3a95JzPxROw==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Server Implementation",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "ms": "^2.1.3",
                "next": "^14.2.6",
                "chalk": "^5.3.0",
                "react": "^18.3.1",
                "@web5/api": "^0.10.0",
                "react-dom": "^18.3.1",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "@noble/ciphers": "0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "1.1.0",
                "@dcx-protocol/issuer": "1.1.0",
                "@dcx-protocol/applicant": "1.1.0"
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
                "@types/react": "^18.3.4",
                "@types/eslint": "^9.6.0",
                "abstract-level": "^2.0.0",
                "@playwright/test": "^1.45.3",
                "@types/react-dom": "^18.3.0",
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
                "tmp": "tmp/server_1.2.0_1724452782028_0.3851498588071951",
                "host": "s3://npm-registry-packages"
            }
        },
        "1.3.0": {
            "name": "@dcx-protocol/server",
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
            "_id": "@dcx-protocol/server@1.3.0",
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
                "shasum": "665ca916f140a8b9f8f157c660891adbb8dffceb",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-1.3.0.tgz",
                "fileCount": 31,
                "integrity": "sha512-ozxIp6NjkmJ30e/MyDPLZUjKY1z+pEliJbInvn5mJd5mM4gZCy2viB+4Lxp9QxhEhGjIud7qOxBhRlONX4+wjw==",
                "signatures": [
                    {
                        "sig": "MEYCIQCgNzwUWSrCIYMoYuzcYTBPYxkiqGY68hc3wit8LCg+pgIhAJ0yamTv4QcDi5MebLtSCGbDUau1DAgAamhMDfgsB9nu",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 112429
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-1.3.0.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build": "pnpm clean && pnpm build:esm && pnpm build:cjs && pnpm build:tests:node",
                "clean": "rimraf dist coverage tests/compiled",
                "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
                "test:e2e": "tsx tests/e2e/*.spec.ts -t",
                "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/a150bd8a277da79afee0f09335348b61/dcx-protocol-server-1.3.0.tgz",
            "_integrity": "sha512-ozxIp6NjkmJ30e/MyDPLZUjKY1z+pEliJbInvn5mJd5mM4gZCy2viB+4Lxp9QxhEhGjIud7qOxBhRlONX4+wjw==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.2",
            "description": "DCX Server Implementation",
            "directories": {},
            "_nodeVersion": "20.17.0",
            "dependencies": {
                "ms": "^2.1.3",
                "next": "^14.2.6",
                "chalk": "^5.3.0",
                "react": "^18.3.1",
                "@web5/api": "^0.10.0",
                "react-dom": "^18.3.1",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "@noble/ciphers": "0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "2.0.0",
                "@dcx-protocol/issuer": "1.3.0",
                "@dcx-protocol/applicant": "1.2.0"
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
                "@types/react": "^18.3.4",
                "@types/eslint": "^9.6.0",
                "abstract-level": "^2.0.0",
                "@playwright/test": "^1.45.3",
                "@types/react-dom": "^18.3.0",
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
                "tmp": "tmp/server_1.3.0_1724708472588_0.9416403818334349",
                "host": "s3://npm-registry-packages"
            }
        },
        "2.0.1": {
            "name": "@dcx-protocol/server",
            "version": "2.0.1",
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
            "_id": "@dcx-protocol/server@2.0.1",
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
                "shasum": "8c0765fa0708a7e565191866a4ccf3ee218171e6",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-2.0.1.tgz",
                "fileCount": 26,
                "integrity": "sha512-7y6S4iIEffghuYOVUSDZWs0cn+RKm7zOmfIwuKCpmFCwFpue+K7vz1Zl1wVx4tr2pGn1WU0cs8X7XBbr3qgL8w==",
                "signatures": [
                    {
                        "sig": "MEUCIFViyfk+hD6FCTvAyvtZbKbC0JoS5/kIOJaVbbCOJ6STAiEArKf2xeqhr2dR4pxK5uwaapEi/prywkwv0MtyEa2RnUg=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 106246
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-2.0.1.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build": "pnpm clean && pnpm build:esm && pnpm build:cjs && pnpm build:tests:node",
                "clean": "rimraf dist coverage tests/compiled",
                "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
                "test:e2e": "tsx tests/e2e/*.spec.ts -t",
                "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/de2389349e41b87ea4097e94bf151b43/dcx-protocol-server-2.0.1.tgz",
            "_integrity": "sha512-7y6S4iIEffghuYOVUSDZWs0cn+RKm7zOmfIwuKCpmFCwFpue+K7vz1Zl1wVx4tr2pGn1WU0cs8X7XBbr3qgL8w==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.2",
            "description": "DCX Server Implementation",
            "directories": {},
            "_nodeVersion": "20.17.0",
            "dependencies": {
                "ms": "^2.1.3",
                "next": "^14.2.6",
                "chalk": "^5.3.0",
                "react": "^18.3.1",
                "@web5/api": "^0.10.0",
                "react-dom": "^18.3.1",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "@noble/ciphers": "0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "3.1.1",
                "@dcx-protocol/issuer": "2.0.0",
                "@dcx-protocol/applicant": "2.0.0"
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
                "@types/react": "^18.3.4",
                "@types/eslint": "^9.6.0",
                "abstract-level": "^2.0.0",
                "@playwright/test": "^1.45.3",
                "@types/react-dom": "^18.3.0",
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
                "tmp": "tmp/server_2.0.1_1724803350825_0.6234626880094976",
                "host": "s3://npm-registry-packages"
            }
        },
        "3.0.0": {
            "name": "@dcx-protocol/server",
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
            "_id": "@dcx-protocol/server@3.0.0",
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
                "shasum": "b18be6575c62600aeb748e5295595d22dd7ee658",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-3.0.0.tgz",
                "fileCount": 26,
                "integrity": "sha512-XEkEePTpGMAhpIbLdLxRqKvRE4W/RX+lgOhEY8FLZqPudmr8qHVqcA5BOHHfMpZ44l15waO59Na3HNR+Obc27Q==",
                "signatures": [
                    {
                        "sig": "MEYCIQC4jyEkEMiSTpXYlSGlKqKF4Ee04NdNDvEuyjjwa1BmOQIhAIrBB62+o9kMYy68GGzJoramX7Ytmxm6gQHpooattl0p",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 106246
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-3.0.0.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build": "pnpm clean && pnpm build:esm && pnpm build:cjs && pnpm build:tests:node",
                "clean": "rimraf dist coverage tests/compiled",
                "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
                "test:e2e": "tsx tests/e2e/*.spec.ts -t",
                "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/fddc30e442c99d1d2aaed6e1d4a071d7/dcx-protocol-server-3.0.0.tgz",
            "_integrity": "sha512-XEkEePTpGMAhpIbLdLxRqKvRE4W/RX+lgOhEY8FLZqPudmr8qHVqcA5BOHHfMpZ44l15waO59Na3HNR+Obc27Q==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.2",
            "description": "DCX Server Implementation",
            "directories": {},
            "_nodeVersion": "20.17.0",
            "dependencies": {
                "ms": "^2.1.3",
                "next": "^14.2.6",
                "chalk": "^5.3.0",
                "react": "^18.3.1",
                "@web5/api": "^0.10.0",
                "react-dom": "^18.3.1",
                "@web5/dids": "^1.1.2",
                "@web5/agent": "0.4.1",
                "@scure/bip39": "^1.3.0",
                "@web5/common": "^1.0.2",
                "@web5/crypto": "^1.0.2",
                "@noble/ciphers": "0.5.3",
                "ed25519-keygen": "^0.6.2",
                "@web5/user-agent": "^0.4.1",
                "@web5/credentials": "^1.0.4",
                "@dcx-protocol/common": "4.0.0",
                "@dcx-protocol/issuer": "3.0.0",
                "@dcx-protocol/applicant": "3.0.0"
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
                "@types/react": "^18.3.4",
                "@types/eslint": "^9.6.0",
                "abstract-level": "^2.0.0",
                "@playwright/test": "^1.45.3",
                "@types/react-dom": "^18.3.0",
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
                "tmp": "tmp/server_3.0.0_1724804294694_0.46386377035965287",
                "host": "s3://npm-registry-packages"
            }
        },
        "3.0.1": {
            "name": "@dcx-protocol/server",
            "version": "3.0.1",
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
            "_id": "@dcx-protocol/server@3.0.1",
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
                "shasum": "19a7456d9237bf9bccc141f5a8ec6de0e92607ee",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-3.0.1.tgz",
                "fileCount": 26,
                "integrity": "sha512-GF/ELEacVkdOiSh25s214wPvyu8RPSBzSrcOggCrQAhLJHrn5Zwd/PCTJyYLYRZTTxUg2BiOqR6VRVr3M3GKeg==",
                "signatures": [
                    {
                        "sig": "MEUCIQCdZiVC4HD0sHd/8Cq304qDATN3I+XGT66VFmS96FV1JQIgTlgDBLNZ5BOjrmzju7gaAxGW2Kcx9HtxS8mJnSXTLoM=",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 104974
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-3.0.1.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build": "pnpm clean && pnpm build:esm && pnpm build:cjs && pnpm build:tests:node",
                "clean": "rimraf dist coverage tests/compiled",
                "version": "tsx ../../scripts/version.ts server",
                "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
                "test:e2e": "tsx tests/e2e/*.spec.ts -t",
                "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/eaa181a0cb2733a3e8d68ea8053398b9/dcx-protocol-server-3.0.1.tgz",
            "_integrity": "sha512-GF/ELEacVkdOiSh25s214wPvyu8RPSBzSrcOggCrQAhLJHrn5Zwd/PCTJyYLYRZTTxUg2BiOqR6VRVr3M3GKeg==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Server Implementation",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "ms": "^2.1.3",
                "@web5/api": "^0.10.0",
                "isomorphic-ws": "5.0.0",
                "ed25519-keygen": "^0.6.2",
                "@dcx-protocol/common": "4.1.0",
                "@dcx-protocol/issuer": "3.1.0",
                "@dcx-protocol/applicant": "4.0.0"
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
                "@types/ms": "^0.7.34",
                "playwright": "^1.46.1",
                "typescript": "^5.5.4",
                "@types/chai": "^4.3.19",
                "@types/node": "^20.16.2",
                "@types/mocha": "^10.0.7",
                "@types/react": "^18.3.4",
                "@types/eslint": "^9.6.1",
                "@playwright/test": "^1.46.1",
                "@types/react-dom": "^18.3.0",
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
                "tmp": "tmp/server_3.0.1_1724971111034_0.34103240498109955",
                "host": "s3://npm-registry-packages"
            }
        },
        "5.0.1": {
            "name": "@dcx-protocol/server",
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
            "_id": "@dcx-protocol/server@5.0.1",
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
                "shasum": "f98b5aabb59aa37e5df8a78fa43664d12b81e3e2",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-5.0.1.tgz",
                "fileCount": 26,
                "integrity": "sha512-T0yq755datm5WoMMpV+Ax95n6nT02w6soFo61gtSCSgQK2dFptPvrvDeuqES3mHoC187/69KsTfXGmWC6zy1jg==",
                "signatures": [
                    {
                        "sig": "MEQCICwc1wn/lykGDsd1zyDVH8RCm+j59TzVsA0TO1alcyxIAiANyi/XfWiZgRgmBlT+Bb6EL9nN+T+U0P/60XZUiDg+Lw==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 104974
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-5.0.1.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build": "pnpm clean && pnpm build:esm && pnpm build:cjs && pnpm build:tests:node",
                "clean": "rimraf dist coverage tests/compiled",
                "version": "tsx ../../scripts/version.ts server",
                "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
                "test:e2e": "tsx tests/e2e/*.spec.ts -t",
                "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/f042ab2e0a902b0c0ba6f82d9aeef16a/dcx-protocol-server-5.0.1.tgz",
            "_integrity": "sha512-T0yq755datm5WoMMpV+Ax95n6nT02w6soFo61gtSCSgQK2dFptPvrvDeuqES3mHoC187/69KsTfXGmWC6zy1jg==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.5.0",
            "description": "DCX Server Implementation",
            "directories": {},
            "_nodeVersion": "21.7.3",
            "dependencies": {
                "ms": "^2.1.3",
                "@web5/api": "^0.10.0",
                "isomorphic-ws": "5.0.0",
                "ed25519-keygen": "^0.6.2",
                "@dcx-protocol/common": "5.0.1",
                "@dcx-protocol/issuer": "5.0.1",
                "@dcx-protocol/applicant": "5.0.1"
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
                "@types/ms": "^0.7.34",
                "playwright": "^1.46.1",
                "typescript": "^5.5.4",
                "@types/chai": "^4.3.19",
                "@types/node": "^20.16.2",
                "@types/mocha": "^10.0.7",
                "@types/react": "^18.3.4",
                "@types/eslint": "^9.6.1",
                "@playwright/test": "^1.46.1",
                "@types/react-dom": "^18.3.0",
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
                "tmp": "tmp/server_5.0.1_1724971442420_0.5937196679662016",
                "host": "s3://npm-registry-packages"
            }
        },
        "7.0.0": {
            "name": "@dcx-protocol/server",
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
            "_id": "@dcx-protocol/server@7.0.0",
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
                "shasum": "28319f2c9dd84429c114f1272aab0d9f69b450fa",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-7.0.0.tgz",
                "fileCount": 26,
                "integrity": "sha512-2k0JwlJBjSYFs44otudd0K4gVNuMohRrt2nPDyMkr0Oa/wfw5U4+u2rCpaxSsGgW+pwTRlVDswNrdeZoVMiBkg==",
                "signatures": [
                    {
                        "sig": "MEQCICxbR4n3D8QfBKBK8+b2EjAmtZyh+bN7eKoaKD4K+xyqAiAEx2u8W76m0y85w6IH67T+Yp0BXU/Jf27CJ7RID/jRoQ==",
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA"
                    }
                ],
                "unpackedSize": 100839
            },
            "main": "./dist/cjs/index.js",
            "type": "module",
            "_from": "file:dcx-protocol-server-7.0.0.tgz",
            "types": "./dist/types/index.d.ts",
            "module": "./dist/esm/index.js",
            "engines": {
                "node": ">=18.0.0 || <22.0.0"
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
                "build": "pnpm clean && pnpm build:esm && pnpm build:cjs && pnpm build:tests:node",
                "clean": "rimraf dist coverage tests/compiled",
                "version": "tsx ../../scripts/version.ts server",
                "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
                "test:e2e": "tsx tests/e2e/*.spec.ts -t",
                "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json"
            },
            "_npmUser": {
                "name": "bnonni",
                "email": "bnonni@formfree.com"
            },
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/4d64ae8053c3f174c8ed5462e64c948d/dcx-protocol-server-7.0.0.tgz",
            "_integrity": "sha512-2k0JwlJBjSYFs44otudd0K4gVNuMohRrt2nPDyMkr0Oa/wfw5U4+u2rCpaxSsGgW+pwTRlVDswNrdeZoVMiBkg==",
            "repository": {
                "url": "git+https://github.com/TBD54566975/incubation-dcx.git",
                "type": "git"
            },
            "_npmVersion": "10.8.2",
            "description": "DCX Server Implementation",
            "directories": {},
            "_nodeVersion": "20.17.0",
            "dependencies": {
                "ms": "^2.1.3",
                "@web5/api": "^0.10.0",
                "isomorphic-ws": "5.0.0",
                "ed25519-keygen": "^0.6.2",
                "@dcx-protocol/common": "7.0.0",
                "@dcx-protocol/issuer": "7.0.0",
                "@dcx-protocol/applicant": "7.0.0"
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
                "@types/ms": "^0.7.34",
                "playwright": "^1.46.1",
                "typescript": "^5.5.4",
                "@types/chai": "^4.3.19",
                "@types/node": "^20.16.2",
                "@types/mocha": "^10.0.7",
                "@types/react": "^18.3.4",
                "@types/eslint": "^9.6.1",
                "@playwright/test": "^1.46.1",
                "@types/react-dom": "^18.3.0",
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
                "tmp": "tmp/server_7.0.0_1725579469679_0.6586394453020674",
                "host": "s3://npm-registry-packages"
            }
        },
        "7.0.1": {
            "name": "@dcx-protocol/server",
            "version": "7.0.1",
            "description": "DCX Server Implementation",
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
                "node": ">=18.0.0 || <22.0.0"
            },
            "dependencies": {
                "@web5/api": "^0.10.0",
                "ed25519-keygen": "^0.6.2",
                "isomorphic-ws": "5.0.0",
                "ms": "^2.1.3",
                "@dcx-protocol/issuer": "7.0.0",
                "@dcx-protocol/applicant": "7.0.0",
                "@dcx-protocol/common": "7.0.0"
            },
            "devDependencies": {
                "@playwright/test": "^1.46.1",
                "@types/chai": "^4.3.19",
                "@types/chai-as-promised": "^7.1.8",
                "@types/eslint": "^9.6.1",
                "@types/mocha": "^10.0.7",
                "@types/ms": "^0.7.34",
                "@types/node": "^20.16.2",
                "@types/react": "^18.3.4",
                "@types/react-dom": "^18.3.0",
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
                "build": "pnpm clean && pnpm build:esm && pnpm build:cjs && pnpm build:tests:node",
                "build:esm": "rimraf dist/esm dist/types && pnpm tsc -p tsconfig.json",
                "build:cjs": "rimraf dist/cjs && node build/cjs-bundle.js && echo '{\"type\": \"commonjs\"}' > ./dist/cjs/package.json",
                "build:tests:node": "rimraf tests/compiled && pnpm tsc -p tests/tsconfig.json",
                "test": "pnpm test:node",
                "test:e2e": "tsx tests/e2e/*.spec.ts -t",
                "test:node": "pnpm build:tests:node && NODE_ENV=test pnpm c8 mocha --require dotenv/config",
                "workflow": "pnpm build && pnpm build:tests:node && pnpm test",
                "lint": "eslint . --max-warnings 0 -c ../../eslint.config.cjs",
                "lint:fix": "eslint . --fix -c ../../eslint.config.cjs",
                "version": "tsx ../../scripts/version.ts server"
            },
            "_id": "@dcx-protocol/server@7.0.1",
            "_integrity": "sha512-sX7/xMlesij0TCThDlWB8NloZ6RUK6hRMVsedLBbQcv9pdXiavVuikov/yq90lraO4XOWNzyJaoMqhibS0ql4g==",
            "_resolved": "/private/var/folders/bg/6l4_nwrj6pg760rt_b_7bk9h0000gn/T/3111bc6f253eceea08c479aec156d0f9/dcx-protocol-server-7.0.1.tgz",
            "_from": "file:dcx-protocol-server-7.0.1.tgz",
            "_nodeVersion": "20.17.0",
            "_npmVersion": "10.8.2",
            "dist": {
                "integrity": "sha512-sX7/xMlesij0TCThDlWB8NloZ6RUK6hRMVsedLBbQcv9pdXiavVuikov/yq90lraO4XOWNzyJaoMqhibS0ql4g==",
                "shasum": "3a34d55ffc2cf508d4bdf6c083fed72172d02950",
                "tarball": "https://registry.npmjs.org/@dcx-protocol/server/-/server-7.0.1.tgz",
                "fileCount": 26,
                "unpackedSize": 102556,
                "signatures": [
                    {
                        "keyid": "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA",
                        "sig": "MEUCIQD6QtKNJh3SUcf2e+5TQl4SiDiZla2liHYVDVGpc6a8YAIgHCPb65hNJkXaoOWCSmR5IPFBP52vLERfh9LCuphAXKU="
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
                "tmp": "tmp/server_7.0.1_1725645917390_0.7481016480003624"
            },
            "_hasShrinkwrap": false
        }
    },
    "time": {
        "created": "2024-08-16T18:31:34.488Z",
        "modified": "2024-09-06T18:05:17.774Z",
        "0.0.1": "2024-08-16T18:31:35.349Z",
        "0.1.0": "2024-08-16T19:15:13.477Z",
        "0.1.1": "2024-08-16T20:40:05.861Z",
        "1.0.0": "2024-08-17T01:10:58.711Z",
        "1.1.0": "2024-08-17T01:42:44.066Z",
        "2.0.0": "2024-08-21T01:31:46.288Z",
        "0.3.1": "2024-08-21T04:45:41.966Z",
        "0.4.1": "2024-08-22T16:48:15.842Z",
        "0.5.0": "2024-08-23T03:46:26.600Z",
        "1.2.0": "2024-08-23T22:39:42.253Z",
        "1.3.0": "2024-08-26T21:41:12.813Z",
        "2.0.1": "2024-08-28T00:02:30.992Z",
        "3.0.0": "2024-08-28T00:18:14.981Z",
        "3.0.1": "2024-08-29T22:38:31.184Z",
        "5.0.1": "2024-08-29T22:44:02.581Z",
        "7.0.0": "2024-09-05T23:37:49.816Z",
        "7.0.1": "2024-09-06T18:05:17.559Z"
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
    "description": "DCX Server Implementation",
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
    "readme": "# @dcx-protocol/server\n\nDcx Server provides a pre-built server-like looping mechamism that runs the issuer side of the dcx protocol.\n- [`/packages/server/src/dcx-server.ts`](/packages/server/src/dcx-server.ts) core dcx server logic\n\n\n## Package Versions\n\n|                   package                      |                             npm                           |                               issues                            |                               prs                            |\n| ---------------------------------------------- | :-------------------------------------------------------: | :-------------------------------------------------------------: | :----------------------------------------------------------: |\n| [@dcx-protocol/server](/packages/server/)      | [![NPM Package][server-npm-badge]][server-npm-link]       | [![Open Issues][server-issues-badge]][server-issues-link]       | [![Open PRs][server-pulls-badge]][server-pulls-link]         |\n\n[server-npm-badge]: https://img.shields.io/npm/v/@dcx-protocol/server.svg?&color=green&santize=true\n[server-npm-link]: https://www.npmjs.com/package/@dcx-protocol/server\n[server-issues-badge]: https://img.shields.io/github/issues/TBD54566975/incubation-dcx/package:%20server?label=issues\n[server-issues-link]: https://github.com/TBD54566975/incubation-dcx/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+server%22\n[server-pulls-badge]: https://img.shields.io/github/issues-pr/TBD54566975/incubation-dcx/package%3A%20server?label=PRs\n[server-pulls-link]: https://github.com/TBD54566975/incubation-dcx/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+server%22\n",
    "readmeFilename": "README.md"
}