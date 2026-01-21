# Implementing Dark Mode with AI-Guided Development: A Case Study

## English

### Introduction

This case study documents the implementation of a comprehensive dark mode feature for an e-commerce styleguide. Rather than a traditional approach of duplicating styles or using separate stylesheets, we implemented a token-based design system that automatically adapts all components to light and dark themes. The process demonstrates how structured AI-guided development can accelerate complex design system work while maintaining code quality and consistency.

### The Challenge

The styleguide contained dozens of components—buttons, cards, lists, badges, tabs, and more—each with specific color requirements. A naive approach would have required:
- Duplicating all CSS for each theme
- Managing separate stylesheets
- Manually updating colors in multiple places
- High risk of inconsistencies between themes

### The Solution: Token-Based Theming

We adopted a **CSS custom properties (CSS variables) token system**, where semantic color names replace hardcoded values. Instead of writing:

```css
background-color: #F5F5F5;
```

We write:

```css
background-color: var(--ms-surface-primary);
```

The actual color value is defined in one central location and can change based on theme:

```css
:root {
  --ms-surface-primary: #FFFFFF;  /* Light mode */
}

html[data-theme='dark'] {
  --ms-surface-primary: #1A1918;  /* Dark mode */
}
```

### Implementation Process

#### Phase 1: Token Design

We created semantic token categories:
- **Surfaces**: Primary, secondary, tertiary backgrounds
- **Text**: Primary, secondary, tertiary, disabled, inverse colors
- **Borders**: Default, strong, subtle variants
- **Interactive**: Buttons, links, and interactive element colors
- **States**: Error, success, warning, info feedback colors

This semantic naming (rather than naming by color like "grey-700") means colors can change without affecting code, and new themes can be added simply by providing new token values.

#### Phase 2: Systematic Component Conversion

We worked through components methodically:

1. **Identified hardcoded colors** in each component
2. **Created appropriate tokens** for those colors
3. **Updated component styles** to use tokens
4. **Tested both light and dark modes** visually

For example, carousel buttons initially used hardcoded `rgba(255, 255, 255, 0.8)`. We:
- Created `--ms-button-carousel-bg` and `--ms-button-carousel-text` tokens
- Set light mode values to the original hardcoded color
- Set dark mode values to `var(--ms-surface-elevated)` (reusing surface tokens)

#### Phase 3: Dark Mode Adjustments

Not all components need the exact same color in dark mode. During testing, we discovered and fixed:

- **Carousel buttons**: Needed different background to maintain visibility
- **List borders**: Initially too light (0.8 opacity was actually lighter), adjusted to 0.25 opacity with text-primary color base
- **Heading colors**: Secondary headings needed lighter opacity (0.65) in dark mode
- **Clickable list items**: Selected state needed subtle highlight (0.1 opacity on white) instead of grey
- **Footer**: Remained black in both modes with scoped variable override for utilities
- **Product links**: Adjusted to lighter primary colors for dark mode WCAG contrast

#### Phase 4: Styleguide Documentation

For each component, we added a "Dark Mode" showcase section demonstrating:
- All component variants in dark mode
- Proper contrast and readability
- Interactive states (hover, selected, disabled)
- Code examples for developers

### Key Insights

**1. Tokens > Hardcoded Values**
- Without tokens, dark mode would require massive refactoring or duplicated styles
- With tokens, components automatically adapt to new themes
- Adding a third theme (e.g., high contrast) requires only defining token values

**2. Semantic Naming Matters**
- Token names like `--ms-surface-primary` are meaningful and context-independent
- A developer can apply the right token without knowing the exact color
- Colors can evolve without changing all the CSS

**3. Not All Components Are Equal**
- Some components (footer) intentionally ignore theme tokens for brand consistency
- Others (buttons, cards) benefit from full adaptation
- Careful decisions about which tokens to use per component is important

**4. Testing Reveals Assumptions**
- Intuitive assumptions about opacity and color often prove wrong
- Dark mode revealed that "lighter opacity" doesn't mean "lighter color"
- Visual testing in both modes is essential for quality

**5. AI Guidance Accelerates Problem-Solving**
- When issues arose (carousel buttons looking wrong, border contrast too low), systematic investigation identified root causes
- Rather than multiple failed attempts, structured debugging led directly to solutions
- AI helped recognize patterns and apply them consistently across components

### Technical Architecture

**File Structure:**
- `app/styles/base/_globals.scss` - All token definitions (light and dark mode)
- `app/styles/utils/_config.scss` - Component configurations using tokens
- Individual component files - Updated to reference tokens instead of hardcoded colors
- `app/views/styleguide/*.pug` - Dark mode showcase sections for each component

**Token Organization:**
```
Light Mode (:root)
├── Surfaces (primary, secondary, tertiary, elevated, hover, active)
├── Text (primary, secondary, tertiary, disabled, inverse, links)
├── Borders (default, strong, subtle)
├── Interactive (primary, secondary with state variants)
├── States (error, success, warning, info)
├── Component-specific (buttons, carousels, lists, etc.)
└── Footer, shadows, and utilities

Dark Mode (html[data-theme='dark'])
└── Overrides for all tokens with dark-appropriate values
```

### Results

- **95+ CSS variables** defined for comprehensive theme control
- **100% component coverage** with dark mode support
- **Zero code duplication** - no separate stylesheets or duplicated rules
- **Scalable** - adding a third theme requires only new token values
- **Maintainable** - changes propagate automatically across all components
- **Developer-friendly** - new components only need to use tokens, they inherit theme support

### Conclusion

Implementing dark mode through a token-based design system proved significantly more effective than traditional approaches. The systematic, AI-guided process of identifying patterns, solving issues methodically, and documenting solutions ensured both quality and maintainability.

This approach demonstrates that modern CSS features (custom properties), when combined with thoughtful design (semantic tokens) and systematic implementation, can handle complex theming requirements elegantly. The resulting codebase is more flexible, maintainable, and ready for future design evolution.

---

## Slovenčina

# Implementácia tmavého režimu s AI-vodeným vývojom: Prípadová štúdia

### Úvod

Táto prípadová štúdia dokumentuje implementáciu komplexného tmavého režimu pre e-commerce styleguide. Namiesto tradičného prístupu duplikácie štýlov alebo použitia samostatných stylesheetov sme implementovali tokenový systém dizajnu, ktorý automaticky prispôsobuje všetky komponenty svetlým a tmavým motívom. Proces demonštruje, ako štruktúrovaný AI-vedený vývoj môže urýchliť komplexnú prácu na systémoch dizajnu, pričom si zachováva kvalitu a konzistenciu kódu.

### Výzva

Styleguide obsahoval desiatky komponentov — tlačidlá, karty, zoznamy, odznamčenia, karty a ďalšie — každý so špecifickými požiadavkami na farby. Naivný prístup by vyžadoval:
- Duplikáciu všetkých CSS pre každý motív
- Správu samostatných stylesheetov
- Manuálnu aktualizáciu farieb na viacerých miestach
- Vysoké riziko nekonzistencií medzi motívmi

### Riešenie: Tokenový systém têmatizácie

Prijali sme **systém tokenov CSS custom properties (CSS premenné)**, kde sémantické názvy farieb nahradzujú pevne zakódované hodnoty. Namiesto písania:

```css
background-color: #F5F5F5;
```

Napíšeme:

```css
background-color: var(--ms-surface-primary);
```

Skutočná hodnota farby je definovaná na jednom centrálnom mieste a môže sa meniť na základe motívu:

```css
:root {
  --ms-surface-primary: #FFFFFF;  /* Svetlý režim */
}

html[data-theme='dark'] {
  --ms-surface-primary: #1A1918;  /* Tmavý režim */
}
```

### Proces implementácie

#### Fáza 1: Návrh tokenov

Vytvorili sme sémantické kategórie tokenov:
- **Povrchy**: Primárne, sekundárne, terciárne pozadia
- **Text**: Primárny, sekundárny, terciárny, zakázaný, inverzný text
- **Ohraničenia**: Predvolené, silné, jemné varianty
- **Interaktívne**: Farby tlačidiel, odkazov a interaktívnych prvkov
- **Stavy**: Chyba, úspech, upozornenie, informatívne farby spätnej väzby

Toto sémantické pomenovanie (namiesto pomenovania podľa farby ako „grey-700") znamená, že farby sa môžu meniť bez ovplyvnenia kódu a nové motívy je možné pridať jednoducho poskytnutím nových hodnôt tokenov.

#### Fáza 2: Systematická konverzia komponentov

Metodicky sme pracovali s komponentmi:

1. **Identifikovali sme pevne zakódované farby** v každom komponente
2. **Vytvorili sme vhodné tokeny** pre tieto farby
3. **Aktualizovali sme štýly komponentov** na použitie tokenov
4. **Testovali sme oba režimy** vizuálne

Napríklad tlačidlá karuselu pôvodne používali pevne zakódovaný `rgba(255, 255, 255, 0.8)`. My sme:
- Vytvorili `--ms-button-carousel-bg` a `--ms-button-carousel-text` tokeny
- Nastavili svetlý režim na pôvodnú pevne zakódovanú farbu
- Nastavili tmavý režim na `var(--ms-surface-elevated)` (opätovné použitie povrchových tokenov)

#### Fáza 3: Úpravy tmavého režimu

Nie všetky komponenty potrebujú v tmavom režime úplne rovnakú farbu. Počas testovania sme objavili a opravili:

- **Tlačidlá karuselu**: Potrebovali inú farbu pozadia, aby si zachovali viditeľnosť
- **Ohraničenia zoznamov**: Spočiatku príliš svetlé (0,8 opacita bola vlastne svetlejšia), upravené na 0,25 opacitu so základňou farby textu
- **Farby nadpisov**: Sekundárne nadpisy potrebovali svetlejšiu opacitu (0,65) v tmavom režime
- **Klikateľné prvky zoznamov**: Vybraný stav potreboval jemné zvýraznenie (0,1 opacita na bielej) namiesto sivej
- **Pätička**: Zostala čierna v oboch režimoch s ohraničením premennej na pomôcky
- **Produktové odkazy**: Upravené na svetlejšie primárne farby pre kontrast WCAG v tmavom režime

#### Fáza 4: Dokumentácia styleguide

Pre každý komponent sme pridali sekciu „Tmavý režim" demonštrujúcu:
- Všetky varianty komponentov v tmavom režime
- Správny kontrast a čitateľnosť
- Interaktívne stavy (hover, selected, disabled)
- Príklady kódu pre vývojárov

### Kľúčové poznatky

**1. Tokeny > Pevne zakódované hodnoty**
- Bez tokenov by tmavý režim vyžadoval masívnu refaktoringu alebo duplikované štýly
- S tokenmi sa komponenty automaticky prispôsobujú novým motívom
- Pridanie tretieho motívu (napr. vysoký kontrast) vyžaduje iba definovanie hodnôt tokenov

**2. Sémantické pomenovanie je dôležité**
- Názvy tokenov ako `--ms-surface-primary` sú zmysluplné a kontextovo nezávislé
- Vývojár môže použiť správny token bez znalosti presnej farby
- Farby sa môžu vyvíjať bez zmeny všetkého CSS

**3. Nie všetky komponenty sú rovnaké**
- Niektoré komponenty (pätička) zámerne ignorujú motívové tokeny pre konzistenciu značky
- Iné (tlačidlá, karty) prospievajú z plného prispôsobenia
- Starostlivé rozhodnutia o tom, ktoré tokeny sa majú používať na komponent, sú dôležité

**4. Testovanie odhalí predpoklady**
- Intuitívne predpoklady o opacite a farbe sa často osvedčia ako nesprávne
- Tmavý režim odhalil, že „svetlejšia opacita" neznamená „svetlejšia farba"
- Vizuálne testovanie v oboch režimoch je nevyhnutné pre kvalitu

**5. AI vedenie urýchľuje riešenie problémov**
- Keď sa vyskytli problémy (tlačidlá karuselu vyzerajú zle, kontrast ohraničenia príliš nízky), systematický výskum identifikoval hlavné príčiny
- Namiesto viacerých neúspešných pokusov viedol štruktúrovaný debugging priamo k riešeniam
- AI pomáhala rozpoznať vzory a aplikovať ich konzistentne v komponentoch

### Technická architektúra

**Štruktúra súboru:**
- `app/styles/base/_globals.scss` - Všetky definície tokenov (svetlý a tmavý režim)
- `app/styles/utils/_config.scss` - Konfigurácie komponentov pomocou tokenov
- Jednotlivé súbory komponentov - Aktualizované na odkaz na tokeny namiesto pevne zakódovaných farieb
- `app/views/styleguide/*.pug` - Sekcie s ukážkami tmavého režimu pre každý komponent

**Organizácia tokenov:**
```
Svetlý režim (:root)
├── Povrchy (primárny, sekundárny, terciárny, zvýšený, hover, aktívny)
├── Text (primárny, sekundárny, terciárny, zakázaný, inverzný, odkazy)
├── Ohraničenia (predvolené, silné, jemné)
├── Interaktívne (primárny, sekundárny s variantmi stavu)
├── Stavy (chyba, úspech, upozornenie, informácia)
├── Špecifické pre komponent (tlačidlá, karusely, zoznamy atď.)
└── Pätička, tiene a pomôcky

Tmavý režim (html[data-theme='dark'])
└── Prepisy všetkých tokenov s hodnotami vhodnými pre tmu
```

### Výsledky

- **95+ CSS premenných** definovaných na komplexnú kontrolu motívu
- **100% pokrytie komponentov** s podporou tmavého režimu
- **Nulová duplikácia kódu** - žiadne samostatné stylesheeты alebo duplikované pravidlá
- **Škálovateľný** - pridanie tretieho motívu vyžaduje iba nové hodnoty tokenov
- **Udržovateľný** - zmeny sa automaticky šíria vo všetkých komponentoch
- **Priateľský pre vývojárov** - nové komponenty potrebujú iba použiť tokeny, zdedia podporu motívov

### Záver

Implementácia tmavého režimu prostredníctvom systému tokenov dizajnu sa ukázala ako výrazne efektívnejšia ako tradičné prístupy. Systematický, AI-vedený proces identifikácie vzorov, metodického riešenia problémov a dokumentácie riešení zaistil kvalitu aj udržovateľnosť.

Tento prístup demonštruje, že moderné funkcie CSS (vlastné vlastnosti), v kombinácii s premysleným dizajnom (sémantické tokeny) a systematickou implementáciou, môžu elegantne riešiť zložité požiadavky na têmatizáciu. Výsledný kódex je flexibilnejší, udržovateľnejší a pripravený na budúcu evolúciu dizajnu.
