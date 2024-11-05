# Demo

Demo flow for DIF Hackathon 2024.

## Flow

* Explain DRPM profiles and difference between profile & context.
* Explain long term goals: supports DHT by default, WEB + BTC next, then any did method.
* Demo new profile creation.

```sh
drpml profile create -e https://dwn.nonni.dev/
```

* Demo ability to list different profile contexts.

```sh
drpml profile list
```

* Demo ability to switch between different profile contexts via CLI.

```sh
drpml profile switch
```

* Explain DRPM protocol and CLI configure tool.
* Demo protocol configure via CLI.

```sh
drpml protocol configure
```

* Explain confirming successful configure with query.
* Demo protocol query via CLI.

```sh
drpml protocol query
```

* Explain DRPM Registry, npm hook calls, how DRG works, etc.
* Demo registry start via CLI.

```sh
drpml registry start
```

* Explain prior setup of 2 example DPKs, DRPM naming convention @drpm/name~{method}~id and .npmrc.
* Demo setting the "name" to convention and publishing to DRG.

```sh
npm publish
```

* Explain what is happening on DRG backend.
* Demo using DRL in browser to retrieve and test record creation.

```sh
https://dwn.nonni.dev
    /did:dht:<id>
    /read
    /protocols
    /aHR0cHM6Ly9kcnBtLnRvb2xzL3Byb3RvY29scy9kcnBt
    /package
        ?filter.tags.name=@drpm/dpk1~<id>
```

[dpk1 package record](https://dwn.nonni.dev/did:dht:1zrzpopppjipiybsnoehnuzewbyb9erzb5wuuthyedzk8qae3eey/read/protocols/aHR0cHM6Ly9kcnBtLnRvb2xzL3Byb3RvY29scy9kcnBt/package?filter.tags.name=@drpm/dpk1~1zrzpopppjipiybsnoehnuzewbyb9erzb5wuuthyedzk8qae3eey)

* Explain what is happening on DRG backend.
* Demo using DRL in browser to retrieve and test record creation.

```sh
https://dwn.nonni.dev
    /did:dht:<id>
    /read
    /protocols
    /aHR0cHM6Ly9kcnBtLnRvb2xzL3Byb3RvY29scy9kcnBt
    /package
    /release
        ?filter.tags.name=@drpm/dpk1~<id>
        &filter.tags.version=1.0.0
```

[dpk1 release record](https://dwn.nonni.dev/did:dht:1zrzpopppjipiybsnoehnuzewbyb9erzb5wuuthyedzk8qae3eey/read/protocols/aHR0cHM6Ly9kcnBtLnRvb2xzL3Byb3RvY29scy9kcnBt/package/release?filter.tags.name=@drpm/dpk1~1zrzpopppjipiybsnoehnuzewbyb9erzb5wuuthyedzk8qae3eey&filter.tags.version=1.0.0)

* Explain different npm install flows (named dep vs. manual deps).
* Demo named dep install and explain what happens.

```sh
cd ../dpk2
npm install @drpm/dpk1~1zrzpopppjipiybsnoehnuzewbyb9erzb5wuuthyedzk8qae3eey
```

```json
{
    "dependencies": {
        "@drpm/dpk1~rf65muxzdyatcf3npbj8pyepucu8ezy5pmm9o7d4gie8aejy7f5o": "1.0.0"
    }
}
```

```sh
npm install
```
