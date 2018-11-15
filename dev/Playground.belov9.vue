<template>
  <r-app>
    <div class="playground page8">

      <r-card>
        <r-card-title class="font-display-1">RToast</r-card-title>
        <r-card-text>

          <div>
            <r-btn @click="snackbar1 = true">Верхний правый</r-btn>
            <r-btn @click="snackbar2 = true">Верхний левый</r-btn>
            <r-btn @click="snackbar3 = true">Нижний правый</r-btn>
            <r-btn @click="snackbar4 = true">Нижний левый</r-btn>

            <br>
            <br>

            <r-btn @click="snackbar5 = true">Вертикальный</r-btn>
            <r-btn @click="snackbar6 = true">Многострочный</r-btn>
          </div>

          <r-toast
            :closeDelay="600000"
            top
            right
            color="info"
            autoHeight
            v-model="snackbar1"
          >
            <span class="text_white">{{ lorem }}</span>
            <r-btn flat round icon color="white" ripple @click.native="snackbar1 = false">
              <md-close></md-close>
            </r-btn>
          </r-toast>

          <r-toast
            :closeDelay="60000"
            top
            left
            autoHeight
            v-model="snackbar2"
          >
            {{ lorem }}
            <r-btn flat ripple @click.native="snackbar2 = false">Закрыть</r-btn>
          </r-toast>

          <r-toast
            :closeDelay="6000"
            bottom
            right
            autoHeight
            v-model="snackbar3"
          >
            {{ lorem }}
            <r-btn flat ripple color="info" @click.native="snackbar3 = false">Закрыть</r-btn>
          </r-toast>

          <r-toast
            :closeDelay="6000"
            bottom
            left
            v-model="snackbar4"
          >
            {{ lorem }}
            <r-btn flat ripple color="success" @click.native="snackbar4 = false">Закрыть</r-btn>
          </r-toast>

          <r-toast
            :closeDelay="6000"
            top
            right
            vertical
            v-model="snackbar5"
          >
            {{ lorem }}
            <r-btn flat ripple color="black" @click.native="snackbar5 = false">Закрыть</r-btn>
          </r-toast>

          <r-toast
            :closeDelay="6000"
            top
            right
            multi-line
            v-model="snackbar6"
          >
            {{ lorem }}
            <r-btn flat ripple color="primary" @click.native="snackbar6 = false">Закрыть</r-btn>
          </r-toast>

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

      snackbar1: false,
      snackbar2: false,
      snackbar3: false,
      snackbar4: false,
      snackbar5: false,
      snackbar6: false,
      snackbar7: false,
      snackbar8: false,
      snackbar9: false,
      snackbar10: false,

      lorem: 'Произошла неизвестная ошибка',
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
