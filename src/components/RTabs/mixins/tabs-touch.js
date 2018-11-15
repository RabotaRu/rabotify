/**
 * Tabs touch
 *
 * @mixin
 */
export default {
  methods: {
    newOffset (direction) {
      const clientWidth = this.$refs.wrapper.clientWidth;

      if (direction === 'prepend') {
        return Math.max(this.scrollOffset - clientWidth, 0);
      } else {
        return Math.min(this.scrollOffset + clientWidth, this.$refs.container.clientWidth - clientWidth);
      }
    },
    onTouchStart (e) {
      this.startX = this.scrollOffset + e.touchstartX;
      this.$refs.container.style.transition = 'none';
      this.$refs.container.style.willChange = 'transform';
    },
    onTouchMove (e) {
      const container = this.$refs.container;
      const wrapper = this.$refs.wrapper;
      const maxScrollOffset = container.clientWidth - wrapper.clientWidth;
      const reduceScrollOffset = offset => offset / (2 + Math.abs(offset) / 100);
      let scrollOffset = this.startX - e.touchmoveX;
      if (scrollOffset < 0) {
        scrollOffset = reduceScrollOffset(scrollOffset);
      } else if (scrollOffset >= maxScrollOffset) {
        scrollOffset = maxScrollOffset + reduceScrollOffset(scrollOffset - maxScrollOffset);
      }
      this.scrollOffset = scrollOffset;
    },
    onTouchEnd () {
      const container = this.$refs.container;
      const wrapper = this.$refs.wrapper;
      const maxScrollOffset = container.clientWidth - wrapper.clientWidth;
      container.style.transition = null;
      container.style.willChange = null;

      /* istanbul ignore else */
      if (this.scrollOffset < 0 || !this.isOverflowing) {
        this.scrollOffset = 0;
      } else if (this.scrollOffset >= maxScrollOffset) {
        this.scrollOffset = maxScrollOffset;
      }
    }
  }
};
