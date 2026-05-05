#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { glob } from 'glob';
import { readFile } from 'fs/promises';
import { join, relative, extname } from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import yaml from 'js-yaml';

import {
  isTruthy,
  renderTemplate,
  validateParams,
} from './template.js';

// External mode (default): APP_DIR unset → filesystem tools are hidden and the
// server serves only hosted-artifact tools (suitable for npx distribution).
// Internal mode: APP_DIR points at a local styleguide checkout (Docker mount
// or a contributor's working copy) and filesystem tools become available.
const APP_DIR = process.env.MARTINUS_STYLEGUIDE_APP_DIR || null;

const ASSETS_BASE_URL = (process.env.MARTINUS_STYLEGUIDE_ASSETS_URL
  || 'https://mrtns.sk/assets/martinus/lb/').replace(/\/?$/, '/');
const MANIFEST_URL = `${ASSETS_BASE_URL}rev-manifest.json`;
const COMPONENTS_URL = `${ASSETS_BASE_URL}mcp-components.json`;
const ICONS_URL = `${ASSETS_BASE_URL}icons.json`;
const UTILITIES_URL = `${ASSETS_BASE_URL}utilities.json`;
const MANIFEST_CACHE_TTL_MS = 5 * 60 * 1000;
const COMPONENTS_CACHE_TTL_MS = 5 * 60 * 1000;
const ICONS_CACHE_TTL_MS = 5 * 60 * 1000;
const UTILITIES_CACHE_TTL_MS = 5 * 60 * 1000;

const FA_STYLE_PREFIX = {
  regular: 'far',
  brands: 'fab',
  solid: 'fas',
  duotone: 'fad',
  kit: 'fak',
};
const FA_VALID_STYLES = Object.keys(FA_STYLE_PREFIX);

// Surfaced in the get_setup / get_starter_template responses so an agent picks
// up Martinus utility-class conventions before generating any markup. The list
// is intentionally short — call get_utilities for the full reference.
const UTILITY_HINT = {
  closedSystem: 'Martinus is a CLOSED design system. Every utility class, icon, component variant, and color is curated. Do NOT assume defaults from Bootstrap, Tailwind, or full Font Awesome Pro — even common things like fa-truck, fa-percent, col-md-6, mb-3 may not exist. ALWAYS verify via list_components, list_icons, get_utilities, get_component_info BEFORE generating markup.',
  notice: 'Martinus utility classes follow custom (non-Bootstrap) naming. Always prefer Martinus utilities; do not invent Bootstrap classes (e.g. col-md-6, mb-3, text-muted) — they will not match.',
  breakpoints: 'Suffix is -s / -m / -l / -xl (NOT -sm / -md / -lg).',
  grid: 'row > col col--{1..12} col--{s|m|l|xl}-{1..12}, e.g. col col--12 col--m-6 col--l-4. Do not use col-md-6.',
  spacing: 'Sizes: none / tiny / small / medium / large. m-/mt-/mr-/mb-/ml-/mx-/my- and p-/pt-/.../py- with breakpoint variants (e.g. mb-small, mt-m-large).',
  color: 'text-color-{grey|primary|success|warning|danger|black|white|...} for foreground; bg-{primary|secondary|success|...} for background; CSS design tokens via --ms-color-* / --ms-fade-color.',
  text: 'text-{small|medium|large|big|huge}, text-{left|center|right}, text-bold, text-uppercase, text-ellipsis.',
  display_flex: 'd-{none|block|flex|inline-block} (with -s/-m/-l/-xl variants), flex-{row|column|wrap|nowrap}, justify-content-{start|center|end|between|around}, align-items-{start|center|end|stretch}.',
  discover: 'Call get_utilities (optionally with category in [flex, spacing, display, text, visibility, sizing, visual, layout, colors]) for the complete reference.',
};

// Damerau-Levenshtein-ish distance limited to insertions/deletions/substitutions.
// Adequate for short FA-icon-name typos (truck → tractor, percent → percentage).
function _editDistance(a, b) {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    const curr = new Array(n + 1);
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[n];
}

// Returns up to `limit` icon names from `pool` whose name is closest to
// `query`. Prefers (in order): exact substring match, then short edit
// distance. Used to turn "Icon not found" errors into actionable hints
// — see getIcon().
function _suggestSimilarIcons(query, pool, limit = 5) {
  const q = query.toLowerCase();
  const scored = pool.map((entry) => {
    const name = entry.name.toLowerCase();
    let score;
    if (name === q) score = -1;
    else if (name.includes(q) || q.includes(name)) score = 0;
    else score = _editDistance(q, name);
    return { entry, score };
  });
  scored.sort((a, b) => a.score - b.score || a.entry.name.localeCompare(b.entry.name));
  // Keep only entries within a useful distance from the query — drops the
  // long tail of unrelated names that would dilute the suggestion list.
  const cutoff = Math.max(2, Math.ceil(q.length * 0.5));
  return scored
    .filter(({ score }) => score <= cutoff)
    .slice(0, limit)
    .map(({ entry }) => entry);
}

/**
 * MCP Server for Martinus Styleguide
 * Provides tools to query components, classes, mixins, and assets
 */
export class StyleguideServer {
  constructor() {
    this.server = new Server(
      {
        name: 'martinus-styleguide',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.componentIndex = null;
    this.scssIndex = null;
    this.manifestCache = null;
    this.componentsCache = null;
    this.iconsCache = null;
    this.utilitiesCache = null;

    this.setupHandlers();
    this.setupErrorHandling();
  }

  isInternalMode() {
    return Boolean(APP_DIR);
  }

  requireInternalMode(toolName) {
    if (!this.isInternalMode()) {
      throw new Error(
        `Tool "${toolName}" requires internal mode. Set the `
        + 'MARTINUS_STYLEGUIDE_APP_DIR environment variable to a styleguide '
        + 'checkout path to enable filesystem-backed tools.'
      );
    }
  }

  async fetchManifest() {
    const now = Date.now();
    if (this.manifestCache && (now - this.manifestCache.fetchedAt) < MANIFEST_CACHE_TTL_MS) {
      return this.manifestCache.data;
    }
    const res = await fetch(MANIFEST_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch rev-manifest.json (${res.status} ${res.statusText}) from ${MANIFEST_URL}`);
    }
    const data = await res.json();
    this.manifestCache = { data, fetchedAt: now };
    return data;
  }

  resolveAsset(manifest, logicalPath) {
    const hashed = manifest[logicalPath];
    if (!hashed) {
      throw new Error(`Asset "${logicalPath}" not present in rev-manifest.json. Available keys: ${Object.keys(manifest).sort().join(', ')}`);
    }
    // Query-string cache-busting instead of hashed filenames: consumers embed
    // these URLs in their HTML, and hashed filenames stop resolving after the
    // next styleguide rebuild. Stable path + ?v=<hash> keeps old embeds alive
    // while still busting browser cache on new hashes. Hosting serves both.
    const hashMatch = hashed.match(/\.([a-f0-9]+)\.[^.]+$/);
    if (!hashMatch) {
      return `${ASSETS_BASE_URL}${logicalPath}`;
    }
    return `${ASSETS_BASE_URL}${logicalPath}?v=${hashMatch[1]}`;
  }

  async buildSetup(language) {
    if (!['sk', 'cz'].includes(language)) {
      throw new Error(`Invalid language "${language}". Use "sk" or "cz".`);
    }

    // Surface the curated component / icon catalogues in setup so an agent
    // sees the size and shape of the closed system upfront — no need to call
    // list_components or list_icons just to learn that those things exist.
    // Both fetches are cached, so cost is one network hit per 5 min worst case.
    const [components, icons] = await Promise.all([
      this.fetchComponents().catch(() => null),
      this.fetchIcons().catch(() => null),
    ]);
    const availableComponents = components && components.components
      ? Object.keys(components.components).sort()
      : [];
    const iconCount = Array.isArray(icons) ? icons.length : null;

    const manifest = await this.fetchManifest();
    const tabacCssUrl = this.resolveAsset(manifest, 'fonts/Tabac-Sans/style.css');
    const mainCssUrl = this.resolveAsset(manifest, 'styles/main.css');
    const vendorJsUrl = this.resolveAsset(manifest, 'scripts/vendor.js');
    const mainJsUrl = this.resolveAsset(manifest, 'scripts/main.js');
    const faJsUrl = this.resolveAsset(manifest, 'scripts/font-awesome.js');

    const head = [
      `<link rel="stylesheet" href="${tabacCssUrl}">`,
      `<link rel="stylesheet" href="${mainCssUrl}">`,
    ].join('\n');

    const bodyEnd = [
      `<script>window.myApp = window.myApp || {}; window.myApp.selectLanguage = ${JSON.stringify(language)};</script>`,
      `<script src="${vendorJsUrl}"></script>`,
      `<script src="${mainJsUrl}"></script>`,
      `<script src="${faJsUrl}"></script>`,
    ].join('\n');

    return {
      htmlClasses: ['fonts-loaded'],
      head,
      bodyEnd,
      language,
      assetsBaseUrl: ASSETS_BASE_URL,
      bundleVersions: {
        'styles/main.css': manifest['styles/main.css'],
        'scripts/main.js': manifest['scripts/main.js'],
        'scripts/vendor.js': manifest['scripts/vendor.js'],
        'scripts/font-awesome.js': manifest['scripts/font-awesome.js'],
        'fonts/Tabac-Sans/style.css': manifest['fonts/Tabac-Sans/style.css'],
      },
      utilityHint: UTILITY_HINT,
      availableComponents,
      iconSubset: iconCount
        ? `${iconCount} curated Font Awesome icons (NOT full Font Awesome Pro — common icons like fa-truck, fa-percent, fa-cart may NOT be present). Call list_icons to browse, get_icon to render. Wrong names yield error messages with auto-suggested closest matches.`
        : null,
    };
  }

  async getSetup(args) {
    const setup = await this.buildSetup(args.language ?? 'sk');
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(setup, null, 2),
        },
      ],
    };
  }

  async getStarterTemplate(args) {
    const language = args.language ?? 'sk';
    const title = args.title ?? 'Martinus';
    const setup = await this.buildSetup(language);

    const htmlLang = language === 'cz' ? 'cs' : 'sk';
    const htmlClassAttr = setup.htmlClasses.length
      ? ` class="${setup.htmlClasses.join(' ')}"`
      : '';
    const escapedTitle = title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // No theme-init script: external consumers don't share Martinus's
    // localStorage / cookie state, and a `prefers-color-scheme` fallback
    // would surprise-flip the page into dark mode. CSS only styles
    // `[data-theme='dark']` overlays — omitting the attribute renders in
    // light mode, which is the intended default for MCP-hosted pages.

    const html = [
      '<!doctype html>',
      `<html lang="${htmlLang}"${htmlClassAttr}>`,
      '<head>',
      '  <meta charset="utf-8">',
      '  <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      `  <title>${escapedTitle}</title>`,
      setup.head.split('\n').map((l) => `  ${l}`).join('\n'),
      '</head>',
      '<body>',
      '  <!-- Page content goes here. Use get_component to fetch compiled HTML fragments. -->',
      setup.bodyEnd.split('\n').map((l) => `  ${l}`).join('\n'),
      '</body>',
      '</html>',
      '',
    ].join('\n');

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            html,
            language,
            title,
            assetsBaseUrl: ASSETS_BASE_URL,
            bundleVersions: setup.bundleVersions,
            utilityHint: setup.utilityHint,
            availableComponents: setup.availableComponents,
            iconSubset: setup.iconSubset,
          }, null, 2),
        },
      ],
    };
  }

  async fetchComponents() {
    const now = Date.now();
    if (this.componentsCache && (now - this.componentsCache.fetchedAt) < COMPONENTS_CACHE_TTL_MS) {
      return this.componentsCache.data;
    }

    // Internal mode prefers the checked-in YAML source — no network hop, no
    // waiting for a deploy to see local schema edits.
    let data;
    if (this.isInternalMode()) {
      const schemaPath = join(APP_DIR, 'mcp-components.yaml');
      try {
        const text = await readFile(schemaPath, 'utf-8');
        data = yaml.load(text);
      } catch (err) {
        throw new Error(`Failed to read component schema from ${schemaPath}: ${err.message}`);
      }
    } else {
      const res = await fetch(COMPONENTS_URL);
      if (!res.ok) {
        throw new Error(`Failed to fetch mcp-components.json (${res.status} ${res.statusText}) from ${COMPONENTS_URL}`);
      }
      data = await res.json();
    }

    if (!data || typeof data !== 'object' || !data.components) {
      throw new Error('Component schema is empty or malformed: expected a top-level `components` map.');
    }
    this.componentsCache = { data, fetchedAt: now };
    return data;
  }

  _parseIconsYaml(parsed) {
    if (!parsed || !Array.isArray(parsed.icons)) {
      throw new Error('font-awesome-subset.yaml: expected a top-level `icons` array.');
    }
    const icons = [];
    for (const item of parsed.icons) {
      const entries = Object.entries(item);
      if (!entries.length) continue;
      const [style, names] = entries[0];
      if (!Array.isArray(names)) continue;
      const prefix = FA_STYLE_PREFIX[style] || `fa-${style}`;
      for (const name of names) {
        icons.push({ name, style, prefix, class: `${prefix} fa-${name}` });
      }
    }
    return icons;
  }

  async fetchIcons() {
    const now = Date.now();
    if (this.iconsCache && (now - this.iconsCache.fetchedAt) < ICONS_CACHE_TTL_MS) {
      return this.iconsCache.data;
    }

    let data;
    if (this.isInternalMode()) {
      const yamlPath = join(
        APP_DIR, 'views', 'styleguide', 'data', 'font-awesome-subset.yaml'
      );
      try {
        const text = await readFile(yamlPath, 'utf-8');
        data = this._parseIconsYaml(yaml.load(text));
      } catch (err) {
        throw new Error(`Failed to read FA subset YAML from ${yamlPath}: ${err.message}`);
      }
    } else {
      const res = await fetch(ICONS_URL);
      if (!res.ok) {
        throw new Error(
          `Failed to fetch icons.json (${res.status} ${res.statusText}) from ${ICONS_URL}`
        );
      }
      data = await res.json();
    }

    this.iconsCache = { data, fetchedAt: now };
    return data;
  }

  async listIcons(style) {
    if (style && !FA_VALID_STYLES.includes(style)) {
      throw new Error(
        `Invalid style "${style}". Valid styles: ${FA_VALID_STYLES.join(', ')}.`
      );
    }

    const all = await this.fetchIcons();
    const icons = style ? all.filter((i) => i.style === style) : all;

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ total: icons.length, style: style || 'all', icons }, null, 2),
        },
      ],
    };
  }

  async getIcon(args) {
    const { name, style = 'regular' } = args;
    if (!name) throw new Error('Missing required argument "name".');

    if (!FA_VALID_STYLES.includes(style)) {
      throw new Error(
        `Invalid style "${style}". Valid styles: ${FA_VALID_STYLES.join(', ')}.`
      );
    }

    const all = await this.fetchIcons();
    const icon = all.find((i) => i.name === name && i.style === style);

    if (!icon) {
      const otherStyles = all.filter((i) => i.name === name).map((i) => i.style);
      if (otherStyles.length) {
        throw new Error(
          `Icon "${name}" not found in style "${style}". `
          + `Available in: ${otherStyles.join(', ')}.`
        );
      }
      // Curated subset miss → auto-suggest. The agent's mental model is
      // usually "this is full FA Pro," so a bare "use list_icons" round-trip
      // wastes a call. Surface 3-5 closest names directly in the error.
      const sameStylePool = all.filter((i) => i.style === style);
      const suggestions = _suggestSimilarIcons(name, sameStylePool, 5);
      const hintParts = [
        `Icon "${name}" not found in the Martinus FA subset (curated, NOT full Font Awesome Pro).`,
      ];
      if (suggestions.length) {
        hintParts.push(`Closest matches in style "${style}": ${suggestions.map((s) => s.name).join(', ')}.`);
      }
      hintParts.push('Use list_icons to browse the full subset.');
      throw new Error(hintParts.join(' '));
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            name: icon.name,
            style: icon.style,
            prefix: icon.prefix,
            class: icon.class,
            html: `<i class="${icon.class}"></i>`,
            requires: ['font-awesome'],
          }, null, 2),
        },
      ],
    };
  }

  async fetchUtilities() {
    const now = Date.now();
    if (this.utilitiesCache && (now - this.utilitiesCache.fetchedAt) < UTILITIES_CACHE_TTL_MS) {
      return this.utilitiesCache.data;
    }

    let data;
    if (this.isInternalMode()) {
      const yamlPath = join(APP_DIR, 'mcp-utilities.yaml');
      try {
        const text = await readFile(yamlPath, 'utf-8');
        data = yaml.load(text);
      } catch (err) {
        throw new Error(`Failed to read mcp-utilities.yaml from ${yamlPath}: ${err.message}`);
      }
    } else {
      const res = await fetch(UTILITIES_URL);
      if (!res.ok) {
        throw new Error(
          `Failed to fetch utilities.json (${res.status} ${res.statusText}) from ${UTILITIES_URL}`
        );
      }
      data = await res.json();
    }

    this.utilitiesCache = { data, fetchedAt: now };
    return data;
  }

  async getUtilities(category) {
    const VALID_CATEGORIES = ['flex', 'spacing', 'display', 'text', 'visibility', 'sizing', 'visual', 'layout', 'colors', 'all'];
    const cat = category || 'all';
    if (!VALID_CATEGORIES.includes(cat)) {
      throw new Error(
        `Invalid category "${cat}". Valid: ${VALID_CATEGORIES.join(', ')}.`
      );
    }

    const data = await this.fetchUtilities();
    if (cat === 'all') {
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }

    const filtered = {
      meta: data.meta,
      groups: (data.groups || []).filter(
        (g) => g.categories && g.categories.includes(cat)
      ),
      custom: {},
    };

    const customMap = {
      flex: ['flex'],
      spacing: [],
      display: [],
      text: ['text'],
      visibility: ['visibility'],
      sizing: ['sizing'],
      visual: [],
      layout: [],
      colors: ['tokens'],
    };
    for (const key of (customMap[cat] || [])) {
      if (data.custom && data.custom[key]) {
        filtered.custom[key] = data.custom[key];
      }
    }

    return { content: [{ type: 'text', text: JSON.stringify(filtered, null, 2) }] };
  }

  async getComponent(args) {
    const { name, ...params } = args;
    if (!name || typeof name !== 'string') {
      throw new Error('Missing required argument "name".');
    }

    const schema = await this.fetchComponents();
    const component = schema.components[name];
    if (!component) {
      const available = Object.keys(schema.components).sort().join(', ');
      throw new Error(`Unknown component "${name}". Available: ${available}.`);
    }
    if (!component.template || typeof component.template !== 'string') {
      throw new Error(`Component "${name}" has no template defined.`);
    }

    const data = validateParams(component, name, params);
    const html = renderTemplate(component.template, data);

    const requires = Array.isArray(component.requires) ? [...component.requires] : [];
    if (component.addRequiresWhen) {
      for (const [paramName, extras] of Object.entries(component.addRequiresWhen)) {
        if (isTruthy(data[paramName]) && Array.isArray(extras)) {
          for (const dep of extras) {
            if (!requires.includes(dep)) requires.push(dep);
          }
        }
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            name,
            html,
            params: data,
            requires,
          }, null, 2),
        },
      ],
    };
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupHandlers() {
    const externalTools = [
      {
        name: 'get_setup',
        description: 'Returns asset setup (stylesheet links, script tags, required <html> classes) for embedding the Martinus styleguide in an external project. Fetches the live rev-manifest.json from the hosted styleguide so asset URLs always point at the current hashed files. Response contains `head` (inject into <head>), `bodyEnd` (inject before </body>), `htmlClasses` (add to the <html> element), `utilityHint` — a short cheat sheet of Martinus utility conventions plus a CLOSED-DESIGN-SYSTEM warning, `availableComponents` — the full list of parametric component names so the agent does not have to guess what exists, and `iconSubset` — a one-line note that the FA bundle is a curated subset (not full FA Pro). Font Awesome Pro is always included. Use this once per project to wire up the base bundle.',
        inputSchema: {
          type: 'object',
          properties: {
            language: {
              type: 'string',
              enum: ['sk', 'cz'],
              description: 'UI language for i18n-aware interactive modules (Select, Autocomplete). Default: "sk".',
            },
          },
        },
      },
      {
        name: 'get_component',
        description: 'Returns a rendered HTML fragment for a Martinus design-system component. Pass component `name` plus content/variant parameters (e.g. `label`, `variant`, `size`, `icon`). Response contains the final `html`, the normalized `params` used, and a `requires` array of extra asset bundles the HTML depends on (e.g. ["font-awesome"]) — pass those to get_setup if needed. To discover available components and their parameter schemas, call list_components (gets all names + canonical HTML snippets) or get_component_info(name) (full param schema with types, enum values, required flags, plus a canonical_html sample render). Do NOT probe this tool with empty args to learn the schema — get_component_info is the cheaper and authoritative discovery path.',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Component name, e.g. "buttons".',
            },
          },
          required: ['name'],
          additionalProperties: true,
        },
      },
      {
        name: 'get_starter_template',
        description: 'Returns a complete HTML document (doctype + <html> + <head> + <body>) pre-wired to the hosted Martinus bundle. Use this when starting a new page from scratch — the response `html` field is a drop-in file you can save as index.html. For adding Martinus styling to an existing page, use get_setup instead and inject the fragments yourself. Font Awesome Pro is always included. The body is intentionally empty — fill it with get_component output. The response also carries `utilityHint` (Martinus utility conventions plus closed-design-system warning), `availableComponents` (the full list of parametric component names), and `iconSubset` (a note that the FA bundle is a curated subset). Consult these BEFORE writing any markup so you do not invent Bootstrap-flavored classes or Font Awesome icons that are not in the subset.',
        inputSchema: {
          type: 'object',
          properties: {
            language: {
              type: 'string',
              enum: ['sk', 'cz'],
              description: 'UI language for i18n-aware interactive modules and the <html lang> attribute (sk → "sk", cz → "cs"). Default: "sk".',
            },
            title: {
              type: 'string',
              description: 'Text for the <title> element. Default: "Martinus".',
            },
          },
        },
      },
      {
        name: 'list_icons',
        description: 'Returns the Font Awesome Pro icons available in the Martinus styleguide bundle. CRITICAL: this is a HAND-CURATED SUBSET (~186 regular icons selected for Martinus design needs), NOT the full Font Awesome Pro catalog. Common icons you might expect — fa-truck, fa-percent, fa-envelope-open, fa-cart, fa-discount, fa-shopping-bag — may NOT be present. ALWAYS check this list (or attempt get_icon) BEFORE writing `<i class="far fa-…">` markup; the bundle will not render an icon that is outside the subset. Each entry contains `name`, `style`, `prefix`, and a ready-to-use `class` string (e.g. "far fa-heart"). Optional `style` filter: `regular` (far, ~180 icons), `brands` (fab, ~6), `solid` (fas, ~5), `duotone` (fad, 1), `kit` (fak — 3 Martinus-custom icons: martinus, owl, owl-plus). Use `get_icon` to render a specific icon and to get an auto-suggested list of closest names when a guess is wrong.',
        inputSchema: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: ['regular', 'brands', 'solid', 'duotone', 'kit'],
              description: 'Filter by FA style. Omit to return all styles.',
            },
          },
        },
      },
      {
        name: 'get_icon',
        description: 'Returns an HTML snippet for a single Font Awesome icon from the Martinus design-system CURATED SUBSET (NOT full Font Awesome Pro — see list_icons for the closed-set warning). Response contains `html` (ready-to-use `<i>` tag), `prefix`, `style`, `class`, and `requires: ["font-awesome"]`. Default style: regular (far). When `name` is not in the subset the error message includes auto-suggested closest matches in the requested style — read the suggestions before retrying with a different name. Use list_icons to browse the full subset.',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Icon name without the `fa-` prefix, e.g. "heart", "check-circle".',
            },
            style: {
              type: 'string',
              enum: ['regular', 'brands', 'solid', 'duotone', 'kit'],
              description: 'FA style. Default: "regular".',
            },
          },
          required: ['name'],
        },
      },
      {
        name: 'get_utilities',
        description: 'Returns the Martinus styleguide utility class reference — Bootstrap 5 utility groups (display, flex, spacing, text-align, etc.) plus Martinus-specific helpers (visibility, custom flex, text, overflow). IMPORTANT: Martinus uses custom breakpoint suffixes (s / m / l / xl) and custom spacing names (none / tiny / small / medium / large). Use `category` to get a focused subset.',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: ['flex', 'spacing', 'display', 'text', 'visibility', 'sizing', 'visual', 'layout', 'colors', 'all'],
              description: 'Filter by category. `flex` includes display+all flex utilities. `spacing` includes margin, padding, gap. `colors` returns bg-*, text-color-* utility classes and --ms-* CSS design tokens. `all` returns the full reference (default).',
            },
          },
        },
      },
      {
        name: 'list_components',
        description: 'Lists every component the agent can render. Always returns a `parametric` array — each entry is { name, description, params (param-name list), requires, canonicalHtml } where `canonicalHtml` is a ready-to-paste minimal example using correct Martinus class names (custom breakpoints -s/-m/-l/-xl, BEM modifiers like col--12, no Bootstrap). Read those snippets BEFORE writing markup; if a component is in this list, never invent its HTML — copy canonical_html and adapt, or call get_component. For the full typed schema of any one component (param types, enum values, required flags), call get_component_info. When the server runs against a checked-out repo (internal mode) the response also includes a `modules` map with raw Pug/SCSS/JS file locations for low-level inspection.',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['parametric', 'pug', 'scss', 'js', 'all'],
              description: '`parametric` returns only the parametric registry (always available). `pug` / `scss` / `js` return only filesystem-backed modules of that type (internal mode only). `all` (default) returns parametric + every available module type.',
            },
          },
        },
      },
      {
        name: 'get_component_info',
        description: 'Returns full details for one component. Looks up `name` in the parametric registry first → returns { source: "parametric", description, params (typed schema with enums and required flags), requires, addRequiresWhen, canonicalHtml }. This is the cheapest way to discover a component\'s parameter schema BEFORE calling get_component — no need to make a probe call to read errors. If `name` is not parametric and the server runs in internal mode, falls back to filesystem lookup and returns { source: "module", files, pugContent, scssContent, jsContent } for raw inspection. Errors otherwise with a list of available parametric components.',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Component name (e.g. "buttons", "carousel", "product-card").',
            },
          },
          required: ['name'],
        },
      },
    ];

    const internalTools = [
      {
        name: 'list_scss_utilities',
          description: 'List available SCSS utilities, variables, and mixins',
          inputSchema: {
            type: 'object',
            properties: {
              category: {
                type: 'string',
                enum: ['variables', 'mixins', 'utilities', 'all'],
                description: 'Category to list (default: all)',
              },
            },
          },
        },
        {
          name: 'find_scss_class',
          description: 'Search for SCSS class definitions by pattern',
          inputSchema: {
            type: 'object',
            properties: {
              pattern: {
                type: 'string',
                description: 'Class name pattern to search for (supports wildcards)',
              },
            },
            required: ['pattern'],
          },
        },
        {
          name: 'get_data_structure',
          description: 'Get the structure of JSON data files used in templates',
          inputSchema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                description: 'JSON data file name (optional, returns all if not specified)',
              },
            },
          },
        },
    ];

    const internalToolNames = new Set(internalTools.map(t => t.name));

    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: this.isInternalMode() ? [...externalTools, ...internalTools] : externalTools,
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args = {} } = request.params;

      try {
        if (internalToolNames.has(name)) {
          this.requireInternalMode(name);
        }
        switch (name) {
          case 'get_setup':
            return await this.getSetup(args);
          case 'get_component':
            return await this.getComponent(args);
          case 'get_starter_template':
            return await this.getStarterTemplate(args);
          case 'list_components':
            return await this.listComponents(args.type || 'all');
          case 'get_component_info':
            return await this.getComponentInfo(args.name);
          case 'list_scss_utilities':
            return await this.listScssUtilities(args.category || 'all');
          case 'find_scss_class':
            return await this.findScssClass(args.pattern);
          case 'list_icons':
            return await this.listIcons(args.style || null);
          case 'get_icon':
            return await this.getIcon(args);
          case 'get_utilities':
            return await this.getUtilities(args.category || 'all');
          case 'get_data_structure':
            return await this.getDataStructure(args.file);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  // Renders the YAML-declared `example` block for a parametric component into
  // a canonical HTML snippet plus the augmented `requires` list. Returns null
  // when the component has no example or its example fails to validate/render
  // — list_components and get_component_info degrade gracefully so a single
  // broken example never tanks the whole response. Tests assert that every
  // checked-in component has a renderable example so we catch breakage at the
  // YAML edit, not at runtime.
  _renderCanonicalExample(name, component) {
    if (!component || !component.example || !component.template) return null;
    try {
      const data = validateParams(component, name, component.example);
      const html = renderTemplate(component.template, data);
      const requires = Array.isArray(component.requires) ? [...component.requires] : [];
      if (component.addRequiresWhen) {
        for (const [paramName, extras] of Object.entries(component.addRequiresWhen)) {
          if (isTruthy(data[paramName]) && Array.isArray(extras)) {
            for (const dep of extras) if (!requires.includes(dep)) requires.push(dep);
          }
        }
      }
      return { html, requires, params: data };
    } catch {
      return null;
    }
  }

  async _listParametricComponents() {
    const schema = await this.fetchComponents();
    return Object.entries(schema.components).map(([name, c]) => {
      const canonical = this._renderCanonicalExample(name, c);
      const baseRequires = Array.isArray(c.requires) ? [...c.requires] : [];
      return {
        name,
        description: c.description,
        params: Object.keys(c.params || {}),
        requires: canonical ? canonical.requires : baseRequires,
        canonicalHtml: canonical ? canonical.html : null,
      };
    });
  }

  async _listFilesystemModules(type) {
    const components = { pug: [], scss: [], js: [] };

    if (type === 'all' || type === 'pug') {
      const pugFiles = await glob('views/modules/**/*.pug', { cwd: APP_DIR });
      components.pug = pugFiles.map(f => ({
        name: relative('views/modules', f).replace(/\.pug$/, ''),
        path: f,
      }));
    }

    if (type === 'all' || type === 'scss') {
      const moduleFiles = await glob('styles/modules/**/*.scss', { cwd: APP_DIR });
      const componentFiles = await glob('styles/components/**/*.scss', { cwd: APP_DIR });
      const stripLeadingUnderscore = (p) => p.replace(/(^|\/)_/, '$1');
      components.scss = [
        ...moduleFiles.map(f => ({
          name: stripLeadingUnderscore(relative('styles/modules', f)).replace(/\.scss$/, ''),
          path: f,
        })),
        ...componentFiles.map(f => ({
          name: stripLeadingUnderscore(relative('styles/components', f)).replace(/\.scss$/, ''),
          path: f,
        })),
      ];
    }

    if (type === 'all' || type === 'js') {
      const jsFiles = await glob('scripts/modules/**/*.js', { cwd: APP_DIR });
      components.js = jsFiles.map(f => ({
        name: relative('scripts/modules', f).replace(/\.js$/, ''),
        path: f,
      }));
    }

    return components;
  }

  async listComponents(type) {
    const result = {};

    // Parametric registry is always available — works in external mode too.
    if (type === 'all' || type === 'parametric') {
      result.parametric = await this._listParametricComponents();
    }

    // Filesystem-backed modules require internal mode. When `type` explicitly
    // requests a filesystem flavour, hard-fail; when it's `all`, just omit the
    // `modules` map so external-mode consumers get a useful response.
    const fsTypes = new Set(['pug', 'scss', 'js']);
    if (fsTypes.has(type)) {
      this.requireInternalMode('list_components');
      const modules = await this._listFilesystemModules(type);
      result.modules = { [type]: modules[type] };
    } else if (type === 'all' && this.isInternalMode()) {
      result.modules = await this._listFilesystemModules('all');
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  async getComponentInfo(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Missing required argument "name".');
    }

    // Parametric registry first — covers most agent queries and works in
    // external mode without a checked-out repo.
    const schema = await this.fetchComponents();
    const component = schema.components[name];
    if (component) {
      const canonical = this._renderCanonicalExample(name, component);
      const baseRequires = Array.isArray(component.requires) ? [...component.requires] : [];
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              source: 'parametric',
              name,
              description: component.description,
              params: component.params || {},
              requires: canonical ? canonical.requires : baseRequires,
              addRequiresWhen: component.addRequiresWhen || {},
              canonicalHtml: canonical ? canonical.html : null,
            }, null, 2),
          },
        ],
      };
    }

    // Filesystem fallback — only meaningful in internal mode. External-mode
    // consumers get a clear "available parametric:" listing instead of a
    // silent miss that drives them to stop calling the tool.
    if (!this.isInternalMode()) {
      const available = Object.keys(schema.components).sort().join(', ');
      throw new Error(
        `Component "${name}" not found in parametric registry. `
        + `Available parametric components: ${available}.`
      );
    }

    const info = { source: 'module', name, files: {} };

    const pugPatterns = [
      `views/modules/${name}.pug`,
      `views/modules/${name}/**/*.pug`,
      `views/modules/**/${name}.pug`,
    ];
    for (const pattern of pugPatterns) {
      const files = await glob(pattern, { cwd: APP_DIR });
      if (files.length > 0) {
        info.files.pug = files[0];
        info.pugContent = await readFile(join(APP_DIR, files[0]), 'utf-8');
        break;
      }
    }

    const scssPatterns = [
      `styles/modules/_${name}.scss`,
      `styles/modules/${name}.scss`,
      `styles/components/_${name}.scss`,
      `styles/components/${name}.scss`,
    ];
    for (const pattern of scssPatterns) {
      const files = await glob(pattern, { cwd: APP_DIR });
      if (files.length > 0) {
        info.files.scss = files[0];
        info.scssContent = await readFile(join(APP_DIR, files[0]), 'utf-8');
        break;
      }
    }

    const jsPatterns = [
      `scripts/modules/${name}.js`,
      `scripts/modules/${name}/**/*.js`,
    ];
    for (const pattern of jsPatterns) {
      const files = await glob(pattern, { cwd: APP_DIR });
      if (files.length > 0) {
        info.files.js = files[0];
        info.jsContent = await readFile(join(APP_DIR, files[0]), 'utf-8');
        break;
      }
    }

    if (Object.keys(info.files).length === 0) {
      const available = Object.keys(schema.components).sort().join(', ');
      throw new Error(
        `Component "${name}" not found in parametric registry or filesystem modules. `
        + `Available parametric components: ${available}.`
      );
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(info, null, 2),
        },
      ],
    };
  }

  async listScssUtilities(category) {
    const result = {};

    if (category === 'all' || category === 'variables') {
      result.variables = await this.extractScssVariables();
    }

    if (category === 'all' || category === 'mixins') {
      result.mixins = await this.extractScssMixins();
    }

    if (category === 'all' || category === 'utilities') {
      result.utilities = await this.extractScssUtilities();
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  async extractScssVariables() {
    const files = await glob('styles/utils/_variables*.scss', { cwd: APP_DIR });
    const variables = [];

    for (const file of files) {
      const content = await readFile(join(APP_DIR, file), 'utf-8');
      const matches = content.matchAll(/\$([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g);

      for (const match of matches) {
        variables.push({
          name: `$${match[1]}`,
          value: match[2].trim(),
          file,
        });
      }
    }

    return variables;
  }

  async extractScssMixins() {
    const files = await glob('styles/utils/_mixins*.scss', { cwd: APP_DIR });
    const mixins = [];

    for (const file of files) {
      const content = await readFile(join(APP_DIR, file), 'utf-8');
      const matches = content.matchAll(/@mixin\s+([a-zA-Z0-9_-]+)\s*(\([^)]*\))?/g);

      for (const match of matches) {
        mixins.push({
          name: match[1],
          params: match[2] || '()',
          file,
        });
      }
    }

    return mixins;
  }

  async extractScssUtilities() {
    const utilityFile = 'styles/_utilities.scss';
    try {
      const content = await readFile(join(APP_DIR, utilityFile), 'utf-8');

      // Extract utility class patterns
      const utilities = [];
      const matches = content.matchAll(/["']([a-zA-Z0-9_-]+)["']\s*:\s*\(/g);

      for (const match of matches) {
        utilities.push({
          name: match[1],
          file: utilityFile,
        });
      }

      return utilities;
    } catch {
      return [];
    }
  }

  async findScssClass(pattern) {
    const files = await glob('styles/**/*.scss', {
      cwd: APP_DIR,
      ignore: ['**/vendors/**'],
    });

    const results = [];
    const regex = new RegExp(pattern.replace(/\*/g, '.*'), 'i');

    for (const file of files) {
      const content = await readFile(join(APP_DIR, file), 'utf-8');
      const matches = content.matchAll(/\.([a-zA-Z0-9_-]+)/g);

      for (const match of matches) {
        if (regex.test(match[1])) {
          results.push({
            class: match[1],
            file,
          });
        }
      }
    }

    // Deduplicate
    const unique = Array.from(new Map(results.map(r => [`${r.class}:${r.file}`, r])).values());

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(unique, null, 2),
        },
      ],
    };
  }

  _parseDataFile(filePath, content) {
    const ext = extname(filePath).toLowerCase();
    if (ext === '.yaml' || ext === '.yml') {
      return yaml.load(content);
    }
    return JSON.parse(content);
  }

  async getDataStructure(file) {
    if (file) {
      const filePath = join(APP_DIR, 'views/data', file);
      const content = await readFile(filePath, 'utf-8');
      const data = this._parseDataFile(filePath, content);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } else {
      const dataJsonPath = join(APP_DIR, 'views/data.json');
      let mainData = {};

      try {
        const content = await readFile(dataJsonPath, 'utf-8');
        mainData = JSON.parse(content);
      } catch {
        // File doesn't exist
      }

      const dataFiles = await glob('views/data/**/*.{yaml,yml,json}', { cwd: APP_DIR });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              'data.json': mainData,
              dataFiles,
            }, null, 2),
          },
        ],
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Martinus Styleguide MCP server running on stdio');
  }
}

// Only start the server when executed as the entry point — importing this
// module from tests (or any other consumer) must not spawn a stdio transport.
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const server = new StyleguideServer();
  server.run().catch(console.error);
}
