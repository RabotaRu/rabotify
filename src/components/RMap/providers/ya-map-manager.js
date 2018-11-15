import { MapManager } from '../map-manager';

export const MAP_SDK = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
export const MAP_SDK_PROP = 'ymaps';

export class YaMapManager extends MapManager {

  /**
   * @type {YaMapManager}
   * @private
   */
  static _instance = null;

  /**
   * @return {YaMapManager}
   */
  static getManager () {
    if (this._instance) {
      return this._instance;
    }

    return ( this._instance = new YaMapManager() );
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
    return new Promise(resolve => this.sdk.ready( resolve ));
  }

  /**
   * @param {string} domId
   * @param {*} options
   */
  createMap (domId, options = {}) {
    options = Object.assign({}, options, {
      controls: this.resolveControls( options.controls )
    });

    return new this.sdk.Map(domId, options);
  }

  /**
   * @param {*} map
   * @param {Array<Array<number>>} points
   */
  createPlacemarks (map, points = []) {
    const geoCollection = new this.sdk.GeoObjectCollection({}, {
      preset: 'islands#redCircleIcon',
      strokeWidth: 2
    });

    for (let i = 0; i < points.length; ++i) {
      let point = points[ i ];
      let placemark = this._createCustomPlacemark( point );
      placemark.editor.startEditing();
      geoCollection.add( placemark );
    }

    map.geoObjects.add( geoCollection );
  }

  /**
   * Remove all placemarks on the map
   *
   * @param {*} map
   */
  clearPlacemarks (map) {
    map.geoObjects.removeAll();
  }

  /**
   * Updates map within viewport
   *
   * @param {*} map
   */
  fitToViewport (map) {
    setTimeout(_ => {
      map && map.container.fitToViewport();
    }, 0);
  }

  /**
   * @param {*} map
   * @param {string[]} controls
   */
  setControls (map, controls = []) {
    this.clearControls( map );

    const resolvedControls = this.resolveControls( controls );

    for (let i = 0; i < resolvedControls.length; ++i) {
      map.controls.add( resolvedControls[ i ] );
    }
  }

  /**
   * Clears all controls on the map
   *
   * @param {*} map
   */
  clearControls (map) {
    const controls = Object.keys( map.controls._controlsByKey );

    for (let i = 0; i < controls.length; ++i) {
      map.controls.remove( controls[ i ] );
    }
  }

  /**
   * @param {*} map
   * @param {number[]} center
   * @param {number} zoom
   */
  setCenterAndZoom (map, center, zoom) {
    center = this.toNativePoint( center );

    map.panTo( center, { duration: 200 } ).then(_ => {
      map.setZoom( zoom );
    });
  }

  /**
   * @param {*} map
   * @param {number[][]} points
   * @return {PromiseLike<T>}
   */
  updateOptimalCenterAndZoom (map, points = []) {
    if (!points.length) {
      return Promise.resolve();
    }

    points = this.toNativePoints( points );

    return this._findOptimalCenterAndZoom( map, points ).then(({ center, zoom } = {}) => {
      this.setCenterAndZoom( map, center, zoom );
    });
  }

  /**
   * @param {*} map
   * @param {Function} cb
   */
  addPointEventListener (map, cb = () => {}) {
    const fn = e => cb( e.get('coords') );

    map._placementClickEvents = (map._placementClickEvents || []).concat( fn );
    map.events.add( 'click', fn );

    map.cursors.push( 'pointer' );
  }

  /**
   * @param {*} map
   */
  removePointEventListener (map) {
    const placementClicks = map._placementClickEvents || [];

    for (let i = 0; i < placementClicks.length; ++i) {
      let clickListener = placementClicks[ i ];
      map.events.remove( 'click', clickListener );
    }

    const cursorStack = map.cursors._cursorStack || [];
    const last = cursorStack[ cursorStack.length - 1 ];
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
  async searchQuery (map, query = '', { limit = 5 } = {}) {
    return this.sdk.geocode(query, {
      results: limit
    }).then(res => {
      const geoObjects = res.geoObjects.toArray();

      return geoObjects.map(geoObject => {
        return this.extractGeoObjectData( geoObject );
      });
    });
  }


  /**
   * Destroy the map
   *
   * @param {*} map
   */
  destroy (map) {
    map.destroy();
  }

  /**
   * @param {*} map
   * @param {Array<number>} point
   * @return {PromiseLike<T>}
   */
  async resolveAddressByPoint (map, point) {
    point = this.toNativePoint( point );

    return this.sdk.geocode( point ).then(res => {
      const firstGeoObject = res.geoObjects.get( 0 );
      return this.extractGeoObjectData( firstGeoObject, point );
    });
  }

  /**
   * @param {*} geoObject
   * @param {number[]|*} originPoint
   * @return {{point: number[], name: string, adressLine: string, locality: string, debugProperties: *}}
   */
  extractGeoObjectData (geoObject, originPoint = null) {
    let parsedData = geoObject._getParsedXal();
    let locality = (parsedData.localities || [])[ 0 ];
    if (!locality) {
      locality = (parsedData.administrativeAreas || [])[ 0 ];
    }

    return {
      kind: geoObject.properties.get('metaDataProperty').GeocoderMetaData.kind,
      point: this.toNativePoint( originPoint || geoObject.geometry.getCoordinates() ),
      name: geoObject.properties.get('name'),
      adressLine: geoObject.getAddressLine(),
      locality,
      debugProperties: geoObject.properties.getAll()
    };
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
   * @param {number[]|{coord: number[], name: string}} point
   * @return {*}
   * @private
   */
  _createCustomPlacemark (point) {
    let coord = this.toNativePoint( point );
    let name = null;

    if (!Array.isArray( point )) {
      name = point.name || 'Отмеченная точка';
    }

    let contentOptions = {};

    if (name) {
      Object.assign(contentOptions, {
        hintContent: name,
        balloonContent: name
      });
    }

    return new this.sdk.Placemark( coord, contentOptions );
  }

  /**
   * @param {*} map
   * @param {number[][]} points
   * @return {PromiseLike<T>}
   */
  _findOptimalCenterAndZoom (map, points = []) {
    const sdk = this.sdk;

    let bounds = null;
    if (points.length > 1) {
      bounds = sdk.util.bounds.fromPoints( points );
    } else {
      return Promise.resolve({
        center: points[ 0 ] || this.defaultCenterPoint,
        zoom: 14
      });
    }

    return sdk.util.requireCenterAndZoom(
      map.getType(), bounds, map.container.getSize()
    );
  }
}
