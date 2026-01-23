# Dark Mode Implementation Decisions

## Core Architecture

### Token-First Approach
- **All component configurations use `_theme()` tokens**, not hardcoded colors
- Dark mode overrides should be **minimal and only for special features** (arrowheads, speech bubbles, labels, etc.)
- Tokens defined in `app/styles/base/_globals.scss` with semantic naming

### Component Pattern
1. Update component config in `_config.scss` to use `_theme()` tokens
2. Remove manual dark mode overrides where possible
3. Keep overrides only for edge cases that can't use tokens directly
4. Add dark mode showcase section to each component's styleguide page

## Key Discoveries

### Token Consolidation Principle
- **Avoid duplicate values across tokens** - if two tokens have the same dark mode value, one should reference the other
- Example: `bg-warning` and `state-warning-bg` had identical dark mode values (`#4d3619`)
- Solution: In dark mode, `--ms-bg-warning: var(--ms-state-warning-bg)` — single source of truth
- This pattern applied to: `bg-blue`→`state-info-bg`, `bg-green`→`state-success-bg`, `bg-error`→`state-error-bg`

### Prefer `_theme()` in Configs Over Override Blocks
- **Best approach**: Use `_theme()` helper directly in component config maps
- **Avoid**: Adding `[data-theme='dark']` blocks to override hardcoded colors
- Example transformation:
  ```scss
  // Before: Hardcoded + dark override block needed
  background-color: _color('info', 100)
  
  // After: Automatic dark mode adaptation, no override needed
  background-color: _theme(state-info-bg)
  ```
- This eliminated ~40 lines of dark mode overrides in `_alerts.scss`

### Sass Compilation Limitations
- **Cannot use CSS custom properties with Sass color functions** (e.g., `color.mix()`)
- Solution: **Explicitly define all state colors** (default, focus, hover, active) in component configs
- This prevents auto-generation mixins from trying to manipulate CSS variables at compile time

### Token Hierarchy
**Surface tokens** (background layers):
- `surface-primary` - Main background (#1b1e22)
- `surface-secondary` - Card well, elevated sections (#2a2f36)
- `surface-tertiary` - Stripes, accents (#11161b)
- `surface-elevated` - Cards, modals (#252a31)
- `surface-hover` / `surface-active` - Interactive states

**Contrast Strategy**:
- Use `surface-elevated` for active states when `surface-primary` lacks contrast
- Match backgrounds for seamless unions (e.g., active tab + card content)

### Component-Specific Decisions

**Buttons**:
- Most buttons look the same in dark/light mode (provide own contrast)
- Button-specific tokens added: `button-default-*`, `button-primary-*`, etc.
- Ghost button needs dark mode override for border/text

**Success Elements**:
- Use direct color reference `_color(success, 500)` instead of theme token
- Ensures visual consistency across light and dark modes

**Tab + Card Union**:
- Active tab card background must match card-well background
- Both use `_theme(surface-secondary)` to form seamless visual connection

## Requirements for All Components

1. **Convert config to use theme tokens** instead of hardcoded colors
2. **Add dark mode showcase section** to component's styleguide page
3. **Test contrast** - ensure interactive elements are clearly visible
4. **Document edge cases** that require manual overrides

## Completed Components
- ✅ Alerts (all variants including light variants)
- ✅ Badges
- ✅ Buttons (all variants)
- ✅ Cards (all variants)
- ✅ Demo component
- ✅ Dropdowns
- ✅ Forms (basic, advanced, labels, numberspinner)
- ✅ Lists
- ✅ Modals
- ✅ Tables
- ✅ Tabs (filter and card styles)
- ✅ Typography (h2, h3)

## Simplification Checklist
When reviewing dark mode implementation:
1. [ ] Are any tokens duplicating values? → Consolidate with references
2. [ ] Are there `[data-theme='dark']` blocks? → Can they use `_theme()` in config instead?
3. [ ] Are there hardcoded hex values in dark blocks? → Replace with `_theme()` calls
4. [ ] Do `bg-*` and `state-*-bg` tokens have the same dark value? → Reference one from the other

## Next Steps
- Continue systematic conversion of remaining components
- Priority candidates: Forms, Tables, Typography pages, Navigation
- Verify all pages for visual issues and contrast
