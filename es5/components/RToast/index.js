'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RToast = require('./RToast.vue');

var _RToast2 = _interopRequireDefault(_RToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RToast2.default.install = function install(Vue) {
  Vue.component('r-toast', _RToast2.default);
};

exports.default = _RToast2.default;