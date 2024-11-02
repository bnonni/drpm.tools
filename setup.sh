#!/bin/bash

# Set directories and file paths based on the operating system
DRPM_DIR="drpm"
CONFIG_DRPM_DIR=""

if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    CONFIG_DRPM_DIR="${APPDATA:-$HOME/AppData/Roaming}/$DRPM_DIR"
else
    CONFIG_DRPM_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/$DRPM_DIR"
fi

DRPM_REGISTRYPID_FILE="$CONFIG_DRPM_DIR/registry.pid"
DRPM_REGISTRY_OUT_FILE="$CONFIG_DRPM_DIR/registry.out"
DRPM_PROFILE="$CONFIG_DRPM_DIR/profile.json"
DRPM_VERSION_FILE="$CONFIG_DRPM_DIR/.version"

# Ensure CONFIG_DRPM_DIR exists
if [[ ! -d "$CONFIG_DRPM_DIR" ]]; then
    mkdir -p "$CONFIG_DRPM_DIR"
    echo "DRPM config created ($CONFIG_DRPM_DIR)"
fi

# Ensure DRPM_REGISTRYPID_FILE exists
if [[ ! -f "$DRPM_REGISTRYPID_FILE" ]]; then
    touch "$DRPM_REGISTRYPID_FILE"
    echo "DRPM registry.pid created: $DRPM_REGISTRYPID_FILE"
fi

# Ensure DRPM_REGISTRY_OUT_FILE exists
if [[ ! -f "$DRPM_REGISTRY_OUT_FILE" ]]; then
    touch "$DRPM_REGISTRY_OUT_FILE"
    echo "DRPM registry.out created: $DRPM_REGISTRY_OUT_FILE"
fi

# Ensure DRPM_VERSION_FILE exists
if [[ ! -f "$DRPM_VERSION_FILE" ]]; then
    VERSION=$(jq -r '.version' package.json || echo "4.2.3")
    echo "$VERSION" >> "$DRPM_VERSION_FILE"
    echo "DRPM .version created: $DRPM_VERSION_FILE"
fi

# Ensure DRPM_PROFILE exists, and create it with default JSON content if it doesn’t
if [[ ! -f "$DRPM_PROFILE" ]]; then
    cat << EOF > "$DRPM_PROFILE"
{
    "current": null,
    "dht": {
        "did": "",
        "dwnEndpoints": [],
        "web5DataPath": "",
        "password": "",
        "recoveryPhrase": ""
    },
    "web": {
        "did": "",
        "dwnEndpoints": [],
        "web5DataPath": "",
        "password": "",
        "recoveryPhrase": ""
    },
    "btc": {
        "did": "",
        "dwnEndpoints": [],
        "web5DataPath": "",
        "password": "",
        "recoveryPhrase": ""
    }
}
EOF
    echo "DRPM profile.json created: $DRPM_PROFILE"
fi

echo "DRPM Setup Complete!"
