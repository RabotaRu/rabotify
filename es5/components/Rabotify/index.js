'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _application = require('./mixins/application');

var _application2 = _interopRequireDefault(_application);

var _scrollTo = require('./util/scrollTo');

var _scrollTo2 = _interopRequireDefault(_scrollTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rabotify = {
  install: function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.installed) {
      return;
    }

    this.installed = true;

    var $rabotify = {};
    Vue.util.defineReactive($rabotify, 'rx', {
      breakpoint: {},
      application: _application2.default,
      scrollTo: _scrollTo2.default
    });

    Vue.prototype.$rabotify = $rabotify.rx;

    if (opts.transitions) {
      Object.keys(opts.transitions).forEach(function (key) {
        var t = opts.transitions[key];
        if (t.name !== undefined) {
          Vue.component(t.name, t);
        }
      });
    }

    if (opts.directives) {
      Object.keys(opts.directives).forEach(function (key) {
        var d = opts.directives[key];
        Vue.directive(d.name, d);
      });
    }

    if (opts.components) {
      Object.keys(opts.components).forEach(function (key) {
        var c = opts.components[key];
        Vue.use(c);
      });
    }
  }
};

exports.default = Rabotify;