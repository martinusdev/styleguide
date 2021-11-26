import Sticky from 'sticky-js';

import { getValueFromResponsiveMap } from './Utils';

function getOffset(element) {
  const currentOffset = JSON.parse(element.getAttribute('data-scroll-offset'))
    || window.myApp.scrollOffset
    || 0;

  return getValueFromResponsiveMap(currentOffset, window.innerWidth);
}

const defaultConfig = {
  marginTop: getOffset,
};

export default class StickyWrapper {
  constructor(selector = '[data-sticky]', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.stickies = [];

    this._init();
  }

  _init() {
    this.stickies = new Sticky(this.selector, this.config);
  }

  update() {
    this.destroy();
    this._init();
  }

  destroy() {
    this.stickies.destroy();
  }
}
