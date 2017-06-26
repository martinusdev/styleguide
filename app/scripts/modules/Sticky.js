import Sticky from 'sticky-js';

const defaultConfig = {};

export default class StickyWrapper {
  constructor(selector = '[data-sticky]', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.stickies = [];

    return this._init();
  }

  _init() {
    this.stickies = new Sticky(this.selector);

    return this.stickies;
  }
}
