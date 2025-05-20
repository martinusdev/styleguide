import { getValueFromResponsiveMap } from './Utils';

/**
 * Calculate the offset for an element based on its data attribute or global setting
 * @param {HTMLElement} element - Element to get offset for
 * @returns {number} - Calculated offset value
 */
function getOffset(element) {
  try {
    const currentOffset = element.hasAttribute('data-scroll-offset')
      ? JSON.parse(element.getAttribute('data-scroll-offset'))
      : (window.myApp?.scrollOffset || 0);

    return getValueFromResponsiveMap(currentOffset, window.innerWidth);
  } catch (error) {
    console.error('Error calculating scroll offset:', error);
    return 0;
  }
}

/**
 * Class for handling smooth scrolling to anchors with configurable offsets
 */
export default class AnchorScroll {
  /**
   * Creates a new AnchorScroll instance
   * @param {string} selector - The hash selector to scroll to (defaults to current URL hash)
   */
  constructor(selector = window.location.hash) {
    this.selector = selector;
    this._init();
  }

  /**
   * Initialize the anchor scroll functionality
   * @private
   */
  _init = () => {
    if (!this.selector || this.selector === '') {
      return;
    }

    // Get the target element without the leading #
    const targetId = this.selector.startsWith('#') ? this.selector.slice(1) : this.selector;
    const anchorSection = document.getElementById(targetId);

    if (!anchorSection) {
      console.warn(`AnchorScroll: Element with id "${targetId}" not found`);
      return;
    }

    this._createHelperElement(anchorSection);

    // Add one-time event listener to clean up when user clicks elsewhere
    document.addEventListener('click', this.destroy, {
      once: true,
      capture: true,
    });
  }

  /**
   * Create and insert the helper element that adjusts the scroll position
   * @param {HTMLElement} anchorSection - The target element to scroll to
   * @private
   */
  _createHelperElement = (anchorSection) => {
    const offset = getOffset(anchorSection);
    const helperElement = document.createElement('div');

    helperElement.className = 'helper-element';
    helperElement.style.height = `${offset}px`;
    helperElement.style.marginTop = `${offset * -1}px`;
    helperElement.style.visibility = 'hidden';
    helperElement.style.pointerEvents = 'none'; // Prevent interaction with the helper

    anchorSection.classList.add('anchor-helper');
    anchorSection.insertBefore(helperElement, anchorSection.firstChild);
  }

  /**
   * Remove all helper elements and clean up
   */
  destroy = () => {
    const anchorSections = [...document.querySelectorAll('.anchor-helper')];

    anchorSections.forEach(section => {
      section.classList.remove('anchor-helper');
      const helperElement = section.querySelector('.helper-element');
      if (helperElement) {
        helperElement.remove();
      }
    });
  }
}
