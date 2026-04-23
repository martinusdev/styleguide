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
 *
 * Future artifacts (icons.json, tokens.json, class-index.json,
 * mcp-manifest.json) will be added here as separate steps.
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

function main() {
  emitComponents();
}

try {
  main();
} catch (err) {
  console.error(`mcp-emit failed: ${err.message}`);
  process.exit(1);
}
