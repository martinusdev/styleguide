import gumshoe from 'gumshoe';
import { TOGGLE_EVT } from './Toggle';
import { getValueFromResponsiveMap } from './Utils';

function getOffset(nav) {
  if (!nav) {
    return 0;
  }

  const currentOffset = JSON.parse(nav.getAttribute('data-scroll-offset'))
    || window.myApp.scrollOffset
    || 0;

  return getValueFromResponsiveMap(currentOffset, window.innerWidth);
}

const defaultConfig = {
  activeClass: 'is-active',
  offset: getOffset,
};

export default class StickyWrapper {
  constructor(selector = '[data-gumshoe] a', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...{ selector }, ...config };

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

  update() {
    this.destroy();
    this._init();
  }

  destroy() { // eslint-disable-line
    gumshoe.destroy();
  }
}
