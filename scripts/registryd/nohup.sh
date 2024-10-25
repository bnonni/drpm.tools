#!/usr/bin/env bash

set -e

# If build missing, run build
if [[ ! -d "dist" ]]; then
    echo "Building registry ..."
    npm run build
fi

# If registry.pid file exists, read pid and set var
if [[ -f "./registry.pid" ]]; then
    echo "Found registry.pid file"
    REGISTRYD_PID="$(cat ./registry.pid 2>/dev/null)"
else
    echo "No registry.pid file found, starting registry ..."
    nohup node ./dist/esm/drg/server.js > ./registry.nohup.out 2>&1 &
    REGISTRYD_PID="$!"
    echo "$REGISTRYD_PID" > "./registry.pid"
fi

echo "Registry running on process id $REGISTRYD_PID"
