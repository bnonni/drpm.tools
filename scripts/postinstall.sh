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
    local NPMRC_FILE="$1"
    ensure_npmrc_exists "$NPMRC_FILE"

    find_missing_prefixes "$NPMRC_FILE"

    if [[ "${#DRG_PREFIXES_MISSING[@]}" -eq 0 ]]; then
        echo "No missing prefixes in $NPMRC_FILE."

        if ! $FORCE; then
            echo "Use --force (-f) to override and update the file"
        else
            backup_file "$NPMRC_FILE"
        fi
    fi

    add_prefixes_to_npmrc "$NPMRC_FILE" "${DRG_PREFIXES_MISSING[@]}"
}

# Function to start the DRPM registry if not running
start_drg_server() {
    if docker version >/dev/null 2>&1; then
        sh ./scripts/registry.docker.sh
    else
        # shellcheck disable=SC2009
        REGISTRYD_PID="$(cat $REGISTRYD_PID_FILE_NAME 2>/dev/null || \
            pgrep -f $DRG_HOSTNAME \
            || ps aux | grep $DRG_HOSTNAME | grep -v grep | awk '{print $2}' \
            || lsof -i :2092 | grep node | awk '{print $2}')"

        if [[ -z "$REGISTRYD_PID" ]]; then
            roomy_echo "Starting registry ..."
            sh ./scripts/registry.nohup.sh
        else
            echo ""
            read -rp "Registry running, (pid=$REGISTRYD_PID). Would you like to restart the registry process? [y/N] " ANSWER
            if [[ "$ANSWER" =~ ^[yY]$ ]]; then
                echo "Restarting registry process (pid=$REGISTRYD_PID) ..."
                kill -9 "$REGISTRYD_PID"
                sh scripts/registry.nohup.sh
                echo "Registry restarted (pid=$(pgrep -f \"$DRG_HOSTNAME\"))"
            else
                echo "Registry still running, continuing ..."
            fi
        fi
    fi
}


# Check list of required env vars
do_check_drpm_env_vars() {
    REQUIRED_ENV_VARS=(
        SHELLRC_FILE
        DRPM_HOME
        LOCAL_OS
        GLOBAL_DRPMRC_FILE
        LOCAL_DRPMRC_FILE
        GLOBAL_NPMRC_FILE
        LOCAL_NPMRC_FILE
        DRPM_NGINX_DIR
        DRPM_DRG_HOSTNAME
        DRPM_DRG_URL
        DRPM_DRG_PORT_DEFAULT
        DRPM_DRG_PORT_FALLBACK
        DRPM_DRG_PREFIX
        DRPM_DPK_PREFIX
        DRPM_NPMRC_PREFIXES
        DRPM_REGISTRYD_PID
        DRPM_REGISTRYD_PID_FILE_NAME
        DRPM_POSTINSTALL_GLOABL
        DRPM_POSTINSTALL_LOCAL
    )
    for REQUIRED_ENV_VAR in "${REQUIRED_ENV_VARS[@]}"; do
    if [ -z "${!REQUIRED_ENV_VAR}" ]; then
        roomy_echo "$REQUIRED_ENV_VAR unset! Set it in your $SHELLRC_FILE."
        exit 0
    fi
    done
}


pre_main_setup() {
    # Check if local .drpmrc exists, download if not
    local CWD_DRPMRC_FILE="$PWD/.drpmrc"
    if [[ ! -f $CWD_DRPMRC_FILE ]]; then
        curl -fsSL https://raw.githubusercontent.com/bnonni/drpm.tools/HEAD/.drpmrc -O "$CWD_DRPMRC_FILE"
        echo "Downloaded .drpmrc to $CWD_DRPMRC_FILE"
    fi

    # Source local .drpmrc and print message
    source "$CWD_DRPMRC_FILE"
    echo "Sourced local .drpmrc ($CWD_DRPMRC_FILE)"
    
    # Copy local .drpmrc to $DRPM_HOME and print message
    cp "$CWD_DRPMRC_FILE" "$DRPM_HOME"
    echo "Copied local .drpmrc to $DRPM_HOME"
    
    # Check if rc file requires new line, add source statement to it and print message
    SOURCE_DRPMRC="source $GLOBAL_DRPMRC_FILE"
    if ! grep -qE "$SHELLRC_FILE" "$SOURCE_DRPMRC"; then
        [[ -s "$SHELLRC_FILE" && $(tail -c1 "$SHELLRC_FILE" | wc -l) -eq 0 ]] && echo >> "$SHELLRC_FILE"
        backup_file "$SHELLRC_FILE" "$DRPM_HOME/$SHELLRC_FILE.bak"
        echo "$SOURCE_DRPMRC" >> "$SHELLRC_FILE"
        echo "Updated $SHELLRC_FILE."
        echo "To remove, open $SHELLRC_FILE and remove the following line: $SOURCE_DRPMRC"
    else
        echo "$PREFIX exists in .npmrc, continuing ..."
    fi
    
    # Check if the postinstall script has already run
    DRPM_POSTINSTALL_GLOABL="$HOME/.postinstall"
    DRPM_POSTINSTALL_LOCAL="$PWD/.postinstall"
    if [[ -f "$DRPM_POSTINSTALL_GLOABL" || -f "$DRPM_POSTINSTALL_LOCAL" ]]; then
        echo "Global or Local postinstall has already run, exiting..."
        exit 0
    fi
}

main() {
    # Check if global .npmrc installed properly
    do_check_and_install_npmrc "$GLOBAL_NPMRC_FILE"

    # Setup nginx
    setup_nginx "$LOCAL_OS"

    # Start the DRG registry server
    start_drg_server
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
