'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RCheckbox = require('./RCheckbox.vue');

var _RCheckbox2 = _interopRequireDefault(_RCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RCheckbox2.default.install = function install(Vue) {
  Vue.component('r-checkbox', _RCheckbox2.default);
};

exports.default = _RCheckbox2.default;