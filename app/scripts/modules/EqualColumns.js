const defaultConfig = {
  childSelector: '[data-equal-column]',
};

export default class EqualColumns {
  constructor(selector = '[data-equal-columns]', config) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this.equalColumns = [];

    this._init();

    return this;
  }

  destroy() {
    this.equalColumns.destroyAll();
  }

  update() {
    this.destroy();
    this._init();
  }

  _init() {
    const rows = document.querySelectorAll(this.config.selector);
    if (rows) {
      rows.forEach(row => {
        const columns = row.querySelectorAll(this.config.childSelector);
        let maxHeight = 0;
        columns.forEach(column => {
          if (column.offsetHeight > maxHeight) maxHeight = column.offsetHeight;
        });
        columns.forEach(column => {
          column.style.height = `${maxHeight}px`;
        });
      });
    }
  }
}
