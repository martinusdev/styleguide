// ----------------------------
// HeaderCollapse

class HeaderCollapse {
  // eslint-disable-next-line default-param-last
  constructor(selector = '.js-header', { offset, target }) {
    this.element = $(selector);
    this.offset = offset;
    this.target = $(target);
    this.didScroll = true;
    this.animating = false;
    this.tempScroll = 0;

    this.binds();
  }

  binds() {
    $(window).on('scroll', () => {
      this.didScroll = true;
    });

    setInterval(() => {
      if (this.didScroll) {
        if (
          $(window).scrollTop() > 0
          && $(window).scrollTop() > this.tempScroll
        ) {
          if (!this.animating) {
            if (!this.target.hasClass('scrolled')) {
              this.target.addClass('scrolled');
              this.animating = true;
              $(window).trigger('scrolled');
              setTimeout(() => {
                this.animating = false;
              }, 200);
            }
          }
        } else if (
          $(window).scrollTop() < this.tempScroll
          && $(window).scrollTop() < 1
        ) {
          if (!this.animating) {
            if (this.target.hasClass('scrolled')) {
              this.target.removeClass('scrolled');
              this.animating = true;
              $(window).trigger('scrolled');
              setTimeout(() => {
                this.animating = false;
              }, 200);
            }
          }
        }
        this.didScroll = false;
        this.tempScroll = $(window).scrollTop();
      }
    }, 100);
  }
}

export default HeaderCollapse;
