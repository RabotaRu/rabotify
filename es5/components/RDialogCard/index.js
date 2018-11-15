'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RDialogCard = require('./RDialogCard.vue');

var _RDialogCard2 = _interopRequireDefault(_RDialogCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RDialogCard2.default.install = function install(Vue) {
  Vue.component('r-dialog-card', _RDialogCard2.default);
};

exports.default = _RDialogCard2.default;