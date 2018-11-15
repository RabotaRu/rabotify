'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function directive(e, el, binding, v) {
  // The element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || v.context.isActive === false) {
    return;
  }

  // Get value passed to directive
  var val = binding.value || function () {
    return true;
  };
  // Check if callback was passed in object or as the value
  var cb = val.callback || val;

  if (cb(e)) {
    // Delay setting toggleable inactive to avoid conflicting
    // with an outside click on any activator toggling our state.
    setTimeout(function () {
      return v.context.isActive = false;
    }, 0);
  }
}

function inserted(el, binding, v) {
  var onKeyDown = function onKeyDown(e) {
    return directive(e, el, binding, v);
  };
  var app = document.querySelector('[data-app]') || document.body; // This is only for unit tests
  app && app.addEventListener('keydown', onKeyDown);
  el._onKeyDownEvent = onKeyDown;
}

function unbind(el, binding) {
  var app = document.querySelector('[data-app]') || document.body; // This is only for unit tests
  app && app.removeEventListener('keydown', el._onKeyDownEvent);
}

exports.default = {
  name: 'keydown-toggle',
  inserted: inserted,
  unbind: unbind
};