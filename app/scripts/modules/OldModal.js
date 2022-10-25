import { transitionEnd, triggerResize } from './Utils';
/* eslint import/no-cycle: [0] */
import { TOGGLE_EVT, doToggle } from './Toggle';

const defaultConfig = {
  allowMultipleAttr: 'data-modal-allow-multiple',
  modalZindex: 500,
  modalDialogSelector: '.modal',
  modalHeadlineSelector: '.modal__header__headline',
  modalContentSelector: '.modal__content',
  modalBodyIsOpen: 'has-modal',
  localModalAnchorAttr: 'data-modal-anchor',
  ajaxEnabledAttr: 'data-modal-ajax',
  ajaxLoadingClass: 'modal--loading',
  toggleClassName: 'is-active',
};

const isActive = el => el.classList.contains(defaultConfig.toggleClassName);
export const MODAL_AJAX_LOAD_EVT = 'modalAjaxLoad';
export const MODAL_AJAX_LOADED_EVT = 'modalAjaxLoaded';
export const MODAL_OPEN = 'modalOpen';

export default class OldModal {
  constructor(selector = 'data-modal', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.modals = [];
    this.activeModals = [];
    this.originalTrigger = null;
    this.target = null;
    this.dialog = null;

    this._onToggle = this._onToggle.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onAjaxLoaded = this._onAjaxLoaded.bind(this);
    this._onOverlayTransitionEnd = this._onOverlayTransitionEnd.bind(this);
    this._onOverlayClick = this._onOverlayClick.bind(this);

    this._init();
  }

  update() {
    this._init(false);
  }

  _init(load = true) {
    this.modals.push.apply(
      this.modals,
      document.querySelectorAll(`[${this.selector}]`),
    );

    this.modals.forEach(modal => {
      modal.addEventListener(TOGGLE_EVT, this._onToggle);
      modal.addEventListener('mousedown', this._onOverlayClick);
      if (modal.hasAttribute(this.config.ajaxEnabledAttr)) {
        modal.addEventListener(MODAL_AJAX_LOADED_EVT, this._onAjaxLoaded);
      }
    });

    // do accessibility posielame load parameter, lebo pri otvoreni modalu nechceme tabindex -1
    this._assignAccessibilityAttributes(load);
    if (load) {
      this._openModalOnLoad();
    }
  }

  _openModalOnLoad() {
    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));

      if (!target) {
        return;
      }

      if (target.hasAttribute(this.selector)) {
        doToggle({ target, className: this.config.toggleClassName });
      }
    }
  }

  _assignAccessibilityAttributes(tabindex = true) {
    this.modals.forEach(modal => {
      const dialog = modal.querySelector(this.config.modalDialogSelector);

      if (dialog) {
        dialog.setAttribute('role', 'dialog');
        if (tabindex) {
          dialog.setAttribute('tabindex', '-1');
        }
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

    if (this.dialog) {
      if (this.activeModals.length === 0 && this.target) {
        this.originalTrigger = e.detail.trigger;
      }

      if (isActive(this.target)) {
        this._activateModal();
      } else {
        this._deactivateModal();
      }

      if (!this.target.hasAttribute(this.config.ajaxEnabledAttr)) {
        this._handleUrl();
      } else {
        this._onAjaxInit();
      }
    }
  }

  _onBlur(e) {
    const activeModal = this.activeModals[this.activeModals.length - 1];
    if (!activeModal.dialog.contains(e.relatedTarget)) {
      activeModal.dialog.focus();
    }
  }

  _activateModal() {
    if (!this.target.classList.contains('modal-overlay--local')) {
      OldModal.lockBody();
    }

    this.activeModals.push({
      overlay: this.target,
      dialog: this.dialog,
      trigger: this.trigger,
    });

    if (this.target.classList.contains('modal-overlay--local')) {
      this._positionLocalModal(this.target);
    } else {
      this.dialog.classList.add('is-active');
    }

    this.dialog.focus();
    this.dialog.style.zIndex = this.config.modalZindex + this.activeModals.length;
    this.dialog.setAttribute('aria-hidden', 'false');
    this.dialog.setAttribute('tabindex', '');
    this.dialog.addEventListener('blur', this._onBlur, true);

    this._handleMultipleModals();

    // fix modal dialog height for ios manually (innerHeight)
    // setTimeout(() => {
    //   this.dialog.style.maxHeight = `${window.innerHeight}px`;
    // }, 200); // magic number
  }

  _deactivateModal() {
    for (let i = 0, l = this.activeModals.length; i < l; i++) {
      if (this.activeModals[i].overlay === this.target) {
        this.activeModals[i].dialog.removeEventListener(
          'blur',
          this._onBlur,
          true,
        );
        if (
          this.activeModals[i].overlay.classList.contains(
            'modal-overlay--local',
          )
        ) {
          this.activeModals[i].overlay.addEventListener(
            transitionEnd,
            this._onOverlayTransitionEnd,
          );
        }
        this.activeModals[i].dialog.setAttribute('aria-hidden', 'true');
        this.activeModals[i].dialog.setAttribute('tabindex', '-1');
        this.activeModals[i].dialog.zIndex = 0;
        this.activeModals[i].dialog.classList.remove('is-active');

        if (this.activeModals.length === 1 && this.originalTrigger) {
          this.originalTrigger.focus();
        } else if (
          this._isMultipleAllowed()
          && this.activeModals.length > 1
          && this.activeModals[i].trigger
        ) {
          this.activeModals[i].trigger.focus();
        }

        this.activeModals.splice(i, 1);

        if (this.activeModals.length === 0) {
          OldModal.unlockBody();
        }

        return;
      }
    }
  }

  _handleMultipleModals() {
    if (this.activeModals.length > 1 && !this._isMultipleAllowed()) {
      this.activeModals.forEach(modal => {
        if (modal.overlay !== this.target && isActive(modal.overlay)) {
          doToggle({ target: modal.overlay });
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
        `${window.location.pathname}${window.location.search}`,
      );
    } else {
      window.history.replaceState(
        undefined,
        undefined,
        `${window.location.pathname}${window.location.search}#${this.activeModals[this.activeModals.length - 1].overlay.getAttribute('id')}`,
      );
    }
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

  _positionLocalModal(modal) {
    const anchor = document.querySelector(
      modal.getAttribute(this.config.localModalAnchorAttr),
    );
    if (anchor) {
      anchor.appendChild(modal);
      const icons = modal.querySelectorAll('use');

      Array.prototype.forEach.call(icons, icon => {
        // this is a IE hack, solves disappearing SVG icons
        if (icon.href && icon.href.baseVal) {
          // eslint-disable-next-line no-self-assign
          icon.href.baseVal = icon.href.baseVal; // trigger fixing of href
        }
      });

      setTimeout(() => {
        modal.firstElementChild.classList.add('is-active');
      }, 1);
    }
  }

  _onAjaxInit() {
    this.dialog.classList.add(this.config.ajaxLoadingClass);
    this.target.dispatchEvent(
      new CustomEvent(MODAL_AJAX_LOAD_EVT, { bubbles: true }),
    );
  }

  _onAjaxLoaded() {
    this.dialog.classList.remove(this.config.ajaxLoadingClass);
    triggerResize();
  }

  _onOverlayTransitionEnd(e) {
    if (e.propertyName === 'width' && !isActive(e.currentTarget)) {
      e.currentTarget.removeEventListener(
        transitionEnd,
        this._onOverlayTransitionEnd,
        true,
      );
      document.body.appendChild(e.currentTarget);
    }
  }

  _onOverlayClick(e) {
    if (e.target.hasAttribute(this.selector)) {
      doToggle({
        target: e.target,
        className: 'is-active',
        expand: true,
        state: false,
      });
      this._deactivateModal();
    }
  }
}

export const { lockBody, unlockBody } = OldModal;