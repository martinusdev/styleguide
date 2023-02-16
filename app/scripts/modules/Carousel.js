import Swiper, {
  Navigation, Pagination, Parallax
} from 'swiper';

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

    this.swipers = [];
    this.instances = [];

    this._handleCarouselFanSlideChange = this._handleCarouselFanSlideChange.bind(
      this,
    );

    this._init();

    this.instances.forEach(instance => {
      instance.navigation.update();
    });
  }

  _init() {
    this.swipers = Array.prototype.slice.call(
      document.querySelectorAll(this.selector),
    );

    return this.swipers.map(/** Element */ swiper => {
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
        && !swiper.classList.contains('swiper-initialized')
      ) {
        swiperConfig.navigation = {
          nextEl: swiper.querySelector('.carousel__btn--next'),
          prevEl: swiper.querySelector('.carousel__btn--prev'),
        };

        const swiperInstance = new Swiper(swiper, swiperConfig);
        swiperInstance.update();
        swiperInstance.on('slideChangeTransitionEnd', this._disableLazyIframes);

        swiperInstance.on('transitionEnd', this._handleSlideChange);
        this._handleSlideChange(swiperInstance);

        if (
          swiperInstance.el.parentNode.classList.contains(
            'carousel--fan',
          )
        ) {
          swiperInstance.on(
            'slideChangeTransitionStart',
            this._handleCarouselFanSlideChange,
          );

          this._handleCarouselFanSlideChange(swiperInstance);
        }

        this.instances.push(swiperInstance);
      }

      return swiper;
    });
  }

  _handleSlideChange(instance) { // eslint-disable-line
    if (instance.slides.length === 0) {
      return;
    }

    const activeElement = instance.slides[instance.activeIndex];

    const extraContent = activeElement.querySelector(
      '[data-swipper-extra-content-source]',
    );
    const extraContentTarget = instance.el.querySelector(
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

  _handleCarouselFanSlideChange(instance) { // eslint-disable-line
    const container = instance.el;
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
    this.instances.forEach(instance => {
      instance.update();
    });
    this._init();
  }

  destroy() {
    this.instances.forEach(instance => instance.destroy());
  }
}
