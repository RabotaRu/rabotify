'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RTextField = require('./RTextField.vue');

var _RTextField2 = _interopRequireDefault(_RTextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RTextField2.default.install = function install(Vue) {
  Vue.component('r-text-field', _RTextField2.default);
};

exports.default = _RTextField2.default;