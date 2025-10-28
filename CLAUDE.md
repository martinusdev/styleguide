# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Martinus Styleguide, a living styleguide for [Martinus.sk](https://www.martinus.sk) built with [light-scripts](https://github.com/lightingbeetle/light-scripts). It uses Gulp for task automation and runs entirely in Docker for security isolation.

## Critical: Docker-Only Development

**NEVER run `yarn` or `npm` commands directly.** This project uses Docker to isolate npm/yarn from the host filesystem for supply chain security. Always use the wrapper scripts:

- `./npm.sh <command>` - Run any yarn command in Docker
- `./build.sh` - Production build
- `./serve.sh` - Development server (http://localhost:3000)
- `./mcp.sh` - Start MCP server for Claude Code integration

### Common Commands

```bash
# Install dependencies
./npm.sh install

# Development server with live reload
./serve.sh

# Production build (output in dist/)
./build.sh

# Add/update packages
./npm.sh add package-name@version

# Check for updates
./npm.sh outdated

# Lint JavaScript
./npm.sh run lint-staged

# Clear build cache
./npm.sh run clear-cache

# Process images only
./npm.sh run images
```

## Architecture

### Build System

- **Task runner**: Gulp 4 with gulp-hub registry
- **Base framework**: light-scripts (custom fork at martinusdev/light-scripts)
- **Node requirement**: >=18.2.0
- **Primary config**: `light.config.js` - extends and customizes light-scripts configuration

### Key Configuration Files

- `light.config.js` - Main configuration for light-scripts:
  - Custom SVGO plugins for icons and images
  - ESLint webpack plugin integration
  - Disables browser opening in Docker environment (`serve.open: false`)
  - Custom cheerio config to remove SVG fill attributes (except `[data-keep-fill]`)

- `gulpfile.js` - Minimal wrapper that:
  - Loads environment variables from `.env`
  - Runs `prepare` task to copy lightgallery assets to `app/images/` and `app/fonts/`
  - Delegates to light-scripts via gulp-hub registry

### Directory Structure

```
app/
├── views/          # Pug templates
│   ├── layouts/    # Page layouts
│   ├── mixins/     # Reusable Pug mixins
│   ├── modules/    # UI modules
│   ├── styleguide/ # Styleguide-specific pages
│   └── data/       # JSON data for templates
├── scripts/        # JavaScript
│   ├── modules/    # JS modules
│   ├── plugins/    # Third-party plugins
│   └── main.js     # Entry point
├── styles/         # SCSS
│   ├── base/       # Global styles, typography
│   ├── layout/     # Grid, page structure
│   ├── modules/    # Reusable UI modules (buttons, forms, etc.)
│   ├── components/ # Specific components (products, menus, etc.)
│   ├── sections/   # Header, footer
│   ├── pages/      # Page-specific styles
│   ├── utils/      # Variables, mixins, functions
│   └── main.scss   # Main entry point
├── images/         # Image assets
├── icons_/         # SVG icons (processed with custom config)
└── fonts/          # Web fonts
```

### Styling Architecture

The project uses Bootstrap 5.3.7 utilities API with custom utilities defined in `app/styles/_utilities.scss`. SCSS follows ITCSS-like structure:

1. **Vendors**: normalize.css, Bootstrap, Swiper
2. **Utils**: Bootstrap functions/mixins, custom variables/mixins
3. **Base**: Global styles, typography
4. **Layout**: Grid system, sections, containers
5. **Modules**: Reusable UI patterns (buttons, forms, cards, tables, etc.)
6. **Components**: Specific business components (products, navigation, etc.)
7. **Sections**: Header, footer
8. **Pages**: Page-specific overrides
9. **Tools**: Additional utilities
10. **Shame**: Quick fixes (to be refactored)

### JavaScript Architecture

- **Entry point**: `app/scripts/main.js`
- **Vendor bundles**: Separate `vendor.js` for third-party libraries
- **Module pattern**: Individual modules in `app/scripts/modules/`
- **Light modules**: Framework-specific in `app/scripts/lightModules/`

Key dependencies: jQuery 3.7.1, Bootstrap 5.3.7, Swiper, Chart.js, lightgallery.js

### Template System

- **Engine**: Pug (formerly Jade)
- **Data**: JSON files in `app/views/data/` and `app/views/data.json`
- **Mixins**: Reusable components in `app/views/mixins/`
- **Asset prefix**: Use `${assetsPrefix}` in templates for correct asset paths

## Linting

### JavaScript (ESLint)

- **Config**: `eslint.config.js` (flat config) + inline config in `package.json`
- **Base**: airbnb-base style guide
- **Globals**: jQuery, Modernizr
- **Ignores**: node_modules, dist, plugins, font-awesome.js

### SCSS (Stylelint)

- **Config**: `.stylelintrc.json`
- **Base**: stylelint-config-sass-guidelines
- **Ignores**: app/styles/vendors/
- **Key customizations**: No max-nesting-depth, flexible selector patterns

### Pre-commit Hooks

The project uses `pre-commit` + `lint-staged`:
- Lints `app/scripts/**/*.js` with ESLint
- Lints `app/styles/**/*.scss` with Stylelint

## Docker Details

### Why Docker?

Supply chain security: isolates npm/yarn from host filesystem, runs as non-root user (nodejs, UID 1001), containerizes node_modules in named volume.

### Volume Strategy

- `styleguide_node_modules` - Named Docker volume (never exposed to host)
- `app/`, `package.json`, `yarn.lock` - Mounted read-write
- Config files - Mounted read-only

### Troubleshooting

```bash
# Container won't start
docker-compose logs styleguide
docker-compose build --no-cache

# Node modules issues
docker volume rm martinus-styleguide_styleguide_node_modules
./npm.sh install

# Permission errors
sudo chown -R $USER app/
```

See `docker/README.md` for detailed Docker documentation.

## MCP Server (Model Context Protocol)

This project includes a custom MCP server that provides tools for efficiently exploring the styleguide:

- **list_components** - List all Pug/SCSS/JS components
- **get_component_info** - Get detailed info about a specific component
- **list_scss_utilities** - List SCSS variables, mixins, and utilities
- **find_scss_class** - Search for SCSS class definitions
- **list_pug_mixins** - List all Pug mixins with signatures
- **get_mixin_info** - Get detailed mixin information
- **list_icons** - List all SVG icons
- **get_data_structure** - View JSON data file structures

The MCP server runs in Docker with read-only access to `app/` for security. See `mcp-server/README.md` for setup instructions.

## Important Notes

- All scripts use `--openssl-legacy-provider` flag for Node compatibility
- The `prepare` task must run before first build to copy lightgallery assets
- Images support: gif, png, jpg, svg, webp (custom extension in light.config.js)
- SVG icons have fill attributes removed automatically (preserve with `[data-keep-fill]`)
- Development server runs on http://localhost:3000 (browser won't auto-open in Docker)
- Production builds output to `dist/`
- Git: main branch is `master`
