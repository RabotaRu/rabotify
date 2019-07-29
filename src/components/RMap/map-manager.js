import { ScriptLoader } from '@rabota/loader';

export class MapManager {

  /**
   * @type {number}
   * @private
   */
  _currentId = 1;

  /**
   * @type {boolean}
   * @private
   */
  _sdkLoaded = false;

  /**
   * @type {boolean}
   * @private
   */
  _sdkLoading = false;

  /**
   * @type {Array}
   * @private
   */
  _queue = [];

  /**
   * @type {ScriptLoader}
   * @private
   */
  _resourceLoader = null;

  /**
   * @type {string}
   * @private
   */
  _apiKey = null;

  /**
   * @type {number[]}
   * @private
   */
  _defaultCenterPoint = [ 55.76, 37.64 ];

  constructor () {
    this._resourceLoader = new ScriptLoader();
  }

  /**
   * @return {Promise<*>}
   */
  async loadSdk (sdkUrl) {
    if (this._sdkLoaded) {
      return this.sdk;
    } else if (this._sdkLoading) {
      return this._enqueue();
    }

    this._sdkLoading = true;

    return this._loadResource( sdkUrl ).then(resource => {
      return this.onSdkReady();
    }).then(_ => {
      const sdk = this.sdk;

      this._sdkLoaded = true;
      this._sdkLoading = false;

      this._flushQueue( sdk );

      return sdk;
    }).catch(error => {
      this._flushQueue( null, error );

      throw error; // pass next
    });
  }

  /**
   * Abstract method for sdk ready
   *
   * @abstract
   * @return {Promise<void>}
   */
  onSdkReady () {
    console.error('Not implemented');
  }

  /**
   * @param {string} domId
   * @param {*} options
   */
  createMap (domId, options = {}) {
    console.error('Not implemented');
  }

  /**
   * @param {*} map
   * @param {Array<Array<number>>} points
   */
  createPlacemarks (map, points = []) {
    console.error('Not implemented');
  }

  /**
   * Remove all placemarks on the map
   *
   * @param {*} map
   */
  clearPlacemarks (map) {
    console.error('Not implemented');
  }

  /**
   * Updates map within viewport
   *
   * @param {*} map
   */
  fitToViewport (map) {
    console.error('Not implemented');
  }

  /**
   * @param {*} map
   * @param {string[]} controls
   */
  setControls (map, controls = []) {
    console.error('Not implemented');
  }

  /**
   * Clears all controls on the map
   *
   * @param {*} map
   */
  clearControls (map) {
    console.error('Not implemented');
  }

  /**
   * @param {*} map
   * @param {number[]} center
   * @param {number} zoom
   */
  setCenterAndZoom (map, center, zoom) {
    console.error('Not implemented');
  }

  /**
   * @param {*} map
   * @param {number[][]} points
   * @return {PromiseLike<T>}
   */
  updateOptimalCenterAndZoom (map, points = []) {
    console.error('Not implemented');
  }

  /**
   * @param {*} map
   * @param {Function} cb
   */
  addPointEventListener (map, cb = () => {}) {
    console.error('Not implemented');
  }

  /**
   * @param {*} map
   */
  removePointEventListener (map) {
    console.error('Not implemented');
  }

  /**
   * @param {*} map
   * @param {string} query
   * @param {number} limit
   * @return {Promise<*>}
   */
  async searchQuery (map, query = '', { limit } = {}) {
    console.error('Not implemented');
  }

  /**
   * Destroy the map
   *
   * @param {*} map
   */
  destroy (map) {
    console.error('Not implemented');
  }

  /**
   * @param {*} map
   * @param {Array<number>} point
   * @return {PromiseLike<T>}
   */
  async resolveAddressByPoint (map, point) {
    console.error('Not implemented');
  }

  /**
   * @param {string[]} controls
   * @return {string[]}
   */
  resolveControls (controls = []) {
    const mapping = this.controlsMapping;

    return controls.map(control => {
      return mapping[ control ];
    }).filter(resolved => {
      return !!resolved;
    }).reduce((unique, value) => {
      return unique.includes( value )
        ? unique
        : unique.concat( value );
    }, []);
  }

  /**
   * @param {number[]|any[]} points
   * @return {number[][]}
   */
  toNativePoints (points = []) {
    return points.map(point => {
      return this.toNativePoint( point );
    });
  }

  /**
   * @param {*|number[]} point
   * @return {number[]}
   */
  toNativePoint (point) {
    return Array.isArray( point )
      ? point : point.point;
  }

  /**
   * @param {*} geoObject
   * @param {number[]|*} originPoint
   * @return {{point: number[], name: string, adressLine: string, locality: string, debugProperties: *}}
   */
  extractGeoObjectData (geoObject, originPoint = null) {
    return geoObject;
  }

  /**
   * @param {string} apiKey
   */
  setApiKey (apiKey) {
    this._apiKey = apiKey;
  }

  /**
   * @return {number}
   */
  get nextId () {
    return this._currentId++;
  }

  /**
   * @returns {string}
   */
  get apiKey () {
    return this._apiKey;
  }

  /**
   * @return {*}
   */
  get controlsMapping () {
    return {};
  }

  /**
   * @return {string}
   */
  get nextDomId () {
    return `${this.sdkObjectName}-${this.nextId}`;
  }

  /**
   * @return {boolean}
   */
  get sdkLoaded () {
    return this._sdkLoaded;
  }

  /**
   * @return {*}
   */
  get sdk () {
    return window && window[ this.sdkObjectName ];
  }

  /**
   * @abstract
   * @return {string}
   */
  get sdkObjectName () {
    throw new Error( 'Sdk name not implemented' );
  }

  /**
   * @return {number[]}
   */
  get defaultCenterPoint () {
    return this._defaultCenterPoint;
  }

  /**
   * @param url
   * @return {Promise<any>}
   * @private
   */
  async _loadResource (url) {
    if (typeof window === 'undefined') {
      return;
    }

    return this._resourceLoader.retry(url, 20);
  }

  /**
   * @return {Promise<any>}
   * @private
   */
  _enqueue () {
    return new Promise((resolve, reject) => {
      this._queue.push([ resolve, reject ]);
    });
  }

  /**
   * @private
   */
  _flushQueue (resolved, rejected) {
    this._queue.forEach(([resolve, reject]) => {
      if (resolved) {
        resolve( resolved );
      } else if (rejected) {
        reject( rejected );
      } else {
        resolve();
      }
    });

    this._queue = [];
  }
}
