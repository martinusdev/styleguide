import tippy from 'tippy.js';

const defaultConfig = {
  arrow: true,
  interactive: true,
  allowHTML: true,
  appendTo: 'parent',
  delay: 500,
  theme: 'success',
  showOnCreate: true,
  hideOnClick: false,
  trigger: 'manual',
  placement: 'top',
  zIndex: 999,
  onShow(instance) {
    if (window.matchMedia('(max-width: 768px)').matches) {
      instance.setProps({ placement: 'bottom' }); // Change to bottom on mobile
    }
  },
  // Custom handler for adding a close button
  onMount(instance) {
    const box = instance.popper.querySelector('.tippy-content');
    if (!box) {
      console.error('Tippy content element not found');
      return;
    }

    // Add wrapper class for flexbox layout if not already present
    if (!box.classList.contains('feature-highlight-wrapper')) {
      box.classList.add('feature-highlight-wrapper', 'd-flex', 'align-items-start', 'gap-tiny');

      // Create content wrapper to hold the original content
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'feature-highlight-content';

      // Move all existing children to content wrapper
      while (box.firstChild) {
        contentWrapper.appendChild(box.firstChild);
      }

      const reference = instance.reference;

      // Create close button
      const closeButton = document.createElement('button');
      closeButton.className = 'feature-highlight-close link link--white';
      closeButton.innerHTML = '<i class="far fa-xmark fa-lg"></i>';

      let closeLabel = 'Close';

      if (reference && reference.dataset.closeText) {
        closeLabel = reference.dataset.closeText;
      }

      closeButton.setAttribute('title', closeLabel);

      // Add event listener to close button
      closeButton.addEventListener('click', () => {
        instance.hide();

        // Remember that this highlight was dismissed
        if (reference && reference.dataset.featureHighlight) {
          localStorage.setItem(`feature-highlight-${reference.dataset.featureHighlight}-dismissed`, 'true');
        }
      });

      // Append the content wrapper and close button to the tooltip box
      box.appendChild(contentWrapper);
      box.appendChild(closeButton);
    }
  },
}

/**
 * FeatureHighlight class for creating interactive feature highlights using tooltips
 * with dismiss functionality and persistence.
 */
export default class FeatureHighlight {
  /**
   * Create a new FeatureHighlight instance
   * @param {string} selector - CSS selector for elements to highlight
   * @param {Object} config - Configuration options for the tooltips
   */
  constructor(selector = '[data-feature-highlight]', config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.selector = selector;
    this.tooltips = new WeakMap(); // Use WeakMap for better memory management
    this.tooltipInstances = []; // Keep track of instances for methods that need to iterate

    this._init = this._init.bind(this);
    this._checkDismissedHighlights = this._checkDismissedHighlights.bind(this);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this._init);
    } else {
      this._init();
    }

    this.initResetButtons();
  }

  /**
   * Destroy all tooltips and clean up references
   */
  destroy() {
    this.tooltipInstances.forEach(tooltip => {
      tooltip.destroy();
    });
    this.tooltips = new WeakMap();
    this.tooltipInstances = [];
  }

  /**
   * Update tooltips by destroying and reinitializing them
   */
  update() {
    this.destroy();
    this._init();
  }

  /**
   * Initialize reset buttons for dismissed highlights
   */
  initResetButtons() {
    // global event listener for click, looking for reset buttons
    document.addEventListener('click', (event) => {
      const target = event.target.closest('[data-feature-highlight-reset-all]');

      if (target) {
        event.preventDefault();
        this.resetAllDismissedStates();
        this.update();
      }
    });
  }

  /**
   * Show a specific feature highlight by ID
   * @param {string} id - ID of the feature to highlight
   * @returns {boolean} True if highlight was shown, false otherwise
   */
  showById(id) {
    const tooltip = this.tooltipInstances.find(t =>
      t.reference && t.reference.dataset.featureHighlight === id);

    if (tooltip) {
      tooltip.show();
      return true;
    }
    return false;
  }

  /**
   * Hide a specific feature highlight by ID
   * @param {string} id - ID of the feature highlight to hide
   * @returns {boolean} True if highlight was hidden, false otherwise
   */
  hideById(id) {
    const tooltip = this.tooltipInstances.find(t =>
      t.reference && t.reference.dataset.featureHighlight === id);

    if (tooltip) {
      tooltip.hide();
      return true;
    }
    return false;
  }

  /**
   * Dismiss and remember a feature highlight
   * @param {string} id - ID of the feature highlight to dismiss
   * @returns {boolean} True if highlight was dismissed, false otherwise
   */
  dismissById(id) {
    const tooltip = this.tooltipInstances.find(t =>
      t.reference && t.reference.dataset.featureHighlight === id);

    if (tooltip) {
      tooltip.hide();
      localStorage.setItem(`feature-highlight-${id}-dismissed`, 'true');
      return true;
    }
    return false;
  }

  /**
   * Reset dismissed state for a specific feature
   * @param {string} id - ID of the feature highlight to reset
   * @returns {boolean} True if reset was successful
   */
  resetDismissedState(id) {
    if (!id) {
      console.error('Feature highlight ID is required');
      return false;
    }
    localStorage.removeItem(`feature-highlight-${id}-dismissed`);
    return true;
  }

  /**
   * Reset all dismissed states
   * @returns {number} Number of items that were reset
   */
  resetAllDismissedStates() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('feature-highlight-') && key.endsWith('-dismissed')) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
    return keysToRemove.length;
  }

  /**
   * Initialize tooltips on eligible elements
   * @private
   */
  _init() {
    try {
      // First, find all potential highlight elements
      const allTargets = [...document.querySelectorAll(this.selector)];

      if (!allTargets.length) {
        return;
      }

      // Filter out elements that were previously dismissed
      const eligibleTargets = allTargets.filter(target => {
        const featureId = target.dataset.featureHighlight;
        if (!featureId) {
          console.warn('Feature highlight element missing data-feature-highlight attribute:', target);
          return true; // Include elements without an ID (though they should have one)
        }

        const isDismissed = localStorage.getItem(`feature-highlight-${featureId}-dismissed`) === 'true';
        return !isDismissed;
      });

      // Initialize Tippy only on eligible targets
      this.tooltipInstances = eligibleTargets.map(target => {
        const instance = tippy(target, this.config);
        this.tooltips.set(target, instance);
        return instance;
      });
    } catch (error) {
      console.error('Error initializing feature highlights:', error);
    }
  }

  /**
   * Check if any highlights were previously dismissed and update internal state
   * @private
   */
  _checkDismissedHighlights() {
    if (!this.tooltipInstances.length) return;

    // This is a safety check in case something was dismissed after initialization
    const dismissedTooltips = this.tooltipInstances.filter(tooltip => {
      const reference = tooltip.reference;
      if (reference && reference.dataset.featureHighlight) {
        const featureId = reference.dataset.featureHighlight;
        return localStorage.getItem(`feature-highlight-${featureId}-dismissed`) === 'true';
      }
      return false;
    });

    // Destroy dismissed tooltips
    dismissedTooltips.forEach(tooltip => {
      tooltip.destroy();
      this.tooltipInstances = this.tooltipInstances.filter(t => t !== tooltip);
    });
  }
}
