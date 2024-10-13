# Decentralized Package Manager (DPM)

<img src="/assets/img/animal/wolf.webp" height=250 width=250 />

Decentralized Package Manager (DPM) - a package manager for the dWeb - like npm but decentralized.

## Summary

DPM is a package manager for interacting with decentralized packages (DPKs) published to Decentralized Web Nodes (DWNs). It leverages decentralized identifiers (DIDs) to lookup the DWN endpoint associated with that DID document and query DPKs stored at the `dpm` protocol path.

The goal of DPM is to decentralize package management putting control of the software in the hands of the users - not the manager. This ensures reliability by eliminating the possibility for broken links. With DPM, publishers write code to their DWNs and list it on [explorer.dpm.software](explorer.dpm.software).

Developers can discover packages here just like npmjs.com, except explorer.dpm.sofware does not store the code, only offers publishers the ability to list it for discovery. The publishers store the code in their own DWNs and users can query, download and keep a copy of that code as immutable an source in their own DWN. This forever eliminates the possiblity for brokens links or censorship.

Npmjs packages are published under usernames or organization names. Devs can publish packages directly to npmjs under the package name and organizations can have an organization username (such as `@web5`) with a list of packages that under that org name. This paradigm is well known and understood but has a limited namespace resulting in gatekeeping, sniping or squatting.

### NPM Namespace

* User [npmjs.com/~bnonni](https://npmjs.com/~bnonni)
* Organization: [npmjs.com/org/web5](https://npmjs.com/org/web5)
* Package: [npmjs.com/package/tool5](npmjs.com/package/tool5)

In DPM, packages are published to DWNs referenced by DIDs. Any entity can have a DID: user, org, device, etc. This unlimits the namespace and eliminates gatekeeping and censorship. DPM supports DHT method DIDs (for now). DOM resolves `did:dht` to the did document on the Mainline DHT network, which lists the dwn endpoints, and makes fetch requests to the DWN using the DMI to build DWN query URL.

### DPM Namespac

* dUser [did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo](https://nonni.org/.well-known/did)
* dOrganization [did:web:dpm.software](https://dpm.software/.well-known/did.json)
* dPackage [http://dpm/did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo^5.0.0](http://nonni.org/did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo/query?filter.tags.name=tool5&filter.tags.version=1.1.2)

## Decentralized Module Import (DMI)

* DMIs are used to import code from locally installed DPKs
* DPM diverts `npm install` to grab the dpk from the DWN and install it to the local `node_modules` folder
* Devs reference dpks like normal esm imports

```ts
import * as MyDPK from '@dpm/my-dpk';
const myDPK = require('@dpm/my-dpk');
```

## DPM Hook & Register

The DPM hook and register paradigm can be used to run one-off scripts without downloading the dpk into the node_modules folder. Check out [hooks.ts](/lib/hooks.ts) and [register.ts](/lib/register.ts).

```shell
npm run build
node --import ./dist/esm/src/register.js ./path/to/your/script.js
```

## DPM CLI

TODO

## DPM Dependencies

DPM reuses the `package.json` and `package-lock.json` files for easy integration of dpm to a dev workflow. The same principals apply: the entries in each will ensure version locking and integrity hashing. This approach guarantees that packages are always accessible and versioned securely, enabling a more resilient and trustworthy ecosystem for software distribution.

* Dependency entries for dpks in `package.json`

```json
{
    "dependencies": {
        "@dpm/my-dpk": "http://dpm/did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo^5.0.0"
    }
}
```

* With dpm installed and dpks listed in dependencies, `npm install` will divert the execution to a custom dpm registry running on `localhost:2092` to construct the DRL, query the DID doc, parse the DWN endpoints and request the dpk from the DWN
* To see the custom registry server, check out [/src/registry/index.ts](/src/registry/index.ts)
*
* Integrity hashes are produces using the dpk.tgz content.
* Integrity hashes ensure the publisher cannot swap out code under a specific verion in the protocol path.
* Once a release is published, it cannot be changed.

```ts
{
    "@dpm/my-dpk": {
        "version": "0.1.0",
        "resolved": "http://@dpm/my-dpk/did:dht:8w7ckznnw671az7nmkrd19ddctpj4spgt8sjqxkmnamdartxh1bo^0.1.0"
        "integrity": "sha512-x/AIjFIKRllrhcb48dqUNAAZl0ig9+qMuN91RpZo3Cb2+zuibfh+KISl6+kVVyktDz230JKc208UkQwwMqyB+w==/VNCYsUA==",
        "license": "Apache-2.0"
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
