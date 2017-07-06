import { nodeListToArray } from './Utils';

const defaultConfig = {
  classFocus: 'is-focus',
  classValue: 'is-value',
};

export default class Input {
  constructor(selector = '[data-input]', config) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleChange = this._handleChange.bind(this);

    this.items = [];

    this._init();

    return this;
  }

  _init() {
    this.items = nodeListToArray(
      document.querySelectorAll(this.config.selector),
    );

    this.items.forEach(item => {
      item.addEventListener('focus', this._handleFocus);
      item.addEventListener('blur', this._handleBlur);

      item.addEventListener('change', this._handleChange);
      item.addEventListener('keyup', this._handleChange);

      Input.setClassValue(item);
    });

    return this.items;
  }

  update() {
    this.destory();
    this.init();
  }

  destroy() {
    this.items.destroy();
  }

  _handleFocus(e) {
    e.target.classList.add(this.config.classFocus);
  }
  _handleBlur(e) {
    e.target.classList.remove(this.config.classFocus);
  }

  _handleChange(e) {
    // eslint
    if (!e) {
      return;
    }

    Input.setClassValue(e.target, this.config.classValue);
  }

  static setClassValue(element, classValue = defaultConfig.classValue) {
    if (element.value) {
      element.classList.add(classValue);
    } else {
      element.classList.remove(classValue);
    }
  }
}
