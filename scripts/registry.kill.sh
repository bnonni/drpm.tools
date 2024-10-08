#!/usr/bin/env bash

set -e

REGISTRY_PID_FILE="registry.pid"
REGISTRY_PID="$(cat \"$REGISTRY_PID_FILE\" 2>/dev/null || pgrep -f \"registry.dpm.software\" || lsof -i :2902 || ps aux | grep "registry.dpm.software" | awk '{print $2}' || echo 0)"

if [[ $REGISTRY_PID -ne 0 ]]; then
    echo "Killing registry pid=$REGISTRY_PID ..."
    kill -9 "$REGISTRY_PID"
    unset REGISTRY_PID
    rm registry.pid && touch registry.pid
fi
echo "Killed registry process"
exit 0