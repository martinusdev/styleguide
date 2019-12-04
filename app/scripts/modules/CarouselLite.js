export default class Carousel {
  /**
   * @param {Carousel} carousel
   * @param {MouseEvent} event
   */
  static hijackMousemoves(carousel, event) {
    // just in case
    Carousel.releaseMousemoves();

    // execute this before mousemove is added
    Carousel.state = {
      element: carousel.scroll,
      initialScroll: {
        x: carousel.scroll.scrollLeft,
      },
      initialMouse: {
        x: event.clientX,
      },
      diff: {
        x: 0,
      },
      clickDisabled: false,
      animationRequested: false,
    };

    window.addEventListener('mousemove', Carousel._mousemove);
    window.addEventListener('mouseup', Carousel._mouseup);
  }

  static releaseMousemoves() {
    window.removeEventListener('mousemove', Carousel._mousemove);
    window.removeEventListener('moveup', Carousel._mouseup);
    // document.body.removeEventListener('click', Carousel._mouseclick);

    // execute this after mousemove was removed
    Carousel.state = null;
  }

  /**
   * @param {MouseEvent} event
   * @private
   */
  static _mousemove(event) {
    // event.preventDefault();

    // when mouse up event occurs, click event can also be fired
    // but since we already stared to move carousel, we want to ignore that click
    Carousel._ignoreNextClick(event);

    Carousel.state.diff.x = Carousel.state.initialMouse.x - event.clientX;

    if (!Carousel.state.animationRequested) {
      Carousel.state.animationRequested = true;
      requestAnimationFrame(Carousel._animate);
    }
  }

  static _animate() {
    if (Carousel.state == null) {
      return;
    }

    const state = Carousel.state;
    state.element.scroll(state.initialScroll.x + state.diff.x, 0);
    Carousel.state.animationRequested = false;
  }

  /**
   * @param {MouseEvent} event
   * @private
   */
  static _mouseclick(event) {
    event.preventDefault();

    if (Carousel.state == null) {
      return false;
    }

    // we only want to ignore one click event, so this handler removes itself :)
    event.target.removeEventListener('click', Carousel._mouseclick);
    Carousel.state.clickDisabled = false;

    return false;
  }

  /**
   * @param {MouseEvent} event
   * @private
   */
  static _mouseup(event) {
    Carousel.releaseMousemoves();
    event.preventDefault();
  }

  /**
   * @private
   */
  static _ignoreNextClick(e) {
    if (!Carousel.state.clickDisabled) {
      e.target.addEventListener('click', Carousel._mouseclick);
      Carousel.state.clickDisabled = true;
    }
  }

  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
    this.scroll = element.querySelector('.mj-carousel__scroll');

    this._clickNavigation();
    this._mousemoveNavigation();
  }

  /**
   * @param {Number} step
   */
  move(step) {
    this.scroll.scroll(this.scroll.scrollLeft + step, 0);
  }

  /**
   * @private
   */
  _clickNavigation() {
    const prev = this.element.querySelector('.mj-carousel__btn--prev');
    const next = this.element.querySelector('.mj-carousel__btn--next');

    const step = this._getStepSize();
    prev.addEventListener('click', () => this.move(-step));
    next.addEventListener('click', () => this.move(+step));
  }

  _getStepSize() {
    const content = this.element.querySelector('.mj-carousel__content');

    if (content.children.length === 0) {
      return 0;
    }

    const slideWidth = content.children[0].offsetWidth;
    const totalWidth = content.clientWidth;

    const stepSize = this.element.getAttribute('data-step');

    if (stepSize === 'one') {
      return slideWidth;
    }

    return Math.floor(totalWidth / slideWidth) * slideWidth;
  }

  /**
   * @private
   */
  _mousemoveNavigation() {
    this.scroll.addEventListener('mousedown', this._mousedown.bind(this));
  }

  /**
   * @param {MouseEvent} event
   * @private
   */
  _mousedown(event) {
    Carousel.hijackMousemoves(this, event);
    event.preventDefault();
  }
}
