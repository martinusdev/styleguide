import { closestPolyfill } from './Utils';
import { TOGGLE_EVT } from './Toggle';

closestPolyfill();

const defaultConfig = {
  dataInteractive: 'data-dropdown-interactive',
};

const isActive = el =>
  el.classList.contains('is-active') ||
  el.getAttribute('aria-expanded') === 'true';

export default class Dropdown {
  constructor(selector = '[data-dropdown]', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this._onToggle = this._onToggle.bind(this);
    this._onClick = this._onClick.bind(this);

    this.dropdowns = [];
    this.target = null;
    this.trigger = null;
    this._init();

    return this;
  }

  destroy() {
    this.dropdowns.forEach(dropdown => {
      dropdown.removeEventListener(TOGGLE_EVT, this._onToggle);
    });

    this._removeListeners();
  }

  update() {
    this.destroy();
    this._init();
  }

  _init() {
    this.dropdowns.push.apply(
      this.dropdowns,
      document.querySelectorAll(this.selector),
    );

    this.dropdowns.forEach(dropdown => {
      dropdown.addEventListener(TOGGLE_EVT, this._onToggle);
    });
  }

  _onToggle(e) {
    this.target = e.detail.target;
    this.trigger = e.detail.trigger;

    // attach events only if dropdown is open
    if (isActive(this.target)) {
      this._addListeners();
    }
  }

  _onClick(e) {
    if (this.trigger !== e.target && !this.trigger.contains(e.target)) {
      if (
        !this.target.hasAttribute(this.config.dataInteractive) ||
        !this.target.contains(e.target)
      ) {
        window.myApp.toggles.doToggle(this.trigger);
        window.myApp.toggles.doToggle(this.target);

        this._removeListeners();
      }
    } else {
      this._removeListeners();
    }
  }

  _addListeners() {
    document.addEventListener('click', this._onClick, true);
  }

  _removeListeners() {
    document.removeEventListener('click', this._onClick, true);
  }
}
