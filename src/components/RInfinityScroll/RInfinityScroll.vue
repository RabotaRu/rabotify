<script>
  import { getElementOffset } from '../../util/helpers';

  import RLoading from '../RLoading/RLoading.vue';

  import Scroll from '../../directives/scroll';

  export default {
    name: 'r-infinity-scroll',

    directives: {
      Scroll
    },

    components: {
      RLoading
    },

    props: {
      maxAutoLoadings: {
        type: Number,
        default: Infinity
      },
      loading: Boolean,
      canLoadNext: Boolean,
      containerOffset: {
        type: Number,
        default: 100
      }
    },

    data: () => ({
      loadingNumber: 0
    }),

    computed: {
      canAutoLoad () {
        return this.loadingNumber <= this.maxAutoLoadings;
      }
    },

    methods: {
      onScroll (event) {
        const container = this.$refs.container;
        const containerBottom = getElementOffset(container).top + container.offsetHeight;
        const scrollTop = this.windowScrollTop();
        const bottom = scrollTop + window.innerHeight;

        if (bottom + this.containerOffset > containerBottom &&
          !this.loading &&
          this.canAutoLoad &&
          this.canLoadNext) {
          this.loadNext();
        }
      },

      loadNext () {
        this.loadingNumber++;
        this.$emit('load', { loadingNumber: this.loadingNumber });
      },

      windowScrollTop () {
        return window.pageYOffset ||
          document.documentElement.offsetTop || 0;
      }
    }
  };
</script>

<template>
  <div ref="container" v-scroll="onScroll" class="infinity-scroll">

    <slot class="infinity-scroll__content"></slot>

    <div v-if="canAutoLoad" class="infinity-scroll__loading">
      <template v-if="loading">
        <slot v-if="$slots.autoLoading" name="autoLoading"></slot>
        <r-loading colorful v-else></r-loading>
      </template>
    </div>

    <div v-else-if="canLoadNext" class="infinity-scroll__actions">
      <slot name="actions"></slot>
    </div>

    <div v-else-if="loading" class="infinity-scroll__loading">
      <slot v-if="$slots.loading" name="loading"></slot>
      <r-loading colorful v-else></r-loading>
    </div>

  </div>
</template>
