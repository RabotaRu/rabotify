'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _touch = require('./touch');

var _touch2 = _interopRequireDefault(_touch);

var _testing = require('@util/testing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(0, _testing.test)('touch.js', function (_ref) {
  var mount = _ref.mount;

  function create(value) {
    return mount(_vue2.default.component('test', {
      directives: { Touch: _touch2.default },
      render: function render(h) {
        return h('div', {
          directives: [{
            name: 'touch',
            value: value
          }]
        });
      }
    }));
  }

  it('should call directive handlers', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var down, up, left, right, start, move, end;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            down = jest.fn();

            (0, _testing.touch)(create({ down: down })).start(0, 0).end(0, 20);
            expect(down).toBeCalled();

            up = jest.fn();

            (0, _testing.touch)(create({ up: up })).start(0, 0).end(0, -20);
            expect(up).toBeCalled();

            left = jest.fn();

            (0, _testing.touch)(create({ left: left })).start(0, 0).end(-20, 0);
            expect(left).toBeCalled();

            right = jest.fn();

            (0, _testing.touch)(create({ right: right })).start(0, 0).end(20, 0);
            expect(right).toBeCalled();

            start = jest.fn();

            (0, _testing.touch)(create({ start: start })).start(0, 0);
            expect(start).toBeCalled();

            move = jest.fn();

            (0, _testing.touch)(create({ move: move })).move(0, 0);
            expect(move).toBeCalled();

            end = jest.fn();

            (0, _testing.touch)(create({ end: end })).end(0, 0);
            expect(end).toBeCalled();

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('should call directive handlers if not straight down/up/right/left', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var nope, down;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            nope = jest.fn();
            down = jest.fn();

            (0, _testing.touch)(create({ down: down, right: nope })).start(0, 0).end(5, 20);
            expect(nope).not.toBeCalled();
            expect(down).toBeCalled();

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('should not call directive handlers if distance is too small ', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var down, up, left, right;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            down = jest.fn();

            (0, _testing.touch)(create({ down: down })).start(0, 0).end(0, 10);
            expect(down).not.toBeCalled();

            up = jest.fn();

            (0, _testing.touch)(create({ up: up })).start(0, 0).end(0, -10);
            expect(up).not.toBeCalled();

            left = jest.fn();

            (0, _testing.touch)(create({ left: left })).start(0, 0).end(-10, 0);
            expect(left).not.toBeCalled();

            right = jest.fn();

            (0, _testing.touch)(create({ right: right })).start(0, 0).end(10, 0);
            expect(right).not.toBeCalled();

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('should unbind', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var start, wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            start = jest.fn();
            wrapper = create({ start: start });


            _touch2.default.unbind(wrapper.element, { value: {} }, { context: wrapper.vm });

            (0, _testing.touch)(wrapper).start(0, 0);
            expect(start.mock.calls).toHaveLength(0);

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});