<script>
  import RPageHeadline from '../RPageHeadline/RPageHeadline.vue';

  export default {
    name: 'r-page',

    components: {
      RPageHeadline
    },

    props: {
      withoutIndents: Boolean,
      withoutIndentTop: Boolean,
      withoutIndentBottom: Boolean,
      asideBordered: Boolean,
      headlineBordered: Boolean,
      mainClass: String,
      asideClass: String
    },

    computed: {
      classes () {
        return {
          'page_indent-top': !this.withoutIndents && !this.withoutIndentTop,
          'page_indent-bottom': !this.withoutIndents && !this.withoutIndentBottom
        };
      },
      mainClasses () {
        return {
          [this.mainClass]: !!this.mainClass
        };
      },
      asideClasses () {
        return {
          [this.asideClass]: !!this.asideClass,
          'page__aside_bordered': this.asideBordered
        };
      }
    }
  };
</script>

<template>
  <div class="page" :class="classes">
    <div class="page__preheader"
         v-if="$slots.preHeader">
      <slot name="preHeader"></slot>
    </div>

    <r-page-headline class="page__headline"
                :headline-bordered="headlineBordered"
                v-if="$slots.title || $slots.titleElements || $slots.subtitle">
      <template slot="title">
        <slot name="title"></slot>
      </template>
      <template slot="titleElements">
        <slot name="titleElements"></slot>
      </template>
      <template slot="subtitle">
        <slot name="subtitle"></slot>
      </template>
    </r-page-headline>

    <slot name="preBody"></slot>

    <div class="page__body">
      <div class="page__row">
        <main class="page__main" v-if="$slots.main" :class="mainClasses">
          <slot name="main"></slot>
        </main>
        <aside class="page__aside" v-if="$slots.aside" :class="asideClasses">
          <slot name="aside"></slot>
        </aside>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<style lang="scss">
  @import "../../styles/components/_page.scss";
</style>
