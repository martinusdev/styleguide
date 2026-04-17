# MCP Server

*Aktualizované: 2026-04-16*

MCP server poskytuje nástroje na preskúmavanie styleguide (komponenty, SCSS triedy, Pug mixiny, ikony, dátové štruktúry). Beží v Dockeri s prístupom iba na čítanie do `app/`.

Spustenie: `./mcp.sh`

## Konfigurácia Claude Code

Pridaj do `~/.config/claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "martinus-styleguide": {
      "command": "docker",
      "args": ["exec", "-i", "martinus-styleguide-mcp", "node", "/mcp-server/src/index.js"]
    }
  }
}
```

MCP server musí bežať pred spustením Claude Code. Spusti `./mcp.sh` ako prvé.

## Príkazy

```bash
# Zobrazenie logov
docker-compose -f docker/docker-compose.yml logs -f mcp-server

# Zastavenie
docker-compose -f docker/docker-compose.yml stop mcp-server

# Rebuild po zmenách
docker-compose -f docker/docker-compose.yml build --no-cache mcp-server
```

## Pridanie nového nástroja

1. Pridaj definíciu nástroja v `setupHandlers()` → handler `ListToolsRequestSchema`
2. Implementuj metódu nástroja (napr. `async myNewTool(args)`)
3. Pridaj `case` v handleri `CallToolRequestSchema`
4. Rebuild kontajner

## Riešenie problémov

**Kontajner sa nespustí:**
```bash
docker-compose -f docker/docker-compose.yml logs mcp-server
docker-compose -f docker/docker-compose.yml build --no-cache mcp-server
```

**Problémy s node_modules:**
```bash
docker volume rm martinus-styleguide_mcp_node_modules
docker-compose -f docker/docker-compose.yml up -d --build mcp-server
```

**Claude Code sa nevie pripojiť:**
1. Skontroluj, či kontajner beží: `docker ps | grep mcp`
2. Skontroluj syntax MCP konfigurácie v Claude Code
3. Reštartuj Claude Code po zmenách konfigurácie
