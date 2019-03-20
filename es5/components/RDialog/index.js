'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RDialogHeader = exports.RDialogCard = exports.RDialog = undefined;

var _RDialog = require('./RDialog.vue');

var _RDialog2 = _interopRequireDefault(_RDialog);

var _RDialogCard = require('./RDialogCard.vue');

var _RDialogCard2 = _interopRequireDefault(_RDialogCard);

var _RDialogHeader = require('./RDialogHeader.vue');

var _RDialogHeader2 = _interopRequireDefault(_RDialogHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RDialog = _RDialog2.default;
exports.RDialogCard = _RDialogCard2.default;
exports.RDialogHeader = _RDialogHeader2.default;

/* istanbul ignore next */

_RDialog2.default.install = function install(Vue) {
  Vue.component('r-dialog', _RDialog2.default);
  Vue.component('r-dialog-card', _RDialogCard2.default);
  Vue.component('r-dialog-header', _RDialogHeader2.default);
};

exports.default = _RDialog2.default;