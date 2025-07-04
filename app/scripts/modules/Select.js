import Choices from 'choices.js';
import { nodeListToArray } from './Utils';

let lang = 'sk';

const texts = {
  sk: {
    loadingText: 'Nahrávam...',
    noResultsText: 'Žiadne výsledky',
    noChoicesText: 'Na výber nie sú žiadne možnosti',
    itemSelectText: 'Kliknutím vyberte',
    addItemText: value => `Stlačením ENTER pridajte <b>"${value}"</b>`,
    maxItemText: maxItemCount => `Iba ${maxItemCount} hodnôt môže byť pridaných.`,
  },
  cz: {
    loadingText: 'Nahrávám...',
    noResultsText: 'Žádné výsledky',
    noChoicesText: 'Na výběr nejsou žádné možnosti',
    itemSelectText: 'Kliknutím vyberte',
    addItemText: value => `Stlačením ENTER přidejte <b>"${value}"</b>`,
    maxItemText: maxItemCount => `Jenom ${maxItemCount} hodnot může být přidaných.`,
  },
};

const defaultConfig = {
  searchEnabled: false,
  searchChoices: false,
  shouldSort: false,
  itemSelectText: 'Press to select',
  allowHTML: true,
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

const STORE_ICONS = new Map([
  ['martinus', { icon: 'fak fa-martinus', color: 'text-color-primary' }],
  ['partner', { icon: 'far fa-map-marker-alt', color: 'text-color-yellow' }],
]);

const storeIcon = type => {
  const iconConfig = STORE_ICONS.get(type) ?? null;
  if (!iconConfig) return '';

  return `<i class="${iconConfig.icon} ${iconConfig.color} fa-fw mr-tiny flex-shrink-0"></i>`;
};

const storeStatus = (customProperties, placeholder) => {
  if (placeholder) {
    return '';
  }

  const { status, statusText = '' } = customProperties;
  const statusClass = status ? `status status--${status} text-color-${status}` : '';

  return `<div class="${statusClass} text-right text-small">${statusText}</div>`;
};

const storeListTemplate = ({ label, customProperties, placeholder }) => {
  const icon = storeIcon(customProperties.type);

  const statusText = storeStatus(customProperties, placeholder);

  return `
  <div style="max-width: 100%;" class="d-flex align-items-center text-medium justify-content-between">
    <div class="d-flex align-items-center text-color-grey-dark text-left" style="max-width: 66%;">${icon}${label}</div>
    ${statusText}
  </div>
  `;
};

const storeListChoice = (
  {
    customProperties, disabled, label, id, value, placeholder
  },
  config,
) => {
  const statusText = storeStatus(customProperties, placeholder);
  const icon = storeIcon(customProperties.type);

  return `
  <div style="max-width: 100%;" class="align-items-center justify-content-between ${config.classNames.item} ${config.classNames.itemChoice} ${disabled ? config.classNames.itemDisabled : config.classNames.itemSelectable}" data-select-text="${config.itemSelectText}" data-choice ${disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${id}" data-value="${value}">
    <div class="d-flex align-items-center text-color-black text-left text-regular" style="max-width: 66%;">${icon}${label}</div>
    ${statusText}
  </div>
  `;
};

const storeListChoices = config => `
  <div class="${config.classNames.list}" dir="ltr" role="listbox" style="min-width:270px; max-height: none;">
  </div>
`;

const imageListTemplate = ({ label, customProperties }) => `
  <div class="d-flex align-items-center text-medium mb-none">
      ${customProperties && customProperties.image ? `<div class="img--rounded mr-small" style="width: 40px; height: 27px; background: url(${customProperties.image}) no-repeat center; background-size: cover"></div>` : ''}
      <div class="flex-1 mr-small">
        <span>${label}</span>
      </div>
      ${customProperties && customProperties.price ? `<span class="text-vam text-color-grey">${customProperties.price}</span>` : ''}
    </div>`;

const imageListChoice = (
  {
    customProperties, disabled, label, id, value
  },
  config,
) => `
  <div class="text-left ${config.classNames.item} ${config.classNames.itemChoice} ${disabled ? config.classNames.itemDisabled : config.classNames.itemSelectable}" data-select-text="${config.itemSelectText}" data-choice ${disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${id}" data-value="${value}">
    <div class="d-flex align-items-center mb-none">
      ${customProperties && customProperties.image ? `<div class="img--rounded mr-small" style="width: 80px; height: 80px; background: url(${customProperties.image}) no-repeat center; background-size: cover"></div>` : ''}
      <div class="flex-1">
        <span>${label}</span><br>
        ${customProperties && customProperties.price ? `<span class="text-vam text-color-grey">${customProperties.price}</span>` : ''}
      </div>
    </div>
  </div>
  `;

const wideImageListTemplate = ({ label }, width) => `
  <div class="mb-none" style="width:${width}">
    <div class="mb-none">
      <span>${label}</span>
    </div>
  </div>`;

const wideImageListChoice = (
  {
    customProperties, disabled, label, id, value
  },
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

const choiceListTemplate = (width = 'none', config = {}) => `
  <div class="${config.classNames.list}" dir="ltr" role="listbox" style="width:${width}"></div>
`;

function getTemplates(template, select, config) {
  let templates = {};
  if (select.hasAttribute('data-select-store')) {
    templates = {
      ...{ templates },
      item: (classNames, data) => template(storeListTemplate(data)),
      choice: (classNames, data) => template(storeListChoice(data, config)),
      choiceList: () => template(storeListChoices(config)),
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
      item: (classNames, data) => template(
        wideImageListTemplate(
          data,
          select.getAttribute('data-select-width') ?? 'none'
        ),
      ),
      choice: (classNames, data) => template(wideImageListChoice(data, config)),
    };
  }

  if (select.hasAttribute('data-select-dropdown-width')) {
    templates = {
      ...{ templates },
      choiceList: () => template(
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
  constructor(selector = '.js-select', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...texts[lang], ...config };

    this.abortController = new AbortController();

    this._onShowDropdown = this._onShowDropdown.bind(this);
    this._onHideDropdown = this._onHideDropdown.bind(this);

    this.elements = this._initialize();
  }

  static setLang = (newLang) => {
    lang = newLang;
  }

  _onShowDropdown = (e) => {
    const container = e.target.parentNode.parentNode;

    if (!container) return;

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

  _onHideDropdown = (e) => {
    const dropdown = e.target.parentNode.nextSibling;
    const container = e.target.parentNode.parentNode;

    const handleTransitionEnd = (evt) => {
      if (evt.propertyName === 'visibility') {
        container.classList.remove('is-flipped');
        container.classList.remove('is-flipped-helper');

        dropdown.removeEventListener('transitionend', handleTransitionEnd);
      }
    };

    if (container.classList.contains('is-flipped-helper')) {
      container.classList.add('is-flipped');

      dropdown.addEventListener('transitionend', handleTransitionEnd);
    }
  }

  _initialize() {
    const selects = [...document.querySelectorAll(this.selector)];

    return selects.map((select, index) => {
      const config = { ...this.config };

      if (select.hasAttribute('data-is-initialized')) {
        return this.elements[index];
      }

      if (
        (select.multiple && config.removeItemButton === undefined)
        || select.hasAttribute('data-clearable')
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

      config.callbackOnCreateTemplates = template => getTemplates(template, select, config);

      const choice = new Choices(select, config);

      choice.containerOuter.element.classList.add('select');

      // disable input if [disabled] or '.disabled'
      if (select.disabled || select.classList.contains('disabled')) {
        choice.disable();
      }

      const classes = nodeListToArray(select.classList);
      const unwantedClasses = ['choices__input', 'is-hidden', 'js-select'];

      // add classes from select to choices
      classes
        .filter(className => !unwantedClasses.includes(className))
        .forEach(className => choice.containerOuter.element.classList.add(className));

      if (config.searchEnabled) {
        const input = choice.dropdown.element.querySelector('input');

        if (input) {
          input.classList.add('input');
          input.classList.add('input--small');
          input.classList.add('input--search');
        }
      }

      select.addEventListener('showDropdown', this._onShowDropdown, {
        signal: this.abortController.signal,
      });
      select.addEventListener('hideDropdown', this._onHideDropdown, {
        signal: this.abortController.signal,
      });

      select.setAttribute('data-is-initialized', '');

      return choice;
    });
  }

  update() {
    this._initialize();
  }

  destroy() {
    this.abortController.abort();
  }
}
