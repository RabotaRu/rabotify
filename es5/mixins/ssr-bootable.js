'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../util/helpers');

/**
 * SSRBootable
 *
 * @mixin
 *
 * Used in layout components (toolbar, content)
 * to avoid an entry animation when using SSR
 */
exports.default = {
  data: function data() {
    return {
      isBooted: false
    };
  },

  mounted: function mounted() {
    var _this = this;

    var shouldRunImmediately = !(0, _helpers.isServer)();
    var noopFn = this.$nextTick.bind(this);
    var lazyFn = shouldRunImmediately ? noopFn : requestAnimationFrame;

    lazyFn(function () {
      // Use setAttribute instead of dataset
      // because dataset does not work well
      // with unit tests
      _this.$el.setAttribute('data-booted', true);
      _this.isBooted = true;
    });
  }
};