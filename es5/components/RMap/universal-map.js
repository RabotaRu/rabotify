'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UniversalMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yaMapManager = require('./providers/ya-map-manager');

var _doubleGisMapManager = require('./providers/double-gis-map-manager');

var _googleMapManager = require('./providers/google-map-manager');

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
     * @return {DoubleGisMapManager|YaMapManager}
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