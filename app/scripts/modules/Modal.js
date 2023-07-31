import { Modal } from 'bootstrap';

const defaultConfig = {
  backdrop: true,
  focus: true,
  keyboard: true,
};

export default class ModalWrapper {
  constructor(selector = '[data-bs-modal]', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.modals = [];

    this._init();
  }

  _init() {
    this.modals.push.apply(
      this.modals,
      document.querySelectorAll(this.selector),
    );

    this.modals.forEach(modal => {
      new Modal(modal).show();
    });
  }

  create(element, config = {}) {
    return new Modal(element, { ...this.config, ...config });
  }

  static lockBody(className = defaultConfig.modalBodyIsOpen) {
    // store current scrollTop value
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    document.body.setAttribute('data-lock-scrolltop', scrollTop);
    const pageContainer = document.getElementById('page-container');

    // add locking styles to body
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';

    // add locking styles to scrollTop
    if (pageContainer) {
      pageContainer.style.height = '100%';
      pageContainer.style.width = '100%';
      pageContainer.style.overflow = 'hidden';
      pageContainer.style.position = 'fixed';
      // scroll page-container to scrollTop position
      pageContainer.scrollTop = scrollTop;
    }

    // add modal class
    document.body.classList.add(className);

    // attempt to scroll top fixed position
    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollTop);
    });
  }

  static unlockBody(className = defaultConfig.modalBodyIsOpen) {
    const scrollTop = document.body.getAttribute('data-lock-scrolltop');
    const pageContainer = document.getElementById('page-container');

    // remove locking styles from body
    document.body.style.height = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.body.style.position = '';

    // add modal class
    document.body.classList.remove(className);

    // remove locking styles from page-container
    if (pageContainer) {
      pageContainer.style.height = '';
      pageContainer.style.width = '';
      pageContainer.style.overflow = '';
      pageContainer.style.position = '';
    }

    // set scroll position back

    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollTop);
    });
  }
}

export const { lockBody, unlockBody } = ModalWrapper;
