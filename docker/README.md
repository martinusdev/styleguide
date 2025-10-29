# Styleguide Docker Setup

Isolated, secure Yarn/Node.js development environment for the Martinus Styleguide project.

## Why Docker for Yarn?

Running Yarn locally exposes your filesystem to supply chain attacks. This Docker setup:
- ✅ Isolates npm/yarn from host filesystem
- ✅ Runs as non-root user (nodejs, UID 1001)
- ✅ Containerizes node_modules (named volume)
- ✅ Ensures reproducible builds (yarn.lock)

## Quick Start (Linux/Mac)

```bash
./npm.sh install       # Install dependencies
./build.sh             # Production build
./serve.sh             # Development server (http://localhost:3000)
./npm.sh add package   # Add/update packages
./npm.sh outdated      # Check for updates
```

## Quick Start - Windows

```powershell
.\docker\npm.ps1 install       # Install dependencies
.\docker\build.ps1             # Production build
.\docker\serve.ps1             # Development server (http://localhost:3000)
.\docker\npm.ps1 add package   # Add/update packages
.\docker\npm.ps1 outdated      # Check for updates
```

For more, see [../readme.md](../readme.md).

## Volume Strategy

- `styleguide_node_modules` - Named volume (isolated, secure)
- `app/` - Read-write mount (source code)
- `package.json` & `yarn.lock` - Read-write (dependency updates)
- Config files - Read-only mounts

## Security

- Non-root user: `nodejs` (UID 1001)
- `no-new-privileges:true` - No privilege escalation
- Isolated dependencies: node_modules never exposed to host
- Reproducible builds: `yarn.lock` with `--frozen-lockfile`

## Troubleshooting

**Container won't start?**
```bash
docker-compose logs styleguide
docker-compose build --no-cache
```

**Node modules issues?**
```bash
docker volume rm martinus-styleguide_styleguide_node_modules
./npm.sh install
```

**Permission errors?**
```bash
sudo chown -R $USER app/
```

## Maintenance

**Update Node.js version:**
1. Edit `docker/Dockerfile` - change `FROM node:20-alpine` to desired version
2. Rebuild: `docker-compose build --no-cache && ./npm.sh install`

**Clean up everything:**
```bash
docker-compose down -v
docker rmi martinus-styleguide-styleguide
```
