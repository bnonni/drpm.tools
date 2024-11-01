#!/usr/bin/env bash

# Extract the version from package.json
VERSION=$(jq -r '.version' package.json)

# Check if jq command succeeded
if [[ -z "$VERSION" ]]; then
  echo "Failed to extract version from package.json"
  exit 1
fi

# Write the version to .version file
echo "$VERSION" > ./dist/.version
echo "Updated .version with version $VERSION"
