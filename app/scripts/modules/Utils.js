// Get element position relative to document
export function windowOffset(el) {
  const position = { x: 0, y: 0 };
  if (el.offsetParent) {
    do {
      position.x += el.offsetLeft;
      position.y += el.offsetTop;
    } while ((el = el.offsetParent)); // eslint-disable-line
  }
  return position;
}

// Get element siblings
export function getSiblings(el) {
  if (!(el instanceof Element)) {
    return false;
  }
  const parent = el.parentNode;
  if (!parent) {
    return false;
  }
  const parentChildren = [];
  const siblings = [];

  parentChildren.push.apply(parentChildren, parent.children);

  for (let i = 0, l = parentChildren.length; i < l; i++) {
    if (parentChildren[i] !== el) {
      siblings.push(parentChildren[i]);
    }
  }
  return siblings;
}

/* eslint-disable no-continue */
export function getPreviousSiblings(elem) {
  const sibs = [];
  while ((elem = elem.previousSibling)) { // eslint-disable-line
    if (elem.nodeType === 3) continue; // text node
    sibs.push(elem);
  }
  return sibs;
}
/* eslint-enable */

export function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export function createElementFromString(elementAsStr) {
  const div = document.createElement('div');
  div.innerHTML = elementAsStr;
  return div.children[0];
}

export function nodeListToArray(nodeList) {
  const arr = [];
  arr.push.apply(arr, nodeList);

  return arr;
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

  for (let i = 0, l = transitions.length; i < l; i++) {
    if (el.style[transitions[i].key] !== 'undefined') {
      transition = transitions[i].value;
    }
  }
  return transition;
})();

export function triggerResize() {
  if (typeof Event === 'function') {
    // this helps recalculate swiper in modal
    // modern browsers
    window.dispatchEvent(new Event('resize'));
  } else {
    // for IE and other old browsers
    // causes deprecation warning on modern browsers
    const evt = window.document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt);
  }
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
  const selectorName = selector.replace(/(:|\.|\[|\])/g, '\\$1');

  return selectorName;
}
