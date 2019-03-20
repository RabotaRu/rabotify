'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YaMapManager = exports.MAP_SDK_PROP = exports.MAP_SDK = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapManager = require('../map-manager');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAP_SDK = exports.MAP_SDK = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
var MAP_SDK_PROP = exports.MAP_SDK_PROP = 'ymaps';

var YaMapManager = exports.YaMapManager = function (_MapManager) {
  _inherits(YaMapManager, _MapManager);

  function YaMapManager() {
    _classCallCheck(this, YaMapManager);

    return _possibleConstructorReturn(this, (YaMapManager.__proto__ || Object.getPrototypeOf(YaMapManager)).apply(this, arguments));
  }

  _createClass(YaMapManager, [{
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
      var _this2 = this;

      return new Promise(function (resolve) {
        return _this2.sdk.ready(resolve);
      });
    }

    /**
     * @param {string} domId
     * @param {*} options
     */

  }, {
    key: 'createMap',
    value: function createMap(domId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options = Object.assign({}, options, {
        controls: this.resolveControls(options.controls)
      });

      return new this.sdk.Map(domId, options);
    }

    /**
     * @param {*} map
     * @param {Array<Array<number>>} points
     */

  }, {
    key: 'createPlacemarks',
    value: function createPlacemarks(map) {
      var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var geoCollection = new this.sdk.GeoObjectCollection({}, {
        preset: 'islands#redCircleIcon',
        strokeWidth: 2
      });

      for (var i = 0; i < points.length; ++i) {
        var point = points[i];
        var placemark = this._createCustomPlacemark(point);
        placemark.editor.startEditing();
        geoCollection.add(placemark);
      }

      map.geoObjects.add(geoCollection);
    }

    /**
     * Remove all placemarks on the map
     *
     * @param {*} map
     */

  }, {
    key: 'clearPlacemarks',
    value: function clearPlacemarks(map) {
      map.geoObjects.removeAll();
    }

    /**
     * Updates map within viewport
     *
     * @param {*} map
     */

  }, {
    key: 'fitToViewport',
    value: function fitToViewport(map) {
      setTimeout(function (_) {
        map && map.container.fitToViewport();
      }, 0);
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
        map.controls.add(resolvedControls[i]);
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
      var controls = Object.keys(map.controls._controlsByKey);

      for (var i = 0; i < controls.length; ++i) {
        map.controls.remove(controls[i]);
      }
    }

    /**
     * @param {*} map
     * @param {number[]} center
     * @param {number} zoom
     */

  }, {
    key: 'setCenterAndZoom',
    value: function setCenterAndZoom(map, center, zoom) {
      center = this.toNativePoint(center);

      map.panTo(center, { duration: 200 }).then(function (_) {
        map.setZoom(zoom);
      });
    }

    /**
     * @param {*} map
     * @param {number[][]} points
     * @return {PromiseLike<T>}
     */

  }, {
    key: 'updateOptimalCenterAndZoom',
    value: function updateOptimalCenterAndZoom(map) {
      var _this3 = this;

      var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (!points.length) {
        return Promise.resolve();
      }

      points = this.toNativePoints(points);

      return this._findOptimalCenterAndZoom(map, points).then(function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            center = _ref.center,
            zoom = _ref.zoom;

        _this3.setCenterAndZoom(map, center, zoom);
      });
    }

    /**
     * @param {*} map
     * @param {Function} cb
     */

  }, {
    key: 'addPointEventListener',
    value: function addPointEventListener(map) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var fn = function fn(e) {
        return cb(e.get('coords'));
      };

      map._placementClickEvents = (map._placementClickEvents || []).concat(fn);
      map.events.add('click', fn);

      map.cursors.push('pointer');
    }

    /**
     * @param {*} map
     */

  }, {
    key: 'removePointEventListener',
    value: function removePointEventListener(map) {
      var placementClicks = map._placementClickEvents || [];

      for (var i = 0; i < placementClicks.length; ++i) {
        var clickListener = placementClicks[i];
        map.events.remove('click', clickListener);
      }

      var cursorStack = map.cursors._cursorStack || [];
      var last = cursorStack[cursorStack.length - 1];
      if (last && last._key === 'pointer') {
        last.remove();
      }
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(map) {
        var _this4 = this;

        var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref3$limit = _ref3.limit,
            limit = _ref3$limit === undefined ? 5 : _ref3$limit;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.sdk.geocode(query, {
                  results: limit
                }).then(function (res) {
                  var geoObjects = res.geoObjects.toArray();

                  return geoObjects.map(function (geoObject) {
                    return _this4.extractGeoObjectData(geoObject);
                  });
                }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
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
      map.destroy();
    }

    /**
     * @param {*} map
     * @param {Array<number>} point
     * @return {PromiseLike<T>}
     */

  }, {
    key: 'resolveAddressByPoint',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(map, point) {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                point = this.toNativePoint(point);

                return _context2.abrupt('return', this.sdk.geocode(point).then(function (res) {
                  var firstGeoObject = res.geoObjects.get(0);
                  return _this5.extractGeoObjectData(firstGeoObject, point);
                }));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function resolveAddressByPoint(_x10, _x11) {
        return _ref4.apply(this, arguments);
      }

      return resolveAddressByPoint;
    }()

    /**
     * @param {*} geoObject
     * @param {number[]|*} originPoint
     * @return {{point: number[], name: string, adressLine: string, locality: string, debugProperties: *}}
     */

  }, {
    key: 'extractGeoObjectData',
    value: function extractGeoObjectData(geoObject) {
      var originPoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var parsedData = geoObject._getParsedXal();
      var locality = (parsedData.localities || [])[0];
      if (!locality) {
        locality = (parsedData.administrativeAreas || [])[0];
      }

      return {
        kind: geoObject.properties.get('metaDataProperty').GeocoderMetaData.kind,
        point: this.toNativePoint(originPoint || geoObject.geometry.getCoordinates()),
        name: geoObject.properties.get('name'),
        adressLine: geoObject.getAddressLine(),
        locality: locality,
        debugProperties: geoObject.properties.getAll()
      };
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
      var coord = this.toNativePoint(point);
      var name = null;

      if (!Array.isArray(point)) {
        name = point.name || 'Отмеченная точка';
      }

      var contentOptions = {};

      if (name) {
        Object.assign(contentOptions, {
          hintContent: name,
          balloonContent: name
        });
      }

      return new this.sdk.Placemark(coord, contentOptions);
    }

    /**
     * @param {*} map
     * @param {number[][]} points
     * @return {PromiseLike<T>}
     */

  }, {
    key: '_findOptimalCenterAndZoom',
    value: function _findOptimalCenterAndZoom(map) {
      var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var sdk = this.sdk;

      var bounds = null;
      if (points.length > 1) {
        bounds = sdk.util.bounds.fromPoints(points);
      } else {
        return Promise.resolve({
          center: points[0] || this.defaultCenterPoint,
          zoom: 14
        });
      }

      return sdk.util.requireCenterAndZoom(map.getType(), bounds, map.container.getSize());
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
     * @return {YaMapManager}
     */
    value: function getManager() {
      if (this._instance) {
        return this._instance;
      }

      return this._instance = new YaMapManager();
    }

    /**
     * @type {YaMapManager}
     * @private
     */

  }]);

  return YaMapManager;
}(_mapManager.MapManager);

YaMapManager._instance = null;