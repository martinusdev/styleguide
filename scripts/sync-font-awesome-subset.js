#!/usr/bin/env node
/*
 * Regenerates app/views/styleguide/data/font-awesome-subset.yaml from the
 * installed Font Awesome Kit.
 *
 * The Kit itself (curated at https://fontawesome.com/kits) IS the icon
 * subset — whatever is enabled there is what ships in
 * icons/metadata/icons.json inside the installed package. This script just
 * mirrors that file into our YAML so nothing has to be hand-maintained here;
 * re-run it (or let `yarn build` do it via the `prebuild` hook) after every
 * `./npm.sh upgrade @awesome.me/kit-...`.
 *
 * Run manually: ./npm.sh run sync-fa-subset
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'app', 'views', 'styleguide', 'data', 'font-awesome-subset.yaml');

// Order matches the historical hand-curated file; only non-empty sections
// are written. `custom` is the Kit's name for our own uploaded icons
// (martinus, owl, owl-plus, ...) — we keep calling that section `kit` since
// that's the FA prefix (`fak`) and the name used across this repo.
const STYLE_ORDER = ['regular', 'brands', 'solid', 'duotone', 'custom'];
const STYLE_LABEL = { custom: 'kit' };

function findKitMetadataPath() {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const kitName = Object.keys(pkg.dependencies || {}).find((name) => name.startsWith('@awesome.me/kit-'));
  if (!kitName) {
    throw new Error('No "@awesome.me/kit-*" dependency found in package.json.');
  }

  const metadataPath = path.join(ROOT, 'node_modules', kitName, 'icons', 'metadata', 'icons.json');
  if (!fs.existsSync(metadataPath)) {
    throw new Error(`Kit metadata not found at ${metadataPath} — did you run ./npm.sh install?`);
  }
  return { kitName, metadataPath };
}

function groupByStyle(metadata) {
  const byStyle = {};
  Object.keys(metadata).forEach((name) => {
    const styles = metadata[name].styles || [];
    styles.forEach((style) => {
      if (!byStyle[style]) byStyle[style] = [];
      byStyle[style].push(name);
    });
  });
  Object.values(byStyle).forEach((names) => names.sort());
  return byStyle;
}

function toYaml(byStyle) {
  const lines = ['icons:'];
  STYLE_ORDER.forEach((style) => {
    const names = byStyle[style];
    if (!names || !names.length) return;
    lines.push(`  - ${STYLE_LABEL[style] || style}:`);
    names.forEach((name) => lines.push(`    - ${name}`));
  });
  return `${lines.join('\n')}\n`;
}

function diffSummary(before, after) {
  const beforeIcons = before && Array.isArray(before.icons)
    ? new Set(before.icons.flatMap((item) => Object.values(item)[0].map((name) => `${Object.keys(item)[0]}/${name}`)))
    : new Set();
  const afterIcons = after && Array.isArray(after.icons)
    ? new Set(after.icons.flatMap((item) => Object.values(item)[0].map((name) => `${Object.keys(item)[0]}/${name}`)))
    : new Set();

  const added = [...afterIcons].filter((icon) => !beforeIcons.has(icon));
  const removed = [...beforeIcons].filter((icon) => !afterIcons.has(icon));
  return { added, removed };
}

function main() {
  const { kitName, metadataPath } = findKitMetadataPath();
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  const byStyle = groupByStyle(metadata);
  const content = toYaml(byStyle);

  const before = fs.existsSync(OUT) ? yaml.load(fs.readFileSync(OUT, 'utf8')) : null;
  const after = yaml.load(content);
  const { added, removed } = diffSummary(before, after);

  fs.writeFileSync(OUT, content);

  const total = Object.values(byStyle).reduce((sum, names) => sum + names.length, 0);
  console.log(`sync-fa-subset: wrote ${path.relative(ROOT, OUT)} from ${kitName} (${total} icons)`);
  if (added.length) console.log(`  + added: ${added.join(', ')}`);
  if (removed.length) console.log(`  - removed: ${removed.join(', ')}`);
  if (!added.length && !removed.length) console.log('  no changes');
}

try {
  main();
} catch (err) {
  console.error(`sync-fa-subset failed: ${err.message}`);
  process.exit(1);
}
