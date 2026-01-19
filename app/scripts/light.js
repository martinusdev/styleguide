/* eslint-disable import/first */

import './modules/jQueryGlobalHelper';

import $ from 'jquery';
import { ScrollSpy } from 'bootstrap';
import 'jquery-mousewheel';
import { prettyPrint } from './plugins/prettify/prettify';

import HeaderCollapse from './lightModules/HeaderCollapse';
import SmoothScroll from './lightModules/SmoothScroll';
import Sidebars from './lightModules/Sidebars';

$(document).ready(() => {
  const myLight = {};
  const themeStorageKey = 'styleguide-theme';
  const $themeToggle = $('[data-theme-toggle]');

  const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    $themeToggle.attr('aria-pressed', isDark);
    $themeToggle.text(isDark ? 'Light mode' : 'Dark mode');
  };

  const getPreferredTheme = () => {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    if (storedTheme) {
      return storedTheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  };

  myLight.smoothScroll = new SmoothScroll();
  myLight.headerCollapse = new HeaderCollapse(undefined, {
    target: 'body',
    offset: 0,
  });
  myLight.sidebars = new Sidebars();
  prettyPrint();

  window.myLight = myLight;

  $(window).on('activate.bs.scrollspy', () => {
    $('.nav-item.active').removeClass('active');
    $('.nav-item:has(a.active)').addClass('active');
  });

  if ($themeToggle.length) {
    applyTheme(getPreferredTheme());

    $themeToggle.on('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      window.localStorage.setItem(themeStorageKey, nextTheme);
      applyTheme(nextTheme);
    });
  }
});
