import Swiper from 'swiper';
import { Navigation, Pagination, Parallax } from 'swiper/modules';

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
  pagination: {
    clickable: true,
  },
  a11y: true,
  loop: false,
  keyboardControl: true,
  watchSlidesProgress: true,
  spaceBetween: 40,
  modules: [Navigation, Pagination, Parallax],
};

export default class SwiperSlider {
  constructor(selector = '.swiper', config = {}) {
    this.selector = selector;
    this.config = { ...defaultConfig, ...config };

    this.instances = new Set();

    this._handleCarouselFanSlideChange = this._handleCarouselFanSlideChange.bind(this);
    this._handleSlideChange = this._handleSlideChange.bind(this);
    this._init();

    this.instances.forEach(instance => {
      instance.navigation.update();
    });
  }

  _init() {
    const swipers = document.querySelectorAll(this.selector);

    swipers.forEach(swiper => {
      if (!this._shouldInitializeSwiper(swiper)) return;

      const swiperConfig = this._createSwiperConfig(swiper);
      const instance = this._createSwiperInstance(swiper, swiperConfig);

      if (instance) {
        this.instances.add(instance);
      }
    });
  }

  _shouldInitializeSwiper(swiper) {
    const breakpointUp = swiper.getAttribute('data-swiper-up');
    const breakpointDown = swiper.getAttribute('data-swiper-down');
    const hasSlides = swiper.querySelectorAll('.swiper-slide').length > 0;
    const notInitialized = !swiper.classList.contains('swiper-initialized');

    return shouldInitalize(
      breakpointUp,
      breakpointDown,
      window.innerWidth,
      BREAKPOINTS
    ) && hasSlides && notInitialized;
  }

  _createSwiperConfig(swiper) {
    const options = swiper.getAttribute('data-swiper-options');
    const baseConfig = options ? { ...this.config, ...JSON.parse(options) } : this.config;

    return {
      ...baseConfig,
      navigation: {
        nextEl: swiper.querySelector('.carousel__btn--next'),
        prevEl: swiper.querySelector('.carousel__btn--prev'),
      }
    };
  }

  _createSwiperInstance(swiper, config) {
    const instance = new Swiper(swiper, config);
    instance.update();

    instance.on('slideChangeTransitionEnd', this._disableLazyIframes);
    instance.on('transitionEnd', this._handleSlideChange);
    this._handleSlideChange(instance);

    if (swiper.parentNode?.classList.contains('carousel--fan')) {
      instance.on('slideChangeTransitionStart', this._handleCarouselFanSlideChange);
      this._handleCarouselFanSlideChange(instance);
    }

    return instance;
  }

  _handleSlideChange(instance) { // eslint-disable-line
    if (instance.slides.length === 0) {
      return;
    }

    const activeElement = instance.slides[instance.activeIndex];

    const extraContent = activeElement.querySelector(
      '[data-swipper-extra-content-source]'
    );
    const extraContentTarget = instance.el.querySelector(
      '[data-swipper-extra-content-target]'
    );

    if (extraContent && extraContentTarget) {
      extraContentTarget.replaceChildren(
        ...([...extraContent.children].map(item => item.cloneNode(true)))
      );
    }
  }

  _handleCarouselFanSlideChange(instance) {
    const container = instance.el;
    const numberOfSlides = getTotalNumberOfSlides(container);
    const numberOfActiveSlides = Math.min(instance.loopedSlides, 5);
    const activeIndex = instance.realIndex;
    const offset = Math.floor(numberOfActiveSlides / 2);

    // Clear old fan indexes
    container.querySelectorAll('[data-carousel-fan-index]')
      .forEach(slide => slide.removeAttribute('data-carousel-fan-index'));

    // Calculate active slide indexes with wrapping
    const activeSlideIndexes = [...Array(numberOfActiveSlides)].map((_, i) => {
      const index = activeIndex - offset + i;
      return this._normalizeSlideIndex(index, numberOfSlides);
    });

    // Apply fan indexes to visible slides
    activeSlideIndexes.forEach((slideIndex, position) => {
      const slide = container.querySelector(
        `.swiper-slide-visible[data-swiper-slide-index="${slideIndex}"]`
      );

      if (slide) {
        slide.setAttribute('data-carousel-fan-index', position - offset);
      }
    });
  }

  _normalizeSlideIndex(index, totalSlides) {
    if (index < 0) {
      return totalSlides + index;
    }
    if (index >= totalSlides) {
      return index - totalSlides;
    }
    return index;
  }

  update() {
    this.instances.forEach(instance => {
      instance.update();
    });
    this._init();
  }

  destroy() {
    this.instances.forEach(instance => instance.destroy());
    this.instances.clear();
  }
}
