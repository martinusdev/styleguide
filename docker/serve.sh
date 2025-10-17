#!/bin/bash
# Development server wrapper
# Starts BrowserSync server inside Docker container
# Server will be accessible at http://localhost:3000

set -e

# Resolve the actual script location (handles symlinks)
SCRIPT_PATH="${BASH_SOURCE[0]}"
while [ -L "$SCRIPT_PATH" ]; do
  SCRIPT_DIR="$( cd -P "$( dirname "$SCRIPT_PATH" )" && pwd )"
  SCRIPT_PATH="$(readlink "$SCRIPT_PATH")"
  [[ $SCRIPT_PATH != /* ]] && SCRIPT_PATH="$SCRIPT_DIR/$SCRIPT_PATH"
done
SCRIPT_DIR="$( cd -P "$( dirname "$SCRIPT_PATH" )" && pwd )"
STYLEGUIDE_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Starting development server in Docker..."
echo ""
echo "🌐 Server will be available at: http://localhost:3000"
echo "   (Browser will not auto-open - visit URL manually)"
echo ""
echo "📝 Note: Changes are compiled in the container."
echo "   To persist dist/ to host, run ./docker/build.sh after stopping the server."
echo ""
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

cd "$STYLEGUIDE_ROOT"

# Run serve command with port mapping
# Use --service-ports to expose ports defined in docker-compose.yml
docker-compose -f docker/docker-compose.yml run --rm --service-ports styleguide yarn serve
