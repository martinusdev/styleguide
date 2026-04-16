# CLAUDE.md

*Aktualizované: 2026-04-16*

## Prehľad projektu

Toto je Martinus Styleguide – živý styleguide pre [Martinus.sk](https://www.martinus.sk) postavený na [light-scripts](https://github.com/lightingbeetle/light-scripts). Ako task runner používa Gulp a celý beží v Dockeri pre bezpečnostnú izoláciu.

## Kritické: Vývoj výlučne cez Docker

**NIKDY nespúšťaj `yarn` ani `npm` priamo.** Projekt používa Docker na izoláciu npm/yarn od hostiteľského súborového systému kvôli bezpečnosti supply chain. Vždy používaj wrapper skripty:

- `./npm.sh <príkaz>` – Spustí ľubovoľný yarn príkaz v Dockeri
- `./build.sh` – Produkčný build
- `./serve.sh` – Vývojový server (http://localhost:3000)
- `./mcp.sh` – Spustí MCP server pre integráciu s Claude Code

### Bežné príkazy

```bash
# Inštalácia závislostí
./npm.sh install

# Vývojový server s live reload
./serve.sh

# Produkčný build (výstup v dist/)
./build.sh

# Pridanie/aktualizácia balíčkov
./npm.sh add package-name@version

# Kontrola aktualizácií
./npm.sh outdated

# Lint JavaScriptu
./npm.sh run lint-staged

# Vyčistenie build cache
./npm.sh run clear-cache

# Spracovanie iba obrázkov
./npm.sh run images
```

## Jazyk

- Kód, názvy tried, premenných, komentáre: **anglicky**
- Dokumentácia a PR popisy: **slovensky**

## Git konvencie

- Hlavná vetva: `master`
- Commit správy: slovenčina, trpný rod – „Pridaný komponent...", „Opravené zobrazenie..."
- **Žiadne `Co-Authored-By`**, žiadne zmienky o AI nástrojoch

### Formát PR popisu

PR popis má vždy dve časti:

**1. Úvodný odstavec** — 2–4 vety vysvetľujúce čo a prečo sa zmenilo. Boldy = skimmable príbeh.

**2. `## Detaily`** — technické odrážky, čo konkrétne sa zmenilo. Kľúčové pojmy boldom. Ak PR rieši issue: `Closes #číslo`.

Príklad:
> **Tlačidlo „Kúpiť"** malo na mobile príliš malý hit-target a **spôsobovalo chyby pri klikaní**. Zvýšená minimálna výška na 48px.
>
> ## Detaily
> - Upravená výška `.btn` na `min-height: 48px`
> - Closes #42

## Architektúra

### Build systém

- **Task runner**: Gulp 4 s gulp-hub registrom
- **Základný framework**: light-scripts (vlastný fork na martinusdev/light-scripts)
- **Požiadavka na Node**: >=18.2.0
- **Hlavná konfigurácia**: `light.config.js` – rozširuje a prispôsobuje konfiguráciu light-scripts

### Kľúčové konfiguračné súbory

- `light.config.js` – Hlavná konfigurácia pre light-scripts:
  - Vlastné SVGO pluginy pre ikony a obrázky
  - Integrácia ESLint webpack pluginu
  - Vypína automatické otváranie prehliadača v Docker prostredí (`serve.open: false`)
  - Vlastná cheerio konfigurácia na odstránenie fill atribútov SVG (zachovaj pomocou `[data-keep-fill]`)

- `gulpfile.js` – Minimálny wrapper, ktorý:
  - Načítava premenné prostredia z `.env`
  - Spúšťa task `prepare` na skopírovanie lightgallery assets do `app/images/` a `app/fonts/`
  - Deleguje na light-scripts cez gulp-hub register

### Štruktúra adresárov

```
app/
├── views/          # Pug šablóny
│   ├── layouts/    # Layouty stránok
│   ├── mixins/     # Znovupoužiteľné Pug mixiny
│   ├── modules/    # UI moduly
│   ├── styleguide/ # Stránky špecifické pre styleguide
│   └── data/       # JSON dáta pre šablóny
├── scripts/        # JavaScript
│   ├── modules/    # JS moduly
│   ├── plugins/    # Pluginy tretích strán
│   └── main.js     # Vstupný bod
├── styles/         # SCSS
│   ├── base/       # Globálne štýly, typografia
│   ├── layout/     # Grid, štruktúra stránky
│   ├── modules/    # Znovupoužiteľné UI vzory (tlačidlá, formuláre atď.)
│   ├── components/ # Špecifické komponenty (produkty, menu atď.)
│   ├── sections/   # Hlavička, pätička
│   ├── pages/      # Štýly špecifické pre stránky
│   ├── utils/      # Premenné, mixiny, funkcie
│   └── main.scss   # Hlavný vstupný bod
├── images/         # Obrázky
├── icons_/         # SVG ikony (spracované s vlastnou konfiguráciou)
└── fonts/          # Web fonty
```

### Architektúra štýlov

Projekt používa Bootstrap 5.3.7 utilities API s vlastnými utilitami definovanými v `app/styles/_utilities.scss`. SCSS sleduje ITCSS-like štruktúru:

1. **Vendors**: normalize.css, Bootstrap, Swiper
2. **Utils**: Bootstrap funkcie/mixiny, vlastné premenné/mixiny
3. **Base**: Globálne štýly, typografia
4. **Layout**: Grid systém, sekcie, kontajnery
5. **Modules**: Znovupoužiteľné UI vzory (tlačidlá, formuláre, karty, tabuľky atď.)
6. **Components**: Špecifické business komponenty (produkty, navigácia atď.)
7. **Sections**: Hlavička, pätička
8. **Pages**: Prepisy špecifické pre stránky
9. **Tools**: Dodatočné utility
10. **Shame**: Rýchle opravy (na refaktorovanie)

### Architektúra JavaScriptu

- **Vstupný bod**: `app/scripts/main.js`
- **Vendor bundles**: Samostatný `vendor.js` pre knižnice tretích strán
- **Vzor modulov**: Jednotlivé moduly v `app/scripts/modules/`
- **Light moduly**: Framework-špecifické v `app/scripts/lightModules/`

Kľúčové závislosti: jQuery 3.7.1, Bootstrap 5.3.7, Swiper, Chart.js, lightgallery.js

### Systém šablón

- **Engine**: Pug (predtým Jade)
- **Dáta**: JSON súbory v `app/views/data/` a `app/views/data.json`
- **Mixiny**: Znovupoužiteľné komponenty v `app/views/mixins/`
- **Prefix pre assety**: V šablónach používaj `${assetsPrefix}` pre správne cesty k assetom

## Linting

### JavaScript (ESLint)

- **Konfigurácia**: `eslint.config.js` (flat config) + inline konfigurácia v `package.json`
- **Základ**: airbnb-base style guide
- **Globály**: jQuery, Modernizr
- **Ignorované**: node_modules, dist, plugins, font-awesome.js

### SCSS (Stylelint)

- **Konfigurácia**: `.stylelintrc.json`
- **Základ**: stylelint-config-sass-guidelines
- **Ignorované**: app/styles/vendors/
- **Kľúčové úpravy**: Bez max-nesting-depth, flexibilné vzory selektorov

### Pre-commit hooks

Projekt používa `pre-commit` + `lint-staged`:
- Lintuje `app/scripts/**/*.js` pomocou ESLint
- Lintuje `app/styles/**/*.scss` pomocou Stylelint

## Docker – detaily

### Stratégia volumes

- `styleguide_node_modules` – Named Docker volume (nikdy nevystavený hostiteľovi)
- `app/`, `package.json`, `yarn.lock` – Mountované read-write
- Konfiguračné súbory – Mountované read-only

### Riešenie problémov

```bash
# Kontajner sa nespustí
docker-compose logs styleguide
docker-compose build --no-cache

# Problémy s node_modules
docker volume rm martinus-styleguide_styleguide_node_modules
./npm.sh install

# Chyby oprávnení
sudo chown -R $USER app/
```

Podrobná Docker dokumentácia: `docs/guides/docker.md`.

## MCP Server (Model Context Protocol)

Vlastný MCP server poskytuje nástroje na preskúmavanie styleguide (komponenty, SCSS triedy, Pug mixiny, ikony, dátové štruktúry). Spustenie: `./mcp.sh`. Inštrukcie na nastavenie: `docs/guides/mcp-server.md`.

## Dôležité poznámky

- Všetky skripty používajú flag `--openssl-legacy-provider` kvôli kompatibilite s Node
- Task `prepare` musí bežať pred prvým buildom – kopíruje lightgallery assets
- Podporované formáty obrázkov: gif, png, jpg, svg, webp (vlastná konfigurácia v `light.config.js`)
- SVG ikonám sa automaticky odstraňujú fill atribúty (zachovaj pomocou `[data-keep-fill]`)
- Vývojový server beží na http://localhost:3000 (prehliadač sa v Dockeri neotvorí automaticky)
- Produkčné buildy sa ukladajú do `dist/`
