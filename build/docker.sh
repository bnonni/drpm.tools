#!/usr/bin/env bash

set -e

DOCKER_CONTAINERS_FILE=containers.txt
DOCKER_NETWORK=drpm-registry

if ! docker network ls | grep $DOCKER_NETWORK >/dev/null 2>&1; then
    docker network create $DOCKER_NETWORK
fi

if [[ -f $DOCKER_CONTAINERS_FILE ]]; then
    echo ""
    read -rp "Registry running. Would you like to restart the registry process? [y/N] "
    if [[ "$ANSWER" =~ ^[yY]$ ]]; then
        docker stop < $DOCKER_CONTAINERS_FILE
    else
        exit 0
    fi
fi

echo "Starting DRPM registry container"
registry_name=$(docker run --rm --network $DOCKER_NETWORK \
    --pull always --detach --publish 2092:2092 w3irdrobot:dpm-registry)

echo "Starting DWN container"
dwn_name=$(docker run --rm --network $DOCKER_NETWORK \
    --pull always --detach --volume dwn-data:/dwn-server/data \
    --publish 3000:3000 ghcr.io/tbd54566975/dwn-server:main)

echo "$registry_name" > "$DOCKER_CONTAINERS_FILE"
echo "$dwn_name" >> "$DOCKER_CONTAINERS_FILE"
