# Docker

*Aktualizované: 2026-04-16*

Izolované, bezpečné Node.js/Yarn vývojové prostredie pre Martinus Styleguide.

## Stratégia volumes

- `styleguide_node_modules` – Named volume (izolovaný, bezpečný)
- `app/` – Read-write mount (zdrojový kód)
- `package.json`, `yarn.lock` – Read-write (aktualizácie závislostí)
- Konfiguračné súbory – Read-only mounty

## Bezpečnosť

- Non-root používateľ: `nodejs` (UID 1001)
- `no-new-privileges:true` – žiadna eskalácia oprávnení
- Izolované závislosti: node_modules nikdy nevystavené hostiteľovi
- Reprodukovateľné buildy: `yarn.lock` s `--frozen-lockfile`

## Riešenie problémov

**Kontajner sa nespustí:**
```bash
docker-compose logs styleguide
docker-compose build --no-cache
```

**Problémy s node_modules:**
```bash
docker volume rm martinus-styleguide_styleguide_node_modules
./npm.sh install
```

**Chyby oprávnení:**
```bash
sudo chown -R $USER app/
```

## Údržba

**Aktualizácia Node.js:**
1. Uprav `docker/Dockerfile` – zmeň `FROM node:20-alpine` na požadovanú verziu
2. Rebuild: `docker-compose build --no-cache && ./npm.sh install`

**Kompletné čistenie:**
```bash
docker-compose down -v
docker rmi martinus-styleguide-styleguide
```
