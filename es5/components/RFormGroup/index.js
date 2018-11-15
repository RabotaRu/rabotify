'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RFormGroup = require('./RFormGroup.vue');

var _RFormGroup2 = _interopRequireDefault(_RFormGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RFormGroup2.default.install = function install(Vue) {
  Vue.component('r-form-group', _RFormGroup2.default);
};

exports.default = _RFormGroup2.default;