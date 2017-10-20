const defaultConfig = {
  step: 1,
  targetDataAttribute: 'data-controls',
};

export default class NumberSpinner {
  constructor(selector = 'data-number-spinner', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this._onClick = this._onClick.bind(this);

    this.sliders = [];

    return this._init();
  }

  _init() {
    const spinners = Array.prototype.slice.call(
      document.querySelectorAll(`[${this.selector}]`),
    );

    this.spinners = spinners.map(spinner => {
      spinner.addEventListener('click', this._onClick);
      return spinner;
    });

    return this.spinners;
  }

  _onClick(e) {
    const button = e.currentTarget;
    const action = button.getAttribute(this.selector);
    const input = document.querySelector(
      button.getAttribute(this.config.targetDataAttribute),
    );

    let value = parseInt(input.value, 10);
    if (isNaN(value)) {
      value = 0;
    }

    const step = input.getAttribute('step')
      ? parseInt(input.getAttribute('step'), 10)
      : this.config.step;

    if (!input || !action) {
      return;
    }

    const changeEvent = new CustomEvent('change');

    if (action === 'increase') {
      const max = parseInt(input.getAttribute('max'), 10);
      let newValue = value + step;
      if (!isNaN(max) && newValue > max) {
        newValue = max;
      }
      input.value = newValue;
    }

    if (action === 'decrease') {
      const min = parseInt(input.getAttribute('min'), 10);
      let newValue = value - step;
      if (!isNaN(min) && newValue < min) {
        newValue = min;
      }
      input.value = newValue;
    }

    input.dispatchEvent(changeEvent);
  }

  destroy() {
    this.spinners.forEach(spinner => {
      spinner.removeEventListener(this._onClick);
    });
  }

  update() {
    this.destroy();
    this._init();
  }
}
