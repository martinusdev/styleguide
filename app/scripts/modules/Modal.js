/**
 * Modal Wrapper
 * A wrapper class for Bootstrap's Modal component with additional functionality
 */
import { Modal } from 'bootstrap';

const defaultConfig = {
  backdrop: true,
  focus: true,
  keyboard: true,
};

export default class ModalWrapper {
  /**
   * Create a new modal wrapper
   * @param {string} selector - Selector for modal elements
   * @param {Object} config - Configuration options
   */
  constructor(selector = '[data-bs-modal]', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.modals = [];
    this.BsModal = Modal;

    this._init();
  }

  /**
   * Initialize the modal wrapper
   * @private
   */
  _init = () => {
    // Find all modal elements matching the selector
    this.modals = [...document.querySelectorAll(this.selector)];

    // Show each modal
    this.modals.forEach(modal => {
      new this.BsModal(modal).show();
    });
  }

  /**
   * Create a new Bootstrap modal instance
   * @param {Element} element - Modal DOM element
   * @param {Object} config - Configuration options
   * @returns {Modal} - Bootstrap modal instance
   */
  create = (element, config = {}) => {
    return new this.BsModal(element, { ...this.config, ...config });
  }

  /**
   * Get an existing Bootstrap modal instance
   * @param {Element} element - Modal DOM element
   * @returns {Modal|null} - Bootstrap modal instance or null
   */
  getInstance = (element) => {
    return this.BsModal.getInstance(element);
  }

  /**
   * Lock the body to prevent scrolling
   * @param {string} className - Class to add to body
   */
  static lockBody = (className = defaultConfig.modalBodyIsOpen) => {
    // Store current scroll position
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const body = document.body;
    const pageContainer = document.getElementById('page-container');

    // Save scroll position as data attribute
    body.setAttribute('data-lock-scrolltop', scrollTop.toString());

    // Apply locking styles to body
    const lockStyles = {
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      position: 'fixed'
    };

    // Apply styles to body
    Object.entries(lockStyles).forEach(([prop, value]) => {
      body.style[prop] = value;
    });

    // Add lock class
    body.classList.add(className);

    // Lock page container if it exists
    if (pageContainer) {
      // Apply same lock styles to page container
      Object.entries(lockStyles).forEach(([prop, value]) => {
        pageContainer.style[prop] = value;
      });

      // Maintain scroll position
      pageContainer.scrollTop = scrollTop;
    }

    // Ensure scroll position is maintained in the viewport
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollTop);
    });
  }

  /**
   * Unlock the body to allow scrolling
   * @param {string} className - Class to remove from body
   */
  static unlockBody = (className = defaultConfig.modalBodyIsOpen) => {
    const body = document.body;
    const scrollTop = parseInt(body.getAttribute('data-lock-scrolltop') || '0', 10);
    const pageContainer = document.getElementById('page-container');

    // Reset all locking styles on body
    const stylesToReset = ['height', 'width', 'overflow', 'position'];
    stylesToReset.forEach(prop => {
      body.style[prop] = '';
    });

    // Remove lock class
    body.classList.remove(className);

    // Reset page container styles if it exists
    if (pageContainer) {
      stylesToReset.forEach(prop => {
        pageContainer.style[prop] = '';
      });
    }

    // Restore scroll position
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollTop);
    });
  }
}

// Export static methods for easy import
export const { lockBody, unlockBody } = ModalWrapper;
