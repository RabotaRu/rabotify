'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _transitions = require('@components/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _RDialog = require('@components/RDialog');

var _RDialog2 = _interopRequireDefault(_RDialog);

var _testing = require('@util/testing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_vue2.default.use(_transitions2.default);

(0, _testing.test)('RDialog.vue', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should render component and match snapshot', function () {
    var wrapper = mount(_RDialog2.default);

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render a disabled component and match snapshot', function () {
    var wrapper = mount(_RDialog2.default, {
      propsData: {
        disabled: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render a persistent component and match snapshot', function () {
    var wrapper = mount(_RDialog2.default, {
      propsData: {
        persistent: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render a fullscreen component and match snapshot', function () {
    var wrapper = mount(_RDialog2.default, {
      propsData: {
        fullscreen: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render a lazy component and match snapshot', function () {
    var wrapper = mount(_RDialog2.default, {
      propsData: {
        lazy: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render a scrollable component and match snapshot', function () {
    var wrapper = mount(_RDialog2.default, {
      propsData: {
        scrollable: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render component with custom origin and match snapshot', function () {
    var wrapper = mount(_RDialog2.default, {
      propsData: {
        origin: 'top right'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render component with custom width (max-width) and match snapshot', function () {
    var wrapper = mount(_RDialog2.default, {
      propsData: {
        maxWidth: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should render component with custom transition and match snapshot', function () {
    var wrapper = mount(_RDialog2.default, {
      propsData: {
        transition: 'fade-transition'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should open dialog on activator click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var input, wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            input = jest.fn();
            wrapper = mount(_RDialog2.default, {
              slots: {
                activator: [compileToFunctions('<span>activator</span>')]
              }
            });


            wrapper.vm.$on('input', input);

            expect(wrapper.vm.isActive).toBe(false);
            wrapper.find('.dialog__activator')[0].trigger('click');
            expect(wrapper.vm.isActive).toBe(true);
            _context.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            expect(input).toBeCalledWith(true);

            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('not should open disabed dialog on activator click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var input, wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            input = jest.fn();
            wrapper = mount(_RDialog2.default, {
              propsData: {
                disabled: true
              },
              slots: {
                activator: [compileToFunctions('<span>activator</span>')]
              }
            });


            wrapper.vm.$on('input', input);

            expect(wrapper.vm.isActive).toBe(false);
            wrapper.find('.dialog__activator')[0].trigger('click');
            expect(wrapper.vm.isActive).toBe(false);
            _context2.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            expect(input).not.toBeCalled();

            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('not change state on v-model update', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(_RDialog2.default, {
              propsData: {
                value: false
              },
              slots: {
                activator: [compileToFunctions('<span>activator</span>')]
              }
            });


            expect(wrapper.vm.isActive).toBe(false);

            wrapper.setProps({
              value: true
            });
            _context3.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.isActive).toBe(true);

            wrapper.setProps({
              value: false
            });
            _context3.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            expect(wrapper.vm.isActive).toBe(false);

            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('should emit keydown event', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var keydown, component;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            keydown = jest.fn();
            component = {
              render: function render(h) {
                return h(_RDialog2.default, {
                  props: {
                    value: true
                  },
                  on: {
                    keydown: keydown
                  }
                });
              }
            };

            mount(component);

            window.dispatchEvent(new Event('keydown'));
            expect(keydown).toBeCalled();

            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});