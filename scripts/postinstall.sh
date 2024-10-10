#!/usr/bin/env bash

set -e # Exit on error

# Initialize flags
FORCE=false
GLOBAL_FLAG=false

# Directories and files
DPM_HOME="$HOME/.dpm"
NPMRC=".npmrc"
GLOBAL_NPMRC="$HOME/$NPMRC"
LOCAL_NPMRC="$PWD/$NPMRC"
NPMRC_FILES=("$GLOBAL_NPMRC" "$LOCAL_NPMRC")

# Registries and prefixes
REGISTRY_URL="http://localhost:2092"
REGISTRY_PID_FILE="registry.pid"
REGISTRY_PROCESS_NAME="registry.dpm.software"
REGISTRY_PID=0

PREFIXES=("@dpm:registry=$REGISTRY_URL" "@dpk:registry=$REGISTRY_URL" "dpm:registry=$REGISTRY_URL" "dpk:registry=$REGISTRY_URL")
MISSING_PREFIXES=()

# Create the DPM home directory if it doesn't exist
[[ ! -d "$DPM_HOME" ]] && mkdir "$DPM_HOME"

# Function to back up a file if it exists
backup_file() {
    local FILE_TO_BAK="$1"
    if [[ -f "$FILE_TO_BAK" ]]; then
        BAK_FILE="$DPM_HOME/$(basename "$FILE_TO_BAK").bak"
        echo "Backing up $FILE_TO_BAK to $BAK_FILE"
        cp "$FILE_TO_BAK" "$BAK_FILE"
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
    [[ "$ANSWER" =~ ^[yY]$ ]] && GLOBAL_FLAG=true
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
        else
            backup_file "$NPMRC_FILE"
        fi
    fi
    
    add_prefixes_to_npmrc "$NPMRC_FILE" "${MISSING_PREFIXES[@]}"
}

# Function to start the DPM registry if not running
start_registry() {
    REGISTRY_PID="$(cat $REGISTRY_PID_FILE 2>/dev/null || pgrep -f $REGISTRY_PROCESS_NAME || ps aux | grep $REGISTRY_PROCESS_NAME | awk '{print $2}' || lsof -i :2092 | grep node | awk '{print $2}')"
    if [[ -z "$REGISTRY_PID" ]]; then
        echo "Starting registry ..."
        sh scripts/registry.nohup.sh
    else
        read -p "Registry running, (pid=$REGISTRY_PID). Would you like to restart the registry process? [y/N] " ANSWER
        if [[ "$ANSWER" =~ ^[yY]$ ]]; then
            echo "Restarting registry process (pid=$REGISTRY_PID) ..."
            kill -9 "$REGISTRY_PID"
            sh scripts/registry.nohup.sh
            echo "Registry restarted (pid=$(pgrep -f \"$REGISTRY_PROCESS_NAME\"))"
        else
            echo "Registry still running, continuing ..."
        fi
    fi
}

setup_localhost() {
    CUSTOM_DOMAIN="127.0.0.1 registry.dpm.software.local"
    read -p "Please enter your password: " -s PASSWORD
    if ! grep -q "$CUSTOM_DOMAIN" /etc/hosts; then
        echo "$PASSWORD" | sudo -S sh -c "echo \"$CUSTOM_DOMAIN\" >> /etc/hosts"
        echo "Custom domain added to /etc/hosts"
    else
        echo "Custom domain already present in /etc/hosts"
    fi
}

setup_env() {
    case "$SHELL" in
        */zsh)
            SHELL_RC="$HOME/.zshrc"
            ;;
        */bash)
            SHELL_RC="$HOME/.bashrc"
            ;;
        *)
            SHELL_RC="$HOME/.profile"
            ;;
    esac

    echo "Found $SHELL_RC file, adding env vars ..."
    [[ -s "$SHELL_RC" && $(tail -c1 "$SHELL_RC" | wc -l) -eq 0 ]] && echo >> "$SHELL_RC"

    local VARS_TO_EXPORT=("DPM_HOME=\"$DPM_HOME\"" "REGISTRY_URL=\"$REGISTRY_URL\"" "REGISTRY_PID_FILE=\"$REGISTRY_PID_FILE\"" "REGISTRY_PROCESS_NAME=\"$REGISTRY_PROCESS_NAME\"" "PATH=\"$DPM_HOME:$PATH\"")

    for VAR in "${VARS_TO_EXPORT[@]}"; do
        if ! grep -q "$VAR" "$SHELL_RC"; then
            echo "export $VAR" >> "$SHELL_RC"
        fi
    done

    echo "DPM env vars added to $SHELL_RC"

    if [[ "$0" != "$BASH_SOURCE" ]]; then
        echo "Attempting to source $SHELL_RC ..."
        . "$SHELL_RC"
    else
        echo "Please run 'source $SHELL_RC' or open a new terminal session to apply changes"
    fi
}

# Main logic
if [[ "$#" -gt 0 ]]; then
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
            -f|--force) FORCE=true; shift ;;
            -g|--global) GLOBAL_FLAG=true; shift ;;
            *) echo "Unknown option: $1"; shift ;;
        esac
    done
fi

do_checks_and_install "$LOCAL_NPMRC"

if $GLOBAL_FLAG || [[ "$npm_config_global" == "true" ]]; then
    echo "Global installation detected ..."
    do_checks_and_install "$GLOBAL_NPMRC"
else
    prompt_global_install
    $GLOBAL_FLAG && do_checks_and_install "$GLOBAL_NPMRC"
fi

start_registry
setup_env
exit 0
