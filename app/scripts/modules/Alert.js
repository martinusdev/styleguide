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
  iconPath: '../icons_/app.svg',
};

const templateIcon = (icon, iconPath) => `
  <div class="alert__icon">
    <svg class="icon icon-${icon} icon--medium" role="img" aria-hidden="true">
      <use xlink:href="${iconPath}#icon-${icon}" />
    </svg>
  </div>
`;

const templateLoader = () => `
  <div class="alert__loader">
    <div class="loader loader--white loader--small">
      <div class="loader__page"></div>
      <div class="loader__page"></div>
      <div class="loader__page"></div>
    </div>
  </div>
`;

const templateAction = (customTemplate, iconPath) => `
  <div class="alert__action">
    ${customTemplate || `
      <button class="btn btn--clean btn--small" data-alert-action>
        <svg class="icon icon-close icon--medium" role="img" aria-hidden="true">
          <use xlink:href="${iconPath}#icon-close" />
        </svg>
      </button>
    `}
  </div>
`;

const template = ({
  type,
  icon,
  loader,
  text,
  closeable,
  customActionTemplate,
  iconPath,
}) => `
  <div class="alert alert--fixed ${type && `alert--${type}`}">
    ${(icon && templateIcon(icon, iconPath)) || ''}
    ${(loader && templateLoader()) || ''}
    <div class="alert__content">${text}</div>
    ${((closeable || customActionTemplate) && templateAction(customActionTemplate, iconPath)) || ''}
  </div>
`;

export default class Alert {
  constructor(config) {
    this.config = { ...defaultConfig, ...config };

    this._setTimeout = this._setTimeout.bind(this);
    this._clearTimeout = this._clearTimeout.bind(this);
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

    // create alert DOM
    this.alert = createElementFromString(
      template({
        type: this.config.type,
        icon: this.config.icon,
        loader: this.config.loader,
        text: this.config.text,
        closeable: this.config.closeable,
        customActionTemplate: this.config.customActionTemplate,
        iconPath: this.config.iconPath,
      }),
    );

    this.container.insertBefore(this.alert, this.container.children[0] || null);

    // wait for insert to dom, then attach class which can bring in animation
    setTimeout(() => {
      this.alert.classList.add('alert--fixed-active');
    }, 50);

    // attach click event on alert action if alert is closeable or custom action is defined
    if (this.config.closeable || this.config.customActionTemplate) {
      this.actionEl = this.alert.querySelector('[data-alert-action]');

      if (this.actionEl) {
        this.actionEl.addEventListener(
          'click',
          this.config.onAction || this.destroy,
        );
      }
    }

    // start timer if timeout is defined
    if (this.config.timeout) {
      this._setTimeout();

      // clear timer if mouse is hovering above alert
      this.alert.addEventListener('mouseenter', this._clearTimeout);
    }
  }

  _setTimeout() {
    this.timeoutRunner = setTimeout(this.destroy, this.config.timeout);
  }

  _clearTimeout() {
    clearTimeout(this.timeoutRunner);

    this.alert.addEventListener('mouseleave', this._setTimeout);
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
