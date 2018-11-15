'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RMenu = require('./RMenu.vue');

var _RMenu2 = _interopRequireDefault(_RMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RMenu2.default.install = function install(Vue) {
  Vue.component('r-menu', _RMenu2.default);
};

exports.default = _RMenu2.default;