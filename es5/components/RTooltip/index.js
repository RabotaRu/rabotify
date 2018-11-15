'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RTooltip = require('./RTooltip.vue');

var _RTooltip2 = _interopRequireDefault(_RTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RTooltip2.default.install = function install(Vue) {
  Vue.component('r-tooltip', _RTooltip2.default);
};

exports.default = _RTooltip2.default;