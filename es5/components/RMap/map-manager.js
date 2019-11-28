'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapManager = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require('@rabota/loader');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapManager = exports.MapManager = function () {

  /**
   * @type {string}
   * @private
   */


  /**
   * @type {Array}
   * @private
   */


  /**
   * @type {boolean}
   * @private
   */
  function MapManager() {
    _classCallCheck(this, MapManager);

    this._currentId = 1;
    this._sdkLoaded = false;
    this._sdkLoading = false;
    this._queue = [];
    this._resourceLoader = null;
    this._apiKey = null;
    this._defaultCenterPoint = [55.76, 37.64];

    this._resourceLoader = new _loader.ScriptLoader();
  }

  /**
   * @return {Promise<*>}
   */


  /**
   * @type {number[]}
   * @private
   */


  /**
   * @type {ScriptLoader}
   * @private
   */


  /**
   * @type {boolean}
   * @private
   */


  /**
   * @type {number}
   * @private
   */


  _createClass(MapManager, [{
    key: 'loadSdk',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sdkUrl) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._sdkLoaded) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', this.sdk);

              case 4:
                if (!this._sdkLoading) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', this._enqueue());

              case 6:

                this._sdkLoading = true;

                return _context.abrupt('return', this._loadResource(sdkUrl).then(function (resource) {
                  return _this.onSdkReady();
                }).then(function (_) {
                  var sdk = _this.sdk;

                  _this._sdkLoaded = true;
                  _this._sdkLoading = false;

                  _this._flushQueue(sdk);

                  return sdk;
                }).catch(function (error) {
                  _this._flushQueue(null, error);

                  throw error; // pass next
                }));

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadSdk(_x) {
        return _ref.apply(this, arguments);
      }

      return loadSdk;
    }()

    /**
     * Abstract method for sdk ready
     *
     * @abstract
     * @return {Promise<void>}
     */

  }, {
    key: 'onSdkReady',
    value: function onSdkReady() {
      console.error('Not implemented');
    }

    /**
     * @param {string} domId
     * @param {*} options
     */

  }, {
    key: 'createMap',
    value: function createMap(domId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      console.error('Not implemented');
    }

    /**
     * @param {*} map
     * @param {Array<Array<number>>} points
     */

  }, {
    key: 'createPlacemarks',
    value: function createPlacemarks(map) {
      var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      console.error('Not implemented');
    }

    /**
     * Remove all placemarks on the map
     *
     * @param {*} map
     */

  }, {
    key: 'clearPlacemarks',
    value: function clearPlacemarks(map) {
      console.error('Not implemented');
    }

    /**
     * Updates map within viewport
     *
     * @param {*} map
     */

  }, {
    key: 'fitToViewport',
    value: function fitToViewport(map) {
      console.error('Not implemented');
    }

    /**
     * @param {*} map
     * @param {string[]} controls
     */

  }, {
    key: 'setControls',
    value: function setControls(map) {
      var controls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      console.error('Not implemented');
    }

    /**
     * Clears all controls on the map
     *
     * @param {*} map
     */

  }, {
    key: 'clearControls',
    value: function clearControls(map) {
      console.error('Not implemented');
    }

    /**
     * @param {*} map
     * @param {number[]} center
     * @param {number} zoom
     */

  }, {
    key: 'setCenterAndZoom',
    value: function setCenterAndZoom(map, center, zoom) {
      console.error('Not implemented');
    }

    /**
     * @param {*} map
     * @param {number[][]} points
     * @return {PromiseLike<T>}
     */

  }, {
    key: 'updateOptimalCenterAndZoom',
    value: function updateOptimalCenterAndZoom(map) {
      var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      console.error('Not implemented');
    }

    /**
     * @param {*} map
     * @param {Function} cb
     */

  }, {
    key: 'addPointEventListener',
    value: function addPointEventListener(map) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      console.error('Not implemented');
    }

    /**
     * @param {*} map
     */

  }, {
    key: 'removePointEventListener',
    value: function removePointEventListener(map) {
      console.error('Not implemented');
    }

    /**
     * @param {*} map
     * @param {string} query
     * @param {number} limit
     * @return {Promise<*>}
     */

  }, {
    key: 'searchQuery',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(map) {
        var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            limit = _ref3.limit;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.error('Not implemented');

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function searchQuery(_x7) {
        return _ref2.apply(this, arguments);
      }

      return searchQuery;
    }()

    /**
     * Destroy the map
     *
     * @param {*} map
     */

  }, {
    key: 'destroy',
    value: function destroy(map) {
      console.error('Not implemented');
    }

    /**
     * @param {*} map
     * @param {Array<number>} point
     * @return {PromiseLike<T>}
     */

  }, {
    key: 'resolveAddressByPoint',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(map, point) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.error('Not implemented');

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function resolveAddressByPoint(_x10, _x11) {
        return _ref4.apply(this, arguments);
      }

      return resolveAddressByPoint;
    }()

    /**
     * @param {string[]} controls
     * @return {string[]}
     */

  }, {
    key: 'resolveControls',
    value: function resolveControls() {
      var controls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var mapping = this.controlsMapping;

      return controls.map(function (control) {
        return mapping[control];
      }).filter(function (resolved) {
        return !!resolved;
      }).reduce(function (unique, value) {
        return unique.includes(value) ? unique : unique.concat(value);
      }, []);
    }

    /**
     * @param {number[]|any[]} points
     * @return {number[][]}
     */

  }, {
    key: 'toNativePoints',
    value: function toNativePoints() {
      var _this2 = this;

      var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return points.map(function (point) {
        return _this2.toNativePoint(point);
      });
    }

    /**
     * @param {*|number[]} point
     * @return {number[]}
     */

  }, {
    key: 'toNativePoint',
    value: function toNativePoint(point) {
      return Array.isArray(point) ? point : point.point;
    }

    /**
     * @param {*} geoObject
     * @param {number[]|*} originPoint
     * @return {{point: number[], name: string, adressLine: string, locality: string, debugProperties: *}}
     */

  }, {
    key: 'extractGeoObjectData',
    value: function extractGeoObjectData(geoObject) {
      var originPoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      return geoObject;
    }

    /**
     * @param {string} apiKey
     */

  }, {
    key: 'setApiKey',
    value: function setApiKey(apiKey) {
      this._apiKey = apiKey;
    }

    /**
     * @return {number}
     */

  }, {
    key: '_loadResource',


    /**
     * @param url
     * @return {Promise<any>}
     * @private
     */
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(typeof window === 'undefined')) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                return _context4.abrupt('return', this._resourceLoader.retry(url, 20));

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _loadResource(_x15) {
        return _ref5.apply(this, arguments);
      }

      return _loadResource;
    }()

    /**
     * @return {Promise<any>}
     * @private
     */

  }, {
    key: '_enqueue',
    value: function _enqueue() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._queue.push([resolve, reject]);
      });
    }

    /**
     * @private
     */

  }, {
    key: '_flushQueue',
    value: function _flushQueue(resolved, rejected) {
      this._queue.forEach(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            resolve = _ref7[0],
            reject = _ref7[1];

        if (resolved) {
          resolve(resolved);
        } else if (rejected) {
          reject(rejected);
        } else {
          resolve();
        }
      });

      this._queue = [];
    }
  }, {
    key: 'nextId',
    get: function get() {
      return this._currentId++;
    }

    /**
     * @returns {string}
     */

  }, {
    key: 'apiKey',
    get: function get() {
      return this._apiKey;
    }

    /**
     * @return {*}
     */

  }, {
    key: 'controlsMapping',
    get: function get() {
      return {};
    }

    /**
     * @return {string}
     */

  }, {
    key: 'nextDomId',
    get: function get() {
      return this.sdkObjectName + '-' + this.nextId;
    }

    /**
     * @return {boolean}
     */

  }, {
    key: 'sdkLoaded',
    get: function get() {
      return this._sdkLoaded;
    }

    /**
     * @return {*}
     */

  }, {
    key: 'sdk',
    get: function get() {
      return window && window[this.sdkObjectName];
    }

    /**
     * @abstract
     * @return {string}
     */

  }, {
    key: 'sdkObjectName',
    get: function get() {
      throw new Error('Sdk name not implemented');
    }

    /**
     * @return {number[]}
     */

  }, {
    key: 'defaultCenterPoint',
    get: function get() {
      return this._defaultCenterPoint;
    }
  }]);

  return MapManager;
}();