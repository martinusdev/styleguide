import { nodeListToArray } from '../../modules/Utils';

export default class KOTimeline {
  constructor() {
    this.swipers = {};
    this.item = 0;
    this.timelineItems = [];

    window.addEventListener('DOMContentLoaded', () => {
      this.initialize();
    });

    window.addEventListener('resize', () => this._onResize(), false);
  }

  initialize() {
    window.myApp.carousels.instances.forEach((swiper) => {
      this.swipers[swiper.params.id] = swiper;
    });

    this.background = document.querySelector('.ko-planets');

    this.timelineItems = nodeListToArray(
      document.querySelectorAll('.ko-timeline-item'),
    );

    this.swipers.planets.on('onTransitionStart', (swiper) => this._slideChange(swiper),);

    this.timelineItems.forEach((item) => {
      item.addEventListener('click', (e) => this._itemClick(e), false);
    });
  }

  _onResize() {
    this.swipers.timeline._slideTo(this.item);
  }

  _itemClick(e) {
    this.item = e.currentTarget.dataset.id;

    this.swipers.planets._slideTo(this.item);
    this._itemChange();
  }

  _slideChange(swiper) {
    this.item = swiper.activeIndex;

    this._itemChange();
  }

  _itemChange() {
    const timelineItem = document.querySelector(`[data-id="${this.item}"]`);

    this.timelineItems.forEach((item) => {
      item.classList.remove('is-active');
    });
    timelineItem.classList.add('is-active');

    this.swipers.timeline._slideTo(this.item);

    this.background.style.backgroundPositionX = `${this.item * 3}%`;
  }

  set(id) {
    this.item = id;

    this.swipers.planets._slideTo(this.item);
    this._itemChange();
  }
}
