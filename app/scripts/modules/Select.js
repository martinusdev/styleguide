import Choices from 'choices.js';

const defaultConfig = {
  search: false,
  searchEnabled: false,
  searchChoices: false,
  shouldSort: false,
};

const productSelectTemplate = data =>
  `
  <div class="bar no-mrg-bottom">
    <div class="bar__item bar__item--fill">
      <p class="text-size-medium text-left text-semibold">${data.label}</p>
      ${data.customProperties.delivery ? `
        <p class="text-size-small text-color-grey text-left">${data.customProperties.delivery}</p>
      ` : ''}
    </div>
    ${data.customProperties.price ? `
      <div class="bar__item">
        <p class="text-semibold">${data.customProperties.price}</p>
      </div>
    ` : ''}
  </div>
`;

const productSelectChoice = data =>
  `
  <div data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
    ${data.customProperties.itemLabel}
  </div>
  `;

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

      if (select.hasAttribute('data-select-product')) {
        config.callbackOnCreateTemplates = template => ({
          item: data => template(productSelectTemplate(data)),
          choice: data => template(productSelectChoice(data)),
        });
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

      if (select.classList.contains('select--inline')) {
        choice.containerOuter.classList.add('select--inline');
      }

      if (select.classList.contains('select--clean')) {
        choice.containerOuter.classList.add('select--clean');
      }

      select.addEventListener('showDropdown', this._onShowDropdown);
      select.addEventListener('hideDropdown', this._onHideDropdown);

      return choice;
    });
  }
}
