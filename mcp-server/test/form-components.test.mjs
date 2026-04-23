/*
 * Integration tests for form components:
 * form-input, form-textarea, form-checkbox, form-radio, form-switch, form-select
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
// form-input

test('form-input: bare required param renders default text input', async () => {
  const p = await getComponent({ name: 'form-input', placeholder: 'Enter text' });
  assert.equal(p.html, '<input class="input" type="text" placeholder="Enter text">');
  assert.deepEqual(p.requires, []);
});

test('form-input: type email changes type attribute', async () => {
  const p = await getComponent({ name: 'form-input', placeholder: 'Email', type: 'email' });
  assert.equal(p.html, '<input class="input" type="email" placeholder="Email">');
});

test('form-input: variant dark adds modifier class', async () => {
  const p = await getComponent({ name: 'form-input', placeholder: 'Search', variant: 'dark' });
  assert.match(p.html, /class="input input--dark"/);
});

test('form-input: size large adds modifier class', async () => {
  const p = await getComponent({ name: 'form-input', placeholder: 'x', size: 'large' });
  assert.match(p.html, /input--large/);
});

test('form-input: size small adds modifier class', async () => {
  const p = await getComponent({ name: 'form-input', placeholder: 'x', size: 'small' });
  assert.match(p.html, /input--small/);
});

test('form-input: state is-error adds state class', async () => {
  const p = await getComponent({ name: 'form-input', placeholder: 'x', state: 'is-error' });
  assert.match(p.html, /is-error/);
});

test('form-input: state is-valid adds state class', async () => {
  const p = await getComponent({ name: 'form-input', placeholder: 'x', state: 'is-valid' });
  assert.match(p.html, /is-valid/);
});

test('form-input: value param renders value attribute', async () => {
  const p = await getComponent({ name: 'form-input', placeholder: 'x', value: 'hello' });
  assert.match(p.html, /value="hello"/);
});

test('form-input: disabled renders disabled attribute', async () => {
  const p = await getComponent({ name: 'form-input', placeholder: 'x', disabled: true });
  assert.match(p.html, / disabled>/);
});

test('form-input: readonly renders readonly attribute', async () => {
  const p = await getComponent({ name: 'form-input', placeholder: 'x', readonly: true });
  assert.match(p.html, / readonly>/);
});

test('form-input: rejects missing placeholder', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'form-input' }),
    /Missing required parameter "placeholder"/
  );
});

test('form-input: rejects invalid type enum', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'form-input', placeholder: 'x', type: 'color' }),
    /Invalid value "color" for "type"/
  );
});

// ---------------------------------------------------------------------------
// form-textarea

test('form-textarea: bare required param renders textarea', async () => {
  const p = await getComponent({ name: 'form-textarea', placeholder: 'Write here' });
  assert.equal(p.html, '<textarea class="input" placeholder="Write here"></textarea>');
});

test('form-textarea: rows adds rows attribute', async () => {
  const p = await getComponent({ name: 'form-textarea', placeholder: 'x', rows: '5' });
  assert.match(p.html, /rows="5"/);
});

test('form-textarea: size large adds modifier', async () => {
  const p = await getComponent({ name: 'form-textarea', placeholder: 'x', size: 'large' });
  assert.match(p.html, /input--large/);
});

test('form-textarea: state is-error adds state class', async () => {
  const p = await getComponent({ name: 'form-textarea', placeholder: 'x', state: 'is-error' });
  assert.match(p.html, /is-error/);
});

test('form-textarea: value is rendered as content', async () => {
  const p = await getComponent({ name: 'form-textarea', placeholder: 'x', value: 'draft' });
  assert.match(p.html, />draft<\/textarea>/);
});

test('form-textarea: disabled renders disabled attribute', async () => {
  const p = await getComponent({ name: 'form-textarea', placeholder: 'x', disabled: true });
  assert.match(p.html, / disabled/);
});

test('form-textarea: rejects missing placeholder', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'form-textarea' }),
    /Missing required parameter "placeholder"/
  );
});

// ---------------------------------------------------------------------------
// form-checkbox

test('form-checkbox: required params render minimal checkbox', async () => {
  const p = await getComponent({ name: 'form-checkbox', id: 'cb1', label: 'Accept' });
  assert.equal(
    p.html,
    '<div class="form-check"><input class="form-check-input" type="checkbox" id="cb1"><label class="form-check-label" for="cb1">Accept</label></div>'
  );
});

test('form-checkbox: field_name adds name attribute', async () => {
  const p = await getComponent({ name: 'form-checkbox', id: 'cb1', label: 'x', field_name: 'terms' });
  assert.match(p.html, /name="terms"/);
});

test('form-checkbox: checked adds checked attribute', async () => {
  const p = await getComponent({ name: 'form-checkbox', id: 'cb1', label: 'x', checked: true });
  assert.match(p.html, / checked/);
});

test('form-checkbox: disabled adds disabled attribute', async () => {
  const p = await getComponent({ name: 'form-checkbox', id: 'cb1', label: 'x', disabled: true });
  assert.match(p.html, / disabled/);
});

test('form-checkbox: state is-invalid adds state class to wrapper', async () => {
  const p = await getComponent({ name: 'form-checkbox', id: 'cb1', label: 'x', state: 'is-invalid' });
  assert.match(p.html, /form-check is-invalid/);
});

test('form-checkbox: inline adds form-check--inline', async () => {
  const p = await getComponent({ name: 'form-checkbox', id: 'cb1', label: 'x', inline: true });
  assert.match(p.html, /form-check form-check--inline/);
});

test('form-checkbox: reverse adds form-check--reverse', async () => {
  const p = await getComponent({ name: 'form-checkbox', id: 'cb1', label: 'x', reverse: true });
  assert.match(p.html, /form-check--reverse/);
});

test('form-checkbox: label is rendered as raw HTML', async () => {
  const p = await getComponent({ name: 'form-checkbox', id: 'cb1', label: '<strong>Bold</strong>' });
  assert.match(p.html, /<strong>Bold<\/strong>/);
});

test('form-checkbox: rejects missing id', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'form-checkbox', label: 'x' }),
    /Missing required parameter "id"/
  );
});

test('form-checkbox: rejects missing label', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'form-checkbox', id: 'cb1' }),
    /Missing required parameter "label"/
  );
});

// ---------------------------------------------------------------------------
// form-radio

test('form-radio: required params render minimal radio button', async () => {
  const p = await getComponent({ name: 'form-radio', id: 'r1', label: 'Option A' });
  assert.equal(
    p.html,
    '<div class="form-check"><input class="form-check-input" type="radio" id="r1"><label class="form-check-label" for="r1">Option A</label></div>'
  );
});

test('form-radio: field_name groups radio buttons', async () => {
  const p = await getComponent({ name: 'form-radio', id: 'r1', label: 'x', field_name: 'choice' });
  assert.match(p.html, /name="choice"/);
});

test('form-radio: checked adds checked attribute', async () => {
  const p = await getComponent({ name: 'form-radio', id: 'r1', label: 'x', checked: true });
  assert.match(p.html, / checked/);
});

test('form-radio: disabled adds disabled attribute', async () => {
  const p = await getComponent({ name: 'form-radio', id: 'r1', label: 'x', disabled: true });
  assert.match(p.html, / disabled/);
});

test('form-radio: inline adds form-check--inline', async () => {
  const p = await getComponent({ name: 'form-radio', id: 'r1', label: 'x', inline: true });
  assert.match(p.html, /form-check--inline/);
});

test('form-radio: rejects missing id', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'form-radio', label: 'x' }),
    /Missing required parameter "id"/
  );
});

// ---------------------------------------------------------------------------
// form-switch

test('form-switch: required params render switch', async () => {
  const p = await getComponent({ name: 'form-switch', id: 'sw1', label: 'Enable' });
  assert.equal(
    p.html,
    '<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="sw1"><label class="form-check-label" for="sw1">Enable</label></div>'
  );
});

test('form-switch: checked adds checked attribute', async () => {
  const p = await getComponent({ name: 'form-switch', id: 'sw1', label: 'On', checked: true });
  assert.match(p.html, / checked/);
});

test('form-switch: disabled adds disabled attribute', async () => {
  const p = await getComponent({ name: 'form-switch', id: 'sw1', label: 'On', disabled: true });
  assert.match(p.html, / disabled/);
});

test('form-switch: field_name adds name attribute', async () => {
  const p = await getComponent({ name: 'form-switch', id: 'sw1', label: 'On', field_name: 'toggle' });
  assert.match(p.html, /name="toggle"/);
});

test('form-switch: rejects missing id', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'form-switch', label: 'On' }),
    /Missing required parameter "id"/
  );
});

test('form-switch: rejects missing label', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'form-switch', id: 'sw1' }),
    /Missing required parameter "label"/
  );
});

// ---------------------------------------------------------------------------
// form-select

test('form-select: required options renders bare select', async () => {
  const p = await getComponent({
    name: 'form-select',
    options: '<option value="a">A</option>',
  });
  assert.equal(
    p.html,
    '<select class="js-select"><option value="a">A</option></select>'
  );
});

test('form-select: variant ghost adds select--ghost', async () => {
  const p = await getComponent({
    name: 'form-select',
    options: '<option>x</option>',
    variant: 'ghost',
  });
  assert.match(p.html, /js-select select--ghost/);
});

test('form-select: size large adds select--large', async () => {
  const p = await getComponent({
    name: 'form-select',
    options: '<option>x</option>',
    size: 'large',
  });
  assert.match(p.html, /select--large/);
});

test('form-select: size small adds select--small', async () => {
  const p = await getComponent({
    name: 'form-select',
    options: '<option>x</option>',
    size: 'small',
  });
  assert.match(p.html, /select--small/);
});

test('form-select: inline adds select--inline', async () => {
  const p = await getComponent({
    name: 'form-select',
    options: '<option>x</option>',
    inline: true,
  });
  assert.match(p.html, /select--inline/);
});

test('form-select: state is-error adds state class', async () => {
  const p = await getComponent({
    name: 'form-select',
    options: '<option>x</option>',
    state: 'is-error',
  });
  assert.match(p.html, /is-error/);
});

test('form-select: disabled adds disabled attribute', async () => {
  const p = await getComponent({
    name: 'form-select',
    options: '<option>x</option>',
    disabled: true,
  });
  assert.match(p.html, / disabled>/);
});

test('form-select: options are injected as raw HTML', async () => {
  const p = await getComponent({
    name: 'form-select',
    options: '<option value="sk">Slovakia</option><option value="cz">Czechia</option>',
  });
  assert.match(p.html, /Slovakia/);
  assert.match(p.html, /Czechia/);
});

test('form-select: rejects missing options', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'form-select' }),
    /Missing required parameter "options"/
  );
});

test('form-select: rejects invalid variant', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'form-select', options: '<option>x</option>', variant: 'dark' }),
    /Invalid value "dark" for "variant"/
  );
});
