// ---------------------------------------------------
// Toggle
// module for handling toggle actions

import { customEventPolyfill, triggerResize } from './Utils';
import { lockBody, unlockBody } from './Modal';

customEventPolyfill();

export const TRIGGER_EVT = 'triggerToggle';
export const TOGGLE_EVT = 'toggle';

const defaultConfig = {
  toggleClass: 'is-active',
  settingsAttr: 'data-toggle',
};

class Toggle {
  constructor(selector = '[data-toggle]', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this._onClick = this._onClick.bind(this);
    this.triggers = [];
    this._init();

    return this;
  }

  static isToggled(target, activeClass = defaultConfig.toggleClass) {
    if (target && target.hasAttribute('data-toggle-expand')) {
      return target.getAttribute('aria-expanded') === 'true';
    }

    return target.classList.contains(activeClass);
  }

  static doToggle({
    target,
    trigger,
    className,
    icon,
    text,
    expand,
    state,
    resize = false,
  }) {
    if (!(target instanceof Element)) {
      target = document.querySelector(target);
    }

    if (!target) {
      return false;
    }

    if (className !== undefined || className !== null) {
      if (state !== undefined) {
        if (state) {
          target.classList.add(className);
        } else {
          target.classList.remove(className);
        }
      } else {
        target.classList.toggle(className);
      }
    }

    if (icon) {
      const iconEl = target.querySelector('use');

      if (iconEl) {
        const currentIcon = iconEl.getAttribute('xlink:href');

        target.setAttribute('data-toggle-icon', currentIcon);
        iconEl.setAttribute('xlink:href', icon);
      }
    }

    if (text) {
      const oldText = target.textContent;

      target.setAttribute('data-toggle-text', oldText);
      target.textContent = text;
    }

    if (expand) {
      const currentState = target.getAttribute('aria-expanded') || 'false';
      if (state !== undefined) {
        target.setAttribute('aria-expanded', state.toString());
      } else {
        target.setAttribute(
          'aria-expanded',
          currentState === 'true' ? 'false' : 'true',
        );
      }
    }

    if (target.hasAttribute('data-toggle-lock')) {
      if (document.body.className.includes('has-modal')) {
        unlockBody();
      } else {
        lockBody();
      }
    }

    target.dispatchEvent(
      new CustomEvent(TOGGLE_EVT, {
        detail: {
          target,
          trigger,
        },
        bubbles: true,
      }),
    );

    if (resize) {
      triggerResize();
    }

    return target;
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
    const trigger = e.currentTarget;

    const triggerTargets = this._getTargets(trigger);

    triggerTargets.forEach(target => {
      let className = this.config.toggleClass;

      if (trigger.hasAttribute('data-toggle-class-target')) {
        className = trigger.getAttribute('data-toggle-class-target');
      }

      if (target.hasAttribute('data-toggle-class')) {
        className = target.getAttribute('data-toggle-class');
      }

      Toggle.doToggle({
        target,
        trigger,
        className,
        icon: target.getAttribute('data-toggle-icon'),
        text: target.getAttribute('data-toggle-text'),
        expand: target.hasAttribute('data-toggle-expand'),
      });
    });

    trigger.dispatchEvent(new CustomEvent(TRIGGER_EVT, { bubbles: true }));
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
          return trigger.previousElementSibling;
        } else if (target === 'next') {
          return trigger.nextElementSibling;
        }
        return document.querySelector(target);
      })
      .filter(Boolean);
  }
}

export default Toggle;
export const doToggle = Toggle.doToggle;
export const isToggled = Toggle.isToggled;
