'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTabsSlider = exports.RTabsItems = exports.RTab = exports.RTabItem = exports.RTabs = undefined;

var _RTabs = require('./RTabs.vue');

var _RTabs2 = _interopRequireDefault(_RTabs);

var _RTab = require('./RTab.vue');

var _RTab2 = _interopRequireDefault(_RTab);

var _RTabsItems = require('./RTabsItems.vue');

var _RTabsItems2 = _interopRequireDefault(_RTabsItems);

var _RTabItem = require('./RTabItem.vue');

var _RTabItem2 = _interopRequireDefault(_RTabItem);

var _RTabsSlider = require('./RTabsSlider.vue');

var _RTabsSlider2 = _interopRequireDefault(_RTabsSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RTabs = _RTabs2.default;
exports.RTabItem = _RTabItem2.default;
exports.RTab = _RTab2.default;
exports.RTabsItems = _RTabsItems2.default;
exports.RTabsSlider = _RTabsSlider2.default;

/* istanbul ignore next */

_RTabs2.default.install = function install(Vue) {
  Vue.component('r-tabs', _RTabs2.default);
  Vue.component('r-tabs-slider', _RTabsSlider2.default);
  Vue.component('r-tabs-items', _RTabsItems2.default);
  Vue.component('r-tab-item', _RTabItem2.default);
  Vue.component('r-tab', _RTab2.default);
};

exports.default = _RTabs2.default;