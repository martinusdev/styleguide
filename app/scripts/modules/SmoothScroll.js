import SmoothScrollPlugin from 'smooth-scroll';

import { getValueFromResponsiveMap } from './Utils';

function getOffset(anchor, toggle) {
  const currentOffset =
    JSON.parse(toggle.getAttribute('data-scroll-offset')) ||
    window.myApp.scrollOffset ||
    0;

  return getValueFromResponsiveMap(currentOffset, window.innerWidth);
}

const defaultConfig = {
  speed: 200,
  offset: getOffset,
  updateURL: false,
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
