'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResourceLoader = exports.ResourceLoader = function () {
  function ResourceLoader() {
    _classCallCheck(this, ResourceLoader);
  }

  _createClass(ResourceLoader, [{
    key: 'load',


    /**
     * @param {string} resourceUrl
     * @param {number} attemptsNumber
     * @returns {Promise<*>}
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resourceUrl) {
        var attemptsNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.tryLoad(resourceUrl, attemptsNumber));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load(_x) {
        return _ref.apply(this, arguments);
      }

      return load;
    }()

    /**
     * @param {string} resourceUrl
     * @param {number} attemptsNumber
     * @returns {Promise<*>}
     */

  }, {
    key: 'tryLoad',
    value: function tryLoad(resourceUrl, attemptsNumber) {
      var _this = this;

      return this.tryUntil(function (attemptNumber) {
        return _this._loadResource(resourceUrl);
      }, attemptsNumber);
    }

    /**
     * @param {function} asyncAction
     * @param {number} maxAttemptsNumber
     * @returns {Promise<*>}
     */

  }, {
    key: 'tryUntil',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(asyncAction, maxAttemptsNumber) {
        var attempts, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                attempts = 0;

              case 1:
                if (!(attempts < maxAttemptsNumber)) {
                  _context2.next = 16;
                  break;
                }

                _context2.prev = 2;
                _context2.next = 5;
                return asyncAction(attempts);

              case 5:
                result = _context2.sent;
                return _context2.abrupt('return', result);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](2);

                attempts++;
                _context2.next = 14;
                return this._delay(125 * Math.pow(Math.min(10, attempts), 2) + 500);

              case 14:
                _context2.next = 1;
                break;

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 9]]);
      }));

      function tryUntil(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return tryUntil;
    }()

    /**
     * @param {string} resourceUrl
     * @return {Promise<any>}
     * @private
     */

  }, {
    key: '_loadResource',
    value: function _loadResource(resourceUrl) {
      return new Promise(function (resolve, reject) {
        var resourceLoader = document.createElement('script');
        resourceLoader.type = 'text/javascript';

        if (resourceLoader.readyState) {
          // IE
          resourceLoader.onreadystatechange = function () {
            if (resourceLoader.readyState === 'loaded' || resourceLoader.readyState === 'complete') {
              resourceLoader.onreadystatechange = null;
              resolve(resourceLoader);
            }
            console.log(resourceLoader.readyState, resourceLoader.readyState);
          };
        } else {
          // other browsers
          resourceLoader.onload = function () {
            return resolve(resourceLoader);
          };
          resourceLoader.onerror = function () {
            return reject(resourceLoader);
          };
        }

        resourceLoader.src = resourceUrl;

        document.getElementsByTagName('head')[0].appendChild(resourceLoader);
      });
    }

    /**
     * @param {number} delayMs
     * @private
     */

  }, {
    key: '_delay',
    value: function _delay() {
      var delayMs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return new Promise(function (resolve) {
        return setTimeout(resolve, delayMs);
      });
    }
  }]);

  return ResourceLoader;
}();