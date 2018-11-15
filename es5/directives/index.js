'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Touch = exports.Scroll = exports.Ripple = exports.Resize = exports.KeydownToggle = exports.ClickOutside = undefined;
exports.default = install;

var _clickOutside = require('./click-outside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

var _keydownToggle = require('./keydown-toggle');

var _keydownToggle2 = _interopRequireDefault(_keydownToggle);

var _resize = require('./resize');

var _resize2 = _interopRequireDefault(_resize);

var _scroll = require('./scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _touch = require('./touch');

var _touch2 = _interopRequireDefault(_touch);

var _ripple = require('./ripple');

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ClickOutside = _clickOutside2.default;
exports.KeydownToggle = _keydownToggle2.default;
exports.Resize = _resize2.default;
exports.Ripple = _ripple2.default;
exports.Scroll = _scroll2.default;
exports.Touch = _touch2.default;
function install(Vue) {
  Vue.directive('click-outside', _clickOutside2.default);
  Vue.directive('keydown-toggle', _keydownToggle2.default);
  Vue.directive('resize', _resize2.default);
  Vue.directive('ripple', _ripple2.default);
  Vue.directive('scroll', _scroll2.default);
  Vue.directive('touch', _touch2.default);
}