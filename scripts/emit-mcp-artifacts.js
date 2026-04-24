#!/usr/bin/env node
/*
 * Emits build-time artifacts consumed by the MCP server.
 *
 * Runs as a standalone Node script — no Gulp — invoked from the
 * `postbuild` npm script so it ships with every production build.
 *
 * Current outputs:
 *   dist/mcp-components.json  — parametric component schema, translated
 *                               from app/mcp-components.yaml.
 *   dist/icons.json           — FA Pro icon subset, translated from
 *                               app/views/styleguide/data/font-awesome-subset.yaml.
 *
 * Future artifacts (tokens.json, class-index.json, mcp-manifest.json)
 * will be added here as separate steps.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function emitComponents() {
  const src = path.join(ROOT, 'app', 'mcp-components.yaml');
  const out = path.join(DIST, 'mcp-components.json');

  if (!fs.existsSync(src)) {
    throw new Error(`Missing component schema: ${src}`);
  }
  const parsed = yaml.load(fs.readFileSync(src, 'utf8'));

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(parsed, null, 2)}\n`);

  const count = parsed && parsed.components ? Object.keys(parsed.components).length : 0;
  console.log(`mcp-emit: wrote ${path.relative(ROOT, out)} (${count} components)`);
}

const FA_PREFIX = {
  regular: 'far',
  brands: 'fab',
  solid: 'fas',
  duotone: 'fad',
  kit: 'fak',
};

function emitIcons() {
  const src = path.join(ROOT, 'app', 'views', 'styleguide', 'data', 'font-awesome-subset.yaml');
  const out = path.join(DIST, 'icons.json');

  if (!fs.existsSync(src)) {
    throw new Error(`Missing FA subset YAML: ${src}`);
  }

  const parsed = yaml.load(fs.readFileSync(src, 'utf8'));
  if (!parsed || !Array.isArray(parsed.icons)) {
    throw new Error('font-awesome-subset.yaml: expected a top-level `icons` array.');
  }

  const icons = [];
  for (const item of parsed.icons) {
    const entries = Object.entries(item);
    if (!entries.length) continue;
    const [style, names] = entries[0];
    if (!Array.isArray(names)) continue;
    const prefix = FA_PREFIX[style] || `fa-${style}`;
    for (const name of names) {
      icons.push({ name, style, prefix, class: `${prefix} fa-${name}` });
    }
  }

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(icons, null, 2)}\n`);
  console.log(`mcp-emit: wrote ${path.relative(ROOT, out)} (${icons.length} icons)`);
}

function emitUtilities() {
  const src = path.join(ROOT, 'app', 'mcp-utilities.yaml');
  const out = path.join(DIST, 'utilities.json');

  if (!fs.existsSync(src)) {
    throw new Error(`Missing utilities YAML: ${src}`);
  }

  const parsed = yaml.load(fs.readFileSync(src, 'utf8'));
  if (!parsed || !parsed.groups) {
    throw new Error('mcp-utilities.yaml: expected a top-level `groups` array.');
  }

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify(parsed, null, 2)}\n`);
  console.log(`mcp-emit: wrote ${path.relative(ROOT, out)} (${parsed.groups.length} groups)`);
}

function main() {
  emitComponents();
  emitIcons();
  emitUtilities();
}

try {
  main();
} catch (err) {
  console.error(`mcp-emit failed: ${err.message}`);
  process.exit(1);
}
