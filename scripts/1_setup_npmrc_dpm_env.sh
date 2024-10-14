#!/usr/bin/env bash

set -e # Exit on error

NPMRC=".npmrc"
GLOBAL_NPMRC="$HOME/$NPMRC"
LOCAL_NPMRC="$PWD/$NPMRC"
POSTINSTALL=".postinstall"
REGISTRYD_URL="http://localhost:2092"
REGISTRYD_PROCESS_NAME="registry.dpm.software"
REGISTRYD_PID=0
DPM_PREFIXES=("@dpm:registry=$REGISTRYD_URL" "@dpk:registry=$REGISTRYD_URL" "dpm:registry=$REGISTRYD_URL" "dpk:registry=$REGISTRYD_URL")
MISSING_PREFIXES=()

REGISTRYD_PID_FILE="registryd.pid"
POSTINSTALLED_GLOBAL="$DPM_HOME/$POSTINSTALL"
POSTINSTALLED_LOCAL="$PWD/$POSTINSTALL"

DPM_HOME="$HOME/.dpm"

# Set DPM_HOME
if [[ -n "$XDG_CONFIG_HOME" ]]; then
    DPM_HOME="$XDG_CONFIG_HOME/dpm"
fi

DPM_ENV_VARS=("DPM_HOME=$DPM_HOME" "REGISTRYD_URL=$REGISTRYD_URL" "REGISTRYD_PID_FILE=$REGISTRYD_PID_FILE" "REGISTRYD_PROCESS_NAME=$REGISTRYD_PROCESS_NAME" "PATH=$DPM_HOME:$PATH")

# Function to output cleaner info
roomy_echo() {
    echo ""
    echo "$1"
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
        echo "Creating .npmrc ..."
        touch "$NPMRC_FILE"
    else
        echo ".npmrc exists"
    fi
}

# Function to find missing prefixes in an `.npmrc` file
find_missing_prefixes() {
    local FILE_TO_CHECK="$1"
    for PREFIX in "${DPM_PREFIXES[@]}"; do
        if ! grep -qE "$PREFIX" "$FILE_TO_CHECK"; then
            MISSING_PREFIXES+=("$PREFIX")
        else
            echo "$PREFIX exists in .npmrc, continuing ..."
        fi
    done
}

# Function to add missing prefixes to an `.npmrc` file
add_prefixes_to_npmrc() {
    local NPMRC_FILE="$1"
    shift
    local PREFIXES_TO_ADD=("$@")
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

do_setup_dpm_env_vars() {
    local VARS_TO_EXPORT=$DPM_ENV_VARS
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
        echo "Please run 'source $SHELL_RC' or open a new terminal session to apply changes."
    fi
}

# Gut check that DPM_HOME was actually set
if [[ -z "$DPM_HOME" ]]; then
    echo "DPM_HOME is could not be set!"
    echo 'Please add this line to your shell profile and rerun this script: export DPM_HOME="$HOME/.dpm"'
    exit 0
fi

# Check if .dpm directory exists, create if dne
[[ ! -d "$DPM_HOME" ]] && mkdir -p "$DPM_HOME"
roomy_echo "DPM_HOME dir created ($DPM_HOME)."

# Do global install
do_check_and_install_npmrc "$GLOBAL_NPMRC"
# Touch postinstall global file
touch "$POSTINSTALLED_GLOBAL"

# Do local install
do_check_and_install_npmrc "$LOCAL_NPMRC"
# Touch postinstall local file
touch "$POSTINSTALLED_LOCAL"

# If shell interactive, prompt for env var setup, else set them
if [[ $PS1 || -t 0 ]]; then
    read -rp "Some environment variables need to be set. Should we set them for you? [y/N] " ANSWER
    if [[ "$ANSWER" =~ ^[yY]$ ]]; then
        do_setup_dpm_env_vars
    else
        roomy_echo "Please add the following variables to your shell."
        for VAR in "${DPM_ENV_VARS[@]}"; do
            echo "$VAR"
        done
    fi
else
    do_setup_dpm_env_vars
fi
echo "npmrc and dpm env var setups complete!"
exit 0