<script>
  import RSmartRender from '../RSmartRender/RSmartRender.vue';
  import { UniversalMap } from "./universal-map";

  // Directives
  import Resize from '../../directives/resize';

  export default {
    name: 'r-map',

    components: {
      RSmartRender
    },

    directives: {
      Resize
    },

    props: {
      provider: {
        type: String,
        default: 'yandex'
      },
      width: {
        type: [ String, Number ],
        default: () => '100%'
      },
      height: {
        type: [ String, Number ],
        default: () => '300px'
      },
      center: {
        type: Array,
        default: () => [ 55.76, 37.64 ] // Moscow
      },
      zoom: {
        type: Number,
        default: 10
      },
      points: {
        type: Array,
        default: () => []
      },
      autoCenter: {
        type: Boolean,
        default: true
      },
      controls: {
        type: Array,
        default: () => [ 'zoom', 'fullscreen' ]
      },
      query: {
        type: String,
        default: null
      },
      queryResponseLimit: {
        type: Number,
        default: 5
      },
      allowAdd: Boolean,
      pointResolving: Boolean,
      visibilityObserver: Boolean,
      options: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      mapDomId: 'empty',
      loaded: false,
      created: false,
      destroyed: false,
      nonreactive: new Map()
    }),

    methods: {
      onRender () {
        const map = new UniversalMap({ provider: this.provider });

        this.mapDomId = map.manager.nextDomId;

        this.nonreactive.set('map', map);
        this.nonreactive.set('manager', map.manager);

        this.manager.load().then(_ => {
          this.$nextTick(_ => this.onSdkLoaded());
        });
      },

      onResize () {
        if (!this.created) {
          return;
        }

        this.fitToViewport();

        if (this.autoCenter) {
          this.updateOptimalCenterAndZoom();
        }
      },

      onSdkLoaded () {
        if (this.destroyed) {
          return;
        }

        this.nonreactive.set('sdk', this.manager.sdk);

        this.loaded = true;

        this.createMap();

        if (this.points && Array.isArray( this.points )) {
          this.createPlacemarks();

          if (this.autoCenter) {
            this.updateOptimalCenterAndZoom();
          }
        }

        this.toggleAllowAdd( this.allowAdd );

        if (this.query) {
          this.searchQuery();
        }

        this.$emit( 'loaded', this.map );
      },

      getMap () {
        return this.nonreactive.get('map');
      },

      createMap () {
        const map = this.getMap();

        map.createMap(this.domIdentifier, {
          center: this.center,
          zoom: this.zoom,
          controls: this.controls,
          avoidFractionalZoom: false,
          suppressMapOpenBlock: true,
          ...( this.options || {} )
        });

        this.created = true;
      },

      createPlacemarks () {
        const map = this.getMap();
        map.createPlacemarks( this.points );
      },

      clearPlacemarks () {
        const map = this.getMap();
        map.clearPlacemarks();
      },

      fitToViewport () {
        const map = this.getMap();
        map.fitToViewport();
      },

      setControls () {
        const map = this.getMap();
        map.setControls( this.controls );
      },

      updateOptimalCenterAndZoom () {
        const map = this.getMap();
        map.updateOptimalCenterAndZoom( this.points || [] );
      },

      toggleAllowAdd (allowAdd = true) {
        if (allowAdd) {
          this.addPointEventListener();
        } else {
          this.removePointEventListener();
        }
      },

      addPointEventListener () {
        const map = this.getMap();

        map.addPointEventListener(point => {
          if (this.pointResolving) {
            map.resolveAddressByPoint( point ).then(pointInfo => {
              this.$emit('pointPlaced', pointInfo);
            }).catch(_ => {
              this.$emit('pointPlaced', point);
            });
          } else {
            this.$emit('pointPlaced', point);
          }
        });
      },

      removePointEventListener () {
        const map = this.getMap();
        map.removePointEventListener();
      },

      searchQuery () {
        const query = this.query;
        const map = this.getMap();

        map.searchQuery( query, { limit: this.queryResponseLimit } ).then(response => {
          this.$emit('queryResponse', response);
        }).catch(_ => {
          this.$emit('queryResponse', []);
        });
      },

      destroyMap () {
        const map = this.getMap();
        map.destroy();
      }
    },

    computed: {
      domIdentifier () {
        return `r-${this.mapDomId}`;
      },

      computedWidth () {
        if (typeof this.width === 'number') {
          return `${this.width}px`;
        }
        return this.width;
      },

      computedHeight () {
        if (typeof this.height === 'number') {
          return `${this.height}px`;
        }
        return this.height;
      },

      computedClasses () {
        return {
          'r-map': true,
          'r-map_not-loaded': !this.loaded
        };
      },

      computedStyles () {
        return {
          width: this.computedWidth,
          height: this.computedHeight
        };
      },

      sdk () {
        return this.nonreactive.get('sdk');
      },

      /**
       * @return {UniversalMap}
       */
      map () {
        return this.nonreactive.get('map');
      },

      manager () {
        return this.nonreactive.get('manager');
      }
    },

    watch: {
      height () {
        if (this.created) {
          this.onResize();
        }
      },

      points () {
        if (this.created) {
          this.clearPlacemarks();
          this.createPlacemarks();

          if (this.autoCenter) {
            this.updateOptimalCenterAndZoom();
          }
        }
      },

      controls () {
        if (this.created) {
          this.setControls();
        }
      },

      allowAdd (value) {
        if (this.created) {
          this.toggleAllowAdd( value );
        }
      },

      query (value) {
        this.searchQuery();
      }
    },

    beforeDestroy () {
      if (this.created) {
        this.destroyMap();
      }
      this.destroyed = true;
    }
  };
</script>

<template>
  <r-smart-render onlyBrowser
                  :elementWidth="computedWidth"
                  :elementHeight="computedHeight"
                  :class="computedClasses"
                  :visibilityObserver="visibilityObserver"
                  @render="onRender">
    <div class="r-map__map" :style="computedStyles" :id="domIdentifier" v-resize="onResize"></div>
  </r-smart-render>
</template>

<style lang="scss">
  @import "../../styles/components/_map.scss";
</style>
