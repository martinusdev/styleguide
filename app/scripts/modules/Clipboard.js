import ClipboardJs from 'clipboard';

import { nodeListToArray } from './Utils';

const defaultConfig = {
  successMsg: 'Skopírované',
  errorMsg: 'Chyba pri kopírovaní',
};

export default class Clipboard {
  constructor(selector = '[data-clipboard]', config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.selector = selector;

    this._handleSuccess = this._handleSuccess.bind(this);
    this._handleError = this._handleError.bind(this);

    this._init();
  }

  _init() {
    if (!ClipboardJs.isSupported()) {
      nodeListToArray(document.querySelectorAll(this.selector)).forEach(item => item.setAttribute('disabled', 'true'),);

      return;
    }

    this.clipboard = new ClipboardJs(this.selector, this.config);

    this.clipboard.on('success', this._handleSuccess);
    this.clipboard.on('error', this._handleError);
  }

  _handleSuccess(e) {
    e.trigger.classList.add('btn--success');
    e.trigger.innerHTML = e.trigger.getAttribute('data-clipboard-msg-success')
      || this.config.successMsg;
  }

  _handleError(e) {
    e.trigger.innerHTML = e.trigger.getAttribute('data-clipboard-msg-error')
      || this.config.errorMsg;
  }

  update() {
    this.destroy();
    this._init();
  }

  destroy() {
    this.clipboard.destroy();
  }
}
