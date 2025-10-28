#!/bin/bash
# Build wrapper - builds in container without dist mount, then copies output to host
# This avoids EBUSY errors when gulp tries to delete the mounted dist directory

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

echo "Building in Docker..."
cd "$STYLEGUIDE_ROOT"

# Run build without --rm so we can copy files from container afterward
CONTAINER_ID=$(docker-compose -f docker/docker-compose.yml run --no-deps -T -d styleguide yarn build)

# Wait for build to complete
docker wait "$CONTAINER_ID"

# Check if build succeeded
BUILD_EXIT_CODE=$(docker inspect "$CONTAINER_ID" --format='{{.State.ExitCode}}')
if [ "$BUILD_EXIT_CODE" != "0" ]; then
    echo "Build failed with exit code $BUILD_EXIT_CODE"
    docker logs "$CONTAINER_ID"
    docker rm "$CONTAINER_ID"
    exit "$BUILD_EXIT_CODE"
fi

# Copy dist output from container to host
echo ""
echo "Copying build output to host..."

# Remove existing dist directory
rm -rf "$STYLEGUIDE_ROOT/dist"

# Copy from container
docker cp "$CONTAINER_ID:/app/dist" "$STYLEGUIDE_ROOT/"

# Clean up container
docker rm "$CONTAINER_ID" > /dev/null

echo "✓ Build output copied to host"
echo ""
echo "Build complete!"

echo "✅ Build complete! Output in dist/"
ls -lh "$STYLEGUIDE_ROOT/dist/" | head -10
