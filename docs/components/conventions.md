# Konvencie komponentovej vrstvy

*Aktualizované: 2026-05-12*

## Kde čo patrí — rozhodovacia mapa

Styleguide má sedem SCSS vrstiev. Väčšina práce prebieha v štyroch z nich:

| Vrstva | Adresár | Patrí sem |
|--------|---------|-----------|
| **modules** | `app/styles/modules/` | Znovupoužiteľné UI vzory bez business kontextu — buttons, badges, cards, tabs, forms… |
| **components** | `app/styles/components/` | Martinus-špecifické UI — product-item, mega-menu, category-filter… |
| **sections** | `app/styles/sections/` | Perzistentné oblasti stránky — `header`, `footer`. Zvyčajne majú vlastný JS modul. |
| **pages** | `app/styles/pages/` | Prepisy platné iba na jednej stránke. Ak sa prepis opakuje na viacerých stránkach, patrí vyššie. |

Zvyšné vrstvy (`base/`, `layout/`, `utils/`) sa menia zriedkavo a majú jasný rozsah (globálna typografia, grid, premenné/mixiny).

## Modul vs komponent — kedy čo?

**Použi `modules/`** keď:
- Prvok nemá Martinus business kontext (môže existovať v akomkoľvek e-shope)
- HTML štruktúra je generická (`.card`, `.badge`, `.btn`)
- Existuje parametrická šablóna v MCP registri

**Použi `components/`** keď:
- Prvok nesie Martinus doménu (`.product-item`, `.cart-item`, `.mega-menu`)
- HTML štruktúra je naviazaná na konkrétny dátový model (kniha, objednávka, kategória)
- Potrebuje business logiku v Pug šablóne (`app/views/modules/`)

**Použi `pages/`** keď:
- Úprava platí iba pre jednu URL / view
- Nechceš zaťažiť globálny komponent edge-casom jednej stránky

## Rozšíriť existujúci vs vytvoriť nový

### Pridaj BEM modifier (`--variant`) keď:
- Ide o vizuálnu variáciu toho istého elementu (iná farba, veľkosť, hustota)
- Sémantický účel a HTML štruktúra ostávajú rovnaké
- Príklad: `.badge--green`, `.btn--small`, `.card--well`

### Vytvor nový komponent keď:
- HTML štruktúra sa líši (iný počet elementov, iné nesting)
- Sémantický účel je odlišný — nesú rôzny význam pre používateľa
- Modifier by obsahoval viac ako 2–3 prepisy existujúcich pravidiel

### Použi utility triedu keď:
- Ide o jednorazové priestorové alebo display upravenie (`mb-small`, `d-flex`)
- Úprava nepatrí do žiadneho konkrétneho komponentu
- Pozri `app/styles/_utilities.scss` alebo MCP `get_utilities`

## JS párovanie

Ak komponent potrebuje interakciu, JS modul patrí do `app/scripts/modules/`. Názov súboru zodpovedá PascalCase názvu triedy (`MegaMenu.js` → `.mega-menu`). Inicializácia prebieha v `app/scripts/main.js`.

Komponenty bez JS (čisto CSS) nemajú pár v `scripts/` — to je zámerné.

## Pug šablóny

Znovupoužiteľné mixiny sú v `app/views/mixins/`. Business moduly (stránkové sekcie) sú v `app/views/modules/`. Ak komponent existuje v MCP registri, jeho kanonický HTML je zdrojom pravdy — neinventuj HTML, použi `get_component`.
