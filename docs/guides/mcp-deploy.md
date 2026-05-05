# MCP Server — deploy na Digital Ocean

*Aktualizované: 2026-05-05*

Návod na nasadenie MCP servera ako verejne dostupného HTTP endpointu.
Lokálne stdio-based spustenie (`./mcp.sh`) zostáva nezmenené — tu ide
o samostatný always-on server pre tím a externé nástroje (Lovable, Cursor).

---

## Predpoklady

- DO Droplet: **Basic, 1 vCPU / 1 GB RAM** stačí (napr. `s-1vcpu-1gb`, ~$6/mes)
- OS: Ubuntu 24.04 LTS
- Doména alebo subdoména smerujúca na Droplet (napr. `mcp.martinus.dev`)
- Docker + Docker Compose nainštalované na Dropleta

---

## Architektúra

```
klient (Claude Code / Cursor / Lovable)
    ↓  HTTPS
nginx  (SSL termination, reverse proxy)
    ↓  HTTP
MCP server  (Node.js, port 3001)
    ↓  HTTPS fetch (s 5-min TTL cache)
mrtns.sk/assets  (mcp-components.json, utilities.json, …)
```

Server beží v **external mode** — dáta načítava z CDN (`mrtns.sk/assets`),
nie z lokálneho súborového systému. Takže nepotrebuje kópiu repo.

---

## 1. Príprava Droplet

```bash
# Ako root / sudo user
apt update && apt upgrade -y
apt install -y docker.io docker-compose-v2 nginx certbot python3-certbot-nginx

systemctl enable --now docker
```

---

## 2. Dockerfile pre HTTP mód

Súčasný `mcp-server/Dockerfile` spúšťa server cez stdio. Pridaj nový
`mcp-server/Dockerfile.http` pre server deploy:

```dockerfile
FROM node:20-alpine

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /mcp-server

COPY package.json ./
RUN yarn install --frozen-lockfile --prefer-offline

COPY src/ ./src/

RUN chown -R nodejs:nodejs /mcp-server
USER nodejs

ENV MCP_TRANSPORT=http
ENV MCP_PORT=3001

EXPOSE 3001

CMD ["node", "src/index.js"]
```

---

## 3. docker-compose na serveri

Vytvor `/opt/mcp-styleguide/docker-compose.yml`:

```yaml
services:
  mcp:
    image: ghcr.io/martinusdev/styleguide-mcp:latest
    # alebo build lokálne:
    # build:
    #   context: .
    #   dockerfile: Dockerfile.http
    restart: unless-stopped
    environment:
      MCP_TRANSPORT: http
      MCP_PORT: "3001"
      # Voliteľné — ak chceš iné CDN ako mrtns.sk:
      # MARTINUS_STYLEGUIDE_ASSETS_URL: https://mrtns.sk/assets/martinus/lb/
    ports:
      - "127.0.0.1:3001:3001"
```

`127.0.0.1:3001` — kontajner nie je priamo dostupný zvonku, iba cez nginx.

---

## 4. nginx konfigurácia

`/etc/nginx/sites-available/mcp-styleguide`:

```nginx
server {
    listen 80;
    server_name mcp.martinus.dev;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;

        # SSE streaming (MCP používa Server-Sent Events)
        proxy_set_header Connection '';
        proxy_buffering off;
        proxy_cache off;
        chunked_transfer_encoding on;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/mcp-styleguide /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 5. SSL (Let's Encrypt)

```bash
certbot --nginx -d mcp.martinus.dev
```

Certbot upraví nginx config automaticky a nastaví auto-renew.

---

## 6. Spustenie

```bash
cd /opt/mcp-styleguide
docker compose up -d
docker compose logs -f   # overenie
```

Test:

```bash
curl -X POST https://mcp.martinus.dev/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Očakávaný výsledok: JSON s listom nástrojov (`list_components`, `get_component`, …).

---

## 7. Konfigurácia v Claude Code (po nasadení)

Namiesto lokálneho stdio spustenia stačí v `~/.config/claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "martinus-styleguide": {
      "type": "http",
      "url": "https://mcp.martinus.dev/mcp"
    }
  }
}
```

Lokálne `./mcp.sh` zostáva pre tých, čo chcú internal mode (prístup k
zdrojákom cez `MARTINUS_STYLEGUIDE_APP_DIR`).

---

## 8. Aktualizácie

Pri každom merge do `master` treba na serveri:

```bash
docker compose pull   # ak používaš ghcr.io image
# alebo ak buildíš lokálne:
git pull && docker compose build
docker compose up -d
```

Voliteľne: GitHub Actions workflow, ktorý po merge automaticky pushne
nový image na ghcr.io a zavolá deploy na server.

---

## Čo ešte treba rozhodnúť

- [ ] Doménové meno (`mcp.martinus.dev` alebo iné)
- [ ] Či buildovať image v GitHub Actions a pushovať na ghcr.io,
      alebo buildovať priamo na serveri z git pull
- [ ] Monitoring / uptime check (napr. UptimeRobot — zadarmo)
