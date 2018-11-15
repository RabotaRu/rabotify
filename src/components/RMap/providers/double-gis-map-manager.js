import { MapManager } from '../map-manager';

export const MAP_SDK = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full';
export const MAP_SDK_PROP = 'DG';

export class DoubleGisMapManager extends MapManager {

  /**
   * @type {DoubleGisMapManager}
   * @private
   */
  static _instance = null;

  /**
   * @return {DoubleGisMapManager}
   */
  static getManager () {
    if (this._instance) {
      return this._instance;
    }

    return ( this._instance = new DoubleGisMapManager() );
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
  onSdkReady () {
    return this.sdk; // DG is Promise type
  }

  /**
   * @param {string} domId
   * @param {*} options
   */
  createMap (domId, options = {}) {
    const map = this.sdk.map(domId, options);

    const { controls = [] } = options;

    this.clearControls( map );
    this.setControls( map, controls );

    return map;
  }

  /**
   * @param {*} map
   * @param {Array<Array<number>>} points
   */
  createPlacemarks (map, points = []) {
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

    for (let i = 0; i < points.length; ++i) {
      let point = points[ i ];
      let placemark = this._createCustomPlacemark( point );
      placemark.addTo( map );

      map._myMarkers.push( placemark );
    }
  }

  /**
   * Remove all placemarks on the map
   *
   * @param {*} map
   */
  clearPlacemarks (map) {
    if (!map || !map._myMarkers) {
      return;
    }
    const markers = map._myMarkers;

    for (let i = 0; i < markers.length; ++i) {
      const marker = markers[ i ];
      marker && marker.remove();
    }

    map._myMarkers = [];
  }

  /**
   * Updates map within viewport
   *
   * @param {*} map
   */
  fitToViewport (map) {
    map && map.invalidateSize( true );
  }

  /**
   * @param {*} map
   * @param {string[]} controls
   */
  setControls (map, controls = []) {
    this.clearControls( map );

    const resolvedControls = this.resolveControls( controls );

    for (let i = 0; i < resolvedControls.length; ++i) {
      const control = map[ resolvedControls[ i ] ];
      if (control && !control.map) {
        control.addTo( map );
      }
    }
  }

  /**
   * Clears all controls on the map
   *
   * @param {*} map
   */
  clearControls (map) {
    Object.values( this.controlsMapping ).forEach(value => {
      const control = map[ value ];
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
  setCenterAndZoom (map, center, zoom) {
    map.panTo( center );
    map.setZoom( zoom );
  }

  /**
   * @param {*} map
   * @param {number[][]} points
   * @return {PromiseLike<T>}
   */
  updateOptimalCenterAndZoom (map, points = []) {
    const bounds = this._findGeometryBounds( map, points );

    try {
      map.fitBounds( bounds );
    } catch (e) {}

    return Promise.resolve();
  }

  /**
   * Destroy the map
   *
   * @param {*} map
   */
  destroy (map) {
    map.remove();
  }

  /**
   * @return {string}
   */
  get sdkObjectName () {
    return MAP_SDK_PROP;
  }

  /**
   * @return {*}
   */
  get controlsMapping () {
    return {
      zoom: 'zoomControl',
      fullscreen: 'fullscreenControl'
    };
  }

  /**
   * @param {number[]|{point: number[], name: string}} point
   * @return {*}
   * @private
   */
  _createCustomPlacemark (point) {
    let coord = null;
    if (Array.isArray( point )) {
      coord = point;
    } else {
      coord = point.point;
    }
    return this.sdk.marker( coord );
  }

  /**
   * @param {*} map
   * @param {number[][]} points
   * @return {PromiseLike<T>}
   * @private
   */
  _findGeometryBounds (map, points = []) {
    const sdk = this.sdk;

    const group = sdk.featureGroup( map._myMarkers || [] );

    return group.getBounds();
  }
}
