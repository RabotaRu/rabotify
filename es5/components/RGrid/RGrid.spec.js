'use strict';

var _testing = require('@util/testing');

var _RFlex = require('@components/RGrid/RFlex.vue');

var _RFlex2 = _interopRequireDefault(_RFlex);

var _RLayout = require('@components/RGrid/RLayout.vue');

var _RLayout2 = _interopRequireDefault(_RLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testing.test)('RFlex', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should conditionally apply if boolean is used', function () {
    var wrapper = mount(_RFlex2.default, functionalContext({
      attrs: {
        foo: '',
        bar: false
      }
    }));

    expect(wrapper.hasAttribute('foo')).toBe(false);
    expect(wrapper.hasAttribute('bar')).toBe(false);
    expect(wrapper.hasClass('foo')).toBe(true);
    expect(wrapper.hasClass('bar')).toBe(false);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should pass the id attr', function () {
    var wrapper = mount(_RFlex2.default, functionalContext({
      attrs: {
        id: 'test'
      }
    }));

    expect(wrapper.find('#test')).toHaveLength(1);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should apply different size of element', function () {
    var flex = mount(_RFlex2.default, functionalContext({
      attrs: {
        'd-flex': true,
        'xs-12': true,
        'sm-and-down-7': true
      },
      domProps: {
        innerHTML: 'Text'
      }
    }));

    var wrapper = mount(_RLayout2.default, functionalContext({
      attrs: {
        row: true,
        wrap: true
      }
    }));

    wrapper.element.appendChild(flex.element);

    expect(wrapper.html()).toMatchSnapshot();
  });
});