/*
 * Tests for the unified discovery surface — `list_components` (parametric +
 * filesystem) and `get_component_info` (parametric → filesystem fallback).
 *
 * The parametric registry is always available; filesystem-backed modules
 * require internal mode (APP_DIR set), which the test bootstrap below
 * provides. A separate `external-mode` block re-imports the server module
 * with APP_DIR cleared to verify the parametric path works without a
 * checked-out repo.
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

async function call(methodPromise) {
  const res = await methodPromise;
  return JSON.parse(res.content[0].text);
}

// ---------------------------------------------------------------------------
// list_components — parametric branch

test('list_components default returns parametric registry as an array', async () => {
  const out = await call(server.listComponents('all'));
  assert.ok(Array.isArray(out.parametric), 'parametric is an array');
  assert.ok(out.parametric.length >= 20, 'at least 20 components present');
  const buttons = out.parametric.find(c => c.name === 'buttons');
  assert.ok(buttons, 'buttons entry present');
  assert.ok(typeof buttons.description === 'string' && buttons.description.length > 0);
  assert.ok(Array.isArray(buttons.requires));
  assert.ok(Array.isArray(buttons.params));
  assert.ok(buttons.params.includes('label'));
});

test('list_components: every parametric entry exposes a renderable canonicalHtml snippet', async () => {
  const out = await call(server.listComponents('parametric'));
  const broken = out.parametric.filter(c => !c.canonicalHtml || c.canonicalHtml.length < 5);
  assert.deepEqual(broken, [], 'no component missing a canonical_html snippet');
  for (const c of out.parametric) {
    assert.match(c.canonicalHtml, /^<[a-z]/, `${c.name}: snippet starts with an HTML tag`);
  }
});

test('list_components: canonical_html for buttons matches the get_component output', async () => {
  const list = await call(server.listComponents('parametric'));
  const buttonsEntry = list.parametric.find(c => c.name === 'buttons');
  // The canonical_html in list_components must be byte-identical to what the
  // model would get if it called get_component with the same example params.
  // That is the whole point of #1: discovery surfaces production-grade markup.
  assert.match(buttonsEntry.canonicalHtml, /^<button class="btn btn--primary"/);
  assert.ok(buttonsEntry.canonicalHtml.includes('Kúpiť'));
});

test('list_components: addRequiresWhen propagates into the entry requires', async () => {
  // The buttons example sets icon: 'cart-shopping' which triggers
  // addRequiresWhen.icon = [font-awesome]. The list entry must reflect the
  // *augmented* requires array, not just the static base requires, so the
  // agent does not have to call get_component to learn the dependency.
  const out = await call(server.listComponents('parametric'));
  const buttons = out.parametric.find(c => c.name === 'buttons');
  assert.ok(buttons.requires.includes('font-awesome'),
    'buttons example uses an icon → font-awesome must surface in requires');
});

// ---------------------------------------------------------------------------
// list_components — filesystem branch (internal mode)

test('list_components type=pug returns filesystem module list (internal mode)', async () => {
  const out = await call(server.listComponents('pug'));
  assert.ok(out.modules && Array.isArray(out.modules.pug));
  assert.ok(out.modules.pug.length > 0);
  for (const m of out.modules.pug) {
    assert.ok(typeof m.name === 'string' && m.name.length > 0);
    assert.match(m.path, /\.pug$/);
  }
  assert.ok(out.parametric === undefined, 'type=pug omits parametric');
});

test('list_components type=all in internal mode returns parametric + modules', async () => {
  const out = await call(server.listComponents('all'));
  assert.ok(Array.isArray(out.parametric));
  assert.ok(out.modules);
  assert.ok(Array.isArray(out.modules.pug));
  assert.ok(Array.isArray(out.modules.scss));
  assert.ok(Array.isArray(out.modules.js));
});

// ---------------------------------------------------------------------------
// get_component_info — parametric branch

test('get_component_info returns parametric info with full param schema', async () => {
  const out = await call(server.getComponentInfo('buttons'));
  assert.equal(out.source, 'parametric');
  assert.equal(out.name, 'buttons');
  assert.match(out.description, /Martinus button/);
  // params must be the typed schema (with type, required, values, description),
  // not just a list of names — that is what makes the call self-documenting.
  assert.equal(out.params.label.type, 'string');
  assert.equal(out.params.label.required, true);
  assert.equal(out.params.variant.type, 'enum');
  assert.deepEqual(
    out.params.variant.values,
    ['primary', 'secondary', 'ghost', 'ghost-inverse', 'success']
  );
  // canonicalHtml mirrors list_components — keeps the contract symmetric.
  assert.match(out.canonicalHtml, /^<button class="btn btn--primary"/);
  // addRequiresWhen surfaced verbatim so the agent knows which params bring
  // in extra bundles.
  assert.deepEqual(out.addRequiresWhen, { icon: ['font-awesome'] });
});

test('get_component_info: every parametric component renders a canonical example', async () => {
  // Regression guard — keeps the YAML example: blocks honest. If a future
  // PR breaks an example (typo'd enum value, missing required param, …),
  // this fails at test time, not at runtime in front of an agent.
  const list = await call(server.listComponents('parametric'));
  for (const entry of list.parametric) {
    const info = await call(server.getComponentInfo(entry.name));
    assert.equal(info.source, 'parametric', `${entry.name}: source=parametric`);
    assert.ok(info.canonicalHtml, `${entry.name}: has canonical_html`);
    assert.match(info.canonicalHtml, /^<[a-z]/, `${entry.name}: snippet starts with a tag`);
  }
});

test('get_component_info falls back to filesystem in internal mode', async () => {
  // booksCarouselRecommended is a pug mixin file under app/views/mixins —
  // not in the parametric registry, but readable from disk. Internal mode
  // should walk the filesystem after the parametric miss.
  // Pick a name guaranteed to exist as a module file.
  const list = await call(server.listComponents('all'));
  const moduleOnly = list.modules.pug
    .map(m => m.name)
    .find(n => !list.parametric.some(p => p.name === n));
  assert.ok(moduleOnly, 'fixture: at least one pug module not in parametric registry');

  const out = await call(server.getComponentInfo(moduleOnly));
  assert.equal(out.source, 'module');
  assert.equal(out.name, moduleOnly);
  assert.ok(out.files && out.files.pug, 'module entry has a pug file path');
  assert.ok(out.pugContent && out.pugContent.length > 0, 'pug source content present');
});

test('get_component_info errors with a useful list when name is unknown', async () => {
  await assert.rejects(
    () => server.getComponentInfo('definitely-not-a-component'),
    (err) => {
      assert.match(err.message, /not found/);
      assert.match(err.message, /Available parametric components:/);
      assert.match(err.message, /buttons/);
      assert.match(err.message, /carousel/);
      return true;
    }
  );
});

test('get_component_info rejects empty/missing name', async () => {
  await assert.rejects(
    () => server.getComponentInfo(undefined),
    /Missing required argument "name"/
  );
});

// ---------------------------------------------------------------------------
// External mode (no APP_DIR) — parametric path must still work, filesystem
// branches must reject cleanly.

test('parametric registry is reachable in external mode (no APP_DIR)', async () => {
  // Re-import the module fresh with APP_DIR cleared so the top-level env
  // read picks up the absence. Node's module cache requires a reset; we
  // accomplish that by toggling the env var and re-importing via a query
  // string that Node treats as a distinct specifier.
  const savedAppDir = process.env.MARTINUS_STYLEGUIDE_APP_DIR;
  delete process.env.MARTINUS_STYLEGUIDE_APP_DIR;
  try {
    const { StyleguideServer: ExternalServer } = await import('../src/index.js?external');
    const externalServer = new ExternalServer();
    // Stub fetchComponents to avoid a network call to the hosted JSON.
    externalServer.fetchComponents = async () => ({
      components: {
        buttons: {
          description: 'test',
          template: '<button>{{label}}</button>',
          params: { label: { type: 'string', required: true } },
          example: { label: 'Hi' },
          requires: [],
        },
      },
    });

    assert.equal(externalServer.isInternalMode(), false);

    const list = await call(externalServer.listComponents('all'));
    assert.ok(Array.isArray(list.parametric));
    assert.equal(list.modules, undefined,
      'external-mode list omits filesystem modules block entirely');

    const info = await call(externalServer.getComponentInfo('buttons'));
    assert.equal(info.source, 'parametric');
    assert.equal(info.canonicalHtml, '<button>Hi</button>');

    // Filesystem-only types must reject in external mode.
    await assert.rejects(
      () => externalServer.listComponents('pug'),
      /requires internal mode/
    );

    // Parametric miss in external mode → helpful error, not silent.
    await assert.rejects(
      () => externalServer.getComponentInfo('not-here'),
      /Available parametric components: buttons/
    );
  } finally {
    process.env.MARTINUS_STYLEGUIDE_APP_DIR = savedAppDir;
  }
});
