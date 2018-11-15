'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Menu position
 *
 * @mixin
 *
 * Used for calculating an automatic position (used for RSelect)
 * Will position the RMenu content properly over the RSelect
 */
exports.default = {
  methods: {
    // Revisit this
    calculateScroll: function calculateScroll() {
      if (this.selectedIndex === null) {
        return;
      }

      var scrollTop = 0;

      if (this.selectedIndex >= this.stopIndex) {
        scrollTop = this.$refs.content.scrollHeight;
      } else if (this.selectedIndex > this.startIndex) {
        scrollTop = this.selectedIndex * (this.defaultOffset * 6) - this.defaultOffset * 7;
      }

      this.$refs.content.scrollTop = scrollTop;
    },
    calcLeftAuto: function calcLeftAuto() {
      if (this.isAttached) {
        return 0;
      }

      return parseInt(this.dimensions.activator.left - this.defaultOffset * 2);
    },
    calcTopAuto: function calcTopAuto() {
      var selectedIndex = Array.from(this.tiles).findIndex(function (n) {
        return n.classList.contains('list__tile_active');
      });

      if (selectedIndex === -1) {
        this.selectedIndex = null;

        return this.computedTop;
      }

      this.selectedIndex = selectedIndex;
      var actingIndex = selectedIndex;

      var offsetPadding = -(this.defaultOffset * 2);
      // Stop index should vary by tile length
      this.stopIndex = this.tiles.length > 4 ? this.tiles.length - 4 : this.tiles.length;

      if (selectedIndex > this.startIndex && selectedIndex < this.stopIndex) {
        actingIndex = 2;
        offsetPadding = this.defaultOffset * 3;
      } else if (selectedIndex >= this.stopIndex) {
        offsetPadding = -this.defaultOffset;
        actingIndex = selectedIndex - this.stopIndex;
      }

      // It's always off by 1 pixel, send help (┛ಠ_ಠ)┛彡┻━┻
      offsetPadding--;

      return this.computedTop + offsetPadding - actingIndex * (this.defaultOffset * 6);
    }
  }
};