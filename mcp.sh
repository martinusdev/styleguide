#!/bin/bash
# Wrapper script to run the MCP server in Docker
# Usage: ./mcp.sh

set -e

cd "$(dirname "$0")/docker"

# Function to build with retry logic
build_with_retry() {
  local max_attempts=3
  local attempt=1
  local wait_time=5

  while [ $attempt -le $max_attempts ]; do
    echo "Build attempt $attempt of $max_attempts..."
    if docker-compose build mcp-server; then
      return 0
    fi
    
    if [ $attempt -lt $max_attempts ]; then
      echo "Build failed. Waiting ${wait_time}s before retry..."
      sleep $wait_time
      wait_time=$((wait_time * 2))
    fi
    attempt=$((attempt + 1))
  done
  
  echo "ERROR: Failed to build after $max_attempts attempts"
  echo "Possible causes:"
  echo "  1. Docker Hub is down (check: https://status.docker.com/)"
  echo "  2. Network connectivity issues"
  echo "  3. Docker daemon issues"
  echo ""
  echo "Suggestions:"
  echo "  - Wait a few minutes and try again"
  echo "  - Check your internet connection"
  echo "  - Try: docker pull node:20-alpine manually"
  return 1
}

# Build with retry logic
build_with_retry || exit 1

# Start the MCP server container
docker-compose up -d mcp-server

# Show container status
echo "MCP Server started. Container status:"
docker-compose ps mcp-server

echo ""
echo "To view logs: docker-compose -f docker/docker-compose.yml logs -f mcp-server"
echo "To stop: docker-compose -f docker/docker-compose.yml stop mcp-server"
