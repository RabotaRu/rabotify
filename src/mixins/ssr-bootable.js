/**
 * SSRBootable
 *
 * @mixin
 *
 * Used in layout components (toolbar, content)
 * to avoid an entry animation when using SSR
 */
export default {
  data: () => ({
    isBooted: false
  }),

  mounted () {
    // Use setAttribute instead of dataset
    // because dataset does not work well
    // with unit tests
    requestAnimationFrame(() => {
      this.$el.setAttribute('data-booted', true);
      this.isBooted = true;
    });
  }
};
