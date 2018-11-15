'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RListTileActionText = exports.RListTileAction = exports.RListTileSubTitle = exports.RListTileTitle = exports.RListTileContent = exports.RListTile = exports.RListGroup = exports.RList = undefined;

var _RList = require('./RList.vue');

var _RList2 = _interopRequireDefault(_RList);

var _RListGroup = require('./RListGroup.vue');

var _RListGroup2 = _interopRequireDefault(_RListGroup);

var _RListTile = require('./RListTile.vue');

var _RListTile2 = _interopRequireDefault(_RListTile);

var _RListTileContent = require('./RListTileContent.vue');

var _RListTileContent2 = _interopRequireDefault(_RListTileContent);

var _RListTileTitle = require('./RListTileTitle.vue');

var _RListTileTitle2 = _interopRequireDefault(_RListTileTitle);

var _RListTileSubTitle = require('./RListTileSubTitle.vue');

var _RListTileSubTitle2 = _interopRequireDefault(_RListTileSubTitle);

var _RListTileAction = require('./RListTileAction.vue');

var _RListTileAction2 = _interopRequireDefault(_RListTileAction);

var _RListTileActionText = require('./RListTileActionText.vue');

var _RListTileActionText2 = _interopRequireDefault(_RListTileActionText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RList = _RList2.default;
exports.RListGroup = _RListGroup2.default;
exports.RListTile = _RListTile2.default;
exports.RListTileContent = _RListTileContent2.default;
exports.RListTileTitle = _RListTileTitle2.default;
exports.RListTileSubTitle = _RListTileSubTitle2.default;
exports.RListTileAction = _RListTileAction2.default;
exports.RListTileActionText = _RListTileActionText2.default;

/* istanbul ignore next */

_RList2.default.install = function install(Vue) {
  Vue.component('r-list', _RList2.default);
  Vue.component('r-list-group', _RListGroup2.default);
  Vue.component('r-list-tile', _RListTile2.default);
  Vue.component('r-list-tile-action', _RListTileAction2.default);
  Vue.component('r-list-tile-action-text', _RListTileActionText2.default);
  Vue.component('r-list-tile-content', _RListTileContent2.default);
  Vue.component('r-list-tile-sub-title', _RListTileSubTitle2.default);
  Vue.component('r-list-tile-title', _RListTileTitle2.default);
};

exports.default = _RList2.default;