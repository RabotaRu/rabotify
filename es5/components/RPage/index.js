'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RPage = require('./RPage.vue');

var _RPage2 = _interopRequireDefault(_RPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RPage2.default.install = function install(Vue) {
  Vue.component('r-page', _RPage2.default);
};

exports.default = _RPage2.default;