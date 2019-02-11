/** docs at https://github.com/alphagov/accessible-autocomplete */
import svg4everybody from 'svg4everybody';

import {
  customEventPolyfill,
  requestAnimationFramePolyfill,
  closestPolyfill,
  includesPolyfill,
} from './modules/Polyfills';

import Alert from './modules/Alert';
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
import Input from './modules/Input';
import NumberSpinner from './modules/NumberSpinner';
import ProductPreview from './modules/ProductPreview';
import MegaMenu from './modules/MegaMenu';
import RadiocheckToggle from './modules/RadiocheckToggle';
import Header from './modules/Header';
import AudioPlayer from './modules/AudioPlayer';
import Clipboard from './modules/Clipboard';
import AnchorScroll from './modules/AnchorScroll';
import EqualColumns from './modules/EqualColumns';
import Autocomplete from './modules/Autocomplete';

import Choices from '../../node_modules/choices.js/assets/scripts/dist/choices';

const APP_LOADED = 'myAppLoaded';
const APP_INIT = 'myAppInit';

window.addEventListener('DOMContentLoaded', () => {
  window.myApp = window.myApp || {};
  window.myApp.Alert = Alert;
  window.myApp.Toggle = Toggle;
  window.myApp.Dropdown = Dropdown;
  window.myApp.Tab = Tab;
  window.myApp.Select = Select;
  window.myApp.Modal = Modal;
  window.myApp.Carousel = Carousel;
  window.myApp.Collapse = Collapse;
  window.myApp.Sticky = Sticky;
  window.myApp.ScrollSpy = ScrollSpy;
  window.myApp.SmoothScroll = SmoothScroll;
  window.myApp.Tooltip = Tooltip;
  window.myApp.Input = Input;
  window.myApp.NumberSpinner = NumberSpinner;
  window.myApp.ProductPreview = ProductPreview;
  window.myApp.MegaMenu = MegaMenu;
  window.myApp.Header = Header;
  window.myApp.RadiocheckToggle = RadiocheckToggle;
  window.myApp.AudioPlayer = AudioPlayer;
  window.myApp.Clipboard = Clipboard;
  window.myApp.AnchorScroll = AnchorScroll;
  window.myApp.EqualColumns = EqualColumns;
  window.myApp.Autocomplete = Autocomplete;

  window.myApp.Choices = Choices;

  document.dispatchEvent(new CustomEvent(APP_INIT, { bubbles: true }));

  svg4everybody();
  customEventPolyfill();
  closestPolyfill();
  requestAnimationFramePolyfill();
  includesPolyfill();

  window.myApp.megaMenu = new MegaMenu();

  window.myApp.toggles = new Toggle();

  window.myApp.dropdowns = new Dropdown();

  window.myApp.tabs = new Tab();

  Select.setLang(window.myApp.selectLanguage);

  window.myApp.selects = new Select();

  window.myApp.modals = new Modal();

  window.myApp.carousels = new Carousel();

  window.myApp.collapses = new Collapse();

  window.myApp.stickies = new Sticky();

  window.myApp.scrollspies = new ScrollSpy();

  window.myApp.smoothScrolls = new SmoothScroll();

  window.myApp.tooltips = new Tooltip();

  window.myApp.inputs = new Input();

  window.myApp.numberSpinners = new NumberSpinner();

  window.myApp.radiocheckToggles = new RadiocheckToggle();

  window.myApp.header = new Header();

  window.myApp.audioPlayers = new AudioPlayer();
  window.myApp.clipboard = new Clipboard();

  window.myApp.anchorScroll = new AnchorScroll();

  window.myApp.equalColumns = new EqualColumns();

  document.dispatchEvent(new CustomEvent(APP_LOADED, { bubbles: true }));
});
