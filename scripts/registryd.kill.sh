#!/usr/bin/env bash

set -e  # Exit immediately on any error

REGISTRY_PID_FILE="registry.pid"
REGISTRY_PROCESS_NAME="registry.dpm.software"

# Function to kill the registry process
kill_registry_process() {
    local PID="$1"
    
    if [[ -z "$PID" || "$PID" -eq 0 ]]; then
        echo "Invalid or missing PID"
        exit 1
    fi

    echo "Killing process with PID: $PID"
    
    # Attempt to kill the process
    if kill -9 "$PID" > /dev/null 2>&1; then
        echo "Successfully killed process $PID"
        unset REGISTRY_PID
        rm -f "$REGISTRY_PID_FILE"  # Remove the pid file
        touch "$REGISTRY_PID_FILE"   # Create a new empty pid file for future use
        exit 0
    else
        echo "Failed to kill process $PID"
        exit 1
    fi
}

# Function to find the registry process PID
find_registry_pid() {
    # Check if PID is provided as an argument
    if [[ -n "$1" ]]; then
        echo "Using provided PID: $1"
        REGISTRY_PID="$1"
    # Check if PID is in the environment
    elif [[ -n "$REGISTRY_PID" ]]; then
        echo "Using environment PID: $REGISTRY_PID"
        REGISTRY_PID="$REGISTRY_PID"
    # Search for PID in the registry.pid file
    elif [[ -f "$REGISTRY_PID_FILE" && -s "$REGISTRY_PID_FILE" ]]; then
        REGISTRY_PID="$(cat $REGISTRY_PID_FILE)"
    # Use other methods to find the PID (pgrep, lsof)
    else
        echo "Searching for PID via process name or port"
        REGISTRY_PID="$(pgrep -f $REGISTRY_PROCESS_NAME || ps aux | grep $REGISTRY_PROCESS_NAME | awk '{print $2}' || lsof -i :2092 | grep node | awk '{print $2}')"
    fi    
}

# Main script logic
if [[ "$#" -gt 1 ]]; then
    echo "Too many arguments provided. Usage: $0 [PID]"
    exit 1
fi

find_registry_pid "$1"

if [[ -n "$REGISTRY_PID" && "$REGISTRY_PID" -ne 0 ]]; then
    kill_registry_process "$REGISTRY_PID"
else
    echo "No registry process found"
    exit 1
fi
