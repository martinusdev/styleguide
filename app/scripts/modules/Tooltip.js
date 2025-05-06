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

export default class Tooltip {
  constructor(selector = '[data-tooltip]', config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.selector = selector;
    this.tooltips = [];

    this._init = this._init.bind(this);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this._init);
    } else {
      this._init(); // Call directly if DOMContentLoaded has already occurred
    }
  }

  destroy() {
    this.tooltips.forEach(t => t.destroy());
  }

  update() {
    this.destroy();
    this._init();
  }

  _init() {
    const targets = Array.from(document.querySelectorAll(this.selector));
    this.tooltips = targets.map(target => {
      const targetConfig = {};
      const { showOnCreate } = target.dataset;

      if (showOnCreate) {
        targetConfig.showOnCreate = true;
        targetConfig.trigger = 'manual';
        targetConfig.hideOnClick = false;
      }

      return tippy(target, { ...this.config, ...targetConfig });
    });
  }
}
