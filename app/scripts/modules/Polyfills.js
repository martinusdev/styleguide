export function requestAnimationFramePolyfill() {
  function polyfill() {
    let clock = Date.now();

    return callback => {
      const currentTime = Date.now();

      if (currentTime - clock > 16) {
        clock = currentTime;
        callback(currentTime);
      } else {
        setTimeout(() => {
          polyfill(callback);
        }, 0);
      }
    };
  }
  window.requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || polyfill;
}

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
/* eslint-enable */

/* eslint-disable */
export function arrayFromPolyfill() {
  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  if (!Array.from) {
    Array.from = (function () {
      var symbolIterator;
      try {
        symbolIterator = Symbol.iterator
          ? Symbol.iterator
          : 'Symbol(Symbol.iterator)';
      } catch (e) {
        symbolIterator = 'Symbol(Symbol.iterator)';
      }

      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return (
          typeof fn === 'function' ||
          toStr.call(fn) === '[object Function]'
        );
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) return 0;
        if (number === 0 || !isFinite(number)) return number;
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      var setGetItemHandler = function setGetItemHandler(isIterator, items) {
        var iterator = isIterator && items[symbolIterator]();
        return function getItem(k) {
          return isIterator ? iterator.next() : items[k];
        };
      };

      var getArray = function getArray(
        T,
        A,
        len,
        getItem,
        isIterator,
        mapFn
      ) {
        // 16. Let k be 0.
        var k = 0;

        // 17. Repeat, while k < len… or while iterator is done (also steps a - h)
        while (k < len || isIterator) {
          var item = getItem(k);
          var kValue = isIterator ? item.value : item;

          if (isIterator && item.done) {
            return A;
          } else {
            if (mapFn) {
              A[k] =
                typeof T === 'undefined'
                  ? mapFn(kValue, k)
                  : mapFn.call(T, kValue, k);
            } else {
              A[k] = kValue;
            }
          }
          k += 1;
        }

        if (isIterator) {
          throw new TypeError(
            'Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1'
          );
        } else {
          A.length = len;
        }

        return A;
      };

      // The length property of the from method is 1.
      return function from(arrayLikeOrIterator /*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;

        // 2. Let items be ToObject(arrayLikeOrIterator).
        var items = Object(arrayLikeOrIterator);
        var isIterator = isCallable(items[symbolIterator]);

        // 3. ReturnIfAbrupt(items).
        if (arrayLikeOrIterator == null && !isIterator) {
          throw new TypeError(
            'Array.from requires an array-like object or iterator - not null or undefined'
          );
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError(
              'Array.from: when provided, the second argument must be a function'
            );
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        return getArray(
          T,
          A,
          len,
          setGetItemHandler(isIterator, items),
          isIterator,
          mapFn
        );
      };
    })();
  }
}
/* eslint-enable */

/* eslint-disable */
export function includesPolyfill() {
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, fromIndex) {

        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }

        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          // c. Increase k by 1.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          }
          k++;
        }

        // 8. Return false
        return false;
      }
    });
  }
}
/* eslint-enable */
