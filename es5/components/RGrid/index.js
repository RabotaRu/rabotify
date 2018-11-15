'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RSpacer = exports.RLayout = exports.RFlex = exports.RContent = exports.RContainer = undefined;

var _helpers = require('../../util/helpers');

var _RContent = require('./RContent.vue');

var _RContent2 = _interopRequireDefault(_RContent);

var _RContainer = require('./RContainer.vue');

var _RContainer2 = _interopRequireDefault(_RContainer);

var _RFlex = require('./RFlex.vue');

var _RFlex2 = _interopRequireDefault(_RFlex);

var _RLayout = require('./RLayout.vue');

var _RLayout2 = _interopRequireDefault(_RLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RSpacer = (0, _helpers.createSimpleFunctional)('spacer');

exports.RContainer = _RContainer2.default;
exports.RContent = _RContent2.default;
exports.RFlex = _RFlex2.default;
exports.RLayout = _RLayout2.default;
exports.RSpacer = RSpacer;

/* istanbul ignore next */

var RGrid = {
  install: function install(Vue) {
    Vue.component('r-content', _RContent2.default);
    Vue.component('r-container', _RContainer2.default);
    Vue.component('r-flex', _RFlex2.default);
    Vue.component('r-layout', _RLayout2.default);
    Vue.component('r-spacer', RSpacer);
  }
};

exports.default = RGrid;