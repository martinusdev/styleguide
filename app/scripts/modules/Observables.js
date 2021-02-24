const defaultConfig = {
  observerConfig: {
    attributes: true,
    characterData: true,
    childList: true,
  },
};

export default class Observables {
  constructor(selector, callback, config) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };
    this.observerConfig = {
      ...defaultConfig.observerConfig,
      ...config.observerConfig,
    };

    this.mutationCallback = callback;
    this.observables = [];
    this.observer = null;

    this._init();

    return this;
  }

  destroy() {
    this.observer.disconnect();
  }

  update() {
    this.destroy();
    this._init();
  }

  _init() {
    this.observables = document.querySelectorAll(this.config.selector);
    if (this.observables) {
      const MutationObserver = window.MutationObserver
        || window.WebKitMutationObserver
        || window.MozMutationObserver;

      // create instance
      this.observer = new MutationObserver(this.mutationCallback);
      // observe all the observable elements
      this.observables.forEach(observable => {
        this.observer.observe(observable, this.observerConfig);
      });
    }
  }
}
