'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoubleGisMapManager = exports.MAP_SDK_PROP = exports.MAP_SDK = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapManager = require('../map-manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAP_SDK = exports.MAP_SDK = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full';
var MAP_SDK_PROP = exports.MAP_SDK_PROP = 'DG';

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

      var map = this.sdk.map(domId, options);

      var _options$controls = options.controls,
          controls = _options$controls === undefined ? [] : _options$controls;


      this.clearControls(map);
      this.setControls(map, controls);

      return map;
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

      if (map && !map._myMarkers) {
        map._myMarkers = [];
      }

      for (var i = 0; i < points.length; ++i) {
        var point = points[i];
        var placemark = this._createCustomPlacemark(point);
        placemark.addTo(map);

        map._myMarkers.push(placemark);
      }
    }

    /**
     * Remove all placemarks on the map
     *
     * @param {*} map
     */

  }, {
    key: 'clearPlacemarks',
    value: function clearPlacemarks(map) {
      if (!map || !map._myMarkers) {
        return;
      }
      var markers = map._myMarkers;

      for (var i = 0; i < markers.length; ++i) {
        var marker = markers[i];
        marker && marker.remove();
      }

      map._myMarkers = [];
    }

    /**
     * Updates map within viewport
     *
     * @param {*} map
     */

  }, {
    key: 'fitToViewport',
    value: function fitToViewport(map) {
      map && map.invalidateSize(true);
    }

    /**
     * @param {*} map
     * @param {string[]} controls
     */

  }, {
    key: 'setControls',
    value: function setControls(map) {
      var controls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      this.clearControls(map);

      var resolvedControls = this.resolveControls(controls);

      for (var i = 0; i < resolvedControls.length; ++i) {
        var control = map[resolvedControls[i]];
        if (control && !control.map) {
          control.addTo(map);
        }
      }
    }

    /**
     * Clears all controls on the map
     *
     * @param {*} map
     */

  }, {
    key: 'clearControls',
    value: function clearControls(map) {
      Object.values(this.controlsMapping).forEach(function (value) {
        var control = map[value];
        if (control) {
          control.remove();
        }
      });
    }

    /**
     * @param {*} map
     * @param {number[]} center
     * @param {number} zoom
     */

  }, {
    key: 'setCenterAndZoom',
    value: function setCenterAndZoom(map, center, zoom) {
      map.panTo(center);
      map.setZoom(zoom);
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

      var bounds = this._findGeometryBounds(map, points);

      try {
        map.fitBounds(bounds);
      } catch (e) {}

      return Promise.resolve();
    }

    /**
     * Destroy the map
     *
     * @param {*} map
     */

  }, {
    key: 'destroy',
    value: function destroy(map) {
      map.remove();
    }

    /**
     * @return {string}
     */

  }, {
    key: '_createCustomPlacemark',


    /**
     * @param {number[]|{point: number[], name: string}} point
     * @return {*}
     * @private
     */
    value: function _createCustomPlacemark(point) {
      var coord = null;
      if (Array.isArray(point)) {
        coord = point;
      } else {
        coord = point.point;
      }
      return this.sdk.marker(coord);
    }

    /**
     * @param {*} map
     * @param {number[][]} points
     * @return {PromiseLike<T>}
     * @private
     */

  }, {
    key: '_findGeometryBounds',
    value: function _findGeometryBounds(map) {
      var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var sdk = this.sdk;

      var group = sdk.featureGroup(map._myMarkers || []);

      return group.getBounds();
    }
  }, {
    key: 'sdkObjectName',
    get: function get() {
      return MAP_SDK_PROP;
    }

    /**
     * @return {*}
     */

  }, {
    key: 'controlsMapping',
    get: function get() {
      return {
        zoom: 'zoomControl',
        fullscreen: 'fullscreenControl'
      };
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