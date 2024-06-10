import animateScrollTo from 'animated-scroll-to';
import scrollMonitor from 'scrollmonitor';
import { nodeListToArray } from './Utils';

const defaultConfig = {
  selectorSlider: '[data-product-preview-slider]',
  selectorSlide: '[data-product-preview-slide]',
  selectorCurrentPage: '[data-product-preview-page]',
  selectorNextPage: '[data-product-preview-next]',
  selectorPrevPage: '[data-product-preview-prev]',
};

export default class ProductPreview {
  constructor(selector = '[data-product-preview]', config = {}) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this._handleNextPage = this._handleNextPage.bind(this);
    this._handlePrevPage = this._handlePrevPage.bind(this);

    this.slideWatchers = [];
    this.pageing = [];

    this.currentPage = 0;
    this.allPages = 0;

    this._init();
  }

  _init() {
    this.container = document.querySelector(this.config.selector);

    this.slider = this.container.querySelector(this.config.selectorSlider);

    const slides = nodeListToArray(
      this.slider.querySelectorAll(this.config.selectorSlide),
    );

    const currentPage = this.container.querySelector(
      this.config.selectorCurrentPage,
    );

    const nextPageButton = this.container.querySelector(
      this.config.selectorNextPage,
    );

    const prevPageButton = this.container.querySelector(
      this.config.selectorPrevPage,
    );

    nextPageButton.addEventListener('click', this._handleNextPage);
    prevPageButton.addEventListener('click', this._handlePrevPage);

    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowDown' || e.code === 'ArrowRight' || (!e.shiftKey && e.code === 'Space')) {
        this._handleNextPage();
      }

      if (e.code === 'ArrowUp' || e.code === 'ArrowLeft' || (e.shiftKey && e.code === 'Space')) {
        this._handlePrevPage();
      }
    });

    this.sliderMonitor = scrollMonitor.createContainer(this.slider);

    this.allPages = slides.length;

    slides.forEach(slide => {
      const slideWatcher = this.sliderMonitor.create(slide);

      slideWatcher.fullyEnterViewport(() => {
        const page = parseInt(
          slideWatcher.watchItem.getAttribute(
            // remove '[] with slice'
            this.config.selectorSlide.slice(1, -1),
          ),
          10,
        );

        currentPage.innerHTML = `${page + 1}`;
        this.currentPage = page;
      });

      this.slideWatchers.push(slideWatcher);
    });
  }

  _handleNextPage() {
    if (this.currentPage >= this.allPages - 1) {
      return;
    }

    this.setPage(this.currentPage + 1);
  }

  _handlePrevPage() {
    if (this.currentPage < 1) {
      return;
    }

    this.setPage(this.currentPage - 1);
  }

  setPage(page) {
    this.currentPage = page;

    animateScrollTo(this.slideWatchers[this.currentPage].top, {
      elementToScroll: this.slider,
    });
  }

  update() { // eslint-disable-line
    if (this.sliderMonitor) {
      this.sliderMonitor.recalculateLocations();
      this.sliderMonitor.update();

      this.slideWatchers.forEach(watcher => {
        watcher.update();
        watcher.triggerCallbacks();
      });
    }
  }

  destroy() {
    this.slideWatchers.forEach(slideWatcher => {
      slideWatcher.destroy();
    });

    this.slideWatchers = [];
  }
}
