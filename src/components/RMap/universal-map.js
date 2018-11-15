import { YaMapManager } from './providers/ya-map-manager';
import { DoubleGisMapManager } from './providers/double-gis-map-manager';
import { GoogleMapManager } from "./providers/google-map-manager";

const providers = {
  yandex: YaMapManager,
  dg: DoubleGisMapManager,
  google: GoogleMapManager
};

export class UniversalMap {

  /**
   * @type {*}
   * @private
   */
  _map = null;

  /**
   * @type {string}
   * @private
   */
  _defaultProvider = 'yandex';

  /**
   * @type {string}
   * @private
   */
  _provider;

  /**
   * @param {*} options
   */
  constructor (options = {}) {
    const {
      provider = this._defaultProvider
    } = options;

    this.setProvider( provider );
  }

  /**
   * @param {string|*} provider
   */
  setProvider (provider) {
    const providerExists = providers.hasOwnProperty( provider );
    this._provider = providerExists ? provider : this._defaultProvider;
  }

  /**
   * @param {string} domId
   * @param {*} options
   */
  createMap (domId, options = {}) {
    return ( this._map = this.manager.createMap(domId, options) );
  }

  /**
   * @param {Array<Array<number>>} points
   */
  createPlacemarks (points = []) {
    this.manager.createPlacemarks( this._map, points );
  }

  /**
   * Remove all placemarks on the map
   */
  clearPlacemarks () {
    this.manager.clearPlacemarks( this._map );
  }

  /**
   * Updates map within viewport
   */
  fitToViewport () {
    this.manager.fitToViewport( this._map );
  }

  /**
   * @param {string[]} controls
   */
  setControls (controls = []) {
    this.manager.setControls( this._map, controls );
  }

  /**
   * Clears all controls on the map
   */
  clearControls () {
    this.manager.clearControls( this._map );
  }

  /**
   * @param {number[]} center
   * @param {number} zoom
   */
  setCenterAndZoom (center, zoom) {
    this.manager.setCenterAndZoom( this._map, center, zoom );
  }

  /**
   * @param {number[][]} points
   * @return {PromiseLike<T>}
   */
  updateOptimalCenterAndZoom (points = []) {
    return this.manager.updateOptimalCenterAndZoom( this._map, points );
  }

  /**
   * @param {Function} cb
   */
  addPointEventListener (cb = () => {}) {
    this.manager.addPointEventListener( this._map, cb );
  }

  /**
   */
  removePointEventListener () {
    this.manager.removePointEventListener( this._map );
  }

  /**
   * @param {string} query
   * @param {*} options
   * @return {Promise<*>}
   */
  async searchQuery (query = '', options = {}) {
    return this.manager.searchQuery( this._map, query, options );
  }

  /**
   * Destroy the map
   */
  destroy () {
    this.manager.destroy( this._map );
  }

  /**
   * @param {Array<number>} point
   * @return {PromiseLike<T>}
   */
  async resolveAddressByPoint (point) {
    return this.manager.resolveAddressByPoint( this._map, point );
  }

  /**
   * @return {YaMapManager|DoubleGisMapManager|GoogleMapManager}
   */
  get manager () {
    return providers[ this._provider ].getManager();
  }

  /**
   * @return {*}
   */
  get map () {
    return this._map;
  }

  /**
   * @return {boolean}
   */
  get isMapCreated () {
    return !!this._map;
  }
}
