import { getValueFromResponsiveMap } from './Utils';

function getOffset(element) {
  const currentOffset =
    JSON.parse(element.getAttribute('data-scroll-offset')) || 0;

  return getValueFromResponsiveMap(currentOffset, window.innerWidth);
}

export default class AnchorScroll {
  constructor(selector = window.location.hash) {
    this.selector = selector;

    return this._init();
  }

  _init() {
    if (this.selector === '') {
      return;
    }

    const anchorSection = document.getElementById(this.selector.substr(1));
    const helperElement = document.createElement('div');

    helperElement.className = 'helper-element';
    helperElement.style.height = `${getOffset(anchorSection)}px`;
    helperElement.style.marginTop = `${getOffset(anchorSection) * -1}px`;
    helperElement.style.visibility = 'hidden';

    anchorSection.classList.add('anchor-helper');
    anchorSection.insertBefore(helperElement, anchorSection.firstChild);

    document.addEventListener('click', this.destroy, {
      once: true,
      capture: true,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  destroy() {
    const anchorSections = document.getElementsByClassName('anchor-helper');

    Array.from(anchorSections).forEach(section => {
      section.classList.remove('anchor-helper');
      section.getElementsByClassName('helper-element')[0].remove();
    });
  }
}
