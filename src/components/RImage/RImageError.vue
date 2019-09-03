<script>
  import MdErrorOutline from '@rabota/md-svg-vue/dist/alert/MdErrorOutline.vue';
  import MdRefresh from '@rabota/md-svg-vue/dist/navigation/MdRefresh.vue';

  import RBtn from '../RBtn/RBtn.vue';

  export default {
    name: 'r-image-error',

    components: {
      MdErrorOutline,
      MdRefresh,

      RBtn
    },

    props: {
      errored: Boolean,
      containerWidth: Number,
      round: Boolean
    },

    methods: {
      retry () {
        this.$emit( 'retry' );
      }
    },

    computed: {
      classes () {
        return {
          'r-image-error': true,
          'r-image-error_round': this.round
        };
      },

      isContainerSmall () {
        return this.containerWidth < 320;
      }
    }
  };
</script>

<template>
  <div :class="classes"
       title="Невозможно загрузить изображение">

    <div class="r-image-error__inner">
      <md-error-outline class="text_gray-dark icon_small" v-if="!isContainerSmall"></md-error-outline>
      <span class="r-image-error__text" v-if="!isContainerSmall">Невозможно загрузить изображение</span>
      <r-btn ripple
             outline
             small
             @click="retry"
             :round="round"
             v-if="!isContainerSmall">Повторить</r-btn>
      <r-btn flat
             ripple
             small
             icon
             @click="retry"
             :round="round"
             v-else>
        <md-refresh class="text_gray-dark icon_small"></md-refresh>
      </r-btn>
    </div>

  </div>
</template>

<style lang="scss">
  @import "../../styles/components/_image-error.scss";
</style>
