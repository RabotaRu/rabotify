'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function directive(e, el, binding, v) {
  // Args may not always be supplied
  binding.args = binding.args || {};

  var isActive = binding.args.closeConditional || binding.value.closeConditional || function () {
    return v.context.isActive;
  };

  // The element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || isActive(e) === false) {
    return;
  }

  var callback = binding.args.callback || binding.value.callback || binding.value;

  // Delay setting toggleable inactive to avoid conflicting
  // with an outside click on any activator toggling our state.
  requestAnimationFrame(function () {
    return callback();
  });
}

function inserted(el, binding, v) {
  var onKeyDown = function onKeyDown(e) {
    return directive(e, el, binding, v);
  };
  window.addEventListener('keydown', onKeyDown);
  el._onKeyDownEvent = onKeyDown;
}

function unbind(el, binding) {
  window.removeEventListener('keydown', el._onKeyDownEvent);
}

exports.default = {
  name: 'keydown-toggle',
  inserted: inserted,
  unbind: unbind
};