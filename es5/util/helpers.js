'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createSimpleFunctional = createSimpleFunctional;
exports.createSimpleTransition = createSimpleTransition;
exports.createSimpleTransitionGroup = createSimpleTransitionGroup;
exports.createJavaScriptTransition = createJavaScriptTransition;
exports.directiveConfig = directiveConfig;
exports.addOnceEventListener = addOnceEventListener;
exports.getObjectValueByPath = getObjectValueByPath;
exports.createRange = createRange;
exports.getZIndex = getZIndex;
exports.escapeHTML = escapeHTML;
exports.filterObjectOnKeys = filterObjectOnKeys;
exports.filterChildren = filterChildren;
exports.isServer = isServer;
exports.isBrowser = isBrowser;
exports.getElementOffset = getElementOffset;
exports.getElementRelativeOffset = getElementRelativeOffset;
exports.getDocumentHeight = getDocumentHeight;
exports.getWindowHeight = getWindowHeight;
exports.isVueComponent = isVueComponent;
exports.getElementHeight = getElementHeight;
exports.getElementWidth = getElementWidth;
exports.getElementScrollHeight = getElementScrollHeight;
exports.getElementScrollWidth = getElementScrollWidth;
exports.resolveElement = resolveElement;
exports.extractVNodeText = extractVNodeText;
exports.clampNumber = clampNumber;
exports.ensureNumber = ensureNumber;
exports.ensureString = ensureString;
exports.normalizeClassName = normalizeClassName;
exports.isObject = isObject;
exports.isBrowserSafari = isBrowserSafari;
exports.generateNumber = generateNumber;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {string} c
 * @param {string|*} el
 * @param {string} name
 * @return {Object}
 */
function createSimpleFunctional(c) {
  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  var name = arguments[2];

  name = name || c.replace(/__/g, '-');

  return {
    name: 'r-' + name,
    functional: true,

    render: function render(h, _ref) {
      var data = _ref.data,
          children = _ref.children;

      data.staticClass = normalizeClassName(c + ' ' + (data.staticClass || ''));

      return h(el, data, children);
    }
  };
}

/**
 * @param {string} name
 * @param {string} origin
 * @param {string} mode
 * @param {boolean} isGroup
 * @return {Object}
 */
function createSimpleTransition(name) {
  var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top center 0';
  var mode = arguments[2];
  var isGroup = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  return {
    name: name,

    functional: true,

    props: {
      origin: {
        type: String,
        default: origin
      }
    },

    render: function render(h, context) {
      context.data = context.data || {};
      context.data.props = { name: name };
      context.data.on = context.data.on || {};
      if (!Object.isExtensible(context.data.on)) {
        context.data.on = _extends({}, context.data.on);
      }

      if (mode) {
        context.data.props.mode = mode;
      }

      context.data.on.beforeEnter = function (el) {
        el.style.transformOrigin = context.props.origin;
        el.style.webkitTransformOrigin = context.props.origin;
      };

      var component = isGroup ? 'transition-group' : 'transition';

      return h(component, context.data, context.children);
    }
  };
}

/**
 * @param {string} name
 * @param {string} origin
 * @param {string} mode
 * @return {{name, functional, props, render}}
 */
function createSimpleTransitionGroup(name) {
  var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top center 0';
  var mode = arguments[2];

  return createSimpleTransition(name + '-group', origin, mode, true);
}

function createJavaScriptTransition(name, functions) {
  var css = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'in-out';
  var isGroup = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  return {
    name: name,

    functional: true,

    props: {
      css: {
        type: Boolean,
        default: css
      },
      mode: {
        type: String,
        default: mode
      }
    },

    render: function render(h, context) {
      var data = {
        props: _extends({}, context.props, {
          name: name
        }),
        on: functions
      };

      var component = isGroup ? 'transition-group' : 'transition';

      return h(component, data, context.children);
    }
  };
}

/**
 * @param binding
 * @param defaults
 * @return {Object}
 */
function directiveConfig(binding) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Object.assign({}, defaults, binding.modifiers, { value: binding.arg }, binding.value || {});
}

/**
 * @param {Element} el
 * @param {string} event
 * @param {Function} cb
 */
function addOnceEventListener(el, event, cb) {
  var once = function once() {
    cb();
    el.removeEventListener(event, once, false);
  };

  el.addEventListener(event, once, false);
}

/**
 * @param {Object} obj
 * @param {string} path
 * @return {*}
 */
function getObjectValueByPath(obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) {
    return;
  }
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  var a = path.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (obj != null) {
      obj = obj[k];
    } else {
      return;
    }
  }
  return obj;
}

/**
 * @param {number} length
 * @return {Array<number>}
 */
function createRange(length) {
  return [].concat(_toConsumableArray(Array.from({ length: length }, function (v, k) {
    return k;
  })));
}

/**
 * @param {Element|*} el
 * @return {number}
 */
function getZIndex(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return 0;
  }

  var zi = document.defaultView.getComputedStyle(el).getPropertyValue('z-index');
  if (isNaN(zi)) {
    return getZIndex(el.parentNode);
  }

  return zi;
}

var tagsToReplace = exports.tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

/**
 * @param {string} str
 * @return {string}
 */
function escapeHTML(str) {
  return str.replace(/[&<>]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
}

/**
 * @param {Object} obj
 * @param {Array} keys
 */
function filterObjectOnKeys(obj, keys) {
  var filtered = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (typeof obj[key] !== 'undefined') {
      filtered[key] = obj[key];
    }
  }
  return filtered;
}

/**
 * @param {Array} array
 * @param {string|*} tag
 * @return {Array}
 */
function filterChildren() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var tag = arguments[1];

  return array.filter(function (child) {
    return child.componentOptions && child.componentOptions.Ctor && child.componentOptions.Ctor.options && child.componentOptions.Ctor.options.name === tag;
  });
}

/**
 * @return {boolean}
 */
function isServer() {
  return typeof window === 'undefined';
}

/**
 * @return {boolean}
 */
function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * @param {Element} element
 * @return {{top: number, left: number}}
 */
function getElementOffset(element) {
  if (!element || isServer()) {
    return { top: 0, left: 0 };
  }

  // Return zeros for disconnected and hidden (display: none) elements
  // Support: IE <= 11 only
  // Running getBoundingClientRect on a
  // disconnected node in IE throws an error
  if (element.getClientRects && !element.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  // Get document-relative position by adding viewport scroll to viewport-relative gBCR
  var rect = element.getBoundingClientRect();
  var win = element.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
}

/**
 * @param {Element} targetElement
 * @param {Element} relativeElement
 * @return {{ top: number, left: number }}
 */
function getElementRelativeOffset(targetElement, relativeElement) {
  var targetOffset = getElementOffset(targetElement);
  var relativeOffset = getElementOffset(relativeElement);

  return {
    top: targetOffset.top - relativeOffset.top + relativeElement.scrollTop,
    left: targetOffset.left - relativeOffset.left + relativeElement.scrollLeft
  };
}

/**
 * @returns {number}
 */
function getDocumentHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
}

/**
 * @returns {number}
 */
function getWindowHeight() {
  return window.innerHeight || (document.documentElement || document.body).clientHeight;
}

/**
 * @param {*} obj
 * @returns {boolean}
 */
function isVueComponent(obj) {
  return !!(obj && obj.$el);
}

/**
 * @param {Element} element
 * @returns {number}
 */
function getElementHeight(element) {
  return element.innerHeight || element.clientHeight;
}

/**
 * @param {Element} element
 * @returns {number}
 */
function getElementWidth(element) {
  return element.innerWidth || element.clientWidth;
}

/**
 * @param {Element} element
 * @returns {number}
 */
function getElementScrollHeight(element) {
  return Math.max(element.scrollHeight, element.offsetHeight, element.clientHeight);
}

/**
 * @param {Element} element
 * @returns {number}
 */
function getElementScrollWidth(element) {
  return Math.max(element.scrollWidth, element.offsetWidth, element.clientWidth);
}

/**
 * @param {*} target
 * @returns {Element}
 */
function resolveElement(target) {
  if (target instanceof Element) {
    return target;
  } else if (isVueComponent(target)) {
    return target.$el;
  } else if (typeof target === 'string') {
    return document && document.querySelector(target);
  } else {
    return target;
  }
}

/**
 * @param {Array<VNode>|VNode} vnodes
 * @param {boolean} deep
 */
function extractVNodeText(vnodes) {
  var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!vnodes) {
    return '';
  }

  return [].concat(vnodes).reduce(function (result, vnode) {
    // if we have native element
    // then return inner text content
    var elm = vnode.$el;
    var elmText = elm && (elm.innerText || elm.textContent);

    if (elmText) {
      return result + ' ' + ensureString(elmText).trim();
    }

    if (vnode.text) {
      result += ' ' + ensureString(vnode.text).trim();
    }

    if (deep && vnode.children && vnode.children.length) {
      result += ' ' + extractVNodeText(vnode.children);
    }

    return result;
  }, '');
}

/**
 * @param {number} number
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clampNumber(number) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -Infinity;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

  if (min > max) {
    var _ref2 = [max, min];
    min = _ref2[0];
    max = _ref2[1];
  }

  return Math.min(Math.max(ensureNumber(number), min), max);
}

/**
 * @param {*} value
 * @returns {number}
 */
function ensureNumber(value) {
  value = Number(value);

  return !Number.isNaN(value) ? value : 0;
}

/**
 * @param {string|*} value
 * @returns {string}
 */
function ensureString(value) {
  if (typeof value === 'string') {
    return value;
  }

  return (value || '').toString();
}

/**
 * @param {string} className
 * @return {string}
 */
function normalizeClassName(className) {
  var whitespaceRegexp = /(\s+(?=\s))/gi;
  return (className || '').toString().replace(whitespaceRegexp, '').trim();
}

/**
 * @param {*} value
 * @returns {boolean}
 */
function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
}

/**
 * @returns {boolean}
 */
function isBrowserSafari() {
  if (isServer()) {
    return false;
  }

  return (/^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)
  );
}

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function generateNumber() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e9;

  min = Math.ceil(min);
  max |= 0;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}