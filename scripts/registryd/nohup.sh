#!/usr/bin/env bash

set -e

REGISTRYD_PID=0
REGISTRYD_PID_FILE="registry.pid"

# If build missing, run build
if [[ ! -d "dist" ]]; then
    echo "Building registry ..."
    npm run build
fi

# If registry.pid file exists, read pid and set var
if [[ -f "$REGISTRYD_PID_FILE" ]]; then
    echo "Found registry.pid file"
    REGISTRYD_PID="$(cat $REGISTRYD_PID_FILE 2>/dev/null)"
else
    echo "No registry.pid file found, starting registry ..."
    nohup node ./dist/esm/registry/bin/www.js > registry.nohup.out 2>&1 &
    REGISTRYD_PID="$!"
    echo "$REGISTRYD_PID" > "registry.pid"
fi

echo "Registry running on process id $REGISTRYD_PID"
