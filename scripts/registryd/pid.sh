#!/usr/bin/env bash

set -e

REGISTRYD_PID_FILE="registryd.pid"
REGISTRYD_HOSTNAME="local.drg.drpm.tools"

if [[ ! -f "$REGISTRYD_PID_FILE" ]]; then
    echo "No registry process file"
    touch "$REGISTRYD_PID_FILE"
fi

REGISTRYD_PID="$(cat $REGISTRYD_PID_FILE 2>/dev/null || pgrep -f $REGISTRYD_HOSTNAME || ps aux | grep $REGISTRYD_HOSTNAME | awk '{print $2}' || lsof -i :2092 | grep node | awk '{print $2}' || echo 0)"

if [[ "$REGISTRYD_PID" -ne 0 ]]; then
    echo "$REGISTRYD_PID" > "$REGISTRYD_PID_FILE"
    echo "$REGISTRYD_PID"
else
    echo "No registry process found"
fi