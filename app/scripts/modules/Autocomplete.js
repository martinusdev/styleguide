// ---------------------------------------------------
// Autocomplete
// module for handling autocomplete
// ---------------------------------------------------

import accessibleAutocomplete from 'accessible-autocomplete';

const texts = {
  sk: {
    placeholder: 'Začnite písať...',
    noResults: 'Nenašli sme žiadne výsledky.',
    selectedOption: (selectedOption, length, index) => `Možnosť ${selectedOption} (${index + 1} z ${length}) je označená.`,
    queryTooShort: minQueryLength => `Minimálny počet znakov je ${minQueryLength}`,
    results: [
      'výsledok zobrazený',
      'výsledky zobrazené',
      'výsledkov zobrazených',
    ],
  },
  cz: {
    placeholder: 'Začněte psát...',
    noResults: 'Nenašli sme žádné výsledky.',
    selectedOption: (selectedOption, length, index) => `Možnost ${selectedOption} (${index + 1} z ${length}) je označena.`,
    queryTooShort: minQueryLength => `Minimální počet znaků je ${minQueryLength}`,
    results: [
      'výsledek zobrazen',
      'výsledky zobrazeny',
      'výsledků zobrazených',
    ],
  },
};

const defaultConfig = {
  /** docs at https://github.com/alphagov/accessible-autocomplete */
  autocompleteOptions: {
    autoselect: true,
    defaultValue: undefined,
    displayMenu: 'overlay',
    confirmOnBlur: false,
    minLength: 0,
    name: 'input-autocomplete',
    showNoOptionsFound: true,
    onConfirm: () => {},
  },
  templateType: null,
  results: [],
  debounceSource: () => {},
  debounceInterval: 200,
};

const defaultTemplates = {
  author: {
    inputValue: () => '', // set value of input onConfirm
    suggestion: value => `
      <div class="d-flex">
        <div class="flex-shrinkable align-self-middle pr-none mr-small">
          <div class="author-photo no-pad">
            <div class="portrait portrait--medium" style="background-image: url('${value.image}');"></div>
          </div>
        </div>
        <div class="flex-fill align-self-middle">
          <div class="text-semibold text-size-regular">${value.name}</div>
          <p class="mb-none text-color-grey">${value.description}</p>
        </div>
      </div>
    `,
  },
  item: {
    inputValue: () => '', // set value of input onConfirm
    suggestion: value => `
      <div class="d-flex">
        <div class="flex-shrinkable mr-small align-self-middle">
          <div class="thumbnail thumbnail--book thumbnail--medium">
            <div class="thumbnail__img-wrap">
              <img class="img" src="${value.image}" alt="${value.name}">
            </div>
          </div>
        </div>
        <div class="flex-fill mr-small align-self-middle">
          <div class="text-size-regular text-semibold">${value.name}</div>
          <p class="mb-none text-color-grey">${value.description}</p>
        </div>
        <div class="flex-shrinkable align-self-middle">
          <div class="text-bold">${value.price}</div>
        </div>
      </div>
    `,
  },
  book: {
    inputValue: () => '', // set value of input onConfirm
    suggestion: value => `
      <div class="d-flex">
        <div class="flex-shrinkable mr-small align-self-middle">
          <div class="thumbnail thumbnail--book thumbnail--medium">
            <div class="thumbnail__img-wrap">
              <img class="img" src="${value.image}" alt="${value.name}">
            </div>
          </div>
        </div>
        <div class="flex-fill align-self-middle">
          <div class="text-size-regular text-semibold">${value.name}</div>
          <p class="mb-none text-color-grey">${value.description}</p>
        </div>
      </div>
    `,
  },
  collection: {
    inputValue: () => '', // set value of input onConfirm
    suggestion: value => `
      <div class="d-flex">
        <div class="flex-shrinkable mr-small align-self-middle">
        <div class="product__cover collection">
          <div class="thumbnail thumbnail--book thumbnail--medium">
            ${value.images
    .map(image => `
                <div class="thumbnail__img-wrap">
                  <img class="img" alt="" src="${image}">
                </div>
              `)
    .join('')}
          </div>
        </div>
        </div>
        <div class="flex-fill align-self-middle">
          <div class="text-size-regular text-semibold">${value.name}</div>
          <p class="mb-none text-color-grey">${value.description}</p>
        </div>
      </div>
    `,
  },
  text: {
    inputValue: () => '', // set value of input onConfirm
    suggestion: value => `
      <div class="row">
        <div class="col--12 align-self-middle">
          <p class="mb-none">${value.name}</p>
        </div>
      </div>
    `,
  },
};

export default class Autocomplete {
  constructor(element, config) {
    this.element = element;
    this.config = { ...defaultConfig, ...config };
    this.autocompleteConfig = {
      ...defaultConfig.autocompleteOptions,
      ...config.autocompleteOptions,
    };
    this.lang = (window.myApp && window.myApp.selectLanguage) || 'sk';

    this.templates = defaultTemplates;

    this.timeout = null;

    this.init();

    this.element.Autocomplete = this;
  }

  init() {
    const type = this.config.templateType;

    this.instance = accessibleAutocomplete({
      element: this.element,
      templates: this.templates[type] || undefined,
      source: (query, populateResults) => {
        this.source(query, populateResults);
      },
      // i18n
      placeholder: texts[this.lang].placeholder,
      tNoResults: () => texts[this.lang].noResults,
      tStatusQueryTooShort: texts[this.lang].queryTooShort,
      tStatusNoResults: () => texts[this.lang].noResults,
      tStatusSelectedOption: texts[this.lang].selectedOption,
      tStatusResults: (length, contentSelectedOption) => {
        const res = texts[this.lang].results;

        const [message1, message2, message3] = res;

        let message = message1;
        if (length > 1 && length < 5) {
          message = message2;
        } else if (length >= 5) {
          message = message3;
        }

        return `<span>${length} ${message}. ${contentSelectedOption}</span>`;
      },
      ...this.autocompleteConfig,
    });
  }

  source(query, populateResults) {
    if (this.config.debounceSource) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => this.config.debounceSource(query, populateResults),
        this.config.debounceInterval,
      );
    } else {
      const { results } = this.config;
      const regex = new RegExp(query, 'i');
      const filteredResults = results.filter(result => {
        const raw = (typeof result === 'object' && result.raw) || result;
        return raw.match(regex);
      });
      populateResults(filteredResults);
    }
  }

  static getInstance(el) {
    return el && el.Autocomplete ? el.Autocomplete : null;
  }

  destroy() {
    this.instance = null;
  }

  update() {
    this.destroy();
    this.init();
  }
}
