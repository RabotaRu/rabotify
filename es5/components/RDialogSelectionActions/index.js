'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RDialogSelectionActions = require('./RDialogSelectionActions.vue');

var _RDialogSelectionActions2 = _interopRequireDefault(_RDialogSelectionActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RDialogSelectionActions2.default.install = function install(Vue) {
  Vue.component('r-dialog-selection-actions', _RDialogSelectionActions2.default);
};

exports.default = _RDialogSelectionActions2.default;