import { nodeListToArray } from './Utils';
import { doToggle, isToggled } from './Toggle';
import { BREAKPOINTS } from './Const';
import { lockBody, unlockBody } from './OldModal';

const defaultConfig = {
  selectorTriggers: '[data-mega-menu-trigger]',
  selectorTargets: '[data-mega-menu-target]',
  selectorContents: '[data-mega-menu-contents]',
};

export default class MegaMenu {
  constructor(selector = '[data-mega-menu]', config = {}) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this.megaMenu = null;
    this.triggers = [];
    this.targets = [];

    this.isMegaMenuOpen = false;
    this.openMegaMenuSection = null;

    this._handleTriggerClick = this._handleTriggerClick.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);

    this._init();
  }

  _init() {
    this.megaMenu = document.querySelector(this.config.selector);

    if (!this.megaMenu) {
      return;
    }

    this.triggers = nodeListToArray(
      document.querySelectorAll(this.config.selectorTriggers),
    );

    this.targets = nodeListToArray(
      document.querySelectorAll(this.config.selectorTargets),
    );

    this._attachDOMEvents();
  }

  _attachDOMEvents() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', this._handleTriggerClick);
    });
  }

  _detachDOMEvents() {
    this.triggers.forEach(trigger => trigger.removeEventListener('click', this._handleTriggerClick),);
  }

  _handleTriggerClick(e) {
    const currentTrigger = e.target.closest(this.config.selectorTriggers);
    const targetSection = currentTrigger.getAttribute(
      this.config.selectorTriggers.slice(1, -1),
    );

    this.isMegaMenuOpen = !isToggled(currentTrigger);
    this.openMegaMenuSection = targetSection && document.querySelector(targetSection);

    if (this.isMegaMenuOpen) {
      if (window.innerWidth < BREAKPOINTS.l) {
        // if (!document.body.classList.contains('has-header-warning')) {
        lockBody();
        // }
      }

      setTimeout(() => {
        document.addEventListener('click', this._handleClickOutside);
      });
    } else {
      if (window.innerWidth < BREAKPOINTS.l) {
        // if (!document.body.classList.contains('has-header-warning')) {
        unlockBody();
        // }
      }

      document.removeEventListener('click', this._handleClickOutside);
    }

    // toggle trigger
    this.triggers.forEach(trigger => {
      if (trigger !== currentTrigger) {
        doToggle({
          target: trigger,
          className: 'is-active',
          icon: isToggled(trigger) && trigger.getAttribute('data-toggle-icon'),
          expand: true,
          state: false,
        });
      }
    });

    this.targets.forEach(target => {
      doToggle({
        target,
        className: 'is-active',
        state: target === this.openMegaMenuSection,
      });

      doToggle({
        target: this.megaMenu,
        trigger: currentTrigger,
        className: 'is-active',
        state: this.isMegaMenuOpen,
      });

      doToggle({
        target: document.querySelector('body'),
        className: 'is-mega-menu-active',
        state: this.isMegaMenuOpen,
      });

      doToggle({
        target: document.querySelector(this.config.selectorContents),
        className: 'is-active',
        state: false,
      });

      // fix MagaMenu height for ios manually (innerHeight - header height)
      setTimeout(() => {
        const headerHeight = document.querySelector('.header .header__wrapper')
          .offsetHeight;

        if (this.isMegaMenuOpen) {
          this.megaMenu.style.maxHeight = `${window.innerHeight - headerHeight}px`;
        }
      }, 200); // magic number
    });
  }

  _handleClickOutside(e) {
    if (
      this.megaMenu !== e.target // if click target is not megamenu
      && !this.megaMenu.contains(e.target) // if click target is not in megamenu
      && !e.target.closest(this.config.selectorTriggers) // if click target is not megamenu
    ) {
      doToggle({
        target: this.megaMenu,
        className: 'is-active',
        state: false,
      });

      doToggle({
        target: document.querySelector('body'),
        className: 'is-mega-menu-active',
        state: false,
      });

      this.triggers.forEach(trigger => {
        doToggle({
          target: trigger,
          className: 'is-active',
          icon: isToggled(trigger) && trigger.getAttribute('data-toggle-icon'),
          expand: true,
          state: false,
        });
      });

      unlockBody();

      document.removeEventListener('click', this._handleClickOutside);
    }
  }

  update() {
    this.destroy();
    this._init();
  }

  destroy() {
    this._detachDOMEvents();
  }
}
