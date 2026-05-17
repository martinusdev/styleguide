# Kontrakt: styleguide `dist/` ↔ CakePHP martinus

*Vytvorené: 2026-05-15 (Fáza 0 auditu)*
*Zdroj: `/Users/michalferak/Sites/martinus/martinus`*

Tento dokument popisuje, čo presne CakePHP martinus projekt očakáva od styleguide `dist/` adresára. Akákoľvek zmena v build pipeline (najmä Vite migrácia) musí tento kontrakt zachovať alebo explicitne renegociovať.

## A) Mechanizmus prístupu k `dist/`

**Žiadny copy step ani symlink** — `dist/` je bind-mounted priamo do CakePHP kontajnera:

```yaml
# /Users/michalferak/Sites/martinus/docker/docker-compose.yaml
# Service: web8 (lines 70-72) a lb (lines 123-124)
- type: bind
  source: ../styleguide/dist
  target: /var/www/html/martinus/data/assets/martinus/lb
  consistency: cached
```

V PHP kóde:

```php
// martinus/cake3/src/Martinus/Utils/src/View/Helper/AssetHelper.php:20-26
'styleguidePath' => '/assets/martinus/lb/',
'fileRoot' => OLD_ROOT . DS . 'data',
```

Manifest cesta: `{fileRoot}/assets/martinus/lb/rev-manifest.json`

**Dôsledok**: Vite musí zapisovať do toho istého `dist/` adresára. Žiaden post-deploy copy step neexistuje — zmena súboru v `dist/` je okamžite viditeľná CakePHP runtime.

## B) Parsovanie manifestu

```php
// AssetHelper.php:247-266
protected function loadManifest(string $manifestFile, ?string $prefix = '')
{
    $manifest = [];
    if (file_exists($manifestFile)) {
        if ($contents = file_get_contents($manifestFile)) {
            $manifestItems = json_decode($contents, true);
            foreach ($manifestItems as $key => $item) {
                $manifest[Mb::trim($prefix . $key, '/')] = Mb::trim($prefix . $item, '/');
            }
        }
    } else {
        Log::error("Failed to load rev-manifest.json file ...");
    }
    return $manifest;
}
```

```php
// AssetHelper.php:215-229
public function styleguideUrl(string $file): string
{
    static $styleguideManifest = null;
    if (is_null($styleguideManifest)) {
        $manifestFile = $this->getConfig('fileRoot') . $this->getConfig('styleguidePath') . 'rev-manifest.json';
        $styleguideManifest = $this->loadManifest($manifestFile);
    }

    $file = $styleguideManifest[$file] ?? $file . '?v=' . ceil(time() / 603);
    $pattern = '/\.([a-f0-9]{8})(\.js|\.css)?$/';

    if (preg_match($pattern, $file, $matches)) {
        $hash = $matches[1];
        $file = preg_replace($pattern, '$2', $file) . "?id={$hash}";
    }
    // ...
}
```

**Logika v plain reči:**

1. Načítaj manifest. Hodnota pre kľúč `"styles/main.css"` je niečo ako `"styles/main.bd1678f0.css"`.
2. Skús zmatchovať regex `/\.([a-f0-9]{8})(\.js|\.css)?$/` — hľadá 8 hex znakov pred príponou.
3. Ak match → prepíš na clean filename + `?id=HASH`.
4. Ak nie je match → použi hodnotu z manifestu **as-is**.
5. Ak file v manifeste chýba → fallback `{file}?v={timestamp/603}`.

### Kompatibilita query-param formátu

Preferovaný formát `"styles/main.css": "styles/main.css?v=bd1678f"` **funguje** s existujúcim CakePHP kódom:

- Regex sa **nepokúsi matchnúť** (hodnota končí na `?v=...`, nie na `.hash.css`).
- Hodnota prejde nezmenená → final URL: `main.css?v=bd1678f`.
- Iba kozmetický rozdiel oproti súčasnému stavu: query param sa volá `?v=` namiesto `?id=`. Funkčne identické.

**Záver**: nemusíme produkovať hashované filename varianty. Stačí clean filename na disku + query-param hash v manifeste.

**Hash formát**: pri query-param formáte je hash čistý cache-buster string, PHP regex sa naň nepozerá. Môže byť **ľubovoľnej dĺžky a abecedy** (hex, base64, čokoľvek, čo vráti Vite/Rollup default). Žiadna transformácia v post-build skripte netreba.

### Fallback bez manifestu

Ak chýba manifest alebo kľúč → `{file}?v={timestamp/603}`. Aplikácia teda **neumrie** ak manifest nie je vygenerovaný, len cache busting je drsný (každých ~10 min iný timestamp). Užitočné pre dev mode.

## C) Konzumované entries z `dist/`

Audit pokrýva `Martinus/Core` modul (eshop layout). Iné moduly (`MartinusKiosk`, `MartinusSites`, `MartinusCampaigns`) majú vlastné `script_config.php` s potenciálne ďalšími entries — pre úplnú migráciu treba zauditovať aj tieto.

| Súbor | File:line | Kontext | Vždy/podmienečne |
|---|---|---|---|
| `scripts/vendor.js` | `Martinus/Core/templates/element/eshop/script_config.php:27` | eshop | vždy |
| `scripts/main.js` | `Martinus/Core/templates/element/eshop/script_config.php:28` | eshop | vždy |
| `scripts/font-awesome.js` | `script_config.php:29` | eshop | vždy |
| `styles/main.css` | `script_config.php:31` (via `addMainCss`) | eshop | vždy + critical CSS inline |
| `styles/xmas.css` | `script_config.php:34` | eshop | podmienečne (`Xmas::isLayoutOn()`) |
| `fonts/Tabac-Sans/style.css` | `script_config.php:37-41` | eshop | vždy |
| `sentry.js` | `layout/eshop/default.php:120` | `<head>`, `block: js-before`, no defer | podmienečne (config `Eshop.sentry.js.active`) |
| `fonts/*.woff2`, `*.woff` | `layout/eshop/default.php:62`, `element/eshop/font_loader.php:13-58` | preload + font-face | vždy / podmienečne |
| `scripts/plugins/modernizr.js` | `MartinusKiosk/templates/element/layout/script_config.php:22` | Kiosk layout | vždy |

**Nepatrí pod styleguide manifest** (verzionované z `/data/`, nie zo styleguide):
- `martinus.async.js`, `martinus.js`, `martinus.hotwired.js`, `{APP_BRAND}.production.js`

**Implikácia pre Vite multi-entry config**:
- minimálne tieto entries: `main`, `vendor`, `font-awesome`, `sentry`, `modernizr`, plus styly: `main.scss`, `xmas.scss`
- pravdepodobne ešte `light`, `charts`, `html3d`, `gallery`, `font-loader`, `knizna-odysea` (zdedené z light-scripts entries; treba overiť cez audit Kiosk/Sites/Campaigns modulov)

## D) Modernizr

- Cesta: `scripts/plugins/modernizr.js` (s podpriečinkom `plugins/`).
- Loaduje sa cez `styleguideUrl()` → manifest lookup → `?v=hash` query.
- Použitý iba v Kiosk/MartinusSites layoutoch, nie v eshop.
- **Lean build** (generovaný `gulp-modernizr` skenom CSS+JS) musí byť zachovaný — CakePHP očakáva konkrétne feature detection funkcie.

## E) Ikony

```php
// martinus/cake3/src/Martinus/Core/src/View/Helper/HtmlHelper.php:22
public const ICONS_PATH = '/data/assets/martinus/lb/icons_/app.svg?v=1';
```

```php
// HtmlHelper.php:50-74
public function icon(string $name, ...): string {
    return $this->tag('svg',
        $this->tag('use', '', ['xlink:href' => self::ICONS_PATH . '#' . $name]),
        $attrs
    );
}
```

**Kritické**:
- Cesta je **hardcoded** s `?v=1` — **nepoužíva manifest**.
- Adresár sa volá `icons_` (s podčiarkovníkom). Vite musí zachovať tento názov.
- Iba `app.svg` sprite je konzumovaný CakePHP-om. `styleguide.svg` sprite slúži iba pre showcase stránky.
- Sprite musí byť stále v rovnakom formáte (`<symbol id="icon-name">...`), aby `<use xlink:href="...#icon-name">` fungoval.

**Implikácia**: žiadna náhrada cesty bez koordinovanej zmeny v CakePHP HtmlHelper.

## F) Ďalšie zistenia a prekvapenia

### 1. Critical CSS inline

`addMainCss()` v CakePHP kontroluje existenciu critical CSS súboru na disku. Ak existuje, inline-uje sa do `<style>`. Ak nie, robí sa preload `main.css` cez loadCSS polyfill. **Treba zistiť**, ktorý súbor sa hľadá a či ho generuje súčasný build (nie je v light-scripts audite — možno samostatný post-build krok mimo `dist/`).

### 2. Fonts cez manifest

`fonts/Tabac-Sans/style.css` je v manifeste. Znamená to, že **CSS súbory pre fonty** musia tiež dostať query-param hash. Vite by mal SCSS pre fonty buildovať ako `fonts/Tabac-Sans/style.css` (zachovať pôvodnú cestu) alebo to riešiť copy step + manifest entry navyše.

### 3. ASSET_CDN

Všetky URL sú prefixované cez `ASSET_CDN` constant (`https://i1.martinus.sk` v prode, `https://localhost` v deve). Vite by sa s tým nemal zaoberať — URL prefix rieši CakePHP helper.

### 4. Sentry timing

`sentry.js` má `block: js-before, defer: false` — musí byť v `<head>` synchrónne pred ostatnými scriptmi. Vite default async loading na toto nemá vplyv (CakePHP rieši poradie tagov), len treba zachovať, že sentry.js entry existuje.

### 5. Sub-moduly s vlastnými asset loadermi

`MartinusKiosk`, `MartinusSites`, `MartinusCampaigns` majú vlastné `script_config.php`. Tento audit **nepokryl** ich úplný zoznam entries. Pred dokončením migrácie treba samostatný audit.

## G) Implikácie pre Vite plán

### Aktualizácie hlavného plánu

1. **Manifest format** — query-param formát `"main.css": "main.css?v=hash"` je kompatibilný bez zmien v PHP kóde. Hash môže byť v ľubovoľnom formáte (Vite default je OK).

2. **Žiadne hashované filename varianty na disku** — Vite vyrobí iba clean files, hashe žijú v manifeste. Polovica súborov v `dist/` zmizne.

3. **Zachovať priečinkovú štruktúru**:
   ```
   dist/
     ├── styles/*.css
     ├── scripts/*.js
     ├── scripts/plugins/modernizr.js
     ├── fonts/Tabac-Sans/style.css + woff2/woff
     ├── icons_/app.svg
     └── rev-manifest.json
   ```

4. **Critical CSS** — pred Vite implementáciou zistiť, ako sa generuje (nie je v light-scripts audite). Pravdepodobne samostatný extract z `main.css` cez nástroj typu `critical` alebo `criters`.

5. **Audit chýbajúcich modulov** — pred Fázou 2 spraviť audit `MartinusKiosk`, `MartinusSites`, `MartinusCampaigns` `script_config.php` na úplný zoznam entries.

6. **Icons sprite** — Vite plugin/skript musí výstup zapisovať do `dist/icons_/app.svg` (s podčiarkovníkom) a zachovať `<symbol id="icon-name">` formát.

7. **Robustnosť dev modu** — fallback na `?v={timestamp}` znamená, že aj keď manifest dočasne nie je, aplikácia funguje. Hybridný setup (Vite + Gulp) môže byť kratko-time v inconsistent state bez fatálnych chýb.

### Žiadne breaking changes nie sú potrebné na CakePHP strane

PHP kód `styleguideUrl()` zvládne nový query-param formát bez zmeny. To je výborná správa — migrácia neblokuje deploy CakePHP zmien.
