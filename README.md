# Decentralized Registry Package Manager

<img src="/assets/img/animal/wolf.webp" height=250 width=250 />

Decentralized Registry Package Manager - npm for the DWeb. Publish a Decentralized Package to your Decentralized Web Node using DRPM!

## Table of Contents

- [Vocabulary](#vocabulary)
  - [Web5 Vocab](#web5-vocab)
  - [DRPM Vocab](#drpm-vocab)
  - [Other Vocab](#other-vocab)
- [Summary](#summary)
- [Goals](#goals)
- [Usage](#usage)
- [Details](#details)
  - [Namespace](#namespace)
  - [DID Methods](#did-methods)
  - [NPM Compatible](#npm-compatible)
  - [Runtime (Register/Hooks)](#runtime-registerhooks)
- [Tools](#tools)
  - [Decentralized Registry (DRG)](#decentralized-registry-drg)
  - [Decentralized Package Manager (DPM)](#decentralized-package-manager-dpm)
  - [Dependencies](#dependencies)
  - [Decentralized Package Import](#decentralized-package-import-dpi)
- [Project Resources](#project-resources)

## Vocabulary

Acronyms galore! But what does it all mean!?

### Web5 Vocab

- DID = Decentralized Identifier
- DWN = Decentralized Web Node
- DWA = Decentralized Web App

### DRPM Vocab

- DRG = Decentralized Registry
- DPK = Decentralized Package
- DPM = Decentralized Package Manager
- DRPM = Decentralized Registry Package Manager
- DMI = Decentralized Module Import
- DPI = Decentralized Package Import (alt name for DMI)

### Other Vocab

- NPK = Node Package
- NPM = Node Package Manager

## Summary

DRPM is a set of tools using DIDs to publish, install, and interact with DPKs published to a DWN. Every DID created has a DID Document containing relevant information for how to interact with that DID.

In the case of DRPM, we are leveraging the `serverhe DID listed against the DPK to lookup the DID document using the DID method (which defines where the DID doc was stored, i.e.  which decentralized storage network).

DRPM support two DID methods: DHT and WEB. The DID doc contains a "server" key containing as its value a list of objects. Each object defines a service available to that DID. In the case of DRPM, the service used is the DecentralizedWebNode service.

This service object will contain a DWN endpoint. This endpoint is used to query the DWN for the DPK in question, which is stored using the DRPM DWN protocol. To view the protocol rules, checkout out [drpm.tools/protocols/drpm](https://drpm.tools/protocols/drpm).

## Goals

The goal of DRPM is to decentralize package management putting control of the software in the hands of the users - not the manager. This ensures reliability by eliminating the possibility for broken links. With DRPM, publishers write code to their DWNs and list it on [explorer.drpm.tools](https://explorer.drpm.tools).

Developers can discover packages here just like npmjs.com, except explorer.drpm.sofware does not store the code, only offers publishers the ability to list it for discovery. The publishers store the code in their own DWNs and users can query, download and keep a copy of that code as immutable an source in their own DWN. This forever eliminates the possiblity for brokens links or censorship.

Npmjs packages are published under usernames or organization names. Devs can publish packages directly to npmjs under the package name and organizations can have an organization username (such as `@web5`) with a list of packages that under that org name. This paradigm is well known and understood but has a limited namespace resulting in gatekeeping, sniping or squatting.

## Usage

To use DRPM, pick a mode below and follow the steps.

### Quick Mode

1. Create a new dpk project using the `npx` cli and open it in an IDE (**note**: `code` command for VSCode users only).
2. Create a new profile (see `npx dpm help` for details).
3. Make sure the required `.drpm_profile` details set (see `$HOME/.drpm/.drpm_profile`). (**note**: required information in `.drpm_profile` includes `"did"`, `"password"`, `"dwnEndpoint"`)
4. Publish `my-dpk` using the dpm cli
5. Edit the code, bump the version and re-publish `my-dpk`

```sh
npx create-dpk my-dpk
code my-dpk
npx dpm profile create
npx dpm publish
# change some code in index.ts then run
npm version patch && npx dpm publish
```

### Details Mode

1. Install `drpm` globally: `npm i -g drpm`
2. Or install `drpm` to an existing project: `npm i --save drpm`
3. On `postinstall`, drpm should setup the local env and the registry server. (**note**: make sure its running by visiting `http://localhost:2092`)
4. Use the `dpm` cli to create a profile: `dpm profile create`
5. Use dpm cli to init a new dpk: `dpm init my-dpk`
6. Use the `dpm` cli to publish to your DWN: `dpm publish package /path/to/package`
7. Run `npm install @drpm/my-dpk~yourId`
8. Open package.json and inspect the dependencies object for that package name and version

```sh
npm i -g drpm
open -a 'Brave Browser' http://localhost:2092 # mac only command using brave browser
dpm profile create
dpm init my-dpk
cd my-dpk
dpm publish package
dpm init ../new-dpk && cd ../new-dpk
dpm profile get -d # outputs your did (e.g. did:dht:tqa1ep34zbg3kwrt89irbj6sib333ps1ued5frwbug39meq3a4oy)
npm install @drpm/my-dpk~tqa1ep34zbg3kwrt89irbj6sib333ps1ued5frwbug39meq3a4oy
```

## Details

The below sections outline various details differntiating DRPM, explaining how it works and why its an improvement on the current centralized soltutions.

### Namespace

In DRPM, packages are published to DWNs referenced by DIDs. Any entity can have a DID: user, org, device, etc. This unlimits the namespace and eliminates gatekeeping and censorship.

- NPM User [npmjs.com/~bnonni](https://npmjs.com/~bnonni)
- NPM Organization: [npmjs.com/org/web5](https://npmjs.com/org/web5)
- NPM Package: [npmjs.com/package/tool5](npmjs.com/package/tool5)

- DRPM User [did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo](https://nonni.org/.well-known/did)
- DRPM Organization [did:web:drpm.tools](https://drpm.tools/.well-known/did)
- DRPM Package [@drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo](http://nonni.org/did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo/query?filter.tags.name=tool5&filter.tags.version=1.1.2)

### DID Methods

DRPM only supports 3 DID Methods "out-of-the-box". If you want a method included, please feel free to open an issue and corresponding PR.

1. [`did:dht`](https://did-dht.com/) = Uses BitTorrent / Mainline DHT
2. [`did:web`](https://w3c-ccg.github.io/did-method-web/) = Uses DNS and web servers
3. [`did:btc`](https://microstrategy.github.io/did-btc-spec/) = Uses Bitcoin (Coming Soon!)

If no DID method is included, DRPM assumes `dht`. Otherwise, you should list the correct DID method should dependency name in package.json using this general format:

```json
{
    "@drpm/packageName~didMethod~methodSpecificId": "[p]M.m.p"
}
```

Examples of each above listed did method (dht, web and btc):

```json
{
    "@drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo": "^2.1.2",
    "@drpm/react~web~dwn.nonni.org": "^18.3.1",
    "@drpm/next~btc~xg4x-ay5y-q5zq-232": "^2.1.2"
}
```

**How does DRPM lookup packages?**

Using the DID Method (method) and Method Specific Idetifier (method id) listed in the dependency object in package.json. By passing the listed method to a Universal Resolver, DRPM can lookup any id on the corresponding method storage network.

Resolving the id yields the DID Document for that id located on the method network. If that DID Document includes a `service` field with a DWN object, DRPM can use the endpoint listed to make REST API calls to the DWN endpoint to retrieve packages.

Example DID Document

```json
{
  "id": "did:dht:tqa1ep34zbg3kwrt89irbj6sib333ps1ued5frwbug39meq3a4oy",
  "verificationMethod": [
    {
      "id": "did:dht:tqa1ep34zbg3kwrt89irbj6sib333ps1ued5frwbug39meq3a4oy#0",
      "type": "JsonWebKey",
      "controller": "did:dht:tqa1ep34zbg3kwrt89irbj6sib333ps1ued5frwbug39meq3a4oy",
      "publicKeyJwk": {
        "crv": "Ed25519",
        "kty": "OKP",
        "x": "i7EkNzq4TZVQkT_qQKfWqHOcttKaB7KSgZmz9aHZxqA",
        "kid": "Ca7pHOF9jtaQ61vuTSgWqZalEWIJJbeixVjfmS6mKOQ",
        "alg": "EdDSA"
      }
    }
  ],
  "authentication": [
    "did:dht:tqa1ep34zbg3kwrt89irbj6sib333ps1ued5frwbug39meq3a4oy#0"
  ],
  "assertionMethod": [
    "did:dht:tqa1ep34zbg3kwrt89irbj6sib333ps1ued5frwbug39meq3a4oy#0"
  ],
  "capabilityDelegation": [
    "did:dht:tqa1ep34zbg3kwrt89irbj6sib333ps1ued5frwbug39meq3a4oy#0"
  ],
  "capabilityInvocation": [
    "did:dht:tqa1ep34zbg3kwrt89irbj6sib333ps1ued5frwbug39meq3a4oy#0"
  ],
  "service": [
    {
      "id": "did:dht:tqa1ep34zbg3kwrt89irbj6sib333ps1ued5frwbug39meq3a4oy",
      "type": "DecentralizedWebNode",
      "serviceEndpoint": [
        "https://dwn.example.org/"
      ],
      "enc": "#enc",
      "sig": "#sig"
    }
  ]
}
```

### NPM Compatible

DRPM leverages the existing `npm` cli took to achieve all of this eliminating the need for developers to adopt a whole new cli took and new dev workflow.

**How does DRPM highjack the NPM flow?***

On `npm install`, npm sees `@drpm` in `.npmrc` and redirects the GET requests from the defaul registry at `registry.npmjs.org` to a localhost registry server. Npm structures the request based on the left-hand-side name in the dependency object and forms a GET URL using it (e.g. `http://localhost:2092/@drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo`). The server routes are setup to capture this request, parse the path params and construct the needed info to find the DWN and fetch the package.

The method (or implied method) after name and before `~` is the network to use to lookup to specific id at the end of the `~`. If no method is passed, the local server assumes dht. Think of it the method (e.g. `dht`) answers "in what general direction should I look?" (e.g. look in Atlanta, GA) and the id answers "where specifically in that direction should I look?" (look at 123 Main Street Apt 1, Atlanta GA 30308).

### Runtime (Register/Hooks)

The DRPM register hooks paradigm can be used to run one-off scripts without downloading the DPK into the `node_modules` folder. Check out [hooks.ts](/lib/hooks.ts) and [register.ts](/lib/register.ts)

```shell
npm run build
node --import ./dist/esm/src/register.js ./path/to/your/script.js
```

## Tools

Below are sections outlining the tools included in this repo as part of DRPM.

### Decentralized Registry (DRG)

TODO

### Decentralized Package Manager (DPM)

Coming Soon! See Issue [#24](https://github.com/bnonni/drpm.tools/issues/24).

### Decentralized Package Import (DPI)

DPIs (or DMIs) are used to import code from locally installed DPKs

Example import

```ts
import express from '@drpm/express~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo';
```

Example require

```js
const express = require('@drpm/express~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo');
```

### Dependencies

DRPM reuses the `package.json` and `package-lock.json` files for easy integration to the normal `npm` dev env. The same principals apply: the entries in each file ensure version locking and integrity hashing. This approach guarantees that packages are always accessible and versioned securely, enabling a more resilient and trustworthy ecosystem for software distribution

- DRPM intercepts `npm install` and redirects the GET calls to a registry running on `localhost:2092`
- This registry is a simple express server mimicing the paths used by npm to `GET` pacakges from `registry.npmjs.org`
- The express server parses API url path to construct a DRL (Decentralized Resource Locator)
- DRPM requests the DPK from the DWN found in the DID doc assocaigted with the DID from the dependency version string
- The registry server installs the DPK metadata and tarball into a local folder called `.registry` and passes the path to the tarball back to the `npm install` cli call
- From there, `npm` handles the rest normally installing the tarball into `node_modules` under `@drg/{packageName}/{version}`
- Integrity hashes are produced using the DPK.tgz content ensuring the publisher cannot swap out code under a specific verion in the protocol path.
- Additionally, DRPM allows developers to republish the code pulled from the remote DWN to their own DWN forever allowing them to secure an immutable copy
- Once a release is published and copied to your own DWN, it can only be changed by the DWN owner.
- To see the custom registry server, check out [/src/registry/index.ts](/src/registry/index.ts)
- See below for examples entries in `package.json` and `package-lock.json`

Example package.json

```json
{
    "dependencies": {
        "@drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo": "^6.1.0",
        "@drpm/express~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo": "^4.21.1", 
        "@drpm/react~web~dwn.nonni.org": "^18.3.1", // Example of did:web
        "@drpm/next~btc~xg4x-ay5y-q5zq-232": "^2.1.1", // Example of did:btc
    }
}
```

Example package-lock.json

```json
{
    "@drpm/express~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo": {
        "version": "4.21.1",
        "resolved": "",
        "integrity": "",
        "license": ""
    },
    "@drpm/tool5~8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo": {
        "version": "6.1.0",
        "resolved": "",
        "integrity": "",
        "license": ""
    },
    "@drpm/react~web~dwn.nonni.org": {
        "version": "0.1.0",
        "resolved": "",
        "integrity": "",
        "license": ""
    },
    "@drpm/next~btc~xg4x-ay5y-q5zq-232": {
        "version": "0.1.0",
        "resolved": "",
        "integrity": "",
        "license": ""
    }
}
```

## Project Resources

| Resource                                   | Description                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| [CODEOWNERS](./CODEOWNERS)                 | Outlines the project lead(s)                                                   |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | Expected behavior for project contributors, promoting a welcoming environment |
| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Developer guide to build, test, run, access CI, chat, discuss, file issues     |
| [GOVERNANCE.md](./GOVERNANCE.md)           | Project governance                                                             |
| [LICENSE](./LICENSE)                       | [![Apache License 2.0][apache-license-badge]][apache-license-link]            |

[apache-license-badge]: https://img.shields.io/badge/license-Apache%202.0-blue.svg
[apache-license-link]: https://opensource.org/licenses/Apache-2.0
