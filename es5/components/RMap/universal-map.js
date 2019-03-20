'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UniversalMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yaMapManager = require('./providers/ya-map-manager');

var _doubleGisMapManager = require('./providers/double-gis-map-manager');

var _googleMapManager = require('./providers/google-map-manager');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var providers = {
  yandex: _yaMapManager.YaMapManager,
  dg: _doubleGisMapManager.DoubleGisMapManager,
  google: _googleMapManager.GoogleMapManager
};

var UniversalMap = exports.UniversalMap = function () {

  /**
   * @param {*} options
   */


  /**
   * @type {string}
   * @private
   */
  function UniversalMap() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UniversalMap);

    this._map = null;
    this._defaultProvider = 'yandex';
    var _options$provider = options.provider,
        provider = _options$provider === undefined ? this._defaultProvider : _options$provider;


    this.setProvider(provider);
  }

  /**
   * @param {string|*} provider
   */


  /**
   * @type {string}
   * @private
   */


  /**
   * @type {*}
   * @private
   */


  _createClass(UniversalMap, [{
    key: 'setProvider',
    value: function setProvider(provider) {
      var providerExists = providers.hasOwnProperty(provider);
      this._provider = providerExists ? provider : this._defaultProvider;
    }

    /**
     * @param {string} domId
     * @param {*} options
     */

  }, {
    key: 'createMap',
    value: function createMap(domId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this._map = this.manager.createMap(domId, options);
    }

    /**
     * @param {Array<Array<number>>} points
     */

  }, {
    key: 'createPlacemarks',
    value: function createPlacemarks() {
      var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this.manager.createPlacemarks(this._map, points);
    }

    /**
     * Remove all placemarks on the map
     */

  }, {
    key: 'clearPlacemarks',
    value: function clearPlacemarks() {
      this.manager.clearPlacemarks(this._map);
    }

    /**
     * Updates map within viewport
     */

  }, {
    key: 'fitToViewport',
    value: function fitToViewport() {
      this.manager.fitToViewport(this._map);
    }

    /**
     * @param {string[]} controls
     */

  }, {
    key: 'setControls',
    value: function setControls() {
      var controls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this.manager.setControls(this._map, controls);
    }

    /**
     * Clears all controls on the map
     */

  }, {
    key: 'clearControls',
    value: function clearControls() {
      this.manager.clearControls(this._map);
    }

    /**
     * @param {number[]} center
     * @param {number} zoom
     */

  }, {
    key: 'setCenterAndZoom',
    value: function setCenterAndZoom(center, zoom) {
      this.manager.setCenterAndZoom(this._map, center, zoom);
    }

    /**
     * @param {number[][]} points
     * @return {PromiseLike<T>}
     */

  }, {
    key: 'updateOptimalCenterAndZoom',
    value: function updateOptimalCenterAndZoom() {
      var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return this.manager.updateOptimalCenterAndZoom(this._map, points);
    }

    /**
     * @param {Function} cb
     */

  }, {
    key: 'addPointEventListener',
    value: function addPointEventListener() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      this.manager.addPointEventListener(this._map, cb);
    }

    /**
     */

  }, {
    key: 'removePointEventListener',
    value: function removePointEventListener() {
      this.manager.removePointEventListener(this._map);
    }

    /**
     * @param {string} query
     * @param {*} options
     * @return {Promise<*>}
     */

  }, {
    key: 'searchQuery',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.manager.searchQuery(this._map, query, options));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function searchQuery() {
        return _ref.apply(this, arguments);
      }

      return searchQuery;
    }()

    /**
     * Destroy the map
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.manager.destroy(this._map);
    }

    /**
     * @param {Array<number>} point
     * @return {PromiseLike<T>}
     */

  }, {
    key: 'resolveAddressByPoint',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(point) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', this.manager.resolveAddressByPoint(this._map, point));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function resolveAddressByPoint(_x9) {
        return _ref2.apply(this, arguments);
      }

      return resolveAddressByPoint;
    }()

    /**
     * @return {YaMapManager|DoubleGisMapManager|GoogleMapManager}
     */

  }, {
    key: 'manager',
    get: function get() {
      return providers[this._provider].getManager();
    }

    /**
     * @return {*}
     */

  }, {
    key: 'map',
    get: function get() {
      return this._map;
    }

    /**
     * @return {boolean}
     */

  }, {
    key: 'isMapCreated',
    get: function get() {
      return !!this._map;
    }
  }]);

  return UniversalMap;
}();