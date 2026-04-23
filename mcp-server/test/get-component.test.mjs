/*
 * Integration tests for the `get_component` tool — exercise StyleguideServer
 * directly (no stdio transport), backed by the real app/mcp-components.yaml
 * schema checked into the repo.
 */

import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// APP_DIR must be set before index.js is evaluated — the module reads the env
// var at top level to decide internal vs external mode. Respect an existing
// value (e.g. /app/app inside the mcp-server Docker container) and fall back
// to a path relative to the test file for native runs.
if (!process.env.MARTINUS_STYLEGUIDE_APP_DIR) {
  process.env.MARTINUS_STYLEGUIDE_APP_DIR = resolve(__dirname, '..', '..', 'app');
}

let StyleguideServer;
let server;

before(async () => {
  ({ StyleguideServer } = await import('../src/index.js'));
  server = new StyleguideServer();
});

async function getComponent(args) {
  // Direct method call — skips the setupHandlers() try/catch envelope that
  // converts thrown errors into { isError: true }. Error-path tests use
  // assert.rejects instead of inspecting isError.
  const res = await server.getComponent(args);
  const text = res.content[0].text;
  return { payload: JSON.parse(text) };
}

test('renders the bare button with only the required label', async () => {
  const { payload } = await getComponent({ name: 'buttons', label: 'Kúpiť' });
  assert.equal(payload.html, '<button class="btn">Kúpiť</button>');
  assert.deepEqual(payload.requires, []);
});

test('applies variant, size and shape modifiers as BEM classes', async () => {
  const { payload } = await getComponent({
    name: 'buttons',
    label: 'Save',
    variant: 'primary',
    size: 'large',
    shape: 'round',
  });
  assert.equal(
    payload.html,
    '<button class="btn btn--primary btn--large btn--round">Save</button>'
  );
});

test('adds font-awesome to requires when icon param is set', async () => {
  const { payload } = await getComponent({
    name: 'buttons',
    label: 'Buy',
    icon: 'cart-shopping',
  });
  assert.match(payload.html, /<i class="far fa-cart-shopping"><\/i>/);
  assert.deepEqual(payload.requires, ['font-awesome']);
});

test('emits the disabled attribute when disabled=true', async () => {
  const { payload } = await getComponent({
    name: 'buttons',
    label: 'No',
    disabled: true,
  });
  assert.match(payload.html, /<button class="btn" disabled>/);
});

test('HTML-escapes the label value', async () => {
  const { payload } = await getComponent({
    name: 'buttons',
    label: 'Hi <script>alert(1)</script>',
  });
  assert.ok(!payload.html.includes('<script>'));
  assert.match(payload.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test('rejects an invalid enum value with a helpful message', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'buttons', label: 'x', variant: 'neon' }),
    /Invalid value "neon" for "variant"/
  );
});

test('rejects a missing required param', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'buttons' }),
    /Missing required parameter "label"/
  );
});

test('rejects an unknown component with a list of valid names', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'nope' }),
    /Unknown component "nope"\. Available:/
  );
});

test('rejects an unknown parameter with a list of allowed params', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'buttons', label: 'x', extra: true }),
    /Unknown parameter\(s\) for component "buttons": extra/
  );
});

test('rejects a call without a name argument', async () => {
  await assert.rejects(
    () => server.getComponent({}),
    /Missing required argument "name"/
  );
});
