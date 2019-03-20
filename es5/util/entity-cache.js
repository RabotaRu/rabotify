"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntityCache = exports.EntityCache = function () {

  /**
   * @param {number} maxEntitiesNumber
   */


  /**
   * @type {*}
   * @private
   */
  function EntityCache(maxEntitiesNumber) {
    _classCallCheck(this, EntityCache);

    this._maxEntitiesNumber = 0;
    this._cache = {};
    this._cacheHistory = [];

    this._maxEntitiesNumber = maxEntitiesNumber;
  }

  /**
   * @param {string} key
   * @returns {*|null}
   */


  /**
   * @type {string[]}
   * @private
   */


  /**
   * @type {number}
   * @private
   */


  _createClass(EntityCache, [{
    key: "getEntity",
    value: function getEntity(key) {
      return this._cache[key] || null;
    }

    /**
     * @param {string} key
     * @param {*} entity
     * @returns {EntityCache}
     */

  }, {
    key: "addEntity",
    value: function addEntity(key, entity) {
      if (!this.hasEntity(key)) {
        this._cache[key] = entity;
        this._cacheHistory.push(key);
      }
      this._freeOldEntities();
      return this;
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */

  }, {
    key: "hasEntity",
    value: function hasEntity(key) {
      return !!this._cache[key];
    }

    /**
     * @param {string} key
     * @returns {EntityCache}
     */

  }, {
    key: "removeEntity",
    value: function removeEntity(key) {
      if (this.hasEntity(key)) {
        this._cache[key].remove && this._cache[key].remove();
        this._cache[key] = null;
        delete this._cache[key];
      }
      return this;
    }

    /**
     * @returns {number}
     */

  }, {
    key: "_freeOldEntities",


    /**
     * @private
     */
    value: function _freeOldEntities() {
      while (this._cacheHistory.length > this._maxEntitiesNumber) {
        this.removeEntity(this._cacheHistory.shift());
      }
    }
  }, {
    key: "size",
    get: function get() {
      return Object.keys(this._cache || {}).length;
    }
  }]);

  return EntityCache;
}();