'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoubleGisMapManager = exports.MAP_SDK = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapManager = require('../map-manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAP_SDK = exports.MAP_SDK = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full';

var DoubleGisMapManager = exports.DoubleGisMapManager = function (_MapManager) {
  _inherits(DoubleGisMapManager, _MapManager);

  function DoubleGisMapManager() {
    _classCallCheck(this, DoubleGisMapManager);

    return _possibleConstructorReturn(this, (DoubleGisMapManager.__proto__ || Object.getPrototypeOf(DoubleGisMapManager)).apply(this, arguments));
  }

  _createClass(DoubleGisMapManager, [{
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
    value: function onSdkReady() {
      return this.sdk; // DG is Promise type
    }

    /**
     * @param {string} domId
     * @param {*} options
     */

  }, {
    key: 'createMap',
    value: function createMap(domId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.sdk.map(domId, options);
    }

    /**
     * @param {*} map
     * @param {Array<Array<number>>} points
     */

  }, {
    key: 'createPlacemarks',
    value: function createPlacemarks(map) {
      var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      /* const placemarkIcon = this.sdk.icon({
        iconUrl: 'my-icon.png',
        iconRetinaUrl: 'my-icon@2x.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: 'my-icon-shadow.png',
        shadowRetinaUrl: 'my-icon-shadow@2x.png',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
      });*/

      for (var i = 0; i < points.length; ++i) {
        var point = points[i];
        var placemark = this._createCustomPlacemark(point);
        placemark.addTo(map);
      }
    }

    /**
     * @return {string}
     */

  }, {
    key: '_createCustomPlacemark',


    /**
     * @param {number[]|{coord: number[], name: string}} point
     * @return {*}
     * @private
     */
    value: function _createCustomPlacemark(point) {
      var coord = null;
      if (Array.isArray(point)) {
        coord = point;
      } else {
        coord = point.coord;
      }
      return DG.marker(coord);
    }
  }, {
    key: 'sdkObjectName',
    get: function get() {
      return 'DG';
    }
  }], [{
    key: 'getManager',


    /**
     * @return {DoubleGisMapManager}
     */
    value: function getManager() {
      if (this._instance) {
        return this._instance;
      }

      return this._instance = new DoubleGisMapManager();
    }

    /**
     * @type {DoubleGisMapManager}
     * @private
     */

  }]);

  return DoubleGisMapManager;
}(_mapManager.MapManager);

DoubleGisMapManager._instance = null;