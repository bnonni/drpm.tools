#!/usr/bin/env bash

set -e # Exit on error

# Initialize flags
FORCE=false
GLOBAL_FLAG=false
NGINX_FLAG=false

# Initialize global system variables
OS="$(uname)"
BUILD_DIR="$PWD/build"
NGINX_DIR="$BUILD_DIR/nginx"
NPMRC=".npmrc"
GLOBAL_NPMRC="$HOME/$NPMRC"
LOCAL_NPMRC="$PWD/$NPMRC"
NPMRC_FILES=("$GLOBAL_NPMRC" "$LOCAL_NPMRC")
DPM_HOME="$HOME/.dpm"

# Initialize global dpm variables
REGISTRY_URL="http://localhost:2092"
REGISTRY_PID_FILE="registry.pid"
REGISTRY_PROCESS_NAME="registry.dpm.software"
REGISTRY_PID=0
PREFIXES=("@dpm:registry=$REGISTRY_URL" "@dpk:registry=$REGISTRY_URL" "dpm:registry=$REGISTRY_URL" "dpk:registry=$REGISTRY_URL")
MISSING_PREFIXES=()

# Function to handle unsupported OS and exit
unsupported_os() {
    echo "Unsupported OS: $1"
    exit 1
}

# Function to set up Nginx
setup_nginx() {
    local OS="$1"
    case "$OS" in
        Darwin)
            echo "Setting up Nginx for macOS (Darwin)..."
            # Install nginx using Homebrew if not installed
            if ! brew ls --versions nginx > /dev/null; then
                echo "Nginx not found. Installing..."
                brew install nginx
            else
                echo "Nginx is already installed."
            fi
            # Copy custom macOS config and replace the existing nginx.conf
            echo "Copying custom macOS nginx.conf..."
            cp "$NGINX_DIR/mac.conf" /usr/local/etc/nginx/nginx.conf
            # Start Nginx as a brew service
            echo "Starting Nginx via brew services..."
            brew services start nginx
            ;;
        Linux)
            echo "Setting up Nginx for Linux..."
            # Install nginx if not installed
            if ! command -v nginx > /dev/null; then
                echo "Nginx not found. Installing..."
                sudo apt-get update && sudo apt-get install -y nginx
            else
                echo "Nginx is already installed."
            fi
            # Copy custom Linux config and replace the existing nginx.conf
            echo "Copying custom Linux nginx.conf..."
            sudo cp "$NGINX_DIR/linux.conf" /etc/nginx/nginx.conf
            # Start Nginx service
            echo "Starting Nginx service..."
            sudo systemctl start nginx
            sudo systemctl enable nginx
            ;;
        *)
            unsupported_os "$OS"
            ;;
    esac
}


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
    for PREFIX in "${PREFIXES[@]}"; do
        if ! grep -qE "$PREFIX" "$FILE_TO_CHECK"; then
            MISSING_PREFIXES+=("$PREFIX")
        else
            echo "$PREFIX exists in .npmrc, continuing ..."
        fi
    done
}

# Function to prompt for global installation
prompt_global_npmrc_install() {
    read -p "Would you like to add the DPM registries to global .npmrc ($GLOBAL_NPMRC)? [y/N] " ANSWER
    [[ "$ANSWER" =~ ^[yY]$ ]] && GLOBAL_FLAG=true
}

# Function to add missing prefixes to an `.npmrc` file
add_prefixes_to_npmrc() {
    # npm config set @my-scope:registry http://localhost:4873

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
do_check_and_install_npmrc() {
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
start_dpm_registry() {
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
    edit_hosts
}

# Function to edit /etc/hosts
edit_hosts() {
    CUSTOM_DOMAIN="127.0.0.1 registry.dpm.software.local"
    read -p "Please enter your password: " -s PASSWORD
    if ! grep -q "$CUSTOM_DOMAIN" /etc/hosts; then
        echo "$PASSWORD" | sudo -S sh -c "echo \"$CUSTOM_DOMAIN\" >> /etc/hosts"
        echo "Custom domain added to /etc/hosts"
    else
        echo "Custom domain already present in /etc/hosts"
    fi
}

# Function to set up environment variables
setup_dpm_env_vars() {
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


# Create the DPM home directory if it doesn't exist
[[ ! -d "$DPM_HOME" ]] && mkdir "$DPM_HOME" || echo "DRPM installed per DPM_HOME ($DPM_HOME), exiting ..." && exit 0

# Main logic
# Parse command line arguments
if [[ "$#" -gt 0 ]]; then
    while [[ "$#" -gt 0 ]]; do
        case "$1" in
            -f|--force) FORCE=true; shift ;;
            -g|--global) GLOBAL_FLAG=true; shift ;;
            -n|--nginx) NGINX_FLAG=true; shift ;;
            *) echo "Unknown option: $1"; shift ;;
        esac
    done
fi

# Check for Nginx directory
do_check_and_install_npmrc "$LOCAL_NPMRC"

if $GLOBAL_FLAG || [[ "$npm_config_global" == "true" ]]; then
    echo "Global installation detected ..."
    do_check_and_install_npmrc "$GLOBAL_NPMRC"
else
    prompt_global_npmrc_install
    $GLOBAL_FLAG && do_check_and_install_npmrc "$GLOBAL_NPMRC"
fi

$NGINX_FLAG && setup_nginx "$OS" || echo "Skipping Nginx setup ..."

edit_hosts
start_dpm_registry
setup_dpm_env_vars
exit 0
