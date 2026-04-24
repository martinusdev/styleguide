/*
 * Integration tests for data-display / navigation components:
 * table, tabs, dropdown
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

async function getComponent(args) {
  const res = await server.getComponent(args);
  return JSON.parse(res.content[0].text);
}

// ---------------------------------------------------------------------------
// table

test('table: body-only renders base .table with tbody', async () => {
  const p = await getComponent({ name: 'table', body: '<tr><td>1</td></tr>' });
  assert.equal(p.html, '<table class="table"><tbody><tr><td>1</td></tr></tbody></table>');
  assert.deepEqual(p.requires, []);
});

test('table: head param wraps in thead before tbody', async () => {
  const p = await getComponent({
    name: 'table',
    head: '<tr><th>Col</th></tr>',
    body: '<tr><td>val</td></tr>',
  });
  assert.match(p.html, /<thead><tr><th>Col<\/th><\/tr><\/thead>/);
  assert.match(p.html, /<tbody><tr><td>val<\/td><\/tr><\/tbody>/);
});

test('table: head omitted means no thead element', async () => {
  const p = await getComponent({ name: 'table', body: '<tr><td>x</td></tr>' });
  assert.ok(!p.html.includes('<thead>'));
});

test('table: variant simple adds table--simple', async () => {
  const p = await getComponent({ name: 'table', body: '<tr><td>x</td></tr>', variant: 'simple' });
  assert.match(p.html, /class="table table--simple"/);
});

test('table: variant striped adds table--striped', async () => {
  const p = await getComponent({ name: 'table', body: '<tr><td>x</td></tr>', variant: 'striped' });
  assert.match(p.html, /table--striped/);
});

test('table: variant clean adds table--clean', async () => {
  const p = await getComponent({ name: 'table', body: '<tr><td>x</td></tr>', variant: 'clean' });
  assert.match(p.html, /table--clean/);
});

test('table: variant condensed adds table--condensed', async () => {
  const p = await getComponent({ name: 'table', body: '<tr><td>x</td></tr>', variant: 'condensed' });
  assert.match(p.html, /table--condensed/);
});

test('table: size small adds table--small', async () => {
  const p = await getComponent({ name: 'table', body: '<tr><td>x</td></tr>', size: 'small' });
  assert.match(p.html, /table--small/);
});

test('table: adaptive adds table--adaptive', async () => {
  const p = await getComponent({ name: 'table', body: '<tr><td>x</td></tr>', adaptive: true });
  assert.match(p.html, /table--adaptive/);
});

test('table: variant and size combine correctly', async () => {
  const p = await getComponent({
    name: 'table',
    body: '<tr><td>x</td></tr>',
    variant: 'striped',
    size: 'small',
  });
  assert.match(p.html, /table table--striped table--small/);
});

test('table: body is injected as raw HTML', async () => {
  const p = await getComponent({
    name: 'table',
    body: '<tr><td><strong>bold</strong></td></tr>',
  });
  assert.match(p.html, /<strong>bold<\/strong>/);
});

test('table: rejects missing body', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'table' }),
    /Missing required parameter "body"/
  );
});

test('table: rejects invalid variant', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'table', body: '<tr><td>x</td></tr>', variant: 'bordered' }),
    /Invalid value "bordered" for "variant"/
  );
});

// ---------------------------------------------------------------------------
// tabs

const NAV_LINK = '<li class="tab-nav__item" data-tabs-item><a class="tab-nav__content tab-nav__content--link" href="#t1" role="tab">Tab 1</a></li>';
const PANELS = '<section id="t1" class="tab is-active"><p>Content</p></section>';

test('tabs: default style renders ul.tab-nav + article.tabs', async () => {
  const p = await getComponent({ name: 'tabs', nav_items: NAV_LINK, panels: PANELS });
  assert.match(p.html, /^<ul class="tab-nav" data-tabs-container>/);
  assert.match(p.html, /<article class="tabs">/);
  assert.deepEqual(p.requires, []);
});

test('tabs: no filter flag — does not render div.btn-group', async () => {
  const p = await getComponent({ name: 'tabs', nav_items: NAV_LINK, panels: PANELS });
  assert.ok(!p.html.includes('btn-group'));
});

test('tabs: block adds tab-nav--block', async () => {
  const p = await getComponent({ name: 'tabs', nav_items: NAV_LINK, panels: PANELS, block: true });
  assert.match(p.html, /tab-nav tab-nav--block/);
});

test('tabs: rounded adds tab-nav--rounded', async () => {
  const p = await getComponent({ name: 'tabs', nav_items: NAV_LINK, panels: PANELS, rounded: true });
  assert.match(p.html, /tab-nav tab-nav--rounded/);
});

test('tabs: block and rounded combine', async () => {
  const p = await getComponent({
    name: 'tabs',
    nav_items: NAV_LINK,
    panels: PANELS,
    block: true,
    rounded: true,
  });
  assert.match(p.html, /tab-nav tab-nav--block tab-nav--rounded/);
});

test('tabs: filter renders div.btn-group instead of ul.tab-nav', async () => {
  const filterNav = '<a class="btn btn--tab is-active" href="#t1" role="tab" data-tabs-item>Tab 1</a>';
  const p = await getComponent({ name: 'tabs', nav_items: filterNav, panels: PANELS, filter: true });
  assert.match(p.html, /^<div class="btn-group btn-group--tab btn-group--horizontal" data-tabs-container>/);
  assert.ok(!p.html.includes('tab-nav'));
});

test('tabs: filter still renders article.tabs for panels', async () => {
  const filterNav = '<a class="btn btn--tab" href="#t1" role="tab" data-tabs-item>Tab 1</a>';
  const p = await getComponent({ name: 'tabs', nav_items: filterNav, panels: PANELS, filter: true });
  assert.match(p.html, /<article class="tabs">/);
});

test('tabs: nav_items injected as raw HTML', async () => {
  const p = await getComponent({ name: 'tabs', nav_items: NAV_LINK, panels: PANELS });
  assert.match(p.html, /tab-nav__content--link/);
});

test('tabs: panels injected as raw HTML', async () => {
  const p = await getComponent({ name: 'tabs', nav_items: NAV_LINK, panels: PANELS });
  assert.match(p.html, /<section id="t1" class="tab is-active">/);
});

test('tabs: rejects missing nav_items', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'tabs', panels: PANELS }),
    /Missing required parameter "nav_items"/
  );
});

test('tabs: rejects missing panels', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'tabs', nav_items: NAV_LINK }),
    /Missing required parameter "panels"/
  );
});

// ---------------------------------------------------------------------------
// dropdown

const ITEMS = '<a class="dropdown__item" href="#">Item 1</a><a class="dropdown__item" href="#">Item 2</a>';

test('dropdown: bare items render base .dropdown', async () => {
  const p = await getComponent({ name: 'dropdown', items: ITEMS });
  assert.equal(
    p.html,
    `<div class="dropdown" data-dropdown aria-expanded="false"><div class="dropdown__wrap">${ITEMS}</div></div>`
  );
  assert.deepEqual(p.requires, []);
});

test('dropdown: arrowhead adds dropdown--arrowhead', async () => {
  const p = await getComponent({ name: 'dropdown', items: ITEMS, arrowhead: true });
  assert.match(p.html, /dropdown dropdown--arrowhead/);
});

test('dropdown: space adds dropdown--space', async () => {
  const p = await getComponent({ name: 'dropdown', items: ITEMS, space: true });
  assert.match(p.html, /dropdown--space/);
});

test('dropdown: nowrap adds dropdown--nowrap', async () => {
  const p = await getComponent({ name: 'dropdown', items: ITEMS, nowrap: true });
  assert.match(p.html, /dropdown--nowrap/);
});

test('dropdown: align_right adds dropdown--align-right', async () => {
  const p = await getComponent({ name: 'dropdown', items: ITEMS, align_right: true });
  assert.match(p.html, /dropdown--align-right/);
});

test('dropdown: multiple modifiers combine', async () => {
  const p = await getComponent({
    name: 'dropdown',
    items: ITEMS,
    space: true,
    nowrap: true,
  });
  assert.match(p.html, /dropdown--space/);
  assert.match(p.html, /dropdown--nowrap/);
});

test('dropdown: items injected as raw HTML', async () => {
  const p = await getComponent({ name: 'dropdown', items: ITEMS });
  assert.match(p.html, /dropdown__item/);
});

test('dropdown: group heading in items renders raw', async () => {
  const withGroup = '<h5 class="dropdown__group">Group</h5><a class="dropdown__item" href="#">Item</a>';
  const p = await getComponent({ name: 'dropdown', items: withGroup });
  assert.match(p.html, /<h5 class="dropdown__group">Group<\/h5>/);
});

test('dropdown: aria-expanded is always false in initial markup', async () => {
  const p = await getComponent({ name: 'dropdown', items: ITEMS });
  assert.match(p.html, /aria-expanded="false"/);
});

test('dropdown: rejects missing items', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'dropdown' }),
    /Missing required parameter "items"/
  );
});
