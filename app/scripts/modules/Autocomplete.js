// ---------------------------------------------------
// Autocomplete
// module for handling autocomplete
// ---------------------------------------------------

import accessibleAutocomplete from 'accessible-autocomplete';

const defaultConfig = {
  autoselect: false,
  defaultValue: undefined,
  displayMenu: 'overlay',
  confirmOnBlur: false,
  placeholder: 'Začnite písať...',
};

const defaultTemplates = {
  author: {
    inputValue: () => '', // set value of input onConfirm
    suggestion: value => `
      <div class="row">
        <div class="col--3 col--l-5 align-self-middle pr-none">
          <div class="author-photo no-pad">
            <div class="portrait" style="background-image: url('${value.image}');"></div>
          </div>
        </div>
        <div class="col--9 col--l-7 align-self-middle">
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
              <img class="img img--fluid" src="${value.image}" alt="Základy rybolovu pro kluky a holky - Frank Weissert, Jack Thorne a John Tiffany">
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
        <div class="col--fill align-self-middle">
        <div class="product__cover collection">
          <div class="thumbnail thumbnail--book">
            ${value.images.map(image => `
              <div class="thumbnail__img-wrap">
                <img class="img" src="${image}">
              </div>
            `)}
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
          <p class="mb-none">${value.description}</p>
        </div>
      </div>
    `,
  },
};

export default class Autocomplete {
  constructor(element, config) {
    this.element = element;
    this.config = { ...defaultConfig, ...config };

    this.templates = defaultTemplates;

    this.init();

    this.element.Autocomplete = this;

    return this;
  }

  init() {
    const type = this.config.templateType;

    this.instance = accessibleAutocomplete({
      element: this.element,
      templates: this.templates[type] || false,
      ...this.config,
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
