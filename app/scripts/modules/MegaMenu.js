import { nodeListToArray } from './Utils';
import { doToggle, isToggled } from './Toggle';
import { lockBody, unlockBody } from './Modal';

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
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleKeyEscape = this._handleKeyEscape.bind(this);

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

    document.addEventListener('keydown', this._handleKeyDown);
  }

  _detachDOMEvents() {
    this.triggers.forEach(trigger => trigger.removeEventListener('click', this._handleTriggerClick),);

    document.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleTriggerClick(e) {
    const currentTrigger = e.target.closest(this.config.selectorTriggers);
    const targetSection = currentTrigger.getAttribute(
      this.config.selectorTriggers.slice(1, -1),
    );

    this.isMegaMenuOpen = !isToggled(currentTrigger);
    this.openMegaMenuSection = targetSection && document.querySelector(targetSection);

    if (this.isMegaMenuOpen) {
      lockBody();

      setTimeout(() => {
        document.addEventListener('click', this._handleClickOutside);
      });
    } else {
      unlockBody();

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

      // focus first element upon opening
      if (this.isMegaMenuOpen) {
        const focusableElement = this.openMegaMenuSection.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElement) {
          focusableElement.focus();
        }
      }
    });
  }

  _handleClickOutside(e) {
    if (
      this.megaMenu !== e.target // if click target is not megamenu
      && !this.megaMenu.contains(e.target) // if click target is not in megamenu
      && !e.target.closest(this.config.selectorTriggers) // if click target is not megamenu
    ) {
      this._closeMegaMenu();

      document.removeEventListener('click', this._handleClickOutside);
    }
  }

  _handleKeyEscape() {
    const trigger = this.triggers.find(triggerElement => isToggled(triggerElement));

    if (trigger) {
      trigger.focus();
    }

    this._closeMegaMenu();
  }

  _closeMegaMenu() {
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
  }

  _handleKeyDown(/** KeyboardEvent */ e) {
    if (e.key === 'Escape') {
      this._handleKeyEscape();
    } else if (e.key === 'ArrowDown' && this.triggers.includes(document.activeElement)) {
      e.preventDefault();
      document.activeElement.click();
    } else if (e.key === 'ArrowUp' && this.isMegaMenuOpen) {
      this._handleKeyEscape();
    } else if (e.key === 'Tab' && this.isMegaMenuOpen) {
      const focusableElements = this.openMegaMenuSection.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');

      if (focusableElements === []) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      } else if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
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
