# Martinus Styleguide

Styleguide for [Martinus](https://www.martinus.sk), built with [light-scripts](https://github.com/lightingbeetle/light-scripts).

> Light is backbone for living styleguides.

## Quick Start

### Prerequisites
- [Docker](https://www.docker.com/)

### Usage

```bash
# Install dependencies (Docker container)
./npm.sh install

# Development server with live reload
./serve.sh
# Open http://localhost:3000

# Production build
./build.sh
# Output in dist/

# Any yarn command
./npm.sh <command>
```

### Installing / Updating Packages

```bash
# Add a specific package version
./npm.sh add package-name@1.2.3

# Update to latest version
./npm.sh add package-name@latest

# Check available updates
./npm.sh outdated
```

## Architecture

Everything runs in Docker for security and reproducibility:
- ✅ Isolated npm/yarn from host filesystem (supply chain protection)
- ✅ Non-root user execution
- ✅ Image optimization (gifsicle, optipng, mozjpeg)
- ✅ Build takes ~30 seconds

### Scripts
- `./npm.sh` - Run yarn commands
- `./build.sh` - Production build  
- `./serve.sh` - Development server

All scripts available as root symlinks or in `docker/` directory.

## Documentation

- [docker/README.md](docker/README.md) - Docker setup details
