'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Tabs props
 *
 * @mixin
 */
exports.default = {
  props: {
    alignWithTitle: Boolean,
    appendIcon: {
      type: String,
      default: 'md-chevron-right'
    },
    centered: Boolean,
    fixedTabs: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined,
      validator: function validator(v) {
        return !isNaN(parseInt(v));
      }
    },
    hideSlider: Boolean,
    iconsAndText: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1280,
      validator: function validator(v) {
        return !isNaN(parseInt(v));
      }
    },
    prependIcon: {
      type: String,
      default: 'md-chevron-left'
    },
    right: Boolean,
    showArrows: Boolean,
    sliderColor: {
      type: String,
      default: 'primary'
    },
    value: [Number, String]
  }
};