function directive (e, el, binding, v) {
  // Args may not always be supplied
  binding.args = binding.args || {};

  const isActive = (binding.args.closeConditional || binding.value.closeConditional || (() => v.context.isActive));

  // The element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || isActive(e) === false) {
    return;
  }

  const callback = binding.args.callback || binding.value.callback || binding.value;

  // Delay setting toggleable inactive to avoid conflicting
  // with an outside click on any activator toggling our state.
  requestAnimationFrame(() => callback());
}

function inserted (el, binding, v) {
  const onKeyDown = e => directive(e, el, binding, v);
  window.addEventListener('keydown', onKeyDown);
  el._onKeyDownEvent = onKeyDown;
}

function unbind (el, binding) {
  window.removeEventListener('keydown', el._onKeyDownEvent);
}

export default {
  name: 'keydown-toggle',
  inserted,
  unbind
};
