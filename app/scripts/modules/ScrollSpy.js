import gumshoe from 'gumshoe';
import { TOGGLE_EVT } from './Toggle';

const defaultConfig = {
  activeClass: 'is-active',
  offset: 40,
};

export default class StickyWrapper {
  constructor(selector = '[data-gumshoe] a', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this.scrollSpies = [];
    this._init();

    return this;
  }

  _init() {
    this.scrollSpies = gumshoe.init(this.config);

    document.addEventListener(TOGGLE_EVT, this._handleResize);
  }

  _handleResize() { // eslint-disable-line
    gumshoe.setDistances();
  }
}
