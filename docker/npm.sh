#!/bin/bash
# Martinus Styleguide - Docker Yarn Helper
# Convenient wrapper for running yarn commands in Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# If this script is in the docker/ subdirectory, parent is styleguide root
# If called via symlink from root, we need to resolve to actual script location
if [[ "$SCRIPT_DIR" == */docker ]]; then
    STYLEGUIDE_ROOT="$(dirname "$SCRIPT_DIR")"
else
    # Script is being run from root as symlink, find docker directory
    STYLEGUIDE_ROOT="$SCRIPT_DIR"
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running${NC}"
    exit 1
fi

# Check if docker-compose.yml exists
if [ ! -f "$STYLEGUIDE_ROOT/docker/docker-compose.yml" ]; then
    echo -e "${RED}Error: docker-compose.yml not found in $STYLEGUIDE_ROOT/docker/${NC}"
    exit 1
fi

# Show usage
usage() {
    cat << EOF
${GREEN}Martinus Styleguide - Docker Yarn Helper${NC}

Usage: ./npm.sh [command] [args...]

Common commands:
    ./npm.sh build              # yarn build (production)
    ./npm.sh serve              # yarn serve (development server)
    ./npm.sh install            # yarn install
    ./npm.sh images             # yarn images
    ./npm.sh clear-cache        # yarn clear-cache
    ./npm.sh prepare            # yarn prepare
    ./npm.sh lint               # yarn lint-staged
    ./npm.sh shell              # Interactive shell in container
    ./npm.sh <any-yarn-cmd>     # Any yarn command

Examples:
    ./npm.sh build
    ./npm.sh add lodash
    ./npm.sh upgrade
    ./npm.sh outdated

For more help, see docker/README.md
EOF
}

# Main logic
case "${1:-}" in
    "help"|"-h"|"--help"|"")
        usage
        ;;
    "shell")
        echo -e "${YELLOW}Starting interactive shell in container...${NC}"
        cd "$STYLEGUIDE_ROOT"
        docker-compose -f docker/docker-compose.yml run --rm styleguide /bin/sh
        ;;
    "serve")
        echo -e "${YELLOW}Starting development server...${NC}"
        cd "$STYLEGUIDE_ROOT"
        docker-compose -f docker/docker-compose.yml up styleguide
        ;;
    "build"|"install"|"images"|"clear-cache"|"prepare"|"lint")
        echo -e "${YELLOW}Running: yarn $1${NC}"
        cd "$STYLEGUIDE_ROOT"
        docker-compose -f docker/docker-compose.yml run --rm styleguide yarn "$1"
        ;;
    *)
        # Pass through any yarn command
        echo -e "${YELLOW}Running: yarn $@${NC}"
        cd "$STYLEGUIDE_ROOT"
        docker-compose -f docker/docker-compose.yml run --rm styleguide yarn "$@"
        ;;
esac
