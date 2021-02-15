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
      this._attachEvents(item);

      Input.setClassValue(item);
    });

    return this.items;
  }

  update() {
    this.destroy();
    this._init();
  }

  destroy() {
    this.items.forEach(item => {
      this._detachEvents(item);
    });
  }

  _attachEvents(item) {
    item.addEventListener('focus', this._handleFocus);
    item.addEventListener('blur', this._handleBlur);

    item.addEventListener('change', this._handleChange);
    item.addEventListener('keyup', this._handleChange);
    item.addEventListener('search', this._handleChange);
  }

  _detachEvents(item) {
    item.removeEventListener('focus', this._handleFocus);
    item.removeEventListener('blur', this._handleBlur);

    item.removeEventListener('change', this._handleChange);
    item.removeEventListener('keyup', this._handleChange);
    item.removeEventListener('search', this._handleChange);
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
