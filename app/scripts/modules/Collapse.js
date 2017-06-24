const defaultConfig = {};

export default class Collapse {
  constructor(selector = '[data-collapse]', config) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this.sections = [];

    this._init();

    return this;
  }

  destroy() {
    this.sections.forEach(section => {
      Collapse.setNotCollapsible(section);
    });
  }

  update() {
    this.destroy();
    this._init();
  }

  _init() {
    this.sections.push.apply(
      this.sections,
      document.querySelectorAll(this.config.selector),
    );

    this.sections.forEach(section => {
      const height = section.getAttribute('data-collapse');

      if (section.offsetHeight > height) {
        Collapse.setCollapsible(section, height);
      }
    });
  }

  static setCollapsible(el, height) {
    el.classList.add('collapsed');
    el.style.maxHeight = `${height}px`;
  }

  static setNotCollapsible(el) {
    if (el.classList.contains('collapsed')) {
      el.classList.remove('collapsed');
      el.style.maxHeight = 'none';
    }
  }
}
