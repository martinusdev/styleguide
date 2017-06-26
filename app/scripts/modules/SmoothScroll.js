import smoothScroll from 'smooth-scroll';

const defaultConfig = {};

export default class SmoothScroll {
  constructor(selector = '[data-scroll]', config) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this.smoothScrolls = [];

    return this._init();
  }

  _init() {
    this.smoothScrolls = smoothScroll.init(this.config);

    return this.smoothScrolls;
  }

  update() {
    this.destory();
    this.init();
  }

  destroy() {
    this.smoothScrolls.destroy();
  }
}
