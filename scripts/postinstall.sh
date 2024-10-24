#!/usr/bin/env bash

set -e

# Check if SHELL env var is set
if [[ -z $SHELL ]]; then
    echo "Something went wrong! No SHELL found."
    exit 1
fi

# Check if HOME env var is set
if [[ -z $HOME ]]; then
    echo "Something went wrong! No HOME found."
    exit 1
fi

# Initialize flags
FORCE=false
GLOBAL_FLAG=false
NGINX_FLAG=false
DRG_PREFIXES_MISSING=()

if [[ "$npm_config_global" == "true" ]]; then
    GLOBAL_FLAG=true
fi

# Set SHELLRC to default value and check for shell type
export SHELLRC_FILE="$HOME/.profile"
case "$SHELL" in
    */zsh)
        export SHELLRC_FILE="$HOME/.zshrc"
        ;;
    */bash)
        export SHELLRC_FILE="$HOME/.bashrc"
        ;;
esac
# Set DRPM_HOME to default value and check for XDG_CONFIG_HOME
export DRPM_HOME="$HOME/.drpm"
if [[ -n "$XDG_CONFIG_HOME" ]]; then
    export DRPM_HOME="$XDG_CONFIG_HOME/drpm"
fi
[[ ! -d "$DRPM_HOME" ]] && mkdir -p "$DRPM_HOME" "$DRPM_HOME/bak"
export DRPM_DRG_DIR="$DRPM_HOME/registry";
[[ ! -d "$DRPM_DRG_DIR" ]] && mkdir -p "$DRPM_DRG_DIR"
# Initialize global system variables
export OS_TYPE="$(uname)"
export NPMRC_LOCAL="$PWD/.npmrc"
export NPMRC_GLOBAL="$HOME/.npmrc"
export DRPMRC_LOCAL="$PWD/.drpmrc"
export DRPMRC_GLOBAL="$DRPM_HOME/.drpmrc"
export DRPM_PROFILE_LOCAL="$PWD/.drpm_profile"
export DRPM_PROFILE_GLOBAL="$DRPM_HOME/.drpm_profile"
# Initialize drpm variables
export DRPM_NGINX_DIR="$PWD/build/nginx"
export DRPM_DRG_HOSTNAME="localhost"
export DRPM_DRG_PORT_DEFAULT=2092
export DRPM_DRG_URL="http://$DRPM_DRG_HOSTNAME:$DRPM_DRG_PORT_DEFAULT/";
export DRPM_PREFIX='@drpm:registry';
export DRPM_DPK_PREFIX='dpk:registry';
export DRPM_NPMRC_PREFIXES=(
    "$DRPM_PREFIX=$DRPM_DRG_URL"
    "$DRPM_DPK_PREFIX=$DRPM_DRG_URL"
)
export DRPM_REGISTRYD_PID_FILE="$DRPM_HOME/registry/registryd.pid"
[[ ! -f "$DRPM_REGISTRYD_PID_FILE" ]] && touch "$DRPM_REGISTRYD_PID_FILE"
export DRPM_REGISTRYD_PID=$(cat $DRPM_REGISTRYD_PID_FILE 2>/dev/null || echo 0)
export DRPM_POSTINSTALL_GLOABL="$HOME/.postinstall"
export DRPM_POSTINSTALL_LOCAL="$PWD/.postinstall"

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

# Function to set up Nginx
setup_nginx() {
    local OS="$1"
    roomy_echo "Setting up Nginx for $OS..."
    case "$OS" in
        Darwin)
            if ! brew ls --versions nginx > /dev/null; then
                echo "Nginx not found. Installing..."
                brew install nginx
            else
                echo "Nginx is already installed."
            fi
            echo "Copying custom macOS nginx.conf..."
            cp "$NGINX_DIR/mac.conf" /usr/local/etc/nginx/nginx.conf
            echo "Starting Nginx via brew services..."
            brew services start nginx
            ;;
        # NOTE: This is not specific enough. For example, Arch users won't have apt-get.
        # TODO: rewrite linux nginx setup
        Linux)
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
        BAK_FILE="$DRPM_HOME/$(basename "$FILE_TO_BAK").bak"
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
            DRG_PREFIXES_MISSING+=("$PREFIX")
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
    echo "Checking and installing .npmrc ..."
    local NPMRC_FILE="$1"
    ensure_npmrc_exists "$NPMRC_FILE"
    find_missing_prefixes "$NPMRC_FILE"
    if [[ "${#DRG_PREFIXES_MISSING[@]}" -eq 0 ]]; then
        echo "No missing prefixes in $NPMRC_FILE."
    else
        backup_file "$NPMRC_FILE"
        add_prefixes_to_npmrc "$NPMRC_FILE" "${DRG_PREFIXES_MISSING[@]}"
    fi
}

start_registry_nohup() {
    echo "Starting registry global with nohup ..."
    # shellcheck disable=SC2009
    DRPM_REGISTRYD_PID=$((cat "$DRPM_HOME/registry/registryd.pid" 2>/dev/null) || (pgrep -f $DRG_HOSTNAME) || (ps aux | grep $DRG_HOSTNAME | grep -v grep | awk '{print $2}') || (lsof -i :2092 | grep node | awk '{print $2}'))

    if [[ -z "$DRPM_REGISTRYD_PID" ]]; then
        roomy_echo "Starting registry ..."
        sh ./scripts/registryd/nohup.sh
    else
        echo ""
        read -rp "Registry running, (pid=$DRPM_REGISTRYD_PID). Would you like to restart the registry process? [y/N] " ANSWER
        if [[ "$ANSWER" =~ ^[yY]$ ]]; then
            echo "Restarting registry process (pid=$DRPM_REGISTRYD_PID) ..."
            kill -9 "$DRPM_REGISTRYD_PID"
            sh ./scripts/registryd/nohup.sh
            echo "Registry restarted (pid=$(pgrep -f \"$DRG_HOSTNAME\"))"
        else
            echo "Registry still running, continuing ..."
        fi
    fi
}

start_registry_global() {
    echo "Starting registry global ..."
    if docker version >/dev/null 2>&1; then
        echo "Starting registry global with docker ..."
        curl -fsSL https://raw.githubusercontent.com/bnonni/drpm.tools/HEAD/build/docker.sh -o | sh
    else
        echo "Starting registry global with nohup ..."
        start_registry_nohup
    fi
}

start_registry_local() {
    echo "Starting registry local ..."
    if docker version >/dev/null 2>&1; then
        sh ./build/docker.sh
        echo "Starting registry local with docker ..."
    else
        start_registry_nohup
        echo "Starting registry local with nohup ..."
    fi
}

# Function to start the DRPM registry if not running
start_registry() {
    echo "Starting registry ..."
    if [[ $GLOBAL || "$npm_config_global" == "true" ]]; then
        start_registry_global
    else
        start_registry_local
    fi
}

# Check list of required env vars
do_check_drpm_env_vars() {
    echo "Checking required environment variables ..."
    REQUIRED_ENV_VARS=(
        SHELLRC_FILE
        DRPM_HOME
        DRPM_DRG_DIR
        OS_TYPE
        NPMRC_LOCAL
        NPMRC_GLOBAL
        DRPMRC_LOCAL
        DRPMRC_GLOBAL
        DRPM_PROFILE_LOCAL
        DRPM_PROFILE_GLOBAL
        DRPM_NGINX_DIR
        DRPM_DRG_HOSTNAME
        DRPM_DRG_URL
        DRPM_DRG_PORT_DEFAULT
        DRPM_PREFIX
        DRPM_DPK_PREFIX
        DRPM_NPMRC_PREFIXES
        DRPM_REGISTRYD_PID_FILE
        DRPM_REGISTRYD_PID
        DRPM_POSTINSTALL_GLOABL
        DRPM_POSTINSTALL_LOCAL
    )
    for REQUIRED_ENV_VAR in "${REQUIRED_ENV_VARS[@]}"; do
        if [ -z "${!REQUIRED_ENV_VAR}" ]; then
            roomy_echo "$REQUIRED_ENV_VAR unset! Source the $DRPMRC_GLOBAL file."
        fi
    done
}

# Check if dotfiles are installed
check_and_install_drpm_dotfiles() {
    echo "Checking and installing .drpmrc and .drpm_profile ..."
    # Check if local .drpmrc exists, download if not
    if [[ ! -f "$DRPMRC_GLOBAL" ]]; then
        curl -fsSL https://raw.githubusercontent.com/bnonni/drpm.tools/HEAD/.drpmrc -o "$DRPMRC_GLOBAL"
        echo "Downloaded .drpmrc to $DRPMRC_GLOBAL"
        source "$DRPMRC_GLOBAL"
        echo "Sourced .drpmrc at $DRPMRC_GLOBAL"
    else
        echo ".drpmrc exists, continuing ..."
    fi

    if [[ ! -f "$DRPM_PROFILE_GLOBAL" ]]; then
        curl -fsSL https://raw.githubusercontent.com/bnonni/drpm.tools/HEAD/.drpm_profile -o "$DRPM_PROFILE_GLOBAL"
        echo "Downloaded .drpm_profile to $DRPM_PROFILE_GLOBAL"
    else
        echo ".drpm_profile exists, continuing ..."
    fi

    # Check if rc file requires new line, add source statement to it and print message
    if ! grep -q "source $HOME/.drpm/.drpmrc" "$SHELLRC_FILE"; then
        [[ -s "$SHELLRC_FILE" && $(tail -c1 "$SHELLRC_FILE" | wc -l) -eq 0 ]] && echo >> "$SHELLRC_FILE"
        backup_file "$SHELLRC_FILE" "$DRPM_HOME/bak/$SHELLRC_FILE.bak"
        echo "source $HOME/.drpm/.drpmrc" >> "$SHELLRC_FILE"
        echo "Updated $SHELLRC_FILE. To remove, open $SHELLRC_FILE and remove the following line: $SOURCE_DRPMRC"
    else
        echo "Source statement exists in $SHELLRC_FILE, continuing ..."
    fi
}

pre_main_setup() {
    echo "Starting pre-main setup ..."
    # Check if the postinstall script has already run
    DRPM_POSTINSTALL_GLOBAL="$DRPM_HOME/.postinstall"
    DRPM_POSTINSTALL_LOCAL="$PWD/.postinstall"
    if [[ -f "$DRPM_POSTINSTALL_GLOBAL" || -f "$DRPM_POSTINSTALL_LOCAL" ]]; then
        if ! $FORCE; then
            echo "Postinstall has already run, exiting..."
            exit 0
        else
            echo "Force flag set, forcing postinstall ..."
            rm -rf "$DRPM_POSTINSTALL_GLOBAL" "$DRPM_POSTINSTALL_LOCAL"
        fi
    else
        echo "Postinstall has not run yet, continuing ..."
    fi

    # Check if .drpmrc and .drpm_profile are installed locally
    check_and_install_drpm_dotfiles

    # Check if .drpmrc env vars installed properly
    do_check_drpm_env_vars
}

main() {
    # Check if global .npmrc installed properly
    do_check_and_install_npmrc "$NPMRC_LOCAL"

    # Start the DRG registry server
    start_registry
}

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

# Setup runs before main
pre_main_setup
# Post setup main entry point
main
# Exit cleanly
exit 0
