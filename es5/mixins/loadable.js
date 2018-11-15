'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 */
exports.default = {
  props: {
    loading: {
      type: [Boolean, String],
      default: false
    }
  },

  methods: {
    genProgress: function genProgress() {
      if (this.loading === false) {
        return null;
      }

      return this.$slots.progress || this.$createElement('r-loading', {
        props: {
          line: true
        }
      });
    }
  }
};