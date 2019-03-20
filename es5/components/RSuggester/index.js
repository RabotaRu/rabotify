'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RSuggester = require('./RSuggester.vue');

var _RSuggester2 = _interopRequireDefault(_RSuggester);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RSuggester2.default.install = function install(Vue) {
  Vue.component('r-suggester', _RSuggester2.default);
};

exports.default = _RSuggester2.default;