import { closestPolyfill } from './Utils';
import { TOGGLE_EVT } from './Toggle';

closestPolyfill();

const defaultConfig = {
  allowMultipleAttr: 'data-modal-allow-multiple',
  modalZindex: 500,
  modalDialogSelector: '.modal',
  modalHeadlineSelector: '.modal__header__headline',
  modalContentSelector: '.modal__content',
  modalBodyIsOpen: 'has-modal',
};

const isActive = el => el.classList.contains('is-active');

export default class Modal {
  constructor(selector = 'data-modal', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.modals = [];
    this.activeModals = [];
    this.originalTrigger = null;
    this.target = null;
    this.dialog = null;

    this._onToggle = this._onToggle.bind(this);
    this._onBlur = this._onBlur.bind(this);

    this._init();

    return this;
  }

  _init() {
    this.modals.push.apply(
      this.modals,
      document.querySelectorAll(`[${this.selector}]`),
    );

    this.modals.forEach(modal => {
      modal.addEventListener(TOGGLE_EVT, this._onToggle);
    });

    this._assignAccessibilityAttributes();
    this._openModalOnLoad();
  }

  _openModalOnLoad() {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));

      if (!el) {
        return;
      }

      if (el.hasAttribute(this.selector)) {
        window.myApp.toggles.doToggle(el);
      }
    }
  }

  _assignAccessibilityAttributes() {
    this.modals.forEach(modal => {
      const dialog = modal.querySelector(this.config.modalDialogSelector);

      if (dialog) {
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('tabindex', '-1');
        dialog.setAttribute('aria-hidden', 'true');

        const headline = dialog.querySelector(
          this.config.modalHeadlineSelector,
        );

        if (headline) {
          headline.setAttribute('id', `${modal.getAttribute('id')}-label`);
          dialog.setAttribute('aria-labelledby', headline.getAttribute('id'));
        }

        const content = dialog.querySelector(this.config.modalContentSelector);
        if (content) {
          content.setAttribute('id', `${modal.getAttribute('id')}-desc`);
          dialog.setAttribute('aria-describedby', content.getAttribute('id'));
        }
      }
    });
  }

  _onToggle(e) {
    this.target = e.detail.target;
    this.trigger = e.detail.trigger;
    this.dialog = this.target.querySelector(this.config.modalDialogSelector);

    if (this.activeModals.length === 0 && this.target) {
      this.originalTrigger = e.detail.trigger;
    }

    if (isActive(this.target)) {
      this._activateModal();
    } else {
      this._deactivateModal();
    }

    this._handleUrl();
  }

  _onBlur(e) {
    const activeModal = this.activeModals[this.activeModals.length - 1];
    if (!activeModal.dialog.contains(e.relatedTarget)) {
      activeModal.dialog.focus();
    }
  }

  _activateModal() {
    this._lockBody();

    this.activeModals.push({
      overlay: this.target,
      dialog: this.dialog,
      trigger: this.trigger,
    });

    this.dialog.focus();
    this.dialog.style.zIndex =
      this.config.modalZindex + this.activeModals.length;
    this.dialog.setAttribute('aria-hidden', 'false');
    this.dialog.addEventListener('blur', this._onBlur, true);

    this._handleMultipleModals();
  }

  _deactivateModal() {
    for (let i = 0, l = this.activeModals.length; i < l; i++) {
      if (this.activeModals[i].overlay === this.target) {
        this.activeModals[i].dialog.removeEventListener(
          'blur',
          this._onBlur,
          true,
        );
        this.activeModals[i].dialog.setAttribute('aria-hidden', 'true');
        this.activeModals[i].dialog.zIndex = 0;

        if (this.activeModals.length === 1 && this.originalTrigger) {
          this.originalTrigger.focus();
        } else if (
          this._isMultipleAllowed() &&
          this.activeModals.length > 1 &&
          this.activeModals[i].trigger
        ) {
          this.activeModals[i].trigger.focus();
        }

        this.activeModals.splice(i, 1);

        if (this.activeModals.length === 0) {
          this._unlockBody();
        }

        return;
      }
    }
  }

  _handleMultipleModals() {
    if (this.activeModals.length > 1 && !this._isMultipleAllowed()) {
      this.activeModals.forEach(modal => {
        if (modal.overlay !== this.target && isActive(modal.overlay)) {
          window.myApp.toggles.doToggle(modal.overlay);
        }
      });
    }
  }

  _isMultipleAllowed() {
    let allowed = true;

    this.activeModals.forEach(modal => {
      if (!modal.overlay.hasAttribute(this.config.allowMultipleAttr)) {
        allowed = false;
      }
    });

    return allowed;
  }

  _handleUrl() {
    if (this.activeModals.length === 0) {
      window.history.replaceState(
        undefined,
        undefined,
        window.location.pathname,
      );
    } else {
      window.history.replaceState(
        undefined,
        undefined,
        `#${this.activeModals[this.activeModals.length - 1].overlay.getAttribute('id')}`,
      );
    }
  }

  _lockBody() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    // add negative top to counter position: fixed; posiiton
    if (scrollTop) {
      document.body.style.top = `-${scrollTop}px`;
    }

    // add modal class to body
    document.body.classList.add(this.config.modalBodyIsOpen);
  }

  _unlockBody() {
    const scrollTop = Math.abs(parseInt(document.body.style.top, 10));

    // remove modal body class
    document.body.classList.remove(this.config.modalBodyIsOpen);

    // remove css top
    document.body.style.top = null;
    // set original scrollTop

    document.documentElement.scrollTop = scrollTop;
    document.body.scrollTop = scrollTop;
  }
}
