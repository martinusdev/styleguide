import { TOGGLE_EVT, isToggled } from './Toggle';

const defaultConfig = {
  searchSelector: '.header-search__search input',
};

export default class Header {
  constructor(selector = '.header', config = {}) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this.header = null;

    this._focusSearchOnSearchActive = this._focusSearchOnSearchActive.bind(
      this,
    );

    this._init();
  }

  _init() {
    this.header = document.querySelector(this.config.selector);

    if (!this.header) {
      return;
    }

    this.searchInput = this.header.querySelector(this.config.searchSelector);

    if (this.searchInput) {
      document.addEventListener(TOGGLE_EVT, this._focusSearchOnSearchActive);
    }
  }

  _focusSearchOnSearchActive(e) { // eslint-disable-line
    const { target } = e.detail;

    if (target === this.header && isToggled(target, 'is-search-active')) {
      this.searchInput.focus();
    }
  }

  update() {
    this.destroy();
    this._init();
  }

  destroy() {
    document.removeEventListener(TOGGLE_EVT, this._focusSearchOnSearchActive);
  }
}
