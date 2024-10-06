#!/usr/bin/env bash

NPMRC_FILE="$HOME/.npmrc"
DID_DHT_REGISTRY="@did:dht:registry=http://localhost:2092"
DID_WEB_REGISTRY="@did:web:registry=http://localhost:2092"

# Check and add the DID_DHT_REGISTRY line if it doesn't exist
if grep -qE "^@did:dht:registry=" "$NPMRC_FILE"; then
    echo "The @did:dht:registry line already exists. Skipping..."
else
    echo "\n$DID_DHT_REGISTRY" >> "$NPMRC_FILE"
    echo "@did:dht:registry line added to .npmrc."
fi

# Check and add the DID_WEB_REGISTRY line if it doesn't exist
if grep -qE "^@did:web:registry=" "$NPMRC_FILE"; then
    echo "The @did:web:registry line already exists. Skipping..."
else
    echo "\n$DID_WEB_REGISTRY" >> "$NPMRC_FILE"
    echo "@did:web:registry line added to .npmrc."
fi
