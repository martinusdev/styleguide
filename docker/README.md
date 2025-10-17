# Styleguide Docker Setup

This directory contains the Docker configuration for isolated, secure Yarn/Node.js development environment for the Martinus Styleguide project.

## Why Docker for Yarn?

Running Yarn locally exposes your filesystem to potential attacks:
- **Supply chain attacks**: Malicious packages could access your entire filesystem
- **Data leaks**: Attackers could exfiltrate credentials, keys, or project data
- **System compromise**: Root-level yarn processes could affect your entire machine

This Docker setup contains yarn operations to a sandboxed environment with:
- ✅ Isolated filesystem access (only necessary directories mounted)
- ✅ Non-root user execution (nodejs user, UID 1001)
- ✅ Containerized `node_modules` (named volume, not on host filesystem)
- ✅ Reproducible builds (uses yarn.lock with --frozen-lockfile)
- ✅ Offline-first installation strategy

## Quick Start

### Build the Docker image
```bash
cd styleguide
docker-compose -f docker/docker-compose.yml build
```

### Install dependencies
```bash
./npm.sh install
# or use the frozen lockfile for exact reproducible installs:
docker-compose -f docker/docker-compose.yml run --rm styleguide yarn install --frozen-lockfile
```

### Run common yarn scripts

#### Development server
```bash
./docker/serve.sh
# Starts BrowserSync on http://localhost:3000
# Auto-reloads browser on file changes

# Alternative:
./npm.sh serve
```

#### Production build
```bash
./docker/build.sh
# Builds in container, then copies dist/ to host (~30s)

# Alternative:
./npm.sh build
```

#### Prepare assets
```bash
./npm.sh prepare
```

#### Optimize images
```bash
./npm.sh images
```

#### Clear cache
```bash
./npm.sh clear-cache
```

#### Lint JavaScript & Styles
```bash
./npm.sh lint
```

## Architecture

### Volume Strategy

```
styleguide_node_modules (Named Volume)
  └─ /app/node_modules
     └─ All yarn dependencies (isolated, secure)

Host Filesystem ↔ Container
  ├─ app/ (read-write)
  │  └─ Source code for building
  ├─ tmp/ (read-write)
  │  └─ Build artifacts
  ├─ .tmp/ (read-write)
  │  └─ Temporary files
  └─ config files (read-only)
     └─ .babelrc, gulpfile.js, etc.
```

### Security Features

1. **Non-root user**: Container runs as `nodejs` user (UID 1001)
2. **No privilege escalation**: Security opt `no-new-privileges:true`
3. **Isolated dependencies**: `node_modules` lives in named Docker volume, never exposed to host
4. **Reproducible builds**: Uses `yarn.lock` with `--frozen-lockfile` flag
5. **Minimal filesystem exposure**: Only `app/` and necessary config files are mounted

## Environment Variables

The container sets these by default:
- `CI=true` - Ensures non-interactive npm behavior
- `NODE_ENV=development` - Can be overridden for production builds

Override environment variables:
```bash
docker-compose run -e NODE_ENV=production styleguide npm run build
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs styleguide

# Rebuild the image
docker-compose build --no-cache
```

### Permission errors on files
The container runs as non-root user. If you need to modify files created by Docker:
```bash
# On host, fix permissions
sudo chown -R $USER styleguide/app/
```

### Node modules causing issues
Clear the named volume and reinstall:
```bash
docker volume rm styleguide_styleguide_node_modules
docker-compose run --rm styleguide npm ci
```

### Need to use a specific npm command?
```bash
docker-compose run --rm styleguide npm <any-command-here>
```

## Development Workflow

### Initial setup
```bash
cd styleguide
docker-compose -f docker/docker-compose.yml build
./npm.sh install
```

### Daily development
```bash
# In styleguide/ directory
./npm.sh serve
# This runs yarn serve
```

### When package.json changes
```bash
./npm.sh install
./npm.sh serve
```

## Maintenance

### Update Node.js version
Edit `docker/Dockerfile`:
```dockerfile
FROM node:20-alpine  # Change 18 to desired version
```

Then rebuild:
```bash
docker-compose -f docker/docker-compose.yml build --no-cache
./npm.sh install
```

### Clean up
```bash
# Stop container
docker-compose -f docker/docker-compose.yml down

# Remove named volume (WARNING: deletes node_modules)
docker volume rm styleguide_styleguide_node_modules

# Remove image
docker rmi martinus-styleguide-build
```

## Advanced Usage

### Running with different yarn scripts
```bash
# Build for production
./npm.sh build

# Run linting
./npm.sh lint

# Add a new dependency
./npm.sh add lodash

# Remove a dependency
./npm.sh remove lodash

# Check outdated packages
./npm.sh outdated

# Interactive yarn shell
./npm.sh shell
```

### Mount additional volumes for debugging
```bash
docker-compose -f docker/docker-compose.yml run --rm -v $(pwd)/logs:/app/logs styleguide yarn build
```

## Security Best Practices

1. **Always use `--frozen-lockfile`** - Ensures yarn.lock is not updated unexpectedly
2. **Keep Node.js updated** - Regular Docker image rebuilds
3. **Review yarn.lock changes** before committing to version control
4. **Keep Docker daemon updated** for security patches
5. **Don't run `yarn publish` from this container** - use authenticated host environment
6. **Verify package integrity** - Check checksums of critical dependencies
7. **Use `yarn outdated`** regularly to monitor for deprecated packages

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose -f docker/docker-compose.yml logs styleguide

# Rebuild the image
docker-compose -f docker/docker-compose.yml build --no-cache
```

### Permission errors on files
The container runs as non-root user. If you need to modify files created by Docker:
```bash
# On host, fix permissions
sudo chown -R $USER styleguide/app/
```

### Node modules causing issues
Clear the named volume and reinstall:
```bash
docker volume rm styleguide_styleguide_node_modules
./npm.sh install
```

### Need to use a specific yarn command?
```bash
./npm.sh <any-yarn-command-here>
# or
docker-compose -f docker/docker-compose.yml run --rm styleguide yarn <any-command>
```

## References

- [Node.js Docker Official Images](https://hub.docker.com/_/node)
- [Yarn Documentation](https://yarnpkg.com/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [Yarn Offline Documentation](https://yarnpkg.com/advanced/offline-mirror)
