/**
 * Get all sibling elements of the provided element
 * @param {Element} el - The element whose siblings to get
 * @returns {Element[]|boolean} - Array of sibling elements or false if invalid input
 */
export const getSiblings = (el) => {
  if (!(el instanceof Element)) {
    return false;
  }
  
  const { parentNode } = el;
  if (!parentNode) {
    return false;
  }

  return [...parentNode.children].filter(child => child !== el);
};

/**
 * Create a DOM element from an HTML string
 * @param {string} elementAsStr - HTML string to convert to an element
 * @returns {Element} - The first created element
 */
export const createElementFromString = (elementAsStr) => {
  const div = document.createElement('div');
  div.innerHTML = elementAsStr.trim();
  return div.firstElementChild;
};

/**
 * Convert a NodeList to an array
 * @param {NodeList} nodeList - The NodeList to convert
 * @returns {Array} - Array of nodes
 */
export const nodeListToArray = (nodeList) => [...nodeList];

/**
 * Get the appropriate transition end event for the current browser
 */
export const transitionEnd = (() => {
  const el = document.createElement('div');
  
  // Map of style property to event name
  const transitions = {
    transition: 'transitionend',
    OTransition: 'otransitionend',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };
  
  // Find the first supported transition event
  return Object.entries(transitions).find(
    ([key]) => el.style[key] !== undefined
  )?.[1] || 'transitionend';
})();

/**
 * Trigger a window resize event
 */
export const triggerResize = () => {
  // Modern browsers only
  window.dispatchEvent(new Event('resize'));
};

/**
 * Check if a value is an object (but not an array)
 * @param {*} val - Value to check
 * @returns {boolean} - True if value is an object but not an array
 */
export const isObject = (val) => 
  val !== null && typeof val === 'object' && !Array.isArray(val);

/**
 * Get a value from a responsive breakpoint map based on screen width
 * @param {Object|*} value - The responsive map object or direct value
 * @param {number} screenWidth - Current screen width
 * @param {string} direction - Direction to match ('up', 'down', or 'only')
 * @returns {*} - The matched value
 */
export const getValueFromResponsiveMap = (
  value,
  screenWidth,
  direction = 'up',
) => {
  // Return direct value if not an object
  if (!isObject(value)) {
    return value;
  }

  // Sort and parse breakpoint keys
  const breakpoints = Object.keys(value)
    .map(key => parseInt(key, 10))
    .sort((a, b) => a - b);

  // Find appropriate value based on screen width and direction
  return breakpoints.reduce((currentValue, breakpoint) => {
    // Determine if this breakpoint should be applied
    const isActive = direction === 'up' ? breakpoint <= screenWidth :
                     direction === 'down' ? breakpoint > screenWidth :
                     direction === 'only' ? breakpoint === screenWidth : 
                     false;
    
    return isActive ? value[breakpoint] : currentValue;
  }, 0);
};

/**
 * Escape special characters in a selector string
 * @param {string} selector - The selector to escape
 * @returns {string} - The escaped selector
 */
export const escapeSelectorName = (selector) => 
  selector.replace(/(:|\.|\[|\])/g, '\\$1');
