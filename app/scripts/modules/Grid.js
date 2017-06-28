import { createElementFromString, nodeListToArray } from './Utils';

const defaultConfig = {
  containerSelector: '[data-grid-container]',
  itemSelector: '[data-grid-column]',
  sourceSelector: '[data-grid-source]',
  breakpoints: {
    m: 768,
    l: 1024,
  },
  columns: {
    m: 2,
    l: 3,
  },
  columnTemplate: width => `
    <div class="col--${width}"></div>
  `,
};

export default class Grid {
  constructor(selector = '[data-grid]', config) {
    this.config = { ...defaultConfig, ...{ selector }, ...config };

    this.grids = [];

    return this._init();
  }

  _init() {
    this.grids.push.apply(
      this.grids,
      document.querySelectorAll(this.config.selector),
    );

    this.grids.forEach(grid => {
      const container = grid.querySelector(this.config.containerSelector);
      const source = grid.querySelector(this.config.sourceSelector);
      const breakpoint = this._getBreakpoint();

      if (breakpoint) {
        source.classList.add('visually-hidden');
        this._createColumns(container, breakpoint);

        nodeListToArray(source.children).forEach(item => {
          const column =
            JSON.parse(item.getAttribute('data-grid-column'))[breakpoint] - 1;

          container.children[column].appendChild(item);
        });
      }
    });

    return this.grids;
  }

  _createColumns(container, breakpoint) {
    const columns = this.config.columns[breakpoint];

    for (let i = 0; i < columns; i += 1) {
      const column = createElementFromString(
        this.config.columnTemplate(12 / columns),
      );

      container.appendChild(column);
    }
  }

  _getBreakpoint() {
    return Object.keys(this.config.breakpoints).reduce((acc, key) => {
      if (window.innerWidth > this.config.breakpoints[key]) {
        acc = key;
      }
      return acc;
    }, null);
  }

  update() {
    this.destory();
    this.init();
  }

  destroy() { // eslint-disable-line
    // this.stickies.destroy();
  }
}
