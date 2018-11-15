'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RSwitch = require('./RSwitch.vue');

var _RSwitch2 = _interopRequireDefault(_RSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RSwitch2.default.install = function install(Vue) {
  Vue.component('r-switch', _RSwitch2.default);
};

exports.default = _RSwitch2.default;