#!/usr/bin/env bash

set -e

# If build missing, run build
if [[ ! -d "dist" ]]; then
    echo "Building registry ..."
    npm run build
fi

# If registry.pid file exists, read pid and set var
if [[ -f "$REGISTRYD_PID_FILE" || -f "$HOME/.drpm/registry/registry.pid" ]]; then
    echo "Found registry.pid file"
    REGISTRYD_PID="$(cat $REGISTRYD_PID_FILE 2>/dev/null)"
else
    echo "No registry.pid file found, starting registry ..."
    nohup node node ./dist/esm/drg/server.js > $HOME/.drpm/registry/registry.nohup.out 2>&1 &
    REGISTRYD_PID="$!"
    echo "$REGISTRYD_PID" > "$HOME/.drpm/registry/registry.pid"
fi

echo "Registry running on process id $REGISTRYD_PID"
