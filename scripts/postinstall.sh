#!/usr/bin/env bash

set -e # Exit on error

# Initialize flags
FORCE=false
LOCAL=false
GLOBAL=false

# Directories and files
DPM_HOME="$HOME/.dpm"
NPMRC=".npmrc"
GLOBAL_NPMRC="$HOME/$NPMRC"
LOCAL_NPMRC="$PWD/$NPMRC"
NPMRC_FILES=("$GLOBAL_NPMRC" "$LOCAL_NPMRC")

# Registries and prefixes
REGISTRY="http://localhost:2092"
PREFIXES=("@did:registry=$REGISTRY" "@dpm:registry=$REGISTRY" "@dpk:registry=$REGISTRY" "@dht:registry=$REGISTRY" "@dweb:registry=$REGISTRY")
MISSING_PREFIXES=()

# Create the DPM home directory if it doesn't exist
[[ ! -d "$DPM_HOME" ]] && mkdir "$DPM_HOME"

# Function to back up a file if it exists
backup_file() {
    local FILE_TO_BACKUP="$1"
    if [[ -f "$FILE_TO_BACKUP" ]]; then
        echo "Backing up $FILE_TO_BACKUP to $DPM_HOME/$(basename "$FILE_TO_BACKUP").bak"
        cp "$FILE_TO_BACKUP" "$DPM_HOME/$(basename "$FILE_TO_BACKUP").bak"
    fi
}

# Function to ensure an `.npmrc` file exists
ensure_npmrc_exists() {
    local NPMRC_FILE="$1"
    if [[ ! -f "$NPMRC_FILE" ]]; then
        echo "Creating .npmrc ..."
        touch "$NPMRC_FILE"
    else
        echo ".npmrc exists"
    fi
}

# Function to find missing prefixes in an `.npmrc` file
find_missing_prefixes() {
    local FILE_TO_CHECK="$1"
    MISSING_PREFIXES=()
    for PREFIX in "${PREFIXES[@]}"; do
        if ! grep -qE "$PREFIX" "$FILE_TO_CHECK"; then
            MISSING_PREFIXES+=("$PREFIX")
        else
            echo "$PREFIX exists in .npmrc, continuing ..."
        fi
    done
}

# Function to prompt for global installation
prompt_global_install() {
    read -p "Would you like to add the DPM registries to global .npmrc ($GLOBAL_NPMRC)? [y/N] " ANSWER
    [[ "$ANSWER" =~ ^[yY]$ ]] && GLOBAL=true
}

# Function to add missing prefixes to an `.npmrc` file
add_prefixes_to_npmrc() {
    local NPMRC_FILE="$1"
    shift
    local PREFIXES_TO_ADD=("$@")
    
    # Ensure file ends with a newline before appending
    [[ -s "$NPMRC_FILE" && $(tail -c1 "$NPMRC_FILE" | wc -l) -eq 0 ]] && echo >> "$NPMRC_FILE"

    if [[ "${#PREFIXES_TO_ADD[@]}" -gt 0 ]]; then
        echo "Adding prefixes to $NPMRC_FILE ..."
        for PREFIX in "${PREFIXES_TO_ADD[@]}"; do
            echo "$PREFIX" >> "$NPMRC_FILE"
            echo "Added $PREFIX to $NPMRC_FILE"
        done
    fi
}

# Function to handle checks and installation
do_checks_and_install() {
    local NPMRC_FILE="$1"
    ensure_npmrc_exists "$NPMRC_FILE"
    
    find_missing_prefixes "$NPMRC_FILE"
    
    if [[ "${#MISSING_PREFIXES[@]}" -eq 0 ]]; then
        echo "No missing prefixes in $NPMRC_FILE."
        
        if ! $FORCE; then
            echo "Use --force (-f) to override and update the file"
            exit 0
        else
            backup_file "$NPMRC_FILE"
        fi
    fi
    
    add_prefixes_to_npmrc "$NPMRC_FILE" "${MISSING_PREFIXES[@]}"
}

# Function to start the DPM registry if not running
start_registry() {
    if ! pgrep -f "registry.dpm.software" > /dev/null; then
        echo "Starting registry ..."
        npm run registry:nohup
    else
        REGISTRY_PID="$(pgrep -f \"registry.dpm.software\")"
        read -p "Registry running, (pid=$REGISTRY_PID). Would you like to restart the registry process? [y/N] " ANSWER
        if [[ "$ANSWER" =~ ^[yY]$ ]]; then
            echo "Restarting registry process (pid=$REGISTRY_PID) ..."
            kill -9 "$REGISTRY_PID"
            npm run registry:nohup # Restart the registry after killing
            echo "Registry restarted (pid=$(pgrep -f \"registry.dpm.software\"))"
        else
            echo "Registry still running, continuing ..."
        fi
    fi
}

# Main logic
while [[ $# -gt 0 ]]; do
    case "$1" in
        -f|--force) FORCE=true; shift ;;
        -l|--local) LOCAL=true; shift ;;
        -g|--global) GLOBAL=true; shift ;;
        *) echo "Unknown option: $1"; shift ;;
    esac
done

if $LOCAL; then
    do_checks_and_install "$LOCAL_NPMRC"
elif $GLOBAL; then
    do_checks_and_install "$GLOBAL_NPMRC"
else
    do_checks_and_install "$LOCAL_NPMRC"
    
    prompt_global_install
    $GLOBAL && do_checks_and_install "$GLOBAL_NPMRC"
fi

start_registry
exit 0
