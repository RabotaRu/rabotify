'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RCardText = exports.RCardActions = exports.RCardTitle = exports.RCardMedia = exports.RCard = undefined;

var _RCard = require('./RCard.vue');

var _RCard2 = _interopRequireDefault(_RCard);

var _RCardMedia = require('./RCardMedia.vue');

var _RCardMedia2 = _interopRequireDefault(_RCardMedia);

var _RCardTitle = require('./RCardTitle.vue');

var _RCardTitle2 = _interopRequireDefault(_RCardTitle);

var _RCardActions = require('./RCardActions.vue');

var _RCardActions2 = _interopRequireDefault(_RCardActions);

var _RCardText = require('./RCardText.vue');

var _RCardText2 = _interopRequireDefault(_RCardText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RCard = _RCard2.default;
exports.RCardMedia = _RCardMedia2.default;
exports.RCardTitle = _RCardTitle2.default;
exports.RCardActions = _RCardActions2.default;
exports.RCardText = _RCardText2.default;

/* istanbul ignore next */

_RCard2.default.install = function install(Vue) {
  Vue.component('r-card', _RCard2.default);
  Vue.component('r-card-media', _RCardMedia2.default);
  Vue.component('r-card-title', _RCardTitle2.default);
  Vue.component('r-card-actions', _RCardActions2.default);
  Vue.component('r-card-text', _RCardText2.default);
};

exports.default = _RCard2.default;