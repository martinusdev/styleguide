import tippy from 'tippy.js';

const defaultConfig = {
  arrow: true,
  interactive: true,
  allowHTML: true,
  delay: 150,
  content(reference) {
    // use title as a default tooltip content
    const { tippyContent, html } = reference.dataset;

    if (html) {
      const template = document.querySelector(html);
      if (!template) {
        console.error(`Tooltip: Element with selector "${html}" not found.`);
        return '';
      }
      reference.setAttribute('aria-describedby', html.replace('#', ''));
      return template.innerHTML;
    }

    const title = reference.getAttribute('title') || tippyContent || '';

    reference.removeAttribute('title');
    reference.setAttribute('data-tippy-content', title);

    const htmlStripped = title.replace(/<[^>]*>?/gm, '');
    reference.setAttribute('aria-label', htmlStripped);

    return title;
  },
};

/**
 * Tooltip class to initialize and manage tooltips on specified elements.
 */
export default class Tooltip {
  /**
   * @param {string} selector - CSS selector for tooltip targets.
   * @param {Object} config - Configuration options for tooltips.
   */
  constructor(selector = '[data-tooltip]', config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.selector = selector;
    this.tooltips = new Map();

    this._init = this._init.bind(this);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this._init);
    } else {
      this._init(); // Call directly if DOMContentLoaded has already occurred
    }
  }

  /**
   * Destroy all tooltips and clean up references.
   */
  destroy() {
    this.tooltips.forEach((tooltip, target) => {
      tooltip.destroy();
      target.removeAttribute('aria-describedby'); // Clean up accessibility attributes
    });
    this.tooltips.clear();
  }

  /**
   * Update tooltips by destroying and reinitializing them.
   */
  update() {
    this.destroy();
    this._init();
  }

  /**
   * Initialize tooltips on the selected elements.
   * @private
   */
  _init() {
    const targets = [...document.querySelectorAll(this.selector)];

    targets.forEach(target => {
      const targetConfig = {};
      const { showOnCreate } = target.dataset;

      if (showOnCreate) {
        targetConfig.showOnCreate = true;
        targetConfig.trigger = 'manual';
        targetConfig.hideOnClick = false;
      }

      const tooltipInstance = tippy(target, { ...this.config, ...targetConfig });
      this.tooltips.set(target, tooltipInstance);
    });
  }
}
