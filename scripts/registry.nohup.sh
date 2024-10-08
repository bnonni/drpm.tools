#!/usr/bin/env bash

set -e

REGISTRY_PID_FILE="registry.pid"
REGISTRY_PID="$(cat \"$REGISTRY_PID_FILE\" 2>/dev/null || echo 0)"

if [[ ! -d "dist" ]]; then
    echo "Building registry ..."
    npm run build
fi

if [[ $REGISTRY_PID -eq 0 ]]; then
    echo "Starting registry ..."
    nohup node ./dist/esm/registry/bin/www.js > registry.nohup.out 2>&1 &
    echo "$!" > registry.pid
    export REGISTRY_PID="$(cat \"$REGISTRY_PID_FILE\" 2>/dev/null || pgrep -f \"registry.dpm.software\" || lsof -i :2902 || ps aux | grep "registry.dpm.software" | awk '{print $2}' || echo 0)"
fi
echo "Registry running on process id $REGISTRY_PID"
exit 1