'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RImage = require('./RImage.vue');

var _RImage2 = _interopRequireDefault(_RImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RImage2.default.install = function install(Vue) {
  Vue.component('r-image', _RImage2.default);
};

exports.default = _RImage2.default;