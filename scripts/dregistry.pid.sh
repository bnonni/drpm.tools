#!/usr/bin/env bash

set -e

REGISTRY_PID_FILE="registry.pid"
REGISTRY_PROCESS_NAME="registry.dpm.software"

if [[ ! -f "$REGISTRY_PID_FILE" ]]; then
    echo "No registry process file"
    touch "$REGISTRY_PID_FILE"
fi

REGISTRY_PID="$(cat $REGISTRY_PID_FILE 2>/dev/null || pgrep -f $REGISTRY_PROCESS_NAME || ps aux | grep $REGISTRY_PROCESS_NAME | awk '{print $2}' || lsof -i :2092 | grep node | awk '{print $2}' || echo 0)"

if [[ "$REGISTRY_PID" -ne 0 ]]; then
    echo "$REGISTRY_PID" > "$REGISTRY_PID_FILE"
    echo "$REGISTRY_PID"
else
    echo "No registry process found"
fi