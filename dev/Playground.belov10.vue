<template>
  <r-app>
    <div class="playground page9">

      <r-card>
        <r-card-title class="font-display-1">RBottomSheet</r-card-title>
        <r-card-text>

          <r-bottom-sheet v-model="bottomSheet1">
            <r-btn slot="activator" color="primary">Открыть bottom sheet</r-btn>
            <r-list>
              <r-subheader>Выберите действие</r-subheader>
              <r-list-tile
                v-for="item in list"
                :key="item.name"
                @click="bottomSheet1 = false"
              >
                <r-list-tile-title>{{ item.name }}</r-list-tile-title>
              </r-list-tile>
            </r-list>
          </r-bottom-sheet>

          <r-bottom-sheet inset v-model="bottomSheet2">
            <r-btn slot="activator" color="primary">Открыть bottom sheet (inset)</r-btn>
            <r-list>
              <r-subheader>Выберите действие</r-subheader>
              <r-list-tile
                v-for="item in list"
                :key="item.name"
                @click="bottomSheet2 = false"
              >
                <r-list-tile-title>{{ item.name }}</r-list-tile-title>
              </r-list-tile>
            </r-list>
          </r-bottom-sheet>

        </r-card-text>
      </r-card>

    </div>
  </r-app>
</template>

<script>
  import MdFavoriteBorder from 'md-svg-vue/dist/action/MdFavoriteBorder';
  import MdClose from 'md-svg-vue/dist/navigation/MdClose';
  import MdFormatBold from 'md-svg-vue/dist/editor/MdFormatBold.vue';

  export default {
    components: {
      MdFormatBold,
      MdFavoriteBorder,
      MdClose
    },

    data: () => ({
      ex1: '',
      ex2: '',
      ex3: '',
      ex4: '',
      ex5: '',
      ex6: '',
      ex7: '',
      ex8: '',
      ex9: '',
      ex10: '',
      ex11: '',
      ex12: '',
      ex13: '',
      ex14: '',
      ex15: '',
      ex16: '',
      ex17: '',
      ex18: '',
      ex19: '',

      bottomSheet1: false,
      bottomSheet2: false,
      bottomSheet3: false,
      bottomSheet4: false,
      bottomSheet5: false,
      bottomSheet6: false,
      bottomSheet7: false,
      bottomSheet8: false,
      bottomSheet9: false,
      bottomSheet10: false,

      list: [{
        name: 'Item 1'
      }, {
        name: 'Item 2'
      }, {
        name: 'Item 3'
      }, {
        name: 'Item 4'
      }]
    })
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
  }
</style>
