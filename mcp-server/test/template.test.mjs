import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  escapeHtml,
  isTruthy,
  renderTemplate,
  validateParams,
} from '../src/template.js';

test('escapeHtml escapes the five markup-significant characters', () => {
  assert.equal(escapeHtml('<a href="x">&</a>'), '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
});

test('escapeHtml coerces non-strings', () => {
  assert.equal(escapeHtml(42), '42');
  assert.equal(escapeHtml(true), 'true');
});

test('isTruthy rejects undefined, null, false, and empty string', () => {
  assert.equal(isTruthy(undefined), false);
  assert.equal(isTruthy(null), false);
  assert.equal(isTruthy(false), false);
  assert.equal(isTruthy(''), false);
  assert.equal(isTruthy(0), true);   // 0 is considered truthy here by design
  assert.equal(isTruthy('x'), true);
  assert.equal(isTruthy(true), true);
});

test('renderTemplate interpolates {{var}} with HTML escape', () => {
  assert.equal(
    renderTemplate('<p>{{msg}}</p>', { msg: 'hi <b>you</b>' }),
    '<p>hi &lt;b&gt;you&lt;/b&gt;</p>'
  );
});

test('renderTemplate passes {{{var}}} through without escaping', () => {
  assert.equal(
    renderTemplate('<div>{{{body}}}</div>', { body: '<span>raw</span>' }),
    '<div><span>raw</span></div>'
  );
});

test('renderTemplate keeps {{#var}} block when truthy, strips when falsy', () => {
  const tpl = '<a{{#href}} href="{{href}}"{{/href}}>x</a>';
  assert.equal(renderTemplate(tpl, { href: '/y' }), '<a href="/y">x</a>');
  assert.equal(renderTemplate(tpl, { href: '' }), '<a>x</a>');
  assert.equal(renderTemplate(tpl, {}), '<a>x</a>');
});

test('renderTemplate keeps {{^var}} block when falsy, strips when truthy', () => {
  const tpl = '<p>{{^hidden}}visible{{/hidden}}</p>';
  assert.equal(renderTemplate(tpl, {}), '<p>visible</p>');
  assert.equal(renderTemplate(tpl, { hidden: true }), '<p></p>');
});

test('renderTemplate replaces missing vars with empty string', () => {
  assert.equal(renderTemplate('<p>[{{missing}}]</p>', {}), '<p>[]</p>');
});

test('renderTemplate treats an explicit null value as empty', () => {
  assert.equal(renderTemplate('[{{v}}]', { v: null }), '[]');
  assert.equal(renderTemplate('[{{{v}}}]', { v: null }), '[]');
});

// ---------------------------------------------------------------------------
// validateParams

const schema = {
  params: {
    label: { type: 'string', required: true },
    variant: { type: 'enum', values: ['primary', 'outline'] },
    disabled: { type: 'boolean', default: false },
  },
};

test('validateParams accepts a complete valid payload', () => {
  const out = validateParams(schema, 'buttons', {
    label: 'Ok', variant: 'primary', disabled: true,
  });
  assert.deepEqual(out, { label: 'Ok', variant: 'primary', disabled: true });
});

test('validateParams fills defaults for omitted optional params', () => {
  const out = validateParams(schema, 'buttons', { label: 'Ok' });
  assert.equal(out.disabled, false);
  assert.equal(out.variant, '');
});

test('validateParams throws on missing required param', () => {
  assert.throws(
    () => validateParams(schema, 'buttons', {}),
    /Missing required parameter "label"/
  );
});

test('validateParams throws on invalid enum value', () => {
  assert.throws(
    () => validateParams(schema, 'buttons', { label: 'x', variant: 'neon' }),
    /Invalid value "neon" for "variant"\. Allowed: primary, outline/
  );
});

test('validateParams throws on unknown parameter', () => {
  assert.throws(
    () => validateParams(schema, 'buttons', { label: 'x', extra: 1 }),
    /Unknown parameter\(s\) for component "buttons": extra/
  );
});

test('validateParams coerces boolean string "true" to true', () => {
  const out = validateParams(schema, 'buttons', { label: 'x', disabled: 'true' });
  assert.equal(out.disabled, true);
});

test('validateParams coerces boolean string "false" to false', () => {
  const out = validateParams(schema, 'buttons', { label: 'x', disabled: 'false' });
  assert.equal(out.disabled, false);
});

test('validateParams coerces non-string for string-typed param', () => {
  const out = validateParams(schema, 'buttons', { label: 42 });
  assert.equal(out.label, '42');
});

test('validateParams accepts a number arg against a stringified enum value', () => {
  // Regression: col.sizeM has values ['1'..'12'] but JSON-RPC passes numbers.
  // Loose comparison must match and normalize to the schema's declared type.
  const sizeSchema = {
    params: {
      size: { type: 'enum', values: ['1', '2', '6', '12'] },
    },
  };
  const out = validateParams(sizeSchema, 'col', { size: 6 });
  assert.equal(out.size, '6');
});

test('validateParams accepts a string arg against a numeric enum value', () => {
  const numSchema = {
    params: {
      n: { type: 'enum', values: [1, 2, 3] },
    },
  };
  const out = validateParams(numSchema, 'x', { n: '2' });
  assert.equal(out.n, 2);
});
