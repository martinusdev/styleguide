# PHP – integrácia témy

*Aktualizované: 2026-04-16*

Ako integrovať dark mode tému do PHP aplikácie bez bliknutia stránky (FOUC) pri načítaní v dark mode.

## Ako to funguje

1. **JavaScript nastavuje cookie** (`martinus-theme`) keď používateľ prepne tému
2. **PHP číta cookie** na serverovej strane (ak existuje)
3. **Prvá návšteva**: žiadna cookie → inline script detekuje systémovú preferenciu → žiadne bliknutie
4. **Ďalšie návštevy**: cookie existuje → PHP nastaví tému → žiadne bliknutie

## PHP implementácia

### Základná integrácia

```php
<?php
// Only set theme if cookie exists (prevents flicker on first visit)
$theme = isset($_COOKIE['martinus-theme']) ? $_COOKIE['martinus-theme'] : null;

// Validate theme value (security)
if ($theme !== null && !in_array($theme, ['light', 'dark'], true)) {
    $theme = null;
}

$themeAttr = $theme ? 'data-theme="' . htmlspecialchars($theme, ENT_QUOTES, 'UTF-8') . '"' : '';
?>
<!DOCTYPE html>
<html class="fonts-loaded" <?php echo $themeAttr; ?>>
<head>
    <!-- IMPORTANT: Include the inline theme script BEFORE CSS -->
    <script>
        (function() {
            function setCookie(name, value, days) {
                const d = new Date();
                d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
                document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
            }
            const theme = localStorage.getItem('martinus-theme') ||
                (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('martinus-theme', theme);
            setCookie('martinus-theme', theme, 365);
        })();
    </script>
    <link rel="stylesheet" href="/css/main.css">
</head>
<body>
    <!-- content -->
</body>
</html>
```

### CakePHP

**Odporúčaný spôsob – v AppController:**

```php
// src/Controller/AppController.php
protected function getThemeFromCookie(): ?string
{
    $theme = $this->request->getCookie('martinus-theme');
    return ($theme && in_array($theme, ['light', 'dark'], true)) ? $theme : null;
}

public function beforeRender(\Cake\Event\EventInterface $event)
{
    parent::beforeRender($event);
    $this->set('theme', $this->getThemeFromCookie());
}
```

V layout šablóne (`templates/layout/default.php`):

```php
<?php $themeAttr = $theme ? 'data-theme="' . h($theme) . '"' : ''; ?>
<!DOCTYPE html>
<html class="fonts-loaded" <?= $themeAttr ?>>
<head>
    <!-- CRITICAL: Theme script BEFORE CSS -->
    <script>
        (function() {
            function setCookie(name, value, days) {
                const d = new Date();
                d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
                document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
            }
            const theme = localStorage.getItem('martinus-theme') ||
                (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('martinus-theme', theme);
            setCookie('martinus-theme', theme, 365);
        })();
    </script>
    <?= $this->Html->css('main') ?>
</head>
<body>
    <?= $this->fetch('content') ?>
    <?= $this->Html->script('vendor') ?>
    <?= $this->Html->script('main') ?>
</body>
</html>
```

### Laravel

```php
// resources/views/layouts/app.blade.php
@php
    $theme = Cookie::get('martinus-theme');
    $themeAttr = ($theme && in_array($theme, ['light', 'dark'])) ? "data-theme=\"{$theme}\"" : '';
@endphp
<!DOCTYPE html>
<html class="fonts-loaded" {!! $themeAttr !!}>
<head>
    <script>/* rovnaký inline script */</script>
</head>
<body>@yield('content')</body>
</html>
```

## Nasadenie assets z dist/

```bash
cp -r dist/styles/* /path/to/webroot/css/
cp -r dist/scripts/* /path/to/webroot/js/
cp -r dist/fonts/* /path/to/webroot/fonts/
cp -r dist/images/* /path/to/webroot/img/
```

## CakePHP – špeciálne prípady

**View caching**: Cache bude mať pevnú `data-theme` hodnotu. Buď vypni caching pre layout, alebo použi JavaScript-only prístup (bez PHP nastavenia témy).

**CSP**: Inline `<script>` v `<head>` vyžaduje nonce:

```php
<?php
$cspNonce = base64_encode(random_bytes(16));
header("Content-Security-Policy: script-src 'nonce-{$cspNonce}' 'strict-dynamic'");
?>
<script nonce="<?= h($cspNonce) ?>">/* theme script */</script>
```

**PHPUnit testy**:

```php
public function testThemeCookie(): void
{
    $this->cookie('martinus-theme', 'dark');
    $this->get('/');
    $this->assertResponseContains('data-theme="dark"');
}

public function testNoThemeOnFirstVisit(): void
{
    $this->get('/');
    $this->assertResponseNotContains('data-theme');
}
```

## Cookie

- Názov: `martinus-theme`, hodnoty: `light` / `dark`
- Platnosť: 365 dní, path: `/`, SameSite: `Lax`
- Vždy validuj hodnotu, vždy escapuj výstup

## Prečo PHP nenastavuje default hodnotu?

Na prvej návšteve inline script detekuje systémovú preferenciu a nastaví tému pred načítaním CSS. Ak by PHP defaultoval na `light`, používatelia s dark mode by videli bliknutie (light → dark).

## Riešenie problémov

**Stále bliká**: Skontroluj, či theme script je pred CSS `<link>` tagmi.

**Téma sa neukladá**: Skontroluj, či sa nastavuje cookie (`DevTools → Application → Cookies`). Niektoré kontexty blokujú `document.cookie`.

**PHP nečíta cookie**: Skontroluj presný názov (`martinus-theme`), path (`/`) a case sensitivity.
