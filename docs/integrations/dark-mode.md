# Dark mode

*Aktualizované: 2026-04-16*

## Architektúra

### Token-first prístup
- **Všetky konfigurácie komponentov používajú `_theme()` tokeny**, nie hardcoded farby
- Dark mode overrides len pre špeciálne prípady (šípky, speech bubbles, labely atď.)
- Tokeny definované v `app/styles/base/_globals.scss`

### Vzor pre komponent
1. Aktualizuj konfiguráciu komponentu v `_config.scss` – použi `_theme()` tokeny
2. Odstráň manuálne dark mode overrides tam, kde je to možné
3. Overrides len pre edge cases, ktoré nemôžu priamo použiť tokeny
4. Pridaj dark mode sekciu na stránku komponentu v styleguide

## Kľúčové rozhodnutia

### Konsolidácia tokenov
- **Vyhni sa duplikátnym hodnotám** – ak majú dva tokeny rovnakú dark mode hodnotu, jeden by mal referencovať druhý
- Príklad: `bg-warning` a `state-warning-bg` mali identickú dark hodnotu (`#4d3619`)
- Riešenie: `--ms-bg-warning: var(--ms-state-warning-bg)` – jeden zdroj pravdy
- Vzor použitý pre: `bg-blue`→`state-info-bg`, `bg-green`→`state-success-bg`, `bg-error`→`state-error-bg`

### `_theme()` v konfiguráciách namiesto override blokov
- **Správne**: `_theme()` helper priamo v config mapách komponentu
- **Vyhni sa**: `[data-theme='dark']` blokom na prepísanie hardcoded farieb
  ```scss
  // Pred: hardcoded + dark override blok potrebný
  background-color: _color('info', 100)

  // Po: automatická dark mode adaptácia, žiadny override
  background-color: _theme(state-info-bg)
  ```
- Eliminovalo ~40 riadkov dark mode overrides v `_alerts.scss`

### Obmedzenia Sass kompilácie
- **CSS custom properties nefungujú so Sass color funkciami** (napr. `color.mix()`)
- Riešenie: explicitne definuj všetky stavové farby (default, focus, hover, active) v config súboroch komponentu

### Hierarchia surface tokenov
- `surface-primary` – hlavné pozadie (#1b1e22)
- `surface-secondary` – card well, elevated sekcie (#2a2f36)
- `surface-tertiary` – pruhy, akcenty (#11161b)
- `surface-elevated` – karty, modály (#252a31)
- `surface-hover` / `surface-active` – interaktívne stavy

**Stratégia kontrastu**: Pre aktívne stavy kde `surface-primary` nemá dostatočný kontrast použi `surface-elevated`. Pre vizuálne spojenie (napr. aktívny tab + karta) oba prvky musia mať rovnaké pozadie.

### Rozhodnutia pre konkrétne komponenty

**Tlačidlá**: Väčšina tlačidiel vyzerá rovnako v dark/light mode. Ghost button potrebuje dark mode override pre border/text.

**Success prvky**: Použi priamu farebnú referenciu `_color(success, 500)` namiesto theme tokenu – zachová vizuálnu konzistentnosť.

**Tab + Card union**: Aktívny tab a card-well musia mať rovnaké pozadie – oba `_theme(surface-secondary)`.

## Požiadavky pre každý komponent

1. Konvertuj konfiguráciu na theme tokeny namiesto hardcoded farieb
2. Pridaj dark mode showcase sekciu na stránku komponentu
3. Otestuj kontrast – interaktívne prvky musia byť zreteľne viditeľné
4. Zdokumentuj edge cases vyžadujúce manuálne overrides

## Dokončené komponenty

- Alerts (všetky varianty vrátane light variantov)
- Badges
- Buttons (všetky varianty)
- Cards (všetky varianty)
- Demo komponent
- Dropdowns
- Forms (basic, advanced, labels, numberspinner)
- Lists
- Modals
- Tables
- Tabs (filter a card štýly)
- Typography (h2, h3)

## Checklist pri revízii

1. [ ] Majú nejaké tokeny duplicitné hodnoty? → Konsoliduj pomocou referencií
2. [ ] Sú nejaké `[data-theme='dark']` bloky? → Dajú sa nahradiť `_theme()` v konfigu?
3. [ ] Sú v dark blokoch hardcoded hex hodnoty? → Nahraď `_theme()` volaniami
4. [ ] Majú `bg-*` a `state-*-bg` tokeny rovnakú dark hodnotu? → Nechaj jeden referencovať druhý
