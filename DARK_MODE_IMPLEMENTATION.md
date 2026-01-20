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
- ✅ Badges
- ✅ Buttons (all variants)
- ✅ Tabs (filter and card styles)
- ✅ Cards (all variants)
- ✅ Demo component
- ✅ Typography (h2, h3)

## Next Steps
- Continue systematic conversion of remaining components
- Priority candidates: Forms, Tables, Typography pages, Navigation
- Verify all pages for visual issues and contrast
