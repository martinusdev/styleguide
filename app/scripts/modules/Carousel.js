import Swiper from 'swiper';

import { nodeListToArray } from './Utils';
import { BREAKPOINTS } from './Const';

const shouldInitalize = (up, down, currentWidth, breakpoints) =>
  !(up && breakpoints[up] >= currentWidth) &&
  !(down && breakpoints[down] < currentWidth);

const defaultConfig = {
  paginationClickable: true,
  a11y: true,
  loop: false,
  keyboardControl: true,
  preloadImages: false,
  lazyLoading: true,
  lazyLoadingInPrevNext: true,
  lazyLoadingOnTransitionStart: true,
  buttonDisabledClass: 'is-disabled',
  onInit: swiper => {
    swiper.container[0].classList.add('is-initialized');
  },
  lazyIframeSelector: 'iframe[src]',
  watchSlidesVisibility: true,
  spaceBetween: 40,
};

export default class SwiperSlider {
  constructor(selector = '.swiper-container', config) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.swipers = [];
    this.instances = [];

    this._disableLazyIframes = this._disableLazyIframes.bind(this);

    this._init();
    return this;
  }

  _init() {
    this.swipers = Array.prototype.slice.call(
      document.querySelectorAll(this.selector),
    );

    return this.swipers.map(swiper => {
      const breakpointUp = swiper.getAttribute('data-swiper-up');
      const breakpointDown = swiper.getAttribute('data-swiper-down');
      const options = swiper.getAttribute('data-swiper-options');
      let swiperConfig = this.config;

      if (options) {
        swiperConfig = { ...this.config, ...JSON.parse(options) };
      }

      if (
        shouldInitalize(
          breakpointUp,
          breakpointDown,
          window.innerWidth,
          BREAKPOINTS,
        )
      ) {
        const swiperInstance = new Swiper(swiper, swiperConfig);
        swiperInstance.on('onSlideChangeEnd', this._disableLazyIframes);

        swiperInstance.on('onTransitionEnd', this._handleSlideChange);
        this._handleSlideChange(swiperInstance);

        this.instances.push(swiperInstance);
      }

      return swiper;
    });
  }

  _disableLazyIframes(swiper) {
    for (let i = 0, l = swiper.slides.length; i < l; i++) {
      const lazyIframe = swiper.slides[i].querySelector(
        this.config.lazyIframeSelector,
      );
      if (lazyIframe) {
        if (lazyIframe.hasAttribute('src')) {
          window.myApp.toggles.doToggle(lazyIframe);
        }
      }
    }
  }

  _handleSlideChange(instance) { // eslint-disable-line
    const activeElement = instance.slides[instance.activeIndex];

    const extraContent = activeElement.querySelector(
      '[data-swipper-extra-content-source]',
    );
    const extraContentTarget = instance.container[0].querySelector(
      '[data-swipper-extra-content-target]',
    );

    if (extraContent && extraContentTarget) {
      while (extraContentTarget.firstChild) {
        extraContentTarget.removeChild(extraContentTarget.firstChild);
      }

      nodeListToArray(extraContent.children).forEach(item => {
        extraContentTarget.appendChild(item.cloneNode(true));
      });
    }
  }
}
