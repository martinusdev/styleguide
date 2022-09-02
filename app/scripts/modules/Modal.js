import Modal from 'bootstrap/js/src/modal';

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
  }

  open(element) {
    return new Modal(element, this.config);
  }
}
