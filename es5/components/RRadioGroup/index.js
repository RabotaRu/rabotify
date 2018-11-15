'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RRadio = exports.RRadioGroup = undefined;

var _RRadioGroup = require('./RRadioGroup.vue');

var _RRadioGroup2 = _interopRequireDefault(_RRadioGroup);

var _RRadio = require('./RRadio.vue');

var _RRadio2 = _interopRequireDefault(_RRadio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RRadioGroup = _RRadioGroup2.default;
exports.RRadio = _RRadio2.default;

/* istanbul ignore next */

_RRadioGroup2.default.install = function install(Vue) {
  Vue.component('r-radio-group', _RRadioGroup2.default);
  Vue.component('r-radio', _RRadio2.default);
};

exports.default = _RRadioGroup2.default;