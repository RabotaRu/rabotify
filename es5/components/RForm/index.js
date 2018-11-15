'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RForm = require('./RForm.vue');

var _RForm2 = _interopRequireDefault(_RForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RForm2.default.install = function install(Vue) {
  Vue.component('r-form', _RForm2.default);
};

exports.default = _RForm2.default;