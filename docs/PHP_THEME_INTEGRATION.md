# PHP Theme Integration Guide

## Overview

This guide shows how to integrate the dark mode theme with your PHP application to eliminate the flash of light content (FOUC) when loading pages in dark mode.

## How It Works

1. **JavaScript sets a cookie** (`martinus-theme`) when the user toggles the theme
2. **PHP reads this cookie** on the server side (if it exists)
3. **On first visit**: No cookie → inline script detects system preference → no flicker
4. **On subsequent visits**: Cookie exists → PHP sets theme → no flicker

## PHP Implementation

### Basic Integration

Add this PHP code to your main layout/template file:

```php
<?php
// Only set theme if cookie exists (prevents flicker on first visit)
$theme = isset($_COOKIE['martinus-theme']) ? $_COOKIE['martinus-theme'] : null;

// Validate theme value (security)
if ($theme !== null && !in_array($theme, ['light', 'dark'], true)) {
    $theme = null;
}

// Build the data-theme attribute only if we have a valid theme
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

    <!-- Your CSS links -->
    <link rel="stylesheet" href="/css/main.css">
</head>
<body>
    <!-- Your body content -->
</body>
</html>
```

**How it works:**
- **First visit** (no cookie): PHP doesn't set `data-theme` → inline script detects system preference → sets theme before CSS loads → **no flicker**
- **Subsequent visits** (cookie exists): PHP sets `data-theme="dark"` → page loads with correct theme → inline script re-confirms (harmless) → **no flicker**

### Laravel Example

```php
// In your main Blade layout (e.g., resources/views/layouts/app.blade.php)
@php
    $theme = Cookie::get('martinus-theme');
    $themeAttr = ($theme && in_array($theme, ['light', 'dark'])) ? "data-theme=\"{$theme}\"" : '';
@endphp
<!DOCTYPE html>
<html class="fonts-loaded" {!! $themeAttr !!}>
<head>
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
    <!-- Your head content -->
</head>
<body>
    @yield('content')
</body>
</html>
```

### CakePHP Example

#### Option 1: In Controller (Recommended)

```php
<?php
// In your AppController.php (src/Controller/AppController.php)
namespace App\Controller;

use Cake\Controller\Controller;

class AppController extends Controller
{
    public function beforeRender(\Cake\Event\EventInterface $event)
    {
        parent::beforeRender($event);

        // Get theme from cookie (don't default to anything)
        $theme = $this->request->getCookie('martinus-theme');

        // Validate theme value
        if ($theme !== null && !in_array($theme, ['light', 'dark'], true)) {
            $theme = null;
        }

        // Make theme available to all views (will be null on first visit)
        $this->set('theme', $theme);
    }
}
```

Then in your layout template (e.g., `templates/layout/default.php`):

```php
<?php
$themeAttr = $theme ? 'data-theme="' . h($theme) . '"' : '';
?>
<!DOCTYPE html>
<html class="fonts-loaded" <?= $themeAttr ?>>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= $this->fetch('title') ?></title>

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
    <?= $this->fetch('meta') ?>
    <?= $this->fetch('css') ?>
</head>
<body>
    <?= $this->Flash->render() ?>
    <?= $this->fetch('content') ?>

    <?= $this->Html->script('vendor') ?>
    <?= $this->Html->script('main') ?>
    <?= $this->fetch('script') ?>
</body>
</html>
```

#### Option 2: Direct in Template (Quick & Simple)

```php
<?php
// In templates/layout/default.php
$theme = $this->request->getCookie('martinus-theme');
$theme = ($theme && in_array($theme, ['light', 'dark'], true)) ? $theme : null;
$themeAttr = $theme ? 'data-theme="' . h($theme) . '"' : '';
?>
<!DOCTYPE html>
<html class="fonts-loaded" <?= $themeAttr ?>>
<head>
    <?= $this->Html->charset() ?>

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
</body>
</html>
```

## CakePHP Asset Pipeline Integration

After building the styleguide with `./build.sh`, copy the assets to your CakePHP project:

```bash
# From the styleguide directory
cp -r dist/styles/* /path/to/your/cakephp/webroot/css/
cp -r dist/scripts/* /path/to/your/cakephp/webroot/js/
cp -r dist/fonts/* /path/to/your/cakephp/webroot/fonts/
cp -r dist/images/* /path/to/your/cakephp/webroot/img/
```

Then in your CakePHP layout, load the assets:

```php
<?= $this->Html->css('main') ?>

<!-- At bottom of body -->
<?= $this->Html->script('vendor') ?>
<?= $this->Html->script('main') ?>
<?= $this->Html->script('font-awesome') ?>
```

**Note**: You may need to adjust asset paths in the built CSS/JS files if your CakePHP app doesn't serve from the root path. CakePHP's `HtmlHelper` will automatically add `/` prefix to asset URLs.

## Testing

1. **Build the styleguide**: `./build.sh`
2. **Copy the built CSS/JS** to your PHP project
3. **Add the PHP code** to your layout
4. **Test the flow**:
   - **First visit** (clear cookies): Should respect system dark mode preference, no flicker
   - Toggle to opposite theme → cookie is set
   - **Reload page**: Should show your chosen theme immediately, no flicker
   - Clear cookies and test again

### CakePHP Specific Testing

If using CakePHP, you can test the cookie reading with debug:

```php
// Add to your layout temporarily
<?php
debug($this->request->getCookie('martinus-theme'));
debug($theme);
?>
```

Or use CakePHP's DebugKit toolbar to inspect cookies and template variables.

## Cookie Details

- **Name**: `martinus-theme`
- **Values**: `light` or `dark`
- **Expiration**: 365 days
- **Path**: `/`
- **SameSite**: `Lax`
- **Purpose**: Persists user's theme choice between page loads and syncs with PHP

## Security Notes

- Always validate the cookie value (only allow 'light' or 'dark')
- Always escape the output when setting `data-theme` attribute
- The cookie is client-side controlled (users can modify it, but it's harmless)
- No sensitive data is stored in the cookie

## Why Not Default to 'light'?

On first visit, the inline script automatically detects the user's system preference (`prefers-color-scheme: dark`). If PHP defaults to 'light', users with dark mode will see:
1. Page loads with light theme (from PHP)
2. Script detects dark system preference
3. Switches to dark → **flicker!**

By not setting a default in PHP, the inline script sets the correct theme before CSS loads, eliminating flicker entirely.

## CakePHP Best Practices

### 1. Cache Considerations

If you're using view caching in CakePHP, the theme won't work properly because the cached HTML will have a fixed `data-theme` value. Either:

- **Disable caching** for layouts that use dynamic theme switching
- **Keep JavaScript-only approach** (don't set theme via PHP, always use inline script)
- **Vary cache by cookie**: Add theme cookie to cache key (more complex)

```php
// Example: Disable cache for theme-enabled layouts
$this->viewBuilder()->disableAutoLayout();
```

### 2. Content Security Policy (CSP)

If you're using CSP headers, you'll need to allow the inline `<script>` in the `<head>`. Add a nonce:

```php
// In your layout
<?php
$cspNonce = base64_encode(random_bytes(16));
header("Content-Security-Policy: script-src 'nonce-{$cspNonce}' 'strict-dynamic'");
?>
<!DOCTYPE html>
<html class="fonts-loaded" <?= $themeAttr ?>>
<head>
    <script nonce="<?= h($cspNonce) ?>">
        // Theme initialization script
    </script>
</head>
```

### 3. Testing with PHPUnit

Test theme switching in your controller tests:

```php
// In tests/TestCase/Controller/PagesControllerTest.php
public function testThemeCookie()
{
    // Set cookie
    $this->cookie('martinus-theme', 'dark');

    // Request page
    $this->get('/');

    // Assert theme is set in response
    $this->assertResponseContains('data-theme="dark"');
}

public function testNoThemeOnFirstVisit()
{
    // No cookie set
    $this->get('/');

    // Should not have data-theme set by PHP
    $this->assertResponseNotContains('data-theme');
}
```

### 4. Multiple Layouts

If you have multiple layouts (admin, frontend, etc.), consider creating a shared method:

```php
// In src/Controller/AppController.php
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

## Troubleshooting

### Still seeing flicker?

1. **Check script placement**: The theme script MUST be before CSS `<link>` tags
2. **Check cookie is being set**: Open DevTools → Application/Storage → Cookies
3. **Clear localStorage and cookies**: Start fresh to test first-visit experience
4. **Check console for errors**: JavaScript errors will prevent theme from being set

### Theme not persisting?

1. **Cookie not being set**: Check that `document.cookie` is working (might be blocked in some contexts)
2. **Domain mismatch**: Ensure cookie domain matches your site
3. **HTTPS required**: Some browsers restrict cookies on localhost without HTTPS

### PHP not reading cookie?

1. **Check cookie name**: Must be exactly `martinus-theme`
2. **Check cookie path**: Set to `/`
3. **Case sensitivity**: PHP `$_COOKIE` is case-sensitive
