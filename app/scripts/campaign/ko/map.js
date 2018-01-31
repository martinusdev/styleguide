export default class KOMap {
  constructor(selector, target) {
    this.container = document.getElementById(selector);
    this.target = document.getElementById(target);

    this.headerHeight = document.querySelector(
      '.header .header__wrapper',
    ).offsetHeight;

    window.addEventListener('resize', () => this._updateSize(), false);

    this.container.addEventListener(
      'mousemove',
      e => this._mouseMove(e),
      false,
    );

    this.container.addEventListener(
      'mouseover',
      () => {
        this.scroll = true;
      },
      false,
    );

    this.container.addEventListener(
      'mouseout',
      () => {
        this.scroll = false;
      },
      false,
    );

    this.scroll = false;

    this._updateSize();
    this._update();
  }

  dummy() {
    this.dummy = 'dummy';
  }

  _updateSize() {
    this._w = this.container.clientWidth;
    this._h = this.container.clientHeight;

    this.w = this.target.clientWidth;
    this.h = this.target.clientHeight;

    // console.log(`${this._w}:${this._h}:${this.w}:${this.h}`);
  }

  _mouseMove(e) {
    this.x = e.clientX + window.scrollX;
    this.x -= this.container.offsetLeft;

    this.y = e.clientY + window.scrollY;
    this.y -= this.container.offsetTop + this.headerHeight;

    const wHalf = this._w / 2;
    const hHalf = this._h / 2;

    this.xv = this.x - wHalf;
    this.yv = this.y - hHalf;

    this.xv *= 0.02;
    this.yv *= 0.02;
  }

  _update() {
    window.requestAnimationFrame(() => this._update());

    if (this.x && this.y && this.scroll) {
      let x = parseInt(this.target.style.left, 10);
      x -= this.xv;

      if (x > 0) {
        x = 0;
      }
      if (x < -(this.w - this._w)) {
        x = -(this.w - this._w);
      }
      this.target.style.left = `${x}px`;

      let y = parseInt(this.target.style.top, 10);
      y -= this.yv;

      if (y > 0) {
        y = 0;
      }
      if (y < -(this.h - this._h)) {
        y = -(this.h - this._h);
      }
      this.target.style.top = `${y}px`;
    }
  }
}
