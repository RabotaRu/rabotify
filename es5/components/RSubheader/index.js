'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RSubheader = require('./RSubheader.vue');

var _RSubheader2 = _interopRequireDefault(_RSubheader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RSubheader2.default.install = function install(Vue) {
  Vue.component('r-subheader', _RSubheader2.default);
};

exports.default = _RSubheader2.default;