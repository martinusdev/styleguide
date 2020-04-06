import Choices
  from './../../../node_modules/choices.js/public/assets/scripts/choices';
import { nodeListToArray } from './Utils';
// import Autocomplete from './Autocomplete';

let lang = 'sk';

const texts = {
  sk: {
    loadingText: 'Nahrávam...',
    noResultsText: 'Žiadne výsledky',
    noChoicesText: 'Na výber nie sú žiadne možnosti',
    itemSelectText: 'Kliknutím vyberte',
    addItemText: value => `Stlačením ENTER pridajte <b>"${value}"</b>`,
    maxItemText: maxItemCount =>
      `Iba ${maxItemCount} hodnôt môže byť pridaných.`,
  },
  cz: {
    loadingText: 'Nahrávam...',
    noResultsText: 'Žádné výsledky',
    noChoicesText: 'Na výběr nejsou žádné možnosti',
    itemSelectText: 'Kliknutím vyberte',
    addItemText: value => `Stlačením ENTER přidejte <b>"${value}"</b>`,
    maxItemText: maxItemCount =>
      `Iba ${maxItemCount} hodnot může být přidaných.`,
  },
};

const defaultConfig = {
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

const storeListChoices = config => `
  <div class="${config.classNames.list}" dir="ltr" role="listbox" style="min-width:270px; max-height: none;">
  </div>
`;

const storeListDropdown = config => `
  <div class="${config.classNames.list} ${config.classNames.listDropdown}" aria-expanded="false">
    <div class="text-left text-size-small card mb-none bg-secondary">
        <div class="card__content--condensed">
            <span class="text-vam status status--success text-color-grey text-space-right-tiny">na sklade</span>
            <span class="text-vam status status--orange text-color-grey text-space-right-tiny">posledné kusy</span>
            <span class="text-vam status status--grey text-color-grey text-space-right-tiny">nedostupné</span>
        </div>
    </div>
  </div>
`;

const imageListTemplate = ({ label, customProperties }) => `
  <div class="bar mb-none">
    ${customProperties && customProperties.image ? `<div class="bar__item bar__item--shrinkable"><img class="img--rounded" src="${customProperties.image}"></div>` : ''}
    <div class="bar__item bar__item--fill">
      <span>${label}</span>
    </div>
    <div class="bar__item bar__item--shrinkable text-right">
      ${customProperties && customProperties.price ? `<span class="text-vam text-color-grey">${customProperties.price}</span>` : ''}
    </div>
  </div>`;

const imageListChoice = (
  { customProperties, disabled, label, id, value },
  config,
) => `
  <div class="text-left ${config.classNames.item} ${config.classNames.itemChoice} ${disabled ? config.classNames.itemDisabled : config.classNames.itemSelectable}" data-select-text="${config.itemSelectText}" data-choice ${disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${id}" data-value="${value}">
    <div class="bar mb-none">
      ${customProperties && customProperties.image ? `<div class="bar__item bar__item--shrinkable"><img class="img--rounded" width="40" src="${customProperties.image}"></div>` : ''}
      <div class="bar__item bar__item--fill">
        <span>${label}</span>
      </div>
      <div class="bar__item bar__item--shrinkable text-right">
        ${customProperties && customProperties.price ? `<span class="text-vam text-color-grey">${customProperties.price}</span>` : ''}
      </div>
    </div>
  </div>
  `;

const wideImageListTemplate = ({ label, customProperties }, width) => `
  <div class="mb-none" style="width:${width}">
    <div class="mb-none">
      <span>${label}</span>
    </div>
  </div>`;

const wideImageListChoice = (
  { customProperties, disabled, label, id, value },
  config,
) => `
  <div class="text-left ${config.classNames.item} ${config.classNames.itemChoice} ${disabled ? config.classNames.itemDisabled : config.classNames.itemSelectable}" data-select-text="${config.itemSelectText}" data-choice ${disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${id}" data-value="${value}">
    <div class="mb-none">
      <div class="mb-none">
        <span>${label}</span>
      </div>
      ${customProperties && customProperties.image ? `<div class="mb-none"><img class="img img--rounded" src="${customProperties.image}"></div>` : ''}
    </div>
  </div>
  `;

const choiceListTemplate = (width = 'none', config) => `
  <div class="${config.classNames.list}" dir="ltr" role="listbox" style="width:${width}"></div>
`;

function getTemplates(template, select, config) {
  let templates = {};
  if (select.hasAttribute('data-select-product')) {
    templates = {
      ...{ templates },
      item: (classNames, data) => template(productSelectTemplate(data)),
      choice: (classNames, data) => template(productSelectChoice(data, config)),
    };
  }

  if (select.hasAttribute('data-select-store')) {
    templates = {
      ...{ templates },
      item: (classNames, data) => template(storeListTemplate(data)),
      choice: (classNames, data) => template(storeListChoice(data, config)),
      choiceList: () => template(storeListChoices(config)),
      dropdown: () => template(storeListDropdown(config)),
    };
  }

  if (select.hasAttribute('data-select-image')) {
    templates = {
      ...{ templates },
      item: (classNames, data) => template(imageListTemplate(data)),
      choice: (classNames, data) => template(imageListChoice(data, config)),
    };
  }

  if (select.hasAttribute('data-select-wide-image')) {
    templates = {
      ...{ templates },
      item: (classNames, data) =>
        template(
          wideImageListTemplate(
            data,
            select.hasAttribute('data-select-width')
              ? select.getAttribute('data-select-width')
              : 'none',
          ),
        ),
      choice: (classNames, data) => template(wideImageListChoice(data, config)),
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
    this.config = { ...defaultConfig, ...texts[lang], ...config };

    this._onShowDropdown = this._onShowDropdown.bind(this);
    this._onHideDropdown = this._onHideDropdown.bind(this);

    this.elements = this._init();

    return this;
  }

  static setLang(newLang) {
    lang = newLang;
  }

  // eslint-disable-next-line class-methods-use-this
  _onShowDropdown(e) {
    const container = e.target.parentNode.parentNode;
    if (container.classList.contains('is-flipped')) {
      container.classList.add('is-flipped-helper');
    }

    const searchInput = container.querySelector(
      '.choices__list--dropdown .choices__input',
    );

    if (searchInput) {
      // search input is not focused by default - perhaps due animation?
      // timeout fixes this issue
      setTimeout(() => {
        searchInput.focus();
      }, 100);
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

      if (select.hasAttribute('data-select-position')) {
        config.position = select.getAttribute('data-select-position');
      }

      if (select.hasAttribute('data-select-small')) {
        config.classNames.item = `${config.classNames.item} ${config.classNames.item}--small`;
      }

      config.callbackOnCreateTemplates = template =>
        getTemplates(template, select, config);

      const choice = new Choices(select, config);

      choice.containerOuter.element.classList.add('select');

      // disable input if [disabled] or '.disabled'
      if (select.disabled || select.classList.contains('disabled')) {
        choice.disable();
      }

      const classes = nodeListToArray(select.classList);
      const unwantedClasses = ['choices__input', 'is-hidden', 'js-select'];
      classes.forEach(className => {
        if (!unwantedClasses.includes(className)) {
          choice.containerOuter.element.classList.add(className);
        }
      });

      if (config.searchEnabled) {
        const input = choice.dropdown.element.querySelector('input');

        if (input) {
          input.classList.add('input');
          input.classList.add('input--search');
        }
      }

      select.addEventListener('showDropdown', this._onShowDropdown);
      select.addEventListener('hideDropdown', this._onHideDropdown);

      select.setAttribute('data-is-initialized', '');

      // if (select.getAttribute('data-autocomplete')) {
      //   const ac = new Autocomplete(select);
      // }

      return choice;
    });
  }

  update() {
    this._init();
  }
}
