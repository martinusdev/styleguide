import tippy from 'tippy.js';

const defaultConfig = {
  successMsg: '<i class="far fa-check-circle fa-lg"></i>',
  successClass: 'btn--success',
  errorMsg: 'Chyba pri kopírovaní',
};

export default class Clipboard {
  constructor(selector = '[data-clipboard]', config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.selector = selector;
    this.handlers = [];

    this._init();
  }

  _init() {
    if (!Clipboard.isSupported()) {
      document.querySelectorAll(this.selector)
        .forEach(item => item.setAttribute('disabled', 'true'));
      return;
    }

    document.querySelectorAll(this.selector).forEach(element => {
      const handler = this._createClickHandler(element);
      element.addEventListener('click', handler);
      this.handlers.push({ element, handler });
    });
  }

  _createClickHandler(element) {
    return async (event) => {
      event.preventDefault();

      try {
        const text = element.getAttribute('data-clipboard-text') ||
          document.querySelector(element.getAttribute('data-clipboard-target'))?.value ||
          document.querySelector(element.getAttribute('data-clipboard-target'))?.textContent ||
          '';

        await navigator.clipboard.writeText(text);

        const successMsg = element.getAttribute('data-clipboard-msg-success') ||
          this.config.successMsg;

        Clipboard.showTooltip(element, successMsg);
      } catch (error) {
        const errorMsg = element.getAttribute('data-clipboard-msg-error') ||
          this.config.errorMsg;

        Clipboard.showTooltip(element, errorMsg);
      }
    };
  }

  update() {
    this.destroy();
    this._init();
  }

  destroy() {
    if (this.handlers && this.handlers.length) {
      this.handlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
      });
      this.handlers = [];
    }
  }

  static isSupported() {
    return !!navigator.clipboard && !!navigator.clipboard.writeText;
  }

  static showTooltip(element, content) {
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
      // Ensure tooltip instance exists before destroying
      if (tooltip && !tooltip.state.isDestroyed) {
        tooltip.destroy();
      }
    }, 2000);
  }
}
