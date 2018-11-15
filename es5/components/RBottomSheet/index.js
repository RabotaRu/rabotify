'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RBottomSheet = require('./RBottomSheet.vue');

var _RBottomSheet2 = _interopRequireDefault(_RBottomSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RBottomSheet2.default.install = function install(Vue) {
  Vue.component('r-bottom-sheet', _RBottomSheet2.default);
};

exports.default = _RBottomSheet2.default;