#!/usr/bin/env bash

set -e  # Exit immediately on any error

DRPM_REGISTRYD_PID_FILE="registryd.pid"
DRG_HOSTNAME="registry.drpm.tools"

# Function to kill the registry process
kill_registryd_process() {
    local PID="$1"
    
    if [[ -z "$PID" || "$PID" -eq 0 ]]; then
        echo "Invalid or missing PID"
        exit 1
    fi

    echo "Killing process with PID: $PID"
    
    # Attempt to kill the process
    if kill -9 "$PID" > /dev/null 2>&1; then
        echo "Successfully killed process $PID"
        unset DRPM_REGISTRYD_PID
        rm -f "$DRPM_REGISTRYD_PID_FILE"  # Remove the pid file
        touch "$DRPM_REGISTRYD_PID_FILE"   # Create a new empty pid file for future use
        exit 0
    else
        echo "Failed to kill process $PID"
        exit 1
    fi
}

# Function to find the registry process PID
find_registryd_pid() {
    # Check if PID is provided as an argument
    if [[ -n "$1" ]]; then
        echo "Using provided PID: $1"
        DRPM_REGISTRYD_PID="$1"
    # Check if PID is in the environment
    elif [[ -n "$DRPM_REGISTRYD_PID" ]]; then
        echo "Using environment PID: $DRPM_REGISTRYD_PID"
        DRPM_REGISTRYD_PID="$DRPM_REGISTRYD_PID"
    # Search for PID in the registry.pid file
    elif [[ -f "$DRPM_REGISTRYD_PID_FILE" && -s "$DRPM_REGISTRYD_PID_FILE" ]]; then
        DRPM_REGISTRYD_PID="$(cat $DRPM_REGISTRYD_PID_FILE)"
    # Use other methods to find the PID (pgrep, lsof)
    else
        echo "Searching for PID via process name or port"
        DRPM_REGISTRYD_PID="$(pgrep -f $DRG_HOSTNAME || ps aux | grep $DRG_HOSTNAME | awk '{print $2}' || lsof -i :2092 | grep node | awk '{print $2}')"
    fi    
}

# Main script logic
if [[ "$#" -gt 1 ]]; then
    echo "Too many arguments provided. Usage: $0 [PID]"
    exit 1
fi

find_registryd_pid "$1"

if [[ -n "$DRPM_REGISTRYD_PID" && "$DRPM_REGISTRYD_PID" -ne 0 ]]; then
    kill_registryd_process "$DRPM_REGISTRYD_PID"
else
    echo "No registry process found"
    exit 1
fi
