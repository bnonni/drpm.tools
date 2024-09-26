# Decentralized Package Manager (DPM)

<img src="/docs/img/logo/tan/profile.webp" height=250 width=250 />

Decentralized Package Manager (DPM) - a package manager for the dWeb - like npm but decentralized.

## Summary

DPM is a package manager for interacting with decentralized packages (DPKs) published to Decentralized Web Nodes (DWNs). It leverages decentralized identifiers (DIDs) to lookup the DWN endpoint associated with that DID document and query DPKs stored at the `dpm` protocol path.

The goal of DPM is to decentralize package management putting control of the software in the hands of the users - not the manager. This ensures reliability by eliminating the possibility for broken links. With DPM, publishers write code to their DWNs and list it on [explorer.dpm.software](explorer.dpm.software).

Developers can discover packages here just like npmjs.com, except explorer.dpm.sofware does not store the code, only offers publishers the ability to list it for discovery. The publishers store the code in their own DWNs and users can query, download and keep a copy of that code as immutable an source in their own DWN. This forever eliminates the possiblity for brokens links or censorship.

Npmjs packages are published under usernames or organization names. Devs can publish packages directly to npmjs under the package name and organizations can have an organization username (such as `@web5`) with a list of packages that under that org name. This paradigm is well known and understood but has a limited namespace resulting in gatekeeping, sniping or squatting.

* NPMJS User [npmjs.com/~bnonni](https://npmjs.com/~bnonni)
* Organization: [npmjs.com/org/web5](https://npmjs.com/org/web5)
* Package: [npmjs.com/package/tool5](npmjs.com/package/tool5)

In DPM, packages are published and listed under DIDs. Any entity can have a DID: user, org, device, etc. This unlimits the namespace and eliminates gatekeeping and censorship. DPM supports DHT method DIDs (for now). DOM resolves `did:dht` to the did document on the Mainline DHT network, which lists the dwn endpoints, and makes fetch requests to the DWN using the DMI to build DWN query URL.

## Decentralized Module Import (DMI)

* DMIs are used in the codebase to import code from DWNs
* At install time, DPM uses the node `--import` CLI flag to intercept the module loading and query for the code
* The interception is done by adding `--import /path/to/register-dpm-hooks.js` to the global `NODE_OPTIONS` env var
* DPM installs the code from the DWN to the local `node_modules` folder
* Devs reference this code normal esm imports referencing the did of the publisher in the path, e.g.

```ts
import * as Web5Api from 'did:dht:@web5/api/0.0.1';
const web5Api = require('did:dht:@web5/api/0.0.1');
```

## DPM Loader

Check out [dpm.ts](/src/dpm.ts) and [register.ts](/src/register.ts).

## Lockfile

DPM uses the `package-lock.json` file contains the `DRL@hashed-dwn-record-content` to ensure the integrity of the software being installed. This approach guarantees that packages are always accessible and versioned securely, enabling a more resilient and trustworthy ecosystem for software distribution.

* After install, dpm will produce a file called `dpm.lock`.
* The lockfile functions like a packge-lock.json: it locks each particular package to the specified version.
* It contains all the converted DMIs in the form of DRLs with integrity hashes unique to each version.
* The integrity hashes are the hash of the actual dwn record content (i.e. the code itself) returned from the query.
* This is done to ensure the publisher cannot swap out code under a specific verion in the protocol path.
* E.g. `DMI` => `did:dht:web5/package/api/0.0.1` => `https://dwn.nonni.org/did:dht:web5/protocols/dpm/package/api/0.0.1`

```ts
{
    "did:dht:bnonni/package/dpm/0.0.1": {
        "version": "0.0.1",
        "resolved": "https://dwn.nonni.org/did:dht:bnonni/protocols/dpm/package/dpm/0.0.1",
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
