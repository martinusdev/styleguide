// ---------------------------------------------------
// Toggle
// module for handling toggle actions

import { customEventPolyfill } from './Utils';

customEventPolyfill();

export const TRIGGER_EVT = 'triggerToggle';
export const TOGGLE_EVT = 'toggle';

const defaultConfig = {
  toggleClass: 'is-active',
  settingsAttr: 'data-toggle',
};

export default class Toggle {
  constructor(selector = '[data-toggle]', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this._onClick = this._onClick.bind(this);
    this.triggers = [];
    this._init();

    return this;
  }

  _init() {
    this.triggers.push.apply(
      this.triggers,
      document.querySelectorAll(this.selector),
    );
    for (let i = 0, l = this.triggers.length; i < l; i++) {
      this.triggers[i].addEventListener('click', this._onClick);
    }
  }

  _onClick(e) {
    const triggerEl = e.currentTarget;

    const triggerTargets = this._getTargets(triggerEl);
    triggerTargets.map(el => this.doToggle(el, triggerEl));

    triggerEl.dispatchEvent(new CustomEvent(TRIGGER_EVT, { bubbles: true }));
  }

  destroy() {
    for (let i = 0, l = this.triggers.length; i < l; i++) {
      this.triggers[i].removeEventListener('click', this._onClick);
    }
    this.triggers = [];
  }

  update() {
    this.destroy();
    this._init();
  }

  doToggle(el, triggerEl) {
    if (!(el instanceof Element)) {
      el = document.querySelector(el);
    }

    if (!el) {
      return false;
    }

    let toggled = false;

    if (el.hasAttribute('data-toggle-class')) {
      const toggleClass = el.getAttribute('data-toggle-class')
        ? el.getAttribute('data-toggle-class')
        : this.config.toggleClass;
      el.classList.toggle(toggleClass);

      toggled = true;
    }

    if (el.hasAttribute('data-toggle-icon')) {
      const icon = el.querySelector('use');

      if (icon) {
        const currentIcon = icon.getAttribute('xlink:href');
        const newIcon = el.getAttribute('data-toggle-icon');

        el.setAttribute('data-toggle-icon', currentIcon);
        icon.setAttribute('xlink:href', newIcon);

        toggled = true;
      }
    }

    if (el.hasAttribute('data-toggle-text')) {
      const newText = el.getAttribute('data-toggle-text');
      const oldText = el.textContent;

      el.setAttribute('data-toggle-text', oldText);
      el.textContent = newText;

      toggled = true;
    }

    if (el.hasAttribute('data-toggle-expand')) {
      const currentState = el.getAttribute('aria-expanded');
      let isVisible = false;

      if (currentState === false) {
        isVisible = !!(el.offsetWidth ||
          el.offsetHeight ||
          el.getClientRects().length);
      } else if (currentState === 'true') {
        isVisible = true;
      } else {
        isVisible = false;
      }

      isVisible = !isVisible;
      el.setAttribute('aria-expanded', isVisible.toString());

      toggled = true;
    }

    if (!toggled) {
      el.classList.toggle(this.config.toggleClass);
    }

    el.dispatchEvent(
      new CustomEvent(TOGGLE_EVT, {
        detail: {
          target: el,
          trigger: triggerEl,
        },
        bubbles: true,
      }),
    );
    return true;
  }

  _getTargets(trigger) {
    if (!trigger) {
      return false;
    }
    const targets = trigger.getAttribute(this.config.settingsAttr).split(',');
    return targets
      .map(target => {
        target = target.trim();
        if (target === 'self') {
          return trigger;
        } else if (target === 'parent') {
          let parentHop = 1;
          if (trigger.hasAttribute('data-parent-hop')) {
            parentHop = trigger.getAttribute('data-parent-hop');
          }
          for (let j = 0; j < parentHop; j++) {
            trigger = trigger.parentNode;
          }
          return trigger;
        } else if (target === 'previous') {
          return trigger.previousSibling;
        } else if (target === 'next') {
          return trigger.nextSibling;
        }
        return document.querySelector(target);
      })
      .filter(Boolean);
  }
}
