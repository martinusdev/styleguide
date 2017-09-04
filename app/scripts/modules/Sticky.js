import Sticky from 'sticky-js';

import { getValueFromResponsiveMap } from './Utils';

function getOffset(element) {
  const currentOffset =
    JSON.parse(element.getAttribute('data-scroll-offset')) || 0;

  return getValueFromResponsiveMap(currentOffset, window.innerWidth);
}

const defaultConfig = {
  marginTop: getOffset,
};

export default class StickyWrapper {
  constructor(selector = '[data-sticky]', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.stickies = [];

    return this._init();
  }

  _init() {
    this.stickies = new Sticky(this.selector, this.config);

    return this.stickies;
  }

  update() {
    this.destory();
    this.init();
  }

  destroy() {
    this.stickies.destroy();
  }
}
