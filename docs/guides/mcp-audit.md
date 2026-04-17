# MCP Audit a plán prepracovania

*Aktualizované: 2026-04-17*

Tento dokument je živý audit MCP servera styleguide (`mcp-server/src/index.js`) a plán jeho prepracovania pre nový primárny cieľ: **externé projekty (napr. Lovable), ktoré chcú získať Martinus styling bez toho, aby mali checkout tohto repozitára**.

## 1. Východiskový stav

Aktuálny MCP server ponúka 8 nástrojov nad lokálnym adresárom `/app/app` (read-only mount v Dockeri):

| Nástroj | Čo robí |
|---|---|
| `list_components` | Lista Pug/SCSS/JS modulov (`views/modules`, `styles/modules`, `scripts/modules`) |
| `get_component_info` | Vráti Pug + SCSS + JS zdroj pre komponent podľa názvu |
| `list_scss_utilities` | Extrahuje premenné/mixiny/utility kľúče z `styles/utils/*` a `styles/_utilities.scss` |
| `find_scss_class` | Vyhľadáva SCSS triedy podľa patternu (regex) |
| `list_pug_mixins` | Lista Pug mixinov z `views/mixins/**` |
| `get_mixin_info` | Detail jedného Pug mixinu |
| `list_icons` | Lista SVG ikon v `icons_/**` |
| `get_data_structure` | Čítanie JSON dát z `views/data/**` |

Distribúcia: Docker kontajner `martinus-styleguide-mcp`, Claude Code sa pripája cez `docker exec`. **Predpokladá lokálny checkout repozitára.**

## 2. Cieľový stav

**Primárny konzument:** AI agenty v cudzích projektoch (Claude Code, Cursor, Lovable) a sekundárne human devs.

**Scenár:** Niekto v Lovable projekte chce používať Martinus styling. Požiada agenta: „setup Martinus styleguide". Agent zavolá MCP → dostane:

1. Hotový HTML starter (doctype, meta, `<link>`/`<script>` s aktuálnymi hashami zo živého `rev-manifest.json`).
2. Na dopyt: kompilovaný HTML fragment konkrétneho komponentu (button, card, modal...), nie Pug zdroj.
3. Dizajnové tokeny (farby, spacing, typografia) ako JSON.
4. SVG ikony — inline alebo `<use>` s hostovanou URL.
5. Popis dostupných interaktívnych JS modulov a ich data-atribútov.

**Kľúčové rozhodnutia:**
- **Len `main` bundle.** Ostatné (`banners`, `campaigns`, `gallery`, `xmas`, ...) sú pre špecifické use-casy a nie sú súčasťou API.
- **Zdroj pravdy = hostovaná verzia.** Base URL: `https://mrtns.sk/assets/martinus/lb/`. Manifest: `https://mrtns.sk/assets/martinus/lb/rev-manifest.json` (overene publicly accessible). MCP ho fetchuje pri štarte + krátke TTL cache.
- **Vždy latest.** Žiadny pinning verzií. Hashe sa prekladajú z hostovaného manifestu, nie baked-in.
- **Cache-busting cez query-string, nie hashed filename.** MCP emituje URL v tvare `styles/main.css?v=<hash>`, nie `styles/main.<hash>.css`. Dôvod: konzument si HTML snippet pastne do svojho projektu. Pri ďalšom styleguide buildi sa hash zmení — hashed-filename varianta by spôsobila, že staré embeds prestanú fungovať (súbor s pôvodným hashom ostáva na hosting, ale consumer nevie, že má URL preložiť). Stabilná cesta + query param rieši cache-busting prehliadača a zároveň drží staré embeds funkčné (servujú latest). Overené: hosting obslúži aj unversioned (`main.css`) aj hashed (`main.<hash>.css`) cesty súbežne.
- **Thin fetch client, build emituje artefakty.** MCP nemá Pug, nemá Sass, nemá runtime kompiláciu. Všetko čo konzument potrebuje je vopred vypočítané v `./build.sh` a deployované. MCP len fetchuje a kombinuje. Engine-agnostický z konštrukcie — budúca výmena Pugu znamená výmenu build tasku, MCP ostáva rovnaký.
- **Ikony = Font Awesome Pro 6.** Externé API neodhaľuje `app/icons_/`. Oficiálna cesta: FA notácia (`<i class="far fa-heart"></i>`) s curated subsetom z `app/views/styleguide/data/font-awesome-subset.yaml` (5 štýlov: regular, brands, solid, duotone, kit/martinus). Martinus má unlimited FA Pro licenciu ktorá pokrýva distribúciu hostovaného bundlu — MCP môže servírovať `scripts/font-awesome.js` z `mrtns.sk` aj cudzím projektom. Kit ikony (`fak-martinus`, `fak-owl`, `fak-owl-plus`) sú Martinus-owned custom a sú zabalené priamo v tomto bundli.

### Nové build artefakty (emitované v `./build.sh`, deployované s `dist/`)

| Artefakt | Obsah |
|---|---|
| `dist/components/<name>.html` | Pre-renderovaný HTML fragment komponentu s resolvovaným `assetsPrefix` |
| `dist/tokens.json` | Resolvované dizajnové tokeny (Sass už vyhodnotil referencie a mapy) |
| `dist/class-index.json` | Mapa `class name → compiled CSS rule text`, scoped na modules/components |
| `dist/icons.json` | FA subset z `font-awesome-subset.yaml` transformovaný na `[{ name, style, class }]` |
| `dist/mcp-manifest.json` | Top-level index: zoznam dostupných komponentov, ikon, behaviorov, tokens kategórií |

Všetky sú statické JSON/HTML súbory. MCP si ich fetchuje na dopyt a kombinuje s `rev-manifest.json` pre hashe.

## 3. Audit aktuálnych nástrojov

Legenda: ✅ funguje · ⚠️ funguje ale má medzery · ❌ bug alebo nevhodné pre externého konzumenta

### 3.1 `list_components` ⚠️

- Glob `views/modules/**/*.pug`, `styles/modules/**/*.scss`, `scripts/modules/**/*.js` — funkčné.
- **Medzera:** `styles/components/**` NIE JE zahrnuté, hoci `get_component_info` tam hľadá. Nekonzistencia — komponenty ako `product-item`, `progress-bar`, `inline-nav` sa v listingu neobjavia.
- **Medzera:** mená ako `forms/_select` (leading underscore v basename sa nestripuje) sú škaredé a nekonzistentné s tým, ako konzument pravdepodobne pýta `get_component_info`.
- **Pre externých konzumentov:** listing vracia všetkých 43 Pug modulov vrátane business-specific vecí (`book-reservation`, `checkout/*`, `club-profile`...) ktoré Lovable užívateľ nepotrebuje. Chýba filter „konzumovateľné komponenty".

### 3.2 `get_component_info` ❌ (pre externých)

- Pre interné použitie: OK. Vracia raw Pug + SCSS + JS zdroj.
- **Pre externého konzumenta: nepoužiteľné.** Lovable projekt nemá Pug compiler, nemá SCSS buildchain, nemá webpack. Potrebuje **skompilovaný HTML fragment** s už resolvovaným `assetsPrefix`.
- **Žiadne povedomie o hostovaných assetoch.** HTML by malo mať `src`/`href` mierené na `https://mrtns.sk/assets/martinus/lb/...?id=<hash>`.

### 3.3 `list_scss_utilities` ⚠️

- **Premenné** — regex `/\$([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g` funguje na triviálne deklarácie, ale:
  - Zachytí aj zakomentované (`// $foo: bar;`).
  - Zlyhá na SCSS mapy (`$spacers: ( 1: 4px, 2: 8px );`) — regex sa zastaví pri prvej `;` vo vnútri mapy.
  - Neresolvuje referencie (`$primary: $color-red;` vráti doslovne `$color-red`, nie finálnu hodnotu).
- **Mixiny** — regex `/@mixin\s+name\s*(\([^)]*\))?/` — `[^)]*` nezvláda vnorené zátvorky (default hodnoty s volaním funkcie). Pre tento repozitár zatiaľ stačí, ale fragile.
- **Utilities** — extrahuje len kľúče z `$utilities` map (`"display"`, `"margin"`, ...). **Nevracia rezultujúci názov triedy** (napr. že `"display"` generuje `.d-*`, `.d-md-*` atď.). Pre konzumenta, ktorý potrebuje vedieť „akú triedu napíšem", je výstup takmer bezcenný.

### 3.4 `find_scss_class` ❌

- Vstupný pattern sa interpretuje ako JS regex s `*` → `.*`. **Ostatné regex-meta znaky užívateľ musí escapovať manuálne** — `.`, `+`, `?`, `(` — inak dostane nečakané výsledky alebo SyntaxError.
- Vyhľadávanie ide cez `/\.([a-zA-Z0-9_-]+)/g` — matchne všetko za bodkou: `.5em` vráti triedu `5em`, SCSS namespace `color.scale()` vráti „scale" ako triedu, pseudo-selektory nie sú filtrované.
- Vráti len cestu k súboru, **nie samotné CSS pravidlo** (deklarácie). Konzument tak nevie, čo trieda robí, bez druhého kroku.

### 3.5 `list_pug_mixins` ✅

- Funguje. `/^mixin\s+name/gm` s flag-om `m` = správne.

### 3.6 `get_mixin_info` ❌ BUG

- Regex `^mixin\s+${name}\s*(\([^)]*\))?([\s\S]*?)(?=^mixin\s|$)` s flag `m`. S `m` flagom `$` matchuje end-of-line (nielen end-of-input), takže lazy `[\s\S]*?` sa zastaví **hneď za prvým riadkom** (na konci signatúry).
- **Praktický dopad (empiricky overené):** `get_mixin_info('productCover')` vráti len signatúru `mixin productCover(props = {})` s **prázdnym telom**. Body capture je 0 znakov. Platí pre všetky mixiny bez ohľadu na to, či je v súbore jeden alebo viac.
- **Oprava:** parsovať Pug mixiny podľa **indentácie** — telo mixinu = riadky indentované hlbšie ako `mixin` deklarácia, až po ďalší riadok na rovnakej alebo plytšej úrovni.

### 3.7 `list_icons` ❌ (zlý zdroj ikon)

- Nástroj dnes číta `app/icons_/**` (custom SVG sprite). **Pre externých konzumentov to je nesprávny zdroj.**
- Oficiálny zdroj ikon pre cudzie projekty = **Font Awesome Pro 6.7.2**, s curated subsetom v `app/views/styleguide/data/font-awesome-subset.yaml`:
  - `regular` (~180 ikon, prefix `far`)
  - `brands` (6, prefix `fab`)
  - `solid` (5, prefix `fas`)
  - `duotone` (1, prefix `fad`)
  - `kit` — 3 Martinus-custom (`martinus`, `owl`, `owl-plus`), prefix `fak`
- **Licensing:** Martinus má unlimited FA Pro licenciu pokrývajúcu distribúciu hostovaného bundlu. Cudzie origin-y môžu načítať `https://mrtns.sk/assets/martinus/lb/scripts/font-awesome.js?id=<hash>` bez obmedzení.
- **Dependency model:** response s `<i class="fa...">` obsahuje `requires: ["font-awesome"]`. Konzument (alebo agent) tento flag zozbiera a pošle do `get_setup(with: ["font-awesome"])`, ktorý pridá `<script>` tag s FA URL. Default starter template FA **nezahŕňa** (bloat pre konzumentov bez ikon).
- **Kit ikony** (`fak-martinus`, `fak-owl`, `fak-owl-plus`) sú zabalené priamo vo FA bundli ako custom kit. Žiadna špeciálna cesta — vrátia sa ako `<i class="fak fa-martinus"></i>` rovnako ako ostatné FA ikony.
- **Custom SVG v `icons_/`:** `icons_/css/` ikony sú už inlinované v `main.css` (form indikátory) — externe ich konzument nepotrebuje adresovať. `icons_/app/` a `icons_/styleguide/` sú internal-only a externé API ich vôbec neodhaľuje.

### 3.8 `get_data_structure` ❌ BUG

- Súbory v `app/views/data/` sú **`.yaml`**, nie `.json` (`project.yaml`, `footer.yaml`, `header.yaml`, `books.yaml`, `sitemap.yaml`).
- Glob `views/data/**/*.json` teda nenájde nič.
- Ak konzument požiada konkrétny súbor, `JSON.parse` na YAML obsahu **vyhodí výnimku**.
- `views/data.json` existuje (top-level) a funguje, ale je to jediné JSON.
- Navyše: pre externého konzumenta je šablónová dáta úplne mimo scope. Tento nástroj nemá cieľovú pridanú hodnotu a pravdepodobne ho odstránime.

## 4. Prierezové problémy

- **`APP_DIR = '/app/app'`** hardcoded na miesto mountu v Dockeri. Redesign vyžaduje konfigurovateľný zdroj: lokálny filesystem ALEBO hostovaná URL (pre npm distribúciu).
- **Žiadne povedomie o `rev-manifest.json`.** Žiaden nástroj nevie resolvovať aktuálny hash pre `main.css`/`main.js`. Celý nástroj `get_setup` (ktorý je najviac žiadaný pre nový use case) dnes neexistuje.
- **Raw zdroj nie je vhodný export.** Pug/SCSS/raw JS sú interné artefakty. Externý konzument potrebuje HTML/CSS/JS ako finálne produkty.
- **Žiadna verifikácia vstupov.** `find_scss_class` berie ľubovoľný regex od užívateľa, `get_component_info` neošetruje path traversal (name=`../../etc/passwd` by sa glob-om nezachránil, ale treba preskúmať).
- **Output formát = JSON.stringify do `text` bloku.** Funguje, ale MCP SDK ponúka štruktúrovaný `structuredContent` ktorý agenty parsujú spoľahlivejšie.

## 5. Plán prepracovania

### Fáza 1 — Tento audit ✅

Tento dokument. Hotový.

### Fáza 2 — Redesign nástrojov

Cieľová sada (názvy finálne až po review):

| Nástroj | Účel | Zdroj |
|---|---|---|
| `get_setup` | Vráti `<link>`/`<script>` tagy pre main bundle. URL tvar: `styles/main.css?v=<hash>` (query-string cache-busting, viď §2). Font Awesome Pro vždy included (rozhodnutie z implementácie — opt-in API pridalo zbytočnú friction). Parameter `language: "sk" \| "cz"` pre i18n interaktívnych modulov. | `rev-manifest.json` |
| `get_starter_template` | Minimálny HTML skeleton (doctype, head, body s wrapper class) napojený na main bundle. | `rev-manifest.json` |
| `list_components` | Lista konzumovateľných komponentov. | `mcp-manifest.json` |
| `get_component` | Kompilovaný HTML fragment s resolvovaným `assetsPrefix`. Response obsahuje `requires` array (napr. `["font-awesome"]` ak komponent používa ikony). | `components/<name>.html` + `mcp-manifest.json` |
| `get_tokens` | Resolvované dizajnové tokeny. Optional `category: "color" \| "spacing" \| "typography" \| ...`. | `tokens.json` |
| `list_icons` | FA subset po štýloch (`far`, `fab`, `fas`, `fad`, `fak`). Optional `style` filter. | `icons.json` |
| `get_icon` | Vráti `<i class="{prefix} fa-{name}"></i>` snippet. Response deklaruje `requires: ["font-awesome"]`. Kit ikony (`fak-*`) idú rovnakou cestou — sú v tom istom bundli. | `icons.json` |
| `find_class` | Hľadanie CSS triedy — vráti **compiled CSS rule text** (deklarácie z `main.css`). Bezpečný escaping vstupu (nie surový regex). | `class-index.json` |
| `list_js_behaviors` | Interaktívne JS moduly v main bundle s popisom data-atribútov. | `mcp-manifest.json` |
| `get_js_behavior` | Ako inicializovať konkrétne správanie (HTML + atribúty). | `mcp-manifest.json` |
| `list_pug_mixins` / `get_mixin_info` | **Zostávajú, ale označené `scope: internal`.** Pre interných devov. Oprava regex buga. | Lokálny FS (interný mód) |
| `get_data_structure` | **Odstrániť** — irrelevantné pre externého konzumenta, buggy pre interného. | — |

**Dependency model:** každý tool ktorý vracia HTML (komponent/ikonu) deklaruje `requires: string[]` — zoznam optional asset balíčkov (`"font-awesome"`, prípadne budúce). Agent ich zozbiera z individuálnych `get_component` / `get_icon` volaní a pošle do `get_setup(with: [...])` pre finálne `<script>` tagy. Default starter template FA nezahŕňa; pridáva sa on-demand keď konzument reálne použije ikony.

### Fáza 3 — Inventár interaktívnych komponentov ✅

Klasifikácia všetkých 27 modulov v `app/scripts/modules/`:

#### Public (17) — exponované cez `list_js_behaviors` / `get_js_behavior`

| Modul | Popis | Init selector |
|---|---|---|
| `Toggle` | Core toggle mechanism (aria-expanded, `is-active`). Foundational. | `[data-toggle]` |
| `Dropdown` | Dropdown menus (staviaciana Toggle). | `[data-dropdown]` |
| `Modal` | Bootstrap Modal wrapper; auto-shows matching modals. | `[data-bs-modal]` |
| `Tab` | Tab switcher. | `[role="tab"]` |
| `Collapse` | Collapsible content s max-height. | `[data-collapse]` |
| `Tooltip` | Tippy.js wrapper. | `[data-tooltip]`/`[title]` |
| `Carousel` | Swiper wrapper. | `.swiper` |
| `Select` | Choices.js styled selects (SK/CZ i18n). | `select` (opt-in) |
| `Autocomplete` | accessible-autocomplete wrapper; manuálna inštancializácia. | (manual) |
| `NumberSpinner` | +/– tlačidlá pre numerické inputy. | `[data-number-spinner]` |
| `RadiocheckToggle` | Radio/checkbox prepínajúci viditeľnosť sibling-ov. | `[data-radiocheck-toggle]` |
| `Clipboard` | Copy-to-clipboard button. | `[data-clipboard]` |
| `SmoothScroll` | Smooth-scroll na kotvy. | `[data-scroll]` |
| `AnchorScroll` | Scroll na `location.hash` pri load. | auto |
| `ScrollSpy` | Nav highlight pri scrolle (gumshoe). | `[data-gumshoe] a` |
| `Input` | Focus/value state classes na form inputs. | `[data-input]` |
| `FeatureHighlight` | Tippy-based onboarding tooltip. | `.feature-highlight` |

#### Internal (6) — eshop-specific, **nie** v externom API

| Modul | Dôvod |
|---|---|
| `Header` | Viazaný na Martinus header (search input focus behavior). |
| `MegaMenu` | Viazaný na Martinus mega menu štruktúru. |
| `AudioPlayer` | Audiobook sample prehrávanie — business-specific. |
| `ThemeToggle` | Dark/light mode — eshop-specific preference. |
| `ProductPreview` | Paginovaný product preview slider pre detail knihy. |
| `Alert` | Imperatívne alert API — out-of-scope pre MCP. |

#### Plumbing (4) — internal helpers, nikdy v API

| Modul | Účel |
|---|---|
| `Const` | Export `BREAKPOINTS` konštanty. |
| `Utils` | Helper funkcie (`nodeListToArray`, `getSiblings`, `transitionEnd`, ...). |
| `Observables` | Generic `MutationObserver` wrapper. |
| `jQueryGlobalHelper` | Exposuje `$` / `jQuery` globálne. Legacy. |

**Dopad na tooly:**
- `list_js_behaviors` vracia len 17 public modulov.
- `get_js_behavior(name)` — pre DOM-init moduly vracia HTML snippet s potrebnými data-atribútmi. Pre `Autocomplete` (manuálna inštancializácia) vracia code snippet pattern (`new myApp.Autocomplete(...)`).
- Internal & plumbing moduly sa nezobrazujú v liste, ale `mcp-manifest.json` ich môže obsahovať s tag-om pre debug/interné použitie.

**Bootstrap Offcanvas:** vynechané z MCP (konzument si vie použiť priamo BS API).

### Fáza 4 — Distribúcia

**Odporúčanie: npm balíček `@martinus/styleguide-mcp`**, spúšťaný cez `npx -y @martinus/styleguide-mcp`.

- Konzument pridá do svojho Claude/Cursor/Lovable configu jeden riadok — žiadny Docker, žiadny checkout.
- MCP pri štarte fetchne `https://mrtns.sk/assets/martinus/lb/rev-manifest.json` a cachuje s krátkym TTL (napr. 5 min).
- Pre kompilované HTML fragmenty: styleguide `./build.sh` emituje per-komponent súbory do `dist/components/<name>.html` → deployuje sa spolu s CSS/JS. MCP ich fetchuje na dopyt.
- **Auto-update**: keď styleguide release-ne nový build, hashe v manifeste sa zmenia, MCP ich dostane pri ďalšom fetchi. Žiadny MCP re-deploy.

**Alternatíva:** Remote MCP (Streamable HTTP), hostovaný vedľa styleguide. Nulová inštalácia u konzumenta, ale vyžaduje ops (hosting, auth, monitoring). **Zatiaľ nie.** npm balíček ako prvá fáza, remote MCP ako možný follow-up ak bude dopyt.

**Interný Docker flow ostáva zachovaný** — prispievatelia do styleguide ho stále používajú na prácu s lokálnym checkoutom.

## 6. Rozhodnutia (dokončené)

| Téma | Rozhodnutie |
|---|---|
| Cache-busting URL formát | **`path?v=<hash>`** namiesto `path.<hash>.ext`. Stabilná cesta, embeds prežijú ďalší build. Viď §2. |
| FA inclusion policy | **Vždy included** v `get_setup` (nie opt-in cez `with`). Pôvodný audit §5 navrhoval opt-in kvôli bloat, ale v praxi takmer každý komponent používa FA ikony (dropdown šípky, close tlačidlá, form indicators) a chýbajúce ikony pri minimalistickom setup-e = horší DX. |
| Tokens formát | **Nested JSON** (`{ color: { primary: "#...", ... }, spacing: {...}, typography: {...} }`) |
| npm scope | **`@martinus/styleguide-mcp`** |
| Interné nástroje | **Two-mode MCP** — viď §6.1 |
| Whitelist komponentov | Tagy v `mcp-manifest.json`: `public` vs `internal`. `list_components` external mode filtruje na `public`. |
| `class-index.json` rozsah | **Len modules + components** (Martinus-specific). BS utility a vendor triedy nie sú v indexe; tool description to vysvetľuje agentovi. |
| `icons.json` zdroj | **YAML** (`font-awesome-subset.yaml`) → emitovaný pri builde. YAML drift je akceptovaná tech debt (viď §6.2). |
| Bootstrap Offcanvas | Vynechané z MCP. |

### 6.1 Two-mode MCP

MCP má **jeden codebase, dva módy** detegované cez env var `MARTINUS_STYLEGUIDE_APP_DIR`:

- **External mode (default):** `APP_DIR` nie je nastavený. MCP fetchuje hostované artefakty (`https://mrtns.sk/assets/martinus/lb/*`). Použitie: Lovable projekty, externé AI nástroje cez `npx @martinus/styleguide-mcp`.
- **Internal mode:** `APP_DIR` ukazuje na lokálny `app/` adresár. MCP má filesystem access navyše, enabluje internal-only tools. Použitie: prispievatelia do styleguide pracujúci s AI (Claude Code, Cursor) pri vytváraní nových komponentov.

Shared tools (obidva módy): `get_setup`, `get_starter_template`, `get_component`, `get_tokens`, `list_icons`, `get_icon`, `find_class`, `list_js_behaviors`, `get_js_behavior`.

Internal-only tools: `list_components_source`, `get_component_source` (raw Pug/SCSS/JS pre editáciu), `list_pug_mixins`, `get_mixin_info`, `find_scss_source`.

Docker-based flow ostáva — `./mcp.sh` nastaví `APP_DIR` a spustí kontajner s filesystem mountom, takže interní devs automaticky dostanú internal mode.

### 6.2 Tech debt / roadmap

- **FA subset sync:** `font-awesome-subset.yaml` sa aktualizuje manuálne — hrozí drift voči skutočne buildovanému FA bundlu. Zvažované riešenia:
  - Build-time introspekcia aktuálneho FA bundle (čítať čo `@fortawesome/pro-regular-svg-icons` reálne importuje) a auto-generovať YAML. **Odporúčané** — autoritatívny zdroj = reálne buildovaný bundle.
  - Claude skill diffujúci FA `all.js` vs YAML.
- **Open icon set swap** (Bootstrap Icons / Lucide) — odstránilo by to FA dependency úplne. Veľký rewrite (`faIcon` mixin + templates). Nie Fáza 2, ale roadmap.
- **Remote MCP server** (Streamable HTTP) — zero-install pre konzumentov. Kandidátska doména: `mcp.mrtns.sk`. Leading hosting option: **Cloudflare Pages/Workers** — po Fáze 2 je external MCP čistý fetch-client (žiadny filesystem, žiadne ťažké deps), čo je presne Workers-friendly profil. Internal mode zostáva na Dockeri (potrebuje lokálny `fs`). Minimálne požiadavky:
  - Výmena `StdioServerTransport` za `StreamableHTTPServerTransport` v `index.js`.
  - Deploy ako Worker (`wrangler deploy`), route na `mcp.mrtns.sk`.
  - Rozhodnúť auth — pravdepodobne public (read-only nad public artefaktmi) + Cloudflare rate limiting.
  - Docs pre klientov: config snippet pre Claude Code / Cursor / Lovable (`{"type":"http","url":"https://mcp.mrtns.sk"}`).
  Možný follow-up po npm distribúcii — alebo paralelne, keďže codebase je zdielaný (npm = local-install CLI entry, CF Worker = remote HTTP entry, obidva volajú ten istý thin fetch client).

## 7. Rozsah a poradie implementácie

Po odsúhlasení tohto dokumentu:

1. ✅ **Fáza 3** — inventár JS modulov + rozhodnutia z otázok 1-6. Viď §3.8 a §6.
2. **Fáza 2 implementácia** — nástroje s najväčšou hodnotou ako prvé:
   - ✅ `get_setup` — emituje `head`/`bodyEnd`/`htmlClasses`, URLs s `?v=<hash>` cache-bustingom. Two-mode skeleton (`MARTINUS_STYLEGUIDE_APP_DIR` env var) + fetch-client s TTL cache založené.
   - 🔲 `get_starter_template` — triviálny follow-up (ten istý manifest, HTML skeleton okolo `get_setup`).
   - 🔲 `get_component` (potrebuje build emitter, krok 4).
   - 🔲 `get_tokens`, `list_icons` (FA subset), `get_icon`, `find_class`, `list_js_behaviors`, `get_js_behavior`.
3. ✅ **Oprava existujúcich bugov** (Sekcia 3.6, 3.8) — commit `594c4110`.
4. 🔲 **Build-time component emitter** v `./build.sh` — nová Gulp task pre `dist/components/*.html`, `dist/tokens.json`, `dist/class-index.json`, `dist/icons.json`, `dist/mcp-manifest.json`.
5. 🔲 **Fáza 4** — npm publish po stabilizácii API.
