# TAB Conf 6 Workshop

* Clone, install, build

```sh
git clone https://github.com/bnonni/drpm.tools && cd drpm.tools
npm install
npm run build
```

* Setup .npmrc

```sh
npm run tab:1-setup-npmrc

# Alternatives
# 1. Open `.npmrc` and copy + paste the lines into a `.npmrc` file at your `$HOME` dir.
# 2. Copy `.npmrc` to every `npm` project you want or need it in.
# 3. Setup aliases for `npm install` and `npm publish` either in each interactive shell or in your shell rc/profile (i.e. .bashrc, .zshrc, etc)
#     * `alias drpm-install='npm install --registry http://localhost:2092'`
#     * `alias drpm-publish='npm publish --registry http://localhost:2092'`
```

* Start DWN

```sh
npm run tab:2-start-dwn
```

* Create a did

```sh
npm run tab:3-create-did
```

* Configure DRPM protocol in DWN

```sh
npm run tab:4-configure-protocol
```

* Start DRPM Registry

```sh
npm run tab:5-start-registry
```

* Get your did `methodSpecificIdentifier`

```sh
npm run tab:6-get-did
# Alternative: Open `./.drpm/profile.json` and copy the did
```

* Create dpk1

```sh
mkdir dpk1
cd dpk1
npm init
npm install @web5/api @web5/dids @tbd54566975/dwn-sdk-js did-btc-sdk
```

* Configure dpk1

1. Open dpk1 in an IDE
2. Change package.json `"name": "dpk1"` to `"name": "@drpm/dpk1~<methodSpecificIdentifier>`
3. Create an `index.ts` file and add `console.log('Hello DRPM, from dpk1!');`

```sh
cd dpk1
npm publish
# Alternatives:
# npm publish --registry http://localhost:2092
# drpm-publish
```

* Checkout your newly published package record and package/release record via browser:

* Package record: `http://localhost:3000/did:dht:<insert-your-id>/read/protocols/aHR0cHM6Ly9kcnBtLnRvb2xzL3Byb3RvY29scy9kcnBt/package?filter.tags.name=@drpm/dpk1~<insert-your-id>`
* Package/release record: `http://localhost:3000/did:dht:<insert-your-id>/read/protocols/aHR0cHM6Ly9kcnBtLnRvb2xzL3Byb3RvY29scy9kcnBt/package/release?filter.tags.name=@drpm/dpk1~<insert-your-id>`

* Create dpk2

```sh
mkdir dpk2
cd dpk2
npm init
npm install @web5/api @web5/dids @tbd54566975/dwn-sdk-js did-btc-sdk
```

* Configure dpk2

1. Open dpk2 in an IDE
2. Change package.json `"name": "dpk2"` to `"name": "@drpm/dpk2~<methodSpecificIdentifier>`
3. Create an `index.ts` file and add `console.log('Hello DRPM, from dpk2!');`

* Install dpk1 into dpk2

```sh
cd dpk2
npm install `@drpm/dpk1~<methodSpecificIdentifier>`
# Alternatives:
# npm install --registry http://localhost:2092 `@drpm/dpk1~<methodSpecificIdentifier>`
# drpm-install `@drpm/dpk1~<methodSpecificIdentifier>`
```

* Publish dpk2

```sh
cd dpk2
npm publish
# Alternatives:
# npm publish --registry http://localhost:2092
# drpm-publish
```

* Congratulations! You published your first DPKs!
