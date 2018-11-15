'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RSmartRender = require('./RSmartRender.vue');

var _RSmartRender2 = _interopRequireDefault(_RSmartRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RSmartRender2.default.install = function install(Vue) {
  Vue.component('r-smart-render', _RSmartRender2.default);
};

exports.default = _RSmartRender2.default;