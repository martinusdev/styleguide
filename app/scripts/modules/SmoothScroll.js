import SmoothScrollPlugin from 'smooth-scroll';

const defaultConfig = {
  offset: 40,
  speed: 200,
};

export default class SmoothScroll {
  constructor(selector = '[data-scroll]', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.smoothScrolls = [];

    this._init();

    return this;
  }

  _init() {
    this.smoothScrolls = new SmoothScrollPlugin(this.selector, this.config);

    return this;
  }

  update() {
    this.destroy();
    this._init();
  }

  destroy() {
    this.smoothScrolls.destroy();
  }
}
