# Martinus Styleguide MCP Server

A Model Context Protocol (MCP) server that provides tools for querying the Martinus Styleguide codebase. This server runs in Docker and allows AI assistants like Claude to efficiently explore components, classes, mixins, and assets.

## Features

The MCP server provides 8 tools for exploring the styleguide:

### Component Tools

1. **list_components** - List all UI components/modules
   - Filter by type: `pug`, `scss`, `js`, or `all`
   - Returns component names and file paths

2. **get_component_info** - Get detailed information about a specific component
   - Retrieves Pug template, SCSS styles, and JavaScript
   - Shows all related files for a component

### SCSS Tools

3. **list_scss_utilities** - List SCSS utilities, variables, and mixins
   - Categories: `variables`, `mixins`, `utilities`, or `all`
   - Extracts from `app/styles/utils/`

4. **find_scss_class** - Search for SCSS class definitions
   - Supports wildcard patterns
   - Returns class names and file locations

### Pug Tools

5. **list_pug_mixins** - List all Pug mixins
   - Shows mixin names, parameters, and locations
   - Scans `app/views/mixins/`

6. **get_mixin_info** - Get detailed information about a specific mixin
   - Returns full mixin signature and content
   - Includes parameters and usage

### Asset Tools

7. **list_icons** - List all available SVG icons
   - Scans `app/icons_/`
   - Returns icon names and paths

8. **get_data_structure** - Get JSON data file structures
   - View template data from `app/views/data/`
   - Returns data.json and all data files

## Docker Setup

The MCP server runs in its own isolated Docker container with:

- **Security**: Runs as non-root user (nodejs, UID 1001)
- **Isolation**: Node modules in named volume `mcp_node_modules`
- **Read-only access**: App directory mounted read-only for indexing
- **No network ports**: Uses stdio for MCP communication

## Usage

### Starting the MCP Server

```bash
# From project root
./mcp.sh
```

This starts the MCP server container in the background.

### Viewing Logs

```bash
docker-compose -f docker/docker-compose.yml logs -f mcp-server
```

### Stopping the Server

```bash
docker-compose -f docker/docker-compose.yml stop mcp-server
```

### Rebuilding After Changes

```bash
docker-compose -f docker/docker-compose.yml build --no-cache mcp-server
docker-compose -f docker/docker-compose.yml up -d mcp-server
```

## Configuring Claude Code

To use this MCP server with Claude Code, add it to your Claude Code MCP configuration:

### macOS/Linux

Edit `~/.config/claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "martinus-styleguide": {
      "command": "docker",
      "args": [
        "exec",
        "-i",
        "martinus-styleguide-mcp",
        "node",
        "/mcp-server/src/index.js"
      ]
    }
  }
}
```

### Windows

Edit `%APPDATA%\Claude\claude_desktop_config.json` with the same configuration.

**Important**: The MCP server container must be running before starting Claude Code. Run `./mcp.sh` first.

## Development

### Directory Structure

```
mcp-server/
├── Dockerfile          # Container definition
├── package.json        # Node dependencies
├── src/
│   └── index.js        # MCP server implementation
└── README.md          # This file
```

### Adding New Tools

To add a new tool:

1. Add tool definition in `setupHandlers()` → `ListToolsRequestSchema` handler
2. Add tool implementation method (e.g., `async myNewTool(args)`)
3. Add case in `CallToolRequestSchema` handler switch statement
4. Rebuild the container

### Dependencies

- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `glob` - File pattern matching
- `cheerio` - HTML/XML parsing (for future SVG analysis)

## How It Works

1. The MCP server runs in Docker with read-only access to `app/`
2. Tools use `glob` to find files and `readFile` to read contents
3. Regular expressions extract SCSS variables, mixins, class names, and Pug mixin signatures
4. Results are returned as JSON through the MCP protocol
5. Claude Code receives the data and can use it to understand the codebase

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose -f docker/docker-compose.yml logs mcp-server

# Rebuild from scratch
docker-compose -f docker/docker-compose.yml build --no-cache mcp-server
```

### Node modules issues

```bash
# Remove volume and reinstall
docker volume rm martinus-styleguide_mcp_node_modules
docker-compose -f docker/docker-compose.yml up -d --build mcp-server
```

### Claude Code can't connect

1. Ensure the container is running: `docker ps | grep mcp`
2. Check Claude Code MCP config syntax
3. Restart Claude Code after configuration changes
4. Check Claude Code logs for MCP connection errors

## Security

The MCP server follows the same security principles as the main styleguide:

- Runs as non-root user
- Node modules isolated in Docker volume
- App directory mounted read-only
- No network ports exposed
- Security option: `no-new-privileges:true`

This prevents the MCP server from modifying source code or accessing the host filesystem beyond the mounted app directory.
