<script>
  export default {
    name: 'r-page-headline',

    props: {
      headlineBordered: Boolean
    },

    computed: {
      classes () {
        return {
          'page-headline': true,
          'page-headline_bordered': this.headlineBordered
        };
      }
    }
  };
</script>

<template>
  <div :class="classes">
    <div class="page-headline__inner" v-if="$slots.title || $slots.titleElements">
      <div class="page-headline__title" v-if="$slots.title">
        <slot name="title"></slot>
      </div>
      <div class="page-headline__elements" v-if="$slots.titleElements">
        <slot name="titleElements"></slot>
      </div>
    </div>
    <slot name="subtitle"></slot>
  </div>
</template>

<style lang="scss">
  @import "../../styles/components/_page-headline.scss";
</style>
