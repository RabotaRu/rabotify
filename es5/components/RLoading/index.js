'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RLoading = require('./RLoading.vue');

var _RLoading2 = _interopRequireDefault(_RLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RLoading2.default.install = function install(Vue) {
  Vue.component('r-loading', _RLoading2.default);
};

exports.default = _RLoading2.default;