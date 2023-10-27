import ClipboardJs from 'clipboard';
import tippy from 'tippy.js';

import { nodeListToArray } from './Utils';

const defaultConfig = {
  successMsg: '<i class="far fa-check-circle fa-lg"></i>',
  successClass: 'btn--success',
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
      nodeListToArray(document.querySelectorAll(this.selector))
        .forEach(item => item.setAttribute('disabled', 'true'),);

      return;
    }

    this.clipboard = new ClipboardJs(this.selector, this.config);

    this.clipboard.on('success', this._handleSuccess);
    this.clipboard.on('error', this._handleError);
  }

  _handleSuccess(e) {
    const successMsg = e.trigger.getAttribute('data-clipboard-msg-success')
      || this.config.successMsg;

    this.showTooltip(e.trigger, successMsg);
  }

  _handleError(e) {
    const errorMsg = e.trigger.getAttribute('data-clipboard-msg-error')
      || this.config.errorMsg;

    this.showTooltip(e.trigger, errorMsg);
  }

  update() {
    this.destroy();
    this._init();
  }

  destroy() {
    this.clipboard.destroy();
  }

  // eslint-disable-next-line class-methods-use-this
  showTooltip(element, content) {
    const tooltip = tippy(element, {
      showOnCreate: true,
      trigger: 'manual',
      hideOnClick: true,
      content,
      allowHTML: true,
      animation: 'scale',
      placement: 'auto-end',
      arrow: false,
    });

    // close the tooltip after 2 seconds
    setTimeout(() => {
      tooltip.hide();
      tooltip.destroy();
    }, 2000);
  }
}
