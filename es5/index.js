'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _directives = require('./directives');

var directives = _interopRequireWildcard(_directives);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var components = process.env.RABOTIFY_BASE ? require('./components/index.core') : require('./components');

function Rabotify(Vue, args) {
  var Rabotify = components.Rabotify;

  Vue.use(Rabotify, _extends({
    components: components,
    directives: directives
  }, args));
}

Rabotify.version = '1.5.0';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Rabotify);
}

exports.default = Rabotify;