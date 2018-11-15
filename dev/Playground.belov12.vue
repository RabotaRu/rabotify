<template>
  <r-app>
    <div class="playground page11">

      <r-card>
        <r-card-title class="font-display-1">RMap</r-card-title>
        <r-card-text>

          <router-link :to="{ path: '/page12' }">prev page</router-link>
          <router-link :to="{ path: '/page14' }">next page</router-link>

          <div style="margin: 24px 0; width: 300px;">
            <r-text-field v-model="searchQuery" label="Поисковый запрос"></r-text-field>
          </div>

          <div style="margin: 0 0 24px 0;" v-if="mapQueryResponses.length">
            <r-list style="margin: 12px 0; border: 1px solid #ccc;" class="list">
              <r-list-tile class="list__tile_link" v-for="(item, index) in mapQueryResponses" :key="index" @click="onPointPlaced( item )">
                <r-list-tile-sub-title>{{ item.name }}</r-list-tile-sub-title>
              </r-list-tile>
            </r-list>
          </div>

          <div>
            <r-map :height="height"
                   :autoCenter="!editMode"
                   :allowAdd="editMode"
                   pointResolving
                   @pointPlaced="onPointPlaced"
                   :points="points"
                   :query="searchQuery"
                   :queryResponseLimit="5"
                   @queryResponse="onQueryResponse"
                   provider="yandex"></r-map>
          </div>

          <div style="margin: 24px 0; width: 200px;">
            <r-text-field v-model="lazyNumber" type="number" label="Количество карт"></r-text-field>
            <r-btn @click="editMode = !editMode">Переключить режим расстановки точек</r-btn>
          </div>

          <r-map :height="height"
                 :controls="controls"
                 :allowAdd="editMode"
                 pointResolving
                 :autoCenter="!editMode"
                 @pointPlaced="onPointPlaced"
                 :points="points"
                 provider="yandex"></r-map>

          <r-map :height="height" :controls="controls" :points="points" provider="dg"></r-map>

          <r-map v-for="(map, index) in maps"
                 height="450px"
                 :provider="map.provider"
                 :controls="controls"
                 :center="map.center"
                 :zoom="map.zoom"
                 :points="map.points"
                 :key="index"></r-map>

        </r-card-text>
      </r-card>

    </div>
  </r-app>
</template>

<script>
  export default {
    data: () => ({
      lazyNumber: 0,
      number: 0,
      height: 450,
      controls: [],
      controlIndex: 0,
      points: [],
      pointIndex: 0,
      theta: 0,
      editMode: false,
      lazyQuery: '',
      searchQuery: null,
      mapQueryResponses: []
    }),

    methods: {
      generatePoints (startPoint, number = 100) {
        let theta = 0;
        return Array( number ).fill( 0 ).map((v, i) => i).map((value, index) => {
          let fnOffset = Math.sin( theta ) / 10;
          theta += .1;
          /*
          return {
            point: [
              startPoint[0] + fnOffset,
              startPoint[1] + index * .02,
            ],
            name: Math.random().toString()
          }
           */

          return [
            startPoint[0] + fnOffset,
            startPoint[1] + index * .02,
          ];
        });
      },

      addControl () {
        let controls = [ 'zoom', 'fullscreen' ];
        this.controls.push( controls[ this.controlIndex++ % controls.length ]);

        if (this.controls.length > 2) {
          this.controls = [];
        }
      },

      addPoint () {
        const startPoint = [ 55.76, 37.64 - 1 ];
        let fnOffset = Math.sin( this.theta ) / 10;
        this.theta += .1;

        const point = [
          startPoint[0] + fnOffset,
          startPoint[1] + this.pointIndex++ * .02,
        ];

        if (this.pointIndex < 20) {
          this.points.push( point );
        }
      },

      onPointPlaced (point) {
        this.points.push( point );

        console.log( 'Point:', point );
      },

      onQueryResponse (results = []) {
        this.mapQueryResponses = [ ...results ];

        console.log( 'Points:', this.mapQueryResponses );
      }
    },

    computed: {
      maps () {
        let providers = [ 'yandex', 'dg', 'google' ];

        return Array( this.number ).fill(0).map((_, index) => {
          return {
            provider: providers[ index % providers.length ],
            center: [ 55.76, 37.64 ],
            zoom: 10,
            points: this.generatePoints([ 55.76, 37.64 - 1 ])
          }
        });
      }
    },

    watch: {
      lazyNumber (value) {
        this.number = Number( value ) || 0;
      }
    },

    mounted () {
      let k = 1;
      setInterval(_ => {
        // this.height += k * 400;
        if (this.height < 50) {
          this.height = 50;
        }
        k = -k;

        this.addControl();
      }, 1000);

      setInterval(_ => {
        setInterval(_ => {
          this.addPoint();
        }, 300);
      }, 3000);
    }
  }
</script>

<style lang="scss">
  .playground {
    > .card {
      margin: 12px;
    }

    &:after {
      height: 300px;
      content: '';
      width: 100%;
      display: block;
    }

    .r-map {
      margin-bottom: 24px;
      border: 1px solid #ccc;
    }
  }
</style>
