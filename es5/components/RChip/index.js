'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RChip = require('./RChip.vue');

var _RChip2 = _interopRequireDefault(_RChip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RChip2.default.install = function install(Vue) {
  Vue.component('r-chip', _RChip2.default);
};

exports.default = _RChip2.default;