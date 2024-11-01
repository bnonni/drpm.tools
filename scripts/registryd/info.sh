#!/usr/bin/env bash

# Exit on error
set -e

# Set script variables
DRPM_REGISTRY_DIR=".drpm/registry"
DRPM_REGISTRYD_PID_FILE="$DRPM_REGISTRY_DIR/registry.pid"
DRPM_REGISTRYD_PNAME="registry.drpm.tools"
DRPM_REGISTRYD_PID=$(pgrep -f "$DRPM_REGISTRYD_PNAME" || echo 0)

# Function to print registry information
print_registry_info() {
    echo "Registry Info\n-------------\nurl=http://localhost:2092\npid=$DRPM_REGISTRYD_PID\n"
}

# Check if process is running
if [[ "$DRPM_REGISTRYD_PID" -ne 0 ]]; then
    print_registry_info
    exit 0
fi

# Check if PID file exists and is non-empty, otherwise look up process by port
if [[ -s "$DRPM_REGISTRYD_PID_FILE" ]]; then
    DRPM_REGISTRYD_PID=$(< "$DRPM_REGISTRYD_PID_FILE")
else
    DRPM_REGISTRYD_PID=$(lsof -ti :2092 || echo 0)
fi

# Check if process is running
if [[ "$DRPM_REGISTRYD_PID" -eq 0 ]]; then
    echo "No registry process found!\n\nTo start the registry, run: 'npm run registryd:start'\n"
    exit 1
fi

print_registry_info
exit 0
