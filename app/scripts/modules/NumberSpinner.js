const defaultConfig = {
  step: 1,
  targetDataAttribute: 'data-controls',
};

export default class NumberSpinner {
  constructor(selector = 'data-number-spinner', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };
    this.spinners = new Set();
    this._init();
  }

  _init = () => {
    const spinners = document.querySelectorAll(`[${this.selector}]`);
    spinners.forEach(spinner => {
      spinner.addEventListener('click', this._onClick);
      this.spinners.add(spinner);
    });
  }

  _onClick = (e) => {
    const button = e.currentTarget;
    const action = button.getAttribute(this.selector);
    const input = document.querySelector(
      button.getAttribute(this.config.targetDataAttribute)
    );

    if (!input || !action) {
      return;
    }

    const currentValue = Number(input.value) || 0;
    const step = Number(input.getAttribute('step')) || this.config.step;

    const newValue = this._calculateNewValue(action, currentValue, step, input);
    if (newValue !== currentValue) {
      input.value = newValue;
      // Trigger change event for any listeners
      const changeEvent = new Event('change', { bubbles: true });
      input.dispatchEvent(changeEvent);
    }
  }

  _calculateNewValue = (action, currentValue, step, input) => {
    if (action === 'increase') {
      const max = Number(input.getAttribute('max'));
      const newValue = currentValue + step;
      return Number.isFinite(max) ? Math.min(newValue, max) : newValue;
    }

    if (action === 'decrease') {
      const min = Number(input.getAttribute('min'));
      const newValue = currentValue - step;
      return Number.isFinite(min) ? Math.max(newValue, min) : newValue;
    }

    return currentValue;
  }

  destroy = () => {
    this.spinners.forEach(spinner => {
      spinner.removeEventListener('click', this._onClick);
    });
    this.spinners.clear();
  }

  update = () => {
    this.destroy();
    this._init();
  }
}
