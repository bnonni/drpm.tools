#!/usr/bin/env bash

# Exit on error
set -e

# Set script variables
DRPM_REGISTRYD_FORCE_RESTART=false
DRPM_REGISTRY_DIR=".drpm"
DRPM_REGISTRYD_PID_FILE="$DRPM_REGISTRY_DIR/registry.pid"
DRPM_REGISTRYD_PNAME="registry.drpm.tools"
DRPM_REGISTRYD_PID=$(pgrep -f "$DRPM_REGISTRYD_PNAME" || echo 0)

# Function to start the registry
start_registry() {
    nohup node ./dist/esm/registry/server.js > $DRPM_REGISTRY_DIR/nohup.out 2>&1 &
    echo "$!" > "$DRPM_REGISTRYD_PID_FILE"
}

# Function to stop the registry
stop_registry() {
    kill -9 "$DRPM_REGISTRYD_PID"
    rm -f "$DRPM_REGISTRYD_PID_FILE"
}

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case "$1" in
        -f|--force) DRPM_REGISTRYD_FORCE_RESTART=true; shift ;;
        *) echo "Unknown option: $1\n"; exit 1 ;;
    esac
done

# Build if missing
[[ ! -d "dist" ]] && echo "Building registry ...\n" && npm run build

# Start, restart, or skip if running
if [[ "$DRPM_REGISTRYD_PID" -eq 0 ]]; then
    echo "Starting registry ..."
    start_registry
    echo "Registry started!\n"
elif $DRPM_REGISTRYD_FORCE_RESTART; then
    echo "Restarting registry ..."
    stop_registry
    start_registry
    echo "Registry restarted!\n"
else
    echo "Registry is already running!\n"
fi

echo "Registry Info\n-------------\nurl=http://localhost:2092\npid=$(< "$DRPM_REGISTRYD_PID_FILE")\n"
exit 0
