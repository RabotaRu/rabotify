'use strict';

var _RChip = require('@components/RChip');

var _RChip2 = _interopRequireDefault(_RChip);

var _testing = require('@util/testing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testing.test)('RChip.vue', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should have a r-chip class', function () {
    var wrapper = mount(_RChip2.default);

    expect(wrapper.hasClass('r-chip')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should be removable', function () {
    var wrapper = mount(_RChip2.default, {
      propsData: { close: true }
    });

    var close = wrapper.find('.r-chip__close')[0];

    var input = jest.fn(function (value) {
      return wrapper.setProps({ value: value });
    });
    wrapper.vm.$on('input', input);

    expect(wrapper.html()).toMatchSnapshot();

    close.trigger('click');
    expect(input).toBeCalledWith(false);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a colored chip', function () {
    var wrapper = mount(_RChip2.default, {
      propsData: {
        color: 'secondary',
        textColor: 'accent'
      }
    });

    expect(wrapper.element.classList).toContain('secondary');
    expect(wrapper.element.classList).toContain('text_accent');
  });

  it('should render a disabled chip', function () {
    var wrapper = mount(_RChip2.default, {
      propsData: {
        disabled: true
      }
    });

    expect(wrapper.element.classList).toContain('r-chip_disabled');
  });

  it('should render a colored outline chip', function () {
    var wrapper = mount(_RChip2.default, {
      propsData: {
        outline: true,
        color: 'primary'
      }
    });

    expect(wrapper.element.classList).toContain('primary');
    expect(wrapper.element.classList).toContain('text_primary');
  });

  it('should render a colored outline chip with text color', function () {
    var wrapper = mount(_RChip2.default, {
      propsData: {
        outline: true,
        color: 'accent',
        textColor: 'info'
      }
    });

    expect(wrapper.element.classList).toContain('accent');
    expect(wrapper.element.classList).toContain('text_info');
  });
});