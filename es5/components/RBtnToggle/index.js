'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RBtnToggle = require('./RBtnToggle.vue');

var _RBtnToggle2 = _interopRequireDefault(_RBtnToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RBtnToggle2.default.install = function install(Vue) {
  Vue.component('r-btn-toggle', _RBtnToggle2.default);
};

exports.default = _RBtnToggle2.default;