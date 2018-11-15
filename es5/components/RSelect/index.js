'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RSelect = require('./RSelect.vue');

var _RSelect2 = _interopRequireDefault(_RSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RSelect2.default.install = function install(Vue) {
  Vue.component('r-select', _RSelect2.default);
};

exports.default = _RSelect2.default;