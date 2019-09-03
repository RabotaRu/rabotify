<template>
  <r-app>
    <div class="playground page12">

      <r-card>
        <r-card-title class="font-display-1">RSuggester</r-card-title>
        <r-card-text>

          <router-link :to="{ path: '/page13' }">prev page</router-link>

          <br>
          <br>

          <div>

            <r-container>
              <r-layout row wrap>

                <r-flex d-flex xs-12 sm-and-up-6>
                  <div class="block primary">
                    <h1 class="text_white">Без крестика</h1>
                    <h2 class="text_white">Необязательное соответствие</h2>
                    <r-suggester placeholder="Поиск..." :items="items" color="white"></r-suggester>
                    <r-suggester placeholder="Поиск..." :items="itemsText" color="white"></r-suggester>

                    <h2 class="text_white">Обязательное соответствие</h2>
                    <r-suggester placeholder="Поиск..." :items="items" color="white" strictValue></r-suggester>
                    <r-suggester placeholder="Поиск..." :items="itemsText" color="white" strictValue></r-suggester>
                  </div>
                </r-flex>

                <r-flex d-flex xs-12 sm-and-up-6>
                  <div class="block primary">
                    <h1 class="text_white">С крестиком</h1>
                    <h2 class="text_white">Необязательное соответствие</h2>
                    <r-suggester placeholder="Поиск..." :items="items" color="white" clearable></r-suggester>
                    <r-suggester placeholder="Поиск..." :items="itemsText" color="white" clearable></r-suggester>

                    <h2 class="text_white">Обязательное соответствие</h2>
                    <r-suggester placeholder="Поиск..." :items="items" color="white" strictValue clearable></r-suggester>
                    <r-suggester placeholder="Поиск..." :items="itemsText" color="white" strictValue clearable></r-suggester>
                  </div>
                </r-flex>

                <r-flex d-flex xs-12 sm-and-up-6>
                  <div class="block">
                    <h2>Необязательное соответствие</h2>
                    <r-suggester placeholder="Поиск..." :items="items"></r-suggester>
                    <r-suggester placeholder="Поиск..." :items="itemsText"></r-suggester>

                    <h2>Обязательное соответствие</h2>
                    <r-suggester placeholder="Поиск..." :items="items" strictValue></r-suggester>
                    <r-suggester placeholder="Поиск..." :items="itemsText" strictValue></r-suggester>
                  </div>
                </r-flex>

                <r-flex d-flex xs-12 sm-and-up-6>
                  <div class="block">
                    <h2>Необязательное соответствие</h2>
                    <r-suggester label="Поиск..." :items="items"></r-suggester>
                    <r-suggester label="Поиск..." :items="itemsText"></r-suggester>

                    <h2>Обязательное соответствие</h2>
                    <r-suggester label="Поиск..." :items="items" strictValue></r-suggester>
                    <r-suggester label="Поиск..." :items="itemsText" strictValue></r-suggester>
                  </div>
                </r-flex>

                <r-flex d-flex xs-12 sm-and-up-6>
                  <div class="block">
                    <h2>Фейковый бэк (необязательное соответствие)</h2>
                    <r-suggester placeholder="Поиск..." :fetch="search"></r-suggester>

                    <h2>Фейковый бэк (обязательное соответствие)</h2>
                    <r-suggester placeholder="Поиск..." :fetch="search" strictValue></r-suggester>
                  </div>
                </r-flex>

                <r-flex d-flex xs-12 sm-and-up-6>
                  <div class="block">
                    <h2>Реальные данные (необязательное соответствие)</h2>
                    <r-suggester placeholder="Поиск..."
                                 :fetch="searchReal"
                                 v-model="searchModel"
                                 selectFirstOnEnter></r-suggester>

                    <h2>Реальные данные (обязательное соответствие)</h2>
                    <r-suggester placeholder="Поиск..."
                                 :fetch="searchReal"
                                 strictValue
                                 v-model="searchModel2"
                                 selectFirstOnEnter></r-suggester>
                  </div>
                </r-flex>

                <r-flex d-flex xs-12 sm-and-up-6>
                  <div class="block">
                    <h1>С крестиком</h1>
                    <h2>Реальные данные (необязательное соответствие)</h2>
                    <r-suggester placeholder="Поиск..."
                                 :fetch="searchReal"
                                 v-model="searchModel"
                                 selectFirstOnEnter
                                 clearable></r-suggester>

                    <h2>Реальные данные (обязательное соответствие)</h2>
                    <r-suggester placeholder="Поиск..."
                                 :fetch="searchReal"
                                 strictValue
                                 v-model="searchModel2"
                                 selectFirstOnEnter
                                 clearable></r-suggester>
                  </div>
                </r-flex>

                <r-flex d-flex xs-12 sm-and-up-6>
                  <div class="block">
                    <h1>Prefetch</h1>
                    <h2>Реальные данные (необязательное соответствие)</h2>
                    <r-suggester placeholder="Поиск..."
                                 :fetch="searchReal"
                                 prefetch
                                 v-model="searchModel"
                                 selectFirstOnEnter
                                 clearable></r-suggester>

                    <h2>Реальные данные (обязательное соответствие)</h2>
                    <r-suggester placeholder="Поиск..."
                                 :fetch="searchReal"
                                 prefetch
                                 strictValue
                                 v-model="searchModel2"
                                 selectFirstOnEnter
                                 clearable></r-suggester>
                  </div>
                </r-flex>

                <r-flex d-flex xs-12 sm-and-up-6>
                  <div class="block">
                    <h1>Поиск по местам</h1>
                    <r-suggester placeholder="Поиск по местам..."
                                 :fetch="searchReal2"
                                 prefetch
                                 v-model="searchModel3"
                                 strictValue
                                 selectFirstOnEnter
                                 clearable></r-suggester>
                  </div>
                </r-flex>

              </r-layout>
            </r-container>

          </div>

        </r-card-text>
      </r-card>

    </div>
  </r-app>
</template>

<script>
  import MdSearch from '@rabota/md-svg-vue/dist/action/MdSearch.vue';
  import MdKeyboardArrowDown from '@rabota/md-svg-vue/dist/hardware/MdKeyboardArrowDown.vue';

  export default {

    components: {
      MdSearch,
      MdKeyboardArrowDown
    },

    data: () => ({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      items: [],
      itemsText: [],

      searchModel: {"id":4,"name":"водитель"},
      searchModel2: 'водитель',
      searchModel3: null
    }),

    created () {
      const splits = this.text.split( ' ' );
      this.items = Array( 20 ).fill(0).map((v, i) => {
        return {
          id: i,
          name: splits[ i % splits.length ]
        };
      });

      this.itemsText = splits.slice( 0 );
    },

    methods: {
      search (query) {
        console.log( `Searching "${query}"...` );

        return new Promise((resolve, reject) => {
          setTimeout(_ => {
            const foundItems = this.items.filter(item => {
              return item.name.toLowerCase().includes( query.toLowerCase() );
            });

            resolve( foundItems );
          }, Math.random() * 100 + 10);
        });
      },

      searchReal (query, requestId) {
        return fetch('http://api.rabota.ru/v4/queries/suggest.json', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query, request_id: requestId })
        }).then(response => response.json()).then(json => this.delay( Math.random() * 5000 + 550, json )).then(json => {
          return {
            items: json.response.queries || [],
            requestId: json.request_id
          };
        });
      },

      searchReal2 (query, requestId) {
        return fetch('http://api.dev.rabota.space/v4/geocoder.json', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ search_phrase: query, request_id: requestId })
        }).then(response => response.json()).then(json => {
          return {
            items: (json.response.geocoder || []).map(item => {
              const { region, subway_station } = item;
              const type = region ? 'region' : 'subway_station';
              const element = region || subway_station;

              return {
                element,
                type,
                id: element.id,
                name: element.name,
              };
            }),
            requestId: json.request_id
          };
        });
      },

      delay (ms = 0, ...args) {
        return new Promise(resolve => {
          setTimeout( resolve, ms, ...args );
        });
      }
    },

    watch: {
      searchQuery (value) {
        console.log( value );
      }
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

    .input-group {
      margin: 0 !important;
    }
  }

  .page12 {
    .block {
      display: block;
      padding: 16px;
      box-shadow: 0 2px 7px 0px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      vertical-align: top;
      margin-right: 12px;

      h2 {
        margin-top: 18px;
      }

      .r-suggester {
        margin-top: 12px;
      }
    }
  }
</style>
