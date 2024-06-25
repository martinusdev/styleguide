import tippy from 'tippy.js';

const defaultConfig = {
  animation: 'scale',
  arrow: true,
  interactive: true,
  appendTo: () => document.body,
  delay: 150,
  content(reference) {
    // use title as a default tooltip content
    const title = reference.getAttribute('data-tippy-content')
      || reference.getAttribute('title');
    reference.removeAttribute('title');
    reference.setAttribute('data-tippy-content', title);
    return title;
  },
};

export default class Tooltip {
  constructor(selector = '[data-tooltip]', config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.selector = selector;
    this.tooltips = [];

    document.addEventListener('DOMContentLoaded', () => this._init.bind(this));
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

      // fetch html element to put in tooltip
      const element = document.querySelector(target.dataset.html);

      if (element) {
        element.style.display = 'block';
        targetConfig.content = element;
      }

      targetConfig.allowHTML = true;

      if (showOnCreate) {
        targetConfig.showOnCreate = true;
        targetConfig.trigger = 'manual';
        targetConfig.hideOnClick = false;
      }

      return tippy(target, { ...this.config, ...targetConfig });
    });
  }
}
