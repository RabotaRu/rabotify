import { MapManager } from '../map-manager';

export const MAP_SDK_KEY = 'AIzaSyAyK9FgGmO_i0IoxeJwT3bTBHv0oi1fZT0';
export const MAP_SDK = `https://maps.googleapis.com/maps/api/js?key=${MAP_SDK_KEY}`;
export const MAP_SDK_PROP = 'google';

export class GoogleMapManager extends MapManager {

  /**
   * @type {GoogleMapManager}
   * @private
   */
  static _instance = null;

  /**
   * @return {GoogleMapManager}
   */
  static getManager () {
    if (this._instance) {
      return this._instance;
    }

    return ( this._instance = new GoogleMapManager() );
  }

  /**
   * @return {Promise<*>}
   */
  load () {
    return this.loadSdk( MAP_SDK );
  }

  /**
   * @return {Promise<any>}
   */
  onSdkReady (name) {
    return Promise.resolve();
  }

  /**
   * @param {string} domId
   * @param {*} options
   */
  createMap (domId, options = {}) {
    const { center } = options;
    options.center = {
      lat: center[0],
      lng: center[1]
    };

    return new this.sdk.maps.Map(document.getElementById( domId ), options);
  }

  /**
   * @param {*} map
   * @param {Array<Array<number>>} points
   */
  createPlacemarks (map, points = []) {
    for (let i = 0; i < points.length; ++i) {
      let point = points[ i ];
      this._createCustomPlacemark( map, point );
    }
  }

  /**
   * @return {string}
   */
  get sdkObjectName () {
    return MAP_SDK_PROP;
  }

  /**
   * @param {*} map
   * @param {number[]|{coord: number[], name: string}} point
   * @return {*}
   * @private
   */
  _createCustomPlacemark (map, point) {
    let coord = null;
    if (Array.isArray( point )) {
      coord = point;
    } else {
      coord = point.point;
    }
    const position = { lat: coord[ 0 ], lng: coord[ 1 ] };
    return new this.sdk.maps.Marker({ position, map });
  }
}
