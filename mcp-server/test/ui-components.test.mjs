/*
 * Integration tests for UI components (`badge`, `pill`, `alert`, `card`) —
 * exercised directly via StyleguideServer.getComponent() over the real
 * app/mcp-components.yaml schema.
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
// badge

test('badge renders default bordered label', async () => {
  const { html } = await render({ name: 'badge', label: 'Novinka' });
  assert.equal(html, '<span class="badge">Novinka</span>');
});

test('badge with variant applies .badge--{variant}', async () => {
  const { html } = await render({ name: 'badge', label: 'Zľava', variant: 'primary' });
  assert.equal(html, '<span class="badge badge--primary">Zľava</span>');
});

test('badge with size=large applies .badge--large', async () => {
  const { html } = await render({ name: 'badge', label: 'Bestseller', size: 'large' });
  assert.equal(html, '<span class="badge badge--large">Bestseller</span>');
});

test('badge combines variant and size', async () => {
  const { html } = await render({ name: 'badge', label: 'x', variant: 'green', size: 'large' });
  assert.equal(html, '<span class="badge badge--green badge--large">x</span>');
});

test('badge label is raw (passes inline markup)', async () => {
  const { html } = await render({ name: 'badge', label: '<strong>New</strong>' });
  assert.ok(html.includes('<strong>New</strong>'));
});

test('badge rejects invalid variant', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'badge', label: 'x', variant: 'rainbow' }),
    /Invalid value "rainbow" for "variant"/
  );
});

test('badge requires label', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'badge' }),
    /Missing required parameter "label"/
  );
});

// ---------------------------------------------------------------------------
// pill

test('pill renders default rounded counter', async () => {
  const { html } = await render({ name: 'pill', label: '4' });
  assert.equal(html, '<span class="pill">4</span>');
});

test('pill with variant applies .pill--{variant}', async () => {
  const { html } = await render({ name: 'pill', label: '30', variant: 'blue' });
  assert.equal(html, '<span class="pill pill--blue">30</span>');
});

test('pill label is raw', async () => {
  const { html } = await render({ name: 'pill', label: '<em>42</em>' });
  assert.ok(html.includes('<em>42</em>'));
});

test('pill rejects invalid variant', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'pill', label: '1', variant: 'purple' }),
    /Invalid value "purple" for "variant"/
  );
});

test('pill requires label', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'pill' }),
    /Missing required parameter "label"/
  );
});

// ---------------------------------------------------------------------------
// alert

test('alert renders default info alert with content only', async () => {
  const { html } = await render({ name: 'alert', content: 'Všetko OK.' });
  assert.equal(html, '<div class="alert"><div class="alert__content">Všetko OK.</div></div>');
});

test('alert with variant applies .alert--{variant}', async () => {
  const { html } = await render({ name: 'alert', content: 'Chyba.', variant: 'error' });
  assert.equal(html, '<div class="alert alert--error"><div class="alert__content">Chyba.</div></div>');
});

test('alert with icon renders .alert__icon wrapper and FA icon', async () => {
  const { html } = await render({ name: 'alert', content: 'OK', icon: 'check-circle' });
  assert.ok(html.includes('<div class="alert__icon"><i class="far fa-check-circle fa-xl"></i></div>'));
  assert.ok(html.includes('<div class="alert__content">OK</div>'));
});

test('alert with action renders .alert__action wrapper', async () => {
  const action = '<button class="btn btn--clean btn--small" data-alert-action></button>';
  const { html } = await render({ name: 'alert', content: 'Msg', action });
  assert.ok(html.includes(`<div class="alert__action">${action}</div>`));
});

test('alert content is raw (passes inline markup)', async () => {
  const { html } = await render({
    name: 'alert',
    content: 'Viac info <a class="link" href="#">tu</a>.',
  });
  assert.ok(html.includes('<a class="link" href="#">tu</a>'));
});

test('alert with icon adds font-awesome to requires', async () => {
  const { requires } = await render({ name: 'alert', content: 'x', icon: 'circle-info' });
  assert.ok(requires.includes('font-awesome'));
});

test('alert without icon has empty requires', async () => {
  const { requires } = await render({ name: 'alert', content: 'x' });
  assert.deepEqual(requires, []);
});

test('alert rejects invalid variant', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'alert', content: 'x', variant: 'purple' }),
    /Invalid value "purple" for "variant"/
  );
});

test('alert requires content', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'alert' }),
    /Missing required parameter "content"/
  );
});

// ---------------------------------------------------------------------------
// card

test('card renders basic card with content', async () => {
  const { html } = await render({ name: 'card', content: '<p>Hello</p>' });
  assert.equal(html, '<article class="card"><section class="card__content"><p>Hello</p></section></article>');
});

test('card with variant applies .card--{variant}', async () => {
  const { html } = await render({ name: 'card', content: 'x', variant: 'well' });
  assert.ok(html.startsWith('<article class="card card--well">'));
});

test('card with clickable=true adds .card--clickable', async () => {
  const { html } = await render({ name: 'card', content: 'x', clickable: true });
  assert.ok(html.includes('card--clickable'));
});

test('card with header renders card__header section before content', async () => {
  const { html } = await render({ name: 'card', content: 'Body', header: 'Nadpis' });
  assert.ok(html.includes('<header class="card__header card-header"><h2 class="card-header__title">Nadpis</h2></header>'));
  const headerPos = html.indexOf('<header');
  const contentPos = html.indexOf('<section');
  assert.ok(headerPos < contentPos, 'header should come before content');
});

test('card header is HTML-escaped', async () => {
  const { html } = await render({ name: 'card', content: 'x', header: '<script>alert(1)</script>' });
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(!html.includes('<script>'));
});

test('card with footer renders card__footer after content', async () => {
  const { html } = await render({ name: 'card', content: 'Body', footer: '<button>OK</button>' });
  assert.ok(html.includes('<footer class="card__footer"><button>OK</button></footer>'));
  const contentPos = html.indexOf('<section');
  const footerPos = html.indexOf('<footer');
  assert.ok(contentPos < footerPos, 'footer should come after content');
});

test('card with contentSize=condensed applies .card__content--condensed', async () => {
  const { html } = await render({ name: 'card', content: 'x', contentSize: 'condensed' });
  assert.ok(html.includes('class="card__content card__content--condensed"'));
});

test('card with contentSize=large applies .card__content--large', async () => {
  const { html } = await render({ name: 'card', content: 'x', contentSize: 'large' });
  assert.ok(html.includes('class="card__content card__content--large"'));
});

test('card content is raw (passes inline HTML)', async () => {
  const { html } = await render({ name: 'card', content: '<h3>Tituľ</h3><p>Text</p>' });
  assert.ok(html.includes('<h3>Tituľ</h3>'));
});

test('card without header/footer renders no extra sections', async () => {
  const { html } = await render({ name: 'card', content: 'x' });
  assert.ok(!html.includes('card__header'));
  assert.ok(!html.includes('card__footer'));
});

test('card rejects invalid variant', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'card', content: 'x', variant: 'fancy' }),
    /Invalid value "fancy" for "variant"/
  );
});

test('card requires content', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'card' }),
    /Missing required parameter "content"/
  );
});
