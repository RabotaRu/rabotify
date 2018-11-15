'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RDivider = require('./RDivider.vue');

var _RDivider2 = _interopRequireDefault(_RDivider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RDivider2.default.install = function install(Vue) {
  Vue.component('r-divider', _RDivider2.default);
};

exports.default = _RDivider2.default;