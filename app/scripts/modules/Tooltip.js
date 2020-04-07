import tippy from 'tippy.js';

const defaultConfig = {
  animation: 'scale',
  arrow: true,
  interactive: true,
  delay: 150,
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
    this.targets = Array.from(document.querySelectorAll(this.selector));

    this.tooltips = tippy(this.targets, this.config);
  }
}
