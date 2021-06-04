import Swiper from 'swiper';
import { doToggle } from './Toggle';

import { nodeListToArray } from './Utils';
import { BREAKPOINTS } from './Const';

const shouldInitalize = (
  up,
  down,
  currentWidth,
  breakpoints
) => !(up && breakpoints[up] >= currentWidth)
  && !(down && breakpoints[down] < currentWidth);

const getTotalNumberOfSlides = container => container.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)')
  .length;

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
    this._handleCarouselFunSlideChange = this._handleCarouselFunSlideChange.bind(
      this,
    );

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
        && swiper.querySelectorAll('.swiper-slide').length
        && !swiper.classList.contains('is-initialized')
      ) {
        const swiperInstance = new Swiper(swiper, swiperConfig);
        swiperInstance.on('onSlideChangeEnd', this._disableLazyIframes);

        swiperInstance.on('onTransitionEnd', this._handleSlideChange);
        this._handleSlideChange(swiperInstance);

        if (
          swiperInstance.container[0].parentNode.classList.contains(
            'carousel--fan',
          )
        ) {
          swiperInstance.on(
            'onSlideChangeStart',
            this._handleCarouselFunSlideChange,
          );

          this._handleCarouselFunSlideChange(swiperInstance);
        }

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
          doToggle({ target: lazyIframe });
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

  _handleCarouselFunSlideChange(instance) { // eslint-disable-line
    const container = instance.container[0];
    const numberOfSlides = getTotalNumberOfSlides(container);
    const numberOfActiveSlides = Math.min(instance.loopedSlides, 5);
    const activeIndex = instance.realIndex;
    const offset = Math.floor(numberOfActiveSlides / 2);

    // remove old indexes
    nodeListToArray(
      container.querySelectorAll('[data-carousel-fan-index]'),
    ).forEach(slide => {
      slide.removeAttribute('data-carousel-fan-index');
    });

    // create array of active slides
    const arrayOfActiveSlides = [];
    for (let i = activeIndex - offset; i <= activeIndex + offset; i += 1) {
      let index = i;

      if (i < 0) {
        index = numberOfSlides - -i;
      } else if (i >= numberOfSlides) {
        index = i - numberOfSlides;
      }

      arrayOfActiveSlides.push(index);
    }

    // mark all visible slides with offset
    arrayOfActiveSlides.forEach((slideIndex, index) => {
      // find visible slide based on slideIndex
      const slide = container.querySelector(
        `[data-swiper-slide-index="${slideIndex}"].swiper-slide-visible`,
      );

      // set offset
      if (slide) {
        slide.setAttribute('data-carousel-fan-index', index - offset);
      }
    });
  }

  update() {
    this.instances.forEach(instance => instance.update());
    this._init();
  }

  destroy() {
    this.instances.forEach(instance => instance.destroy());
  }
}
