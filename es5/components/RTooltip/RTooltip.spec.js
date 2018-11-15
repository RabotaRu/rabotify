'use strict';

var _RTooltip = require('@components/RTooltip');

var _RTooltip2 = _interopRequireDefault(_RTooltip);

var _testing = require('@util/testing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(0, _testing.test)('RTooltip.js', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should render component and match snapshot', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(_RTooltip2.default, {
              propsData: {
                openDelay: 0
              },
              slots: {
                activator: [compileToFunctions('<span>activator</span>')],
                default: [compileToFunctions('<span>content</span>')]
              }
            });


            expect(wrapper.html()).toMatchSnapshot();

            wrapper.setProps({
              value: true
            });
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.html()).toMatchSnapshot();

            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('should render component with value=true and match snapshot', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(_RTooltip2.default, {
              propsData: {
                value: true
              },
              slots: {
                activator: [compileToFunctions('<span>activator</span>')],
                default: [compileToFunctions('<span>content</span>')]
              }
            });


            expect(wrapper.data().isActive).toBe(true);
            expect(wrapper.html()).toMatchSnapshot();
            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('should render component with zIndex prop and match snapshot', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(_RTooltip2.default, {
              propsData: {
                zIndex: 42
              }
            });


            expect(wrapper.html()).toMatchSnapshot();
            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('should display tooltip after mouseenter and hide after mouseleave', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var wrapper, activator, cb;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            jest.useFakeTimers();
            wrapper = mount(_RTooltip2.default, {
              propsData: {
                openDelay: 123,
                closeDelay: 321
              },
              slots: {
                activator: [compileToFunctions('<span>activator</span>')],
                default: [compileToFunctions('<span>content</span>')]
              }
            });
            activator = wrapper.find('.tooltip__content + span')[0];
            cb = jest.fn();

            wrapper.instance().$on('input', cb);

            activator.trigger('mouseenter');
            jest.runAllTimers();
            _context4.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            expect(setTimeout.mock.calls).toHaveLength(1);
            expect(setTimeout.mock.calls[0][1]).toBe(123);
            expect(cb).toBeCalledWith(true);

            activator.trigger('mouseleave');
            jest.runAllTimers();
            _context4.next = 16;
            return wrapper.vm.$nextTick();

          case 16:
            expect(setTimeout.mock.calls).toHaveLength(2);
            expect(setTimeout.mock.calls[1][1]).toBe(321);
            expect(cb).toBeCalledWith(false);

            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 20:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});