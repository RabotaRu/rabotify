'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleMapManager = exports.MAP_SDK = exports.MAP_SDK_KEY = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapManager = require('../map-manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAP_SDK_KEY = exports.MAP_SDK_KEY = 'AIzaSyAyK9FgGmO_i0IoxeJwT3bTBHv0oi1fZT0';
var MAP_SDK = exports.MAP_SDK = 'https://maps.googleapis.com/maps/api/js?key=' + MAP_SDK_KEY;

var GoogleMapManager = exports.GoogleMapManager = function (_MapManager) {
  _inherits(GoogleMapManager, _MapManager);

  function GoogleMapManager() {
    _classCallCheck(this, GoogleMapManager);

    return _possibleConstructorReturn(this, (GoogleMapManager.__proto__ || Object.getPrototypeOf(GoogleMapManager)).apply(this, arguments));
  }

  _createClass(GoogleMapManager, [{
    key: 'load',


    /**
     * @return {Promise<*>}
     */
    value: function load() {
      return this.loadSdk(MAP_SDK);
    }

    /**
     * @return {Promise<any>}
     */

  }, {
    key: 'onSdkReady',
    value: function onSdkReady(name) {
      return Promise.resolve();
    }

    /**
     * @param {string} domId
     * @param {*} options
     */

  }, {
    key: 'createMap',
    value: function createMap(domId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var center = options.center;

      options.center = {
        lat: center[0],
        lng: center[1]
      };

      return new this.sdk.maps.Map(document.getElementById(domId), options);
    }

    /**
     * @param {*} map
     * @param {Array<Array<number>>} points
     */

  }, {
    key: 'createPlacemarks',
    value: function createPlacemarks(map) {
      var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      for (var i = 0; i < points.length; ++i) {
        var point = points[i];
        this._createCustomPlacemark(map, point);
      }
    }

    /**
     * @return {string}
     */

  }, {
    key: '_createCustomPlacemark',


    /**
     * @param {*} map
     * @param {number[]|{coord: number[], name: string}} point
     * @return {*}
     * @private
     */
    value: function _createCustomPlacemark(map, point) {
      var coord = null;
      if (Array.isArray(point)) {
        coord = point;
      } else {
        coord = point.coord;
      }
      var position = { lat: coord[0], lng: coord[1] };
      return new this.sdk.maps.Marker({ position: position, map: map });
    }
  }, {
    key: 'sdkObjectName',
    get: function get() {
      return 'google';
    }
  }], [{
    key: 'getManager',


    /**
     * @return {GoogleMapManager}
     */
    value: function getManager() {
      if (this._instance) {
        return this._instance;
      }

      return this._instance = new GoogleMapManager();
    }

    /**
     * @type {GoogleMapManager}
     * @private
     */

  }]);

  return GoogleMapManager;
}(_mapManager.MapManager);

GoogleMapManager._instance = null;