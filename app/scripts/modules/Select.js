import Choices from 'choices.js';

const defaultConfig = {
  search: false,
  searchEnabled: false,
  searchChoices: false,
  shouldSort: false,
  itemSelectText: 'Press to select',
  classNames: {
    containerOuter: 'choices',
    containerInner: 'choices__inner',
    input: 'choices__input',
    inputCloned: 'choices__input--cloned',
    list: 'choices__list',
    listItems: 'choices__list--multiple',
    listSingle: 'choices__list--single',
    listDropdown: 'choices__list--dropdown',
    item: 'choices__item',
    itemSelectable: 'choices__item--selectable',
    itemDisabled: 'choices__item--disabled',
    itemChoice: 'choices__item--choice',
    group: 'choices__group',
    groupHeading: 'choices__heading',
    button: 'choices__button',
    activeState: 'is-active',
    focusState: 'is-focused',
    openState: 'is-open',
    disabledState: 'is-disabled',
    highlightedState: 'is-highlighted',
    hiddenState: 'is-hidden',
    flippedState: 'is-flipped',
    loadingState: 'is-loading',
  },
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
  </div>`;

const productSelectChoice = (data, config) => `
  <div class="${config.classNames.item} ${config.classNames.itemChoice} ${data.disabled ? config.classNames.itemDisabled : config.classNames.itemSelectable}" data-select-text="${config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
    <div class="bar no-mrg-bottom align-items-justify">
      <div class="bar__item">${data.label}</div>
      <div class="bar__item">${data.customProperties.price}</div>
    </div>
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

      if (select.hasAttribute('placeholder')) {
        config.placeholderValue = select.getAttribute('placeholder');
      }

      if (select.hasAttribute('data-select-product')) {
        config.callbackOnCreateTemplates = template => ({
          item: data => template(productSelectTemplate(data)),
          choice: data => template(productSelectChoice(data, this.config)),
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

      if (select.classList.contains('select--ghost')) {
        choice.containerOuter.classList.add('select--ghost');
      }

      if (select.classList.contains('select--input')) {
        choice.containerOuter.classList.add('select--input');
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
