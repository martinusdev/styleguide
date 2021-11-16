import { TOGGLE_EVT, doToggle } from './Toggle';

const defaultConfig = {
  dataInteractive: 'data-dropdown-interactive',
  activeClassName: 'is-active',
};

const isActive = el => el.classList.contains(defaultConfig.activeClassName)
  || el.getAttribute('aria-expanded') === 'true';

export default class Dropdown {
  constructor(selector = '[data-dropdown]', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this._onToggle = this._onToggle.bind(this);
    this._onClick = this._onClick.bind(this);

    this.dropdowns = [];
    this.target = null;
    this.trigger = null;
    this._init();

    return this;
  }

  destroy() {
    this.dropdowns.forEach(dropdown => {
      dropdown.removeEventListener(TOGGLE_EVT, this._onToggle);
    });

    this._removeListeners();

    this.dropdowns = [];
  }

  update() {
    this.destroy();
    this._init();
  }

  _init() {
    this.dropdowns.push.apply(
      this.dropdowns,
      document.querySelectorAll(this.selector),
    );

    this.dropdowns.forEach(dropdown => {
      this.constructor.setDropdownPosition(dropdown);

      dropdown.addEventListener(TOGGLE_EVT, this._onToggle);
    });

    this._addListeners();
  }

  static setDropdownPosition(target) {
    const { body } = document;
    const html = document.documentElement;

    // TODO: top/bottom posiiton switch - little bit harder because of animation of height
    // const winHeight = Math.max(
    //   body.scrollHeight,
    //   body.offsetHeight,
    //   html.clientHeight,
    //   html.scrollHeight,
    //   html.offsetHeight,
    // );

    const winWidth = Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth,
    );

    const dimensions = target.getBoundingClientRect();

    // const dropdownPosTop = Math.ceil(dimensions.top + window.pageYOffset);
    const dropdownPosRight = Math.ceil(dimensions.right + window.pageXOffset);
    const dropdownPosLeft = Math.ceil(dimensions.left + window.pageXOffset);

    // const shouldFlipTop = dropdownPosTop >= winHeight;

    const shouldFlipRight = dropdownPosRight >= winWidth;
    const shouldFlipLeft = dropdownPosLeft <= 0;

    if (shouldFlipLeft && target.classList.contains('dropdown--align-right')) {
      target.classList.remove('dropdown--align-right');
    }

    if (shouldFlipRight) {
      target.classList.add('dropdown--align-right');
    }
  }

  _onToggle(e) {
    if (
      (e.detail.trigger && !this.target)
      || !this.target.contains(e.detail.target)
    ) {
      this.trigger = e.detail.trigger;
    }
    if (!this.target || !this.target.contains(e.detail.target)) {
      this.target = e.detail.target;
    }

    // attach events only if dropdown is open
    if (isActive(this.target)) {
      this.constructor.setDropdownPosition(this.target);

      this._addListeners();
    }
  }

  _onClick(e) {
    if (!this.trigger) {
      return;
    }
    if (this.trigger !== e.target && !this.trigger.contains(e.target)) {
      if (
        !this.target.hasAttribute(this.config.dataInteractive)
        || !this.target.contains(e.target)
      ) {
        doToggle({
          target: this.trigger,
          expand: true,
          state: false,
          icon: this.trigger.getAttribute('data-toggle-icon'),
          className: this.config.activeClassName,
        });
        doToggle({
          target: this.target,
          expand: true,
          state: false,
          className: this.config.activeClassName,
        });

        this._removeListeners();
      }
    } else {
      this._removeListeners();
    }
  }

  _addListeners() {
    document.addEventListener('click', this._onClick, true);
  }

  _removeListeners() {
    document.removeEventListener('click', this._onClick, true);
  }
}
