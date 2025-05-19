// Get element siblings
export function getSiblings(el) {
  if (!(el instanceof Element)) {
    return false;
  }
  const parent = el.parentNode;
  if (!parent) {
    return false;
  }

  return [...parent.children].filter(child => child !== el);
}

export function createElementFromString(elementAsStr) {
  const div = document.createElement('div');
  div.innerHTML = elementAsStr;
  return div.children[0];
}

export function nodeListToArray(nodeList) {
  return [...nodeList];
}

export const transitionEnd = (() => {
  let transition = null;
  const el = document.createElement('div');
  const transitions = [
    { key: 'transition', value: 'transitionend' },
    { key: 'OTransition', value: 'otransitionend' },
    { key: 'MozTransition', value: 'transitionend' },
    { key: 'WebkitTransition', value: 'webkitTransitionEnd' },
  ];

  transitions.forEach(({ key, value }) => {
    if (el.style[key] !== 'undefined') {
      transition = value;
    }
  });

  return transition;
})();

export function triggerResize() {
  // Modern browsers only - no IE or legacy browser support
  window.dispatchEvent(new Event('resize'));
}

export function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

export function getValueFromResponsiveMap(
  value,
  screenWidth,
  direction = 'up',
) {
  // if value is object
  if (isObject(value)) {
    // sort object keys
    const keys = Object.keys(value)
      .sort((a, b) => a - b)
      .map(key => parseInt(key, 10));

    // get value from
    return keys.reduce((currentValue, key) => {
      let condition;

      switch (direction) {
        case 'up':
          condition = key <= screenWidth;
          break;
        case 'down':
          condition = key > screenWidth;
          break;
        case 'only':
          condition = key === screenWidth;
          break;
        default:
          condition = false;
      }

      return condition ? value[key] : currentValue;
    }, 0);
  }

  return value;
}

export function escapeSelectorName(selector) {
  return selector.replace(/(:|\.|\[|\])/g, '\\$1');
}
