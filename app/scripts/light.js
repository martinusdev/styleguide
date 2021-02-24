/* eslint-disable import/first */

import './modules/jQueryGlobalHelper';

import $ from 'jquery';
import 'bootstrap/js/src/scrollspy';
import 'jquery-mousewheel';
import { prettyPrint } from './plugins/prettify/prettify';

import HeaderCollapse from './lightModules/HeaderCollapse';
import SmoothScroll from './lightModules/SmoothScroll';
import Sidebars from './lightModules/Sidebars';

$(document).ready(() => {
  const myLight = {};

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
});
