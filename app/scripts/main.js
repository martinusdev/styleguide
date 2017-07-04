import svg4everybody from 'svg4everybody';

import {
  customEventPolyfill,
  requestAnimationFramePolyfill,
} from './modules/Utils';
import Select from './modules/Select';
import Toggle from './modules/Toggle';
import Tab from './modules/Tab';
import Dropdown from './modules/Dropdown';
import Modal from './modules/Modal';
import Carousel from './modules/Carousel';
import Collapse from './modules/Collapse';
import Sticky from './modules/Sticky';
import ScrollSpy from './modules/ScrollSpy';
import SmoothScroll from './modules/SmoothScroll';
import Tooltip from './modules/Tooltip';

window.addEventListener('DOMContentLoaded', () => {
  svg4everybody();
  customEventPolyfill();
  requestAnimationFramePolyfill();

  window.myApp = {};

  window.myApp.Toggle = Toggle;
  window.myApp.toggles = new Toggle();

  window.myApp.Dropdown = Dropdown;
  window.myApp.dropdowns = new Dropdown();

  window.myApp.Tab = Tab;
  window.myApp.tabs = new Tab();

  window.myApp.Select = Select;
  window.myApp.selects = new Select();

  window.myApp.Modal = Modal;
  window.myApp.modals = new Modal();

  window.myApp.Carousel = Carousel;
  window.myApp.carousels = new Carousel();

  window.myApp.Collapse = Collapse;
  window.myApp.collapses = new Collapse();

  window.myApp.Sticky = Sticky;
  window.myApp.stickies = new Sticky();

  window.myApp.ScrollSpy = ScrollSpy;
  window.myApp.scrollspies = new ScrollSpy();

  window.myApp.SmoothScroll = SmoothScroll;
  window.myApp.smoothScrolls = new SmoothScroll();

  window.myApp.Tooltip = Tooltip;
  window.myApp.tooltips = new Tooltip();
});
