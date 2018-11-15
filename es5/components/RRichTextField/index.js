'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RRichTextField = require('./RRichTextField.vue');

var _RRichTextField2 = _interopRequireDefault(_RRichTextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_RRichTextField2.default.install = function install(Vue) {
  Vue.component('r-rich-text-field', _RRichTextField2.default);
};

exports.default = _RRichTextField2.default;