import { createElementFromString, transitionEnd } from './Utils';

const defaultConfig = {
  container: '[data-alert-area]',
  type: 'info',
  text: '',
  icon: undefined,
  loader: false,
  closeable: true,
  customActionTemplate: undefined,
  onAction: undefined,
  timeout: undefined,
  closeText: 'Close',
};

const templateIcon = (icon) => `
  <div class="alert__icon">
    <i class="far fa-${icon} fa-xl"></i>
  </div>
`;

const templateLoader = () => `
  <div class="alert__loader">
    <i class="far fa-loader fa-spin fa-xl"></i>
  </div>
`;

const templateAction = (customTemplate, closeText = '') => `
  <div class="alert__action">
    ${customTemplate || `
      <button class="btn btn--clean btn--small" role="button" aria-hidden="true" data-alert-action>
        <i class="far fa-xmark fa-xl"></i>
        <span class="visually-hidden">${closeText}</span>
      </button>
    `}
  </div>
`;

export default class Alert {
  constructor(config) {
    this.config = { ...defaultConfig, ...config };

    this._setTimeout = this._setTimeout.bind(this);
    this._clearTimeout = this._clearTimeout.bind(this);
    this._handleEscape = this._handleEscape.bind(this);
    this.destroy = this.destroy.bind(this);
    this.destroy = this.destroy.bind(this);

    this._init();
  }

  _init() {
    this.container = document.querySelector(this.config.container);

    // abort if container do not exists in the DOM
    if (!this.container) {
      return;
    }

    this.alert = document.createElement('div');
    this.alert.classList.add('alert', 'alert--fixed', `alert--${this.config.type}`);

    let role = 'alert';

    if (this.config.loader) {
      role = 'status';
    }

    this.alert.setAttribute('role', role);

    if (this.config.icon) {
      this.alert.appendChild(
        createElementFromString(templateIcon(this.config.icon))
      );
    }

    if (this.config.loader) {
      this.alert.appendChild(
        createElementFromString(templateLoader())
      );
    }

    const alertContent = document.createElement('div');
    alertContent.className = 'alert__content';
    alertContent.innerHTML = this.config.text;
    this.alert.appendChild(alertContent);

    if (this.config.closeable || this.config.customActionTemplate) {
      this.alert.appendChild(
        createElementFromString(
          templateAction(this.config.customActionTemplate, this.config.closeText)
        )
      );
    }

    this.container.prepend(this.alert);

    // wait for insert to dom, then attach class which can bring in animation
    setTimeout(() => {
      this.alert.classList.add('alert--fixed-active');
    }, 100);

    // attach click event on alert action if alert is closeable or custom action is defined
    if (this.config.closeable || this.config.customActionTemplate) {
      this.actionEl = this.alert.querySelector('[data-alert-action]');

      if (!this.actionEl) {
        return;
      }

      this.actionEl.addEventListener(
        'click',
        this.config.onAction || this.destroy,
      );
    }

    // start timer if timeout is defined
    if (this.config.timeout) {
      this._setTimeout();

      // clear timer if mouse is hovering above alert
      this.alert.addEventListener('mouseenter', this._clearTimeout);
    }

    document.addEventListener('keydown', this._handleEscape);
  }

  _setTimeout() {
    this.timeoutRunner = setTimeout(this.destroy, this.config.timeout);
  }

  _clearTimeout() {
    clearTimeout(this.timeoutRunner);

    this.alert.addEventListener('mouseleave', this._setTimeout);
  }

  _handleEscape(event) {
    if (event.key === 'Escape') {
      this.destroy();
    }
  }

  destroy() {
    if (this.actionEl) {
      this.actionEl.removeEventListener(
        'click',
        this.config.onAction || this.destroy,
      );
    }

    if (this.config.timeout) {
      this.alert.removeEventListener('mouseenter', this._clearTimeout);
    }

    document.removeEventListener('keydown', this._handleEscape);

    // wait for animation to end and dhend remove instance from DOM.
    this.alert.addEventListener(
      transitionEnd,
      () => {
        this.container.removeChild(this.alert);
      },
      {
        once: true,
      },
    );

    // animation could be attached on this class
    this.alert.classList.add('alert--destroy');
  }
}
