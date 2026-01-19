/**
 * Theme Toggle Module
 * Handles light/dark theme switching with localStorage persistence
 */
class ThemeToggle {
  constructor(toggleSelector = '[data-theme-toggle]') {
    this.toggles = document.querySelectorAll(toggleSelector);
    this.storageKey = 'martinus-theme';

    if (this.toggles.length > 0) {
      this.init();
    }
  }

  init() {
    console.log('[ThemeToggle] Initializing...', {
      toggleCount: this.toggles.length,
      currentTheme: document.documentElement.getAttribute('data-theme')
    });
    // Apply theme before render to prevent FOUC
    this.applyTheme(this.getPreferredTheme());
    this.bindEvents();
  }

  /**
   * Get user's preferred theme from localStorage or system preference
   * @returns {string} 'light' or 'dark'
   */
  getPreferredTheme() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) return stored;

    // Respect system preference
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Apply theme to document
   * @param {string} theme - 'light' or 'dark'
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateToggleUI(theme);
  }

  /**
   * Update toggle button ARIA attributes and visual state
   * @param {string} theme - Current theme
   */
  updateToggleUI(theme) {
    const isDark = theme === 'dark';

    this.toggles.forEach((toggle) => {
      toggle.setAttribute('aria-pressed', isDark);
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

      if (isDark) {
        toggle.classList.add('is-active');
      } else {
        toggle.classList.remove('is-active');
      }
    });
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.storageKey, next);
    this.applyTheme(next);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this.toggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        console.log('[ThemeToggle] Button clicked');
        this.toggleTheme();
      });
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        // Only auto-switch if user hasn't set a preference
        if (!localStorage.getItem(this.storageKey)) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
  }
}

export default ThemeToggle;
