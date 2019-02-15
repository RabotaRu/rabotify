/**
 * @param {string} c
 * @param {string|*} el
 * @param {string} name
 * @return {Object}
 */
export function createSimpleFunctional (c, el = 'div', name) {
  name = name || c.replace(/__/g, '-');

  return {
    name: `r-${name}`,
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = normalizeClassName(`${c} ${data.staticClass || ''}`);

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
export function createSimpleTransition (name, origin = 'top center 0', mode, isGroup = false) {
  return {
    name,

    functional: true,

    props: {
      origin: {
        type: String,
        default: origin
      }
    },

    render (h, context) {
      context.data = context.data || {};
      context.data.props = { name };
      context.data.on = context.data.on || {};
      if (!Object.isExtensible(context.data.on)) {
        context.data.on = { ...context.data.on };
      }

      if (mode) {
        context.data.props.mode = mode;
      }

      context.data.on.beforeEnter = el => {
        el.style.transformOrigin = context.props.origin;
        el.style.webkitTransformOrigin = context.props.origin;
      };

      const component = isGroup ? 'transition-group' : 'transition';

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
export function createSimpleTransitionGroup (name, origin = 'top center 0', mode) {
  return createSimpleTransition(name + '-group', origin, mode, true);
}

export function createJavaScriptTransition (name, functions, css = true, mode = 'in-out', isGroup = false) {
  return {
    name,

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

    render (h, context) {
      const data = {
        props: {
          ...context.props,
          name
        },
        on: functions
      };

      const component = isGroup ? 'transition-group' : 'transition';

      return h(component, data, context.children);
    }
  };
}

/**
 * @param binding
 * @param defaults
 * @return {Object}
 */
export function directiveConfig (binding, defaults = {}) {
  return Object.assign({},
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  );
}

/**
 * @param {Element} el
 * @param {string} event
 * @param {Function} cb
 */
export function addOnceEventListener (el, event, cb) {
  const once = () => {
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
export function getObjectValueByPath (obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) {
    return;
  }
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  const a = path.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (obj instanceof Object && k in obj) {
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
export function createRange (length) {
  return [ ...Array.from({ length }, (v, k) => k) ];
}

/**
 * @param {Element|*} el
 * @return {number}
 */
export function getZIndex (el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return 0;
  }

  const zi = document.defaultView.getComputedStyle(el).getPropertyValue('z-index');
  if (isNaN(zi)) {
    return getZIndex(el.parentNode);
  }

  return zi;
}

export const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

/**
 * @param {string} str
 * @return {string}
 */
export function escapeHTML (str) {
  return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag);
}

/**
 * @param {Object} obj
 * @param {Array} keys
 */
export function filterObjectOnKeys (obj, keys) {
  const filtered = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
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
export function filterChildren (array = [], tag) {
  return array.filter(child => {
    return child.componentOptions &&
      child.componentOptions.Ctor &&
      child.componentOptions.Ctor.options &&
      child.componentOptions.Ctor.options.name === tag;
  });
}

/**
 * @return {boolean}
 */
export function isServer () {
  return typeof window === 'undefined';
}

/**
 * @return {boolean}
 */
export function isBrowser () {
  return typeof window !== 'undefined';
}

/**
 * @param {Element} element
 * @return {{top: number, left: number}}
 */
export function getElementOffset (element) {
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
  const rect = element.getBoundingClientRect();
  const win = element.ownerDocument.defaultView;
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
export function getElementRelativeOffset (targetElement, relativeElement) {
  const targetOffset = getElementOffset(targetElement);
  const relativeOffset = getElementOffset(relativeElement);

  return {
    top: targetOffset.top - relativeOffset.top + relativeElement.scrollTop,
    left: targetOffset.left - relativeOffset.left + relativeElement.scrollLeft
  };
}

/**
 * @returns {number}
 */
export function getDocumentHeight () {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

/**
 * @returns {number}
 */
export function getWindowHeight () {
  return window.innerHeight ||
    (document.documentElement || document.body).clientHeight;
}

/**
 * @param {*} obj
 * @returns {boolean}
 */
export function isVueComponent (obj) {
  return !!( obj && obj.$el );
}

/**
 * @param {Element} element
 * @returns {number}
 */
export function getElementHeight (element) {
  return element.innerHeight || element.clientHeight;
}

/**
 * @param {Element} element
 * @returns {number}
 */
export function getElementWidth (element) {
  return element.innerWidth || element.clientWidth;
}

/**
 * @param {Element} element
 * @returns {number}
 */
export function getElementScrollHeight (element) {
  return Math.max(
    element.scrollHeight,
    element.offsetHeight,
    element.clientHeight
  );
}

/**
 * @param {Element} element
 * @returns {number}
 */
export function getElementScrollWidth (element) {
  return Math.max(
    element.scrollWidth,
    element.offsetWidth,
    element.clientWidth
  );
}

/**
 * @param {*} target
 * @returns {Element}
 */
export function resolveElement (target) {
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
export function extractVNodeText (vnodes, deep = false) {
  if (!vnodes) {
    return '';
  }

  return [].concat( vnodes ).reduce((result, vnode) => {
    // if we have native element
    // then return inner text content
    const elm = vnode.$el;
    const elmText = elm && (elm.innerText || elm.textContent);

    if (elmText) {
      return result + ' ' + ensureString( elmText ).trim();
    }

    if (vnode.text) {
      result += ' ' + ensureString( vnode.text ).trim();
    }

    if (deep && vnode.children && vnode.children.length) {
      result += ' ' + extractVNodeText( vnode.children );
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
export function clampNumber (number, min = -Infinity, max = Infinity) {
  if (min > max) {
    [ min, max ] = [ max, min ];
  }

  return Math.min(
    Math.max(ensureNumber(number), min),
    max
  );
}


/**
 * @param {*} value
 * @returns {number}
 */
export function ensureNumber (value) {
  value = Number( value );

  return !Number.isNaN(value) ? value : 0;
}

/**
 * @param {string|*} value
 * @returns {string}
 */
export function ensureString (value) {
  if (typeof value === 'string') {
    return value;
  }

  return ( value || '' ).toString();
}

/**
 * @param {string} className
 * @return {string}
 */
export function normalizeClassName (className) {
  const whitespaceRegexp = /(\s+(?=\s))/gi;
  return (className || '')
    .toString()
    .replace(whitespaceRegexp, '')
    .trim();
}

/**
 * @param {*} value
 * @returns {boolean}
 */
export function isObject (value) {
  return typeof value === 'object' && value !== null;
}

/**
 * @returns {boolean}
 */
export function isBrowserSafari () {
  if (isServer()) {
    return false;
  }

  return /^((?!chrome|android|crios|fxios).)*safari/i.test( navigator.userAgent );
}
