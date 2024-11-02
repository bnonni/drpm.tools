# Usage

DRPM is intended to be used for installing or publishing DPKs. Before using DRPM to install or publish DPKs, follow one of the processes in [SETUP.md](/docs/SETUP.md).

## Table of Contents

* [Install DPK(s)](#install-dpks)
  * [package.json dependencies](#packagejson-dependencies)
  * [npm cli](#npm-cli)
* [Publish DPK(s)](#publish-dpks)

## Install DPK(s)

### package.json dependencies

Steps to install a DPK to an existing npm project using package.json deps.

* Ensure the local registry server is running on port 2092 (visit <http://localhost:2092>)
* Manually add the package name to package.json dependencies

```json
{
  "dependencies": {
    "@drpm/packageName~methodSpecificId": "[prefix]M.m.p"
  }
}
```

* Run `npm install`

### npm cli

Steps to install a DPK to an existing npm project using the npm cli.

* Ensure the local registry server is running on port 2092 (visit <http://localhost:2092>)
* Run the following from the root of your npm project

```sh
npm install @drpm/packageName~methodSpecificId # if using dht
npm install @drpm/packageName~method~methodSpecificId # if not using dht
```

* Alternatively, you can use one of the below commands based on need

```sh
npm install --registry=localhost:2092 packageName~methodSpecificId # if using dht
npm install --registry=localhost:2092 packageName~method~methodSpecificId # if not using dht
```

## Publish DPK(s)

COMING SOON!
