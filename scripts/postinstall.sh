#!/usr/bin/env bash

set -e # Exit on error


if [[ -n "$XDG_CONFIG_HOME" ]]; then
    DPM_HOME="$XDG_CONFIG_HOME/dpm"
else
    DPM_HOME="$HOME/.dpm"
fi

POSTINSTALL_COMPLETE_GLOBAL="$DPM_HOME/.postinstall"
POSTINSTALL_COMPLETE_LOCAL="$PWD/.postinstall"
# Check if either global or local postinstall has already completed
if [[ -f "$POSTINSTALL_COMPLETE_GLOBAL" || -f "$POSTINSTALL_COMPLETE_LOCAL" ]]; then
    echo "Postinstall script has already run (global or local). Skipping..."
    exit 0
fi

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

# Initialize global dpm variables
REGISTRY_URL="http://localhost:2092"
REGISTRY_PID_FILE="registry.pid"
REGISTRY_PROCESS_NAME="registry.dpm.software"
REGISTRY_PID=0
PREFIXES=("@dpm:registry=$REGISTRY_URL" "@dpk:registry=$REGISTRY_URL" "dpm:registry=$REGISTRY_URL" "dpk:registry=$REGISTRY_URL")
MISSING_PREFIXES=()
SCRIPTS_DIR="$PWD/scripts"

# Function to output cleaner info
roomy_echo() {
    echo ""
    echo "$1"
}

# Function to handle unsupported OS and exit
unsupported_os() {
    echo "Unsupported OS: $1"
    exit 1
}


# Function to back up a file if it exists
backup_file() {
    local FILE_TO_BAK="$1"
    if [[ -f "$FILE_TO_BAK" ]]; then
        BAK_FILE="$DPM_HOME/$(basename "$FILE_TO_BAK").bak"
        roomy_echo "Backing up $FILE_TO_BAK to $BAK_FILE"
        cp "$FILE_TO_BAK" "$BAK_FILE"
    fi
}

# Function to ensure an `.npmrc` file exists
ensure_npmrc_exists() {
    local NPMRC_FILE="$1"
    if [[ ! -f "$NPMRC_FILE" ]]; then
        roomy_echo "Creating .npmrc ..."
        touch "$NPMRC_FILE"
    else
        roomy_echo ".npmrc exists"
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

# Function to add missing prefixes to an `.npmrc` file
add_prefixes_to_npmrc() {
    # npm config set @my-scope:registry http://localhost:4873

    local NPMRC_FILE="$1"
    shift
    local PREFIXES_TO_ADD=("$@")

    # Ensure file ends with a newline before appending
    [[ -s "$NPMRC_FILE" && $(tail -c1 "$NPMRC_FILE" | wc -l) -eq 0 ]] && echo >> "$NPMRC_FILE"

    if [[ "${#PREFIXES_TO_ADD[@]}" -gt 0 ]]; then
        roomy_echo "Adding prefixes to $NPMRC_FILE ..."
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

        if $FORCE; then
            backup_file "$NPMRC_FILE"
            add_prefixes_to_npmrc "$NPMRC_FILE" "${MISSING_PREFIXES[@]}"
        fi
    else
        add_prefixes_to_npmrc "$NPMRC_FILE" "${MISSING_PREFIXES[@]}"
    fi
}

# Function to start the DPM registry if not running
start_dpm_registry() {
    if docker version >/dev/null 2>&1; then
        sh $SCRIPTS_DIR/registry.docker.sh
    else
        # shellcheck disable=SC2009
        REGISTRY_PID="$(cat $REGISTRY_PID_FILE 2>/dev/null || \
            pgrep -f $REGISTRY_PROCESS_NAME \
            || ps aux | grep $REGISTRY_PROCESS_NAME | grep -v grep | awk '{print $2}' \
            || lsof -i :2092 | grep node | awk '{print $2}')"

        if [[ -z "$REGISTRY_PID" ]]; then
            roomy_echo "Starting registry ..."
            sh $SCRIPTS_DIR/registry.nohup.sh
        else
            echo ""
            read -rp "Registry running, (pid=$REGISTRY_PID). Would you like to restart the registry process? [y/N] " ANSWER
            if [[ "$ANSWER" =~ ^[yY]$ ]]; then
                echo "Restarting registry process (pid=$REGISTRY_PID) ..."
                kill -9 "$REGISTRY_PID"
                sh $SCRIPTS_DIR/registry.nohup.sh
                echo "Registry restarted (pid=$(pgrep -f \"$REGISTRY_PROCESS_NAME\"))"
            else
                echo "Registry still running, continuing ..."
            fi
        fi
    fi
}

# NOTE: I really don't think we should be touching people's /etc/hosts file.
# Perhaps suggest it to them, but that's pretty "invasive" IMO
# Function to edit /etc/hosts
edit_hosts() {
    local DRG_CUSTOM_LOCAL="127.0.0.1 registry.dpm.software.local"
    if ! grep -q "$DRG_CUSTOM_LOCAL" /etc/hosts; then
        echo ""
        read -rp "The DRG localhost ($DRG_CUSTOM_LOCAL) needs to be added to /etc/hosts. This requires sudo privileges. Can we add this for you? [y/n] " ANSWER
        if [[ "$ANSWER" =~ ^[yY]$ ]]; then
            roomy_echo "Backing up /etc/hosts to $DPM_HOME/hosts.bak ..."
            cp /etc/hosts $DPM_HOME/hosts.bak
            roomy_read "Please enter your password: " -s PASSWORD
            echo "$PASSWORD" | sudo -S sh -c "echo \"$DRG_CUSTOM_LOCAL\" >> /etc/hosts"
            echo "Added $DRG_CUSTOM_LOCAL to /etc/hosts"
        else
            roomy_echo "Add the following hosts to your /etc/hosts file."
            echo "$DRG_CUSTOM_LOCAL"
            exit 0
        fi
    else
        echo "DRG custom local domain $DRG_CUSTOM_LOCAL already present in /etc/hosts"
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

    local VARS_TO_EXPORT=("DPM_HOME=\"$DPM_HOME\"" "REGISTRY_URL=\"$REGISTRY_URL\"" "REGISTRY_PID_FILE=\"$REGISTRY_PID_FILE\"" "REGISTRY_PROCESS_NAME=\"$REGISTRY_PROCESS_NAME\"" "PATH=\"$DPM_HOME:$PATH\"")

    read -rp "Some environment variables need to be set. Should we set them for you? [y/N] " ANSWER
    if [[ "$ANSWER" =~ ^[yY]$ ]]; then
        echo "Found $SHELL_RC file, adding env vars ..."
        [[ -s "$SHELL_RC" && $(tail -c1 "$SHELL_RC" | wc -l) -eq 0 ]] && echo >> "$SHELL_RC"

        for VAR in "${VARS_TO_EXPORT[@]}"; do
            if ! grep -q "$VAR" "$SHELL_RC"; then
                echo "export $VAR" >> "$SHELL_RC"
            fi
        done

        echo "DPM env vars added to $SHELL_RC"

        if [[ "$0" != "${BASH_SOURCE[0]}" ]]; then
            echo "Attempting to source $SHELL_RC ..."
            # shellcheck disable=SC1090
            . "$SHELL_RC"
        else
            echo "Please run 'source $SHELL_RC' or open a new terminal session to apply changes"
        fi
    else
        roomy_echo "Please add the following variables to your shell."
        for VAR in "${VARS_TO_EXPORT[@]}"; do
            echo "$VAR"
        done
    fi
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
}

# Function to set up Nginx
setup_nginx() {
    local OS="$1"
    if ! $NGINX_FLAG || pgrep -f "nginx" > /dev/null; then
        return 0
    fi
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

npmrc_main() {
    # Do global install
    do_check_and_install_npmrc "$GLOBAL_NPMRC"
    touch "$POSTINSTALL_COMPLETE_GLOBAL"
    # Do local install as backup
    do_check_and_install_npmrc "$LOCAL_NPMRC"
    touch "$POSTINSTALL_COMPLETE_LOCAL"
}

# Main logic
main() {
    # Run the npmrc check and install for global and local
    npmrc_main
    # Run editing hosts file
    edit_hosts
    # Run Nginx setup
    setup_nginx "$OS"
    # Start the DPM registry
    start_dpm_registry
    # Set up environment variables
    setup_dpm_env_vars
}

# Parse command line arguments
while [[ "$#" -gt 0 ]]; do
    case "$1" in
        -f|--force) FORCE=true; shift ;;
        -g|--global) GLOBAL_FLAG=true; shift ;;
        -n|--nginx) NGINX_FLAG=true; shift ;;
        *) echo "Unknown option: $1"; shift ;;
    esac
done

# Create the DPM home directory if it doesn't exist
[[ ! -d "$DPM_HOME" ]] && mkdir -p "$DPM_HOME"
roomy_echo "DRPM installed per DPM_HOME ($DPM_HOME)."

# Run the main function and exit 0
main
exit 0
