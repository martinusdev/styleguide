/* eslint-disable */
export function customEventPolyfill() {
  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
};
/* eslint-enable */

/* eslint-disable */
export function closestPolyfill() {
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this;
      do {
        i = matches.length;
        while (--i >= 0 && matches.item(i) !== el) {};
      } while ((i < 0) && (el = el.parentElement));
      return el;
    };
  }
}

// Get element position relative to document
export function windowOffset(el) {
  let position = { x: 0, y: 0 };
  if (el.offsetParent) {
    do {
      position.x += el.offsetLeft;
      position.y += el.offsetTop;
    } while (el = el.offsetParent);
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
  parentChildren.push.apply(
    parentChildren,
    parent.children,
  );
  for (let i = 0, l = parentChildren.length; i < l; i++) {
    if (parentChildren[i] !== el) {
      siblings.push(parentChildren[i]);
    }
  }
  return siblings;
}


/* eslint-enable */
