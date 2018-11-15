'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RMap = require('./RMap.vue');

var _RMap2 = _interopRequireDefault(_RMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RMap2.default.install = function install(Vue) {
  Vue.component('r-map', _RMap2.default);
};

exports.default = _RMap2.default;