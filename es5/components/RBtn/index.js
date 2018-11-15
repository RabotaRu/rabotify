'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RBtn = require('./RBtn.vue');

var _RBtn2 = _interopRequireDefault(_RBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RBtn2.default.install = function install(Vue) {
  Vue.component('r-btn', _RBtn2.default);
};

exports.default = _RBtn2.default;