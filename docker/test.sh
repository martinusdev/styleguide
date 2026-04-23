#!/bin/bash
# Martinus Styleguide - Run tests in Docker
# Thin wrapper that invokes `npm test` inside the mcp-server container.
#
# Usage: ./test.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [[ "$SCRIPT_DIR" == */docker ]]; then
    STYLEGUIDE_ROOT="$(dirname "$SCRIPT_DIR")"
else
    STYLEGUIDE_ROOT="$SCRIPT_DIR"
fi

if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running${NC}"
    exit 1
fi

if [ ! -f "$STYLEGUIDE_ROOT/docker/docker-compose.yml" ]; then
    echo -e "${RED}Error: docker-compose.yml not found${NC}"
    exit 1
fi

echo -e "${YELLOW}Running MCP server tests in Docker...${NC}"
cd "$STYLEGUIDE_ROOT"

docker-compose -f docker/docker-compose.yml run --rm --no-deps \
    --entrypoint "" mcp-server \
    sh -c "cd /mcp-server && npm test"

echo -e "${GREEN}✓ Tests complete${NC}"
