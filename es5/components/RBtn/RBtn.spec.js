'use strict';

var _testing = require('@util/testing');

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _RBtn = require('@components/RBtn');

var _RBtn2 = _interopRequireDefault(_RBtn);

var _RLoading = require('@components/RLoading');

var _RLoading2 = _interopRequireDefault(_RLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var stub = {
  name: 'router-link',
  render: function render(h) {
    return h('button');
  }
};

(0, _testing.test)('RBtn.vue', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should render component and match snapshot', function () {
    var wrapper = mount(_RBtn2.default);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color prop and match snapshot', function () {
    var wrapper1 = mount(_RBtn2.default, {
      propsData: {
        color: 'accent'
      }
    });

    expect(wrapper1.html()).toMatchSnapshot();

    var wrapper2 = mount(_RBtn2.default, {
      propsData: {
        color: 'accent',
        flat: true
      }
    });

    expect(wrapper2.html()).toMatchSnapshot();
  });

  it('should render component with loader slot and match snapshot', function () {
    var wrapper = mount(_RBtn2.default, {
      propsData: {
        loading: true
      },
      slots: {
        loader: [compileToFunctions('<span>loader</span>')]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with loader and match snapshot', function () {
    var wrapper = mount(_RBtn2.default, {
      components: {
        RLoading: _RLoading2.default
      },
      propsData: {
        loading: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an <a> tag when using href prop', function () {
    var wrapper = mount(_RBtn2.default, {
      propsData: {
        href: 'http://www.google.com'
      }
    });

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.getAttribute('href')).toBe('http://www.google.com');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a <button> tag when using to prop', function () {
    var instance = _vue2.default.extend();
    instance.component('router-link', stub);

    var wrapper = mount(_RBtn2.default, {
      propsData: {
        to: '/home'
      },
      instance: instance
    });

    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.vm.$props.to).toBe('/home');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render specified tag when using tag prop', function () {
    var wrapper = mount(_RBtn2.default, {
      propsData: {
        tag: 'a'
      }
    });

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should register and unregister', function () {
    var register = jest.fn();
    var unregister = jest.fn();

    var wrapper = mount(_RBtn2.default, {
      provide: {
        buttonGroup: {
          register: register,
          unregister: unregister
        }
      }
    });

    expect(register).toHaveBeenCalled();
    wrapper.destroy();
    expect(unregister).toHaveBeenCalled();
  });

  it('should emit a click event', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var instance, wrapper, click;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            instance = _vue2.default.extend();

            instance.component('router-link', stub);

            wrapper = mount(_RBtn2.default, {
              propsData: {
                href: '#!'
              },
              instance: instance
            });
            click = jest.fn();

            wrapper.vm.$on('click', click);
            wrapper.trigger('click');

            wrapper.setProps({ href: undefined, to: '/foo' });
            wrapper.trigger('click');

            expect(click.mock.calls.length).toBe(2);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('should use custom active-class', function () {
    var wrapper = mount(_RBtn2.default, {
      propsData: {
        inputValue: true,
        activeClass: 'foo'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});