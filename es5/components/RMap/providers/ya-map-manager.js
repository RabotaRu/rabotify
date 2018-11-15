'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YaMapManager = exports.MAP_SDK = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapManager = require('../map-manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAP_SDK = exports.MAP_SDK = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

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
        controls: ['zoomControl', 'fullscreenControl']
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

      for (var i = 0; i < points.length; ++i) {
        var point = points[i];
        var placemark = this._createCustomPlacemark(point);
        map.geoObjects.add(placemark);
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
      var coord = null,
          name = null;
      if (Array.isArray(point)) {
        coord = point;
      } else {
        coord = point.coord;
        name = point.name;
      }

      var contentOptions = {};

      if (name) {
        Object.assign(contentOptions, {
          hintContent: name,
          balloonContent: name
        });
      }

      var placemark = new this.sdk.Placemark(coord, contentOptions, {
        preset: 'islands#icon',
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        //iconImageHref: 'circle@3x.png',
        // Размеры метки.
        // iconImageSize: [15, 15],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [0, 0]
      });

      /* placemark.events
        .add('mouseenter', function (e) {
          // Ссылку на объект, вызвавший событие,
          // можно получить из поля 'target'.
          e.get('target').options.set('iconImageHref', 'https://yastatic.net/www/_/x/Q/xk8YidkhGjIGOrFm_dL5781YA.svg');
          e.get('target').options.set('iconImageSize', [20, 20]);
        })
        .add('mouseleave', function (e) {
          e.get('target').options.set('iconImageHref', 'circle@3x.png');
          e.get('target').options.set('iconImageSize', [15, 15]);
        }); */

      return placemark;
    }
  }, {
    key: 'sdkObjectName',
    get: function get() {
      return 'ymaps';
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