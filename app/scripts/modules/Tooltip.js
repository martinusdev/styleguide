import tippy from 'tippy.js';

const defaultConfig = {
  animation: 'scale',
  arrow: true,
  interactive: true,
  delay: 150,
};

export default class Collapse {
  constructor(selector = '[data-tooltip]', config) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

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
    this.tooltips = tippy(this.config.selector, this.config);
  }
}
