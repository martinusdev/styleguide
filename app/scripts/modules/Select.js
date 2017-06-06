import Choices from 'choices.js';

const defaultConfig = {};

export default class Select {
  constructor(selector = '.js-select', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this._onShowDropdown = this._onShowDropdown.bind(this);
    this._onHideDropdown = this._onHideDropdown.bind(this);

    return this._init();
  }

  // eslint-disable-next-line class-methods-use-this
  _onShowDropdown(e) {
    const container = e.target.parentNode.parentNode;
    if (container.classList.contains('is-flipped')) {
      container.classList.add('is-flipped-helper');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _onHideDropdown(e) {
    const dropdown = e.target.parentNode.nextSibling;
    const container = e.target.parentNode.parentNode;

    const _trnasitionEndHandler = evt => {
      if (evt.propertyName === 'visibility') {
        container.classList.remove('is-flipped');
        container.classList.remove('is-flipped-helper');

        dropdown.removeEventListener('transitionend', _trnasitionEndHandler);
      }
    };

    if (container.classList.contains('is-flipped-helper')) {
      container.classList.add('is-flipped');

      dropdown.addEventListener('transitionend', _trnasitionEndHandler);
    }
  }

  _init() {
    // this should work with babel, but it's not
    // const selects = [...document.querySelectorAll(this.selector)];

    const selects = Array.prototype.slice.call(
      document.querySelectorAll(this.selector),
    );

    return selects.map(select => {
      const config = { ...this.config };

      if (
        (select.multiple && config.removeItemButton === undefined) ||
        select.hasAttribute('data-clearable')
      ) {
        config.removeItemButton = true;
      }

      const choice = new Choices(select, config);

      choice.containerOuter.classList.add('select');

      // disable input if [disabled] or '.disabled'
      if (select.disabled || select.classList.contains('disabled')) {
        choice.disable();
      }

      if (select.classList.contains('is-error')) {
        choice.containerOuter.classList.add('is-error');
      }

      if (select.classList.contains('select--large')) {
        choice.containerOuter.classList.add('select--large');
      }

      if (select.classList.contains('select--small')) {
        choice.containerOuter.classList.add('select--small');
      }

      select.addEventListener('showDropdown', this._onShowDropdown);
      select.addEventListener('hideDropdown', this._onHideDropdown);

      return choice;
    });
  }
}
