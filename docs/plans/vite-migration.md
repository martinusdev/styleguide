# Migrácia z light-scripts/Gulp na Vite

*Vytvorené: 2026-05-15*
*Status: návrh — pred začatím PoC*

## Motivácia

Súčasný build pipeline stojí na **light-scripts 3.3.1** (vlastný fork `martinusdev/light-scripts`), ktorý je interne postavený na Gulp 4 + Webpack 4 + Babel. Hlavné dôvody pre migráciu:

- **Bezpečnostné riziko**: light-scripts nie je aktívne udržiavaný, Webpack 4 je end-of-life, Babel 7 a desiatky pluginov dostávajú minimálne bezpečnostné updaty.
- **Pomalý dev loop**: full reload, žiadne HMR pre JS, Webpack 4 cold start je pomalý.
- **Zlá pripravenosť na AI-agentic vývoj**: zložitá vrstva nepriehľadnej konfigurácie, ktorá sťažuje LLM agentom správne zasiahnuť do build pipeline.
- **`--openssl-legacy-provider` hack**: indikátor toho, že stack drží pohromade len vďaka workaroundu Node.js 18+.

## Princípy migrácie

1. **Bit-by-bit kontrakt so CakePHP**: `dist/` výstup musí ostať konzumovateľný pre Martinus CakePHP projekt. Žiadny breaking change v štruktúre alebo formáte manifestu.
2. **Pug zostáva v Gulpe** — táto migrácia rieši build pipeline, nie tooling pre styleguide showcase. Pug vrstva sa rieši samostatne (potenciálne Astro v budúcnosti).
3. **Hybridný setup počas tranzície**: Vite preberá JS/CSS/images/icons, light-scripts/Gulp zostáva iba pre `templates` (Pug) a `prepare` (asset copy z node_modules).
4. **Iteratívny PoC**: nový pipeline beží paralelne so starým, kým sa neoverí parita výstupu.

## Inventár súčasných build fáz

Light-scripts orchestrátor (sekvencia): `clean → icons → [styles, scripts, images, copy, templates] → modernizr → cacheBust → buildSize → notify`

| # | Fáza | Plugin / nástroj | Vstup | Výstup |
|---|---|---|---|---|
| 1 | `clean` | `del` | — | prázdne `.tmp/`, `dist/` |
| 2a | `iconsApp` | `gulp-imagemin` + `gulp-cheerio` + `gulp-svgstore` | `app/icons/app/*.svg` | `dist/icons/app.svg` (sprite, prefix `icon-`) |
| 2b | `iconsStyleguide` | rovnaké ako 2a | `app/icons/styleguide/*.svg` | `dist/icons/styleguide.svg` (prefix `icon-sg-`) |
| 3a | `stylesLint` | `gulp-stylelint` | `app/styles/**/*.scss` | console report |
| 3b | `stylesBuild` | `gulp-sass` + `postcss` (`autoprefixer`, `cssnano`, `postcss-inline-svg`) | `app/styles/*.scss` | `dist/styles/*.css` |
| 4 | `scripts` | Webpack 4 + `babel-loader` + `eslint-loader` | `app/scripts/*.js` | `dist/scripts/*.js` + vendor chunk |
| 5 | `images` | `gulp-imagemin` (gifsicle, mozjpeg, svgo) + `gulp-cache` | `app/images/**/*` | optimalizované obrázky |
| 6 | `copy` | čistý gulp stream | `app/fonts/**`, `app/*.*` | `dist/fonts/`, root files |
| 7a | `templatesPrepareData` | `gulp-yaml-merge` | `app/views/**/*.yaml` | `.tmp/data/data.yaml` |
| 7b | `templatesBuild` | `gulp-pug` + `gulp-pug-inheritance` + helpers | `app/views/**/*.pug` | `dist/*.html` |
| 8 | `modernizr` | `gulp-modernizr` | scanned JS + CSS | `dist/scripts/plugins/modernizr.js` |
| 9 | `cacheBust` | `gulp-rev-all` | `dist/**/*.{css,js,html}` | `dist/**/*.HASH.{css,js}` + `rev-manifest.json` |
| 10 | `buildSize` | `gulp-size` | `dist/**` | console output (gzipped sizes) |
| 11 | `notify` | `node-notifier` | — | desktop notification |
| extra | `prepare` | Node skript | `node_modules/lightgallery.js`, `node_modules/swiper` | `app/images/lightgallery/`, `app/fonts/lightgallery/`, `app/styles/vendors/swiper/_swiper-bundle.scss` |
| extra | `postbuild` | `scripts/emit-mcp-artifacts.js` | `dist/**` | `dist/mcp-components.json`, `dist/utilities.json`, `dist/icons.json` |

### Projektové overrides v `light.config.js`

- **SVGO**: `removeStyleElement: false`, `removeViewBox: false`, `removeDimensions: false`, `convertStyleToAttrs: false`
- **Cheerio (icons)**: odstránenie `fill` atribútov, okrem elementov s `[data-keep-fill]`
- **PostCSS**: `inlineSvgCfg: { removeFill: false }`
- **Webpack**: custom rule pre `swiper/**/*.mjs` (Babel transform s optional chaining + nullish coalescing), pridaný `ESLintWebpackPlugin`
- **BrowserSync**: `serve.open: false` (Docker headless)

## Rozhodnutia o kontrakte so CakePHP

### 1. Formát manifestu — query param hashing

**Pôvodný stav**: `gulp-rev-all` generuje fyzicky **dva** súbory (`main.css` + `main.bd16785f.css`) plus `rev-manifest.json` v tvare `{ "main.css": "main.bd16785f.css" }`. CakePHP konzumuje len `main.css` cez query param, hashed súbor je dead weight.

**Nový stav**: Vite vyrobí **iba clean filenames**. Post-build skript vypočíta hash z obsahu súboru a vyrobí manifest v tvare:

```json
{
  "styles/main.css": "styles/main.css?v=bd1678f",
  "scripts/main.js": "scripts/main.js?v=99533015"
}
```

**Benefit**: o polovicu menej súborov v `dist/`, jednoduchší výstup, žiadny `gulp-rev-all` config.

### 2. Pug — zachovaný, mimo scope migrácie

Pug šablóny zostávajú na light-scripts/Gulp. Migrácia template vrstvy je samostatná iniciatíva (potenciálne Astro), nie súčasť tohto plánu.

### 3. Bundle splitting — vendor chunk

Aktuálny Webpack má `splitChunks: { chunks: 'initial' }`, ale s entries typu `charts.js`, `html3d.js`, `gallery.js` (každý feature samostatne) vendor chunk v praxi nehrá veľkú rolu. Vite/Rollup default (každý entry = samostatný bundle) je prijateľný. Ak sa neskôr ukáže, že treba zdieľať vendor kód, pridáme `manualChunks`.

## Mapovanie fáz: light-scripts → Vite

| # | Light-scripts | Nový mechanizmus | Riziko |
|---|---|---|---|
| 1 | `clean` | `rimraf` v npm scripte / `vite build --emptyOutDir` | ✅ Nízke |
| 2a, 2b | SVG sprites | `vite-plugin-svg-sprite` (per-directory config) alebo Node skript volajúci `svg-sprite` knižnicu pred Vite buildom | ⚠️ Stredné — treba zachovať cheerio fill-stripping override |
| 3a | `stylesLint` | `vite-plugin-stylelint` (dev warning, CI failure) | ✅ Nízke |
| 3b | `stylesBuild` | Vite natívne: Dart Sass + PostCSS (`autoprefixer`, `cssnano`, `postcss-inline-svg`) | ✅ Nízke |
| 4 | `scripts` | Vite (Rollup) + `vite-plugin-eslint`; `@vitejs/plugin-legacy` ak treba broad browser support | ⚠️ Stredné — multi-entry config + Swiper Babel transform |
| 5 | `images` | `vite-imagetools` alebo build-time `sharp`/`imagemin` skript | ✅ Nízke |
| 6 | `copy` | `vite-plugin-static-copy` | ✅ Nízke |
| 7 | `templates` | **bez zmeny — Gulp** | — |
| 8 | `modernizr` | Post-build skript volajúci `customizr` CLI | ⚠️ Stredné |
| 9 | `cacheBust` | Vite vyrobí clean filenames; post-build skript dopočíta hashe a napíše `rev-manifest.json` v query-param formáte | ⚠️ Stredné — kontrakt s CakePHP |
| 10 | `buildSize` | `rollup-plugin-visualizer` + manuálne size reporting | ✅ Nízke |
| 11 | `notify` | npm `post*` hook s `node-notifier` | ✅ Nízke |
| extra | `prepare` | **bez zmeny — Node skript** v `scripts/prepare.js`, volaný cez `postinstall` | ✅ Nízke |
| extra | `postbuild` MCP artifacts | **bez zmeny** | ✅ Nízke |

## Cieľová architektúra

```
┌─────────────────────────────────────────────────────────────────┐
│                         VITE                                    │
│  scripts (multi-entry)   │   dev server (HMR pre JS/CSS)        │
│  styles (SCSS + PostCSS) │   build (Rollup pod kapotou)         │
│  images, fonts, icons    │   ESLint + Stylelint integrácia      │
│  static copy             │                                      │
└─────────────────────────┬───────────────────────────────────────┘
                          │  oba zapisujú do
                          ▼
                      ┌───────────┐
                      │  dist/    │  ← konzumuje CakePHP martinus
                      └───────────┘
                          ▲
                          │
┌─────────────────────────┴───────────────────────────────────────┐
│                  GULP (light-scripts subset)                    │
│  templates (Pug + YAML data merge)                              │
│  watch a regenerácia HTML do dist/                              │
└─────────────────────────────────────────────────────────────────┘
                          ▲
                          │
                ┌──────────────────────┐
                │  Node skripty        │
                │  - prepare           │  (asset copy z node_modules)
                │  - postbuild MCP     │
                │  - manifest writer   │  (rev-manifest.json)
                │  - modernizr build   │
                └──────────────────────┘
```

### Dev mode

- Vite dev server (`localhost:3000`) servuje JS/CSS s HMR.
- Gulp `watch` task regeneruje HTML do `.tmp/` (alebo priamo `dist/`) pri zmenách v Pug/YAML.
- Vite proxuje HTML požiadavky cez middleware tak, aby URL pattern `/styleguide/X` fungoval (riešenie cez `appType: 'mpa'` + multi-entry alebo `vite-plugin-rewrite-all`).

### Build mode

- `./build.sh` interne spustí: `gulp prepare` (ak treba) → `vite build` (paralelne s) `gulp templates` → post-build skripty (manifest, modernizr, MCP artifacts) → notify.
- User-facing rozhranie (`./build.sh`, `./serve.sh`, `./npm.sh`) sa nemení.

## Otvorené otázky pred PoC

1. **Vite multi-entry HTML routing**: rozhodnúť medzi `appType: 'mpa'` (vyžaduje HTML súbory ako Vite entries) alebo middleware proxy do `dist/` (HTML sú generované Gulpom a Vite ich len servuje). Druhá cesta je lepšie zladená s tým, že Pug ostáva v Gulpe.
2. **SVG sprite plugin pre Vite**: overiť, či existujúci plugin podporuje cheerio-style atribút stripping s `[data-keep-fill]` výnimkou. Ak nie, napísať vlastný malý plugin alebo pre-build skript.
3. **Swiper Babel transform**: či Vite/esbuild zvládne Swiper v12 `.mjs` súbory natívne (esbuild má optional chaining a nullish coalescing). Pravdepodobne odpadá potreba custom Babel rule.
4. **`postcss-inline-svg`**: overiť, že beží v Vite PostCSS pipeline rovnako ako v gulp-postcss.

## Postup

### Fáza 0 — Overenie kontraktu so CakePHP ✅ HOTOVO

Výstup: [`vite-migration-contract.md`](./vite-migration-contract.md).

**Kľúčové zistenia**:
- `dist/` je **bind-mounted** priamo do CakePHP kontajnera, žiaden copy step.
- `AssetHelper::styleguideUrl()` regex transformuje `main.HASH.css` → `main.css?id=HASH`. **Query-param formát manifestu funguje bez zmeny PHP kódu** — regex sa neaplikuje a hodnota prejde nezmenená.
- Hash môže byť **v ľubovoľnom formáte** — pri query-param manifeste PHP regex naň nepozerá, hodnota prejde nezmenená. Vite default je OK, žiadna transformácia netreba.
- Ikony cesta `/icons_/app.svg` je **hardcoded** v `HtmlHelper.php:22`, nepoužíva manifest. Adresár sa volá `icons_` (s podčiarkovníkom) — Vite musí zachovať.
- **Critical CSS** — rieši samostatný build skript na CakePHP strane, mimo scope tejto migrácie.
- **Sub-modulové entries** (`MartinusKiosk`, `MartinusSites`, `MartinusCampaigns`) — nie sú v scope, pracujeme s entries zachytenými v `Martinus/Core` (eshop) a so súčasným zoznamom z light-scripts (`app/scripts/*.js`).

### Fáza 1 — Vite PoC paralelne s Gulp (2-3 dni)

- [ ] Vytvoriť branch `feature/vite-migration`.
- [ ] Pridať Vite ako dev dependency cez `./npm.sh add -D vite`.
- [ ] Vytvoriť `vite.config.ts` s minimálnou konfiguráciou: jeden JS entry (`main.js`), jeden SCSS entry (`main.scss`).
- [ ] Output do `dist-vite/` (aby súčasný `dist/` ostal nedotknutý).
- [ ] Pridať PostCSS plugins: `autoprefixer`, `cssnano`, `postcss-inline-svg`.
- [ ] Manuálne porovnať `dist-vite/styles/main.css` s `dist/styles/main.css` — overiť parita.
- [ ] Manuálne porovnať `dist-vite/scripts/main.js` s `dist/scripts/main.js` — overiť parita.

**Cieľ**: dokázať, že Vite vyrobí funkčne ekvivalentný output pre 1 entry.

### Fáza 2 — Pokrytie zvyšných fáz (3-5 dní)

- [ ] Multi-entry config (`main`, `light`, `charts`, `html3d`, `gallery`, `font-awesome`, `font-loader`, `knizna-odysea`).
- [ ] SVG sprite generation (icons app + styleguide) cez plugin alebo pre-build skript.
- [ ] Image optimization pipeline.
- [ ] Static copy (fonts, root files).
- [ ] Stylelint + ESLint integrácia.
- [ ] Modernizr lean build (post-build skript).
- [ ] Manifest writer (post-build skript s query-param formátom).
- [ ] Build size reporting.

**Cieľ**: `dist-vite/` obsahuje všetko okrem HTML stránok (tie generuje Gulp).

### Fáza 3 — Hybridný dev/build orchestrator (2 dni)

- [ ] Upraviť `./build.sh` tak, aby spúšťal Vite build + Gulp templates paralelne, do toho istého `dist/` adresára.
- [ ] Upraviť `./serve.sh` tak, aby spúšťal Vite dev server + Gulp watch pre Pug.
- [ ] Vyriešiť URL routing v dev móde (Vite servuje HTML z `dist/` alebo `.tmp/`).
- [ ] Odstrániť light-scripts tasky, ktoré sú nahradené Vite (zachovať len `templates`, `prepare`).

### Fáza 4 — Switchover (1 deň)

- [ ] Premenovať `dist-vite/` na `dist/` v configu.
- [ ] Odstrániť overlapping Gulp tasky a ich dependencies z `package.json`.
- [ ] Aktualizovať `CLAUDE.md` a `docs/guides/` s novou architektúrou.
- [ ] Tag verzie, merge do `master`.

### Fáza 5 — Po-migrácii (samostatné iniciatívy)

- Migrácia Pug → Astro (samostatný plán).
- Migrácia JS na TypeScript.
- jQuery offload do vanilla JS.
- Rozšírenie MCP servera o co-located komponentové metadáta.

## Riziká

| Riziko | Pravdepodobnosť | Dopad | Mitigation |
|---|---|---|---|
| CakePHP konzumuje manifest v nečakanom tvare | Stredná | Vysoký | Fáza 0 — overenie pred kódovaním |
| SVG sprite plugin nezvláda `[data-keep-fill]` override | Stredná | Stredný | Napísať mini-plugin alebo pre-build skript |
| Vite/esbuild nezvládne Swiper `.mjs` | Nízka | Stredný | Fallback na explicit Babel transform |
| Modernizr lean build cez `customizr` CLI dáva odlišný výstup | Stredná | Nízky | Porovnať byte-by-byte s pôvodným |
| Hybrid Gulp+Vite watch má race condition | Stredná | Stredný | Sériová orchestrácia v `./serve.sh`, prípadne `concurrently` |

## Odhad času

| Fáza | Čistá práca |
|---|---|
| 0 — Kontrakt CakePHP | 1 deň |
| 1 — Vite PoC | 2-3 dni |
| 2 — Pokrytie zvyšku | 3-5 dní |
| 3 — Orchestrator | 2 dni |
| 4 — Switchover | 1 deň |
| **Spolu** | **9-12 dní** |

## Nasledujúce kroky

1. Schválenie plánu.
2. Spustenie **Fázy 0** — audit CakePHP strany (čo presne konzumuje z `dist/`).
3. Vytvorenie branch a začiatok PoC.
