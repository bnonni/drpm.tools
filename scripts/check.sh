#!/usr/bin/env bash

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

# Define list of required env vars
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

# Check if required env vars are set
for REQUIRED_ENV_VAR in "${REQUIRED_ENV_VARS[@]}"; do
  if [ -z "${!REQUIRED_ENV_VAR}" ]; then
    roomy_echo "$REQUIRED_ENV_VAR unset! Set it in your $SHELLRC_FILE."
    exit 0
  fi
done

exit 0
