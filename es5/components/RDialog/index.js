'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RDialog = require('./RDialog.vue');

var _RDialog2 = _interopRequireDefault(_RDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RDialog2.default.install = function install(Vue) {
  Vue.component('r-dialog', _RDialog2.default);
};

exports.default = _RDialog2.default;