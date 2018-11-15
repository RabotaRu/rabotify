'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RFormFieldError = undefined;

var _RFormFieldError = require('./RFormFieldError.vue');

var _RFormFieldError2 = _interopRequireDefault(_RFormFieldError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RFormFieldError = _RFormFieldError2.default;

/* istanbul ignore next */

_RFormFieldError2.default.install = function install(Vue) {
  Vue.component('r-form-field-error', _RFormFieldError2.default);
};

exports.default = _RFormFieldError2.default;