# MCP Server — deploy na Digital Ocean

*Aktualizované: 2026-05-06*

Návod na nasadenie MCP servera ako verejne dostupného HTTP endpointu pre tím
a externé nástroje (Cursor, Lovable). Lokálne stdio spustenie (`./mcp.sh`)
zostáva nezmenené — tu ide o samostatný always-on server.

Všetka konfigurácia (Dockerfile, compose, nginx) je versionovaná v repe pod
`mcp-server/`. Deploy je `git clone` + `docker compose up`. Nič sa na serveri
ručne nevytvára.

---

## Predpoklady

- DO Droplet: **Basic, 1 vCPU / 1 GB RAM** stačí (`s-1vcpu-1gb`, ~$6/mes)
- OS: Ubuntu 24.04 LTS
- Doména/subdoména smerujúca na Droplet (napr. `mcp.martinus.dev`)

---

## Architektúra

```
klient (Claude Code / Cursor / Lovable)
    ↓  HTTPS
nginx  (SSL termination, reverse proxy)
    ↓  HTTP (127.0.0.1:3001)
MCP server  (Node.js, Docker)
    ↓  HTTPS fetch (5-min TTL cache)
mrtns.sk/assets  (mcp-components.json, utilities.json, …)
```

Server beží v **external mode** — dáta načítava z CDN (`mrtns.sk/assets`),
nie z lokálneho FS. Repo na serveri slúži len ako zdroj pre `docker build`.

---

## 1. Príprava Droplet

```bash
apt update && apt upgrade -y
apt install -y docker.io docker-compose-v2 nginx certbot python3-certbot-nginx git
systemctl enable --now docker
```

---

## 2. Klonovanie repa

Ľubovoľná cesta — server nemá hard-coded path. Príklad:

```bash
git clone https://github.com/martinusdev/styleguide.git /opt/martinus-styleguide
cd /opt/martinus-styleguide
```

---

## 3. Spustenie MCP servera

```bash
cd /opt/martinus-styleguide/mcp-server/deploy
docker compose up -d --build
docker compose logs -f   # overenie
```

Kontajner sa nabinduje na `127.0.0.1:3001` — zvonku je nedostupný, čaká
na nginx.

---

## 4. nginx konfigurácia

Skopíruj template z repa, uprav `server_name`, vytvor symlink:

```bash
cp /opt/martinus-styleguide/mcp-server/deploy/nginx.conf.example \
   /etc/nginx/sites-available/mcp-styleguide

# Uprav server_name na svoju doménu
sed -i 's/CHANGE_ME.example.com/mcp.martinus.dev/' \
   /etc/nginx/sites-available/mcp-styleguide

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

## 6. Test

```bash
curl -X POST https://mcp.martinus.dev/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Očakávaný výsledok: JSON s listom nástrojov (`list_components`,
`get_component`, …).

---

## 7. Konfigurácia v Claude Code

V `~/.config/claude/claude_desktop_config.json`:

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

Lokálne `./mcp.sh` zostáva pre internal mode (prístup k zdrojákom cez
`MARTINUS_STYLEGUIDE_APP_DIR`).

---

## 8. Aktualizácie

```bash
cd /opt/martinus-styleguide
git pull
cd mcp-server/deploy
docker compose up -d --build
```

---

## Čo ešte treba rozhodnúť

- [ ] Doménové meno (`mcp.martinus.dev` alebo iné)
- [ ] Monitoring / uptime check (napr. UptimeRobot — zadarmo)