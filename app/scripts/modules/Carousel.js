import Swiper from 'swiper';

const defaultConfig = {
  pagination: '.swiper-pagination',
  nextButton: '.carousel__btn--next',
  prevButton: '.carousel__btn--prev',
  paginationClickable: true,
  a11y: true,
  loop: false,
  keyboardControl: true,
  preloadImages: false,
  lazyLoading: true,
  lazyLoadingInPrevNext: true,
  lazyLoadingOnTransitionStart: true,
  buttonDisabledClass: 'is-disabled',
  simulateTouch: false,
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

    this._disableLazyIframes = this._disableLazyIframes.bind(this);

    return this._init();
  }

  _init() {
    this.swipers = Array.prototype.slice.call(
      document.querySelectorAll(this.selector),
    );

    return this.swipers.map(swiper => {
      const options = swiper.getAttribute('data-swiper-options');
      let swiperConfig = this.config;
      if (options) {
        swiperConfig = { ...this.config, ...JSON.parse(options) };
      }

      const swiperInstance = new Swiper(swiper, swiperConfig);
      swiperInstance.on('onSlideChangeEnd', this._disableLazyIframes);

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
}
