// ---------------------------------------------------
// Tabs
// module for handling tabs

import { getSiblings } from './Utils';
import { TOGGLE_EVT } from './Toggle';

const defaultConfig = {
  activeClass: 'is-active',
  navContainerSelector: '[data-tabs-container]',
  navItemSelector: '[data-tabs-item]',
  tabPanesContainerSelector: '.tabs',
  tabPaneSelector: '.tab',
  scrollDelay: '300',
};

export default class Tab {
  constructor(selector = '[role="tab"]:not(.CybotCookiebotDialogNavItemLink)', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this._onClick = this._onClick.bind(this);
    this._handleToggle = this._handleToggle.bind(this);
    this.triggers = [];
    this.tabs = [];
    this._init();
  }

  _init() {
    this.triggers.push.apply(
      this.triggers,
      document.querySelectorAll(this.selector),
    );
    this.triggers.map(trigger => {
      trigger.addEventListener('click', this._onClick);
      return trigger;
    });

    this.tabs.push.apply(
      this.tabs,
      document.querySelectorAll(this.config.tabPaneSelector),
    );
    this.tabs.map(tab => {
      tab.addEventListener(TOGGLE_EVT, this._handleToggle);
      return tab;
    });

    this._assignTriggerAttributes();
    this._assignTabAttributes();
    this._openTabOnLoad();
    this._activateFirstTab();
  }

  destroy() {
    for (let i = 0, l = this.triggers.length; i < l; i++) {
      this.triggers[i].removeEventListener('click', this._onClick);
    }
    this.triggers = [];
    this.tabs = [];
  }

  update() {
    this.destroy();
    this._init();
  }

  _assignTriggerAttributes() {
    for (let i = 0, l = this.triggers.length; i < l; i++) {
      let isActive = false;
      if (
        this.triggers[i].classList.contains(this.config.activeClass)
      ) {
        isActive = true;
      }

      const href = this.triggers[i].getAttribute('href');
      let id;

      if (href.startsWith('#')) {
        id = href.slice(1);
      } else {
        const url = new URL(href, window.location.origin);
        id = url.hash.slice(1);
      }

      if (!id) {
        id = Math.floor(Math.random() * Date.now()).toString(16);
      }

      this.triggers[i].setAttribute('aria-selected', isActive);
      this.triggers[i].setAttribute(
        'aria-controls',
        id,
      );
      this.triggers[i].setAttribute(
        'id',
        `${id}-label`,
      );
    }
    const tabNavContainers = document.querySelectorAll(
      this.config.navContainerSelector,
    );
    for (let i = 0, l = tabNavContainers.length; i < l; i++) {
      tabNavContainers[i].setAttribute('role', 'tablist');
    }
  }

  _assignTabAttributes() {
    for (let i = 0, l = this.tabs.length; i < l; i++) {
      let isActive = false;
      if (this.tabs[i].classList.contains(this.config.activeClass)) {
        isActive = true;
      }
      this.tabs[i].setAttribute('role', 'tabpanel');
      this.tabs[i].setAttribute('aria-hidden', !isActive);
      this.tabs[i].setAttribute(
        'aria-labelledby',
        `${this.tabs[i].getAttribute('id')}-label`,
      );
    }
  }

  _activateFirstTab() {
    const tabContainers = document.querySelectorAll(
      this.config.tabPanesContainerSelector,
    );
    for (let i = 0, l = tabContainers.length; i < l; i++) {
      const tabs = tabContainers[i].querySelectorAll(
        this.config.tabPaneSelector,
      );
      let activeClassAssigned = false;
      for (let j = 0, k = tabs.length; j < k; j++) {
        if (tabs[j].classList.contains(this.config.activeClass)) {
          activeClassAssigned = true;
        }
      }
      if (!activeClassAssigned) {
        tabs.item(0).classList.add(this.config.activeClass);
      }
    }

    const tabNavContainers = document.querySelectorAll(
      this.config.navContainerSelector,
    );
    for (let i = 0, l = tabNavContainers.length; i < l; i++) {
      const navItems = tabNavContainers
        .item(i)
        .querySelectorAll(this.config.navItemSelector);
      let activeClassAssigned = false;
      for (let j = 0, k = navItems.length; j < k; j++) {
        if (navItems.item(j).classList.contains(this.config.activeClass)) {
          activeClassAssigned = true;
        }
      }
      if (!activeClassAssigned) {
        navItems.item(0).classList.add(this.config.activeClass);
      }
    }
  }

  _openTabOnLoad() {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      return;
    }

    for (let i = 0, l = this.tabs.length; i < l; i++) {
      if (this.tabs[i].getAttribute('id') === hash) {
        const tabContainer = this.tabs[i].closest(this.config.tabPanesContainerSelector);

        if (tabContainer && tabContainer.hasAttribute('data-tab-load')) {
          this.toggleTab(this.tabs[i]);
          this._scrollToTab(this.tabs[i]);

          break;
        }
      }
    }
  }

  _scrollToTab(el) {
    const trigger = this._findTrigger(el);
    const triggerContainer = trigger.closest('[role=tablist]');

    if (!triggerContainer) {
      return;
    }

    setTimeout(() => {
      if (window.scrollY > 0) {
        return;
      }

      triggerContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, this.config.scrollDelay);
  }

  _onClick(e) {
    const href = e.currentTarget.getAttribute('href');

    if (!href) {
      return;
    }

    const url = new URL(href, window.location.origin);
    const { hash } = url;

    if (!hash) {
      return;
    }

    const tab = document.querySelector(hash);

    this.toggleTab(tab);
    e.preventDefault();
  }

  _handleToggle(e) {
    this.toggleTab(e.currentTarget);
  }

  toggleTab(el) {
    if (!(el instanceof Element)) {
      el = document.querySelector(el);
    }
    if (!el) {
      return false;
    }
    const container = el.closest(this.config.tabPanesContainerSelector);
    if (!container) {
      return false;
    }
    const siblings = getSiblings(el);
    siblings.forEach(sibling => {
      sibling.classList.remove(this.config.activeClass);
      sibling.setAttribute('aria-hidden', true);
    });
    el.classList.add(this.config.activeClass);
    el.setAttribute('aria-hidden', false);
    this._toggleTabNav(el);
    if (el.parentNode.hasAttribute('data-tab-load')) {
      const currentUrl = new URL(window.location);
      currentUrl.hash = `#${el.getAttribute('id')}`;
      window.history.replaceState(undefined, undefined, currentUrl.toString());
    }
    return true;
  }

  _toggleTabNav(el) {
    const trigger = this._findTrigger(el);
    if (!trigger) {
      return;
    }

    const triggerContainer = trigger.closest(this.config.navContainerSelector);
    if (!triggerContainer) {
      return;
    }

    const currentItem = triggerContainer.querySelector(
      `${this.config.navItemSelector}.${this.config.activeClass} ${this.selector}`,
    )
      || triggerContainer.querySelector(
        `${this.config.navItemSelector}.${this.config.activeClass}${this.selector}`,
      );
    if (trigger === currentItem) {
      return;
    }

    if (currentItem) {
      currentItem
        .closest(this.config.navItemSelector)
        .classList.remove(this.config.activeClass);
      currentItem.setAttribute('aria-selected', false);
    }

    trigger
      .closest(this.config.navItemSelector)
      .classList.add(this.config.activeClass);
    trigger.setAttribute('aria-selected', true);
  }

  _findTrigger(tab) {
    const tabId = tab.getAttribute('id');

    return document.querySelector(
      `${this.selector}[href="#${tabId}"], ${this.selector}[href$="#${tabId}"]`
    );
  }
}
