'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RApp = require('./RApp.vue');

var _RApp2 = _interopRequireDefault(_RApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RApp2.default.install = function install(Vue) {
  Vue.component('r-app', _RApp2.default);
};

exports.default = _RApp2.default;