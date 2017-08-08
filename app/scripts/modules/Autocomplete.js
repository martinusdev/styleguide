import Choices from 'choices.js';

const defaultConfig = {
  shouldSort: false,
};

export default class Autocomplete {
  constructor(selector = '.js-autocomplete', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    return this._init();
  }

  _init() {
    const selectsAutocomplete = Array.prototype.slice.call(
      document.querySelectorAll(this.selector),
    );

    return selectsAutocomplete.map(select => {
      const config = { ...this.config };
      const choice = new Choices(select, config);

      return choice;
    });
  }
}
