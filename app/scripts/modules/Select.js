import Choices
  from './../../../node_modules/choices.js/assets/scripts/dist/choices';

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

const storeListTemplate = ({ label, customProperties }) => {
  const status = customProperties && customProperties.status
    ? `status status--${customProperties.status}`
    : '';

  return `
  <div class="text-left">
    <span class="text-vam ${status} text-color-grey text-size-medium text-ellipsis">${label}</span>
  </div>`;
};

const storeListChoice = (
  { customProperties, disabled, label, id, value },
  config,
) => {
  const status = customProperties && customProperties.status
    ? `status status--${customProperties.status}`
    : '';

  return `
  <div class="text-left ${config.classNames.item} ${config.classNames.itemChoice} ${disabled ? config.classNames.itemDisabled : config.classNames.itemSelectable}" data-select-text="${config.itemSelectText}" data-choice ${disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${id}" data-value="${value}">
    <span class="text-vam ${status} text-color-grey text-regular text-ellipsis">${label}</span>
    ${customProperties && customProperties.availability ? `<span class="text-vam text-color-grey">(${customProperties.availability})</span>` : ''}
  </div>
  `;
};

const choiceListTemplate = (width = 'none', config) => `
  <div class="${config.classNames.list}" dir="ltr" role="listbox" style="width:${width}"></div>
`;

function getTemplates(template, select, config) {
  let templates = {};
  if (select.hasAttribute('data-select-product')) {
    templates = {
      ...{ templates },
      item: data => template(productSelectTemplate(data)),
      choice: data => template(productSelectChoice(data, config)),
    };
  }

  if (select.hasAttribute('data-select-store')) {
    templates = {
      ...{ templates },
      item: data => template(storeListTemplate(data)),
      choice: data => template(storeListChoice(data, config)),
    };
  }

  if (select.hasAttribute('data-select-dropdown-width')) {
    templates = {
      ...{ templates },
      choiceList: () =>
        template(
          choiceListTemplate(
            select.getAttribute('data-select-dropdown-width'),
            config,
          ),
        ),
    };
  }

  return templates;
}

export default class Select {
  constructor(selector = '.js-select', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this._onShowDropdown = this._onShowDropdown.bind(this);
    this._onHideDropdown = this._onHideDropdown.bind(this);

    this.elements = this._init();

    return this;
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

    return selects.map((select, index) => {
      const config = { ...this.config };

      if (select.hasAttribute('data-is-initialized')) {
        return this.elements[index];
      }

      if (
        (select.multiple && config.removeItemButton === undefined) ||
        select.hasAttribute('data-clearable')
      ) {
        config.removeItemButton = true;
      }

      if (select.hasAttribute('placeholder')) {
        config.placeholderValue = select.getAttribute('placeholder');
      }

      if (select.hasAttribute('data-autocomplete')) {
        config.searchPlaceholderValue = select.getAttribute('placeholder');
        config.searchEnabled = true;
        config.searchChoices = true;
        config.shouldSort = true;
      }

      config.callbackOnCreateTemplates = template =>
        getTemplates(template, select, this.config);

      const choice = new Choices(select, config);

      choice.containerOuter.classList.add('select');

      // disable input if [disabled] or '.disabled'
      if (select.disabled || select.classList.contains('disabled')) {
        choice.disable();
      }

      const classes = select.classList;
      const unwantedClasses = ['choices__input', 'is-hidden', 'js-select'];
      classes.forEach(className => {
        if (!unwantedClasses.includes(className)) {
          choice.containerOuter.classList.add(className);
        }
      });

      select.addEventListener('showDropdown', this._onShowDropdown);
      select.addEventListener('hideDropdown', this._onHideDropdown);

      select.setAttribute('data-is-initialized', '');

      return choice;
    });
  }

  update() {
    this._init();
  }
}
