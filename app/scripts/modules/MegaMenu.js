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
    this.config = { selector, ...defaultConfig, ...config };

    this.megaMenu = null;
    this.triggers = [];
    this.targets = [];

    this.isMegaMenuOpen = false;
    this.openMegaMenuSection = null;

    this._init();
  }

  _init = () => {
    this.megaMenu = document.querySelector(this.config.selector);

    if (!this.megaMenu) {
      return;
    }

    this.triggers = nodeListToArray(
      document.querySelectorAll(this.config.selectorTriggers)
    );

    this.targets = nodeListToArray(
      document.querySelectorAll(this.config.selectorTargets)
    );

    this._attachDOMEvents();
  }

  _attachDOMEvents = () => {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', this._handleTriggerClick);
    });

    document.addEventListener('keydown', this._handleKeyDown);
  }

  _detachDOMEvents = () => {
    this.triggers.forEach(trigger => 
      trigger.removeEventListener('click', this._handleTriggerClick)
    );

    document.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleTriggerClick = (e) => {
    const currentTrigger = e.target.closest(this.config.selectorTriggers);
    const triggerAttribute = this.config.selectorTriggers.slice(1, -1);
    const targetSection = currentTrigger.getAttribute(triggerAttribute);

    this.isMegaMenuOpen = !isToggled(currentTrigger);
    this.openMegaMenuSection = targetSection && document.querySelector(targetSection);

    if (this.isMegaMenuOpen) {
      lockBody();      
      requestAnimationFrame(() => {
        document.addEventListener('click', this._handleClickOutside);
      });
    } else {
      unlockBody();
      document.removeEventListener('click', this._handleClickOutside);
    }

    // toggle trigger - only deactivate other triggers
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

    const body = document.querySelector('body');
    const contentsElement = document.querySelector(this.config.selectorContents);

    // Handle all target elements
    this.targets.forEach(target => {
      // Toggle target visibility based on whether it's the current section
      doToggle({
        target,
        className: 'is-active',
        state: target === this.openMegaMenuSection,
      });
    });
    
    // Toggle mega menu visibility
    doToggle({
      target: this.megaMenu,
      trigger: currentTrigger,
      className: 'is-active',
      state: this.isMegaMenuOpen,
    });

    // Toggle body class
    doToggle({
      target: body,
      className: 'is-mega-menu-active',
      state: this.isMegaMenuOpen,
    });

    // Ensure contents are hidden
    if (contentsElement) {
      doToggle({
        target: contentsElement,
        className: 'is-active',
        state: false,
      });
    }

    // fix MegaMenu height for ios manually (innerHeight - header height)
    if (this.isMegaMenuOpen) {
      const headerWrapper = document.querySelector('.header .header__wrapper');
      if (headerWrapper) {
        requestAnimationFrame(() => {
          const headerHeight = headerWrapper.offsetHeight;
          this.megaMenu.style.maxHeight = `${window.innerHeight - headerHeight}px`;
        });
      }

      // focus first element upon opening
      if (this.openMegaMenuSection) {
        const focusableElement = this.openMegaMenuSection.querySelector(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElement) {
          focusableElement.focus();
        }
      }
    }
  }

  _handleClickOutside = (e) => {
    if (
      this.megaMenu !== e.target && // if click target is not megamenu
      !this.megaMenu.contains(e.target) && // if click target is not in megamenu
      !e.target.closest(this.config.selectorTriggers) // if click target is not a trigger
    ) {
      this._closeMegaMenu();
      document.removeEventListener('click', this._handleClickOutside);
    }
  }

  _handleKeyEscape = () => {
    const trigger = this.triggers.find(triggerElement => isToggled(triggerElement));

    if (trigger) {
      trigger.focus();
    }

    this._closeMegaMenu();
  }

  _closeMegaMenu = () => {
    // Close mega menu
    doToggle({
      target: this.megaMenu,
      className: 'is-active',
      state: false,
    });

    // Remove body class
    const body = document.querySelector('body');
    if (body) {
      doToggle({
        target: body,
        className: 'is-mega-menu-active',
        state: false,
      });
    }

    // Reset all triggers
    this.triggers.forEach(trigger => {
      doToggle({
        target: trigger,
        className: 'is-active',
        icon: isToggled(trigger) && trigger.getAttribute('data-toggle-icon'),
        expand: true,
        state: false,
      });
    });

    // Unlock body scroll
    unlockBody();
  }

  _handleKeyDown = (/** KeyboardEvent */ e) => {
    const { key, shiftKey } = e;
    const activeElement = document.activeElement;

    switch (key) {
      case 'Escape':
        this._handleKeyEscape();
        break;
        
      case 'ArrowDown':
        if (this.triggers.includes(activeElement)) {
          e.preventDefault();
          activeElement.click();
        }
        break;
        
      case 'ArrowUp':
        if (this.isMegaMenuOpen) {
          this._handleKeyEscape();
        }
        break;
        
      case 'Tab':
        if (this.isMegaMenuOpen && this.openMegaMenuSection) {
          const focusableElements = this.openMegaMenuSection.querySelectorAll(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (!focusableElements.length) {
            return;
          }

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (!shiftKey && activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          } else if (shiftKey && activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        }
        break;
    }
  }

  update = () => {
    this.destroy();
    this._init();
  }

  destroy = () => {
    this._detachDOMEvents();
  }
}
