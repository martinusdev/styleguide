/*
 * Integration tests for `list_icons` and `get_icon` — exercised directly
 * via StyleguideServer over the real font-awesome-subset.yaml.
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

function parse(res) {
  return JSON.parse(res.content[0].text);
}

// ---------------------------------------------------------------------------
// list_icons

test('list_icons returns all icons with total and style=all', async () => {
  const data = parse(await server.listIcons());
  assert.ok(data.total > 0, 'total should be > 0');
  assert.equal(data.style, 'all');
  assert.ok(Array.isArray(data.icons));
  assert.equal(data.icons.length, data.total);
});

test('list_icons each entry has name, style, prefix, class', async () => {
  const data = parse(await server.listIcons());
  const icon = data.icons[0];
  assert.ok(typeof icon.name === 'string' && icon.name.length > 0);
  assert.ok(typeof icon.style === 'string');
  assert.ok(typeof icon.prefix === 'string');
  assert.ok(typeof icon.class === 'string');
  assert.equal(icon.class, `${icon.prefix} fa-${icon.name}`);
});

test('list_icons filtered by regular returns only far icons', async () => {
  const data = parse(await server.listIcons('regular'));
  assert.ok(data.total > 10);
  assert.equal(data.style, 'regular');
  assert.ok(data.icons.every((i) => i.style === 'regular'));
  assert.ok(data.icons.every((i) => i.prefix === 'far'));
});

test('list_icons filtered by brands returns only fab icons', async () => {
  const data = parse(await server.listIcons('brands'));
  assert.ok(data.total > 0);
  assert.ok(data.icons.every((i) => i.prefix === 'fab'));
});

test('list_icons filtered by solid returns only fas icons', async () => {
  const data = parse(await server.listIcons('solid'));
  assert.ok(data.icons.every((i) => i.prefix === 'fas'));
});

test('list_icons filtered by kit returns the 3 Martinus custom icons', async () => {
  const data = parse(await server.listIcons('kit'));
  assert.equal(data.total, 3);
  const names = data.icons.map((i) => i.name);
  assert.ok(names.includes('martinus'));
  assert.ok(names.includes('owl'));
  assert.ok(names.includes('owl-plus'));
  assert.ok(data.icons.every((i) => i.prefix === 'fak'));
});

test('list_icons rejects an invalid style', async () => {
  await assert.rejects(
    () => server.listIcons('light'),
    /Invalid style "light"/
  );
});

// ---------------------------------------------------------------------------
// get_icon

test('get_icon returns html snippet with far prefix by default', async () => {
  const data = parse(await server.getIcon({ name: 'heart' }));
  assert.equal(data.html, '<i class="far fa-heart"></i>');
  assert.equal(data.prefix, 'far');
  assert.equal(data.style, 'regular');
  assert.deepEqual(data.requires, ['font-awesome']);
});

test('get_icon with style=solid returns fas prefix', async () => {
  const data = parse(await server.getIcon({ name: 'heart', style: 'solid' }));
  assert.equal(data.html, '<i class="fas fa-heart"></i>');
  assert.equal(data.prefix, 'fas');
});

test('get_icon with style=kit returns fak prefix', async () => {
  const data = parse(await server.getIcon({ name: 'martinus', style: 'kit' }));
  assert.equal(data.html, '<i class="fak fa-martinus"></i>');
  assert.equal(data.prefix, 'fak');
});

test('get_icon owl-plus kit icon renders correctly', async () => {
  const data = parse(await server.getIcon({ name: 'owl-plus', style: 'kit' }));
  assert.equal(data.html, '<i class="fak fa-owl-plus"></i>');
});

test('get_icon always includes requires: ["font-awesome"]', async () => {
  const data = parse(await server.getIcon({ name: 'check-circle' }));
  assert.deepEqual(data.requires, ['font-awesome']);
});

test('get_icon throws when icon not found in any style', async () => {
  await assert.rejects(
    () => server.getIcon({ name: 'nonexistent-icon-xyz' }),
    /Icon "nonexistent-icon-xyz" not found/
  );
});

test('get_icon throws with helpful message when icon exists in different style', async () => {
  // heart exists in regular + solid, not in brands
  await assert.rejects(
    () => server.getIcon({ name: 'heart', style: 'brands' }),
    /not found in style "brands".*Available in:/s
  );
});

test('get_icon throws on invalid style', async () => {
  await assert.rejects(
    () => server.getIcon({ name: 'heart', style: 'light' }),
    /Invalid style "light"/
  );
});

test('get_icon throws when name is missing', async () => {
  await assert.rejects(
    () => server.getIcon({}),
    /Missing required argument "name"/
  );
});
