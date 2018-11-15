'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
exports.copyTextToClipboard = copyTextToClipboard;
exports.getElementOffset = getElementOffset;
exports.valueBetween = valueBetween;
exports.ensureNumber = ensureNumber;
exports.normalizeClassName = normalizeClassName;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

function directiveConfig(binding) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Object.assign({}, defaults, binding.modifiers, { value: binding.arg }, binding.value || {});
}

function addOnceEventListener(el, event, cb) {
  var once = function once() {
    cb();
    el.removeEventListener(event, once, false);
  };

  el.addEventListener(event, once, false);
}

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
    if (obj instanceof Object && k in obj) {
      obj = obj[k];
    } else {
      return;
    }
  }
  return obj;
}

function createRange(length) {
  return [].concat(_toConsumableArray(Array.from({ length: length }, function (v, k) {
    return k;
  })));
}

function getZIndex(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;
  var zi = document.defaultView.getComputedStyle(el).getPropertyValue('z-index');
  if (isNaN(zi)) return getZIndex(el.parentNode);

  return zi;
}

var tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};
function escapeHTML(str) {
  return str.replace(/[&<>]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
}

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

function filterChildren() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var tag = arguments[1];

  return array.filter(function (child) {
    return child.componentOptions && child.componentOptions.Ctor && child.componentOptions.Ctor.options && child.componentOptions.Ctor.options.name === tag;
  });
}

function isServer() {
  return typeof window === 'undefined';
}

function isBrowser() {
  return typeof window !== 'undefined';
}

function copyTextToClipboard(text) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  if (isServer()) {
    return;
  }

  function copyToClipboardFF(text) {
    window.prompt('Чтобы скопировать, нажмите: Ctrl+C, Enter', text);
  }

  (function copyToClipboard() {
    var success = true;
    var selection = void 0;
    var range = document.createRange();

    // For IE.
    if (window.clipboardData) {
      window.clipboardData.setData('Text', text);
    } else {
      // Create a temporary element off screen.
      var tmpElem = document.createElement('div');
      tmpElem.style.position = 'absolute';
      tmpElem.style.left = '-1000px';
      tmpElem.style.top = '-1000px';

      // Add the input value to the temp element.
      tmpElem.innerHTML = text;
      document.body.appendChild(tmpElem);

      // Select temp element.
      range.selectNodeContents(tmpElem);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      // Lets copy.
      try {
        success = document.execCommand('copy', false, null);
      } catch (e) {
        copyToClipboardFF(text);
      }
      if (success) {
        // remove temp element.
        tmpElem.remove();
        cb();
      }
    }
  })();
}

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

function valueBetween(value) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -Infinity;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

  if (min > max) {
    var _ref2 = [max, min];
    min = _ref2[0];
    max = _ref2[1];
  }
  return Math.min(Math.max(Number(value), min), max);
}

function ensureNumber(value) {
  value = Number(value);
  if (Number.isNaN(value)) {
    return 0;
  }
  return value;
}

function normalizeClassName(className) {
  var whitespaceRegexp = /(\s+(?=\s))/gi;
  return (className || '').toString().replace(whitespaceRegexp, '').trim();
}