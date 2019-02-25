// ---------------------------------------------------
// Autocomplete
// module for handling autocomplete
// ---------------------------------------------------

import accessibleAutocomplete from 'accessible-autocomplete';

const texts = {
  sk: {
    placeholder: 'Začnite písať...',
    noResults: 'Nenašli sme žiadne výsledky.',
    selectedOption: (selectedOption, length, index) =>
      `Možnosť ${selectedOption} (${index + 1} z ${length}) je označená.`,
    queryTooShort: minQueryLength =>
      `Minimálny počet znakov je ${minQueryLength}`,
    results: [
      'výsledok zobrazený',
      'výsledky zobrazené',
      'výsledkov zobrazených',
    ],
  },
  cz: {
    placeholder: 'Začněte psáť...',
    noResults: 'Nenašli sme žádné výsledky.',
    selectedOption: (selectedOption, length, index) =>
      `Možnost ${selectedOption} (${index + 1} z ${length}) je označena.`,
    queryTooShort: minQueryLength =>
      `Minimální počet znaků je ${minQueryLength}`,
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
    autoselect: false,
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
};

const defaultTemplates = {
  author: {
    inputValue: () => '', // set value of input onConfirm
    suggestion: value => `
      <div class="row">
        <div class="col--3 align-self-middle pr-none">
          <div class="author-photo no-pad">
            <div class="portrait" style="background-image: url('${value.image}');"></div>
          </div>
        </div>
        <div class="col--9 align-self-middle">
          <div class="h4 text-bold mb-small">${value.name}</div>
          <p class="mb-none">${value.description}</p>
        </div>
      </div>
    `,
  },
  book: {
    inputValue: () => '', // set value of input onConfirm
    suggestion: value => `
      <div class="row">
        <div class="col--3 align-self-middle">
          <div class="thumbnail thumbnail--book">
            <div class="thumbnail__img-wrap">
              <img class="img img--fluid" src="${value.image}" alt="${value.name}">
            </div>
          </div>
        </div>
        <div class="col--9 align-self-middle">
          <div class="h4 text-bold mb-small">${value.name}</div>
          <p class="mb-none">${value.description}</p>
        </div>
      </div>
    `,
  },
  collection: {
    inputValue: () => '', // set value of input onConfirm
    suggestion: value => `
      <div class="row">
        <div class="col--3 align-self-middle">
        <div class="product__cover collection">
          <div class="thumbnail thumbnail--book">
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
        <div class="col--9 align-self-middle">
          <div class="h4 text-bold mb-small">${value.name}</div>
          <p class="mb-none">${value.description}</p>
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

    this.init();

    this.element.Autocomplete = this;

    return this;
  }

  init() {
    const type = this.config.templateType;

    this.instance = accessibleAutocomplete({
      element: this.element,
      templates: this.templates[type] || undefined,
      source: (query, populateResults) => {
        // this can be ajax call or default values
        const results = this.config.results;
        const regex = new RegExp(query, 'i');
        const filteredResults = results.filter(result => {
          const raw = (typeof result === 'object' && result.raw) || result;
          return raw.match(regex);
        });
        populateResults(filteredResults);
      },
      // i18n
      placeholder: texts[this.lang].placeholder,
      tNoResults: () => texts[this.lang].noResults,
      tStatusQueryTooShort: texts[this.lang].queryTooShort,
      tStatusNoResults: () => texts[this.lang].noResults,
      tStatusSelectedOption: texts[this.lang].selectedOption,
      tStatusResults: (length, contentSelectedOption) => {
        const res = texts[this.lang].results;
        let message = res[0];
        if (length > 1 && length < 5) {
          message = res[1];
        } else if (length >= 5) {
          message = res[2];
        }

        return `<span>${length} ${message}. ${contentSelectedOption}</span>`;
      },
      ...this.autocompleteConfig,
    });
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
