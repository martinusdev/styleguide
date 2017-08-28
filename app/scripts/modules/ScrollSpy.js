import gumshoe from 'gumshoe';
import SmoothScroll from 'smooth-scroll';

import Select from './Select';
import { TOGGLE_EVT } from './Toggle';

import { nodeListToArray, getValueFromResponsiveMap } from './Utils';

function getOffset(nav) {
  if (!nav) {
    return 90;
  }

  const currentOffset =
    JSON.parse(nav.getAttribute('data-scroll-offset')) || 90;

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

    this._handleSetSelectItem = this._handleSetSelectItem.bind(this);
    this._handleSetSectionInSelect = this._handleSetSectionInSelect.bind(this);

    this.scrollSpies = [];
    this.selects = {};
    this._init();

    return this;
  }

  _init() {
    this.config.callback = this._handleSetSelectItem;

    const navs = nodeListToArray(document.querySelectorAll('[data-gumshoe]'));

    navs.forEach(nav => {
      const target = nav.getAttribute('data-gumshoe-select');
      if (target) {
        const select = new Select(target);
        this.selects[target] = select.elements[0];

        this.selects[target].passedElement.addEventListener(
          'choice',
          this._handleSetSectionInSelect,
        );
      }
    });

    this.smoothScroll = new SmoothScroll();

    this.scrollSpies = gumshoe.init(this.config);

    document.addEventListener(TOGGLE_EVT, this._handleResize);
  }

  _handleResize() { // eslint-disable-line
    gumshoe.setDistances();
  }

  _handleSetSelectItem(item) {
    if (!item) {
      return;
    }

    const selectSelector = item.nav
      .closest('[data-gumshoe-select]')
      .getAttribute('data-gumshoe-select');

    const select = this.selects[selectSelector];
    const value = item.target.id;

    if (!(select.getValue(true) === value)) {
      select.setValueByChoice(value);
    }
  }

  _handleSetSectionInSelect(e) { // eslint-disable-line
    const anchor = document.querySelector(`#${e.detail.choice.value}`);
    const offset = this.config.offset(e.srcElement);

    this.smoothScroll.animateScroll(anchor, null, { offset });
  }

  update() {
    this.destroy();
    this._init();
  }

  destroy() { // eslint-disable-line
    gumshoe.destroy();

    Object.keys(this.selects).forEach(key => {
      this.selects[key].destroy();
    });
  }
}
