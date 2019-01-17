import { isServer } from '../util/helpers';

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
    const shouldRunImmediately = !isServer();
    const noopFn = this.$nextTick.bind( this );
    const lazyFn = shouldRunImmediately
      ? noopFn
      : requestAnimationFrame;

    lazyFn(() => {
      // Use setAttribute instead of dataset
      // because dataset does not work well
      // with unit tests
      this.$el.setAttribute('data-booted', true);
      this.isBooted = true;
    });
  }
};
