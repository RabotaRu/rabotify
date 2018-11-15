'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RPageHeadline = require('./RPageHeadline.vue');

var _RPageHeadline2 = _interopRequireDefault(_RPageHeadline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RPageHeadline2.default.install = function install(Vue) {
  Vue.component('r-page-headline', _RPageHeadline2.default);
};

exports.default = _RPageHeadline2.default;