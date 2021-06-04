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
  constructor(selector = '[data-tooltip]', config) {
    this.config = { ...defaultConfig, ...config };
    this.selector = selector;
    this.tooltips = [];

    this._init();

    return this;
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

      // fetch html element to put in tooltip
      const element = document.querySelector(target.getAttribute('data-html'));
      if (element) {
        targetConfig.content = element.innerHTML;
      }

      return tippy(target, { ...this.config, ...targetConfig });
    });
  }
}
