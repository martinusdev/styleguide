/*
 * Integration tests for the layout primitives (`wrapper`, `row`, `col`,
 * `section`) — exercise StyleguideServer.getComponent() directly over the
 * real app/mcp-components.yaml schema.
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
// wrapper

test('wrapper renders as .wrapper-main around raw children', async () => {
  const { html } = await render({
    name: 'wrapper',
    children: '<p>Hi</p>',
  });
  assert.equal(html, '<div class="wrapper-main"><p>Hi</p></div>');
});

test('wrapper with no children renders an empty wrapper', async () => {
  const { html } = await render({ name: 'wrapper' });
  assert.equal(html, '<div class="wrapper-main"></div>');
});

// ---------------------------------------------------------------------------
// row

test('row renders default flex container', async () => {
  const { html } = await render({ name: 'row', children: '<div class="col"></div>' });
  assert.equal(html, '<div class="row"><div class="col"></div></div>');
});

test('row with variant=form applies row--form modifier', async () => {
  const { html } = await render({ name: 'row', variant: 'form' });
  assert.equal(html, '<div class="row row--form"></div>');
});

test('row rejects an unknown variant', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'row', variant: 'loose' }),
    /Invalid value "loose" for "variant"/
  );
});

// ---------------------------------------------------------------------------
// col

test('col with no size params renders bare .col', async () => {
  const { html } = await render({ name: 'col', children: 'x' });
  assert.equal(html, '<div class="col">x</div>');
});

test('col with size=6 applies .col--6', async () => {
  const { html } = await render({ name: 'col', size: '6', children: 'x' });
  assert.equal(html, '<div class="col col--6">x</div>');
});

test('col combines multiple breakpoint sizes with BEM double-dash', async () => {
  const { html } = await render({
    name: 'col',
    size: '12',
    sizeM: '6',
    sizeL: '4',
    children: 'x',
  });
  assert.equal(
    html,
    '<div class="col col--12 col--m-6 col--l-4">x</div>'
  );
});

test('col with variant=fill adds .col--fill', async () => {
  const { html } = await render({ name: 'col', variant: 'fill', children: 'x' });
  assert.equal(html, '<div class="col col--fill">x</div>');
});

test('col rejects an out-of-range size value', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'col', size: '13' }),
    /Invalid value "13" for "size"/
  );
});

test('col accepts a numeric sizeM (JSON-RPC number → string enum)', async () => {
  // Agents call get_component with `sizeM: 6`; JSON-RPC serializes that as a
  // number, but the schema lists '1'..'12' as strings. Loose enum comparison
  // bridges the gap.
  const { html } = await render({ name: 'col', sizeM: 6, children: 'x' });
  assert.equal(html, '<div class="col col--m-6">x</div>');
});

// ---------------------------------------------------------------------------
// section

test('section renders base .section around children', async () => {
  const { html } = await render({ name: 'section', children: '<h2>Hero</h2>' });
  assert.equal(html, '<div class="section"><h2>Hero</h2></div>');
});

test('section with size=small adds .section--small', async () => {
  const { html } = await render({ name: 'section', size: 'small' });
  assert.equal(html, '<div class="section section--small"></div>');
});

test('section with overflow=true adds .section--overflow', async () => {
  const { html } = await render({ name: 'section', overflow: true });
  assert.equal(html, '<div class="section section--overflow"></div>');
});

test('section combines size and overflow modifiers', async () => {
  const { html } = await render({
    name: 'section',
    size: 'small',
    overflow: true,
  });
  assert.equal(html, '<div class="section section--small section--overflow"></div>');
});

// ---------------------------------------------------------------------------
// Slot content is not escaped (raw via {{{children}}})

test('children slot preserves raw HTML (no escaping)', async () => {
  const { html } = await render({
    name: 'wrapper',
    children: '<span data-x="y">child</span>',
  });
  assert.ok(html.includes('<span data-x="y">child</span>'));
});

// ---------------------------------------------------------------------------
// Composition — agent-style nested render

test('nested wrapper > section > row > col composes cleanly', async () => {
  const col = (await render({ name: 'col', sizeM: '6', children: 'A' })).html;
  const col2 = (await render({ name: 'col', sizeM: '6', children: 'B' })).html;
  const row = (await render({ name: 'row', children: col + col2 })).html;
  const section = (await render({ name: 'section', children: row })).html;
  const wrapper = (await render({ name: 'wrapper', children: section })).html;
  assert.equal(
    wrapper,
    '<div class="wrapper-main">'
    + '<div class="section">'
    + '<div class="row">'
    + '<div class="col col--m-6">A</div>'
    + '<div class="col col--m-6">B</div>'
    + '</div>'
    + '</div>'
    + '</div>'
  );
});

// ---------------------------------------------------------------------------
// requires — layout has none, none conditional

test('layout components declare an empty requires array', async () => {
  for (const name of ['wrapper', 'row', 'col', 'section']) {
    const { requires } = await render({ name });
    assert.deepEqual(requires, [], `${name} should have empty requires`);
  }
});
