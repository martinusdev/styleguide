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
import * as cheerio from 'cheerio';
import yaml from 'js-yaml';

// External mode (default): APP_DIR unset → filesystem tools are hidden and the
// server serves only hosted-artifact tools (suitable for npx distribution).
// Internal mode: APP_DIR points at a local styleguide checkout (Docker mount
// or a contributor's working copy) and filesystem tools become available.
const APP_DIR = process.env.MARTINUS_STYLEGUIDE_APP_DIR || null;

const ASSETS_BASE_URL = (process.env.MARTINUS_STYLEGUIDE_ASSETS_URL
  || 'https://mrtns.sk/assets/martinus/lb/').replace(/\/?$/, '/');
const MANIFEST_URL = `${ASSETS_BASE_URL}rev-manifest.json`;
const MANIFEST_CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * MCP Server for Martinus Styleguide
 * Provides tools to query components, classes, mixins, and assets
 */
class StyleguideServer {
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
    this.pugMixinIndex = null;
    this.manifestCache = null;

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

  async getSetup(args) {
    const language = args.language ?? 'sk';
    if (!['sk', 'cz'].includes(language)) {
      throw new Error(`Invalid language "${language}". Use "sk" or "cz".`);
    }

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
      content: [
        {
          type: 'text',
          text: JSON.stringify({
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
        description: 'Returns asset setup (stylesheet links, script tags, required <html> classes) for embedding the Martinus styleguide in an external project. Fetches the live rev-manifest.json from the hosted styleguide so asset URLs always point at the current hashed files. Response contains `head` (inject into <head>), `bodyEnd` (inject before </body>), and `htmlClasses` (add to the <html> element). Font Awesome Pro is always included. Use this once per project to wire up the base bundle.',
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
    ];

    const internalTools = [
      {
        name: 'list_components',
          description: 'List all UI components/modules in the styleguide with their file locations',
          inputSchema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['pug', 'scss', 'js', 'all'],
                description: 'Filter by component type (default: all)',
              },
            },
          },
        },
        {
          name: 'get_component_info',
          description: 'Get detailed information about a specific component including its Pug template, SCSS styles, and JavaScript',
          inputSchema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Component name (e.g., "button", "card", "product-card")',
              },
            },
            required: ['name'],
          },
        },
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
          name: 'list_pug_mixins',
          description: 'List all available Pug mixins with their signatures and locations',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'get_mixin_info',
          description: 'Get detailed information about a specific Pug mixin including its parameters and usage',
          inputSchema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Mixin name (without the + prefix)',
              },
            },
            required: ['name'],
          },
        },
        {
          name: 'list_icons',
          description: 'List all available SVG icons in app/icons_/',
          inputSchema: {
            type: 'object',
            properties: {},
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
          case 'list_components':
            return await this.listComponents(args.type || 'all');
          case 'get_component_info':
            return await this.getComponentInfo(args.name);
          case 'list_scss_utilities':
            return await this.listScssUtilities(args.category || 'all');
          case 'find_scss_class':
            return await this.findScssClass(args.pattern);
          case 'list_pug_mixins':
            return await this.listPugMixins();
          case 'get_mixin_info':
            return await this.getMixinInfo(args.name);
          case 'list_icons':
            return await this.listIcons();
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

  async listComponents(type) {
    const components = {
      pug: [],
      scss: [],
      js: [],
    };

    // Find Pug modules
    if (type === 'all' || type === 'pug') {
      const pugFiles = await glob('views/modules/**/*.pug', { cwd: APP_DIR });
      components.pug = pugFiles.map(f => ({
        name: relative('views/modules', f).replace(/\.pug$/, ''),
        path: f,
      }));
    }

    // Find SCSS modules and components
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

    // Find JS modules
    if (type === 'all' || type === 'js') {
      const jsFiles = await glob('scripts/modules/**/*.js', { cwd: APP_DIR });
      components.js = jsFiles.map(f => ({
        name: relative('scripts/modules', f).replace(/\.js$/, ''),
        path: f,
      }));
    }

    const result = type === 'all'
      ? components
      : { [type]: components[type] };

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
    const info = {
      name,
      files: {},
    };

    // Check for Pug template
    const pugPatterns = [
      `views/modules/${name}.pug`,
      `views/modules/${name}/**/*.pug`,
      `views/modules/**/${name}.pug`,
    ];

    for (const pattern of pugPatterns) {
      const files = await glob(pattern, { cwd: APP_DIR });
      if (files.length > 0) {
        info.files.pug = files[0];
        const content = await readFile(join(APP_DIR, files[0]), 'utf-8');
        info.pugContent = content;
        break;
      }
    }

    // Check for SCSS
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
        const content = await readFile(join(APP_DIR, files[0]), 'utf-8');
        info.scssContent = content;
        break;
      }
    }

    // Check for JS
    const jsPatterns = [
      `scripts/modules/${name}.js`,
      `scripts/modules/${name}/**/*.js`,
    ];

    for (const pattern of jsPatterns) {
      const files = await glob(pattern, { cwd: APP_DIR });
      if (files.length > 0) {
        info.files.js = files[0];
        const content = await readFile(join(APP_DIR, files[0]), 'utf-8');
        info.jsContent = content;
        break;
      }
    }

    if (Object.keys(info.files).length === 0) {
      throw new Error(`Component "${name}" not found`);
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

  async listPugMixins() {
    const files = await glob('views/mixins/**/*.pug', { cwd: APP_DIR });
    const mixins = [];

    for (const file of files) {
      const content = await readFile(join(APP_DIR, file), 'utf-8');
      const matches = content.matchAll(/^mixin\s+([a-zA-Z0-9_-]+)\s*(\([^)]*\))?/gm);

      for (const match of matches) {
        mixins.push({
          name: match[1],
          params: match[2] || '()',
          file,
        });
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(mixins, null, 2),
        },
      ],
    };
  }

  _extractMixinBlock(content, name) {
    const lines = content.split('\n');
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const signatureRe = new RegExp(`^(\\s*)mixin\\s+${escapedName}(\\s*\\([^)]*\\))?\\s*$`);

    let startIdx = -1;
    let baseIndent = 0;
    let params = '()';

    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(signatureRe);
      if (m) {
        startIdx = i;
        baseIndent = m[1].length;
        params = (m[2] || '').trim() || '()';
        break;
      }
    }

    if (startIdx === -1) return null;

    let endIdx = lines.length;
    for (let i = startIdx + 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '') continue;
      const indent = line.match(/^(\s*)/)[1].length;
      if (indent <= baseIndent) {
        endIdx = i;
        break;
      }
    }

    while (endIdx > startIdx + 1 && lines[endIdx - 1].trim() === '') {
      endIdx--;
    }

    return {
      params,
      line: startIdx + 1,
      content: lines.slice(startIdx, endIdx).join('\n'),
    };
  }

  async getMixinInfo(name) {
    const files = await glob('views/mixins/**/*.pug', { cwd: APP_DIR });

    for (const file of files) {
      const content = await readFile(join(APP_DIR, file), 'utf-8');
      const block = this._extractMixinBlock(content, name);

      if (block) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                name,
                params: block.params,
                file,
                line: block.line,
                content: block.content,
              }, null, 2),
            },
          ],
        };
      }
    }

    throw new Error(`Mixin "${name}" not found`);
  }

  async listIcons() {
    const files = await glob('icons_/**/*.svg', { cwd: APP_DIR });
    const icons = files.map(f => ({
      name: relative('icons_', f).replace(/\.svg$/, ''),
      path: f,
    }));

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(icons, null, 2),
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

// Start the server
const server = new StyleguideServer();
server.run().catch(console.error);
