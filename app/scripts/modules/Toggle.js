/**
 * Toggle Component
 * Module for handling toggle actions on elements
 */

import { triggerResize } from './Utils';

// Event names
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
    this.triggers = [];

    // Initialize the toggle
    this._init();
  }

  /**
   * Check if an element is toggled/active
   * @param {Element} target - Element to check
   * @param {string} activeClass - Class name that indicates active state
   * @returns {boolean} - Whether the element is toggled
   */
  static isToggled(target, activeClass = defaultConfig.toggleClass) {
    if (!target) return false;

    if (target.hasAttribute('data-toggle-expand')) {
      return target.getAttribute('aria-expanded') === 'true';
    }

    return target.classList.contains(activeClass);
  }

  /**
   * Toggle one or more properties on an element
   * @param {Object} options - Toggle options
   */
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
    // If target is a selector string, get the actual element
    if (!(target instanceof Element)) {
      target = document.querySelector(target);
    }

    // Return early if target doesn't exist
    if (!target) {
      return false;
    }

    // Handle class toggling
    if (className != null) {
      if (state !== undefined) {
        // Add or remove class based on state
        target.classList[state ? 'add' : 'remove'](className);
      } else {
        // Toggle class
        target.classList.toggle(className);
      }
    }

    // Handle icon toggling
    if (icon) {
      // Try to find the icon element (either use or svg)
      const iconSelector = iconTarget ?
        [`use${iconTarget}`, `svg${iconTarget}`] :
        ['use', 'svg'];

      // Find the first matching element
      let iconEl;
      let currentIconAttribute;

      for (const selector of iconSelector) {
        iconEl = target.querySelector(selector);
        if (iconEl) {
          currentIconAttribute = selector.startsWith('use') ? 'xlink:href' : 'data-icon';
          break;
        }
      }

      if (iconEl) {
        // Store current icon and set new one
        const currentIcon = iconEl.getAttribute(currentIconAttribute);
        target.setAttribute('data-toggle-icon', currentIcon);
        iconEl.setAttribute(currentIconAttribute, icon);
      }
    }

    // Handle text toggling
    if (text) {
      const toggleTextTarget = target.querySelector('[data-toggle-text-target]') || target;
      const oldText = toggleTextTarget.innerHTML;

      // Store old text and set new text
      target.setAttribute('data-toggle-text', oldText);
      toggleTextTarget.innerHTML = text;
    }

    // Handle aria-expanded attribute
    if (expand) {
      const currentState = target.getAttribute('aria-expanded') || 'false';
      const newState = state !== undefined
        ? state.toString()
        : (currentState === 'true' ? 'false' : 'true');

      target.setAttribute('aria-expanded', newState);
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

  /**
   * Initialize toggle functionality
   * @private
   */
  _init = () => {
    // Get all toggle triggers from the DOM
    this.triggers = [...document.querySelectorAll(this.selector)];

    // Add click event listener to each trigger
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', this._onClick);
    });
  }

  /**
   * Handle click events on toggle triggers
   * @param {Event} e - The click event
   * @private
   */
  _onClick = (e) => {
    const trigger = e.currentTarget;
    const triggerTargets = this._getTargets(trigger);

    triggerTargets.forEach(target => {
      // Determine which class name to use for toggling
      let className = this.config.toggleClass;

      // Check for class override on trigger
      if (trigger.hasAttribute('data-toggle-class-target')) {
        className = trigger.getAttribute('data-toggle-class-target');
      }

      // Check for class override on target
      if (target.hasAttribute('data-toggle-class')) {
        className = target.getAttribute('data-toggle-class') || null;
      }

      // Apply toggle
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

  /**
   * Remove all event listeners and clean up
   */
  destroy = () => {
    this.triggers.forEach(trigger => {
      trigger.removeEventListener('click', this._onClick);
    });
    this.triggers = [];
  }

  /**
   * Update the toggle instance by re-initializing
   */
  update = () => {
    this.destroy();
    this._init();
  }

  /**
   * Get target elements for a trigger based on its data attribute
   * @param {Element} trigger - The toggle trigger element
   * @returns {Element[]} - Array of target elements
   * @private
   */
  _getTargets = (trigger) => {
    if (!trigger) {
      return [];
    }

    // Get comma-separated list of targets
    const targetAttribute = trigger.getAttribute(this.config.settingsAttr);
    if (!targetAttribute) return [];

    const targetSelectors = targetAttribute.split(',');

    // Map each target selector to a DOM element
    return targetSelectors
      .map(selector => {
        const target = selector.trim();

        // Handle special keywords
        switch (target) {
          case 'self':
            return trigger;

          case 'parent': {
            // Get parent with optional hop count
            let parentElement = trigger;
            const parentHop = parseInt(
              trigger.getAttribute('data-parent-hop') || '1',
              10
            );

            // Move up the DOM tree
            for (let j = 0; j < parentHop; j++) {
              parentElement = parentElement.parentNode;
            }
            return parentElement;
          }

          case 'previous':
            return trigger.previousElementSibling;

          case 'next':
            return trigger.nextElementSibling;

          default:
            return document.querySelector(target);
        }
      })
      .filter(Boolean);
  }
}

export default Toggle;
export const { doToggle, isToggled } = Toggle;
