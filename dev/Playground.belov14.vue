<script>
  import MdSearch from 'md-svg-vue/dist/action/MdSearch.vue';
  import MdKeyboardArrowDown from 'md-svg-vue/dist/hardware/MdKeyboardArrowDown.vue';

  export default {

    components: {
      MdSearch,
      MdKeyboardArrowDown
    },

    data: () => ({
      queriesModel: null,
      queriesModel2: null,
    }),

    methods: {
      search (query, requestId) {
        return fetch('https://api.rabota.ru/v4/vacancies/search/suggest.json', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query, region_id: 3, request_id: requestId })
        }).then(response => response.json()).then(json => {
          return {
            items: json.response.queries || [],
            requestId: json.request_id
          };
        });
      },

      search2 (query, requestId) {
        return fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token 21a7b4bb72c8f49714fb829d1fe2fcc21532e159`
          },
          body: JSON.stringify({ query })
        }).then(response => response.json()).then(json => {
          return {
            items: json.suggestions || [],
            requestId: json.request_id
          };
        });
      },

      onEnter (item, index, query) {
        console.log( '#enter', item, query );
      },

      onQuerySelect (item) {
        console.log( '#onQuerySelect', item );
      }
    },

    watch: {
      queriesModel (value) {
        console.log( 'watch', 'queriesModel', value );
      }
    }
  }
</script>

<template>
  <r-app>
    <div class="playground page15">

      <r-card>
        <r-card-title class="font-display-1">RSuggester 2</r-card-title>
        <r-card-text>

          <router-link :to="{ path: '/page14' }">prev page</router-link>

          <br>
          <br>

          <div>

            <r-suggester v-model="queriesModel"
                         selectFirstOnEnter
                         prefetch
                         placeholder="Профессия"
                         @enter="onEnter"
                         @select="onQuerySelect"
                         :fetch="search"
                         clearable></r-suggester>

          </div>

        </r-card-text>
      </r-card>

    </div>
  </r-app>
</template>

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

  .page15 {
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
