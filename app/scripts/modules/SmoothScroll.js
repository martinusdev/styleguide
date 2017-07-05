import smoothScroll from 'smooth-scroll';

const defaultConfig = {
  offset: 40,
  speed: 200,
};

export default class SmoothScroll {
  constructor(selector = '[data-scroll]', config) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this.smoothScrolls = [];

    this._init();

    return this;
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
