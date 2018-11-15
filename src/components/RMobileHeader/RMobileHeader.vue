<script>
  export default {
    name: 'r-mobile-header',

    props: {
      centeredContent: Boolean,
      shadow: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      classes () {
        return {
          'mobile-header': true,
          'mobile-header_centered-content': this.centeredContent,
          'mobile-header_shadow': this.shadow
        };
      }
    }
  };
</script>

<template>
  <div :class="classes">
    <div class="mobile-header__inner">
      <div v-if="$slots.leftAction" class="mobile-header__left-action">
        <slot name="leftAction"></slot>
      </div>
      <div class="mobile-header__content">
        <slot name="content"></slot>
      </div>
      <div v-if="$slots.rightAction" class="mobile-header__right-action">
        <slot name="rightAction"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../../styles/components/_mobile-header.scss";
</style>
