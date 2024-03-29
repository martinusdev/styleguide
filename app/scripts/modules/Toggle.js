// ---------------------------------------------------
// Toggle
// module for handling toggle actions

import { triggerResize } from './Utils';

export const TRIGGER_EVT = 'triggerToggle';
export const TOGGLE_EVT = 'toggle';

const defaultConfig = {
  toggleClass: 'is-active',
  settingsAttr: 'data-toggle',
};

class Toggle {
  constructor(selector = '[data-toggle]', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this._onClick = this._onClick.bind(this);
    this.triggers = [];
    this._init();
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
    iconTarget,
    text,
    expand,
    attribute,
    focus,
    state,
    resize = false,
    dispatchEvent = true,
  }) {
    if (!(target instanceof Element)) {
      target = document.querySelector(target);
    }

    if (!target) {
      return false;
    }

    // todo: refracor this
    if (className !== undefined || className !== null) {
      if (state !== undefined) {
        if (state) {
          target.classList.add(className);
        } else {
          target.classList.remove(className);
        }
      } else if (className !== null) {
        target.classList.toggle(className);
      }
    }

    if (icon) {
      let iconEl = target.querySelector(iconTarget ? `use${iconTarget}` : 'use');
      let currentIconAttribute = 'xlink:href';

      if (!iconEl) {
        iconEl = target.querySelector(iconTarget ? `svg${iconTarget}` : 'svg');
        currentIconAttribute = 'data-icon';
      }

      if (iconEl) {
        const currentIcon = iconEl.getAttribute(currentIconAttribute);

        target.setAttribute('data-toggle-icon', currentIcon);
        iconEl.setAttribute(currentIconAttribute, icon);
      }
    }

    if (text) {
      const toggleTextTarget = target.querySelector('[data-toggle-text-target]') || target;
      const oldText = toggleTextTarget.innerHTML;

      target.setAttribute('data-toggle-text', oldText);
      toggleTextTarget.innerHTML = text;
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

    if (attribute) {
      const currentAttibute = target.getAttribute(attribute);

      if (currentAttibute !== null) {
        target.removeAttribute(attribute);
      } else {
        target.setAttribute(attribute, '');
      }
    }

    if (focus) {
      target.focus();
    }

    if (dispatchEvent) {
      target.dispatchEvent(
        new CustomEvent(TOGGLE_EVT, {
          detail: {
            target,
            trigger,
          },
          bubbles: true,
        }),
      );
    }

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
        className = target.getAttribute('data-toggle-class') || null;
      }

      Toggle.doToggle({
        target,
        trigger,
        className,
        icon: target.getAttribute('data-toggle-icon'),
        iconTarget: target.getAttribute('data-toggle-icon-target'),
        text: target.getAttribute('data-toggle-text'),
        expand: target.hasAttribute('data-toggle-expand'),
        attribute: target.getAttribute('data-toggle-attribute'),
        focus: target.hasAttribute('data-toggle-focus'),
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
        }
        if (target === 'parent') {
          let parentHop = 1;
          if (trigger.hasAttribute('data-parent-hop')) {
            parentHop = trigger.getAttribute('data-parent-hop');
          }
          for (let j = 0; j < parentHop; j++) {
            trigger = trigger.parentNode;
          }
          return trigger;
        }
        if (target === 'previous') {
          return trigger.previousElementSibling;
        }
        if (target === 'next') {
          return trigger.nextElementSibling;
        }
        return document.querySelector(target);
      })
      .filter(Boolean);
  }
}

export default Toggle;
export const { doToggle, isToggled } = Toggle;
