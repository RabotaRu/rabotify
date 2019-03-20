'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Computed = undefined;

var _props = require('./props');

var _helpers = require('../../../util/helpers');

var Computed = exports.Computed = {
  computed: {
    classes: function classes() {
      return {
        'r-suggester': true,
        'r-suggester_focused': this.focused,
        'r-suggester_errored': this.errored,
        'r-suggester_prepend-icon': !!this.$slots.prependIcon,
        'r-suggester_append-icon': !!this.$slots.appendIcon
      };
    },
    menuOptionsComputed: function menuOptionsComputed() {
      return Object.assign({}, _props.defaultMenuOptions, this.menuOptions, {
        nudgeTop: this.nudgeTop
      });
    },
    nudgeTop: function nudgeTop() {
      var nudgeTop = -this.inputHeight;
      if (this.label && this.$rabotify.breakpoint.mdAndDown) {
        nudgeTop -= 18;
      }
      return nudgeTop;
    }
  }
};