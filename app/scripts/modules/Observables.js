const defaultConfig = {};

export default class Observables {
  constructor(selector = '[data-observe]', config) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this.observables = [];
    this.header = document.querySelector('.header');

    this._init();

    return this;
  }

  destroy() {
    this.observables.forEach(observable => {
      observable.disconnect();
    });
  }

  update() {
    this.destroy();
    this._init();
  }

  _init() {
    this.observables = document.querySelectorAll(this.config.selector);
    if (this.observables) {
      const MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;

      const bookHeaderClass = 'header-book-detail';
      // create instance
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          // book-detail observer
          // if book detail sticky bar has fixed position
          // show a special header with book details
          if (
            mutation.type === 'attributes' &&
            mutation.target.hasAttribute('data-observe-book-detail')
          ) {
            const isSpecial = this.header.classList.contains(bookHeaderClass);
            const isFixed = mutation.target.style.position === 'fixed';
            if (isFixed) {
              if (!isSpecial) {
                this.header.classList.add(bookHeaderClass);
              }
            } else if (isSpecial) {
              this.header.classList.remove(bookHeaderClass);
            }
          }
        });
      });
      // config for observer
      const config = {
        attributes: true,
      };
      // observe all the observable elements
      this.observables.forEach(observable => {
        observer.observe(observable, config);
      });
    }
  }
}
