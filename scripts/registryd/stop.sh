#!/usr/bin/env bash

# Exit on error
set -e

# Set script variables
DRPM_REGISTRY_DIR=".drpm/registry"
DRPM_REGISTRYD_PID_FILE="$DRPM_REGISTRY_DIR/registry.pid"
DRPM_REGISTRYD_PNAME="registry.drpm.tools"
DRPM_REGISTRYD_PID=0

# Function to kill the registry process
kill_registryd_process() {
    [[ -z "$1" || "$1" -eq 0 ]] && echo "Invalid or missing PID" && exit 1
    echo "Killing registryd process PID=$1 ..."
    if kill -9 "$1" > /dev/null 2>&1; then
        rm -f "$DRPM_REGISTRYD_PID_FILE"
        echo "Successfully killed registryd process PID=$1"
    else
        echo "Failed to kill process $1"
        exit 1
    fi
}

# Function to find the registry process PID
find_registryd_pid() {
    if [[ -n "$1" ]]; then
        DRPM_REGISTRYD_PID="$1"
    elif [[ -s "$DRPM_REGISTRYD_PID_FILE" ]]; then
        DRPM_REGISTRYD_PID=$(< "$DRPM_REGISTRYD_PID_FILE")
    else
        DRPM_REGISTRYD_PID=$(pgrep -f "$DRPM_REGISTRYD_PNAME" || lsof -ti :2092 || echo 0)
    fi
}

# Call function to find the registry process PID
find_registryd_pid "$1"

# Check if process is running
if [[ "$DRPM_REGISTRYD_PID" -ne 0 ]]; then
    kill_registryd_process "$DRPM_REGISTRYD_PID"
else
    echo "No registry process found. To start the registry, run: 'npm run registryd:start'\n"
    exit 1
fi
