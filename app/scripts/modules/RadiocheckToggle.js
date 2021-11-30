// ---------------------------------------------------
// Toggle
// module for handling toggle actions

import { escapeSelectorName } from './Utils';
import { TRIGGER_EVT, TOGGLE_EVT } from './Toggle';

const defaultConfig = {
  toggleClass: 'hide',
  settingsAttr: 'data-radiocheck-toggle',
};

export default class RadiocheckToggle {
  constructor(selector = '[data-radiocheck-toggle]', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this._onChange = this._onChange.bind(this);
    this.triggers = [];
    this._init();
  }

  _init() {
    this.triggers.push.apply(
      this.triggers,
      document.querySelectorAll(this.selector),
    );
    for (let i = 0, l = this.triggers.length; i < l; i++) {
      this.triggers[i].addEventListener('change', this._onChange);
    }
  }

  _onChange(e) {
    const triggerEl = e.currentTarget;
    const siblings = [];

    siblings.push.apply(
      siblings,
      document.querySelectorAll(`[name=${escapeSelectorName(triggerEl.name)}]`),
    );

    let targets = [];
    siblings.forEach(sibling => {
      targets = this._getTargets(sibling);
      targets.forEach(target => {
        this.doToggle(target, sibling);
        sibling.dispatchEvent(new CustomEvent(TRIGGER_EVT, { bubbles: true }));
      });
    });
  }

  destroy() {
    for (let i = 0, l = this.triggers.length; i < l; i++) {
      this.triggers[i].removeEventListener('change', this._onChange);
    }
    this.triggers = [];
  }

  update() {
    this.destroy();
    this._init();
  }

  doToggle(el, triggerEl) {
    const toggleClass = el.getAttribute('data-toggle-class')
      ? el.getAttribute('data-toggle-class')
      : this.config.toggleClass;

    if (triggerEl.checked) {
      el.classList.remove(toggleClass);
    } else {
      el.classList.add(toggleClass);
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
    let targets = trigger.getAttribute(this.config.settingsAttr);
    if (targets) {
      targets = targets.split(',');
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
    return [];
  }
}
