// ----------------------------
// SmoothScroll

class SmoothScroll {
  constructor(
    selector = '[data-smoothscroll]',
    { offset = 0, duration = 500 } = {},
  ) {
    this.$triggers = $(selector);
    this.offset = offset;
    this.duration = duration;

    this.binds();
  }

  binds() {
    this.$triggers.on('click.smoothscroll', e => {
      e.preventDefault();
      e.stopPropagation();
      if ($(e.currentTarget).data('smoothscroll') !== 'none') {
        this.smoothScroll($(e.currentTarget));
      }
    });
  }

  smoothScroll($trigger) {
    const $target = $($trigger.data('smoothscroll'));

    const offset = $target.offset().top - parseInt($('body').css('padding-top'), 10);

    const scroll = $('body').scrollTop() === 0
      ? $('html').scrollTop()
      : $('body').scrollTop(); // Scroll position fix

    const duration = Math.abs(offset - scroll) < 5 ? 0 : this.duration;

    $('html, body').stop().animate({
      scrollTop: $target.offset().top - this.offset,
    }, duration, 'swing', () => {
      // window.location.hash = $trigger.data('smoothscroll');
      $('body').trigger('smoothscroll-stop');
    });
  }
}

export default SmoothScroll;
