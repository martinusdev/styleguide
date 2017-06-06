// ----------------------------
// Sidebars

import './../plugins/custom-scrollbar/jquery.mCustomScrollbar';

class Sidebars {
  constructor(selector = '.js-scrollbar') {
    this.sidebars = $(selector);
    this.didResize = true;

    this.setHeights($('body').hasClass('scrolled') ? 72 : 100);
    this.binds();
    this.setScollbars();
  }

  binds() {
    $(window).on('resize', () => {
      this.didResize = true;
    });

    $(window).on('scrolled', () => {
      if ($('body').hasClass('scrolled')) {
        this.setHeights(72);
      } else {
        this.setHeights(100);
      }
    });

    setInterval(() => {
      if (this.didResize) {
        this.setHeights($('body').hasClass('scrolled') ? 72 : 100);
        this.didResize = false;
      }
    }, 250);
  }

  setHeights(offset) {
    const viewportHeight = $(window).height() - offset;
    this.sidebars.each((i, sidebar) => {
      $(sidebar).css('height', viewportHeight);
    });
  }

  setScollbars() {
    this.sidebars.mCustomScrollbar({
      theme: 'dark-thick',
      scrollButtons: {
        enable: false,
      },
      scrollInertia: 200,
      autoHideScollbar: true,
      advanced: {
        updateOnContentResize: true,
      },
    });
  }
}

export default Sidebars;
