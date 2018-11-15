'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RMobileHeader = require('./RMobileHeader.vue');

var _RMobileHeader2 = _interopRequireDefault(_RMobileHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RMobileHeader2.default.install = function install(Vue) {
  Vue.component('r-mobile-header', _RMobileHeader2.default);
};

exports.default = _RMobileHeader2.default;