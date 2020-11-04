import tippy from 'tippy.js';

const defaultConfig = {
  animation: 'scale',
  arrow: true,
  interactive: true,
  delay: 150,
  content(reference) {
    // use title as a default tooltip content
    const title = reference.getAttribute('title');
    reference.removeAttribute('title');
    return title;
  },
};

export default class Tooltip {
  constructor(selector = '[data-tooltip]', config) {
    this.config = { ...defaultConfig, ...config };
    this.selector = selector;
    this.tooltips = [];

    this._init();

    return this;
  }

  destroy() {
    this.tooltips.destroyAll();
  }

  update() {
    this.destroy();
    this._init();
  }

  _init() {
    const targets = Array.from(document.querySelectorAll(this.selector));
    this.tooltips = targets.map(target => {
      const targetConfig = {};

      // fetch html element to put in tooltip
      const element = document.querySelector(target.getAttribute('data-html'));
      if (element) {
        targetConfig.content = element.innerHTML;
      }

      return tippy(target, { ...this.config, ...targetConfig });
    });
  }
}
