'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Grid;

var _helpers = require('../../util/helpers');

function Grid(name) {
  return {
    name: 'r-' + name,

    functional: true,

    props: {
      id: String,
      tag: {
        type: String,
        default: 'div'
      }
    },

    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;

      data.staticClass = (0, _helpers.normalizeClassName)(name + ' ' + (data.staticClass || ''));

      if (data.attrs) {
        var classes = Object.keys(data.attrs).filter(function (key) {
          var value = data.attrs[key];
          return value || typeof value === 'string';
        });

        if (classes.length) {
          data.staticClass = (0, _helpers.normalizeClassName)(data.staticClass + (' ' + classes.join(' ')));
        }
        delete data.attrs;
      }

      if (props.id) {
        data.domProps = data.domProps || {};
        data.domProps.id = props.id;
      }

      return h(props.tag, data, children);
    }
  };
}