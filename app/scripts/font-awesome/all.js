(function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var _WINDOW = {};
  var _DOCUMENT = {};

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid',
    'fasr': 'regular',
    'fa-regular': 'regular',
    'fasl': 'light',
    'fa-light': 'light'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass',
    'regular': 'fasr',
    'light': 'fasl'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid',
    'fasr': 'fa-regular',
    'fasl': 'fa-light'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass',
    'fa-regular': 'fasr',
    'fa-light': 'fasl'
  }), _familyProxy4));
  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass',
    '400': 'fasr',
    '300': 'fasl'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    
    "martinus": [512,512,[],"e000","M256 49.067C140.8 49.067 6.4 57.6 6.4 256S155.733 462.933 256 462.933c98.133 0 249.6-8.533 249.6-206.933S373.333 49.067 256 49.067zm162.133 204.8L369.067 204.8c-19.2-19.2-40.534-42.667-78.934 2.133L377.6 294.4l-40.533 40.533L206.933 204.8c-21.333-21.333-42.666-42.667-78.933 4.267L296.533 377.6 256 416 55.467 213.333C166.4 57.6 217.6 132.267 251.733 168.533c78.934-83.2 115.2-49.066 162.134 0l42.666 44.8-38.4 40.534z"],
    "owl": [512,512,[],"e001","M101.5 172.9a49.2 49.2 0 1 0 98.5 0 49.2 49.2 0 1 0 -98.5 0zm32.1 0a17.2 17.2 0 1 1 34.4 0 17.2 17.2 0 1 1 -34.4 0zm217.8-49.2a49.2 49.2 0 1 0 0 98.5 49.2 49.2 0 1 0 0-98.5zm0 32a17.2 17.2 0 1 1 0 34.4 17.2 17.2 0 1 1 0-34.4zM377 0H125.1C76.3 0 36.6 39.7 36.6 88.5V349.2c0 89.8 73 162.8 162.8 162.8H302.8c89.8 0 162.8-73 162.8-162.8V88.5C465.6 39.7 425.8 0 377 0zM313 32l-50.7 69.5c-.1 .2-.2 .4-.3 .6c-4.1 5.1-7.8 10.6-10.9 16.4c-3.2-5.8-6.9-11.2-10.9-16.4c-.1-.2-.2-.4-.3-.6L189.1 32H313zM260.5 241.8l-9.4 16.4-9.4-16.4c2.9-3.8 5.5-7.7 7.9-11.8h3.1c2.4 4.1 5 8 7.9 11.8zM68.6 172.9a82.1 82.1 0 1 1 164.2 0 82.1 82.1 0 1 1 -164.2 0zM125.1 32h24.3l20.8 28.5c-6.3-1.1-12.8-1.8-19.5-1.8c-32.2 0-61.3 13.5-82.1 35.1V88.5h0C68.6 57.4 94 32 125.1 32zM199.4 480c-72.1 0-130.7-58.6-130.7-130.7V252.1c11.2 11.7 24.9 20.9 40.2 27c12.2 11.3 87.1 84.9 93.6 200.9h-3.1v0zm35.3 0c-4.4-89.9-45.3-156.3-75.1-193.3c21.8-1.7 41.9-9.5 58.6-21.7l19.2 33.2c2.9 5 8.2 8 13.9 8s11-3.1 13.9-8L284.1 265c16.7 12.2 36.7 20 58.5 21.7c-29.9 37-70.7 103.4-75.1 193.3H234.6zm68.2 0h-3.1C306.2 364.4 381 290.4 393.3 279c15.3-6.1 29-15.3 40.2-27v97.2h0c0 72.1-58.6 130.7-130.7 130.7zM351.4 90.8a82.1 82.1 0 1 1 0 164.3 82.1 82.1 0 1 1 0-164.3zm82.1 3c-20.8-21.6-49.9-35.1-82.1-35.1c-6.7 0-13.1 .7-19.5 1.8L352.7 32H377c31.2 0 56.5 25.3 56.5 56.5v5.3z"],
    "owl-plus": [488,512,[],"e002","M96.9 164.7a46.9 46.9 0 1 0 93.8 0 46.9 46.9 0 1 0 -93.8 0zm30.5 0a16.4 16.4 0 1 1 32.7 0 16.4 16.4 0 1 1 -32.7 0zm207.5-46.9a46.9 46.9 0 1 0 0 93.8 46.9 46.9 0 1 0 0-93.8zm0 30.5a16.4 16.4 0 1 1 0 32.7 16.4 16.4 0 1 1 0-32.7zM119.4 0H359.2c46.5 0 84.3 37.8 84.3 84.3V241.9c-16.4-10.4-34.9-17.5-54.7-20.7c14.9-14.3 24.2-34.3 24.2-56.5c0-43.1-35.1-78.2-78.2-78.2s-78.2 35.1-78.2 78.2c0 30.8 17.9 57.5 43.9 70.3c-10.1 5.1-19.5 11.3-28.1 18.5c-.5-.4-1.1-.8-1.6-1.2l-3 5.2c-10.9 9.9-20.2 21.4-27.7 34.1c-.2 0-.5 0-.7 0c-5.5 0-10.5-2.9-13.2-7.6l-18.3-31.6c-15.9 11.6-35 19.1-55.8 20.7c28.5 35.3 67.3 98.5 71.6 184.1h27.9c9.5 11.8 20.7 22.1 33.4 30.5H190c-85.5 0-155-69.5-155-155V84.3C35 37.8 72.9 0 119.4 0zM250 96.7l48.3-66.2h-118l48.3 66.2c.1 .1 .1 .2 .2 .3c0 .1 .1 .2 .1 .3c3.9 4.9 7.4 10.1 10.4 15.6c3-5.5 6.5-10.7 10.4-15.6c.1-.1 .1-.2 .1-.2c.1-.1 .1-.2 .2-.3zM239.3 245.8l9-15.6c-2.7-3.6-5.2-7.3-7.5-11.2h-3c-2.3 3.9-4.8 7.7-7.5 11.2l9 15.6zm-95.5-2.9a78.2 78.2 0 1 0 0-156.4 78.2 78.2 0 1 0 0 156.4zM142.5 30.5H119.4c-29.7 0-53.8 24.1-53.8 53.8h0v5C85.3 68.8 113.1 56 143.8 56c6.3 0 12.5 .7 18.6 1.7L142.5 30.5zm-77 302.1c0 68.6 55.9 124.5 124.5 124.5v0h3c-6.2-110.5-77.5-180.6-89.2-191.3C89.3 260 76.3 251.2 65.5 240v92.5zM334.8 56c30.7 0 58.4 12.8 78.2 33.4v-5c0-29.7-24.1-53.8-53.8-53.8H336.1L316.3 57.7c6-1 12.2-1.7 18.6-1.7zM244 366.5c0-67.3 54.6-122.7 121.9-122.7s121.9 55.4 121.9 122.7s-54.6 121.9-121.9 121.9s-121.9-54.6-121.9-121.9zm135.5-54.9c0-6.7-6.1-13.5-13.5-13.5s-13.5 6.9-13.5 13.5v40.6H311.7c-7.5 0-13.5 6.9-13.5 13.5c0 8.2 6.1 13.5 13.5 13.5h40.6v40.6c0 8.2 6.1 13.5 13.5 13.5s13.5-5.3 13.5-13.5V379.3h40.6c7.5 0 13.5-5.3 13.5-13.5c0-6.7-6.1-13.5-13.5-13.5H379.5V311.5z"]

  };
  var prefixes$1 = [null    ,'fak',
    ,'fa-kit'

  ];
  bunker(function () {
    var _iterator = _createForOfIteratorHelper(prefixes$1),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prefix = _step.value;
        if (!prefix) continue;
        defineIcons(prefix, icons);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });

}());


(function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var _WINDOW = {};
  var _DOCUMENT = {};

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid',
    'fasr': 'regular',
    'fa-regular': 'regular',
    'fasl': 'light',
    'fa-light': 'light'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass',
    'regular': 'fasr',
    'light': 'fasl'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid',
    'fasr': 'fa-regular',
    'fasl': 'fa-light'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass',
    'fa-regular': 'fasr',
    'fa-light': 'fasl'
  }), _familyProxy4));
  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass',
    '400': 'fasr',
    '300': 'fasl'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    
    "facebook-f": [320,512,[],"f39e","M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"],
    "foursquare": [368,512,[],"f180","M323.1 3H49.9C12.4 3 0 31.3 0 49.1v433.8c0 20.3 12.1 27.7 18.2 30.1 6.2 2.5 22.8 4.6 32.9-7.1C180 356.5 182.2 354 182.2 354c3.1-3.4 3.4-3.1 6.8-3.1h83.4c35.1 0 40.6-25.2 44.3-39.7l48.6-243C373.8 25.8 363.1 3 323.1 3zm-16.3 73.8l-11.4 59.7c-1.2 6.5-9.5 13.2-16.9 13.2H172.1c-12 0-20.6 8.3-20.6 20.3v13c0 12 8.6 20.6 20.6 20.6h90.4c8.3 0 16.6 9.2 14.8 18.2-1.8 8.9-10.5 53.8-11.4 58.8-.9 4.9-6.8 13.5-16.9 13.5h-73.5c-13.5 0-17.2 1.8-26.5 12.6 0 0-8.9 11.4-89.5 108.3-.9.9-1.8.6-1.8-.3V75.9c0-7.7 6.8-16.6 16.6-16.6h219c8.2 0 15.6 7.7 13.5 17.5z"],
    "google": [488,512,[],"f1a0","M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"],
    "instagram": [448,512,[],"f16d","M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"],
    "twitter": [512,512,[],"f099","M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"],
    "youtube": [576,512,["61802"],"f167","M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"]

  };
  var prefixes$1 = [null    ,'fab',
    ,'fa-brands'

  ];
  bunker(function () {
    var _iterator = _createForOfIteratorHelper(prefixes$1),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prefix = _step.value;
        if (!prefix) continue;
        defineIcons(prefix, icons);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });

}());

(function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var _WINDOW = {};
  var _DOCUMENT = {};

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid',
    'fasr': 'regular',
    'fa-regular': 'regular',
    'fasl': 'light',
    'fa-light': 'light'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass',
    'regular': 'fasr',
    'light': 'fasl'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid',
    'fasr': 'fa-regular',
    'fasl': 'fa-light'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass',
    'fa-regular': 'fasr',
    'fa-light': 'fasl'
  }), _familyProxy4));
  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass',
    '400': 'fasr',
    '300': 'fasl'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    
    "arrow-down": [384,512,["8595"],"f063","M174.6 472.6c4.5 4.7 10.8 7.4 17.4 7.4s12.8-2.7 17.4-7.4l168-176c9.2-9.6 8.8-24.8-.8-33.9s-24.8-8.8-33.9 .8L216 396.1 216 56c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 340.1L41.4 263.4c-9.2-9.6-24.3-9.9-33.9-.8s-9.9 24.3-.8 33.9l168 176z"],
    "arrow-down-right": [384,512,[],"e093","M328 416c13.3 0 24-10.7 24-24V152c0-13.3-10.7-24-24-24s-24 10.7-24 24V334.1L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l231 231H88c-13.3 0-24 10.7-24 24s10.7 24 24 24H328z"],
    "arrow-down-to-bracket": [448,512,[],"e094","M369 217L241 345c-9.4 9.4-24.6 9.4-33.9 0L79 217c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l87 87V24c0-13.3 10.7-24 24-24s24 10.7 24 24V270.1l87-87c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM48 344v80c0 22.1 17.9 40 40 40H360c22.1 0 40-17.9 40-40V344c0-13.3 10.7-24 24-24s24 10.7 24 24v80c0 48.6-39.4 88-88 88H88c-48.6 0-88-39.4-88-88V344c0-13.3 10.7-24 24-24s24 10.7 24 24z"],
    "arrow-left": [448,512,["8592"],"f060","M7.4 273.4C2.7 268.8 0 262.6 0 256s2.7-12.8 7.4-17.4l176-168c9.6-9.2 24.8-8.8 33.9 .8s8.8 24.8-.8 33.9L83.9 232 424 232c13.3 0 24 10.7 24 24s-10.7 24-24 24L83.9 280 216.6 406.6c9.6 9.2 9.9 24.3 .8 33.9s-24.3 9.9-33.9 .8l-176-168z"],
    "arrow-pointer": [320,512,["mouse-pointer"],"f245","M144 272h85.8L48 110.4V356.8l59.9-68.4C117 278 130.2 272 144 272zM0 426V55.2C0 42.4 10.4 32 23.2 32c5.7 0 11.2 2.1 15.4 5.9l274 243.6c4.7 4.2 7.4 10.2 7.4 16.5c0 12.2-9.9 22.1-22.1 22.1H170.5l59.1 126.8c5.6 12 .4 26.3-11.6 31.9s-26.3 .4-31.9-11.6L126.7 339.7 38.6 440.5C34.4 445.3 28.4 448 22 448c-12.2 0-22-9.9-22-22z"],
    "arrow-right": [448,512,["8594"],"f061","M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z"],
    "arrow-right-from-bracket": [512,512,["sign-out"],"f08b","M505 273c9.4-9.4 9.4-24.6 0-33.9L377 111c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l87 87L184 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l246.1 0-87 87c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L505 273zM168 80c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 32C39.4 32 0 71.4 0 120L0 392c0 48.6 39.4 88 88 88l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l80 0z"],
    "arrow-up": [384,512,["8593"],"f062","M209.4 39.4C204.8 34.7 198.6 32 192 32s-12.8 2.7-17.4 7.4l-168 176c-9.2 9.6-8.8 24.8 .8 33.9s24.8 8.8 33.9-.8L168 115.9V456c0 13.3 10.7 24 24 24s24-10.7 24-24V115.9L342.6 248.6c9.2 9.6 24.3 9.9 33.9 .8s9.9-24.3 .8-33.9l-168-176z"],
    "arrow-up-from-bracket": [448,512,[],"e09a","M241 7c-9.4-9.4-24.6-9.4-33.9 0L79 135c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l87-87V328c0 13.3 10.7 24 24 24s24-10.7 24-24V81.9l87 87c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L241 7zM48 344c0-13.3-10.7-24-24-24s-24 10.7-24 24v80c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V344c0-13.3-10.7-24-24-24s-24 10.7-24 24v80c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V344z"],
    "arrow-up-right": [384,512,[],"e09f","M328 96c13.3 0 24 10.7 24 24V360c0 13.3-10.7 24-24 24s-24-10.7-24-24V177.9L73 409c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l231-231H88c-13.3 0-24-10.7-24-24s10.7-24 24-24H328z"],
    "atom": [512,512,["9883"],"f5d2","M306.3 417.2c-16.3-4.7-33.1-10.9-50.3-18.4c-17.1 7.5-34 13.6-50.3 18.4C224.1 455.5 243.1 464 256 464s31.9-8.5 50.3-46.8zM293 325.7c14.8-8.9 28.7-18.1 41.4-27.6c1-13.5 1.6-27.6 1.6-42.1s-.5-28.6-1.6-42.1c-12.8-9.4-26.6-18.7-41.4-27.6c-12.5-7.5-24.9-14.2-37-20.2c-12.1 6-24.5 12.7-37 20.2c-14.8 8.9-28.7 18.1-41.4 27.6c-1 13.5-1.6 27.6-1.6 42.1s.5 28.6 1.6 42.1c12.8 9.4 26.6 18.7 41.4 27.6c12.5 7.5 24.9 14.2 37 20.2c12.1-6 24.5-12.7 37-20.2zm120.5-32.2c-10.2 10.2-21.3 20.2-33.4 29.9c-2.4 20.1-5.8 39.2-10.3 57c37.2 2.2 51.9-9.1 57.8-19.7c6.5-11.7 8.2-32.8-14.1-67.2zM469.6 128c20.7 37.1 9.4 82.8-23.6 128c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2zM84.4 360.7c5.9 10.6 20.6 22 57.8 19.7c-4.5-17.8-7.9-36.9-10.3-57c-12-9.7-23.2-19.8-33.4-29.9C76.2 327.8 77.8 349 84.4 360.7zM98.5 218.5c10.2-10.2 21.3-20.2 33.4-29.9c2.4-20.1 5.8-39.2 10.3-57c-37.2-2.3-51.9 9.1-57.8 19.7c-6.5 11.7-8.2 32.8 14.1 67.2zM256 113.2c17.1-7.5 34-13.6 50.3-18.4C287.9 56.5 268.9 48 256 48s-31.9 8.5-50.3 46.8c16.3 4.7 33.1 10.9 50.3 18.4zm124.2 75.4c12 9.7 23.2 19.8 33.4 29.9c22.3-34.3 20.6-55.5 14.1-67.2c-5.9-10.6-20.6-22-57.8-19.7c4.5 17.8 7.9 36.9 10.3 57zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],
    "badge-percent": [512,512,[],"f646","M200.3 81.5C210.9 61.5 231.9 48 256 48s45.1 13.5 55.7 33.5C317.1 91.7 329 96.6 340 93.2c21.6-6.6 46.1-1.4 63.1 15.7s22.3 41.5 15.7 63.1c-3.4 11 1.5 22.9 11.7 28.2c20 10.6 33.5 31.6 33.5 55.7s-13.5 45.1-33.5 55.7c-10.2 5.4-15.1 17.2-11.7 28.2c6.6 21.6 1.4 46.1-15.7 63.1s-41.5 22.3-63.1 15.7c-11-3.4-22.9 1.5-28.2 11.7c-10.6 20-31.6 33.5-55.7 33.5s-45.1-13.5-55.7-33.5c-5.4-10.2-17.2-15.1-28.2-11.7c-21.6 6.6-46.1 1.4-63.1-15.7S86.6 361.6 93.2 340c3.4-11-1.5-22.9-11.7-28.2C61.5 301.1 48 280.1 48 256s13.5-45.1 33.5-55.7C91.7 194.9 96.6 183 93.2 172c-6.6-21.6-1.4-46.1 15.7-63.1S150.4 86.6 172 93.2c11 3.4 22.9-1.5 28.2-11.7zM256 0c-35.9 0-67.8 17-88.1 43.4c-33-4.3-67.6 6.2-93 31.6s-35.9 60-31.6 93C17 188.2 0 220.1 0 256s17 67.8 43.4 88.1c-4.3 33 6.2 67.6 31.6 93s60 35.9 93 31.6C188.2 495 220.1 512 256 512s67.8-17 88.1-43.4c33 4.3 67.6-6.2 93-31.6s35.9-60 31.6-93C495 323.8 512 291.9 512 256s-17-67.8-43.4-88.1c4.3-33-6.2-67.6-31.6-93s-60-35.9-93-31.6C323.8 17 291.9 0 256 0zM192 224a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm160 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM337 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L175 303c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L337 209z"],
    "bandage": [640,512,["129657","band-aid"],"f462","M448 144V368H560c17.7 0 32-14.3 32-32V176c0-17.7-14.3-32-32-32H448zM192 96H448 560c44.2 0 80 35.8 80 80V336c0 44.2-35.8 80-80 80H448 192 80c-44.2 0-80-35.8-80-80V176c0-44.2 35.8-80 80-80H192zm0 272V144H80c-17.7 0-32 14.3-32 32V336c0 17.7 14.3 32 32 32H192zm80-136a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm120-24a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM272 328a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm120-24a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"],
    "bars": [448,512,["navicon"],"f0c9","M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z"],
    "bars-sort": [448,512,[],"e0ae","M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM192 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H168c13.3 0 24 10.7 24 24z"],
    "basket-shopping": [576,512,["shopping-basket"],"f291","M243.1 2.7c11.8 6.1 16.3 20.6 10.2 32.4L171.7 192H404.3L322.7 35.1c-6.1-11.8-1.5-26.3 10.2-32.4s26.2-1.5 32.4 10.2L458.4 192h36.1H544h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H532L476.1 463.5C469 492 443.4 512 414 512H162c-29.4 0-55-20-62.1-48.5L44 240H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h8H81.5h36.1L210.7 12.9c6.1-11.8 20.6-16.3 32.4-10.2zM93.5 240l53 211.9c1.8 7.1 8.2 12.1 15.5 12.1H414c7.3 0 13.7-5 15.5-12.1l53-211.9H93.5zM224 312v80c0 13.3-10.7 24-24 24s-24-10.7-24-24V312c0-13.3 10.7-24 24-24s24 10.7 24 24zm64-24c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24s-24-10.7-24-24V312c0-13.3 10.7-24 24-24zm112 24v80c0 13.3-10.7 24-24 24s-24-10.7-24-24V312c0-13.3 10.7-24 24-24s24 10.7 24 24z"],
    "book": [448,512,["128212"],"f02d","M0 88C0 39.4 39.4 0 88 0H392c30.9 0 56 25.1 56 56V344c0 22.3-13.1 41.6-32 50.6V464h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H80c-44.2 0-80-35.8-80-80c0-2.7 .1-5.4 .4-8H0V88zM80 400c-17.7 0-32 14.3-32 32s14.3 32 32 32H368V400H80zM48 358.7c9.8-4.3 20.6-6.7 32-6.7H392c4.4 0 8-3.6 8-8V56c0-4.4-3.6-8-8-8H88C65.9 48 48 65.9 48 88V358.7zM152 112H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z"],
    "book-atlas": [448,512,["atlas"],"f558","M0 88C0 39.4 39.4 0 88 0H392c30.9 0 56 25.1 56 56V344c0 22.3-13.1 41.6-32 50.6V464h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H80c-44.2 0-80-35.8-80-80c0-2.7 .1-5.4 .4-8H0V88zM80 400c-17.7 0-32 14.3-32 32s14.3 32 32 32H368V400H80zM48 358.7c9.8-4.3 20.6-6.7 32-6.7H392c4.4 0 8-3.6 8-8V56c0-4.4-3.6-8-8-8H88C65.9 48 48 65.9 48 88V358.7zM176.5 216h-31c4.8 26.1 21.1 48.2 43.5 60.8c-6.6-16.9-11-37.8-12.5-60.8zm0-32c1.4-22.9 5.9-43.8 12.5-60.8c-22.4 12.6-38.7 34.7-43.5 60.8h31zM112 200a120 120 0 1 1 240 0 120 120 0 1 1 -240 0zm206.5 16h-31c-1.4 22.9-5.9 43.8-12.5 60.8c22.4-12.6 38.7-34.7 43.5-60.8zM275 123.2c6.6 16.9 11 37.8 12.5 60.8h31c-4.8-26.1-21.1-48.2-43.5-60.8zM255.4 216H208.6c1.6 22.6 6.5 41.8 12.8 55.3c4.7 10.1 8.6 14.2 10.6 15.8c2-1.6 5.9-5.7 10.6-15.8c6.3-13.5 11.2-32.7 12.8-55.3zm-46.9-32h46.9c-1.6-22.6-6.5-41.8-12.8-55.3c-4.7-10.1-8.6-14.2-10.6-15.8c-2 1.6-5.9 5.7-10.6 15.8c-6.3 13.5-11.2 32.7-12.8 55.3z"],
    "book-bookmark": [448,512,[],"e0bb","M0 88C0 39.4 39.4 0 88 0H392c30.9 0 56 25.1 56 56V344c0 22.3-13.1 41.6-32 50.6V464h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H80c-44.2 0-80-35.8-80-80c0-2.7 .1-5.4 .4-8H0V88zM80 400c-17.7 0-32 14.3-32 32s14.3 32 32 32H368V400H80zM48 358.7c9.8-4.3 20.6-6.7 32-6.7H392c4.4 0 8-3.6 8-8V56c0-4.4-3.6-8-8-8H352V206.7c0 13.4-15.5 20.9-26 12.5L272 176l-54 43.2c-10.5 8.4-26 .9-26-12.5V48H88C65.9 48 48 65.9 48 88V358.7z"],
    "book-heart": [448,512,[],"f499","M0 88C0 39.4 39.4 0 88 0H392c30.9 0 56 25.1 56 56V344c0 22.3-13.1 41.6-32 50.6V464h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H80c-44.2 0-80-35.8-80-80c0-2.7 .1-5.4 .4-8H0V88zM80 400c-17.7 0-32 14.3-32 32s14.3 32 32 32H368V400H80zM48 358.7c9.8-4.3 20.6-6.7 32-6.7H392c4.4 0 8-3.6 8-8V56c0-4.4-3.6-8-8-8H88C65.9 48 48 65.9 48 88V358.7zm80-185.4c0-33.8 27.4-61.3 61.3-61.3c16.2 0 31.8 6.5 43.3 17.9l7.4 7.4 7.4-7.4c11.5-11.5 27.1-17.9 43.3-17.9c33.8 0 61.3 27.4 61.3 61.3c0 16.2-6.5 31.8-17.9 43.3l-82.7 82.7c-6.2 6.2-16.4 6.2-22.6 0l-82.7-82.7c-11.5-11.5-17.9-27.1-17.9-43.3z"],
    "book-medical": [448,512,[],"f7e6","M0 88C0 39.4 39.4 0 88 0H392c30.9 0 56 25.1 56 56V344c0 22.3-13.1 41.6-32 50.6V464h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H80c-44.2 0-80-35.8-80-80c0-2.7 .1-5.4 .4-8H0V88zM48 432c0 17.7 14.3 32 32 32H368V400H80c-17.7 0-32 14.3-32 32zm0-73.3c9.8-4.3 20.6-6.7 32-6.7H392c4.4 0 8-3.6 8-8V56c0-4.4-3.6-8-8-8H88C65.9 48 48 65.9 48 88V358.7zM208 112c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272v48c0 8.8-7.2 16-16 16H224c-8.8 0-16-7.2-16-16V224H160c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48V112z"],
    "bookmark": [384,512,["61591","128278"],"f02e","M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"],
    "books": [512,512,["128218"],"f5db","M48 416v48h64V416H48zm88 89.6c-7.1 4.1-15.3 6.4-24 6.4H48c-26.5 0-48-21.5-48-48V416 392 368 144 120 96 48C0 21.5 21.5 0 48 0h64c8.7 0 16.9 2.3 24 6.4C143.1 2.3 151.3 0 160 0h64c20.6 0 38.1 12.9 45 31.1c5.6-6.1 12.9-10.7 21.4-13L349.9 1.6c24.7-6.8 50.1 8.3 56.7 33.8l18 69.2 6 23.2 61.8 238.3 6 23.2 11.9 46c6.6 25.5-8 51.7-32.7 58.5l-59.6 16.5c-24.7 6.8-50.1-8.3-56.7-33.8l-18-69.2-6-23.2L275.6 145.9 272 132.2V144 368v24 24 48c0 26.5-21.5 48-48 48H160c-8.7 0-16.9-2.3-24-6.4zM160 464h64V416H160v48zM112 48H48V96h64V48zm0 96H48V368h64V144zm48-48h64V48H160V96zm64 272V144H160V368h64zm216.1-12.3l-55.8-215-56.5 15.6 55.8 215 56.5-15.6zm-44.4 62.1l11.9 45.7L464 447.9c0-.1 0-.2 0-.3l0-.1-11.7-45.2-56.5 15.6zm-79.9-308l56.5-15.6L360.4 48.5 304 64.1c0 .1 0 .2 0 .4l11.7 45.2z"],
    "box-taped": [448,512,["box-alt"],"f49a","M261.3 80h81.1c6.3 0 12.1 3.7 14.6 9.5L388.4 160H288L261.3 80zm-74.7 0L160 160 59.6 160 91 89.5c2.6-5.8 8.3-9.5 14.6-9.5h81.1zM160 208v48c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V208H400V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V208H160zM400.9 70c-10.3-23.1-33.2-38-58.5-38H105.6C80.3 32 57.4 46.9 47.1 70L5.5 163.6c-3.6 8.2-5.5 17-5.5 26V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V189.6c0-9-1.9-17.8-5.5-26L400.9 70z"],
    "brain": [512,512,["129504"],"f5dc","M153.5 76.9c-1.9 6.8-6.8 12.4-13.2 15.3c-16.6 7.5-28.2 24.1-28.3 43.5c-.1 9.1-5.2 17.3-13.3 21.3C82.8 164.9 72 181.2 72 200c0 7.1 1.5 13.7 4.2 19.7c4.4 9.7 1.9 21-6.1 28C56.5 259.4 48 276.7 48 296c0 20.2 9.3 38.1 23.9 49.9c6.7 5.4 10 14 8.7 22.5c-.4 2.5-.6 5-.6 7.6c0 26.1 20.8 47.3 46.7 48c9.2 .3 17.4 5.7 21.2 14.1c6.9 15.3 22.3 25.9 40.1 25.9c24.3 0 44-19.7 44-44V88c0-22.1-17.9-40-40-40c-18.2 0-33.7 12.2-38.5 28.9zM256 482c-16.8 18.5-41.1 30-68 30c-32.2 0-60.5-16.5-76.9-41.5c-45-8-79.1-47.3-79.1-94.5c0-.5 0-1.1 0-1.6C12.2 354.2 0 326.5 0 296c0-27.8 10.1-53.2 26.8-72.7C25 215.8 24 208 24 200c0-32.6 16.3-61.5 41.1-78.8c4.5-28.9 21.8-53.5 45.9-67.8C124.5 22 155.7 0 192 0c25.2 0 48 10.6 64 27.6C272 10.6 294.8 0 320 0c36.3 0 67.5 22 80.9 53.4c24.1 14.3 41.5 38.9 45.9 67.8C471.7 138.5 488 167.4 488 200c0 8-1 15.8-2.8 23.3c16.7 19.6 26.8 45 26.8 72.7c0 30.5-12.2 58.2-32 78.4c0 .5 0 1.1 0 1.6c0 47.3-34.1 86.5-79.1 94.5c-16.4 25-44.7 41.5-76.9 41.5c-26.9 0-51.2-11.6-68-30zm24-62c0 24.3 19.7 44 44 44c17.8 0 33.2-10.6 40.1-25.9c3.8-8.4 12-13.9 21.2-14.1c25.9-.7 46.7-21.9 46.7-48c0-2.6-.2-5.2-.6-7.6c-1.4-8.5 2-17.1 8.7-22.5C454.7 334.1 464 316.2 464 296c0-19.3-8.5-36.6-22.1-48.3c-8-6.9-10.5-18.3-6.1-28c2.7-6 4.2-12.6 4.2-19.7c0-18.8-10.8-35.1-26.7-43c-8.1-4-13.3-12.3-13.3-21.3c-.1-19.3-11.7-36-28.3-43.5c-6.4-2.9-11.3-8.5-13.2-15.3C353.7 60.2 338.2 48 320 48c-22.1 0-40 17.9-40 40V420z"],
    "briefcase": [512,512,["128188"],"f0b1","M176 56V96H336V56c0-4.4-3.6-8-8-8H184c-4.4 0-8 3.6-8 8zM128 96V56c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56V96h64c35.3 0 64 28.7 64 64V280 416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V280 160c0-35.3 28.7-64 64-64h64zM48 304V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V304H320v16c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V304H48zm144-48H320 464V160c0-8.8-7.2-16-16-16H360 152 64c-8.8 0-16 7.2-16 16v96H192z"],
    "browser": [512,512,["128468"],"f37e","M.3 89.5C.1 91.6 0 93.8 0 96v64V416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64V160 96c0-35.3-28.7-64-64-64H64c-2.2 0-4.4 .1-6.5 .3c-9.2 .9-17.8 3.8-25.5 8.2C21.8 46.5 13.4 55.1 7.7 65.5c-3.9 7.3-6.5 15.4-7.4 24zM48 160H464l0 256c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-256z"],
    "building": [384,512,["61687","127970"],"f1ad","M64 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16h80V400c0-26.5 21.5-48 48-48s48 21.5 48 48v64h80c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm88 40c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V104zM232 88h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V104c0-8.8 7.2-16 16-16zM88 232c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V232zm144-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V232c0-8.8 7.2-16 16-16z"],
    "calendar": [448,512,["128198","128197"],"f133","M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"],
    "camera": [512,512,["62258","camera-alt"],"f030","M199.1 32c-24.1 0-45.5 15.4-53.1 38.3l22.8 7.6-22.8-7.6L137.4 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H374.6l-8.6-25.7C358.4 47.4 337 32 312.9 32H199.1zm-7.6 53.5c1.1-3.3 4.1-5.5 7.6-5.5H312.9c3.4 0 6.5 2.2 7.6 5.5l14 42.1c3.3 9.8 12.4 16.4 22.8 16.4H448c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V160c0-8.8 7.2-16 16-16h90.7c10.3 0 19.5-6.6 22.8-16.4l14-42.1zM256 400a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 288a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"],
    "camera-movie": [576,512,["127910","127909"],"f8a9","M224 120A72 72 0 1 0 80 120a72 72 0 1 0 144 0zM344 240H152C85.7 240 32 186.3 32 120S85.7 0 152 0c39.3 0 74.1 18.8 96 48c21.9-29.1 56.7-48 96-48c66.3 0 120 53.7 120 120s-53.7 120-120 120zM272 120a72 72 0 1 0 144 0 72 72 0 1 0 -144 0zM112 336V448c0 8.8 7.2 16 16 16H352c8.8 0 16-7.2 16-16V336c0-8.8-7.2-16-16-16H144 128c-8.8 0-16 7.2-16 16zm32-64H352c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V336c0-5.5 .7-10.9 2-16H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128h16zm384 36.6l-80 36V292l75.6-34c2.9-1.3 6-2.2 9.1-2.8c22.6-3.8 43.3 13.7 43.3 36.6V472.5c0 21.8-17.7 39.5-39.5 39.5c-5.6 0-11.1-1.2-16.2-3.5L448 476V423.4l80 36V308.6z"],
    "car": [512,512,["128664","automobile"],"f1b9","M127.7 106.8L103.4 176H408.6l-24.2-69.2c-5.6-16-20.8-26.8-37.8-26.8H165.4c-17 0-32.1 10.7-37.8 26.8zm-79.6 82L82.3 90.9C94.7 55.6 128 32 165.4 32H346.6c37.4 0 70.7 23.6 83.1 58.9l34.3 97.9C492.6 205.4 512 236.4 512 272v80 48 56c0 13.3-10.7 24-24 24s-24-10.7-24-24V400H48v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V400 352 272c0-35.6 19.3-66.6 48.1-83.2zM416 224H96c-26.5 0-48 21.5-48 48v80H464V272c0-26.5-21.5-48-48-48zM112 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm256 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"],
    "chart-line": [512,512,["line-chart"],"f201","M48 56c0-13.3-10.7-24-24-24S0 42.7 0 56V408c0 39.8 32.2 72 72 72H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H72c-13.3 0-24-10.7-24-24V56zM473 169c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119-79-79c-4.5-4.5-10.6-7-17-7s-12.5 2.5-17 7l-96 96c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l79-79 79 79c9.4 9.4 24.6 9.4 33.9 0L473 169z"],
    "chart-network": [640,512,[],"f78a","M288 64c0 16.9-6.5 32.2-17.2 43.6l26.9 57.5c12.2-3.4 25-5.2 38.3-5.2c39 0 74.4 15.5 100.3 40.7l77.6-56.9c-1.3-5-1.9-10.3-1.9-15.7c0-35.3 28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64c-12.3 0-23.9-3.5-33.7-9.6l-77.6 56.9c9.8 19.4 15.3 41.4 15.3 64.6c0 18.5-3.5 36.2-9.9 52.5l67.3 40.4c10.7-8.1 24.1-12.9 38.5-12.9c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-3.4 .3-6.7 .8-9.9l-67.4-40.4C419 428.5 379.8 448 336 448c-71.4 0-130.6-51.9-142-120H123.3c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40H194c6.6-39.1 28.9-72.9 60.2-94.5l-26.9-57.6c-1.1 .1-2.2 .1-3.3 .1c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zm48 336a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"],
    "chart-pie": [576,512,["pie-chart"],"f200","M493.1 192H352V50.9C423.5 64 480 120.5 493.1 192zM352 240H527.4c9 0 16.6-7 16.6-16C544 100.3 443.7 0 320 0c-9 0-16 7.6-16 16.6V192v48h48zM222.1 321.9L348.4 448.2C325 458.4 299.2 464 272 464C166 464 80 378 80 272c0-83.6 53.4-154.7 128-181.1V288c0 12.7 5.1 24.9 14.1 33.9zM239 34.3C122.1 50.3 32 150.7 32 272c0 132.5 107.5 240 240 240c51.8 0 99.8-16.4 139-44.3c7.7-5.5 8.2-16.5 1.5-23.1L256 288V49.6c0-9.2-7.8-16.6-17-15.4zM558.4 288H320L478.7 446.7c5.8 5.8 15.2 6.3 21.2 .7c39.3-36.7 66.2-86.5 73.9-142.3c1.3-9.2-6.1-17-15.4-17z"],
    "chevron-down": [512,512,[],"f078","M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"],
    "chevron-left": [320,512,["9001"],"f053","M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"],
    "chevron-right": [320,512,["9002"],"f054","M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z"],
    "chevron-up": [512,512,[],"f077","M239 111c9.4-9.4 24.6-9.4 33.9 0L465 303c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-175-175L81 337c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 111z"],
    "circle-check": [512,512,["61533","check-circle"],"f058","M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"],
    "circle-exclamation": [512,512,["exclamation-circle"],"f06a","M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c-13.3 0-24 10.7-24 24V264c0 13.3 10.7 24 24 24s24-10.7 24-24V152c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"],
    "circle-info": [512,512,["info-circle"],"f05a","M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8V248c0-13.3-10.7-24-24-24H216c-13.3 0-24 10.7-24 24s10.7 24 24 24h24v64H216zm40-144a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"],
    "circle-user": [512,512,["62142","user-circle"],"f2bd","M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"],
    "claw-marks": [576,512,[],"f6c2","M39 7C48.4-2.3 63.6-2.3 73 7L176.6 110.6c15 15 23.4 35.4 23.4 56.6V184h16.8c21.2 0 41.6 8.4 56.6 23.4l95.2 95.2c15 15 23.4 35.4 23.4 56.6V376h16.8c21.2 0 41.6 8.4 56.6 23.4L537 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71.6-71.6c-6-6-14.1-9.4-22.6-9.4H368c-13.3 0-24-10.7-24-24V359.2c0-8.5-3.4-16.6-9.4-22.6l-95.2-95.2c-6-6-14.1-9.4-22.6-9.4H176c-13.3 0-24-10.7-24-24V167.2c0-8.5-3.4-16.6-9.4-22.6L39 41C29.7 31.6 29.7 16.4 39 7zm0 224c9.4-9.4 24.6-9.4 33.9 0L146.9 305c13.5 13.5 21.1 31.8 21.1 50.9V376h20.1c19.1 0 37.4 7.6 50.9 21.1L313 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L205.1 431c-4.5-4.5-10.6-7-17-7H144c-13.3 0-24-10.7-24-24V355.9c0-6.4-2.5-12.5-7-17L39 265c-9.4-9.4-9.4-24.6 0-33.9zM297 7l9.9 9.9C320.4 30.5 328 48.8 328 67.9V88h20.1c19.1 0 37.4 7.6 50.9 21.1L434.9 145c13.5 13.5 21.1 31.8 21.1 50.9V216h20.1c19.1 0 37.4 7.6 50.9 21.1L537 247c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-9.9-9.9c-4.5-4.5-10.6-7-17-7H432c-13.3 0-24-10.7-24-24V195.9c0-6.4-2.5-12.5-7-17L365.1 143c-4.5-4.5-10.6-7-17-7H304c-13.3 0-24-10.7-24-24V67.9c0-6.4-2.5-12.5-7-17L263 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"],
    "clock": [512,512,["128339","clock-four"],"f017","M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"],
    "clock-rotate-left": [512,512,["history"],"f1da","M48 106.7V56c0-13.3-10.7-24-24-24S0 42.7 0 56V168c0 13.3 10.7 24 24 24H136c13.3 0 24-10.7 24-24s-10.7-24-24-24H80.7c37-57.8 101.7-96 175.3-96c114.9 0 208 93.1 208 208s-93.1 208-208 208c-42.5 0-81.9-12.7-114.7-34.5c-11-7.3-25.9-4.3-33.3 6.7s-4.3 25.9 6.7 33.3C155.2 496.4 203.8 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C170.3 0 94.4 42.1 48 106.7zM256 128c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"],
    "cloud-sun": [640,512,["9925"],"f6c4","M294.2 1.2c5.1 2.1 8.7 6.7 9.6 12.1l14.1 84.7 84.7 14.1c5.4 .9 10 4.5 12.1 9.6s1.5 10.9-1.6 15.4l-38.5 55c-2.2-.1-4.4-.2-6.7-.2c-23.3 0-45.1 6.2-64 17.1l0-1.1c0-53-43-96-96-96s-96 43-96 96s43 96 96 96c8.1 0 15.9-1 23.4-2.9c-36.6 18.1-63.3 53.1-69.8 94.9l-24.4 17.1c-4.5 3.1-10.3 3.8-15.4 1.6s-8.7-6.7-9.6-12.1L98.1 317.9 13.4 303.8c-5.4-.9-10-4.5-12.1-9.6s-1.5-10.9 1.6-15.4L52.5 208 2.9 137.2c-3.2-4.5-3.8-10.3-1.6-15.4s6.7-8.7 12.1-9.6L98.1 98.1l14.1-84.7c.9-5.4 4.5-10 9.6-12.1s10.9-1.5 15.4 1.6L208 52.5 278.8 2.9c4.5-3.2 10.3-3.8 15.4-1.6zM144 208a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM320.1 320c0 .8 0 1.7-.1 2.5l-2 23.8c-1.1 13.2-12.7 23-25.9 21.9c-1.3-.1-2.6-.2-4-.2c-26.5 0-48 21.5-48 48s21.5 48 48 48c.6 0 1.3 0 1.9 0c.3 0 .6 0 .9 0H557.8c.3 0 .6 0 1 0c.4 0 .9 0 1.3 0c17.7 0 32-14.3 32-32s-14.3-32-32-32c-1.6 0-3.1 .1-4.6 .3c-6.9 1-13.9-1.1-19.1-5.6s-8.3-11.2-8.3-18.1V346.3c0-.3 0-.6 0-.9c0-.5 0-1 0-1.5s0-1 0-1.5c0-.3 0-.6 0-.9v-1.1c-.1-.6-.2-1.1-.3-1.7c-2.5-19.6-19.3-34.8-39.7-34.8c-12.6 0-23.8 5.8-31.1 14.9c-5.8 7.1-15.1 10.4-24.1 8.3s-15.9-9.1-18-18c-4.9-21.3-24-37.2-46.8-37.2c-26.5 0-48 21.5-48 48zm48-96c33 0 62 16.6 79.3 41.9c12.2-6.3 26-9.9 40.6-9.9c43 0 78.8 30.9 86.5 71.7c1 2.6 1.5 5.4 1.5 8.3v5.3c0 .9 0 1.8 0 2.7s0 1.8 0 2.7v6.9c36.5 7.4 64 39.7 64 78.4c0 44.2-35.8 80-80 80c-.9 0-1.8 0-2.7 0h-266c-1.1 0-2.1 .1-3.2 .1c-53 0-96-43-96-96c0-47.5 34.5-86.9 79.8-94.6l.2-2.5c.6-52.5 43.4-94.8 96-94.8z"],
    "code": [640,512,[],"f121","M399.1 1.1c-12.7-3.9-26.1 3.1-30 15.8l-144 464c-3.9 12.7 3.1 26.1 15.8 30s26.1-3.1 30-15.8l144-464c3.9-12.7-3.1-26.1-15.8-30zm71.4 118.5c-9.1 9.7-8.6 24.9 1.1 33.9L580.9 256 471.6 358.5c-9.7 9.1-10.2 24.3-1.1 33.9s24.3 10.2 33.9 1.1l128-120c4.8-4.5 7.6-10.9 7.6-17.5s-2.7-13-7.6-17.5l-128-120c-9.7-9.1-24.9-8.6-33.9 1.1zm-301 0c-9.1-9.7-24.3-10.2-33.9-1.1l-128 120C2.7 243 0 249.4 0 256s2.7 13 7.6 17.5l128 120c9.7 9.1 24.9 8.6 33.9-1.1s8.6-24.9-1.1-33.9L59.1 256 168.4 153.5c9.7-9.1 10.2-24.3 1.1-33.9z"],
    "coin": [512,512,["129689"],"f85c","M98.5 268C59.1 245.8 48 222.7 48 208s11.1-37.8 50.5-60c37.9-21.3 93.5-36 157.5-36s119.6 14.7 157.5 36c39.4 22.2 50.5 45.3 50.5 60s-11.1 37.8-50.5 60C375.6 289.3 320 304 256 304s-119.6-14.7-157.5-36zM256 64C114.6 64 0 128.5 0 208l0 48 0 64c0 70.7 114.6 128 256 128s256-57.3 256-128l0-64 0-48c0-79.5-114.6-144-256-144zM216 350.3c13 1.1 26.4 1.7 40 1.7s27-.6 40-1.7l0 48c-12.9 1.1-26.3 1.7-40 1.7s-27.1-.6-40-1.7l0-48zm-32-4l0 48.1c-23.7-3.9-45.3-9.6-64-16.6l0-47.7c19.7 7 41.2 12.5 64 16.2zM48 292c11.6 9.1 25 17.4 40 24.7l0 46.5C54.2 344.2 48 326.8 48 320l0-28zM328 394.3l0-48.1c22.8-3.8 44.3-9.2 64-16.2l0 47.7c-18.7 7-40.3 12.7-64 16.6zm96-31.2l0-46.5c15-7.3 28.4-15.6 40-24.7l0 28c0 6.8-6.2 24.2-40 43.1zM256 184c40.2 0 75.7 5.2 100.3 12.9c11.8 3.7 19.9 7.7 24.7 11.1c-4.8 3.4-12.9 7.3-24.7 11.1c-24.6 7.8-60 12.9-100.3 12.9s-75.7-5.2-100.3-12.9c-11.8-3.7-19.9-7.7-24.7-11.1c4.8-3.4 12.9-7.3 24.7-11.1c24.6-7.8 60-12.9 100.3-12.9zm128.8 27.4a.2 .2 0 1 0 -.4 .1 .2 .2 0 1 0 .4-.1zm-.1-6.6a.2 .2 0 1 0 -.1-.5 .2 .2 0 1 0 .1 .5zm-257.4-.2a.2 .2 0 1 0 .4-.1 .2 .2 0 1 0 -.4 .1zm.1 6.6a.2 .2 0 1 0 .1 .5 .2 .2 0 1 0 -.1-.5zM432 208c0-17.7-11.3-30.3-21.6-37.9c-10.7-8-24.6-14.2-39.7-18.9c-30.4-9.6-71-15.2-114.7-15.2s-84.3 5.6-114.7 15.2c-15.1 4.8-29 10.9-39.7 18.9C91.3 177.7 80 190.3 80 208s11.3 30.3 21.6 37.9c10.7 8 24.6 14.2 39.7 18.9c30.4 9.6 71 15.2 114.7 15.2s84.3-5.6 114.7-15.2c15.1-4.8 29-10.9 39.7-18.9c10.3-7.7 21.6-20.2 21.6-37.9z"],
    "comment-lines": [512,512,[],"f4b0","M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM152 176c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H152zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H152z"],
    "comments": [640,512,["61670","128490"],"f086","M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.7 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z"],
    "cup-togo": [448,512,["coffee-togo"],"f6c5","M108.2 48h232c3 0 5.8 1.7 7.2 4.4L361.2 80H88l13-27.4c1.3-2.8 4.1-4.6 7.2-4.6zM414.8 80L390.3 31c-9.5-19-28.9-31-50.1-31h-232C86.6 0 66.9 12.4 57.6 32L34.8 80H24C10.7 80 0 90.7 0 104s10.7 24 24 24H50 400h24c13.3 0 24-10.7 24-24s-10.7-24-24-24h-9.2zM47.4 160L74.6 453.9c3 32.9 30.7 58.1 63.7 58.1H309.7c33.1 0 60.7-25.2 63.7-58.1L400.6 160H352.4l-5.9 64H101.5l-5.9-64H47.4zm68.9 224H331.6l-6.1 65.5c-.8 8.2-7.7 14.5-15.9 14.5H138.3c-8.3 0-15.2-6.3-15.9-14.5L116.4 384z"],
    "database": [448,512,[],"f1c0","M400 86v88.7c-13.3 7.2-31.6 14.2-54.8 19.9C311.3 203 269.5 208 224 208s-87.3-5-121.2-13.4C79.6 188.9 61.3 182 48 174.7V86l.6-.5C53.9 81 64.5 74.8 81.8 68.6C115.9 56.5 166.2 48 224 48s108.1 8.5 142.2 20.6c17.3 6.2 27.8 12.4 33.2 16.9l.6 .5zm0 141.5v75.2c-13.3 7.2-31.6 14.2-54.8 19.9C311.3 331 269.5 336 224 336s-87.3-5-121.2-13.4C79.6 316.9 61.3 310 48 302.7V227.6c13.3 5.3 27.9 9.9 43.3 13.7C129.5 250.6 175.2 256 224 256s94.5-5.4 132.7-14.8c15.4-3.8 30-8.3 43.3-13.7zM48 426V355.6c13.3 5.3 27.9 9.9 43.3 13.7C129.5 378.6 175.2 384 224 384s94.5-5.4 132.7-14.8c15.4-3.8 30-8.3 43.3-13.7V426l-.6 .5c-5.3 4.5-15.9 10.7-33.2 16.9C332.1 455.5 281.8 464 224 464s-108.1-8.5-142.2-20.6c-17.3-6.2-27.8-12.4-33.2-16.9L48 426zm354.1-2.1s0 .1-.2 .2l.1-.2 0-.1zm-356.1 0a.3 .3 0 1 0 .6-.2 .3 .3 0 1 0 -.6 .2zm0-335.8a.3 .3 0 1 0 .5 .2 .3 .3 0 1 0 -.5-.2zm356-.2a.3 .3 0 1 0 -.1 .6 .3 .3 0 1 0 .1-.6zM448 432V80C448 35.8 347.7 0 224 0S0 35.8 0 80V432c0 44.2 100.3 80 224 80s224-35.8 224-80z"],
    "deer": [512,512,["129420"],"f78e","M256 16c0-8.8-7.2-16-16-16s-16 7.2-16 16V40c0 30.9 25.1 56 56 56h8 8 24l-50.4 12.6c-8 2-13.6 9.2-13.6 17.4c0 9.9 8 18 18 18h28.2L295 168H104c-36.5 0-68.3 20.4-84.5 50.4c-9.2 13.7-15.1 30-16.2 47.6L0 319c-.6 8.8 6.2 16.4 15 17c8.5 .5 15.9-5.7 16.9-14.1l1.1 1.1c4.5 4.5 7 10.6 7 17v4.3c0 2.6-.4 5.1-1.2 7.6l-8.2 24.7c-5.1 15.4-4.9 32.1 .6 47.4l22.5 61.8C59.4 501.5 74.4 512 91.2 512h46c27.8 0 47.1-27.6 37.6-53.7L157 409.5l6.5-4.3c15.2-10.1 25.6-25.4 29.9-42.4c20 8.7 41.7 13.3 63.8 13.3H264v96c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V311.8c0-2.6 .4-5.1 1.2-7.6L409.3 256h42.3c37.8 0 68.4-30.6 68.4-68.4c0-19.3-8.1-37.6-22.4-50.6L444.1 88.4C460.8 78.7 472 60.7 472 40V16c0-8.8-7.2-16-16-16s-16 7.2-16 16V40c0 13.3-10.7 24-24 24H386.1 346.6c3.5-7.3 5.4-15.4 5.4-24V16c0-8.8-7.2-16-16-16s-16 7.2-16 16V40c0 13.3-10.7 24-24 24h-8-8c-13.3 0-24-10.7-24-24V16zm130.1 96c8.1 0 15.9 3 21.9 8.5l57.3 52.1c4.2 3.9 6.7 9.3 6.7 15.1c0 11.3-9.1 20.4-20.4 20.4H392c-10.3 0-19.5 6.6-22.8 16.4L347.7 289c-2.4 7.3-3.7 15-3.7 22.8V464H312V352c0-13.3-10.7-24-24-24H257.2c-22.1 0-43.7-6.5-62.1-18.8L181.3 300c-8-5.3-18.3-5.4-26.3-.2s-12.2 14.7-10.6 24.1l2.9 17.4c1.6 9.3-2.5 18.7-10.4 23.9L114.7 380c-9.2 6.1-13 17.8-9.2 28.2L125.7 464H96.8L76.3 407.5c-1.9-5.1-1.9-10.7-.2-15.8L84.3 367c2.4-7.3 3.7-15 3.7-22.8v-4.3c0-19.1-7.6-37.4-21.1-50.9L63 285.1c-4.5-4.5-7-10.6-7-17V264c0-26.5 21.5-48 48-48H312.9c10.6 0 20-7 23-17.1l19-63.6c4.1-13.8 16.8-23.2 31.2-23.2zM416 160a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"],
    "dice": [640,512,["127922"],"f522","M241 68.3c-9.4-9.4-24.6-9.4-33.9 0L68.3 207c-9.4 9.4-9.4 24.6 0 33.9L207 379.7c9.4 9.4 24.6 9.4 33.9 0L379.7 241c9.4-9.4 9.4-24.6 0-33.9L241 68.3zM173.1 34.3c28.1-28.1 73.7-28.1 101.8 0L413.7 173.1c28.1 28.1 28.1 73.7 0 101.8L274.9 413.7c-28.1 28.1-73.7 28.1-101.8 0L34.3 274.9c-28.1-28.1-28.1-73.7 0-101.8L173.1 34.3zM320 413.8L436.3 297.5c28.6-28.6 37-69.6 25.4-105.5H576c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H384c-35.3 0-64-28.7-64-64V413.8zM504 352a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM120 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm104-56a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm0 208a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM328 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm-104 0a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"],
    "dog": [576,512,["128021"],"f6d3","M318 342.2c11.4 9.1 18 22.9 18 37.4V448c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V274.3L300.5 223c-3.2 .7-6.5 1-9.9 1H144 112.1l-.1 .8V448c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V379.6c0-14.6 6.6-28.3 18-37.4s26.2-12.6 40.4-9.4c9.5 2.1 19.4 3.2 29.6 3.2s20.1-1.1 29.6-3.2c14.2-3.1 29.1 .3 40.4 9.4zM336.9 189l53.4 32.8c7.2-17.7 24.6-29.8 44.4-29.8H480c26.5 0 48-21.5 48-48V112H496c-12.7 0-24.9-5.1-33.9-14.1L444.1 80 368 80c-4.2 0-8.4-.6-12.4-1.6L338 183.9c-.3 1.7-.7 3.4-1.1 5.1zM64.2 220.2c-1.1-.3-2.2-.7-3.3-1.1c-27.4-9.6-49-32.4-56.4-61.8L.7 141.8c-3.2-12.9 4.6-25.9 17.5-29.1s25.9 4.6 29.1 17.5l0 0 3.9 15.5C55.6 163.5 71.6 176 90 176h54H290.7L313.5 39.3l.1-.4 .9-5.6 3.1-18.4C319 6.3 326.4 0 335.1 0c5.6 0 10.9 2.6 14.3 7.1l11.2 14.9 3.4 4.6 .2 .3L368 32h76.1c12.7 0 24.9 5.1 33.9 14.1L496 64h32c26.5 0 48 21.5 48 48v32c0 53-43 96-96 96H434.7L432 256V448c0 35.3-28.7 64-64 64H352c-35.3 0-64-28.7-64-64V428.6 379.6c-10.4 2.3-21.1 3.7-32 4.2c-2.7 .1-5.3 .2-8 .2s-5.3-.1-8-.2c-10.9-.5-21.6-1.9-32-4.2v48.9V448c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V224c0-1.3 .1-2.6 .2-3.8zM416 112a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"],
    "earth-africa": [512,512,["127757","globe-africa"],"f57c","M464 256c0-19.4-2.6-38.1-7.6-55.9L429 194.6c-7.7-1.5-15.4 2.3-18.9 9.2c-5.8 11.6-19.2 17.1-31.5 13l-14.1-4.7c-7.7-2.6-16.1-.6-21.8 5.1c-3.7 3.7-3.7 9.7 0 13.4l33.5 33.5c5 5 7.8 11.8 7.8 18.9c0 12.3-8.4 23-20.3 26l-5.3 1.3c-3.8 .9-6.4 4.3-6.4 8.2v12.1c0 13.8-4.5 27.3-12.8 38.4l-25.6 34.1c-6 8.1-15.5 12.8-25.6 12.8c-17.7 0-32-14.3-32-32V336c0-8.8-7.2-16-16-16H208c-26.5 0-48-21.5-48-48V244c0-12.6 5.9-24.4 16-32l39.4-29.5c5.6-4.2 12.4-6.5 19.4-6.5c3.5 0 6.9 .6 10.2 1.7l32 10.7c7.2 2.4 15 2.7 22.4 .9l35.4-8.8c10.2-2.5 17.3-11.7 17.3-22.2c0-8.7-4.9-16.6-12.6-20.5l-29.2-14.6c-3.7-1.8-8.1-1.1-11 1.8l-3.9 3.9c-4.6 4.6-10.9 7.2-17.4 7.2c-3.8 0-7.6-.9-11-2.6l-15.2-7.6c-6.7-3.4-14.9-1.6-19.6 4.3l-13.6 17c-5.5 6.9-15.8 7.4-22 1.2c-2.8-2.8-4.3-6.5-4.3-10.4V96.5c0-5.6-1.5-11-4.2-15.9l-10-17.4C101.7 94.1 48 168.8 48 256c0 114.9 93.1 208 208 208s208-93.1 208-208zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"],
    "earth-americas": [512,512,["127758","earth","earth-america","globe-americas"],"f57d","M256 464C141.1 464 48 370.9 48 256c0-22 3.4-43.1 9.7-63l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v30.4c0 15.9 15.2 27.3 30.5 23c15.9-4.5 28.3-17 32.8-32.8l1.5-5.4c4.6-16.1 15.3-29.7 29.8-38l9.2-5.3c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c73.6 3.6 137.2 45.6 171.2 106.3L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3C448.7 385.4 361.5 464 256 464zm0 48A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"],
    "earth-asia": [512,512,["127759","globe-asia"],"f57e","M464 256c0-90.7-58.1-167.9-139.1-196.3l-16.4 40.9c-2.9 7.2-9 12.5-16.5 14.4l-17 4.3c-16.7 4.2-23.7 24-13.4 37.7l16.1 21.5c6.1 8.1 6.4 19.2 .8 27.7l-10.7 16.1C260.5 233.3 248 240 234.6 240h-2.3c-16.1 0-27.6 15.5-23 30.9l6 19.9c4.4 14.6-6.5 29.2-21.7 29.2c-10.7 0-20.6-6.1-25.4-15.7l-9.3-18.5c-7.3-14.7-26.9-17.8-38.4-6.2l-15.4 15.4c-5.7 5.7-13.8 8.1-21.7 6.6l-31.7-6.3C70 391.3 154.5 464 256 464c48.1 0 92.3-16.3 127.5-43.7l-5.9-4.3L359 422.9c-19.8 7.4-41.8-1.9-50.4-21.1L303 389.4c-8.5-18.9-1.1-41.2 17-51.3L356.2 318c2.3-1.3 4.3-3.1 5.7-5.3l6.1-9.5c6-9.4 16.4-15.1 27.6-15.1s21.6 5.7 27.6 15.1l2 3.1c3.7 5.8 10.8 8.6 17.5 6.7l14.6-4.1c4.4-16.9 6.8-34.5 6.8-52.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm163.9 80.5l32 8c8.6 2.1 13.8 10.8 11.6 19.4s-10.8 13.8-19.4 11.6l-32-8c-8.6-2.1-13.8-10.8-11.6-19.4s10.8-13.8 19.4-11.6zm84.2 11c-8.6-2.1-13.8-10.8-11.6-19.4l8-32c2.1-8.6 10.8-13.8 19.4-11.6s13.8 10.8 11.6 19.4l-8 32c-2.1 8.6-10.8 13.8-19.4 11.6zM350.3 135.2l-16 32c-4 7.9-13.6 11.1-21.5 7.2s-11.1-13.6-7.2-21.5l16-32c4-7.9 13.6-11.1 21.5-7.2s11.1 13.6 7.2 21.5z"],
    "earth-europe": [512,512,["globe-europe"],"f7a2","M256 464C141.1 464 48 370.9 48 256S141.1 48 256 48c3.5 0 6.9 .1 10.3 .3L232.5 73.6c-5.4 4-8.5 10.4-8.5 17.1v9.1c0 6.8 5.5 12.3 12.3 12.3c2.4 0 4.8-.7 6.8-2.1l41.8-27.9c2-1.3 4.4-2.1 6.8-2.1h1c6.2 0 11.3 5.1 11.3 11.3c0 3-1.2 5.9-3.3 8l-19.9 19.9c-5.8 5.8-12.9 10.2-20.7 12.8l-26.5 8.8c-5.8 1.9-9.6 7.3-9.6 13.4c0 3.7-1.5 7.3-4.1 10l-17.9 17.9c-6.4 6.4-9.9 15-9.9 24v4.3c0 16.4 13.6 29.7 29.9 29.7c11 0 21.2-6.2 26.1-16l4-8.1c2.4-4.8 7.4-7.9 12.8-7.9c4.5 0 8.7 2.1 11.4 5.7l16.3 21.7c2.1 2.9 5.5 4.5 9.1 4.5c8.4 0 13.9-8.9 10.1-16.4l-1.1-2.3c-3.5-7 0-15.5 7.5-18l21.2-7.1c7.6-2.5 12.7-9.6 12.7-17.6c0-10.3 8.3-18.6 18.6-18.6H400c8.8 0 16 7.2 16 16s-7.2 16-16 16H379.3c-7.2 0-14.2 2.9-19.3 8l-4.7 4.7c-2.1 2.1-3.3 5-3.3 8c0 6.2 5.1 11.3 11.3 11.3h11.3c6 0 11.8 2.4 16 6.6l6.5 6.5c1.8 1.8 2.8 4.3 2.8 6.8s-1 5-2.8 6.8l-7.5 7.5C386 262 384 266.9 384 272s2 10 5.7 13.7L408 304c10.2 10.2 24.1 16 38.6 16H454c-4.1 12.6-9.3 24.7-15.6 36.1c-3.7-2.6-8.2-4.1-13-4.1c-6 0-11.8-2.4-16-6.6L396 332c-7.7-7.7-18-12-28.9-12c-9.7 0-19.2-3.5-26.6-9.8L314 287.4c-11.6-9.9-26.4-15.4-41.7-15.4H251.4c-12.6 0-25 3.7-35.5 10.7L188.5 301c-17.8 11.9-28.5 31.9-28.5 53.3v3.2c0 17 6.7 33.3 18.7 45.3l16 16c8.5 8.5 20 13.3 32 13.3H248c13.3 0 24 10.7 24 24c0 2.5 .4 5 1.1 7.3c-5.6 .5-11.4 .7-17.1 .7zm0 48A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM187.3 123.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-32 32c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l32-32z"],
    "eye": [576,512,["128065"],"f06e","M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"],
    "eye-slash": [640,512,[],"f070","M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"],
    "face-grimace": [512,512,["128556","grimace"],"f57f","M256 48a208 208 0 1 0 0 416 208 208 0 1 0 0-416zM512 256A256 256 0 1 1 0 256a256 256 0 1 1 512 0zM168 320c-13.3 0-24 10.7-24 24s10.7 24 24 24h8V320h-8zm40 48h32V320H208v48zm96 0V320H272v48h32zm32 0h8c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8v48zM168 288H344c30.9 0 56 25.1 56 56s-25.1 56-56 56H168c-30.9 0-56-25.1-56-56s25.1-56 56-56zm-23.6-80a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],
    "face-kiss-wink-heart": [512,512,["128536","kiss-wink-heart"],"f598","M338.9 446.8c-25.4 11-53.4 17.2-82.9 17.2C141.1 464 48 370.9 48 256S141.1 48 256 48s208 93.1 208 208c0 22.4-3.5 43.9-10.1 64.1c3.1 4.5 5.7 9.4 7.8 14.6c12.7-1.6 25.1 .4 36.2 5c9.1-26.2 14-54.4 14-83.7C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512c35.4 0 69.1-7.2 99.7-20.2c-4.8-5.5-8.5-12.2-10.4-19.7l-6.5-25.3zM296 316c0-6.9-3.1-13.2-7.3-18.3c-4.3-5.2-10.1-9.7-16.7-13.4C258.7 276.9 241.4 272 224 272c-3.6 0-6.8 2.5-7.7 6s.6 7.2 3.8 9l0 0 0 0 0 0 .2 .1c.2 .1 .5 .3 .9 .5c.8 .5 2 1.2 3.4 2.1c2.8 1.9 6.5 4.5 10.2 7.6c3.7 3.1 7.2 6.6 9.6 10.1c2.5 3.5 3.5 6.4 3.5 8.6s-1 5-3.5 8.6c-2.5 3.5-5.9 6.9-9.6 10.1c-3.7 3.1-7.4 5.7-10.2 7.6c-1.4 .9-2.6 1.6-3.4 2.1c-.4 .2-.7 .4-.9 .5l-.2 .1 0 0 0 0 0 0 0 0 0 0c-2.5 1.4-4.1 4.1-4.1 7s1.6 5.6 4.1 7l0 0 0 0 0 0 .2 .1c.2 .1 .5 .3 .9 .5c.8 .5 2 1.2 3.4 2.1c2.8 1.9 6.5 4.5 10.2 7.6c3.7 3.1 7.2 6.6 9.6 10.1c2.5 3.5 3.5 6.4 3.5 8.6s-1 5-3.5 8.6c-2.5 3.5-5.9 6.9-9.6 10.1c-3.7 3.1-7.4 5.7-10.2 7.6c-1.4 .9-2.6 1.6-3.4 2.1c-.4 .2-.7 .4-.9 .5l-.2 .1 0 0 0 0 0 0 0 0c-3.2 1.8-4.7 5.5-3.8 9s4.1 6 7.7 6c17.4 0 34.7-4.9 47.9-12.3c6.6-3.7 12.5-8.2 16.7-13.4c4.3-5.1 7.3-11.4 7.3-18.3s-3.1-13.2-7.3-18.3c-4.3-5.2-10.1-9.7-16.7-13.4c-2.7-1.5-5.7-3-8.7-4.3c3.1-1.3 6-2.7 8.7-4.3c6.6-3.7 12.5-8.2 16.7-13.4c4.3-5.1 7.3-11.4 7.3-18.3zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm159.3-20c10.6 0 19.9 3.8 25.4 9.7c7.6 8.1 20.2 8.5 28.3 .9s8.5-20.2 .9-28.3C375.7 186.8 355 180 335.6 180s-40.1 6.8-54.6 22.3c-7.6 8.1-7.1 20.7 .9 28.3s20.7 7.1 28.3-.9c5.5-5.8 14.8-9.7 25.4-9.7zM434 352.3c-6-23.2-28.8-37-51.1-30.8s-35.4 30.1-29.5 53.4l22.9 89.3c2.2 8.7 11.2 13.9 19.8 11.4l84.9-23.8c22.2-6.2 35.4-30.1 29.5-53.4s-28.8-37-51.1-30.8l-20.2 5.6-5.4-21z"],
    "face-laugh-beam": [512,512,["128513","laugh-beam"],"f59a","M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm130.7 57.9c-4.2-13.6 7.1-25.9 21.3-25.9H364.5c14.2 0 25.5 12.4 21.3 25.9C369 368.4 318.2 408 258.2 408s-110.8-39.6-127.5-94.1zm86.9-85.1l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z"],
    "face-smile": [512,512,["128578","smile"],"f118","M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],
    "face-surprise": [512,512,["128558","surprise"],"f5c2","M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm176.4-80a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM256 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"],
    "feather": [512,512,["129718"],"f52d","M311.9 166.1L112 366.1l0-36c0-55.2 21.9-108.1 60.9-147.1L276.7 79.2c20-20 47.1-31.2 75.3-31.2s55.3 11.2 75.3 31.2l5.5 5.5c20 20 31.2 47.1 31.2 75.3c0 16.8-4 33.3-11.4 48H337.9l7.9-7.9c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0zm-22 89.9H412.1l-48 48H241.9l48-48zm24.9 96c-37.2 30.9-84.2 48-132.9 48h-36l48-48H314.9zM64 330v84L7 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l57-57h84c67.9 0 133-27 181-75L466.7 269.3c29-29 45.3-68.3 45.3-109.3s-16.3-80.3-45.3-109.3l-5.5-5.5C432.3 16.3 393 0 352 0s-80.3 16.3-109.3 45.3L139 149C91 197 64 262.1 64 330z"],
    "file-lines": [384,512,["61686","128462","128441","file-alt","file-text"],"f15c","M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"],
    "film": [512,512,["127902"],"f008","M352 432H160V320 280H352v40V432zm0-200H160V192 80H352V192v40zM64 80h48v88H48V96c0-8.8 7.2-16 16-16zM48 216h64v80H48V216zm64 216H64c-8.8 0-16-7.2-16-16V344h64v88zM400 168V80h48c8.8 0 16 7.2 16 16v72H400zm0 48h64v80H400V216zm0 128h64v72c0 8.8-7.2 16-16 16H400V344zM448 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64z"],
    "filter": [512,512,[],"f0b0","M0 73.7C0 50.7 18.7 32 41.7 32H470.3c23 0 41.7 18.7 41.7 41.7c0 9.6-3.3 18.9-9.4 26.3L336 304.5V447.7c0 17.8-14.5 32.3-32.3 32.3c-7.3 0-14.4-2.5-20.1-7l-92.5-73.4c-9.6-7.6-15.1-19.1-15.1-31.3V304.5L9.4 100C3.3 92.6 0 83.3 0 73.7zM55 80L218.6 280.8c3.5 4.3 5.4 9.6 5.4 15.2v68.4l64 50.8V296c0-5.5 1.9-10.9 5.4-15.2L457 80H55z"],
    "fingerprint": [512,512,[],"f577","M48 256C48 141.1 141.1 48 256 48c63.1 0 119.6 28.1 157.8 72.5c8.6 10.1 23.8 11.2 33.8 2.6s11.2-23.8 2.6-33.8C403.3 34.6 333.7 0 256 0C114.6 0 0 114.6 0 256v40c0 13.3 10.7 24 24 24s24-10.7 24-24V256zm458.5-52.9c-2.7-13-15.5-21.3-28.4-18.5s-21.3 15.5-18.5 28.4c2.9 13.9 4.5 28.3 4.5 43.1v40c0 13.3 10.7 24 24 24s24-10.7 24-24V256c0-18.1-1.9-35.8-5.5-52.9zM256 80c-19 0-37.4 3-54.5 8.6c-15.2 5-18.7 23.7-8.3 35.9c7.1 8.3 18.8 10.8 29.4 7.9c10.6-2.9 21.8-4.4 33.4-4.4c70.7 0 128 57.3 128 128v24.9c0 25.2-1.5 50.3-4.4 75.3c-1.7 14.6 9.4 27.8 24.2 27.8c11.8 0 21.9-8.6 23.3-20.3c3.3-27.4 5-55 5-82.7V256c0-97.2-78.8-176-176-176zM150.7 148.7c-9.1-10.6-25.3-11.4-33.9-.4C93.7 178 80 215.4 80 256v24.9c0 24.2-2.6 48.4-7.8 71.9C68.8 368.4 80.1 384 96.1 384c10.5 0 19.9-7 22.2-17.3c6.4-28.1 9.7-56.8 9.7-85.8V256c0-27.2 8.5-52.4 22.9-73.1c7.2-10.4 8-24.6-.2-34.2zM352 256c0-53-43-96-96-96s-96 43-96 96v24.9c0 35.9-4.6 71.5-13.8 106.1c-3.8 14.3 6.7 29 21.5 29c9.5 0 17.9-6.2 20.4-15.4c10.5-39 15.9-79.2 15.9-119.7V256c0-28.7 23.3-52 52-52s52 23.3 52 52v24.9c0 36.3-3.5 72.4-10.4 107.9c-2.7 13.9 7.7 27.2 21.8 27.2c10.2 0 19-7 21-17c7.7-38.8 11.6-78.3 11.6-118.1V256zm-96-24c-13.3 0-24 10.7-24 24v24.9c0 59.9-11 119.3-32.5 175.2l-5.9 15.3c-4.8 12.4 1.4 26.3 13.8 31s26.3-1.4 31-13.8l5.9-15.3C267.9 411.9 280 346.7 280 280.9V256c0-13.3-10.7-24-24-24z"],
    "fish": [576,512,["128031"],"f578","M180.8 303.7c9.2 10.4 19.4 20.6 30.7 30.1c33.7 28.5 76 50.2 124.5 50.2s90.8-21.8 124.5-50.2c30.3-25.5 52.7-55.7 65.3-77.8c-12.6-22.1-35-52.2-65.3-77.8C426.8 149.7 384.5 128 336 128s-90.8 21.7-124.5 50.2c-11.3 9.5-21.5 19.7-30.7 30.1c-14 15.8-36.7 20.6-56 11.8L70.6 195.3l21.1 36.9c8.4 14.8 8.4 32.9 0 47.6L70.6 316.7l54.3-24.9c19.2-8.8 41.9-4 56 11.8zM4.2 336.1L50 256 4.2 175.9c-6.9-12.1-5.2-27.2 4.2-37.5s24.3-13.3 36.9-7.5l99.5 45.6c10.5-11.9 22.5-23.8 35.7-35C219.7 108.5 272.6 80 336 80s116.3 28.5 155.5 61.5c39.1 33 66.9 72.4 81 99.8c4.7 9.2 4.7 20.1 0 29.3c-14.1 27.4-41.9 66.8-81 99.8C452.3 403.5 399.4 432 336 432s-116.3-28.5-155.5-61.5c-13.2-11.2-25.1-23.1-35.7-35L45.3 381.1c-12.6 5.8-27.6 2.8-36.9-7.5S-2.7 348.2 4.2 336.1zM416 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],
    "flag": [448,512,["61725","127988"],"f024","M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24V64 350.5 400v88c0 13.3 10.7 24 24 24s24-10.7 24-24V388l80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52V24zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8V334.7l-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5v-237z"],
    "flower": [448,512,["10047","127804"],"f7ff","M448 168c0 33.6-12.2 64.3-32.3 88c20.1 23.7 32.3 54.4 32.3 88c0 75.1-60.9 136-136 136c-33.6 0-64.3-12.2-88-32.3c-23.7 20.1-54.4 32.3-88 32.3C60.9 480 0 419.1 0 344c0-33.6 12.2-64.3 32.3-88C12.2 232.3 0 201.6 0 168C0 92.9 60.9 32 136 32c33.6 0 64.3 12.2 88 32.3C247.7 44.2 278.4 32 312 32c75.1 0 136 60.9 136 136zM192.9 100.9C177.6 87.8 157.8 80 136 80c-48.6 0-88 39.4-88 88c0 21.8 7.8 41.6 20.9 56.9c15.2 17.9 15.2 44.2 0 62.2C55.8 302.4 48 322.2 48 344c0 48.6 39.4 88 88 88c21.8 0 41.6-7.8 56.9-20.9c17.9-15.2 44.2-15.2 62.2 0C270.4 424.2 290.2 432 312 432c48.6 0 88-39.4 88-88c0-21.8-7.8-41.6-20.9-56.9c-15.2-17.9-15.2-44.2 0-62.2C392.2 209.6 400 189.8 400 168c0-48.6-39.4-88-88-88c-21.8 0-41.6 7.8-56.9 20.9c-17.9 15.2-44.2 15.2-62.2 0zM256 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-112 0a80 80 0 1 1 160 0 80 80 0 1 1 -160 0z"],
    "gavel": [512,512,["legal"],"f0e3","M313 7c9.3 9.3 9.4 24.3 .2 33.7L471.3 198.8c9.4-9.2 24.4-9.1 33.7 .2c9.4 9.4 9.4 24.6 0 33.9l-16.7 16.8L393 345l-16 16c-9.4 9.4-24.6 9.4-33.9 0c-9-9-9.4-23.5-.9-32.9L184 169.9c-9.4 8.4-23.9 8.1-32.9-.9c-9.4-9.4-9.4-24.6 0-33.9l16-16 95.2-95.3L279 7c9.4-9.4 24.6-9.4 33.9 0zM279.2 74.7L217.9 136 376 294.1l61.3-61.3L279.2 74.7zM223.4 254.6l33.9 33.9-49.8 49.8 7 7c12.5 12.5 12.5 32.8 0 45.3l-112 112c-12.5 12.5-32.8 12.5-45.3 0l-48-48c-12.5-12.5-12.5-32.8 0-45.3l112-112c12.5-12.5 32.8-12.5 45.3 0l7 7 49.8-49.8zm-79.4 88L54.6 432 80 457.4 169.4 368 144 342.6z"],
    "gear": [512,512,["9881","cog"],"f013","M256 0c17 0 33.6 1.7 49.8 4.8c7.9 1.5 21.8 6.1 29.4 20.1c2 3.7 3.6 7.6 4.6 11.8l9.3 38.5C350.5 81 360.3 86.7 366 85l38-11.2c4-1.2 8.1-1.8 12.2-1.9c16.1-.5 27 9.4 32.3 15.4c22.1 25.1 39.1 54.6 49.9 86.3c2.6 7.6 5.6 21.8-2.7 35.4c-2.2 3.6-4.9 7-8 10L459 246.3c-4.2 4-4.2 15.5 0 19.5l28.7 27.3c3.1 3 5.8 6.4 8 10c8.2 13.6 5.2 27.8 2.7 35.4c-10.8 31.7-27.8 61.1-49.9 86.3c-5.3 6-16.3 15.9-32.3 15.4c-4.1-.1-8.2-.8-12.2-1.9L366 427c-5.7-1.7-15.5 4-16.9 9.8l-9.3 38.5c-1 4.2-2.6 8.2-4.6 11.8c-7.7 14-21.6 18.5-29.4 20.1C289.6 510.3 273 512 256 512s-33.6-1.7-49.8-4.8c-7.9-1.5-21.8-6.1-29.4-20.1c-2-3.7-3.6-7.6-4.6-11.8l-9.3-38.5c-1.4-5.8-11.2-11.5-16.9-9.8l-38 11.2c-4 1.2-8.1 1.8-12.2 1.9c-16.1 .5-27-9.4-32.3-15.4c-22-25.1-39.1-54.6-49.9-86.3c-2.6-7.6-5.6-21.8 2.7-35.4c2.2-3.6 4.9-7 8-10L53 265.7c4.2-4 4.2-15.5 0-19.5L24.2 218.9c-3.1-3-5.8-6.4-8-10C8 195.3 11 181.1 13.6 173.6c10.8-31.7 27.8-61.1 49.9-86.3c5.3-6 16.3-15.9 32.3-15.4c4.1 .1 8.2 .8 12.2 1.9L146 85c5.7 1.7 15.5-4 16.9-9.8l9.3-38.5c1-4.2 2.6-8.2 4.6-11.8c7.7-14 21.6-18.5 29.4-20.1C222.4 1.7 239 0 256 0zM218.1 51.4l-8.5 35.1c-7.8 32.3-45.3 53.9-77.2 44.6L97.9 120.9c-16.5 19.3-29.5 41.7-38 65.7l26.2 24.9c24 22.8 24 66.2 0 89L59.9 325.4c8.5 24 21.5 46.4 38 65.7l34.6-10.2c31.8-9.4 69.4 12.3 77.2 44.6l8.5 35.1c24.6 4.5 51.3 4.5 75.9 0l8.5-35.1c7.8-32.3 45.3-53.9 77.2-44.6l34.6 10.2c16.5-19.3 29.5-41.7 38-65.7l-26.2-24.9c-24-22.8-24-66.2 0-89l26.2-24.9c-8.5-24-21.5-46.4-38-65.7l-34.6 10.2c-31.8 9.4-69.4-12.3-77.2-44.6l-8.5-35.1c-24.6-4.5-51.3-4.5-75.9 0zM208 256a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 96a96 96 0 1 1 0-192 96 96 0 1 1 0 192z"],
    "gift": [512,512,["127873"],"f06b","M231.9 44.4C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88c0 14.4 3.5 28 9.6 40H48c-26.5 0-48 21.5-48 48v64c0 20.9 13.4 38.7 32 45.3V288 448c0 35.3 28.7 64 64 64H416c35.3 0 64-28.7 64-64V288v-2.7c18.6-6.6 32-24.4 32-45.3V176c0-26.5-21.5-48-48-48H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41zM464 176v64H432 288V176h72H464zm-240 0v64H80 48V176H152h72zm0 112V464H96c-8.8 0-16-7.2-16-16V288H224zm64 176V288H432V448c0 8.8-7.2 16-16 16H288zm72-336H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40s-17.9 40-40 40zm-136 0H152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8L225.3 128H224z"],
    "gift-card": [576,512,[],"f663","M353.5 68.8L318.7 128H320h72c22.1 0 40-17.9 40-40s-17.9-40-40-40h-2.2c-14.9 0-28.8 7.9-36.3 20.8zM288 197.5l-61.6 73.9c-8.5 10.2-23.6 11.6-33.8 3.1s-11.6-23.6-3.1-33.8L243.4 176H184 64c-8.8 0-16 7.2-16 16V320H528V192c0-8.8-7.2-16-16-16H392 332.6l53.9 64.6c8.5 10.2 7.1 25.3-3.1 33.8s-25.3 7.1-33.8-3.1L288 197.5zM48 384v64c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V384H48zM256 128h1.3L222.5 68.8C214.9 55.9 201.1 48 186.2 48H184c-22.1 0-40 17.9-40 40s17.9 40 40 40h72zm7.9-83.6l24.1 41 24.1-41C328.3 16.9 357.9 0 389.8 0H392c48.6 0 88 39.4 88 88c0 14.4-3.5 28-9.6 40H512c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64h41.6C99.5 116 96 102.4 96 88c0-48.6 39.4-88 88-88h2.2c31.9 0 61.5 16.9 77.7 44.4z"],
    "graduation-cap": [640,512,["127891","mortar-board"],"f19d","M320 80c2.5 0 5 .4 7.4 1.3l218 78.7-218 78.7c-2.4 .9-4.9 1.3-7.4 1.3s-5-.4-7.4-1.3L184.9 192.6l140.8-52.8c8.3-3.1 12.5-12.3 9.4-20.6s-12.3-12.5-20.6-9.4L154.9 169.6c-5.2 2-10.3 4.2-15.3 6.6L94.7 160l218-78.7c2.4-.9 4.9-1.3 7.4-1.3zM15.8 182.6l77.4 27.9c-27.2 28.7-43.7 66.7-45.1 107.7c-.1 .6-.1 1.2-.1 1.8c0 28.4-10.8 57.8-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7c-3.2-14-7.5-28.3-13.4-41.5c1.9-37 19.2-70.9 46.7-94.2l169.5 61.2c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32s-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6zm480.8 80l-46.5 16.8 12.7 120.5c-4.8 3.5-12.8 8-24.6 12.6C410 423.6 368 432 320 432s-90-8.4-118.3-19.4c-11.8-4.6-19.8-9.2-24.6-12.6l12.7-120.5-46.5-16.8L128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6zM467.4 396a.7 .7 0 1 0 -1.2-.7 .7 .7 0 1 0 1.2 .7zm-294.8 0a.7 .7 0 1 0 1.2-.6 .7 .7 0 1 0 -1.2 .6z"],
    "hammer": [576,512,["128296"],"f6e3","M432.8 204.9c-9.1-9.1-21.5-14.2-34.4-14.1c-11.3 .1-22.4-4.1-31-12.7L329.3 140c-5.9-5.9-9.3-14-9.3-22.4V105.5c0-17.6-9.6-33.7-25-42.1L273.3 51.5c8.4-2.3 17.1-3.5 25.8-3.5h18.1c24.5 0 48 9.3 65.8 26.1l44.6 42c9.7 9.1 14.3 21.7 13.5 34.1c-.8 13.7 4.3 27.1 14 36.8l37 37L472 244.1l-39.2-39.2zM216.7 75.3l.3 .2 55 30v12.1c0 21.1 8.4 41.4 23.3 56.3l38.1 38.1c18.1 18.1 41.8 26.9 65.4 26.7l39.2 39.2 1 1-16 16c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L569 217c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-8 8-1-1-37-37c1.6-26.1-8-52.7-28.5-72l-44.6-42C389.2 14 353.9 0 317.2 0H299.2C279 0 259.1 4.2 240.7 12.4L219.1 22l-.3 .1-6.2 2.8-19.1 8.5c-5.6 2.5-9.2 7.9-9.5 14s3 11.8 8.3 14.7l18.4 10 6 3.3zm44.2 107.3L27.4 377.1C10.1 391.6 0 413.1 0 435.7C0 477.8 34.1 512 76.3 512c22.6 0 44.1-10.1 58.6-27.4L330 250.4c-6.8-4.5-13.2-9.7-19.2-15.7l-38.1-38.1c-4.3-4.3-8.3-9-11.8-14z"],
    "hands": [576,512,["sign-language","signing"],"f2a7","M528 143.8c0-8.8-7.2-16-16-16s-16 7.2-16 16v37.4c0 10.9-7.3 20.4-17.8 23.2s-21.6-1.8-27-11.2L369.7 52c-2.2-3.8-7.1-5.1-10.9-2.9s-5.1 7.1-2.9 10.9l0 .1 48 83.1c6.2 10.7 3.2 24.3-6.7 31.4c-15.1-14.3-32.3-26.5-51.5-36.1L314.3 84l-8-13.9 0-.1-8-13.8c-2.2-3.8-7.1-5.1-10.9-2.9s-5.1 7.1-2.9 10.9l8 13.9 8 13.9 0 .1 20.2 35-53-23.5c-22.8-10.1-47.6-9.8-69-1c4.1-12.6 12.8-23.9 25.2-31c3.8-2.2 7.7-3.9 11.7-5.1c-2.3-21.4 7.8-43.2 27.7-54.6s43.8-9.4 61.1 3.3c3.1-2.9 6.5-5.4 10.3-7.6C361.6-8 395.8 1.2 411.3 28l46.9 81.2c11.4-17.7 31.3-29.4 53.9-29.4c35.3 0 64 28.7 64 64v84.6c0 69.4-36.7 133.6-96.5 168.8c-10.4 6.1-21 11.1-31.9 15.1c8-19.2 13.3-39.9 15.4-61.4c40.5-27.4 65-73.2 65-122.4V143.8zm-353.9 13c15.1-32 53.2-45.7 85.2-30.7l56.4 26.5c36 16.9 65.4 43.7 85.7 76.1c19.6 29.4 30.7 64.4 30.7 101.2c0 1 0 2 0 3c0 1 0 2.1 0 3.1c0 1.2-.1 2.3-.2 3.4c-5 96.1-84.5 172.6-181.8 172.6H120c-30.9 0-56-25.1-56-56c0-4.4 .5-8.6 1.5-12.7C45.8 434.6 32 414.9 32 392c0-4.4 .5-8.6 1.5-12.7C13.8 370.6 0 350.9 0 328s13.8-42.6 33.5-51.3c-.9-4.1-1.5-8.3-1.5-12.7c0-30.9 25.1-56 56-56h84.7c-6.4-16-6.5-34.5 1.4-51.3zM72 320l-.2 0H56c-4.4 0-8 3.6-8 8s3.6 8 8 8H88l.2 0H184c13.3 0 24 10.7 24 24s-10.7 24-24 24H87.9c-4.4 0-7.9 3.6-7.9 8c0 4.4 3.6 8 8 8h31.9l.2 0H184c13.3 0 24 10.7 24 24s-10.7 24-24 24H119.9c-4.4 .1-7.9 3.6-7.9 8c0 4.4 3.6 8 8 8H249.9c72.3 0 131.3-57.3 134-128.9c0-.4 0-.9 .1-1.3l0-.5 0-.6 0-.3c0-.8 0-1.7 0-2.5c0-27.2-8.2-53.1-22.8-74.8c-.2-.2-.3-.5-.5-.7c-15.5-24.9-38-45.4-65.5-58.4l-56.4-26.5c-8-3.8-17.5-.3-21.3 7.7s-.3 17.5 7.7 21.3l25.1 11.8c10.2 4.8 15.7 16 13.2 27s-12.2 18.8-23.4 18.8H88c-4.4 0-8 3.6-8 8s3.6 8 8 8l.2 0H184c13.3 0 24 10.7 24 24s-10.7 24-24 24H72z"],
    "hands-praying": [640,512,["praying-hands"],"f684","M277.8 48c-5.9 0-11.4 2.9-14.8 7.7l-99.8 141c-12.4 17.6-19.1 38.6-19.1 60.1v40.2c0 24.1-15.4 45.5-38.3 53.1L31.6 374.8C19 379 5.4 372.2 1.2 359.6S3.8 333.4 16.4 329.2l74.1-24.7c3.3-1.1 5.5-4.1 5.5-7.6V256.7c0-31.5 9.8-62.2 28-87.9l99.8-141C236.2 10.4 256.4 0 277.8 0c16.1 0 30.8 5.8 42.2 15.3C331.4 5.8 346.1 0 362.2 0c21.5 0 41.6 10.4 54 27.9l99.8 141c18.2 25.7 28 56.4 28 87.9v40.2c0 3.4 2.2 6.5 5.5 7.6l74.1 24.7c12.6 4.2 19.4 17.8 15.2 30.4s-17.8 19.4-30.4 15.2l-74.1-24.7c-22.9-7.6-38.3-29-38.3-53.1V256.7c0-21.5-6.7-42.5-19.1-60.1L377 55.7c-3.4-4.8-8.9-7.7-14.8-7.7c-9.6 0-18 8-18.2 18.2c0 .1 0 .3 0 .4s0 .3 0 .4c.1 3.7 1.3 7.4 3.3 10.3L416.5 178c10.1 14.7 15.5 32.1 15.5 49.9V236v60c0 13.3-10.7 24-24 24s-24-10.7-24-24V236c0-11-9-20-20-20c-10.9 0-19.8 8.7-20 19.6c0 .1 0 .3 0 .4v74c0 .3 0 .6 0 .9c.4 46.6 31.8 87.3 76.9 99.5l201.4 54.4c12.8 3.5 20.4 16.6 16.9 29.4s-16.6 20.4-29.4 16.9L408.3 456.7C370.9 446.6 339.9 423 320 392c-19.9 31-50.9 54.6-88.3 64.8L30.3 511.2c-12.8 3.5-26-4.1-29.4-16.9s4.1-26 16.9-29.4l201.4-54.4c45.1-12.2 76.5-52.9 76.9-99.5c0-.3 0-.6 0-.9V236c0-.1 0-.3 0-.4c-.2-10.8-9.1-19.6-20-19.6c-11 0-20 9-20 20v60c0 13.3-10.7 24-24 24s-24-10.7-24-24V236v-8.1c0-17.8 5.4-35.2 15.5-49.9L292.7 77.3c2-2.9 3.2-6.6 3.3-10.3c0-.1 0-.3 0-.4s0-.3 0-.4C295.8 56 287.4 48 277.8 48zM320 122.4L287.9 169c12.1 2.1 23.1 7.5 32.1 15.1c9-7.6 20-13 32.1-15.1L320 122.4z"],
    "handshake": [640,512,[],"f2b5","M272.2 64.6l-51.1 51.1c-15.3 4.2-29.5 11.9-41.5 22.5L153 161.9C142.8 171 129.5 176 115.8 176H96V304c20.4 .6 39.8 8.9 54.3 23.4l35.6 35.6 7 7 0 0L219.9 397c6.2 6.2 16.4 6.2 22.6 0c1.7-1.7 3-3.7 3.7-5.8c2.8-7.7 9.3-13.5 17.3-15.3s16.4 .6 22.2 6.5L296.5 393c11.6 11.6 30.4 11.6 41.9 0c5.4-5.4 8.3-12.3 8.6-19.4c.4-8.8 5.6-16.6 13.6-20.4s17.3-3 24.4 2.1c9.4 6.7 22.5 5.8 30.9-2.6c9.4-9.4 9.4-24.6 0-33.9L340.1 243l-35.8 33c-27.3 25.2-69.2 25.6-97 .9c-31.7-28.2-32.4-77.4-1.6-106.5l70.1-66.2C303.2 78.4 339.4 64 377.1 64c36.1 0 71 13.3 97.9 37.2L505.1 128H544h40 40c8.8 0 16 7.2 16 16V352c0 17.7-14.3 32-32 32H576c-11.8 0-22.2-6.4-27.7-16H463.4c-3.4 6.7-7.9 13.1-13.5 18.7c-17.1 17.1-40.8 23.8-63 20.1c-3.6 7.3-8.5 14.1-14.6 20.2c-27.3 27.3-70 30-100.4 8.1c-25.1 20.8-62.5 19.5-86-4.1L159 404l-7-7-35.6-35.6c-5.5-5.5-12.7-8.7-20.4-9.3C96 369.7 81.6 384 64 384H32c-17.7 0-32-14.3-32-32V144c0-8.8 7.2-16 16-16H56 96h19.8c2 0 3.9-.7 5.3-2l26.5-23.6C175.5 77.7 211.4 64 248.7 64H259c4.4 0 8.9 .2 13.2 .6zM544 320V176H496c-5.9 0-11.6-2.2-15.9-6.1l-36.9-32.8c-18.2-16.2-41.7-25.1-66.1-25.1c-25.4 0-49.8 9.7-68.3 27.1l-70.1 66.2c-10.3 9.8-10.1 26.3 .5 35.7c9.3 8.3 23.4 8.1 32.5-.3l71.9-66.4c9.7-9 24.9-8.4 33.9 1.4s8.4 24.9-1.4 33.9l-.8 .8 74.4 74.4c10 10 16.5 22.3 19.4 35.1H544zM64 336a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm528 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"],
    "hat-chef": [512,512,[],"f86b","M180.9 100.3C192.2 69.7 221.6 48 256 48s63.8 21.7 75.1 52.3c3.2 8.7 11.2 14.8 20.5 15.6s18.2-3.8 22.8-11.9c8.3-14.4 23.9-24 41.6-24c26.5 0 48 21.5 48 48c0 10.9-2.9 28.1-8.1 49.2c-5.1 20.6-11.9 43.2-18.8 64.4c-6.9 21.2-13.8 40.6-19 54.8c-1 2.7-1.9 5.3-2.8 7.6H360.6l23.2-133.3c1.5-8.7-4.3-17-13-18.5s-17 4.3-18.5 13L328.1 304H272V160c0-8.8-7.2-16-16-16s-16 7.2-16 16V304H183.9L159.8 165.3c-1.5-8.7-9.8-14.5-18.5-13s-14.5 9.8-13 18.5L151.4 304H96.6c-.9-2.3-1.8-4.9-2.8-7.6c-5.2-14.2-12.1-33.7-19-54.8c-6.9-21.2-13.7-43.8-18.8-64.4C50.9 156.1 48 138.9 48 128c0-26.5 21.5-48 48-48c17.7 0 33.3 9.6 41.6 24c4.7 8.1 13.6 12.7 22.8 11.9s17.3-6.9 20.5-15.6zM454.4 336.7L432 328c22.4 8.7 22.4 8.7 22.4 8.7l0 0 0 0 0-.1 .1-.3 .5-1.3c.4-1.1 1-2.7 1.8-4.8c1.6-4.1 3.8-10.1 6.4-17.3c5.3-14.6 12.4-34.6 19.5-56.4c7.1-21.8 14.3-45.7 19.7-67.8c5.3-21.7 9.4-43.5 9.4-60.6c0-53-43-96-96-96c-21.6 0-41.6 7.2-57.6 19.2C335.1 20.1 297.9 0 256 0s-79.1 20.1-102.4 51.2c-16-12-36-19.2-57.6-19.2C43 32 0 75 0 128c0 17.1 4.1 38.9 9.4 60.6c5.4 22.2 12.6 46 19.7 67.8c7.1 21.8 14.2 41.9 19.5 56.4c2.7 7.3 4.9 13.2 6.4 17.3c.8 2.1 1.4 3.7 1.8 4.8l.5 1.3 .1 .3 0 .1 0 0 0 0s0 0 22.4-8.7l-22.4 8.7C61.2 345.9 70.1 352 80 352H432c9.9 0 18.8-6.1 22.4-15.3zM64 384v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384H400v64c0 8.8-7.2 16-16 16H128c-8.8 0-16-7.2-16-16V384H64z"],
    "head-side-brain": [512,512,[],"f808","M48 224c0-97.2 78.8-176 176-176h24c60.1 0 115.7 36.7 139.6 88.3c3.9 8.4 7.5 17 11.4 25.9l1.5 3.5c4.3 10.1 8.9 20.7 13.9 31.1c10.1 20.8 22.5 42 40.6 60.1l4.4 4.4c2.9 2.9 4.6 6.9 4.6 11c0 8.6-7 15.6-15.6 15.6H424c-13.3 0-24 10.7-24 24v72c0 8.8-7.2 16-16 16H296c-13.3 0-24 10.7-24 24v64c0 13.3 10.7 24 24 24s24-10.7 24-24V448h64c35.3 0 64-28.7 64-64V336h.4c35.1 0 63.6-28.5 63.6-63.6c0-16.9-6.7-33-18.6-45L489 223c-12.7-12.7-22.4-28.5-31.4-47.1c-4.5-9.3-8.7-18.9-13-29l-1.5-3.5c-3.8-8.9-7.8-18.2-12-27.3C399.4 47.6 326.8 0 248 0H224C100.3 0 0 100.3 0 224c0 53.6 18.9 102.9 50.3 141.5c8.9 11 13.7 22.4 13.7 33.1V488c0 13.3 10.7 24 24 24s24-10.7 24-24V398.6c0-24.9-10.9-46.8-24.5-63.4C62.8 304.8 48 266.2 48 224zm264-32c22.1 0 40-17.9 40-40s-17.9-40-40-40c-2 0-3.9 .1-5.8 .4C299.8 102.5 288.7 96 276 96c-6.2 0-12.1 1.6-17.2 4.3C252 88.2 238.9 80 224 80s-28 8.2-34.8 20.3C184.1 97.6 178.2 96 172 96c-18.5 0-33.8 14-35.8 32l-.2 0c-22.1 0-40 17.9-40 40c0 16.5 9.9 30.6 24.1 36.7c-.1 1.1-.1 2.2-.1 3.3c0 22.1 17.9 40 40 40c5.7 0 11.1-1.2 16-3.3V296c0 13.3 10.7 24 24 24s24-10.7 24-24V247.2c2.6 .5 5.3 .8 8 .8c22.1 0 40-17.9 40-40c0-5.7-1.2-11.1-3.3-16H312z"],
    "heart": [512,512,["61578","10084","9829","129505","129294","129293","128420","128156","128155","128154","128153"],"f004","M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"],
    "heart-circle-plus": [576,512,[],"e500","M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9l0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 6-.4 12-1.1 17.9c-14.6-7.3-30.4-12.7-47-15.8c0-.7 0-1.4 0-2.1v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2l-.1 .1-.1 .1-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7l8.7-8c5.3 16.1 12.8 31.2 22.2 44.9l-.6 .6c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z"],
    "heart-pulse": [512,512,["heartbeat"],"f21e","M256 163.9L222.1 130l-12-12c-21.7-21.7-52.5-31.6-82.7-26.5C81.6 99.1 48 138.7 48 185.1v5.8c0 23.9 8.4 46.9 23.5 65.1h51.1c6.5 0 12.3-3.9 14.8-9.8l31.8-76.3c2.5-5.9 8.2-9.8 14.5-9.8s12.2 3.6 14.8 9.4l58.2 129.3 48.9-97.9c2.7-5.4 8.3-8.8 14.3-8.8s11.6 3.4 14.3 8.8l23.2 46.3c2.7 5.4 8.2 8.8 14.3 8.8h68.7c15.1-18.2 23.5-41.2 23.5-65.1v-5.8c0-46.4-33.6-86-79.3-93.6c-30.2-5-61.1 4.8-82.7 26.5l-12 12L256 163.9zM456 288H407.4 371.8c-18.2 0-34.8-10.3-42.9-26.5L320 243.8l-49.7 99.4c-2.8 5.5-8.5 9-14.6 8.8s-11.7-3.8-14.3-9.4L184.6 216.2 167 258.5C159.5 276.3 142 288 122.7 288h-18H56 35.7C12.8 261.1 0 226.7 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l0 0 12 12 12-12 0 0c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 35.8-12.8 70.1-35.7 97.1H456zM68.6 320h70.3L256 429.3 373.1 320h70.3L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L68.6 320z"],
    "hotel": [512,512,["127976"],"f594","M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48h8V464H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8V48h8c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM432 48V464H304V384h32c8.8 0 16.1-7.2 14.7-15.9C343.1 322.6 303.6 288 256 288s-87.1 34.6-94.7 80.1c-1.5 8.7 5.8 15.9 14.7 15.9h32v80H80V48H432zM144 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H144zm80 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16zM336 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H336zM128 208v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zm112-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H240zm80 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"],
    "house": [576,512,["63500","63498","127968","home","home-alt","home-lg-alt"],"f015","M303.5 5.7c-9-7.6-22.1-7.6-31.1 0l-264 224c-10.1 8.6-11.3 23.7-2.8 33.8s23.7 11.3 33.8 2.8L64 245.5V432c0 44.2 35.8 80 80 80H432c44.2 0 80-35.8 80-80V245.5l24.5 20.8c10.1 8.6 25.3 7.3 33.8-2.8s7.3-25.3-2.8-33.8l-264-224zM112 432V204.8L288 55.5 464 204.8V432c0 17.7-14.3 32-32 32H384V312c0-22.1-17.9-40-40-40H232c-22.1 0-40 17.9-40 40V464H144c-17.7 0-32-14.3-32-32zm128 32V320h96V464H240z"],
    "house-chimney-medical": [576,512,["clinic-medical"],"f7f2","M272.5 5.7c9-7.6 22.1-7.6 31.1 0L464 141.9V56c0-13.3 10.7-24 24-24s24 10.7 24 24V182.6l55.5 47.1c10.1 8.6 11.3 23.7 2.8 33.8s-23.7 11.3-33.8 2.8L512 245.5V432c0 44.2-35.8 80-80 80H144c-44.2 0-80-35.8-80-80V245.5L39.5 266.3c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l264-224zM112 204.8V432c0 17.7 14.3 32 32 32H432c17.7 0 32-14.3 32-32V204.8L288 55.5 112 204.8zM272 192h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H320v48c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V320H208c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h48V208c0-8.8 7.2-16 16-16z"],
    "image": [512,512,[],"f03e","M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"],
    "industry": [576,512,[],"f275","M88 80c-4.4 0-8 3.6-8 8V304v48 56c0 13.3 10.7 24 24 24H472c13.3 0 24-10.7 24-24V320 304l0-148.1-139.1 89c-7.4 4.7-16.8 5-24.5 .8s-12.5-12.3-12.5-21.1l0-70.9L180.1 235.4c-7.4 4.3-16.6 4.4-24 .1s-12-12.2-12-20.8V88c0-4.4-3.6-8-8-8H88zM32 88c0-30.9 25.1-56 56-56h48c30.9 0 56 25.1 56 56v84.9l103.8-60.6c32-18.7 72.2 4.4 72.2 41.5v27l102.1-65.4C502.1 95 544 117.9 544 155.9V304v16 88c0 39.8-32.2 72-72 72H104c-39.8 0-72-32.2-72-72V352 304 88z"],
    "jet-fighter": [640,512,["fighter-jet"],"f0fb","M216 0h23.8 .4H296c13.3 0 24 10.7 24 24s-10.7 24-24 24h-6.9c4.7 6.1 9.8 12.6 15.1 19.6c25.3 32.8 56.8 74.1 81.8 108.4h97.1c5.7 0 11.3 .9 16.7 2.5l108.1 33.8C627 218.3 640 236 640 256s-13 37.7-32.1 43.7L499.8 333.4c-5.4 1.7-11 2.6-16.7 2.6H386L288.5 464H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H240.2h-.5H216 184c-13.3 0-24-10.7-24-24s10.7-24 24-24h8V336H177.9l-31.6 31.6c-10.5 10.5-24.7 16.4-39.6 16.4H88c-30.9 0-56-25.1-56-56V280H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h8V184c0-30.9 25.1-56 56-56h18.7c14.9 0 29.1 5.9 39.6 16.4L177.9 176H192V48h-8c-13.3 0-24-10.7-24-24s10.7-24 24-24h32zm24 176h86.4c-19.9-26.7-41.6-55.1-60.1-79.1C256.3 84 247.3 72.4 240 63V176zM80 280v48c0 4.4 3.6 8 8 8h18.7c2.1 0 4.2-.8 5.7-2.3L151 295c4.5-4.5 10.6-7 17-7H483.1c.8 0 1.6-.1 2.4-.4L586.7 256 485.5 224.4c-.8-.2-1.6-.4-2.4-.4H168c-6.4 0-12.5-2.5-17-7l-38.6-38.6c-1.5-1.5-3.5-2.3-5.7-2.3H88c-4.4 0-8 3.6-8 8v48h56c13.3 0 24 10.7 24 24s-10.7 24-24 24H80zm160 56V448.4L325.6 336H240z"],
    "keyboard": [576,512,["9000"],"f11c","M64 112c-8.8 0-16 7.2-16 16V384c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H64zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 320H400c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm-72-72c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H200c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H200c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H280c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H280c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H360c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H360c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16zm64 96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H440c-8.8 0-16-7.2-16-16V248zm16-96h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H440c-8.8 0-16-7.2-16-16V168c0-8.8 7.2-16 16-16z"],
    "landmark": [512,512,["127963"],"f66f","M267.6 3c-7.2-4-16-4-23.2 0L17.6 128.1C6.7 134.1 0 145.5 0 157.9C0 176.8 15.2 192 34.1 192H477.9c18.8 0 34.1-15.2 34.1-34.1c0-12.4-6.7-23.8-17.6-29.8L267.6 3zM256 51.4L423.8 144H88.2L256 51.4zM112 224H64V384H56c-13.3 0-24 10.7-24 24s10.7 24 24 24H456c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8V224H400V384H336V224H288V384H224V224H176V384H112V224zM0 488c0 13.3 10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H24c-13.3 0-24 10.7-24 24z"],
    "laptop": [640,512,["128187"],"f109","M512 80H128c-8.8 0-16 7.2-16 16V320H64V96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V320H528V96c0-8.8-7.2-16-16-16zM96 432H544c20.9 0 38.7-13.4 45.3-32H50.7c6.6 18.6 24.4 32 45.3 32zM0 384c0-17.7 14.3-32 32-32H608c17.7 0 32 14.3 32 32c0 53-43 96-96 96H96c-53 0-96-43-96-96z"],
    "leaf": [512,512,[],"f06c","M149.6 234.4c20.9-6.7 43.2-10.4 66.4-10.4h80c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-25.4 0-49.5 5.6-71 15.7C152.7 351 206.6 400 271.9 400h.1l.8 0 .1 0C370.2 399.5 464 299.7 464 156.6c0-12.8-.8-25.3-2.3-37.5C437 134.9 407.6 144 376 144l-104 0c-57.6 0-106.3 38.1-122.4 90.4zM96.4 260.1C102.5 168.5 178.8 96 272 96l104 0c28.7 0 54.8-10.8 74.6-28.5c.7-.6 1.4-1.3 2.1-1.9c6.6-6.2 12.5-13.2 17.4-20.9c1.6-2.5 3.2-5.1 4.6-7.8c3.5-6.5 13.6-6.8 16.2 .1c1.3 3.5 2.5 7 3.7 10.6c2.9 8.9 5.5 17.9 7.8 27.2c.5 1.9 .9 3.8 1.3 5.6c5.4 24.3 8.3 49.8 8.3 76.2C512 317.1 405.1 447.3 273 448l-1 0c-81.7 0-150.4-55.7-170.2-131.2C68.7 347.5 48 391.3 48 440v16c0 13.3-10.7 24-24 24s-24-10.7-24-24V440c0-75.1 38.3-141.2 96.4-179.9z"],
    "lightbulb": [384,512,["128161"],"f0eb","M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z"],
    "link": [640,512,["128279","chain"],"f0c1","M580.3 267.2c56.2-56.2 56.2-147.3 0-203.5C526.8 10.2 440.9 7.3 383.9 57.2l-6.1 5.4c-10 8.7-11 23.9-2.3 33.9s23.9 11 33.9 2.3l6.1-5.4c38-33.2 95.2-31.3 130.9 4.4c37.4 37.4 37.4 98.1 0 135.6L433.1 346.6c-37.4 37.4-98.2 37.4-135.6 0c-35.7-35.7-37.6-92.9-4.4-130.9l4.7-5.4c8.7-10 7.7-25.1-2.3-33.9s-25.1-7.7-33.9 2.3l-4.7 5.4c-49.8 57-46.9 142.9 6.6 196.4c56.2 56.2 147.3 56.2 203.5 0L580.3 267.2zM59.7 244.8C3.5 301 3.5 392.1 59.7 448.2c53.6 53.6 139.5 56.4 196.5 6.5l6.1-5.4c10-8.7 11-23.9 2.3-33.9s-23.9-11-33.9-2.3l-6.1 5.4c-38 33.2-95.2 31.3-130.9-4.4c-37.4-37.4-37.4-98.1 0-135.6L207 165.4c37.4-37.4 98.1-37.4 135.6 0c35.7 35.7 37.6 92.9 4.4 130.9l-5.4 6.1c-8.7 10-7.7 25.1 2.3 33.9s25.1 7.7 33.9-2.3l5.4-6.1c49.9-57 47-142.9-6.5-196.5c-56.2-56.2-147.3-56.2-203.5 0L59.7 244.8z"],
    "loader": [512,512,[],"e1d4","M280 24c0-13.3-10.7-24-24-24s-24 10.7-24 24v80c0 13.3 10.7 24 24 24s24-10.7 24-24V24zm0 384c0-13.3-10.7-24-24-24s-24 10.7-24 24v80c0 13.3 10.7 24 24 24s24-10.7 24-24V408zM0 256c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zm408-24c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H408zM437 75c-9.4-9.4-24.6-9.4-33.9 0l-56.6 56.6c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L437 108.9c9.4-9.4 9.4-24.6 0-33.9zM165.5 380.4c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L75 403.1c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l56.6-56.6zM75 75c-9.4 9.4-9.4 24.6 0 33.9l56.6 56.6c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L108.9 75c-9.4-9.4-24.6-9.4-33.9 0zM380.5 346.5c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L403.1 437c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-56.6-56.6z"],
    "location-crosshairs": [512,512,["location"],"f601","M256 0c13.3 0 24 10.7 24 24V65.5C366.8 76.3 435.7 145.2 446.5 232H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H446.5C435.7 366.8 366.8 435.7 280 446.5V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V446.5C145.2 435.7 76.3 366.8 65.5 280H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H65.5C76.3 145.2 145.2 76.3 232 65.5V24c0-13.3 10.7-24 24-24zM112 256a144 144 0 1 0 288 0 144 144 0 1 0 -288 0zm192 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-144 0a96 96 0 1 1 192 0 96 96 0 1 1 -192 0z"],
    "location-dot": [384,512,["map-marker-alt"],"f3c5","M336 192c0-79.5-64.5-144-144-144S48 112.5 48 192c0 12.4 4.5 31.6 15.3 57.2c10.5 24.8 25.4 52.2 42.5 79.9c28.5 46.2 61.5 90.8 86.2 122.6c24.8-31.8 57.8-76.4 86.2-122.6c17.1-27.7 32-55.1 42.5-79.9C331.5 223.6 336 204.4 336 192zm48 0c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192zm-160 0a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-112 0a80 80 0 1 1 160 0 80 80 0 1 1 -160 0z"],
    "magnifying-glass": [512,512,["128269","search"],"f002","M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"],
    "mailbox": [576,512,["128234"],"f813","M48 208c0-53 43-96 96-96s96 43 96 96V400H64c-8.8 0-16-7.2-16-16V208zM240 448h48H512c35.3 0 64-28.7 64-64V208c0-79.5-64.5-144-144-144H144C64.5 64 0 128.5 0 208V384c0 35.3 28.7 64 64 64H240zm48-240c0-36.9-13.9-70.5-36.7-96H432c53 0 96 43 96 96V384c0 8.8-7.2 16-16 16H288V208zM104 192c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H104zm256 0c-13.3 0-24 10.7-24 24s10.7 24 24 24h56v24c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V216c0-13.3-10.7-24-24-24H440 360z"],
    "map": [576,512,["62072","128506"],"f279","M565.6 36.2C572.1 40.7 576 48.1 576 56V392c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456V120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5V421.2l120-45.7V90.8L48 136.5zM360 422.7V137.3l-144-48V374.7l144 48zm48-1.5l120-45.7V90.8L408 136.5V421.2z"],
    "map-location": [576,512,["map-marked"],"f59f","M403 148.6c3.2-10.3 5-20 5-28.6C408 53.7 354.3 0 288 0C226.4 0 175.6 46.4 168.8 106.2c-.5 4.5-.8 9.1-.8 13.8c0 10.3 2.6 22 7 34.6c.7 2.1 1.5 4.2 2.3 6.3c10.4 27 28.3 57.1 46.7 84.4c18.1 26.9 36.7 51.1 49.2 66.6c7.7 9.6 22 9.6 29.6 0c12.4-15.5 31.1-39.7 49.2-66.6c.1-.2 .3-.4 .4-.6c4.6-6.8 9.1-13.7 13.5-20.8c3.3-5.3 6.5-10.7 9.6-16c0-.1 .1-.1 .1-.2c11.8-20.4 21.8-40.8 27.4-59.2zm-8.3 89.6c-13.9 22.5-29.1 44.2-42.7 62.4V453.7L224 407.2V300.6c-13.5-18.2-28.8-39.9-42.7-62.4c-1.8-2.9-3.6-5.8-5.3-8.8V407.2L48 453.7V200.8l96.9-35.2c-5.2-14.9-8.9-30.5-8.9-45.6c0-.8 0-1.5 0-2.3L15.8 161.4C6.3 164.9 0 173.9 0 184V488c0 7.8 3.8 15.2 10.2 19.7s14.6 5.6 22 2.9l167.8-61 167.8 61c5.3 1.9 11.1 1.9 16.4 0l176-64c9.5-3.4 15.8-12.5 15.8-22.6V120c0-7.8-3.8-15.2-10.2-19.7s-14.6-5.6-22-2.9l-105 38.2c-2.2 15-7.3 30.2-13.2 44.2c-2 4.6-4.1 9.3-6.3 14L528 154.3V407.2L400 453.7V229.5c-1.8 3-3.5 5.9-5.3 8.8z"],
    "masks-theater": [640,512,["127917","theater-masks"],"f630","M376.1 32.1c-41.2 .7-71.8 7.8-94.3 16.7c-23.1-2-53.9-1.4-94 5.2C95.6 69.1 60.7 98 49.3 110.7L76.8 271.9c4.9 28.7 17.5 52.2 36.1 67.2c20.3 16.4 45.2 34 70.7 46.2c10.4 5 20 8.6 28.8 11.1c1.7 3.1 3.4 6.1 5.3 9.2c8.1 13 17.9 27.5 29.1 42.1c-58 4.9-123.3-37.8-165-71.7c-29.7-24-46.8-59-53.2-96.2L.8 116.1c-1.7-9.8-1-19.9 4.7-28C20.5 67 63.6 25.9 179.8 6.9S350.5 12.8 371.6 28c1.7 1.2 3.2 2.5 4.5 4zM194 282.3c-15.6 5.8-29.7 14-42.1 24.2c-6.6 5.4-16.8 1.7-15.6-6.6c5.4-35 31.3-64.6 67.2-74.3l-8.5 49.6c-.4 2.3-.8 4.7-1.1 7zM176.7 153.7c4.5-3.2 11.1-2.2 12.2 3.1c.1 .5 .2 1.1 .3 1.6c3.7 21.7-11.2 42.2-33.4 45.8s-43.1-11-46.8-32.7c-.1-.5-.2-1.1-.2-1.6c-.7-5.4 5.3-8.4 10.5-6.9c9.3 2.8 19.5 3.6 29.8 1.9s19.6-5.7 27.5-11.3zM385.1 510.6c-60-9.8-110.5-74.6-140.1-122c-20.1-32.2-24.7-70.7-18.3-107.9L254.6 117c1.7-9.8 5.6-19.1 13.8-24.9C289.5 76.8 344 51.8 460.2 70.9S619.5 131 634.5 152.1c5.8 8.1 6.4 18.2 4.7 28L611.3 343.8c-6.4 37.2-23.5 72.2-53.2 96.2c-43.7 35.4-113.1 80.5-173 70.7zm-47-80.7c20.7 20.3 39.5 31 55 33.6s36.9-1.6 63.2-14.2c25.5-12.2 50.4-29.8 70.7-46.2c18.6-15.1 31.2-38.6 36.1-67.3l27.5-161.2C579.3 162 544.4 133.1 452.1 118s-134.9 1-149.9 9.4L274.7 288.6c-4.9 28.7-.8 54.9 11.8 75.1c13.7 22 31.5 46.6 51.5 66.2zm57.3-193.4c-7.9-5.6-17.2-9.6-27.5-11.3s-20.4-.9-29.8 1.9c-5.3 1.6-11.2-1.5-10.5-6.9c.1-.5 .2-1.1 .2-1.6c3.7-21.7 24.6-36.3 46.8-32.7s37.1 24.1 33.4 45.8c-.1 .5-.2 1.1-.3 1.6c-1.1 5.3-7.8 6.3-12.2 3.1zm140.4 17.9c-1.1 5.3-7.8 6.3-12.2 3.1c-7.9-5.6-17.2-9.6-27.5-11.3s-20.4-.9-29.8 1.9c-5.3 1.6-11.2-1.5-10.5-6.9c.1-.5 .2-1.1 .2-1.6c3.7-21.7 24.6-36.3 46.8-32.7s37.1 24.1 33.4 45.8c-.1 .5-.2 1.1-.3 1.6zm-20.3 56.6c7.9-3.2 16.5 3.5 12.8 11.1c-21.1 44.3-70.3 71.2-121.9 62.8s-89.2-49.7-94.4-98.2c-.9-8.3 9.4-12 15.8-6.4c24.3 21.2 54.8 36.2 89.3 41.8s68.3 1.2 98.3-11.1z"],
    "megaphone": [576,512,["128227"],"f675","M552 32c-13.3 0-24 10.7-24 24v5.7L48 192.6V184c0-13.3-10.7-24-24-24s-24 10.7-24 24v21.7V224v64 18.3V328c0 13.3 10.7 24 24 24s24-10.7 24-24v-8.6l117.6 32.1C162 361.7 160 372.6 160 384c0 53 43 96 96 96c46.9 0 86-33.6 94.3-78.1L528 450.3V456c0 13.3 10.7 24 24 24s24-10.7 24-24V432 80 56c0-13.3-10.7-24-24-24zM528 400.6L48 269.7V242.3L528 111.4V400.6zM208 384c0-7.1 1.5-13.8 4.3-19.8l91.5 24.9c-2.6 24.1-23 42.8-47.7 42.8c-26.5 0-48-21.5-48-48z"],
    "microchip": [512,512,[],"f2db","M184 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64h-8c-35.3 0-64 28.7-64 64v8H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v48H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v48H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v8c0 35.3 28.7 64 64 64h8v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h48v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h48v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h8c35.3 0 64-28.7 64-64v-8h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V184h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448v-8c0-35.3-28.7-64-64-64h-8V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H184V24zM400 128V384c0 8.8-7.2 16-16 16H128c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16H384c8.8 0 16 7.2 16 16zM192 160c-17.7 0-32 14.3-32 32V320c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32H192zm16 48h96v96H208V208z"],
    "minus": [448,512,["10134","8722","8211","subtract"],"f068","M432 256c0 13.3-10.7 24-24 24L40 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l368 0c13.3 0 24 10.7 24 24z"],
    "mortar-pestle": [512,512,[],"f5a7","M504.3 11.1c10.9 12.7 10.2 31.7-1.6 43.5L397.3 160H252.3L461 6.2c13.5-9.9 32.3-7.8 43.2 4.9zM80 240v16c0 62.9 31.3 109.5 91.9 131c14.6 5.2 25.8 17.1 30.1 32.1s1 31-8.6 43.1c-.5 .6-1 1.2-1.4 1.8H320c-.5-.6-.9-1.2-1.4-1.8c-9.7-12.1-12.9-28.2-8.6-43.1s15.5-26.9 30.1-32.1c60.7-21.6 91.9-68.1 91.9-131V240H80zm432-24c0 13.3-10.7 24-24 24h-8v16c0 66-27.8 120.8-80 154.8c-13.1 8.5-27.7 15.7-43.9 21.5c10 12.6 17.7 27.1 22.5 42.9c.5 1.7 1 3.5 1.4 5.2c4.4 17.1-10.4 31.7-28.1 31.7H160c-17.7 0-32.4-14.6-28.1-31.7c.4-1.8 .9-3.5 1.4-5.2c4.7-15.8 12.5-30.3 22.5-42.9c-16.1-5.7-30.8-12.9-43.9-21.5C59.8 376.8 32 322 32 256V240H24c-13.3 0-24-10.7-24-24s10.7-24 24-24h8H480h8c13.3 0 24 10.7 24 24z"],
    "mug-hot": [512,512,["9749"],"f7b6","M88 0c13.3 0 24 10.7 24 24c0 16.1 7.5 23.7 23.8 37.9l1.1 1C152.6 76.6 176 97.1 176 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-16.1-7.5-23.7-23.8-37.9l-1.1-1C87.4 83.4 64 62.9 64 24C64 10.7 74.7 0 88 0zM48 416c0 26.5 21.5 48 48 48H288c26.5 0 48-21.5 48-48V240H48V416zM0 224c0-17.7 14.3-32 32-32H352h48c61.9 0 112 50.1 112 112s-50.1 112-112 112H384c0 53-43 96-96 96H96c-53 0-96-43-96-96V224zM384 368h16c35.3 0 64-28.7 64-64s-28.7-64-64-64H384V368zM224 24c0 16.1 7.5 23.7 23.8 37.9l1.1 1C264.6 76.6 288 97.1 288 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-16.1-7.5-23.7-23.8-37.9l-1.1-1C199.4 83.4 176 62.9 176 24c0-13.3 10.7-24 24-24s24 10.7 24 24z"],
    "music": [512,512,["127925"],"f001","M512 31c0-17.1-13.9-31-31-31c-3.1 0-6.2 .5-9.1 1.4l-311 95.7C150.9 100.2 144 109.5 144 120V240 362.7c-14.1-6.8-30.5-10.7-48-10.7c-53 0-96 35.8-96 80s43 80 96 80s96-35.8 96-80V260.2l272-83.7V298.7c-14.1-6.8-30.5-10.7-48-10.7c-53 0-96 35.8-96 80s43 80 96 80s96-35.8 96-80V144.6c0-.4 0-.7 0-1.1V31zM464 368c0 9.8-12.9 32-48 32s-48-22.2-48-32s12.9-32 48-32s48 22.2 48 32zM144 432c0 9.8-12.9 32-48 32s-48-22.2-48-32s12.9-32 48-32s48 22.2 48 32zM464 126.3L192 210V137.7L464 54v72.2z"],
    "newspaper": [512,512,["128240"],"f1ea","M168 80c-13.3 0-24 10.7-24 24V408c0 8.4-1.4 16.5-4.1 24H440c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H168zM72 480c-39.8 0-72-32.2-72-72V112C0 98.7 10.7 88 24 88s24 10.7 24 24V408c0 13.3 10.7 24 24 24s24-10.7 24-24V104c0-39.8 32.2-72 72-72H440c39.8 0 72 32.2 72 72V408c0 39.8-32.2 72-72 72H72zM176 136c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H200c-13.3 0-24-10.7-24-24V136zm200-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24z"],
    "paintbrush": [576,512,["128396","paint-brush"],"f1fc","M278 219.5L356.5 298 524.7 73.6c4.8-6.4 4.1-15.3-1.5-20.9s-14.5-6.3-20.9-1.5L278 219.5zM199.1 321.6c-4.9-1-9.9-1.6-15.1-1.6c-39.8 0-72 32.2-72 72c0 3.8 .3 7.5 .8 11.1c3.3 21.4-2.2 43.1-13.8 60l-.7 .9H184c39.8 0 72-32.2 72-72c0-5.2-.5-10.2-1.6-15.1l-55.4-55.4zM384 341.3c-19.1 25.5-48.6 41.1-80.3 42.6c.2 2.7 .3 5.4 .3 8.1c0 66.3-53.7 120-120 120H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h6c18.1 0 30.1-19.8 27.4-37.6c-.9-6-1.4-12.1-1.4-18.4c0-66.3 53.7-120 120-120c2.7 0 5.4 .1 8.1 .3c1.5-31.7 17-61.1 42.5-80.3L473.5 12.8C499-6.3 534.6-3.8 557.2 18.7s25.1 58.2 6 83.7L384 341.3z"],
    "paper-plane": [512,512,["61913"],"f1d8","M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"],
    "pause": [320,512,["9208"],"f04c","M48 112l0 288H96V112H48zM0 112C0 85.5 21.5 64 48 64H96c26.5 0 48 21.5 48 48V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112zm224 0V400h48V112H224zm-48 0c0-26.5 21.5-48 48-48h48c26.5 0 48 21.5 48 48V400c0 26.5-21.5 48-48 48H224c-26.5 0-48-21.5-48-48V112z"],
    "pen-paintbrush": [576,512,["pencil-paintbrush"],"f618","M68.4 360.9L45.4 439 33 481.2c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1L105 498.6l78.1-23c12.4-3.6 23.7-9.9 33.4-18.4c1.4-1.2 2.7-2.5 4-3.8L524.7 149.3c21.9-21.9 24.6-55.6 8.2-80.5c-2.3-3.5-5.1-6.9-8.2-10L485.3 19.3c-25-25-65.5-25-90.5 0L90.6 323.5c-10.4 10.4-18 23.3-22.2 37.4zm46 13.5c1.7-5.6 4.5-10.8 8.4-15.2c.6-.6 1.1-1.2 1.7-1.8L353 129 415 191 186.6 419.5c-4.7 4.7-10.6 8.2-17 10.1l-23.4 6.9L91.4 452.6l16.1-54.8 6.9-23.4zm170.2 71.4C304.4 485.1 345 512 391.9 512h152c17.7 0 32-14.3 32-32s-14.3-32-32-32h-6c-18.1 0-30.1-19.8-27.4-37.6c.9-6 1.4-12.1 1.4-18.4c0-46.9-26.9-87.5-66.1-107.3l-37.2 37.2c31.7 7.5 55.3 36 55.3 70.1c0 3.8-.3 7.5-.8 11.1c-3.3 21.4 2.2 43.1 13.8 60l.7 .9H391.9c-34 0-62.5-23.6-70.1-55.3l-37.2 37.2zM136 24C105.1-6.9 54.9-6.9 24 24S-6.9 105.1 24 136l98.7 98.7 33.9-33.9L57.9 102.1c-12.2-12.2-12.2-31.9 0-44.1s31.9-12.2 44.1 0l98.7 98.7 33.9-33.9L136 24z"],
    "pen-ruler": [512,512,["pencil-ruler"],"f5ae","M13.4 439l23-78.1c4.2-14.1 11.8-27 22.2-37.4L362.7 19.3c25-25 65.5-25 90.5 0l39.4 39.4c3.1 3.1 5.9 6.5 8.2 10c16.4 24.8 13.7 58.6-8.2 80.5L188.5 453.4c-1.3 1.3-2.6 2.6-4 3.8c-9.6 8.5-21 14.8-33.4 18.4L73 498.6 30.8 511c-8.4 2.5-17.5 .2-23.7-6.1S-1.5 489.7 1 481.2L13.4 439zm62.2-41.2L59.4 452.6l54.8-16.1 23.4-6.9c6.4-1.9 12.3-5.4 17-10.1L383 191 321 129 92.5 357.4c-.6 .6-1.2 1.2-1.7 1.8c-3.9 4.4-6.7 9.6-8.4 15.2l-6.9 23.4zM173.3 27.3l65.2 65.2-33.9 33.9-26.2-26.2-23 23c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l23-23L139.3 61.3c-6.2-6.2-16.4-6.2-22.6 0L61.3 116.7c-6.2 6.2-6.2 16.4 0 22.6l65.2 65.2L92.5 238.5 27.3 173.3c-25-25-25-65.5 0-90.5L82.7 27.3c25-25 65.5-25 90.5 0zM372.7 450.7c6.2 6.2 16.4 6.2 22.6 0l55.4-55.4c6.2-6.2 6.2-16.4 0-22.6l-16.4-16.4-23 23c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l23-23-26.2-26.2 33.9-33.9 65.2 65.2c25 25 25 65.5 0 90.5l-55.4 55.4c-25 25-65.5 25-90.5 0l-65.2-65.2 33.9-33.9 65.2 65.2z"],
    "pencil": [512,512,["61504","9999","pencil-alt"],"f303","M36.4 360.9L13.4 439 1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1L73 498.6l78.1-23c10.4-3 20.1-8 28.6-14.5l.3 .2 .5-.8c1.4-1.1 2.7-2.2 4-3.3c1.4-1.2 2.7-2.5 4-3.8L492.7 149.3c21.9-21.9 24.6-55.6 8.2-80.5c-2.3-3.5-5.1-6.9-8.2-10L453.3 19.3c-25-25-65.5-25-90.5 0L58.6 323.5c-2.5 2.5-4.9 5.2-7.1 8l-.8 .5 .2 .3c-6.5 8.5-11.4 18.2-14.5 28.6zM383 191L197.4 376.6l-49.6-12.4-12.4-49.6L321 129 383 191zM97 358.9l7.7 31c2.1 8.6 8.9 15.3 17.5 17.5l31 7.7-7.4 11.2c-2.6 1.4-5.3 2.6-8.1 3.4l-23.4 6.9L59.4 452.6l16.1-54.8 6.9-23.4c.8-2.8 2-5.6 3.4-8.1L97 358.9zM315.3 218.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-96 96c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l96-96z"],
    "person-praying": [448,512,["128720","pray"],"f683","M352 64A64 64 0 1 0 224 64a64 64 0 1 0 128 0zM202.1 192c5.3 0 10.2 2.7 12.9 7.2l4.3 7.1L152.2 367.5l-9.4-6c-9.8-6.3-13.7-18.7-9.2-29.4l54.5-130.7c2.4-5.7 7.9-9.3 14-9.3zm48.3 64.7l7.4 12.1c12.8 20.9 41.2 25.4 59.9 9.6l89.8-76c10.1-8.6 11.4-23.7 2.8-33.8s-23.7-11.4-33.8-2.8l-82.7 70-37.9-61.6C244.4 155.4 224 144 202.1 144c-25.5 0-48.5 15.3-58.3 38.9L89.3 313.6c-13.4 32.3-1.8 69.5 27.6 88.3L214 464H56c-13.3 0-24 10.7-24 24s10.7 24 24 24H296c10.7 0 20-7 23-17.3s-1.1-21.2-10.1-27l-115.7-74 57.1-137.1z"],
    "phone": [512,512,["128379","128222"],"f095","M375.8 275.2c-16.4-7-35.4-2.4-46.7 11.4l-33.2 40.6c-46-26.7-84.4-65.1-111.1-111.1L225.3 183c13.8-11.3 18.5-30.3 11.4-46.7l-48-112C181.2 6.7 162.3-3.1 143.6 .9l-112 24C13.2 28.8 0 45.1 0 64v0C0 295.2 175.2 485.6 400.1 509.5c9.8 1 19.6 1.8 29.6 2.2c0 0 0 0 0 0c0 0 .1 0 .1 0c6.1 .2 12.1 .4 18.2 .4l0 0c18.9 0 35.2-13.2 39.1-31.6l24-112c4-18.7-5.8-37.6-23.4-45.1l-112-48zM441.5 464C225.8 460.5 51.5 286.2 48.1 70.5l99.2-21.3 43 100.4L154.4 179c-18.2 14.9-22.9 40.8-11.1 61.2c30.9 53.3 75.3 97.7 128.6 128.6c20.4 11.8 46.3 7.1 61.2-11.1l29.4-35.9 100.4 43L441.5 464zM48 64v0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0s0 0 0 0"],
    "plane": [576,512,[],"f072","M368.6 312l0-24c-8.2 0-15.8 4.2-20.2 11.1L368.6 312zM265.4 473.3l-20.2-12.9 0 0 20.2 12.9zm-82.8-6.1l22.9 7.3 0 0-22.9-7.3zM232.3 312l22.9 7.3c2.3-7.3 1-15.3-3.5-21.5s-11.7-9.8-19.4-9.8l0 24zM136 312l0-24c-7.6 0-14.7 3.6-19.2 9.6L136 312zM92.8 369.6L112 384l0 0L92.8 369.6zM80 376l0-24 0 24zm-42.1 0l0 24 0-24zM24.6 358l22.9 7.1 0 0L24.6 358zM56 256l22.9 7.1c1.4-4.6 1.4-9.5 0-14.1L56 256zM24.6 154l22.9-7.1 0 0L24.6 154zm13.3-18l0 24 0-24zM80 136l0-24 0 24zm12.8 6.4L73.6 156.8l19.2-14.4zM136 200l-19.2 14.4c4.5 6 11.6 9.6 19.2 9.6l0-24zm96.3 0l0 24c7.7 0 14.9-3.7 19.4-9.8s5.8-14.2 3.5-21.5L232.3 200zM182.7 44.9l22.9-7.3 0 0-22.9 7.3zm82.8-6.1L245.2 51.7l0 0 20.2-12.9zM368.6 200l-20.2 12.9c4.4 6.9 12 11.1 20.2 11.1l0-24zM576 256c0-17.4-8.8-31.1-18.7-40.7c-9.9-9.6-22.4-16.9-34.8-22.4C498 182.1 468.7 176 448 176l0 48c13.4 0 36.1 4.4 55.1 12.8c9.4 4.2 16.4 8.7 20.7 12.9c4.2 4.1 4.2 6.2 4.2 6.3l48 0zM448 336c20.6 0 49.8-5.8 74.4-16.5c12.4-5.4 25-12.7 34.9-22.4c10-9.8 18.7-23.6 18.7-41.1l-48 0c0 .6-.1 2.8-4.2 6.8c-4.3 4.2-11.2 8.6-20.6 12.7C484.3 283.8 461.6 288 448 288l0 48zm-79.4 0l79.4 0 0-48-79.4 0 0 48zm-83 150.2L388.9 324.9l-40.4-25.9L245.2 460.3l40.4 25.9zM238.5 512c19.1 0 36.9-9.7 47.2-25.8l-40.4-25.9c-1.5 2.3-4 3.7-6.7 3.7l0 48zm-40.6 0l40.6 0 0-48-40.6 0 0 48zm-38.1-52.2c-8.3 25.8 11 52.2 38.1 52.2l0-48c5.4 0 9.3 5.3 7.6 10.4l-45.7-14.6zm49.6-155.1L159.8 459.8l45.7 14.6 49.6-155.1-45.7-14.6zM136 336l96.3 0 0-48L136 288l0 48zm-19.2-38.4L73.6 355.2 112 384l43.2-57.6-38.4-28.8zM73.6 355.2c1.5-2 3.9-3.2 6.4-3.2l0 48c12.6 0 24.4-5.9 32-16L73.6 355.2zM80 352l-42.1 0 0 48L80 400l0-48zm-42.1 0c5.6 0 10.1 4.5 10.1 10.1l-48 0C0 383 17 400 37.9 400l0-48zM48 362.1c0 1-.2 2-.4 3L1.7 350.9C.6 354.6 0 358.3 0 362.1l48 0zm-.4 3l31.4-102L33.1 248.9 1.7 350.9l45.9 14.1zM78.9 248.9l-31.4-102L1.7 161.1l31.4 102 45.9-14.1zm-31.4-102c.3 1 .4 2 .4 3l-48 0c0 3.8 .6 7.5 1.7 11.1l45.9-14.1zm.4 3c0 5.6-4.5 10.1-10.1 10.1l0-48C17 112 0 129 0 149.9l48 0zM37.9 160L80 160l0-48-42.1 0 0 48zM80 160c-2.5 0-4.9-1.2-6.4-3.2L112 128c-7.6-10.1-19.4-16-32-16l0 48zm-6.4-3.2l43.2 57.6 38.4-28.8L112 128 73.6 156.8zM232.3 176L136 176l0 48 96.3 0 0-48zM159.8 52.2l49.6 155.1 45.7-14.6L205.5 37.6 159.8 52.2zM197.9 0c-27.1 0-46.4 26.4-38.1 52.2l45.7-14.6c1.7 5.2-2.2 10.4-7.6 10.4l0-48zm40.6 0L197.9 0l0 48 40.6 0 0-48zm47.2 25.8C275.4 9.7 257.6 0 238.5 0l0 48c2.7 0 5.3 1.4 6.7 3.7l40.4-25.9zM388.9 187.1L285.7 25.8 245.2 51.7 348.4 212.9l40.4-25.9zM448 176l-79.4 0 0 48 79.4 0 0-48z"],
    "planet-ringed": [512,512,["129680"],"e020","M464 31.1a.9 .9 0 1 0 -1.6 .5 .9 .9 0 1 0 1.6-.5zm-5.2 22.1c-11.9 4.4-27 11.5-45 21.9c-13.4-11.8-27.9-21.8-43-30c63.8-40.5 113.9-56.2 133.1-37c22.1 22.1-2.3 85.6-57.6 163.7C457.7 197.6 464 226 464 256c0 114.9-93.1 208-208 208c-30 0-58.4-6.3-84.2-17.7C93.7 501.6 30.3 526 8.1 503.9c-19.2-19.2-3.4-69.3 37-133.1c8.3 15.1 18.3 29.6 30 43c-10.4 18-17.6 33-21.9 45c12.6-4.6 28.7-12.3 48.1-23.8c8.2-4.8 16.7-10.2 25.4-16C78.8 380.9 48 322 48 256C48 141.1 141.1 48 256 48c66 0 124.9 30.8 163 78.8c5.8-8.8 11.2-17.3 16-25.4c11.4-19.4 19.2-35.5 23.8-48.1zM389.6 167.9C361 124.6 311.8 96 256 96C167.6 96 96 167.6 96 256c0 55.8 28.6 105 71.9 133.6c37.1-28.2 77.4-63.4 117.8-103.8s75.6-80.8 103.8-117.8zM217.9 411.4c12.2 3 25 4.6 38.1 4.6c88.4 0 160-71.6 160-160c0-13.1-1.6-25.9-4.6-38.1c-26.5 33-57.4 67.5-91.7 101.8s-68.8 65.2-101.8 91.7zM31.1 464a.9 .9 0 1 0 .5-1.6 .9 .9 0 1 0 -.5 1.6zm16.8 16a1.1 1.1 0 1 0 1.8 1.1A1.1 1.1 0 1 0 47.9 480zM480 47.9a1.1 1.1 0 1 0 1.1 1.8A1.1 1.1 0 1 0 480 47.9z"],
    "play": [384,512,["9654"],"f04b","M48 432L336 256 48 80l0 352zM24.5 38.1C39.7 29.6 58.2 30 73 39L361 215c14.3 8.7 23 24.2 23 41s-8.7 32.2-23 41L73 473c-14.8 9.1-33.4 9.4-48.5 .9S0 449.4 0 432V80C0 62.6 9.4 46.6 24.5 38.1z"],
    "plug": [384,512,["128268"],"f1e6","M128 24c0-13.3-10.7-24-24-24S80 10.7 80 24v88h48V24zm176 0c0-13.3-10.7-24-24-24s-24 10.7-24 24v88h48V24zM24 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h8v64c0 80.2 59 146.6 136 158.2V488c0 13.3 10.7 24 24 24s24-10.7 24-24V414.2c77-11.6 136-78 136-158.2V192h8c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H304 80 32 24zM192 368c-61.9 0-112-50.1-112-112V192H304v64c0 61.9-50.1 112-112 112z"],
    "plus": [448,512,["61543","10133","add"],"2b","M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"],
    "puzzle-piece": [512,512,["129513"],"f12e","M275.2 107.4L261.6 87.6l13.6 19.8zM404.6 323.2l-19.8 13.6 19.8-13.6zM275.3 470.5l-17.3-16.6 17.3 16.6zM41.5 323.3l16.6-17.3L41.5 323.3zM188.7 470.5l-17.3 16.6 17.3-16.6zM404.6 236.8l-19.8-13.6 19.8 13.6zm-363.1-.1l16.6 17.3L41.5 236.7zM188.8 107.4l-13.6 19.8 13.6-19.8zm13.6-19.8C194.4 82.1 192 76.2 192 72H144c0 23.8 13.7 43.2 31.2 55.2l27.2-39.6zM56 144H185.3V96H56v48zm-8 86.1V152H0v78.1H48zm10.1 24c4.3-4.2 9.2-6.1 13.9-6.1V200c-18.5 0-34.9 7.7-47.1 19.4l33.3 34.6zM72 248c9.9 0 24 10.7 24 32h48c0-40.6-28.9-80-72-80v48zm24 32c0 21.3-14.1 32-24 32v48c43.1 0 72-39.4 72-80H96zM72 312c-4.7 0-9.5-1.9-13.9-6.1L24.9 340.6C37.1 352.3 53.5 360 72 360V312zM48 456V329.9H0V456H48zm134.1 8H56v48H182.1V464zM152 440c0 18.5 7.7 34.9 19.4 47.1l34.6-33.3c-4.2-4.3-6.1-9.2-6.1-13.9H152zm80-72c-40.6 0-80 28.9-80 72h48c0-9.9 10.7-24 32-24V368zm80 72c0-43.1-39.4-72-80-72v48c21.3 0 32 14.1 32 24h48zm-19.4 47.1C304.3 474.9 312 458.5 312 440H264c0 4.7-1.9 9.5-6.1 13.9l34.6 33.3zM360 464H281.9v48H360V464zm8-137.3V456h48V326.7H368zm72-6.7c-4.2 0-10.1-2.4-15.6-10.4l-39.6 27.2c12 17.6 31.4 31.2 55.2 31.2V320zm24-40c0 13-4 23.8-9.3 30.9s-10.7 9.1-14.7 9.1v48c22.5 0 41-12.2 53.1-28.3S512 302.4 512 280H464zm-24-40c4 0 9.5 2.1 14.7 9.1s9.3 17.9 9.3 30.9h48c0-22.4-6.8-43.5-18.9-59.7S462.5 192 440 192v48zm-15.6 10.4c5.5-8 11.4-10.4 15.6-10.4V192c-23.8 0-43.2 13.7-55.2 31.2l39.6 27.2zM368 152v81.3h48V152H368zm-89.3-8H360V96H278.7v48zM272 72c0 4.2-2.4 10.1-10.4 15.6l27.2 39.6C306.3 115.2 320 95.8 320 72H272zM232 48c13 0 23.8 4 30.9 9.3s9.1 10.7 9.1 14.7h48c0-22.5-12.2-41-28.3-53.1S254.4 0 232 0V48zM192 72c0-4 2.1-9.5 9.1-14.7S219 48 232 48V0c-22.4 0-43.5 6.8-59.7 18.9S144 49.5 144 72h48zm104 41.3c0 6.3-3.3 11.2-7.2 13.9L261.6 87.6C253.8 93 248 102.2 248 113.3h48zM398.7 344c-6.3 0-11.2-3.3-13.9-7.2l39.6-27.2c-5.3-7.8-14.6-13.6-25.6-13.6v48zM416 326.7c0 9.5-7.7 17.3-17.3 17.3V296c-17 0-30.7 13.8-30.7 30.7h48zM360 512c30.9 0 56-25.1 56-56H368c0 4.4-3.6 8-8 8v48zM248 478.1c0 18.7 15.2 33.9 33.9 33.9V464c7.8 0 14.1 6.3 14.1 14.1H248zm9.9-24.2c-5.5 5.7-9.9 14.1-9.9 24.2h48c0 4.4-1.9 7.4-3.4 9l-34.6-33.3zM182.1 512c18.7 0 33.9-15.2 33.9-33.9H168c0-7.8 6.3-14.1 14.1-14.1v48zM33.9 296C15.2 296 0 311.2 0 329.9H48c0 7.8-6.3 14.1-14.1 14.1V296zm24.2 9.9C52.4 300.5 44 296 33.9 296v48c-4.4 0-7.4-1.9-9-3.4l33.3-34.6zM416 152c0-30.9-25.1-56-56-56v48c4.4 0 8 3.6 8 8h48zM0 230.1C0 248.8 15.2 264 33.9 264V216c7.8 0 14.1 6.3 14.1 14.1H0zM398.7 216c9.5 0 17.3 7.7 17.3 17.3H368c0 17 13.8 30.7 30.7 30.7V216zM56 96C25.1 96 0 121.1 0 152H48c0-4.4 3.6-8 8-8V96zM216 478.1c0-10.1-4.5-18.5-9.9-24.2l-34.6 33.3c-1.5-1.6-3.4-4.6-3.4-9h48zM384.8 223.2c2.7-3.9 7.6-7.2 13.9-7.2v48c11.1 0 20.3-5.8 25.6-13.6l-39.6-27.2zM168 113.3c0-9.5 7.7-17.3 17.3-17.3v48c17 0 30.7-13.8 30.7-30.7H168zM278.7 96c9.5 0 17.3 7.7 17.3 17.3H248c0 17 13.8 30.7 30.7 30.7V96zM33.9 264c10.1 0 18.5-4.5 24.2-9.9L24.9 219.4c1.6-1.5 4.6-3.4 9-3.4v48zM0 456c0 30.9 25.1 56 56 56V464c-4.4 0-8-3.6-8-8H0zM175.2 127.2c-3.9-2.7-7.2-7.6-7.2-13.9h48c0-11.1-5.8-20.3-13.6-25.6l-27.2 39.6z"],
    "question": [320,512,["61736","10068","10067"],"3f","M64 160c0-44.2 35.8-80 80-80h32c44.2 0 80 35.8 80 80v4.6c0 24.1-12 46.6-32.1 59.9l-52.3 34.9C149.4 274.2 136 299.2 136 326v2c0 13.3 10.7 24 24 24s24-10.7 24-24v-2c0-10.7 5.3-20.7 14.2-26.6l52.3-34.9c33.4-22.3 53.4-59.7 53.4-99.8V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 13.3 10.7 24 24 24s24-10.7 24-24zm96 320a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"],
    "quote-right": [448,512,["8221","quote-right-alt"],"f10e","M448 296c0 66.3-53.7 120-120 120H312c-13.3 0-24-10.7-24-24s10.7-24 24-24h16c39.8 0 72-32.2 72-72V286c-5.1 1.3-10.5 2-16 2H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-48-72V192 160c0-8.8-7.2-16-16-16H320c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16zM64 240h64c8.8 0 16-7.2 16-16V192 160c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16zm128-48v32 72c0 66.3-53.7 120-120 120H56c-13.3 0-24-10.7-24-24s10.7-24 24-24H72c39.8 0 72-32.2 72-72V286c-5.1 1.3-10.5 2-16 2H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32z"],
    "receipt": [384,512,["129534"],"f543","M39.6 5.8C32.5-.3 22.5-1.7 14 2.2S0 14.6 0 24V488c0 9.4 5.5 17.9 14 21.8s18.5 2.5 25.6-3.6L80 471.6l40.4 34.6c9 7.7 22.3 7.7 31.2 0L192 471.6l40.4 34.6c9 7.7 22.3 7.7 31.2 0L304 471.6l40.4 34.6c7.1 6.1 17.1 7.5 25.6 3.6s14-12.4 14-21.8V24c0-9.4-5.5-17.9-14-21.8s-18.5-2.5-25.6 3.6L304 40.4 263.6 5.8c-9-7.7-22.3-7.7-31.2 0L192 40.4 151.6 5.8c-9-7.7-22.3-7.7-31.2 0L80 40.4 39.6 5.8zm8.4 430V76.2l16.4 14c9 7.7 22.3 7.7 31.2 0L136 55.6l40.4 34.6c9 7.7 22.3 7.7 31.2 0L248 55.6l40.4 34.6c9 7.7 22.3 7.7 31.2 0l16.4-14V435.8l-16.4-14c-9-7.7-22.3-7.7-31.2 0L248 456.4l-40.4-34.6c-9-7.7-22.3-7.7-31.2 0L136 456.4 95.6 421.8c-9-7.7-22.3-7.7-31.2 0L48 435.8zM120 144c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 176c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zM96 256c0 13.3 10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120c-13.3 0-24 10.7-24 24z"],
    "record-vinyl": [512,512,[],"f8d9","M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm160 0a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm120 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"],
    "rectangle-history": [512,512,[],"e4a2","M464 224c0-8.8-7.2-16-16-16L64 208c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-224zm-16-64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l384 0zm-8-80c13.3 0 24 10.7 24 24s-10.7 24-24 24L72 128c-13.3 0-24-10.7-24-24s10.7-24 24-24l368 0zM392 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L120 48c-13.3 0-24-10.7-24-24s10.7-24 24-24L392 0z"],
    "rectangle-vertical-history": [576,512,[],"e237","M256 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H256zM192 64c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H256c-35.3 0-64-28.7-64-64V64zM96 72c0-13.3 10.7-24 24-24s24 10.7 24 24V440c0 13.3-10.7 24-24 24s-24-10.7-24-24V72zM0 120c0-13.3 10.7-24 24-24s24 10.7 24 24V392c0 13.3-10.7 24-24 24s-24-10.7-24-24V120z"],
    "reply": [512,512,["61714","mail-reply"],"f3e5","M224 240h96c66.2 0 122 44.7 138.8 105.5c3.3-12.4 5.2-26.2 5.2-41.5c0-70.7-57.3-128-128-128H224 200c-13.3 0-24-10.7-24-24V128 99.9L55.9 208 176 316.1V288 264c0-13.3 10.7-24 24-24h24zm0 48v48 16c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4s19 16.6 19 29.2V80v48h48 64c97.2 0 176 78.8 176 176c0 78-38.6 126.2-68.7 152.1c-4.1 3.5-8.1 6.6-11.7 9.3c-3.2 2.4-6.2 4.4-8.9 6.2c-4.5 3-8.3 5.1-10.8 6.5c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-6.8 3.6-13.2 8.3-18.1c.5-.5 .9-.9 1.4-1.4c2.4-2.3 5.1-5.1 7.7-8.6c1.7-2.3 3.4-5 5-7.9c5.3-9.7 9.5-22.9 9.5-40.2c0-53-43-96-96-96H272 224z"],
    "scale-balanced": [640,512,["9878","balance-scale"],"f24e","M520 48H393.3C381 19.7 352.8 0 320 0s-61 19.7-73.3 48H120c-13.3 0-24 10.7-24 24s10.7 24 24 24H241.6c5.8 28.6 26.9 51.7 54.4 60.3V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24H320 520c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V156.3c27.5-8.6 48.6-31.7 54.4-60.3H520c13.3 0 24-10.7 24-24s-10.7-24-24-24zm-8 147.8L584.4 320H439.6L512 195.8zM386 337.1C396.8 382 449.1 416 512 416s115.2-34 126-78.9c2.6-11-1-22.3-6.7-32.1L536.1 141.8c-5-8.6-14.2-13.8-24.1-13.8s-19.1 5.3-24.1 13.8L392.7 305.1c-5.7 9.8-9.3 21.1-6.7 32.1zM54.4 320l72.4-124.2L199.3 320H54.4zm72.4 96c62.9 0 115.2-34 126-78.9c2.6-11-1-22.3-6.7-32.1L150.9 141.8c-5-8.6-14.2-13.8-24.1-13.8s-19.1 5.3-24.1 13.8L7.6 305.1c-5.7 9.8-9.3 21.1-6.7 32.1C11.7 382 64 416 126.8 416zM320 48a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],
    "scissors": [512,512,["9988","9986","9984","cut"],"f0c4","M506.4 439.4c-8.5 10.2-23.7 11.5-33.8 3L312.4 308.2l37.4-31.3L503.4 405.6c10.2 8.5 11.5 23.7 3 33.8zM112 48a64 64 0 1 0 0 128 64 64 0 1 0 0-128zm0-48c61.9 0 112 50.1 112 112c0 17.9-4.2 34.8-11.6 49.8l75.1 62.9L472.6 69.6c10.2-8.5 25.3-7.2 33.8 3s7.2 25.3-3 33.8l-291 243.8c7.4 15 11.6 31.9 11.6 49.8c0 61.9-50.1 112-112 112S0 461.9 0 400s50.1-112 112-112c26.6 0 51.1 9.3 70.3 24.8L250.1 256l-67.8-56.8C163.1 214.7 138.6 224 112 224C50.1 224 0 173.9 0 112S50.1 0 112 0zm64 400A64 64 0 1 0 48 400a64 64 0 1 0 128 0z"],
    "scroll-old": [576,512,[],"f70f","M80 80c-17.7 0-32 14.3-32 32v48H80v48H48c-26.5 0-48-21.5-48-48V112C0 67.8 35.8 32 80 32H400c44.2 0 80 35.8 80 80V272H448 432 400c-8.8 0-16-7.2-16-16s7.2-16 16-16h32V160H400c-8.8 0-16-7.2-16-16s7.2-16 16-16h32V112c0-17.7-14.3-32-32-32H153.3c4.3 9.8 6.7 20.6 6.7 32V224h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H160V400c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-26.5 21.5-48 48-48h.6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .6 .5 .6 .5 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6 .6c26.5 0 48 21.5 48 48v48c0 44.2-35.8 80-80 80H192c-44.2 0-80-35.8-80-80V112c0-17.7-14.3-32-32-32zM265.3 432H496c17.7 0 32-14.3 32-32V352h0-.6-.6-.6-.6-.6-.6H524h-.6-.6-.6-.6-.6-.6-.6-.6H519h-.6-.6-.6-.6-.5-.6-.5-.6-.5-.5H513h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H507h-.5H506h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H499h-.5H498h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H487h-.5H486h-.5H485h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H456h-.5H455h-.5H454h-.5H453h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H441h-.5H440h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H431h-.5H430h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H423h-.5H422h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H415h-.5H414h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H407h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H400v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V352h-.4-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H360h-.5H359h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H347h-.5H346h-.5H345h-.5H344h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H315h-.5H314h-.5H313h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H302h-.5H301h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H294h-.5H293h-.5-.5-.5-.5-.5-.5-.5-.5-.5-.5H287h-.5-.5-.5-.5-.5-.5-.5-.6-.6-.6H281h-.6-.6-.6-.6-.6-.6-.6-.6H276h-.6-.6-.6-.6-.6-.6H272h0v48c0 11.4-2.4 22.2-6.7 32z"],
    "share": [512,512,["arrow-turn-right","mail-forward"],"f064","M288 240H192c-66.2 0-122 44.7-138.8 105.5C49.9 333.1 48 319.3 48 304c0-70.7 57.3-128 128-128H288h24c13.3 0 24-10.7 24-24V128 99.9L456.1 208 336 316.1V288 264c0-13.3-10.7-24-24-24H288zm0 48v48 16c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4s-19 16.6-19 29.2V80v48H240 176C78.8 128 0 206.8 0 304c0 78 38.6 126.2 68.7 152.1c4.1 3.5 8.1 6.6 11.7 9.3c3.2 2.4 6.2 4.4 8.9 6.2c4.5 3 8.3 5.1 10.8 6.5c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-6.8-3.6-13.2-8.3-18.1c-.5-.5-.9-.9-1.4-1.4c-2.4-2.3-5.1-5.1-7.7-8.6c-1.7-2.3-3.4-5-5-7.9c-5.3-9.7-9.5-22.9-9.5-40.2c0-53 43-96 96-96h48 48z"],
    "shield": [512,512,["128737","shield-blank"],"f132","M256 49.4L73 127c-5.9 2.5-9.1 7.8-9 12.8c.5 91.4 38.4 249.3 186.4 320.1c3.6 1.7 7.8 1.7 11.3 0C409.7 389 447.6 231.2 448 139.7c0-5-3.1-10.2-9-12.8L256 49.4zM269.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0s9.2 1 13.4 2.9z"],
    "shirt": [640,512,["128085","t-shirt","tshirt"],"f553","M233.7 33.1l-23.5 4.6 0 0 23.5-4.6zm172.7 0l-23.5-4.6v0l23.5 4.6zm71.9 13.2l15.4-18.4 0 0L478.3 46.3zM604.5 151.4L619.8 133v0l-15.4 18.4zm3.6 45.7L590 181.3v0l18.1 15.8zm-56 64l18.1 15.8-18.1-15.8zm-44.6 3.5L492.2 283v0l15.4-18.4zM456 221.7l15.4-18.4c-7.2-6-17.1-7.2-25.5-3.3s-13.8 12.4-13.8 21.7h24zm-272 0h24c0-9.3-5.4-17.8-13.8-21.7s-18.4-2.7-25.5 3.3L184 221.7zm-51.5 42.9L147.9 283h0l-15.4-18.4zm-44.6-3.5L69.9 276.9l18.1-15.8zm-56-64L50 181.3l0 0L31.9 197.1zm-7.8-23.6L.2 171.6l23.9 1.9zm11.4-22.1L20.1 133l0 0 15.4 18.4zM161.7 46.3l15.4 18.4L161.7 46.3zm95.5-17.8C254.3 13.6 241.3 0 223.2 0V48c-7.8 0-12.2-5.7-13.1-10.3l47.1-9.3zM320 80c-31.1 0-57-22.2-62.8-51.5l-47.1 9.3C220.2 89.2 265.6 128 320 128V80zm62.8-51.5C377 57.8 351.1 80 320 80v48c54.4 0 99.8-38.8 109.9-90.3l-47.1-9.3zM416.8 0c-18.2 0-31.1 13.6-34 28.5l47.1 9.3C429 42.3 424.6 48 416.8 48V0zm76.8 27.8C472.1 9.8 444.9 0 416.8 0V48c16.8 0 33.2 5.9 46.1 16.7l30.7-36.9zM619.8 133L493.7 27.8 462.9 64.7 589.1 169.9 619.8 133zm20 38.6c-1.2-15-8.4-29-20-38.6l-30.7 36.9c1.7 1.4 2.7 3.4 2.9 5.5l47.9-3.8zm-13.7 41.3c9.9-11.4 14.9-26.2 13.7-41.3L592 175.4c.2 2.1-.5 4.3-2 5.9l36.1 31.6zm-56 64l56-64L590 181.3l-56 64 36.1 31.6zm-78 6.1c23.4 19.5 58 16.7 78-6.1L534 245.3c-2.9 3.3-7.8 3.7-11.1 .9L492.2 283zm-51.5-42.9L492.2 283l30.7-36.9-51.5-42.9-30.7 36.9zM432 221.7V448h48V221.7H432zM432 448c0 8.8-7.2 16-16 16v48c35.3 0 64-28.7 64-64H432zm-16 16H224v48H416V464zm-192 0c-8.8 0-16-7.2-16-16H160c0 35.3 28.7 64 64 64V464zm-16-16V221.7H160V448h48zM147.9 283l51.5-42.9-30.7-36.9-51.5 42.9L147.9 283zm-78-6.1c20 22.9 54.6 25.6 78 6.1l-30.7-36.9c-3.3 2.8-8.3 2.4-11.1-.9L69.9 276.9zm-56-64l56 64L106 245.3l-56-64L13.9 212.9zM.2 171.6c-1.2 15 3.7 29.9 13.7 41.3L50 181.3c-1.4-1.6-2.1-3.7-2-5.9L.2 171.6zm20-38.6c-11.6 9.7-18.8 23.6-20 38.6L48 175.4c.2-2.1 1.2-4.1 2.9-5.5L20.1 133zM146.3 27.8L20.1 133l30.7 36.9L177.1 64.7 146.3 27.8zM223.2 0c-28.1 0-55.3 9.8-76.8 27.8l30.7 36.9C190 53.9 206.3 48 223.2 48V0z"],
    "signs-post": [512,512,["map-signs"],"f277","M232 24c0-13.3 10.7-24 24-24s24 10.7 24 24v8H440.3c4.9 0 9.5 2.2 12.5 6L504 102c4.7 5.8 4.7 14.1 0 20l-51.2 64c-3 3.8-7.6 6-12.5 6H280v32H448c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H280V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V384H71.7c-4.9 0-9.5-2.2-12.5-6L8 314c-4.7-5.8-4.7-14.1 0-20l51.2-64c3-3.8 7.6-6 12.5-6H232V192H64c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32H232V24zM80 80v64H424.9l25.6-32L424.9 80H80zM432 336V272H87.1L61.5 304l25.6 32H432z"],
    "spa": [576,512,[],"f5bb","M288 92.1c21.2 24.9 52.1 69.7 68.6 134.5c13.3-10.3 27.4-19.5 42.2-27.6c-27.3-91.6-79.3-145.6-96.8-161.8c-3.8-3.5-8.8-5.2-13.9-5.2s-10.1 1.7-13.9 5.2c-17.5 16.2-69.5 70.1-96.8 161.8c14.8 8.1 28.9 17.3 42.2 27.6c16.5-64.8 47.3-109.7 68.6-134.5zm-96 377c22.9 6.7 47 10.5 72 10.9h48c25-.4 49.1-4.1 72-10.9c111-32.7 192-135.4 192-257c0-11.1-9-20.1-20.1-20.1c-61.7 0-121.7 17.9-171.9 54.1c-41.8 30-75.1 71-96 118.7c-20.9-47.7-54.2-88.6-96-118.7C141.8 209.9 81.8 192 20.1 192C9 192 0 201 0 212.1c0 121.6 81 224.3 192 257zm0-50.5C116.8 390.9 60.8 323.2 49.9 241.4c55.1 5.9 104.6 30.5 142.1 67.2c33.5 32.9 57.4 75.5 67.2 123.2c-23.5-.9-46.1-5.5-67.2-13.3zm192 0c-21.1 7.7-43.6 12.4-67.2 13.3c9.7-47.8 33.7-90.4 67.2-123.2c37.5-36.8 87-61.3 142.1-67.2C515.2 323.2 459.2 390.9 384 418.5z"],
    "sparkles": [512,512,["10024"],"f890","M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM9.3 240C3.6 242.6 0 248.3 0 254.6s3.6 11.9 9.3 14.5L26.3 277l8.1 3.7 .6 .3 88.3 40.8L164.1 410l.3 .6 3.7 8.1 7.9 17.1c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l7.9-17.1 3.7-8.1 .3-.6 40.8-88.3L346 281l.6-.3 8.1-3.7 17.1-7.9c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5l-17.1-7.9-8.1-3.7-.6-.3-88.3-40.8L217 99.1l-.3-.6L213 90.3l-7.9-17.1c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3l-7.9 17.1-3.7 8.1-.3 .6-40.8 88.3L35.1 228.1l-.6 .3-8.1 3.7L9.3 240zm83 14.5l51.2-23.6c10.4-4.8 18.7-13.1 23.5-23.5l23.6-51.2 23.6 51.2c4.8 10.4 13.1 18.7 23.5 23.5l51.2 23.6-51.2 23.6c-10.4 4.8-18.7 13.1-23.5 23.5l-23.6 51.2-23.6-51.2c-4.8-10.4-13.1-18.7-23.5-23.5L92.3 254.6zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z"],
    "spray-can-sparkles": [512,512,["air-freshener"],"f5d0","M128 0h64c17.7 0 32 14.3 32 32v96H96V32c0-17.7 14.3-32 32-32zM96 208c-26.5 0-48 21.5-48 48V448c0 8.8 7.2 16 16 16H256c8.8 0 16-7.2 16-16V256c0-26.5-21.5-48-48-48H96zM0 256c0-53 43-96 96-96H224c53 0 96 43 96 96V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256zM381.8 51.6L352 64 339.6 93.8C339 95 337.4 96 336 96s-3-1-3.6-2.2L320 64 290.2 51.6C289 51 288 49.4 288 48c0-1.4 1-3 2.2-3.6L320 32 332.4 2.2C333 1 334.6 0 336 0s3 1 3.6 2.2L352 32l29.8 12.4C383 45 384 46.6 384 48c0 1.4-1 3-2.2 3.6zM448 64L418.2 51.6C417 51 416 49.4 416 48c0-1.4 1-3 2.2-3.6L448 32 460.4 2.2C461 1 462.6 0 464 0s3 1 3.6 2.2L480 32l29.8 12.4C511 45 512 46.6 512 48c0 1.4-1 3-2.2 3.6L480 64 467.6 93.8C467 95 465.4 96 464 96s-3-1-3.6-2.2L448 64zm32 160l29.8 12.4c1.2 .6 2.2 2.2 2.2 3.6c0 1.4-1 3-2.2 3.6L480 256l-12.4 29.8c-.6 1.2-2.2 2.2-3.6 2.2s-3-1-3.6-2.2L448 256l-29.8-12.4c-1.2-.6-2.2-2.2-2.2-3.6c0-1.4 1-3 2.2-3.6L448 224l12.4-29.8c.6-1.2 2.2-2.2 3.6-2.2s3 1 3.6 2.2L480 224zm-34.2-76.4L416 160l-12.4 29.8c-.6 1.2-2.2 2.2-3.6 2.2s-3-1-3.6-2.2L384 160l-29.8-12.4c-1.2-.6-2.2-2.2-2.2-3.6c0-1.4 1-3 2.2-3.6L384 128l12.4-29.8C397 97 398.6 96 400 96s3 1 3.6 2.2L416 128l29.8 12.4c1.2 .6 2.2 2.2 2.2 3.6c0 1.4-1 3-2.2 3.6zM160 272a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"],
    "square-root": [576,512,["8730"],"f697","M344.3 80c-3.6 0-6.7 2.4-7.7 5.8L231.1 462.5c-2.6 9.4-10.7 16.3-20.5 17.4s-19.1-3.9-23.8-12.5L83.9 276.2c-1.4-2.6-4.1-4.2-7-4.2H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H76.9c20.6 0 39.5 11.3 49.3 29.5l74.7 138.8L290.3 72.9C297.1 48.7 319.2 32 344.3 32H552c13.3 0 24 10.7 24 24s-10.7 24-24 24H344.3z"],
    "star-exclamation": [576,512,[],"f2f3","M309.5 13.5C305.5 5.2 297.1 0 287.9 0s-17.6 5.2-21.6 13.5L197.7 154.8 44.5 177.5c-9 1.3-16.5 7.6-19.3 16.3s-.5 18.1 5.9 24.5L142.2 328.4 116 483.9c-1.5 9 2.2 18.1 9.7 23.5s17.3 6 25.3 1.7l137-73.2 137 73.2c8.1 4.3 17.9 3.7 25.3-1.7s11.2-14.5 9.7-23.5L433.6 328.4 544.8 218.2c6.5-6.4 8.7-15.9 5.9-24.5s-10.3-14.9-19.3-16.3L378.1 154.8 309.5 13.5zM235.4 187.2L287.9 79l52.6 108.2c3.5 7.1 10.2 12.1 18.1 13.3l118.3 17.5L391 303c-5.5 5.5-8.1 13.3-6.8 21l20.2 119.6L299.2 387.5c-7.1-3.8-15.6-3.8-22.6 0L171.4 443.7l20.2-119.6c1.3-7.7-1.2-15.5-6.8-21L99 217.9l118.3-17.5c7.8-1.2 14.6-6.1 18.1-13.3zM288 168c-13.3 0-24 10.7-24 24v64c0 13.3 10.7 24 24 24s24-10.7 24-24V192c0-13.3-10.7-24-24-24zm32 168a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"],
    "stars": [512,512,[],"f762","M325.8 152.3c1.3 4.6 5.5 7.7 10.2 7.7s8.9-3.1 10.2-7.7L360 104l48.3-13.8c4.6-1.3 7.7-5.5 7.7-10.2s-3.1-8.9-7.7-10.2L360 56 346.2 7.7C344.9 3.1 340.7 0 336 0s-8.9 3.1-10.2 7.7L312 56 263.7 69.8c-4.6 1.3-7.7 5.5-7.7 10.2s3.1 8.9 7.7 10.2L312 104l13.8 48.3zM115.7 346.2L75.5 307l55.5-8.1c15.6-2.3 29.2-12.1 36.1-26.3l24.8-50.3 24.8 50.3c7 14.2 20.5 24 36.1 26.3l55.5 8.1-40.2 39.2c-11.3 11-16.4 26.9-13.8 42.4l9.5 55.4-49.5-26.1c-14-7.4-30.7-7.4-44.7 0L120 444l9.5-55.4c2.7-15.6-2.5-31.4-13.8-42.4zm54.7-188.8l-46.3 94L20.5 266.5C.9 269.3-7 293.5 7.2 307.4l74.9 73.2L64.5 483.9c-3.4 19.6 17.2 34.6 34.8 25.3l92.6-48.8 92.6 48.8c17.6 9.3 38.2-5.7 34.8-25.3L301.6 380.6l74.9-73.2c14.2-13.9 6.4-38.1-13.3-40.9L259.7 251.4l-46.3-94c-8.8-17.9-34.3-17.9-43.1 0zm258.4 85.8l11 38.6c1 3.6 4.4 6.2 8.2 6.2s7.1-2.5 8.2-6.2l11-38.6 38.6-11c3.6-1 6.2-4.4 6.2-8.2s-2.5-7.1-6.2-8.2l-38.6-11-11-38.6c-1-3.6-4.4-6.2-8.2-6.2s-7.1 2.5-8.2 6.2l-11 38.6-38.6 11c-3.6 1-6.2 4.4-6.2 8.2s2.5 7.1 6.2 8.2l38.6 11z"],
    "store": [576,512,[],"f54e","M507.1 129.5l0 0c5.8 9.2 6.4 20.5 2.3 30.1c-3.9 9.2-11.1 14.8-20.1 16c-2 .3-3.9 .4-5.8 .4c-11.7 0-22.2-5.1-29.7-13.2c-9.1-10-22-15.7-35.6-15.7s-26.5 5.8-35.5 15.8c-7.3 8.1-17.7 13.2-29.6 13.2c-11.8 0-22.3-5.1-29.6-13.2c-9.1-10.1-22-15.8-35.6-15.8s-26.5 5.7-35.6 15.8c-7.3 8.1-17.7 13.2-29.6 13.2c-11.8 0-22.3-5.1-29.6-13.2c-9.1-10.1-22-15.8-35.6-15.8s-26.5 5.7-35.6 15.8c-7.3 8.1-17.7 13.2-29.6 13.2c-1.8 0-3.8-.1-5.8-.4c-8.9-1.2-16-6.8-19.9-16c-4.1-9.6-3.5-20.9 2.3-30.1l0 0 0 0L120.4 48H455.6l51.5 81.5zM483.5 224c4.1 0 8.1-.3 12-.8c55.5-7.4 81.8-72.5 52.1-119.4L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c0 0 0 0 0 0c19.6 0 37.5-6.4 51.9-17c4.8-3.5 9.2-7.6 13.2-11.9c4 4.4 8.4 8.4 13.2 11.9c14.5 10.6 32.4 17 52 17c19.6 0 37.5-6.4 52-17c4.8-3.5 9.2-7.6 13.2-12c4 4.4 8.4 8.4 13.2 11.9c14.5 10.6 32.4 17 52 17c19.8 0 37.8-6.5 52.3-17.3c4.7-3.5 9-7.4 12.9-11.7c3.9 4.3 8.3 8.3 13 11.8c14.5 10.7 32.5 17.2 52.2 17.2c0 0 0 0 0 0zM112 336V254.4c-6.4 1.1-12.9 1.6-19.6 1.6c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V336v48 64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 336 252.6c-4 1-8 1.8-12.3 2.3l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-6.6 0-13.1-.5-19.4-1.6V336H112zm352 48v64c0 8.8-7.2 16-16 16H128c-8.8 0-16-7.2-16-16V384H464z"],
    "sunglasses": [576,512,["128374"],"f892","M118.6 80c-11.5 0-21.4 7.9-24 19.1L57.1 259.8c25.6-7.8 52.6-11.8 78.6-11.8c40.1 0 82.2 9.6 118.5 27.3c5.8 2.9 10.4 7.3 13.5 12.7h40.6c3.1-5.4 7.7-9.8 13.5-12.7c36.2-17.8 78.4-27.3 118.5-27.3c26 0 53 4.1 78.6 11.8L481.4 99.1c-2.6-11.2-12.6-19.1-24-19.1c-3.1 0-6.2 .6-9.2 1.8L416.9 94.3c-12.3 4.9-26.3-1.1-31.2-13.4s1.1-26.3 13.4-31.2l31.3-12.5c8.6-3.4 17.7-5.2 27-5.2c33.8 0 63.1 23.3 70.8 56.2l43.9 188c1.7 7.3 2.9 14.7 3.5 22.2c.3 1.8 .5 3.7 .5 5.6v5.2l0 1.5V352l0 .6V368c0 61.9-50.1 112-112 112H419.7c-59.4 0-108.5-46.4-111.8-105.8L306.6 352H269.4l-1.2 22.2C264.9 433.6 215.8 480 156.3 480H112C50.1 480 0 429.9 0 368V352 310.7 304c0-1.9 .2-3.8 .5-5.7c.6-7.4 1.8-14.8 3.5-22.1l43.9-188C55.5 55.3 84.8 32 118.6 32c9.2 0 18.4 1.8 27 5.2l31.3 12.5c12.3 4.9 18.3 18.9 13.4 31.2s-18.9 18.3-31.2 13.4L127.8 81.8c-2.9-1.2-6-1.8-9.2-1.8zM48 352v16c0 2.6 .2 5.2 .5 7.8l144.4-72.2c-18.8-5-38.3-7.6-57.2-7.6c-29.5 0-60.5 6.4-87.7 18.2V352zm392.3-56c-29.4 0-60.4 6.3-87.7 18l3.2 57.5c0 .8 .1 1.7 .2 2.5l141-70.5c-18.6-4.9-38-7.5-56.7-7.5z"],
    "swords": [512,512,["9876"],"f71d","M54.8 89.6L51.3 51.3l38.2 3.5L367.4 332.7l33.9-33.9L123.5 20.9C115.6 12.9 105.1 8 93.9 7L17.4 .1C12.7-.4 8 1.3 4.7 4.7S-.4 12.7 .1 17.4L7 93.9c1 11.2 5.9 21.7 13.9 29.6L298.7 401.4l33.9-33.9L54.8 89.6zM459.3 308.7c-6.2-6.2-16.4-6.2-22.6 0l-128 128c-6.2 6.2-6.2 16.4 0 22.6l16 16c4.7 4.7 11.8 6 17.8 3.3l62-27.5 56.2 56.2c6.2 6.2 16.4 6.2 22.6 0l24-24c6.2-6.2 6.2-16.4 0-22.6l-56.2-56.2 27.5-62c2.7-6.1 1.4-13.1-3.3-17.8l-16-16zm-112-109.3l33.9 33.9L491.1 123.5c7.9-7.9 12.8-18.4 13.9-29.6l7-76.5c.4-4.7-1.3-9.4-4.6-12.8s-8-5.1-12.8-4.6L418.1 7c-11.2 1-21.7 5.9-29.6 13.9L278.6 130.7l33.9 33.9L422.4 54.8l38.2-3.5-3.5 38.2L347.3 199.4zM233.4 381.3l-33.9-33.9-42.7 42.7-34.7-34.7 42.7-42.7-33.9-33.9L88 321.4 75.3 308.7c-6.2-6.2-16.4-6.2-22.6 0l-16 16c-4.7 4.7-6 11.8-3.3 17.8l27.5 62L4.7 460.7c-6.2 6.2-6.2 16.4 0 22.6l24 24c6.2 6.2 16.4 6.2 22.6 0l56.2-56.2 62 27.5c6 2.7 13.1 1.4 17.8-3.3l16-16c6.2-6.2 6.2-16.4 0-22.6L190.6 424l42.7-42.7z"],
    "tablet-screen": [448,512,["tablet-android-alt"],"f3fc","M48 448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V368H48v80zm0-128H400V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V320zM0 64C0 28.7 28.7 0 64 0H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM192 400h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H192c-8.8 0-16-7.2-16-16s7.2-16 16-16z"],
    "thumbs-down": [512,512,["61576","128078"],"f165","M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z"],
    "thumbs-up": [512,512,["61575","128077"],"f164","M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"],
    "tractor": [640,512,["128668"],"f722","M152 48H266.3c3.3 0 6.2 2 7.4 5l42.8 107H192 160 144V56c0-4.4 3.6-8 8-8zM96 56V192.6c-11.2-3.9-24.2-1.4-33.1 7.6L40.2 222.9c-12.5 12.5-12.5 32.8 0 45.3l5.8 5.8c-2.2 4.6-4.1 9.3-5.8 14.1H32c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h8.2c1.7 4.8 3.7 9.5 5.8 14.1l-5.8 5.8c-12.5 12.5-12.5 32.8 0 45.3l22.6 22.6c12.5 12.5 32.8 12.5 45.3 0l5.8-5.8c4.6 2.2 9.3 4.1 14.1 5.8V480c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32v-8.2c4.8-1.7 9.5-3.7 14.1-5.8l5.8 5.8c12.5 12.5 32.8 12.5 45.3 0l22.6-22.6c12.5-12.5 12.5-32.8 0-45.3l-5.8-5.8c2.2-4.6 4.1-9.3 5.8-14.1H320h94.8c6.5-18.5 17.5-34.9 31.6-48H352V320c0-17.7-14.3-32-32-32h-8.2c-1.7-4.8-3.7-9.5-5.8-14.1l5.8-5.8c12.5-12.5 12.5-32.8 0-45.3L296.9 208h54.6c.4 0 .7 0 1.1 0H504h80c4.4 0 8 3.6 8 8v32.7c0 7.4-3.4 14.3-9.2 18.9l-46.7 36.7c20.1 1.3 38.9 7.7 55.1 17.7l21.3-16.7c17.4-13.6 27.5-34.5 27.5-56.6V216c0-30.9-25.1-56-56-56H528V118.2c0-16.1 3.8-32.1 11-46.5l2.5-5c5.9-11.9 1.1-26.3-10.7-32.2s-26.3-1.1-32.2 10.7l-2.5 5c-10.6 21.1-16 44.4-16 68V160H368.2L318.3 35.2C309.8 13.9 289.2 0 266.3 0H152C121.1 0 96 25.1 96 56zm80 200a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM528 384a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm0 128a88 88 0 1 0 0-176 88 88 0 1 0 0 176z"],
    "trash-can-xmark": [448,512,[],"e2ae","M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm63 79c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"],
    "treasure-chest": [576,512,[],"f723","M160 80H416V240H352V224c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v16H160V80zM48 160c0-38.7 27.5-71 64-78.4V240H48l0-80zm0 272l0-144h64V432H48zM416 288V432H160V288h64v32c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V288h64zM528 432H464V288h64V432zm0-272v80H464V81.6c36.5 7.4 64 39.7 64 78.4zM128 32C57.3 32 0 89.3 0 160V432c0 26.5 21.5 48 48 48H528c26.5 0 48-21.5 48-48V160c0-70.7-57.3-128-128-128H128zM304 256v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V256c0-8.8 7.2-16 16-16s16 7.2 16 16z"],
    "tree-christmas": [448,512,["127876"],"f7db","M150.2 71l47.1-17.7L215 6.2c1.4-3.8 5-6.2 9-6.2s7.6 2.5 9 6.2l17.7 47.1L297.8 71c3.8 1.4 6.2 5 6.2 9s-2.5 7.6-6.2 9l-47.1 17.7L233 153.8c-1.4 3.8-5 6.2-9 6.2s-7.6-2.5-9-6.2l-17.7-47.1L150.2 89c-3.8-1.4-6.2-5-6.2-9s2.5-7.6 6.2-9zm125.3 60.5l15.8-5.9 122 193.1c4.7 7.4 4.9 16.7 .7 24.4s-12.3 12.4-21 12.4H367.7l76.5 119.5c4.7 7.4 5 16.8 .8 24.5s-12.3 12.5-21.1 12.5H24c-8.8 0-16.8-4.8-21.1-12.5s-3.9-17.1 .8-24.5L80.3 355.5H55c-8.7 0-16.8-4.8-21-12.4s-3.9-17 .7-24.4l122-193.1 15.8 5.9L185 165c.4 1.2 .9 2.3 1.4 3.4L98.6 307.5h25.6c8.8 0 16.8 4.8 21.1 12.5s3.9 17.1-.8 24.5L67.9 464H380.1L303.6 344.5c-4.7-7.4-5.1-16.8-.8-24.5s12.3-12.5 21.1-12.5h25.6L261.5 168.4c.5-1.1 1-2.2 1.4-3.4l12.6-33.5zM160 280a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM288 392a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"],
    "triangle-exclamation": [512,512,["9888","exclamation-triangle","warning"],"f071","M248.4 84.3c1.6-2.7 4.5-4.3 7.6-4.3s6 1.6 7.6 4.3L461.9 410c1.4 2.3 2.1 4.9 2.1 7.5c0 8-6.5 14.5-14.5 14.5H62.5c-8 0-14.5-6.5-14.5-14.5c0-2.7 .7-5.3 2.1-7.5L248.4 84.3zm-41-25L9.1 385c-6 9.8-9.1 21-9.1 32.5C0 452 28 480 62.5 480h387c34.5 0 62.5-28 62.5-62.5c0-11.5-3.2-22.7-9.1-32.5L304.6 59.3C294.3 42.4 275.9 32 256 32s-38.3 10.4-48.6 27.3zM288 368a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-8-184c0-13.3-10.7-24-24-24s-24 10.7-24 24v96c0 13.3 10.7 24 24 24s24-10.7 24-24V184z"],
    "truck-fast": [640,512,["shipping-fast"],"f48b","M352 48H128c-8.8 0-16 7.2-16 16V96H240c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16H64V64C64 28.7 92.7 0 128 0H352c35.3 0 64 28.7 64 64V96h42.7c14.9 0 29.1 5.9 39.6 16.4l93.3 93.3c10.5 10.5 16.4 24.7 16.4 39.6V368h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H576c0 53-43 96-96 96s-96-43-96-96h-8H352 320 256c0 53-43 96-96 96s-96-43-96-96V368 288h48v44.8c14.1-8.2 30.5-12.8 48-12.8c35.5 0 66.6 19.3 83.2 48H320h32c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16zM557.7 239.6l-93.3-93.3c-1.5-1.5-3.5-2.3-5.7-2.3H416v96H558l-.2-.2-.2-.2zM208 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm272 48a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM48 160H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H48c-8.8 0-16-7.2-16-16s7.2-16 16-16zM16 224H240c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16z"],
    "ufo": [640,512,["128760"],"e047","M176.6 246.3c-17.5 16.4-17.5 16.4-17.5 16.5l0 0 0 .1 .1 .1 .3 .3c.2 .2 .4 .4 .7 .7c.6 .5 1.3 1.2 2.2 2.1c1.8 1.6 4.3 3.7 7.6 6.2c6.6 4.8 16.1 10.9 29.1 16.8c26.1 11.9 65.3 23 120.8 23s94.7-11.1 120.8-23c13-5.9 22.6-12 29.1-16.8c3.3-2.4 5.8-4.5 7.6-6.2c.9-.8 1.6-1.5 2.2-2.1c.3-.3 .5-.5 .7-.7l.3-.3 .1-.1 0-.1 0 0c0 0 0 0-17.5-16.5l17.5 16.4c3.7-3.9 6-9 6.4-14.4c.5-5.8 .7-11.6 .6-17.2c30 8.9 54.6 19.9 72.5 31.8c24.1 16.2 31.5 30.9 31.5 41.6c0 7.9-3.8 17.7-15.8 29.1c-12 11.5-30.8 23-55.8 33.1C470.3 387 399.4 400 320 400s-150.3-13-200.3-33.2c-25.1-10.1-43.8-21.6-55.8-33.1C51.8 322.2 48 312.4 48 304.5c0-10.7 7.4-25.4 31.5-41.6c17.9-12 42.4-23 72.5-31.8c-.1 5.7 .1 11.4 .6 17.2c.5 5.4 2.7 10.5 6.4 14.4l17.5-16.4zm302.8-67.2C456.8 110.9 392.6 64 320 64s-136.8 46.9-159.4 115.1c-42.7 10.5-80 25.4-107.8 44C23.4 242.9 0 270.2 0 304.5c0 25.1 12.7 46.7 30.7 63.9c17.9 17.1 42.6 31.4 71 42.9C158.8 434.3 236 448 320 448s161.2-13.7 218.3-36.7c28.5-11.5 53.1-25.8 71-42.9c18-17.1 30.7-38.7 30.7-63.9c0-34.3-23.4-61.7-52.8-81.4c-27.8-18.6-65.1-33.5-107.8-44zM440 234.6c-4.1 2.9-10.4 6.8-19.1 10.8c-19.6 8.9-52 18.7-100.9 18.7s-81.3-9.7-100.9-18.7c-8.7-4-15-7.9-19.1-10.8C199.2 164.7 255 112 320 112s120.8 52.7 120 122.6zM152 312a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm192 40a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm168-16a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"],
    "user": [448,512,["62144","128100"],"f007","M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"],
    "user-group": [640,512,["128101","user-friends"],"f500","M1.5 458.7c6-45.5 29.2-85.6 62.8-113.6C95.3 319.4 135 304 178.3 304H224h45.7c43.3 0 83 15.4 113.9 41.1c33.6 28 56.8 68.1 62.8 113.6c1 7.7 1.5 15.6 1.5 23.6c0 16.4-13.3 29.7-29.7 29.7H398.7 49.3 29.7C13.3 512 0 498.7 0 482.3c0-8 .5-15.9 1.5-23.6zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zm208 0a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM178.3 352c-47.8 0-89.5 25.7-112.2 64c-8.6 14.4-14.4 30.7-16.8 48H98 350h48.8c-.4-2.7-.8-5.3-1.4-8c-2.9-14.3-8.2-27.8-15.5-40c-22.7-38.3-64.4-64-112.2-64H178.3zm431 160H472.4c4.9-8.8 7.6-18.9 7.6-29.7c0-65-29.5-123.2-75.9-161.8c4.3-.4 8.7-.5 13.2-.5h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"],
    "user-secret": [448,512,["128373"],"f21b","M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 13.4 22.1 25.6 57.7 34.3C88.6 169.4 88 176.6 88 184c0 13.9 2.1 27.4 6 40H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H168 280 418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H354c3.9-12.6 6-26.1 6-40c0-7.4-.6-14.6-1.7-21.7c35.6-8.7 57.7-20.9 57.7-34.3c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.8 3.3-8.8 6.1-15.5 6.1zm44 448l-24.8-99.1c-2.1-8.2-.8-16.9 3.6-24.2l15.7-26.2c25.7-7.6 48.3-22.6 65.2-42.5h23.8l-19.8 49.5c-8.1 20.2-1.6 43.3 15.9 56.3c27.3 20.4 46.2 51 51.2 86.2H268zM185.5 314.5l15.7 26.2c4.4 7.3 5.7 16 3.6 24.2L180 464H49.3c4.9-35.2 23.9-65.8 51.2-86.2c17.4-13 23.9-36.1 15.9-56.3L96.5 272h23.8c16.9 19.9 39.5 34.9 65.2 42.5zM224 272c-38.2 0-70.7-24.4-82.9-58.4c7.1 6.5 16.5 10.4 26.9 10.4h12.4c16.5 0 31.1-10.6 36.3-26.2c2.3-7 12.2-7 14.5 0c5.2 15.6 19.9 26.2 36.3 26.2H280c10.4 0 19.8-3.9 26.9-10.4c-12.2 34-44.7 58.4-82.9 58.4z"],
    "user-tie": [448,512,[],"f508","M224 208a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm128-80A128 128 0 1 1 96 128a128 128 0 1 1 256 0zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 15.9 59.2 43.8-87.6c3-6 9.4-9.5 15.9-8.4C390.4 335.6 448 401.7 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-79.6 57.6-145.7 133.5-158.9c6.6-1.1 12.9 2.4 15.9 8.4l43.8 87.6 15.9-59.2zm-90.6 17.1C82.3 391.1 55.4 424.2 49.3 464h113l-43.8-87.7zM285.7 464h113c-6.1-39.8-33-72.9-69.2-87.7L285.7 464z"],
    "users": [640,512,[],"f0c0","M144 160A80 80 0 1 0 144 0a80 80 0 1 0 0 160zm368 0A80 80 0 1 0 512 0a80 80 0 1 0 0 160zM0 298.7C0 310.4 9.6 320 21.3 320H234.7c.2 0 .4 0 .7 0c-26.6-23.5-43.3-57.8-43.3-96c0-7.6 .7-15 1.9-22.3c-13.6-6.3-28.7-9.7-44.6-9.7H106.7C47.8 192 0 239.8 0 298.7zM405.3 320H618.7c11.8 0 21.3-9.6 21.3-21.3C640 239.8 592.2 192 533.3 192H490.7c-15.9 0-31 3.5-44.6 9.7c1.3 7.2 1.9 14.7 1.9 22.3c0 38.2-16.8 72.5-43.3 96c.2 0 .4 0 .7 0zM320 176a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm0 144a96 96 0 1 0 0-192 96 96 0 1 0 0 192zm-58.7 80H378.7c39.8 0 73.2 27.2 82.6 64H178.7c9.5-36.8 42.9-64 82.6-64zm0-48C187.7 352 128 411.7 128 485.3c0 14.7 11.9 26.7 26.7 26.7H485.3c14.7 0 26.7-11.9 26.7-26.7C512 411.7 452.3 352 378.7 352H261.3z"],
    "utensils": [448,512,["61685","127860","cutlery"],"f2e7","M71.9 26.7c1.5-13.2-8-25-21.2-26.5s-25 8-26.5 21.2l-16 144L8 166.7V168v16c0 48.6 39.4 88 88 88h8V488c0 13.3 10.7 24 24 24s24-10.7 24-24V272h8c48.6 0 88-39.4 88-88V168v-1.3l-.1-1.3-16-144C230.4 8.2 218.5-1.3 205.3 .1s-22.7 13.3-21.2 26.5L200 169.3V184c0 22.1-17.9 40-40 40H128 96c-22.1 0-40-17.9-40-40V169.3L71.9 26.7zM152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V168c0 13.3 10.7 24 24 24s24-10.7 24-24V24zM336 176c0-57.7 21.7-88.6 41.4-105.7c7.7-6.6 15.5-11.6 22.6-15.2V248v56H352c-8.8 0-16-7.2-16-16V176zm64 176V488c0 13.3 10.7 24 24 24s24-10.7 24-24V352 304 248 32c0-17.7-14.3-32-32-32C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h48z"],
    "vial": [512,512,["129514"],"f492","M329 7c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l15 15L30.2 335.8C10.9 355.2 0 381.4 0 408.8C0 465.8 46.2 512 103.2 512c27.4 0 53.6-10.9 73-30.2L456 201.9l15 15c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-32-32L361 39 329 7zm-151 249L344 89.9 422.1 168l-88 88H177.9z"],
    "volleyball": [512,512,["127952","volleyball-ball"],"f45f","M371.5 429c-71.4 7-145.1-8.2-210-47.1c-8.8 14.8-16.2 30.3-22.3 46.3C172.5 450.8 212.7 464 256 464c42.7 0 82.5-12.9 115.5-35zm60.1-61.5c9.2-14.4 16.6-30.1 22.1-46.7c-65.9 7.3-134.5-4.3-197.1-37.1c-25.9 16.5-48.4 36.5-67.2 58.9c75.2 43.8 163.6 51 242.3 24.9zm31.8-96.4c.4-5 .5-10 .5-15.1c0-77.9-42.8-145.8-106.3-181.5c35.6 58.4 54.2 127.7 49.6 200.3c18.8 .5 37.6-.7 56.1-3.8zM101 394.7C127.6 334 172 280.5 231.7 242.7c-1.3-30-7.1-58.9-16.8-85.9C140.2 189.5 85.7 249.6 58.1 320.3c9 27.9 23.8 53.1 42.9 74.5zm-52-159.9C84.1 182.9 133.8 140 195.2 113c-8.7-15.7-18.7-30.4-29.9-44.2C101.9 99.6 56.5 161.6 49.1 234.8zM213.3 52.4c39.3 53.4 63.5 118.6 66.4 189.2c25.7 13.4 52.6 22.6 79.9 27.9c4.6-84.1-26.8-163-81.5-220.4c-7.2-.8-14.6-1.2-22.1-1.2c-14.6 0-28.9 1.5-42.7 4.4zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 0l0 0h0l0 0z"],
    "volume": [576,512,["128265","volume-medium"],"f6a8","M191.9 201.9L304 102.3V409.7L191.9 310.1c-4.4-3.9-10.1-6.1-15.9-6.1H88c-4.4 0-8-3.6-8-8V216c0-4.4 3.6-8 8-8h88c5.9 0 11.6-2.2 15.9-6.1zM322.2 32c-7.3 0-14.3 2.7-19.8 7.5L166.9 160H88c-30.9 0-56 25.1-56 56v80c0 30.9 25.1 56 56 56h78.9L302.4 472.5c5.5 4.8 12.5 7.5 19.8 7.5c16.5 0 29.8-13.3 29.8-29.8V61.8C352 45.3 338.7 32 322.2 32zm182.9 75c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C507.3 170.7 528 210.9 528 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C425.1 227.6 432 241 432 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C466.1 312.9 480 286.1 480 256s-13.9-56.9-35.4-74.5z"],
    "wand-magic": [512,512,["magic"],"f0d0","M319.7 157.7l34.6 34.6L464 82.6 429.4 48 319.7 157.7zm-33.9 33.9L48 429.4 82.6 464 320.3 226.2l-34.6-34.6zM14.1 395.4L395.4 14.1c18.7-18.7 49.1-18.7 67.9 0l34.6 34.6c18.7 18.7 18.7 49.1 0 67.9L116.5 497.9c-18.7 18.7-49.1 18.7-67.9 0L14.1 463.3c-18.7-18.7-18.7-49.1 0-67.9z"],
    "window-flip": [512,512,["window-alt"],"f40f","M512 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96v64 48 16V416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64V224 208 160 96zM48 224H464l0 192c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-192zM416 96a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-64 32a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM224 96a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],
    "xmark": [384,512,["215","10060","10006","10005","128473","close","multiply","remove","times"],"f00d","M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"]

  };
  var prefixes$1 = [null    ,'far',
    ,'fa-regular'

  ];
  bunker(function () {
    var _iterator = _createForOfIteratorHelper(prefixes$1),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prefix = _step.value;
        if (!prefix) continue;
        defineIcons(prefix, icons);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });

}());

(function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var _WINDOW = {};
  var _DOCUMENT = {};

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid',
    'fasr': 'regular',
    'fa-regular': 'regular',
    'fasl': 'light',
    'fa-light': 'light'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass',
    'regular': 'fasr',
    'light': 'fasl'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid',
    'fasr': 'fa-regular',
    'fasl': 'fa-light'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass',
    'fa-regular': 'fasr',
    'fa-light': 'fasl'
  }), _familyProxy4));
  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass',
    '400': 'fasr',
    '300': 'fasl'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    
    "book": [448,512,["128212"],"f02d","M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"],
    "eye": [576,512,["128065"],"f06e","M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"],
    "eye-slash": [640,512,[],"f070","M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"],
    "heart": [512,512,["61578","10084","9829","129505","129294","129293","128420","128156","128155","128154","128153"],"f004","M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"],
    "star": [576,512,["61446","11088"],"f005","M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"]

  };
  var prefixes$1 = [null    ,'fas',
    ,'fa-solid'

  ];
  bunker(function () {
    var _iterator = _createForOfIteratorHelper(prefixes$1),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prefix = _step.value;
        if (!prefix) continue;
        defineIcons(prefix, icons);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });

}());

(function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var _WINDOW = {};
  var _DOCUMENT = {};

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid',
    'fasr': 'regular',
    'fa-regular': 'regular',
    'fasl': 'light',
    'fa-light': 'light'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass',
    'regular': 'fasr',
    'light': 'fasl'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid',
    'fasr': 'fa-regular',
    'fasl': 'fa-light'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass',
    'fa-regular': 'fasr',
    'fa-light': 'fasl'
  }), _familyProxy4));
  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass',
    '400': 'fasr',
    '300': 'fasl'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    
    "star-half": [576,512,["61731"],"f089",["M143.1 512h3.2c-1.1 .1-2.1 .1-3.2 0zM288 439.8V0c0 0 .1 0 .1 0c12.2 0 23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8l-.1 .1z","M288 0c-12.2 .1-23.3 7-28.6 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288 439.8V0zM429.9 512c1.1 .1 2.1 .1 3.2 0h-3.2z"]]

  };
  var prefixes$1 = [null    ,'fad',
    ,'fa-duotone'

  ];
  bunker(function () {
    var _iterator = _createForOfIteratorHelper(prefixes$1),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prefix = _step.value;
        if (!prefix) continue;
        defineIcons(prefix, icons);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });

}());

/*!
 * Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Commercial License)
 * Copyright 2023 Fonticons, Inc.
 */
(function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _wrapRegExp() {
    _wrapRegExp = function (re, groups) {
      return new BabelRegExp(re, void 0, groups);
    };

    var _super = RegExp.prototype,
        _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = new RegExp(re, flags);

      return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype);
    }

    function buildGroups(result, re) {
      var g = _groups.get(re);

      return Object.keys(g).reduce(function (groups, name) {
        return groups[name] = result[g[name]], groups;
      }, Object.create(null));
    }

    return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) {
      var result = _super.exec.call(this, str);

      return result && (result.groups = buildGroups(result, this)), result;
    }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
      if ("string" == typeof substitution) {
        var groups = _groups.get(this);

        return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
          return "$" + groups[name];
        }));
      }

      if ("function" == typeof substitution) {
        var _this = this;

        return _super[Symbol.replace].call(this, str, function () {
          var args = arguments;
          return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
        });
      }

      return _super[Symbol.replace].call(this, str, substitution);
    }, _wrapRegExp.apply(this, arguments);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var noop = function noop() {};

  var _WINDOW = {};
  var _DOCUMENT = {};
  var _MUTATION_OBSERVER = null;
  var _PERFORMANCE = {
    mark: noop,
    measure: noop
  };

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
    if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
    if (typeof performance !== 'undefined') _PERFORMANCE = performance;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var MUTATION_OBSERVER = _MUTATION_OBSERVER;
  var PERFORMANCE = _PERFORMANCE;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var UNITS_IN_GRID = 16;
  var DEFAULT_CSS_PREFIX = 'fa';
  var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
  var DATA_FA_I2SVG = 'data-fa-i2svg';
  var DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
  var DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';
  var DATA_PREFIX = 'data-prefix';
  var DATA_ICON = 'data-icon';
  var HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
  var MUTATION_APPROACH_ASYNC = 'async';
  var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid',
    'fasr': 'regular',
    'fa-regular': 'regular',
    'fasl': 'light',
    'fa-light': 'light'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass',
    'regular': 'fasr',
    'light': 'fasl'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid',
    'fasr': 'fa-regular',
    'fasl': 'fa-light'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass',
    'fa-regular': 'fasr',
    'fa-light': 'fasl'
  }), _familyProxy4));
  var ICON_SELECTION_SYNTAX_PATTERN = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/; // eslint-disable-line no-useless-escape

  var LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
  var FONT_FAMILY_PATTERN = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i;
  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass',
    '400': 'fasr',
    '300': 'fasl'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  var initial = WINDOW.FontAwesomeConfig || {};

  function getAttrConfig(attr) {
    var element = DOCUMENT.querySelector('script[' + attr + ']');

    if (element) {
      return element.getAttribute(attr);
    }
  }

  function coerce(val) {
    // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
    // We'll assume that this is an indication that it should be toggled to true
    if (val === '') return true;
    if (val === 'false') return false;
    if (val === 'true') return true;
    return val;
  }

  if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
    var attrs = [['data-family-prefix', 'familyPrefix'], ['data-css-prefix', 'cssPrefix'], ['data-family-default', 'familyDefault'], ['data-style-default', 'styleDefault'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
    attrs.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          attr = _ref2[0],
          key = _ref2[1];

      var val = coerce(getAttrConfig(attr));

      if (val !== undefined && val !== null) {
        initial[key] = val;
      }
    });
  }

  var _default = {
    styleDefault: 'solid',
    familyDefault: 'classic',
    cssPrefix: DEFAULT_CSS_PREFIX,
    replacementClass: DEFAULT_REPLACEMENT_CLASS,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    mutateApproach: 'async',
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
  }; // familyPrefix is deprecated but we must still support it if present

  if (initial.familyPrefix) {
    initial.cssPrefix = initial.familyPrefix;
  }

  var _config = _objectSpread2(_objectSpread2({}, _default), initial);

  if (!_config.autoReplaceSvg) _config.observeMutations = false;
  var config = {};
  Object.keys(_default).forEach(function (key) {
    Object.defineProperty(config, key, {
      enumerable: true,
      set: function set(val) {
        _config[key] = val;

        _onChangeCb.forEach(function (cb) {
          return cb(config);
        });
      },
      get: function get() {
        return _config[key];
      }
    });
  }); // familyPrefix is deprecated as of 6.2.0 and should be removed in 7.0.0

  Object.defineProperty(config, 'familyPrefix', {
    enumerable: true,
    set: function set(val) {
      _config.cssPrefix = val;

      _onChangeCb.forEach(function (cb) {
        return cb(config);
      });
    },
    get: function get() {
      return _config.cssPrefix;
    }
  });
  WINDOW.FontAwesomeConfig = config;
  var _onChangeCb = [];
  function onChange(cb) {
    _onChangeCb.push(cb);

    return function () {
      _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
    };
  }

  var d = UNITS_IN_GRID;
  var meaninglessTransform = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
  };
  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }
  function insertCss(css) {
    if (!css || !IS_DOM) {
      return;
    }

    var style = DOCUMENT.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    var headChildren = DOCUMENT.head.childNodes;
    var beforeChild = null;

    for (var i = headChildren.length - 1; i > -1; i--) {
      var child = headChildren[i];
      var tagName = (child.tagName || '').toUpperCase();

      if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
        beforeChild = child;
      }
    }

    DOCUMENT.head.insertBefore(style, beforeChild);
    return css;
  }
  var idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function nextUniqueId() {
    var size = 12;
    var id = '';

    while (size-- > 0) {
      id += idPool[Math.random() * 62 | 0];
    }

    return id;
  }
  function toArray(obj) {
    var array = [];

    for (var i = (obj || []).length >>> 0; i--;) {
      array[i] = obj[i];
    }

    return array;
  }
  function classArray(node) {
    if (node.classList) {
      return toArray(node.classList);
    } else {
      return (node.getAttribute('class') || '').split(' ').filter(function (i) {
        return i;
      });
    }
  }
  function htmlEscape(str) {
    return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function joinAttributes(attributes) {
    return Object.keys(attributes || {}).reduce(function (acc, attributeName) {
      return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
    }, '').trim();
  }
  function joinStyles(styles) {
    return Object.keys(styles || {}).reduce(function (acc, styleName) {
      return acc + "".concat(styleName, ": ").concat(styles[styleName].trim(), ";");
    }, '');
  }
  function transformIsMeaningful(transform) {
    return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
  }
  function transformForSvg(_ref) {
    var transform = _ref.transform,
        containerWidth = _ref.containerWidth,
        iconWidth = _ref.iconWidth;
    var outer = {
      transform: "translate(".concat(containerWidth / 2, " 256)")
    };
    var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
    var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
    var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
    var inner = {
      transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
    };
    var path = {
      transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
    };
    return {
      outer: outer,
      inner: inner,
      path: path
    };
  }
  function transformForCss(_ref2) {
    var transform = _ref2.transform,
        _ref2$width = _ref2.width,
        width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width,
        _ref2$height = _ref2.height,
        height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height,
        _ref2$startCentered = _ref2.startCentered,
        startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;
    var val = '';

    if (startCentered && IS_IE) {
      val += "translate(".concat(transform.x / d - width / 2, "em, ").concat(transform.y / d - height / 2, "em) ");
    } else if (startCentered) {
      val += "translate(calc(-50% + ".concat(transform.x / d, "em), calc(-50% + ").concat(transform.y / d, "em)) ");
    } else {
      val += "translate(".concat(transform.x / d, "em, ").concat(transform.y / d, "em) ");
    }

    val += "scale(".concat(transform.size / d * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d * (transform.flipY ? -1 : 1), ") ");
    val += "rotate(".concat(transform.rotate, "deg) ");
    return val;
  }

  var baseStyles = ":host,:root{--fa-font-solid:normal 900 1em/1 \"Font Awesome 6 Solid\";--fa-font-regular:normal 400 1em/1 \"Font Awesome 6 Regular\";--fa-font-light:normal 300 1em/1 \"Font Awesome 6 Light\";--fa-font-thin:normal 100 1em/1 \"Font Awesome 6 Thin\";--fa-font-duotone:normal 900 1em/1 \"Font Awesome 6 Duotone\";--fa-font-sharp-solid:normal 900 1em/1 \"Font Awesome 6 Sharp\";--fa-font-sharp-regular:normal 400 1em/1 \"Font Awesome 6 Sharp\";--fa-font-sharp-light:normal 300 1em/1 \"Font Awesome 6 Sharp\";--fa-font-brands:normal 400 1em/1 \"Font Awesome 6 Brands\"}svg:not(:host).svg-inline--fa,svg:not(:root).svg-inline--fa{overflow:visible;box-sizing:content-box}.svg-inline--fa{display:var(--fa-display,inline-block);height:1em;overflow:visible;vertical-align:-.125em}.svg-inline--fa.fa-2xs{vertical-align:.1em}.svg-inline--fa.fa-xs{vertical-align:0}.svg-inline--fa.fa-sm{vertical-align:-.0714285705em}.svg-inline--fa.fa-lg{vertical-align:-.2em}.svg-inline--fa.fa-xl{vertical-align:-.25em}.svg-inline--fa.fa-2xl{vertical-align:-.3125em}.svg-inline--fa.fa-pull-left{margin-right:var(--fa-pull-margin,.3em);width:auto}.svg-inline--fa.fa-pull-right{margin-left:var(--fa-pull-margin,.3em);width:auto}.svg-inline--fa.fa-li{width:var(--fa-li-width,2em);top:.25em}.svg-inline--fa.fa-fw{width:var(--fa-fw-width,1.25em)}.fa-layers svg.svg-inline--fa{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.fa-layers-counter,.fa-layers-text{display:inline-block;position:absolute;text-align:center}.fa-layers{display:inline-block;height:1em;position:relative;text-align:center;vertical-align:-.125em;width:1em}.fa-layers svg.svg-inline--fa{-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-text{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter{background-color:var(--fa-counter-background-color,#ff253a);border-radius:var(--fa-counter-border-radius,1em);box-sizing:border-box;color:var(--fa-inverse,#fff);line-height:var(--fa-counter-line-height,1);max-width:var(--fa-counter-max-width,5em);min-width:var(--fa-counter-min-width,1.5em);overflow:hidden;padding:var(--fa-counter-padding,.25em .5em);right:var(--fa-right,0);text-overflow:ellipsis;top:var(--fa-top,0);-webkit-transform:scale(var(--fa-counter-scale,.25));transform:scale(var(--fa-counter-scale,.25));-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-bottom-right{bottom:var(--fa-bottom,0);right:var(--fa-right,0);top:auto;-webkit-transform:scale(var(--fa-layers-scale,.25));transform:scale(var(--fa-layers-scale,.25));-webkit-transform-origin:bottom right;transform-origin:bottom right}.fa-layers-bottom-left{bottom:var(--fa-bottom,0);left:var(--fa-left,0);right:auto;top:auto;-webkit-transform:scale(var(--fa-layers-scale,.25));transform:scale(var(--fa-layers-scale,.25));-webkit-transform-origin:bottom left;transform-origin:bottom left}.fa-layers-top-right{top:var(--fa-top,0);right:var(--fa-right,0);-webkit-transform:scale(var(--fa-layers-scale,.25));transform:scale(var(--fa-layers-scale,.25));-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-top-left{left:var(--fa-left,0);right:auto;top:var(--fa-top,0);-webkit-transform:scale(var(--fa-layers-scale,.25));transform:scale(var(--fa-layers-scale,.25));-webkit-transform-origin:top left;transform-origin:top left}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-2xs{font-size:.625em;line-height:.1em;vertical-align:.225em}.fa-xs{font-size:.75em;line-height:.0833333337em;vertical-align:.125em}.fa-sm{font-size:.875em;line-height:.0714285718em;vertical-align:.0535714295em}.fa-lg{font-size:1.25em;line-height:.05em;vertical-align:-.075em}.fa-xl{font-size:1.5em;line-height:.0416666682em;vertical-align:-.125em}.fa-2xl{font-size:2em;line-height:.03125em;vertical-align:-.1875em}.fa-fw{text-align:center;width:1.25em}.fa-ul{list-style-type:none;margin-left:var(--fa-li-margin,2.5em);padding-left:0}.fa-ul>li{position:relative}.fa-li{left:calc(var(--fa-li-width,2em) * -1);position:absolute;text-align:center;width:var(--fa-li-width,2em);line-height:inherit}.fa-border{border-color:var(--fa-border-color,#eee);border-radius:var(--fa-border-radius,.1em);border-style:var(--fa-border-style,solid);border-width:var(--fa-border-width,.08em);padding:var(--fa-border-padding,.2em .25em .15em)}.fa-pull-left{float:left;margin-right:var(--fa-pull-margin,.3em)}.fa-pull-right{float:right;margin-left:var(--fa-pull-margin,.3em)}.fa-beat{-webkit-animation-name:fa-beat;animation-name:fa-beat;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,ease-in-out);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-bounce{-webkit-animation-name:fa-bounce;animation-name:fa-bounce;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,cubic-bezier(.28,.84,.42,1));animation-timing-function:var(--fa-animation-timing,cubic-bezier(.28,.84,.42,1))}.fa-fade{-webkit-animation-name:fa-fade;animation-name:fa-fade;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,cubic-bezier(.4,0,.6,1));animation-timing-function:var(--fa-animation-timing,cubic-bezier(.4,0,.6,1))}.fa-beat-fade{-webkit-animation-name:fa-beat-fade;animation-name:fa-beat-fade;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,cubic-bezier(.4,0,.6,1));animation-timing-function:var(--fa-animation-timing,cubic-bezier(.4,0,.6,1))}.fa-flip{-webkit-animation-name:fa-flip;animation-name:fa-flip;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,ease-in-out);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-shake{-webkit-animation-name:fa-shake;animation-name:fa-shake;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,linear);animation-timing-function:var(--fa-animation-timing,linear)}.fa-spin{-webkit-animation-name:fa-spin;animation-name:fa-spin;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,2s);animation-duration:var(--fa-animation-duration,2s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,linear);animation-timing-function:var(--fa-animation-timing,linear)}.fa-spin-reverse{--fa-animation-direction:reverse}.fa-pulse,.fa-spin-pulse{-webkit-animation-name:fa-spin;animation-name:fa-spin;-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,steps(8));animation-timing-function:var(--fa-animation-timing,steps(8))}@media (prefers-reduced-motion:reduce){.fa-beat,.fa-beat-fade,.fa-bounce,.fa-fade,.fa-flip,.fa-pulse,.fa-shake,.fa-spin,.fa-spin-pulse{-webkit-animation-delay:-1ms;animation-delay:-1ms;-webkit-animation-duration:1ms;animation-duration:1ms;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-transition-delay:0s;transition-delay:0s;-webkit-transition-duration:0s;transition-duration:0s}}@-webkit-keyframes fa-beat{0%,90%{-webkit-transform:scale(1);transform:scale(1)}45%{-webkit-transform:scale(var(--fa-beat-scale,1.25));transform:scale(var(--fa-beat-scale,1.25))}}@keyframes fa-beat{0%,90%{-webkit-transform:scale(1);transform:scale(1)}45%{-webkit-transform:scale(var(--fa-beat-scale,1.25));transform:scale(var(--fa-beat-scale,1.25))}}@-webkit-keyframes fa-bounce{0%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}10%{-webkit-transform:scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0);transform:scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0)}30%{-webkit-transform:scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em));transform:scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em))}50%{-webkit-transform:scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0);transform:scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0)}57%{-webkit-transform:scale(1,1) translateY(var(--fa-bounce-rebound,-.125em));transform:scale(1,1) translateY(var(--fa-bounce-rebound,-.125em))}64%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}100%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}}@keyframes fa-bounce{0%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}10%{-webkit-transform:scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0);transform:scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0)}30%{-webkit-transform:scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em));transform:scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em))}50%{-webkit-transform:scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0);transform:scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0)}57%{-webkit-transform:scale(1,1) translateY(var(--fa-bounce-rebound,-.125em));transform:scale(1,1) translateY(var(--fa-bounce-rebound,-.125em))}64%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}100%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}}@-webkit-keyframes fa-fade{50%{opacity:var(--fa-fade-opacity,.4)}}@keyframes fa-fade{50%{opacity:var(--fa-fade-opacity,.4)}}@-webkit-keyframes fa-beat-fade{0%,100%{opacity:var(--fa-beat-fade-opacity,.4);-webkit-transform:scale(1);transform:scale(1)}50%{opacity:1;-webkit-transform:scale(var(--fa-beat-fade-scale,1.125));transform:scale(var(--fa-beat-fade-scale,1.125))}}@keyframes fa-beat-fade{0%,100%{opacity:var(--fa-beat-fade-opacity,.4);-webkit-transform:scale(1);transform:scale(1)}50%{opacity:1;-webkit-transform:scale(var(--fa-beat-fade-scale,1.125));transform:scale(var(--fa-beat-fade-scale,1.125))}}@-webkit-keyframes fa-flip{50%{-webkit-transform:rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-180deg));transform:rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-180deg))}}@keyframes fa-flip{50%{-webkit-transform:rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-180deg));transform:rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-180deg))}}@-webkit-keyframes fa-shake{0%{-webkit-transform:rotate(-15deg);transform:rotate(-15deg)}4%{-webkit-transform:rotate(15deg);transform:rotate(15deg)}24%,8%{-webkit-transform:rotate(-18deg);transform:rotate(-18deg)}12%,28%{-webkit-transform:rotate(18deg);transform:rotate(18deg)}16%{-webkit-transform:rotate(-22deg);transform:rotate(-22deg)}20%{-webkit-transform:rotate(22deg);transform:rotate(22deg)}32%{-webkit-transform:rotate(-12deg);transform:rotate(-12deg)}36%{-webkit-transform:rotate(12deg);transform:rotate(12deg)}100%,40%{-webkit-transform:rotate(0);transform:rotate(0)}}@keyframes fa-shake{0%{-webkit-transform:rotate(-15deg);transform:rotate(-15deg)}4%{-webkit-transform:rotate(15deg);transform:rotate(15deg)}24%,8%{-webkit-transform:rotate(-18deg);transform:rotate(-18deg)}12%,28%{-webkit-transform:rotate(18deg);transform:rotate(18deg)}16%{-webkit-transform:rotate(-22deg);transform:rotate(-22deg)}20%{-webkit-transform:rotate(22deg);transform:rotate(22deg)}32%{-webkit-transform:rotate(-12deg);transform:rotate(-12deg)}36%{-webkit-transform:rotate(12deg);transform:rotate(12deg)}100%,40%{-webkit-transform:rotate(0);transform:rotate(0)}}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}.fa-flip-both,.fa-flip-horizontal.fa-flip-vertical{-webkit-transform:scale(-1,-1);transform:scale(-1,-1)}.fa-rotate-by{-webkit-transform:rotate(var(--fa-rotate-angle,none));transform:rotate(var(--fa-rotate-angle,none))}.fa-stack{display:inline-block;vertical-align:middle;height:2em;position:relative;width:2.5em}.fa-stack-1x,.fa-stack-2x{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;z-index:var(--fa-stack-z-index,auto)}.svg-inline--fa.fa-stack-1x{height:1em;width:1.25em}.svg-inline--fa.fa-stack-2x{height:2em;width:2.5em}.fa-inverse{color:var(--fa-inverse,#fff)}.fa-sr-only,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.fa-sr-only-focusable:not(:focus),.sr-only-focusable:not(:focus){position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.svg-inline--fa .fa-primary{fill:var(--fa-primary-color,currentColor);opacity:var(--fa-primary-opacity,1)}.svg-inline--fa .fa-secondary{fill:var(--fa-secondary-color,currentColor);opacity:var(--fa-secondary-opacity,.4)}.svg-inline--fa.fa-swap-opacity .fa-primary{opacity:var(--fa-secondary-opacity,.4)}.svg-inline--fa.fa-swap-opacity .fa-secondary{opacity:var(--fa-primary-opacity,1)}.svg-inline--fa mask .fa-primary,.svg-inline--fa mask .fa-secondary{fill:#000}.fa-duotone.fa-inverse,.fad.fa-inverse{color:var(--fa-inverse,#fff)}";

  function css() {
    var dcp = DEFAULT_CSS_PREFIX;
    var drc = DEFAULT_REPLACEMENT_CLASS;
    var fp = config.cssPrefix;
    var rc = config.replacementClass;
    var s = baseStyles;

    if (fp !== dcp || rc !== drc) {
      var dPatt = new RegExp("\\.".concat(dcp, "\\-"), 'g');
      var customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), 'g');
      var rPatt = new RegExp("\\.".concat(drc), 'g');
      s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
    }

    return s;
  }

  var _cssInserted = false;

  function ensureCss() {
    if (config.autoAddCss && !_cssInserted) {
      insertCss(css());
      _cssInserted = true;
    }
  }

  var InjectCSS = {
    mixout: function mixout() {
      return {
        dom: {
          css: css,
          insertCss: ensureCss
        }
      };
    },
    hooks: function hooks() {
      return {
        beforeDOMElementCreation: function beforeDOMElementCreation() {
          ensureCss();
        },
        beforeI2svg: function beforeI2svg() {
          ensureCss();
        }
      };
    }
  };

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  var functions = [];

  var listener = function listener() {
    DOCUMENT.removeEventListener('DOMContentLoaded', listener);
    loaded = 1;
    functions.map(function (fn) {
      return fn();
    });
  };

  var loaded = false;

  if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
  }

  function domready (fn) {
    if (!IS_DOM) return;
    loaded ? setTimeout(fn, 0) : functions.push(fn);
  }

  function toHtml(abstractNodes) {
    var tag = abstractNodes.tag,
        _abstractNodes$attrib = abstractNodes.attributes,
        attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,
        _abstractNodes$childr = abstractNodes.children,
        children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;

    if (typeof abstractNodes === 'string') {
      return htmlEscape(abstractNodes);
    } else {
      return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
    }
  }

  function iconFromMapping(mapping, prefix, iconName) {
    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
      return {
        prefix: prefix,
        iconName: iconName,
        icon: mapping[prefix][iconName]
      };
    }
  }

  /**
   * Internal helper to bind a function known to have 4 arguments
   * to a given context.
   */

  var bindInternal4 = function bindInternal4(func, thisContext) {
    return function (a, b, c, d) {
      return func.call(thisContext, a, b, c, d);
    };
  };

  /**
   * # Reduce
   *
   * A fast object `.reduce()` implementation.
   *
   * @param  {Object}   subject      The object to reduce over.
   * @param  {Function} fn           The reducer function.
   * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
   * @param  {Object}   thisContext  The context for the reducer.
   * @return {mixed}                 The final result.
   */


  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    var keys = Object.keys(subject),
        length = keys.length,
        iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
        i,
        key,
        result;

    if (initialValue === undefined) {
      i = 1;
      result = subject[keys[0]];
    } else {
      i = 0;
      result = initialValue;
    }

    for (; i < length; i++) {
      key = keys[i];
      result = iterator(result, subject[key], key, subject);
    }

    return result;
  };

  /**
   * ucs2decode() and codePointAt() are both works of Mathias Bynens and licensed under MIT
   *
   * Copyright Mathias Bynens <https://mathiasbynens.be/>

   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:

   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.

   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  function ucs2decode(string) {
    var output = [];
    var counter = 0;
    var length = string.length;

    while (counter < length) {
      var value = string.charCodeAt(counter++);

      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        var extra = string.charCodeAt(counter++);

        if ((extra & 0xFC00) == 0xDC00) {
          // eslint-disable-line eqeqeq
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }

    return output;
  }

  function toHex(unicode) {
    var decoded = ucs2decode(unicode);
    return decoded.length === 1 ? decoded[0].toString(16) : null;
  }
  function codePointAt(string, index) {
    var size = string.length;
    var first = string.charCodeAt(index);
    var second;

    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);

      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }

    return first;
  }

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var duotonePathRe = [/*#__PURE__*/_wrapRegExp(/path d="((?:(?!")[\s\S])+)".*path d="((?:(?!")[\s\S])+)"/, {
    d1: 1,
    d2: 2
  }), /*#__PURE__*/_wrapRegExp(/path class="((?:(?!")[\s\S])+)".*d="((?:(?!")[\s\S])+)".*path class="((?:(?!")[\s\S])+)".*d="((?:(?!")[\s\S])+)"/, {
    cls1: 1,
    d1: 2,
    cls2: 3,
    d2: 4
  }), /*#__PURE__*/_wrapRegExp(/path class="((?:(?!")[\s\S])+)".*d="((?:(?!")[\s\S])+)"/, {
    cls1: 1,
    d1: 2
  })];

  var _LONG_STYLE, _PREFIXES, _PREFIXES_FOR_FAMILY;
  var styles = namespace.styles,
      shims = namespace.shims;
  var LONG_STYLE = (_LONG_STYLE = {}, _defineProperty(_LONG_STYLE, FAMILY_CLASSIC, Object.values(PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC])), _defineProperty(_LONG_STYLE, FAMILY_SHARP, Object.values(PREFIX_TO_LONG_STYLE[FAMILY_SHARP])), _LONG_STYLE);
  var _defaultUsablePrefix = null;
  var _byUnicode = {};
  var _byLigature = {};
  var _byOldName = {};
  var _byOldUnicode = {};
  var _byAlias = {};
  var PREFIXES = (_PREFIXES = {}, _defineProperty(_PREFIXES, FAMILY_CLASSIC, Object.keys(PREFIX_TO_STYLE[FAMILY_CLASSIC])), _defineProperty(_PREFIXES, FAMILY_SHARP, Object.keys(PREFIX_TO_STYLE[FAMILY_SHARP])), _PREFIXES);

  function isReserved(name) {
    return ~RESERVED_CLASSES.indexOf(name);
  }

  function getIconName(cssPrefix, cls) {
    var parts = cls.split('-');
    var prefix = parts[0];
    var iconName = parts.slice(1).join('-');

    if (prefix === cssPrefix && iconName !== '' && !isReserved(iconName)) {
      return iconName;
    } else {
      return null;
    }
  }
  var build = function build() {
    var lookup = function lookup(reducer) {
      return reduce(styles, function (o, style, prefix) {
        o[prefix] = reduce(style, reducer, {});
        return o;
      }, {});
    };

    _byUnicode = lookup(function (acc, icon, iconName) {
      if (icon[3]) {
        acc[icon[3]] = iconName;
      }

      if (icon[2]) {
        var aliases = icon[2].filter(function (a) {
          return typeof a === 'number';
        });
        aliases.forEach(function (alias) {
          acc[alias.toString(16)] = iconName;
        });
      }

      return acc;
    });
    _byLigature = lookup(function (acc, icon, iconName) {
      acc[iconName] = iconName;

      if (icon[2]) {
        var aliases = icon[2].filter(function (a) {
          return typeof a === 'string';
        });
        aliases.forEach(function (alias) {
          acc[alias] = iconName;
        });
      }

      return acc;
    });
    _byAlias = lookup(function (acc, icon, iconName) {
      var aliases = icon[2];
      acc[iconName] = iconName;
      aliases.forEach(function (alias) {
        acc[alias] = iconName;
      });
      return acc;
    }); // If we have a Kit, we can't determine if regular is available since we
    // could be auto-fetching it. We'll have to assume that it is available.

    var hasRegular = 'far' in styles || config.autoFetchSvg;
    var shimLookups = reduce(shims, function (acc, shim) {
      var maybeNameMaybeUnicode = shim[0];
      var prefix = shim[1];
      var iconName = shim[2];

      if (prefix === 'far' && !hasRegular) {
        prefix = 'fas';
      }

      if (typeof maybeNameMaybeUnicode === 'string') {
        acc.names[maybeNameMaybeUnicode] = {
          prefix: prefix,
          iconName: iconName
        };
      }

      if (typeof maybeNameMaybeUnicode === 'number') {
        acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
          prefix: prefix,
          iconName: iconName
        };
      }

      return acc;
    }, {
      names: {},
      unicodes: {}
    });
    _byOldName = shimLookups.names;
    _byOldUnicode = shimLookups.unicodes;
    _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
      family: config.familyDefault
    });
  };
  onChange(function (c) {
    _defaultUsablePrefix = getCanonicalPrefix(c.styleDefault, {
      family: config.familyDefault
    });
  });
  build();
  function byUnicode(prefix, unicode) {
    return (_byUnicode[prefix] || {})[unicode];
  }
  function byLigature(prefix, ligature) {
    return (_byLigature[prefix] || {})[ligature];
  }
  function byAlias(prefix, alias) {
    return (_byAlias[prefix] || {})[alias];
  }
  function byOldName(name) {
    return _byOldName[name] || {
      prefix: null,
      iconName: null
    };
  }
  function byOldUnicode(unicode) {
    var oldUnicode = _byOldUnicode[unicode];
    var newUnicode = byUnicode('fas', unicode);
    return oldUnicode || (newUnicode ? {
      prefix: 'fas',
      iconName: newUnicode
    } : null) || {
      prefix: null,
      iconName: null
    };
  }
  function getDefaultUsablePrefix() {
    return _defaultUsablePrefix;
  }
  var emptyCanonicalIcon = function emptyCanonicalIcon() {
    return {
      prefix: null,
      iconName: null,
      rest: []
    };
  };
  function getCanonicalPrefix(styleOrPrefix) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$family = params.family,
        family = _params$family === void 0 ? FAMILY_CLASSIC : _params$family;
    var style = PREFIX_TO_STYLE[family][styleOrPrefix];
    var prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
    var defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
    return prefix || defined || null;
  }
  var PREFIXES_FOR_FAMILY = (_PREFIXES_FOR_FAMILY = {}, _defineProperty(_PREFIXES_FOR_FAMILY, FAMILY_CLASSIC, Object.keys(PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC])), _defineProperty(_PREFIXES_FOR_FAMILY, FAMILY_SHARP, Object.keys(PREFIX_TO_LONG_STYLE[FAMILY_SHARP])), _PREFIXES_FOR_FAMILY);
  function getCanonicalIcon(values) {
    var _famProps;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$skipLookups = params.skipLookups,
        skipLookups = _params$skipLookups === void 0 ? false : _params$skipLookups;
    var famProps = (_famProps = {}, _defineProperty(_famProps, FAMILY_CLASSIC, "".concat(config.cssPrefix, "-").concat(FAMILY_CLASSIC)), _defineProperty(_famProps, FAMILY_SHARP, "".concat(config.cssPrefix, "-").concat(FAMILY_SHARP)), _famProps);
    var givenPrefix = null;
    var family = FAMILY_CLASSIC;

    if (values.includes(famProps[FAMILY_CLASSIC]) || values.some(function (v) {
      return PREFIXES_FOR_FAMILY[FAMILY_CLASSIC].includes(v);
    })) {
      family = FAMILY_CLASSIC;
    }

    if (values.includes(famProps[FAMILY_SHARP]) || values.some(function (v) {
      return PREFIXES_FOR_FAMILY[FAMILY_SHARP].includes(v);
    })) {
      family = FAMILY_SHARP;
    }

    var canonical = values.reduce(function (acc, cls) {
      var iconName = getIconName(config.cssPrefix, cls);

      if (styles[cls]) {
        cls = LONG_STYLE[family].includes(cls) ? LONG_STYLE_TO_PREFIX[family][cls] : cls;
        givenPrefix = cls;
        acc.prefix = cls;
      } else if (PREFIXES[family].indexOf(cls) > -1) {
        givenPrefix = cls;
        acc.prefix = getCanonicalPrefix(cls, {
          family: family
        });
      } else if (iconName) {
        acc.iconName = iconName;
      } else if (cls !== config.replacementClass && cls !== famProps[FAMILY_CLASSIC] && cls !== famProps[FAMILY_SHARP]) {
        acc.rest.push(cls);
      }

      if (!skipLookups && acc.prefix && acc.iconName) {
        var shim = givenPrefix === 'fa' ? byOldName(acc.iconName) : {};
        var aliasIconName = byAlias(acc.prefix, acc.iconName);

        if (shim.prefix) {
          givenPrefix = null;
        }

        acc.iconName = shim.iconName || aliasIconName || acc.iconName;
        acc.prefix = shim.prefix || acc.prefix;

        if (acc.prefix === 'far' && !styles['far'] && styles['fas'] && !config.autoFetchSvg) {
          // Allow a fallback from the regular style to solid if regular is not available
          // but only if we aren't auto-fetching SVGs
          acc.prefix = 'fas';
        }
      }

      return acc;
    }, emptyCanonicalIcon());

    if (values.includes('fa-brands') || values.includes('fab')) {
      canonical.prefix = 'fab';
    }

    if (values.includes('fa-duotone') || values.includes('fad')) {
      canonical.prefix = 'fad';
    }

    if (!canonical.prefix && family === FAMILY_SHARP && (styles['fass'] || config.autoFetchSvg)) {
      canonical.prefix = 'fass';
      canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
    }

    if (canonical.prefix === 'fa' || givenPrefix === 'fa') {
      // The fa prefix is not canonical. So if it has made it through until this point
      // we will shift it to the correct prefix.
      canonical.prefix = getDefaultUsablePrefix() || 'fas';
    }

    return canonical;
  }

  var Library = /*#__PURE__*/function () {
    function Library() {
      _classCallCheck(this, Library);

      this.definitions = {};
    }

    _createClass(Library, [{
      key: "add",
      value: function add() {
        var _this = this;

        for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
          definitions[_key] = arguments[_key];
        }

        var additions = definitions.reduce(this._pullDefinitions, {});
        Object.keys(additions).forEach(function (key) {
          _this.definitions[key] = _objectSpread2(_objectSpread2({}, _this.definitions[key] || {}), additions[key]);
          defineIcons(key, additions[key]); // TODO can we stop doing this? We can't get the icons by 'fa-solid' any longer so this probably needs to change

          var longPrefix = PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC][key];
          if (longPrefix) defineIcons(longPrefix, additions[key]);
          build();
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.definitions = {};
      }
    }, {
      key: "_pullDefinitions",
      value: function _pullDefinitions(additions, definition) {
        var normalized = definition.prefix && definition.iconName && definition.icon ? {
          0: definition
        } : definition;
        Object.keys(normalized).map(function (key) {
          var _normalized$key = normalized[key],
              prefix = _normalized$key.prefix,
              iconName = _normalized$key.iconName,
              icon = _normalized$key.icon;
          var aliases = icon[2];
          if (!additions[prefix]) additions[prefix] = {};

          if (aliases.length > 0) {
            aliases.forEach(function (alias) {
              if (typeof alias === 'string') {
                additions[prefix][alias] = icon;
              }
            });
          }

          additions[prefix][iconName] = icon;
        });
        return additions;
      }
    }]);

    return Library;
  }();

  var _plugins = [];
  var _hooks = {};
  var providers = {};
  var defaultProviderKeys = Object.keys(providers);
  function registerPlugins(nextPlugins, _ref) {
    var obj = _ref.mixoutsTo;
    _plugins = nextPlugins;
    _hooks = {};
    Object.keys(providers).forEach(function (k) {
      if (defaultProviderKeys.indexOf(k) === -1) {
        delete providers[k];
      }
    });

    _plugins.forEach(function (plugin) {
      var mixout = plugin.mixout ? plugin.mixout() : {};
      Object.keys(mixout).forEach(function (tk) {
        if (typeof mixout[tk] === 'function') {
          obj[tk] = mixout[tk];
        }

        if (_typeof(mixout[tk]) === 'object') {
          Object.keys(mixout[tk]).forEach(function (sk) {
            if (!obj[tk]) {
              obj[tk] = {};
            }

            obj[tk][sk] = mixout[tk][sk];
          });
        }
      });

      if (plugin.hooks) {
        var hooks = plugin.hooks();
        Object.keys(hooks).forEach(function (hook) {
          if (!_hooks[hook]) {
            _hooks[hook] = [];
          }

          _hooks[hook].push(hooks[hook]);
        });
      }

      if (plugin.provides) {
        plugin.provides(providers);
      }
    });

    return obj;
  }
  function chainHooks(hook, accumulator) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var hookFns = _hooks[hook] || [];
    hookFns.forEach(function (hookFn) {
      accumulator = hookFn.apply(null, [accumulator].concat(args)); // eslint-disable-line no-useless-call
    });
    return accumulator;
  }
  function callHooks(hook) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var hookFns = _hooks[hook] || [];
    hookFns.forEach(function (hookFn) {
      hookFn.apply(null, args);
    });
    return undefined;
  }
  function callProvided() {
    var hook = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return providers[hook] ? providers[hook].apply(null, args) : undefined;
  }

  function findIconDefinition(iconLookup) {
    if (iconLookup.prefix === 'fa') {
      iconLookup.prefix = 'fas';
    }

    var iconName = iconLookup.iconName;
    var prefix = iconLookup.prefix || getDefaultUsablePrefix();
    if (!iconName) return;
    iconName = byAlias(prefix, iconName) || iconName;
    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
  }
  var library = new Library();
  var noAuto = function noAuto() {
    config.autoReplaceSvg = false;
    config.observeMutations = false;
    callHooks('noAuto');
  };
  var dom = {
    i2svg: function i2svg() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (IS_DOM) {
        callHooks('beforeI2svg', params);
        callProvided('pseudoElements2svg', params);
        return callProvided('i2svg', params);
      } else {
        return Promise.reject('Operation requires a DOM of some kind.');
      }
    },
    watch: function watch() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var autoReplaceSvgRoot = params.autoReplaceSvgRoot;

      if (config.autoReplaceSvg === false) {
        config.autoReplaceSvg = true;
      }

      config.observeMutations = true;
      domready(function () {
        autoReplace({
          autoReplaceSvgRoot: autoReplaceSvgRoot
        });
        callHooks('watch', params);
      });
    }
  };
  var parse = {
    icon: function icon(_icon) {
      if (_icon === null) {
        return null;
      }

      if (_typeof(_icon) === 'object' && _icon.prefix && _icon.iconName) {
        return {
          prefix: _icon.prefix,
          iconName: byAlias(_icon.prefix, _icon.iconName) || _icon.iconName
        };
      }

      if (Array.isArray(_icon) && _icon.length === 2) {
        var iconName = _icon[1].indexOf('fa-') === 0 ? _icon[1].slice(3) : _icon[1];
        var prefix = getCanonicalPrefix(_icon[0]);
        return {
          prefix: prefix,
          iconName: byAlias(prefix, iconName) || iconName
        };
      }

      if (typeof _icon === 'string' && (_icon.indexOf("".concat(config.cssPrefix, "-")) > -1 || _icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
        var canonicalIcon = getCanonicalIcon(_icon.split(' '), {
          skipLookups: true
        });
        return {
          prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
          iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
        };
      }

      if (typeof _icon === 'string') {
        var _prefix = getDefaultUsablePrefix();

        return {
          prefix: _prefix,
          iconName: byAlias(_prefix, _icon) || _icon
        };
      }
    }
  };
  var api = {
    noAuto: noAuto,
    config: config,
    dom: dom,
    parse: parse,
    library: library,
    findIconDefinition: findIconDefinition,
    toHtml: toHtml
  };

  var autoReplace = function autoReplace() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _params$autoReplaceSv = params.autoReplaceSvgRoot,
        autoReplaceSvgRoot = _params$autoReplaceSv === void 0 ? DOCUMENT : _params$autoReplaceSv;
    if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
      node: autoReplaceSvgRoot
    });
  };

  function bootstrap(plugins) {
    if (IS_BROWSER) {
      if (!WINDOW.FontAwesome) {
        WINDOW.FontAwesome = api;
      }

      domready(function () {
        autoReplace();
        callHooks('bootstrap');
      });
    }

    namespace.hooks = _objectSpread2(_objectSpread2({}, namespace.hooks), {}, {
      addPack: function addPack(prefix, icons) {
        namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), icons);
        build();
        autoReplace();
      },
      addPacks: function addPacks(packs) {
        packs.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              prefix = _ref2[0],
              icons = _ref2[1];

          namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), icons);
        });
        build();
        autoReplace();
      },
      addShims: function addShims(shims) {
        var _namespace$shims;

        (_namespace$shims = namespace.shims).push.apply(_namespace$shims, _toConsumableArray(shims));

        build();
        autoReplace();
      }
    });
  }

  function domVariants(val, abstractCreator) {
    Object.defineProperty(val, 'abstract', {
      get: abstractCreator
    });
    Object.defineProperty(val, 'html', {
      get: function get() {
        return val.abstract.map(function (a) {
          return toHtml(a);
        });
      }
    });
    Object.defineProperty(val, 'node', {
      get: function get() {
        if (!IS_DOM) return;
        var container = DOCUMENT.createElement('div');
        container.innerHTML = val.html;
        return container.children;
      }
    });
    return val;
  }

  function asIcon (_ref) {
    var children = _ref.children,
        main = _ref.main,
        mask = _ref.mask,
        attributes = _ref.attributes,
        styles = _ref.styles,
        transform = _ref.transform;

    if (transformIsMeaningful(transform) && main.found && !mask.found) {
      var width = main.width,
          height = main.height;
      var offset = {
        x: width / height / 2,
        y: 0.5
      };
      attributes['style'] = joinStyles(_objectSpread2(_objectSpread2({}, styles), {}, {
        'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
      }));
    }

    return [{
      tag: 'svg',
      attributes: attributes,
      children: children
    }];
  }

  function asSymbol (_ref) {
    var prefix = _ref.prefix,
        iconName = _ref.iconName,
        children = _ref.children,
        attributes = _ref.attributes,
        symbol = _ref.symbol;
    var id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
    return [{
      tag: 'svg',
      attributes: {
        style: 'display: none;'
      },
      children: [{
        tag: 'symbol',
        attributes: _objectSpread2(_objectSpread2({}, attributes), {}, {
          id: id
        }),
        children: children
      }]
    }];
  }

  function makeInlineSvgAbstract(params) {
    var _params$icons = params.icons,
        main = _params$icons.main,
        mask = _params$icons.mask,
        prefix = params.prefix,
        iconName = params.iconName,
        transform = params.transform,
        symbol = params.symbol,
        title = params.title,
        maskId = params.maskId,
        titleId = params.titleId,
        extra = params.extra,
        _params$watchable = params.watchable,
        watchable = _params$watchable === void 0 ? false : _params$watchable;

    var _ref = mask.found ? mask : main,
        width = _ref.width,
        height = _ref.height;

    var isUploadedIcon = prefix === 'fak';
    var attrClass = [config.replacementClass, iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ''].filter(function (c) {
      return extra.classes.indexOf(c) === -1;
    }).filter(function (c) {
      return c !== '' || !!c;
    }).concat(extra.classes).join(' ');
    var content = {
      children: [],
      attributes: _objectSpread2(_objectSpread2({}, extra.attributes), {}, {
        'data-prefix': prefix,
        'data-icon': iconName,
        'class': attrClass,
        'role': extra.attributes.role || 'img',
        'xmlns': 'http://www.w3.org/2000/svg',
        'viewBox': "0 0 ".concat(width, " ").concat(height)
      })
    };
    var uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf('fa-fw') ? {
      width: "".concat(width / height * 16 * 0.0625, "em")
    } : {};

    if (watchable) {
      content.attributes[DATA_FA_I2SVG] = '';
    }

    if (title) {
      content.children.push({
        tag: 'title',
        attributes: {
          id: content.attributes['aria-labelledby'] || "title-".concat(titleId || nextUniqueId())
        },
        children: [title]
      });
      delete content.attributes.title;
    }

    var args = _objectSpread2(_objectSpread2({}, content), {}, {
      prefix: prefix,
      iconName: iconName,
      main: main,
      mask: mask,
      maskId: maskId,
      transform: transform,
      symbol: symbol,
      styles: _objectSpread2(_objectSpread2({}, uploadedIconWidthStyle), extra.styles)
    });

    var _ref2 = mask.found && main.found ? callProvided('generateAbstractMask', args) || {
      children: [],
      attributes: {}
    } : callProvided('generateAbstractIcon', args) || {
      children: [],
      attributes: {}
    },
        children = _ref2.children,
        attributes = _ref2.attributes;

    args.children = children;
    args.attributes = attributes;

    if (symbol) {
      return asSymbol(args);
    } else {
      return asIcon(args);
    }
  }
  function makeLayersTextAbstract(params) {
    var content = params.content,
        width = params.width,
        height = params.height,
        transform = params.transform,
        title = params.title,
        extra = params.extra,
        _params$watchable2 = params.watchable,
        watchable = _params$watchable2 === void 0 ? false : _params$watchable2;

    var attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
      'title': title
    } : {}), {}, {
      'class': extra.classes.join(' ')
    });

    if (watchable) {
      attributes[DATA_FA_I2SVG] = '';
    }

    var styles = _objectSpread2({}, extra.styles);

    if (transformIsMeaningful(transform)) {
      styles['transform'] = transformForCss({
        transform: transform,
        startCentered: true,
        width: width,
        height: height
      });
      styles['-webkit-transform'] = styles['transform'];
    }

    var styleString = joinStyles(styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    var val = [];
    val.push({
      tag: 'span',
      attributes: attributes,
      children: [content]
    });

    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }

    return val;
  }
  function makeLayersCounterAbstract(params) {
    var content = params.content,
        title = params.title,
        extra = params.extra;

    var attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
      'title': title
    } : {}), {}, {
      'class': extra.classes.join(' ')
    });

    var styleString = joinStyles(extra.styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    var val = [];
    val.push({
      tag: 'span',
      attributes: attributes,
      children: [content]
    });

    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }

    return val;
  }

  var styles$1 = namespace.styles;
  function asFoundIcon(icon) {
    var width = icon[0];
    var height = icon[1];

    var _icon$slice = icon.slice(4),
        _icon$slice2 = _slicedToArray(_icon$slice, 1),
        vectorData = _icon$slice2[0];

    var element = null;

    if (Array.isArray(vectorData)) {
      element = {
        tag: 'g',
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
        },
        children: [{
          tag: 'path',
          attributes: {
            class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
            fill: 'currentColor',
            d: vectorData[0]
          }
        }, {
          tag: 'path',
          attributes: {
            class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
            fill: 'currentColor',
            d: vectorData[1]
          }
        }]
      };
    } else {
      element = {
        tag: 'path',
        attributes: {
          fill: 'currentColor',
          d: vectorData
        }
      };
    }

    return {
      found: true,
      width: width,
      height: height,
      icon: element
    };
  }
  var missingIconResolutionMixin = {
    found: false,
    width: 512,
    height: 512
  };

  function maybeNotifyMissing(iconName, prefix) {
    if (!PRODUCTION && !config.showMissingIcons && iconName) {
      console.error("Icon with name \"".concat(iconName, "\" and prefix \"").concat(prefix, "\" is missing."));
    }
  }

  function findIcon(iconName, prefix) {
    var givenPrefix = prefix;

    if (prefix === 'fa' && config.styleDefault !== null) {
      prefix = getDefaultUsablePrefix();
    }

    return new Promise(function (resolve, reject) {
      var val = {
        found: false,
        width: 512,
        height: 512,
        icon: callProvided('missingIconAbstract') || {}
      };

      if (givenPrefix === 'fa') {
        var shim = byOldName(iconName) || {};
        iconName = shim.iconName || iconName;
        prefix = shim.prefix || prefix;
      }

      if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
        var icon = styles$1[prefix][iconName];
        return resolve(asFoundIcon(icon));
      }

      maybeNotifyMissing(iconName, prefix);
      resolve(_objectSpread2(_objectSpread2({}, missingIconResolutionMixin), {}, {
        icon: config.showMissingIcons && iconName ? callProvided('missingIconAbstract') || {} : {}
      }));
    });
  }

  var noop$1 = function noop() {};

  var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
  };
  var preamble = "FA \"6.4.0\"";

  var begin = function begin(name) {
    p.mark("".concat(preamble, " ").concat(name, " begins"));
    return function () {
      return end(name);
    };
  };

  var end = function end(name) {
    p.mark("".concat(preamble, " ").concat(name, " ends"));
    p.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
  };

  var perf = {
    begin: begin,
    end: end
  };

  var noop$2 = function noop() {};

  function isWatched(node) {
    var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
    return typeof i2svg === 'string';
  }

  function hasPrefixAndIcon(node) {
    var prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
    var icon = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
    return prefix && icon;
  }

  function hasBeenReplaced(node) {
    return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
  }

  function getMutator() {
    if (config.autoReplaceSvg === true) {
      return mutators.replace;
    }

    var mutator = mutators[config.autoReplaceSvg];
    return mutator || mutators.replace;
  }

  function createElementNS(tag) {
    return DOCUMENT.createElementNS('http://www.w3.org/2000/svg', tag);
  }

  function createElement(tag) {
    return DOCUMENT.createElement(tag);
  }

  function convertSVG(abstractObj) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$ceFn = params.ceFn,
        ceFn = _params$ceFn === void 0 ? abstractObj.tag === 'svg' ? createElementNS : createElement : _params$ceFn;

    if (typeof abstractObj === 'string') {
      return DOCUMENT.createTextNode(abstractObj);
    }

    var tag = ceFn(abstractObj.tag);
    Object.keys(abstractObj.attributes || []).forEach(function (key) {
      tag.setAttribute(key, abstractObj.attributes[key]);
    });
    var children = abstractObj.children || [];
    children.forEach(function (child) {
      tag.appendChild(convertSVG(child, {
        ceFn: ceFn
      }));
    });
    return tag;
  }

  function nodeAsComment(node) {
    var comment = " ".concat(node.outerHTML, " ");
    return comment;
  }

  var mutators = {
    replace: function replace(mutation) {
      var node = mutation[0];

      if (node.parentNode) {
        mutation[1].forEach(function (_abstract) {
          node.parentNode.insertBefore(convertSVG(_abstract), node);
        });

        if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
          var comment = DOCUMENT.createComment(nodeAsComment(node));
          node.parentNode.replaceChild(comment, node);
        } else {
          node.remove();
        }
      }
    },
    nest: function nest(mutation) {
      var node = mutation[0];
      var _abstract2 = mutation[1]; // If we already have a replaced node we do not want to continue nesting within it.
      // Short-circuit to the standard replacement

      if (~classArray(node).indexOf(config.replacementClass)) {
        return mutators.replace(mutation);
      }

      var forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
      delete _abstract2[0].attributes.id;

      if (_abstract2[0].attributes.class) {
        var splitClasses = _abstract2[0].attributes.class.split(' ').reduce(function (acc, cls) {
          if (cls === config.replacementClass || cls.match(forSvg)) {
            acc.toSvg.push(cls);
          } else {
            acc.toNode.push(cls);
          }

          return acc;
        }, {
          toNode: [],
          toSvg: []
        });

        _abstract2[0].attributes.class = splitClasses.toSvg.join(' ');

        if (splitClasses.toNode.length === 0) {
          node.removeAttribute('class');
        } else {
          node.setAttribute('class', splitClasses.toNode.join(' '));
        }
      }

      var newInnerHTML = _abstract2.map(function (a) {
        return toHtml(a);
      }).join('\n');

      node.setAttribute(DATA_FA_I2SVG, '');
      node.innerHTML = newInnerHTML;
    }
  };

  function performOperationSync(op) {
    op();
  }

  function perform(mutations, callback) {
    var callbackFunction = typeof callback === 'function' ? callback : noop$2;

    if (mutations.length === 0) {
      callbackFunction();
    } else {
      var frame = performOperationSync;

      if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
        frame = WINDOW.requestAnimationFrame || performOperationSync;
      }

      frame(function () {
        var mutator = getMutator();
        var mark = perf.begin('mutate');
        mutations.map(mutator);
        mark();
        callbackFunction();
      });
    }
  }
  var disabled = false;
  function disableObservation() {
    disabled = true;
  }
  function enableObservation() {
    disabled = false;
  }
  var mo = null;
  function observe(options) {
    if (!MUTATION_OBSERVER) {
      return;
    }

    if (!config.observeMutations) {
      return;
    }

    var _options$treeCallback = options.treeCallback,
        treeCallback = _options$treeCallback === void 0 ? noop$2 : _options$treeCallback,
        _options$nodeCallback = options.nodeCallback,
        nodeCallback = _options$nodeCallback === void 0 ? noop$2 : _options$nodeCallback,
        _options$pseudoElemen = options.pseudoElementsCallback,
        pseudoElementsCallback = _options$pseudoElemen === void 0 ? noop$2 : _options$pseudoElemen,
        _options$observeMutat = options.observeMutationsRoot,
        observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;
    mo = new MUTATION_OBSERVER(function (objects) {
      if (disabled) return;
      var defaultPrefix = getDefaultUsablePrefix();
      toArray(objects).forEach(function (mutationRecord) {
        if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
          if (config.searchPseudoElements) {
            pseudoElementsCallback(mutationRecord.target);
          }

          treeCallback(mutationRecord.target);
        }

        if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target.parentNode);
        }

        if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
          if (mutationRecord.attributeName === 'class' && hasPrefixAndIcon(mutationRecord.target)) {
            var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),
                prefix = _getCanonicalIcon.prefix,
                iconName = _getCanonicalIcon.iconName;

            mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
            if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
          } else if (hasBeenReplaced(mutationRecord.target)) {
            nodeCallback(mutationRecord.target);
          }
        }
      });
    });
    if (!IS_DOM) return;
    mo.observe(observeMutationsRoot, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    });
  }
  function disconnect() {
    if (!mo) return;
    mo.disconnect();
  }

  function styleParser (node) {
    var style = node.getAttribute('style');
    var val = [];

    if (style) {
      val = style.split(';').reduce(function (acc, style) {
        var styles = style.split(':');
        var prop = styles[0];
        var value = styles.slice(1);

        if (prop && value.length > 0) {
          acc[prop] = value.join(':').trim();
        }

        return acc;
      }, {});
    }

    return val;
  }

  function classParser (node) {
    var existingPrefix = node.getAttribute('data-prefix');
    var existingIconName = node.getAttribute('data-icon');
    var innerText = node.innerText !== undefined ? node.innerText.trim() : '';
    var val = getCanonicalIcon(classArray(node));

    if (!val.prefix) {
      val.prefix = getDefaultUsablePrefix();
    }

    if (existingPrefix && existingIconName) {
      val.prefix = existingPrefix;
      val.iconName = existingIconName;
    }

    if (val.iconName && val.prefix) {
      return val;
    }

    if (val.prefix && innerText.length > 0) {
      val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
    }

    if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
      val.iconName = node.firstChild.data;
    }

    return val;
  }

  function attributesParser (node) {
    var extraAttributes = toArray(node.attributes).reduce(function (acc, attr) {
      if (acc.name !== 'class' && acc.name !== 'style') {
        acc[attr.name] = attr.value;
      }

      return acc;
    }, {});
    var title = node.getAttribute('title');
    var titleId = node.getAttribute('data-fa-title-id');

    if (config.autoA11y) {
      if (title) {
        extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        extraAttributes['aria-hidden'] = 'true';
        extraAttributes['focusable'] = 'false';
      }
    }

    return extraAttributes;
  }

  function blankMeta() {
    return {
      iconName: null,
      title: null,
      titleId: null,
      prefix: null,
      transform: meaninglessTransform,
      symbol: false,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      extra: {
        classes: [],
        styles: {},
        attributes: {}
      }
    };
  }
  function parseMeta(node) {
    var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      styleParser: true
    };

    var _classParser = classParser(node),
        iconName = _classParser.iconName,
        prefix = _classParser.prefix,
        extraClasses = _classParser.rest;

    var extraAttributes = attributesParser(node);
    var pluginMeta = chainHooks('parseNodeAttributes', {}, node);
    var extraStyles = parser.styleParser ? styleParser(node) : [];
    return _objectSpread2({
      iconName: iconName,
      title: node.getAttribute('title'),
      titleId: node.getAttribute('data-fa-title-id'),
      prefix: prefix,
      transform: meaninglessTransform,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      symbol: false,
      extra: {
        classes: extraClasses,
        styles: extraStyles,
        attributes: extraAttributes
      }
    }, pluginMeta);
  }

  var styles$2 = namespace.styles;

  function generateMutation(node) {
    var nodeMeta = config.autoReplaceSvg === 'nest' ? parseMeta(node, {
      styleParser: false
    }) : parseMeta(node);

    if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
      return callProvided('generateLayersText', node, nodeMeta);
    } else {
      return callProvided('generateSvgReplacementMutation', node, nodeMeta);
    }
  }

  var knownPrefixes = new Set();
  FAMILIES.map(function (family) {
    knownPrefixes.add("fa-".concat(family));
  });
  Object.keys(PREFIX_TO_STYLE[FAMILY_CLASSIC]).map(knownPrefixes.add.bind(knownPrefixes));
  Object.keys(PREFIX_TO_STYLE[FAMILY_SHARP]).map(knownPrefixes.add.bind(knownPrefixes));
  knownPrefixes = _toConsumableArray(knownPrefixes);

  function onTree(root) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!IS_DOM) return Promise.resolve();
    var htmlClassList = DOCUMENT.documentElement.classList;

    var hclAdd = function hclAdd(suffix) {
      return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };

    var hclRemove = function hclRemove(suffix) {
      return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };

    var prefixes = config.autoFetchSvg ? knownPrefixes : FAMILIES.map(function (f) {
      return "fa-".concat(f);
    }).concat(Object.keys(styles$2));

    if (!prefixes.includes('fa')) {
      prefixes.push('fa');
    }

    var prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(function (p) {
      return ".".concat(p, ":not([").concat(DATA_FA_I2SVG, "])");
    })).join(', ');

    if (prefixesDomQuery.length === 0) {
      return Promise.resolve();
    }

    var candidates = [];

    try {
      candidates = toArray(root.querySelectorAll(prefixesDomQuery));
    } catch (e) {// noop
    }

    if (candidates.length > 0) {
      hclAdd('pending');
      hclRemove('complete');
    } else {
      return Promise.resolve();
    }

    var mark = perf.begin('onTree');
    var mutations = candidates.reduce(function (acc, node) {
      try {
        var mutation = generateMutation(node);

        if (mutation) {
          acc.push(mutation);
        }
      } catch (e) {
        if (!PRODUCTION) {
          if (e.name === 'MissingIcon') {
            console.error(e);
          }
        }
      }

      return acc;
    }, []);
    return new Promise(function (resolve, reject) {
      Promise.all(mutations).then(function (resolvedMutations) {
        perform(resolvedMutations, function () {
          hclAdd('active');
          hclAdd('complete');
          hclRemove('pending');
          if (typeof callback === 'function') callback();
          mark();
          resolve();
        });
      }).catch(function (e) {
        mark();
        reject(e);
      });
    });
  }

  function onNode(node) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    generateMutation(node).then(function (mutation) {
      if (mutation) {
        perform([mutation], callback);
      }
    });
  }

  function resolveIcons(next) {
    return function (maybeIconDefinition) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
      var mask = params.mask;

      if (mask) {
        mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
      }

      return next(iconDefinition, _objectSpread2(_objectSpread2({}, params), {}, {
        mask: mask
      }));
    };
  }

  var render = function render(iconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$transform = params.transform,
        transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
        _params$symbol = params.symbol,
        symbol = _params$symbol === void 0 ? false : _params$symbol,
        _params$mask = params.mask,
        mask = _params$mask === void 0 ? null : _params$mask,
        _params$maskId = params.maskId,
        maskId = _params$maskId === void 0 ? null : _params$maskId,
        _params$title = params.title,
        title = _params$title === void 0 ? null : _params$title,
        _params$titleId = params.titleId,
        titleId = _params$titleId === void 0 ? null : _params$titleId,
        _params$classes = params.classes,
        classes = _params$classes === void 0 ? [] : _params$classes,
        _params$attributes = params.attributes,
        attributes = _params$attributes === void 0 ? {} : _params$attributes,
        _params$styles = params.styles,
        styles = _params$styles === void 0 ? {} : _params$styles;
    if (!iconDefinition) return;
    var prefix = iconDefinition.prefix,
        iconName = iconDefinition.iconName,
        icon = iconDefinition.icon;
    return domVariants(_objectSpread2({
      type: 'icon'
    }, iconDefinition), function () {
      callHooks('beforeDOMElementCreation', {
        iconDefinition: iconDefinition,
        params: params
      });

      if (config.autoA11y) {
        if (title) {
          attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
        } else {
          attributes['aria-hidden'] = 'true';
          attributes['focusable'] = 'false';
        }
      }

      return makeInlineSvgAbstract({
        icons: {
          main: asFoundIcon(icon),
          mask: mask ? asFoundIcon(mask.icon) : {
            found: false,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: prefix,
        iconName: iconName,
        transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
        symbol: symbol,
        title: title,
        maskId: maskId,
        titleId: titleId,
        extra: {
          attributes: attributes,
          styles: styles,
          classes: classes
        }
      });
    });
  };
  var ReplaceElements = {
    mixout: function mixout() {
      return {
        icon: resolveIcons(render)
      };
    },
    hooks: function hooks() {
      return {
        mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
          accumulator.treeCallback = onTree;
          accumulator.nodeCallback = onNode;
          return accumulator;
        }
      };
    },
    provides: function provides(providers$$1) {
      providers$$1.i2svg = function (params) {
        var _params$node = params.node,
            node = _params$node === void 0 ? DOCUMENT : _params$node,
            _params$callback = params.callback,
            callback = _params$callback === void 0 ? function () {} : _params$callback;
        return onTree(node, callback);
      };

      providers$$1.generateSvgReplacementMutation = function (node, nodeMeta) {
        var iconName = nodeMeta.iconName,
            title = nodeMeta.title,
            titleId = nodeMeta.titleId,
            prefix = nodeMeta.prefix,
            transform = nodeMeta.transform,
            symbol = nodeMeta.symbol,
            mask = nodeMeta.mask,
            maskId = nodeMeta.maskId,
            extra = nodeMeta.extra;
        return new Promise(function (resolve, reject) {
          Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
            found: false,
            width: 512,
            height: 512,
            icon: {}
          })]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                main = _ref2[0],
                mask = _ref2[1];

            resolve([node, makeInlineSvgAbstract({
              icons: {
                main: main,
                mask: mask
              },
              prefix: prefix,
              iconName: iconName,
              transform: transform,
              symbol: symbol,
              maskId: maskId,
              title: title,
              titleId: titleId,
              extra: extra,
              watchable: true
            })]);
          }).catch(reject);
        });
      };

      providers$$1.generateAbstractIcon = function (_ref3) {
        var children = _ref3.children,
            attributes = _ref3.attributes,
            main = _ref3.main,
            transform = _ref3.transform,
            styles = _ref3.styles;
        var styleString = joinStyles(styles);

        if (styleString.length > 0) {
          attributes['style'] = styleString;
        }

        var nextChild;

        if (transformIsMeaningful(transform)) {
          nextChild = callProvided('generateAbstractTransformGrouping', {
            main: main,
            transform: transform,
            containerWidth: main.width,
            iconWidth: main.width
          });
        }

        children.push(nextChild || main.icon);
        return {
          children: children,
          attributes: attributes
        };
      };
    }
  };

  var Layers = {
    mixout: function mixout() {
      return {
        layer: function layer(assembler) {
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var _params$classes = params.classes,
              classes = _params$classes === void 0 ? [] : _params$classes;
          return domVariants({
            type: 'layer'
          }, function () {
            callHooks('beforeDOMElementCreation', {
              assembler: assembler,
              params: params
            });
            var children = [];
            assembler(function (args) {
              Array.isArray(args) ? args.map(function (a) {
                children = children.concat(a.abstract);
              }) : children = children.concat(args.abstract);
            });
            return [{
              tag: 'span',
              attributes: {
                class: ["".concat(config.cssPrefix, "-layers")].concat(_toConsumableArray(classes)).join(' ')
              },
              children: children
            }];
          });
        }
      };
    }
  };

  var LayersCounter = {
    mixout: function mixout() {
      return {
        counter: function counter(content) {
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var _params$title = params.title,
              title = _params$title === void 0 ? null : _params$title,
              _params$classes = params.classes,
              classes = _params$classes === void 0 ? [] : _params$classes,
              _params$attributes = params.attributes,
              attributes = _params$attributes === void 0 ? {} : _params$attributes,
              _params$styles = params.styles,
              styles = _params$styles === void 0 ? {} : _params$styles;
          return domVariants({
            type: 'counter',
            content: content
          }, function () {
            callHooks('beforeDOMElementCreation', {
              content: content,
              params: params
            });
            return makeLayersCounterAbstract({
              content: content.toString(),
              title: title,
              extra: {
                attributes: attributes,
                styles: styles,
                classes: ["".concat(config.cssPrefix, "-layers-counter")].concat(_toConsumableArray(classes))
              }
            });
          });
        }
      };
    }
  };

  var LayersText = {
    mixout: function mixout() {
      return {
        text: function text(content) {
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var _params$transform = params.transform,
              transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
              _params$title = params.title,
              title = _params$title === void 0 ? null : _params$title,
              _params$classes = params.classes,
              classes = _params$classes === void 0 ? [] : _params$classes,
              _params$attributes = params.attributes,
              attributes = _params$attributes === void 0 ? {} : _params$attributes,
              _params$styles = params.styles,
              styles = _params$styles === void 0 ? {} : _params$styles;
          return domVariants({
            type: 'text',
            content: content
          }, function () {
            callHooks('beforeDOMElementCreation', {
              content: content,
              params: params
            });
            return makeLayersTextAbstract({
              content: content,
              transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
              title: title,
              extra: {
                attributes: attributes,
                styles: styles,
                classes: ["".concat(config.cssPrefix, "-layers-text")].concat(_toConsumableArray(classes))
              }
            });
          });
        }
      };
    },
    provides: function provides(providers$$1) {
      providers$$1.generateLayersText = function (node, nodeMeta) {
        var title = nodeMeta.title,
            transform = nodeMeta.transform,
            extra = nodeMeta.extra;
        var width = null;
        var height = null;

        if (IS_IE) {
          var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
          var boundingClientRect = node.getBoundingClientRect();
          width = boundingClientRect.width / computedFontSize;
          height = boundingClientRect.height / computedFontSize;
        }

        if (config.autoA11y && !title) {
          extra.attributes['aria-hidden'] = 'true';
        }

        return Promise.resolve([node, makeLayersTextAbstract({
          content: node.innerHTML,
          width: width,
          height: height,
          transform: transform,
          title: title,
          extra: extra,
          watchable: true
        })]);
      };
    }
  };

  var CLEAN_CONTENT_PATTERN = new RegExp("\"", 'ug');
  var SECONDARY_UNICODE_RANGE = [1105920, 1112319];
  function hexValueFromContent(content) {
    var cleaned = content.replace(CLEAN_CONTENT_PATTERN, '');
    var codePoint = codePointAt(cleaned, 0);
    var isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
    var isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
    return {
      value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
      isSecondary: isPrependTen || isDoubled
    };
  }

  function replaceForPosition(node, position) {
    var pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));
    return new Promise(function (resolve, reject) {
      if (node.getAttribute(pendingAttribute) !== null) {
        // This node is already being processed
        return resolve();
      }

      var children = toArray(node.children);
      var alreadyProcessedPseudoElement = children.filter(function (c) {
        return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;
      })[0];
      var styles = WINDOW.getComputedStyle(node, position);
      var fontFamily = styles.getPropertyValue('font-family').match(FONT_FAMILY_PATTERN);
      var fontWeight = styles.getPropertyValue('font-weight');
      var content = styles.getPropertyValue('content');

      if (alreadyProcessedPseudoElement && !fontFamily) {
        // If we've already processed it but the current computed style does not result in a font-family,
        // that probably means that a class name that was previously present to make the icon has been
        // removed. So we now should delete the icon.
        node.removeChild(alreadyProcessedPseudoElement);
        return resolve();
      } else if (fontFamily && content !== 'none' && content !== '') {
        var _content = styles.getPropertyValue('content');

        var family = ~['Sharp'].indexOf(fontFamily[2]) ? FAMILY_SHARP : FAMILY_CLASSIC;
        var prefix = ~['Solid', 'Regular', 'Light', 'Thin', 'Duotone', 'Brands', 'Kit'].indexOf(fontFamily[2]) ? STYLE_TO_PREFIX[family][fontFamily[2].toLowerCase()] : FONT_WEIGHT_TO_PREFIX[family][fontWeight];

        var _hexValueFromContent = hexValueFromContent(_content),
            hexValue = _hexValueFromContent.value,
            isSecondary = _hexValueFromContent.isSecondary;

        var isV4 = fontFamily[0].startsWith('FontAwesome');
        var iconName = byUnicode(prefix, hexValue);
        var iconIdentifier = iconName;

        if (isV4) {
          var iconName4 = byOldUnicode(hexValue);

          if (iconName4.iconName && iconName4.prefix) {
            iconName = iconName4.iconName;
            prefix = iconName4.prefix;
          }
        } // Only convert the pseudo element in this ::before/::after position into an icon if we haven't
        // already done so with the same prefix and iconName


        if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
          node.setAttribute(pendingAttribute, iconIdentifier);

          if (alreadyProcessedPseudoElement) {
            // Delete the old one, since we're replacing it with a new one
            node.removeChild(alreadyProcessedPseudoElement);
          }

          var meta = blankMeta();
          var extra = meta.extra;
          extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
          findIcon(iconName, prefix).then(function (main) {
            var _abstract = makeInlineSvgAbstract(_objectSpread2(_objectSpread2({}, meta), {}, {
              icons: {
                main: main,
                mask: emptyCanonicalIcon()
              },
              prefix: prefix,
              iconName: iconIdentifier,
              extra: extra,
              watchable: true
            }));

            var element = DOCUMENT.createElement('svg');

            if (position === '::before') {
              node.insertBefore(element, node.firstChild);
            } else {
              node.appendChild(element);
            }

            element.outerHTML = _abstract.map(function (a) {
              return toHtml(a);
            }).join('\n');
            node.removeAttribute(pendingAttribute);
            resolve();
          }).catch(reject);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }

  function replace(node) {
    return Promise.all([replaceForPosition(node, '::before'), replaceForPosition(node, '::after')]);
  }

  function processable(node) {
    return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');
  }

  function searchPseudoElements(root) {
    if (!IS_DOM) return;
    return new Promise(function (resolve, reject) {
      var operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);
      var end = perf.begin('searchPseudoElements');
      disableObservation();
      Promise.all(operations).then(function () {
        end();
        enableObservation();
        resolve();
      }).catch(function () {
        end();
        enableObservation();
        reject();
      });
    });
  }

  var PseudoElements = {
    hooks: function hooks() {
      return {
        mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
          accumulator.pseudoElementsCallback = searchPseudoElements;
          return accumulator;
        }
      };
    },
    provides: function provides(providers$$1) {
      providers$$1.pseudoElements2svg = function (params) {
        var _params$node = params.node,
            node = _params$node === void 0 ? DOCUMENT : _params$node;

        if (config.searchPseudoElements) {
          searchPseudoElements(node);
        }
      };
    }
  };

  var _unwatched = false;
  var MutationObserver$1 = {
    mixout: function mixout() {
      return {
        dom: {
          unwatch: function unwatch() {
            disableObservation();
            _unwatched = true;
          }
        }
      };
    },
    hooks: function hooks() {
      return {
        bootstrap: function bootstrap() {
          observe(chainHooks('mutationObserverCallbacks', {}));
        },
        noAuto: function noAuto() {
          disconnect();
        },
        watch: function watch(params) {
          var observeMutationsRoot = params.observeMutationsRoot;

          if (_unwatched) {
            enableObservation();
          } else {
            observe(chainHooks('mutationObserverCallbacks', {
              observeMutationsRoot: observeMutationsRoot
            }));
          }
        }
      };
    }
  };

  var parseTransformString = function parseTransformString(transformString) {
    var transform = {
      size: 16,
      x: 0,
      y: 0,
      flipX: false,
      flipY: false,
      rotate: 0
    };
    return transformString.toLowerCase().split(' ').reduce(function (acc, n) {
      var parts = n.toLowerCase().split('-');
      var first = parts[0];
      var rest = parts.slice(1).join('-');

      if (first && rest === 'h') {
        acc.flipX = true;
        return acc;
      }

      if (first && rest === 'v') {
        acc.flipY = true;
        return acc;
      }

      rest = parseFloat(rest);

      if (isNaN(rest)) {
        return acc;
      }

      switch (first) {
        case 'grow':
          acc.size = acc.size + rest;
          break;

        case 'shrink':
          acc.size = acc.size - rest;
          break;

        case 'left':
          acc.x = acc.x - rest;
          break;

        case 'right':
          acc.x = acc.x + rest;
          break;

        case 'up':
          acc.y = acc.y - rest;
          break;

        case 'down':
          acc.y = acc.y + rest;
          break;

        case 'rotate':
          acc.rotate = acc.rotate + rest;
          break;
      }

      return acc;
    }, transform);
  };
  var PowerTransforms = {
    mixout: function mixout() {
      return {
        parse: {
          transform: function transform(transformString) {
            return parseTransformString(transformString);
          }
        }
      };
    },
    hooks: function hooks() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var transformString = node.getAttribute('data-fa-transform');

          if (transformString) {
            accumulator.transform = parseTransformString(transformString);
          }

          return accumulator;
        }
      };
    },
    provides: function provides(providers) {
      providers.generateAbstractTransformGrouping = function (_ref) {
        var main = _ref.main,
            transform = _ref.transform,
            containerWidth = _ref.containerWidth,
            iconWidth = _ref.iconWidth;
        var outer = {
          transform: "translate(".concat(containerWidth / 2, " 256)")
        };
        var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
        var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
        var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
        var inner = {
          transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
        };
        var path = {
          transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
        };
        var operations = {
          outer: outer,
          inner: inner,
          path: path
        };
        return {
          tag: 'g',
          attributes: _objectSpread2({}, operations.outer),
          children: [{
            tag: 'g',
            attributes: _objectSpread2({}, operations.inner),
            children: [{
              tag: main.icon.tag,
              children: main.icon.children,
              attributes: _objectSpread2(_objectSpread2({}, main.icon.attributes), operations.path)
            }]
          }]
        };
      };
    }
  };

  var ALL_SPACE = {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%'
  };

  function fillBlack(_abstract) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (_abstract.attributes && (_abstract.attributes.fill || force)) {
      _abstract.attributes.fill = 'black';
    }

    return _abstract;
  }

  function deGroup(_abstract2) {
    if (_abstract2.tag === 'g') {
      return _abstract2.children;
    } else {
      return [_abstract2];
    }
  }

  var Masks = {
    hooks: function hooks() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var maskData = node.getAttribute('data-fa-mask');
          var mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(' ').map(function (i) {
            return i.trim();
          }));

          if (!mask.prefix) {
            mask.prefix = getDefaultUsablePrefix();
          }

          accumulator.mask = mask;
          accumulator.maskId = node.getAttribute('data-fa-mask-id');
          return accumulator;
        }
      };
    },
    provides: function provides(providers) {
      providers.generateAbstractMask = function (_ref) {
        var children = _ref.children,
            attributes = _ref.attributes,
            main = _ref.main,
            mask = _ref.mask,
            explicitMaskId = _ref.maskId,
            transform = _ref.transform;
        var mainWidth = main.width,
            mainPath = main.icon;
        var maskWidth = mask.width,
            maskPath = mask.icon;
        var trans = transformForSvg({
          transform: transform,
          containerWidth: maskWidth,
          iconWidth: mainWidth
        });
        var maskRect = {
          tag: 'rect',
          attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
            fill: 'white'
          })
        };
        var maskInnerGroupChildrenMixin = mainPath.children ? {
          children: mainPath.children.map(fillBlack)
        } : {};
        var maskInnerGroup = {
          tag: 'g',
          attributes: _objectSpread2({}, trans.inner),
          children: [fillBlack(_objectSpread2({
            tag: mainPath.tag,
            attributes: _objectSpread2(_objectSpread2({}, mainPath.attributes), trans.path)
          }, maskInnerGroupChildrenMixin))]
        };
        var maskOuterGroup = {
          tag: 'g',
          attributes: _objectSpread2({}, trans.outer),
          children: [maskInnerGroup]
        };
        var maskId = "mask-".concat(explicitMaskId || nextUniqueId());
        var clipId = "clip-".concat(explicitMaskId || nextUniqueId());
        var maskTag = {
          tag: 'mask',
          attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
            id: maskId,
            maskUnits: 'userSpaceOnUse',
            maskContentUnits: 'userSpaceOnUse'
          }),
          children: [maskRect, maskOuterGroup]
        };
        var defs = {
          tag: 'defs',
          children: [{
            tag: 'clipPath',
            attributes: {
              id: clipId
            },
            children: deGroup(maskPath)
          }, maskTag]
        };
        children.push(defs, {
          tag: 'rect',
          attributes: _objectSpread2({
            fill: 'currentColor',
            'clip-path': "url(#".concat(clipId, ")"),
            mask: "url(#".concat(maskId, ")")
          }, ALL_SPACE)
        });
        return {
          children: children,
          attributes: attributes
        };
      };
    }
  };

  var MissingIconIndicator = {
    provides: function provides(providers) {
      var reduceMotion = false;

      if (WINDOW.matchMedia) {
        reduceMotion = WINDOW.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }

      providers.missingIconAbstract = function () {
        var gChildren = [];
        var FILL = {
          fill: 'currentColor'
        };
        var ANIMATION_BASE = {
          attributeType: 'XML',
          repeatCount: 'indefinite',
          dur: '2s'
        }; // Ring

        gChildren.push({
          tag: 'path',
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
          })
        });

        var OPACITY_ANIMATE = _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
          attributeName: 'opacity'
        });

        var dot = {
          tag: 'circle',
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            cx: '256',
            cy: '364',
            r: '28'
          }),
          children: []
        };

        if (!reduceMotion) {
          dot.children.push({
            tag: 'animate',
            attributes: _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
              attributeName: 'r',
              values: '28;14;28;28;14;28;'
            })
          }, {
            tag: 'animate',
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: '1;0;1;1;0;1;'
            })
          });
        }

        gChildren.push(dot);
        gChildren.push({
          tag: 'path',
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            opacity: '1',
            d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
          }),
          children: reduceMotion ? [] : [{
            tag: 'animate',
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: '1;0;0;0;0;1;'
            })
          }]
        });

        if (!reduceMotion) {
          // Exclamation
          gChildren.push({
            tag: 'path',
            attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
              opacity: '0',
              d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
            }),
            children: [{
              tag: 'animate',
              attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
                values: '0;0;1;1;0;0;'
              })
            }]
          });
        }

        return {
          tag: 'g',
          attributes: {
            'class': 'missing'
          },
          children: gChildren
        };
      };
    }
  };

  var SvgSymbols = {
    hooks: function hooks() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var symbolData = node.getAttribute('data-fa-symbol');
          var symbol = symbolData === null ? false : symbolData === '' ? true : symbolData;
          accumulator['symbol'] = symbol;
          return accumulator;
        }
      };
    }
  };

  var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];

  registerPlugins(plugins, {
    mixoutsTo: api
  });
  bunker(bootstrap);

}());
