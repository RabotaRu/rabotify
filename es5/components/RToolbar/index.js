'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RToolbarItems = exports.RToolbarTitle = exports.RToolbar = undefined;

var _RToolbar = require('./RToolbar.vue');

var _RToolbar2 = _interopRequireDefault(_RToolbar);

var _RToolbarItems = require('./RToolbarItems.vue');

var _RToolbarItems2 = _interopRequireDefault(_RToolbarItems);

var _RToolbarTitle = require('./RToolbarTitle.vue');

var _RToolbarTitle2 = _interopRequireDefault(_RToolbarTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RToolbar = _RToolbar2.default;
exports.RToolbarTitle = _RToolbarTitle2.default;
exports.RToolbarItems = _RToolbarItems2.default;

/* istanbul ignore next */

_RToolbar2.default.install = function install(Vue) {
  Vue.component('r-toolbar', _RToolbar2.default);
  Vue.component('r-toolbar-items', _RToolbarItems2.default);
  Vue.component('r-toolbar-title', _RToolbarTitle2.default);
};

exports.default = _RToolbar2.default;