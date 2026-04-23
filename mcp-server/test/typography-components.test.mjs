/*
 * Integration tests for the typography components (`heading`, `text`,
 * `link`, `list`) — exercised directly via StyleguideServer.getComponent()
 * over the real app/mcp-components.yaml schema.
 */

import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.MARTINUS_STYLEGUIDE_APP_DIR) {
  process.env.MARTINUS_STYLEGUIDE_APP_DIR = resolve(__dirname, '..', '..', 'app');
}

let StyleguideServer;
let server;

before(async () => {
  ({ StyleguideServer } = await import('../src/index.js'));
  server = new StyleguideServer();
});

async function render(args) {
  const res = await server.getComponent(args);
  return JSON.parse(res.content[0].text);
}

// ---------------------------------------------------------------------------
// heading

test('heading renders a plain h{level} tag without class when no modifiers', async () => {
  const { html } = await render({ name: 'heading', level: '1', text: 'Hi' });
  assert.equal(html, '<h1>Hi</h1>');
});

test('heading accepts a numeric level (JSON-RPC number → string enum)', async () => {
  const { html } = await render({ name: 'heading', level: 2, text: 'Hi' });
  assert.equal(html, '<h2>Hi</h2>');
});

test('heading with styleLevel applies the .h{N} size override class', async () => {
  const { html } = await render({
    name: 'heading', level: '3', styleLevel: '1', text: 'Hi',
  });
  assert.equal(html, '<h3 class="h1">Hi</h3>');
});

test('heading with titleDivider=true adds .title-divider', async () => {
  const { html } = await render({
    name: 'heading', level: '2', titleDivider: true, text: 'Prečo Martinus?',
  });
  assert.equal(html, '<h2 class="title-divider">Prečo Martinus?</h2>');
});

test('heading combines styleLevel and titleDivider into one class list', async () => {
  const { html } = await render({
    name: 'heading', level: '3', styleLevel: '4', titleDivider: true, text: 'X',
  });
  assert.equal(html, '<h3 class="h4 title-divider">X</h3>');
});

test('heading text is raw (can contain inline markup)', async () => {
  const { html } = await render({
    name: 'heading', level: '1', text: 'Part <em>italic</em> part',
  });
  assert.ok(html.includes('<em>italic</em>'));
});

test('heading rejects an invalid level', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'heading', level: '7', text: 'x' }),
    /Invalid value "7" for "level"/
  );
});

test('heading rejects missing required params', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'heading', level: '1' }),
    /Missing required parameter "text"/
  );
  await assert.rejects(
    () => server.getComponent({ name: 'heading', text: 'x' }),
    /Missing required parameter "level"/
  );
});

// ---------------------------------------------------------------------------
// text

test('text renders a plain paragraph by default', async () => {
  const { html } = await render({ name: 'text', content: 'Hi' });
  assert.equal(html, '<p>Hi</p>');
});

test('text with size=medium applies .text-medium', async () => {
  const { html } = await render({ name: 'text', content: 'Lead', size: 'medium' });
  assert.equal(html, '<p class="text-medium">Lead</p>');
});

test('text with size=small applies .text-small', async () => {
  const { html } = await render({ name: 'text', content: 'Caption', size: 'small' });
  assert.equal(html, '<p class="text-small">Caption</p>');
});

test('text content passes inline markup raw', async () => {
  const { html } = await render({
    name: 'text', content: 'See <a href="/x" class="link">docs</a>.',
  });
  assert.ok(html.includes('<a href="/x" class="link">docs</a>'));
});

// ---------------------------------------------------------------------------
// link

test('link renders <a class="link"> with href and label', async () => {
  const { html } = await render({
    name: 'link', href: '/knihy', label: 'Knihy',
  });
  assert.equal(html, '<a href="/knihy" class="link">Knihy</a>');
});

test('link with variant applies .link--{variant}', async () => {
  const { html } = await render({
    name: 'link', href: '#', label: 'x', variant: 'white',
  });
  assert.equal(html, '<a href="#" class="link link--white">x</a>');
});

test('link href is HTML-escaped', async () => {
  // href is rendered via {{href}} (escaped) — guards against breaking out of
  // the attribute when an agent passes query strings with ampersands.
  const { html } = await render({
    name: 'link', href: '/search?q=a&b=c', label: 'x',
  });
  assert.ok(html.includes('href="/search?q=a&amp;b=c"'));
});

test('link rejects an invalid variant', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'link', href: '#', label: 'x', variant: 'neon' }),
    /Invalid value "neon" for "variant"/
  );
});

// ---------------------------------------------------------------------------
// list

test('list renders a <ul> with raw items', async () => {
  const { html } = await render({
    name: 'list', items: '<li>A</li><li>B</li>',
  });
  assert.equal(html, '<ul><li>A</li><li>B</li></ul>');
});

test('list with variant=unstyled applies .list--unstyled', async () => {
  const { html } = await render({
    name: 'list', items: '<li>x</li>', variant: 'unstyled',
  });
  assert.equal(html, '<ul class="list--unstyled"><li>x</li></ul>');
});

test('list rejects an invalid variant', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'list', items: '<li>x</li>', variant: 'fancy' }),
    /Invalid value "fancy" for "variant"/
  );
});

test('list items must be provided (required)', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'list' }),
    /Missing required parameter "items"/
  );
});
