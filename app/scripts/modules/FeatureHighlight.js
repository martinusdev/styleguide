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

      // Create close button
      const closeButton = document.createElement('button');
      closeButton.className = 'feature-highlight-close link link--white';
      closeButton.innerHTML = '<i class="far fa-xmark fa-lg"></i>';

      // Add event listener to close button
      closeButton.addEventListener('click', () => {
        instance.hide();

        // Remember that this highlight was dismissed
        const reference = instance.reference;
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

export default class FeatureHighlight {
  constructor(selector = '[data-feature-highlight]', config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.selector = selector;
    this.tooltips = [];

    this._init = this._init.bind(this);
    this._checkDismissedHighlights = this._checkDismissedHighlights.bind(this);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this._init);
    } else {
      this._init();
    }

    this.initResetButtons();
  }

  destroy() {
    this.tooltips.forEach(t => t.destroy());
    this.tooltips = [];
  }

  update() {
    this.destroy();
    this._init();
  }

  // Initialize reset buttons for dismissed highlights
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

  // Show a specific feature highlight by ID
  showById(id) {
    const tooltip = this.tooltips.find(t =>
      t.reference && t.reference.dataset.featureHighlight === id);

    if (tooltip) {
      tooltip.show();
      return true;
    }
    return false;
  }

  // Hide a specific feature highlight by ID
  hideById(id) {
    const tooltip = this.tooltips.find(t =>
      t.reference && t.reference.dataset.featureHighlight === id);

    if (tooltip) {
      tooltip.hide();
      return true;
    }
    return false;
  }

  // Dismiss and remember a feature highlight
  dismissById(id) {
    const tooltip = this.tooltips.find(t =>
      t.reference && t.reference.dataset.featureHighlight === id);

    if (tooltip) {
      tooltip.hide();
      localStorage.setItem(`feature-highlight-${id}-dismissed`, 'true');
      return true;
    }
    return false;
  }

  // Reset dismissed state for a specific feature
  resetDismissedState(id) {
    localStorage.removeItem(`feature-highlight-${id}-dismissed`);
    return true;
  }

  // Reset all dismissed states
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

  _init() {
    // First, find all potential highlight elements
    const allTargets = Array.from(document.querySelectorAll(this.selector));

    // Filter out elements that were previously dismissed
    const eligibleTargets = allTargets.filter(target => {
      const featureId = target.dataset.featureHighlight;
      if (!featureId) return true; // Include elements without an ID (though they should have one)

      const isDismissed = localStorage.getItem(`feature-highlight-${featureId}-dismissed`) === 'true';
      return !isDismissed;
    });

    // Initialize Tippy only on eligible targets
    this.tooltips = eligibleTargets.map(target => {
      return tippy(target, this.config);
    });
  }

  // Check if any highlights were previously dismissed and update internal state
  _checkDismissedHighlights() {
    if (!this.tooltips || !this.tooltips.length) return;

    // This is a safety check in case something was dismissed after initialization
    const dismissedTooltips = this.tooltips.filter(tooltip => {
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
      this.tooltips = this.tooltips.filter(t => t !== tooltip);
    });
  }
}
