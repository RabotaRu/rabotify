'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RVirtualScroller = require('./RVirtualScroller.vue');

var _RVirtualScroller2 = _interopRequireDefault(_RVirtualScroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RVirtualScroller2.default.install = function install(Vue) {
  Vue.component('r-virtual-scroller', _RVirtualScroller2.default);
};

exports.default = _RVirtualScroller2.default;