#!/bin/bash
export HOMEBREW_NO_INSTALL_CLEANUP=1
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" && \
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc