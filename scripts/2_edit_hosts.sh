#!/usr/bin/env bash

set -e # Exit on error

DRG_CUSTOM_LOCAL="127.0.0.1 local.registry.drpm.tools"
DPM_HOME="$HOME/.dpm"

# Set DPM_HOME
if [[ -n "$XDG_CONFIG_HOME" ]]; then
    DPM_HOME="$XDG_CONFIG_HOME/dpm"
fi

# Function to output cleaner info
roomy_echo() {
    echo ""
    echo "$1"
}

echo_manual_add() {
    roomy_echo "Add the following hosts to your /etc/hosts file."
    echo "$DRG_CUSTOM_LOCAL" 
}

do_edit_hosts() {
    local PASSWORD="$1"
    roomy_echo "Backing up /etc/hosts to $DPM_HOME/hosts.bak ..."
    cp /etc/hosts $DPM_HOME/hosts.bak
    echo "$PASSWORD" | sudo -S sh -c "echo \"$DRG_CUSTOM_LOCAL\" >> /etc/hosts"
    echo "Added $DRG_CUSTOM_LOCAL to /etc/hosts"
}

# Gut check that DPM_HOME was actually set
if [[ -z "$DPM_HOME" ]]; then
    echo "DPM_HOME is could not be set!"
    echo 'Please add this line to your shell profile and rerun this script: export DPM_HOME="$HOME/.dpm"'
    exit 0
fi

# If shell interactive, prompt for env var setup, else set them
if ! grep -q "$DRG_CUSTOM_LOCAL" /etc/hosts; then
    if [[ $PS1 || -t 0 ]]; then
        echo ""
        read -rp "A custom domain ($DRG_CUSTOM_LOCAL) needs to be added to your /etc/hosts file. This requires sudo privileges. Can we add this for you? [y/n] " ANSWER
        if [[ "$ANSWER" =~ ^[yY]$ ]]; then
            echo ""
            read "Please enter your password: " -s PASSWORD
            do_edit_hosts "$PASSWORD"
        else
            echo_manual_add
        fi
    else
        do_setup_dpm_env_vars
    fi
else
    echo "Custom DRG domain ($DRG_CUSTOM_LOCAL) already present in /etc/hosts"
fi

exit 0