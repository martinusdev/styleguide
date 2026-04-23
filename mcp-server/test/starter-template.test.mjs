/*
 * Smoke tests for get_starter_template — mocks the rev-manifest fetch so the
 * test has no network dependency and can run offline in CI.
 */

import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.MARTINUS_STYLEGUIDE_APP_DIR) {
  process.env.MARTINUS_STYLEGUIDE_APP_DIR = resolve(__dirname, '..', '..', 'app');
}

const FAKE_MANIFEST = {
  'styles/main.css': 'styles/main.aaaaaaaa.css',
  'scripts/main.js': 'scripts/main.bbbbbbbb.js',
  'scripts/vendor.js': 'scripts/vendor.cccccccc.js',
  'scripts/font-awesome.js': 'scripts/font-awesome.dddddddd.js',
  'fonts/Tabac-Sans/style.css': 'fonts/Tabac-Sans/style.eeeeeeee.css',
};

let StyleguideServer;
let server;

before(async () => {
  ({ StyleguideServer } = await import('../src/index.js'));
  server = new StyleguideServer();
  server.fetchManifest = async () => FAKE_MANIFEST;
});

async function renderStarter(args = {}) {
  const res = await server.getStarterTemplate(args);
  return JSON.parse(res.content[0].text);
}

test('renders a complete HTML document with doctype, html, head, body', async () => {
  const { html } = await renderStarter();
  assert.match(html, /^<!doctype html>/);
  assert.match(html, /<html lang="sk"[^>]*>/);
  assert.match(html, /<\/html>\n?$/);
  assert.match(html, /<head>[\s\S]*<\/head>/);
  assert.match(html, /<body>[\s\S]*<\/body>/);
});

test('embeds hashed stylesheet and script URLs from the manifest', async () => {
  const { html } = await renderStarter();
  assert.match(html, /href="[^"]*main\.css\?v=aaaaaaaa"/);
  assert.match(html, /src="[^"]*main\.js\?v=bbbbbbbb"/);
  assert.match(html, /src="[^"]*vendor\.js\?v=cccccccc"/);
  assert.match(html, /src="[^"]*font-awesome\.js\?v=dddddddd"/);
});

test('includes no theme-switching logic (external consumers default to light)', async () => {
  // Regression: the eshop-style theme init script was surprise-flipping
  // external pages into dark mode via prefers-color-scheme. MCP outputs
  // should be deterministic — theme is not our concern.
  const { html } = await renderStarter();
  assert.ok(!html.includes('martinus-theme'), 'must not reference localStorage theme key');
  assert.ok(!html.includes('data-theme'), 'must not set data-theme attribute');
  assert.ok(!html.includes('prefers-color-scheme'), 'must not read OS color scheme');
});

test('applies language to <html lang> and select-language JS', async () => {
  const sk = await renderStarter({ language: 'sk' });
  assert.match(sk.html, /<html lang="sk"/);
  assert.match(sk.html, /selectLanguage = "sk"/);

  const cz = await renderStarter({ language: 'cz' });
  assert.match(cz.html, /<html lang="cs"/);
  assert.match(cz.html, /selectLanguage = "cz"/);
});

test('uses the custom title and HTML-escapes it', async () => {
  const { html } = await renderStarter({ title: 'Hi <script>x</script>' });
  assert.match(html, /<title>Hi &lt;script&gt;x&lt;\/script&gt;<\/title>/);
  assert.ok(!html.includes('<title>Hi <script>'));
});

test('rejects an invalid language with a clear error', async () => {
  await assert.rejects(
    () => server.getStarterTemplate({ language: 'en' }),
    /Invalid language "en"/
  );
});
