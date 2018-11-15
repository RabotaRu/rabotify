'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RInfinityScroll = require('./RInfinityScroll.vue');

var _RInfinityScroll2 = _interopRequireDefault(_RInfinityScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RInfinityScroll2.default.install = function install(Vue) {
  Vue.component('r-infinity-scroll', _RInfinityScroll2.default);
};

exports.default = _RInfinityScroll2.default;