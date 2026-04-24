/*
 * Integration tests for get_utilities — exercises StyleguideServer directly
 * against the real app/mcp-utilities.yaml.
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
// Structure

test('get_utilities all: returns meta, groups, custom', async () => {
  const data = parse(await server.getUtilities('all'));
  assert.ok(data.meta, 'has meta');
  assert.ok(Array.isArray(data.groups), 'groups is array');
  assert.ok(data.groups.length > 0, 'has groups');
  assert.ok(data.custom, 'has custom');
});

test('get_utilities all: meta contains breakpoints array', async () => {
  const data = parse(await server.getUtilities('all'));
  assert.ok(Array.isArray(data.meta.breakpoints));
  assert.ok(data.meta.breakpoints.length >= 5);
});

test('get_utilities all: breakpoints include xs with empty suffix', async () => {
  const data = parse(await server.getUtilities('all'));
  const xs = data.meta.breakpoints.find((b) => b.name === 'xs');
  assert.ok(xs, 'xs breakpoint exists');
  assert.equal(xs.suffix, '', 'xs has empty suffix');
});

test('get_utilities all: breakpoints include m with suffix m', async () => {
  const data = parse(await server.getUtilities('all'));
  const m = data.meta.breakpoints.find((b) => b.name === 'm');
  assert.ok(m);
  assert.equal(m.suffix, 'm');
  assert.equal(m.min_width, '768px');
});

test('get_utilities all: meta contains spacers', async () => {
  const data = parse(await server.getUtilities('all'));
  assert.ok(data.meta.spacers);
  assert.equal(data.meta.spacers.none, 0);
  assert.equal(data.meta.spacers.small, '10px');
  assert.equal(data.meta.spacers.medium, '20px');
});

// ---------------------------------------------------------------------------
// Key groups are present

test('get_utilities all: display group exists', async () => {
  const data = parse(await server.getUtilities('all'));
  const g = data.groups.find((g) => g.id === 'display');
  assert.ok(g, 'display group exists');
  assert.equal(g.class, 'd');
  assert.ok(g.responsive === true);
  assert.ok(g.values.includes('flex'));
  assert.ok(g.values.includes('none'));
});

test('get_utilities all: justify_content group exists with correct values', async () => {
  const data = parse(await server.getUtilities('all'));
  const g = data.groups.find((g) => g.id === 'justify_content');
  assert.ok(g);
  assert.equal(g.class, 'justify-content');
  assert.ok(g.values.center !== undefined);
  assert.ok(g.values.between !== undefined);
  assert.ok(g.values.end !== undefined);
});

test('get_utilities all: align_items group exists', async () => {
  const data = parse(await server.getUtilities('all'));
  const g = data.groups.find((g) => g.id === 'align_items');
  assert.ok(g);
  assert.equal(g.class, 'align-items');
  assert.ok(g.values.center !== undefined);
  assert.ok(g.values.end !== undefined);
});

test('get_utilities all: margin group has all 7 axes', async () => {
  const data = parse(await server.getUtilities('all'));
  const g = data.groups.find((g) => g.id === 'margin');
  assert.ok(g);
  const classes = g.axes.map((a) => a.class);
  assert.ok(classes.includes('m'));
  assert.ok(classes.includes('mt'));
  assert.ok(classes.includes('mb'));
  assert.ok(classes.includes('ml'));
  assert.ok(classes.includes('mr'));
  assert.ok(classes.includes('mx'));
  assert.ok(classes.includes('my'));
});

test('get_utilities all: padding group exists', async () => {
  const data = parse(await server.getUtilities('all'));
  const g = data.groups.find((g) => g.id === 'padding');
  assert.ok(g);
  assert.ok(g.values.includes('medium'));
});

test('get_utilities all: gap group exists and is responsive', async () => {
  const data = parse(await server.getUtilities('all'));
  const g = data.groups.find((g) => g.id === 'gap');
  assert.ok(g);
  assert.ok(g.responsive === true);
  assert.ok(g.values.includes('small'));
});

// ---------------------------------------------------------------------------
// Custom utilities

test('get_utilities all: custom.visibility contains hide and show-m', async () => {
  const data = parse(await server.getUtilities('all'));
  assert.ok(data.custom.visibility);
  assert.ok(data.custom.visibility.classes.hide);
  assert.ok(data.custom.visibility.classes['show-m']);
  assert.ok(data.custom.visibility.classes['hide-m']);
});

test('get_utilities all: custom.flex contains flex-1 and flex-noshrink', async () => {
  const data = parse(await server.getUtilities('all'));
  assert.ok(data.custom.flex);
  assert.ok(data.custom.flex.classes['flex-1']);
  assert.ok(data.custom.flex.classes['flex-noshrink']);
});

test('get_utilities all: custom.text contains text-bold and text-nowrap', async () => {
  const data = parse(await server.getUtilities('all'));
  assert.ok(data.custom.text);
  assert.ok(data.custom.text.classes['text-bold']);
  assert.ok(data.custom.text.classes['text-nowrap']);
  assert.ok(data.custom.text.classes['text-ellipsis']);
});

// ---------------------------------------------------------------------------
// Category filtering

test('get_utilities flex: returns display and flex groups', async () => {
  const data = parse(await server.getUtilities('flex'));
  const ids = data.groups.map((g) => g.id);
  assert.ok(ids.includes('display'));
  assert.ok(ids.includes('justify_content'));
  assert.ok(ids.includes('align_items'));
  assert.ok(ids.includes('flex_direction'));
  assert.ok(ids.includes('flex_wrap'));
});

test('get_utilities flex: includes custom.flex', async () => {
  const data = parse(await server.getUtilities('flex'));
  assert.ok(data.custom.flex);
  assert.ok(data.custom.flex.classes['flex-1']);
});

test('get_utilities flex: does not include margin group', async () => {
  const data = parse(await server.getUtilities('flex'));
  const ids = data.groups.map((g) => g.id);
  assert.ok(!ids.includes('margin'));
  assert.ok(!ids.includes('padding'));
});

test('get_utilities spacing: includes margin, padding, gap', async () => {
  const data = parse(await server.getUtilities('spacing'));
  const ids = data.groups.map((g) => g.id);
  assert.ok(ids.includes('margin'));
  assert.ok(ids.includes('padding'));
  assert.ok(ids.includes('gap'));
});

test('get_utilities spacing: does not include flex groups', async () => {
  const data = parse(await server.getUtilities('spacing'));
  const ids = data.groups.map((g) => g.id);
  assert.ok(!ids.includes('justify_content'));
  assert.ok(!ids.includes('align_items'));
});

test('get_utilities display: returns only display group', async () => {
  const data = parse(await server.getUtilities('display'));
  const ids = data.groups.map((g) => g.id);
  assert.ok(ids.includes('display'));
  assert.ok(!ids.includes('margin'));
});

test('get_utilities text: includes text_align and custom.text', async () => {
  const data = parse(await server.getUtilities('text'));
  const ids = data.groups.map((g) => g.id);
  assert.ok(ids.includes('text_align'));
  assert.ok(data.custom.text);
});

test('get_utilities visibility: includes custom.visibility', async () => {
  const data = parse(await server.getUtilities('visibility'));
  assert.ok(data.custom.visibility);
  assert.ok(data.custom.visibility.classes['show-m']);
});

// ---------------------------------------------------------------------------
// Default (no category = all)

test('get_utilities with no category defaults to all', async () => {
  const data = parse(await server.getUtilities());
  assert.ok(data.groups.length > 10);
});

// ---------------------------------------------------------------------------
// Error handling

test('get_utilities rejects invalid category', async () => {
  await assert.rejects(
    () => server.getUtilities('colors'),
    /Invalid category "colors"/
  );
});

// ---------------------------------------------------------------------------
// Responsive examples documented

test('get_utilities flex: display group has responsive examples', async () => {
  const data = parse(await server.getUtilities('flex'));
  const display = data.groups.find((g) => g.id === 'display');
  assert.ok(Array.isArray(display.examples));
  const classNames = display.examples.map((e) => e.class);
  assert.ok(classNames.some((c) => c.includes('d-flex')));
  assert.ok(classNames.some((c) => c.includes('d-m-')));
});

test('get_utilities flex: justify_content has responsive examples', async () => {
  const data = parse(await server.getUtilities('flex'));
  const jc = data.groups.find((g) => g.id === 'justify_content');
  assert.ok(Array.isArray(jc.examples));
  const classNames = jc.examples.map((e) => e.class);
  assert.ok(classNames.some((c) => c.includes('justify-content-center') || c === 'justify-content-center'));
});
