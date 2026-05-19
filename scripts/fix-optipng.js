#!/usr/bin/env node
// Postinstall fix for optipng-bin on ARM64 (Apple Silicon + Alpine Docker).
// The npm package optipng-bin ships an x86 binary and fails to compile from
// source on aarch64-musl. The Docker image already has system optipng via apk.
// This script wires the system binary into the expected vendor path so
// imagemin-optipng can find it without errors.

'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function systemOptipngPath() {
  try {
    return execSync('which optipng 2>/dev/null', { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function run() {
  const systemBin = systemOptipngPath();
  if (!systemBin) {
    return; // Not in Docker or system optipng not present – skip silently.
  }

  const pkgDir = path.join(root, 'node_modules', 'optipng-bin');
  const vendorDir = path.join(pkgDir, 'vendor');
  const vendorBin = path.join(vendorDir, 'optipng');

  if (fs.existsSync(vendorBin)) {
    return; // Already set up.
  }

  fs.mkdirSync(vendorDir, { recursive: true });
  fs.copyFileSync(systemBin, vendorBin);
  fs.chmodSync(vendorBin, 0o755);

  fs.writeFileSync(
    path.join(pkgDir, 'index.js'),
    `'use strict';\nconst path = require('path');\nmodule.exports = path.join(__dirname, 'vendor', 'optipng');\n`
  );

  fs.writeFileSync(
    path.join(pkgDir, 'package.json'),
    JSON.stringify({ name: 'optipng-bin', version: '7.0.1', main: 'index.js' }, null, 2) + '\n'
  );

  console.log('optipng-bin: linked system optipng binary (' + systemBin + ')');
}

run();
