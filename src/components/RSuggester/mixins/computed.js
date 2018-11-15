import { defaultMenuOptions } from './props';
import { getElementHeight, resolveElement } from '../../../util/helpers';

export const Computed = {
  computed: {
    classes () {
      return {
        'r-suggester': true,
        'r-suggester_focused': this.focused,
        'r-suggester_errored': this.errored,
        'r-suggester_prepend-icon': !! this.$slots.prependIcon,
        'r-suggester_append-icon': !! this.$slots.appendIcon,
      };
    },

    menuOptionsComputed () {
      return Object.assign({}, defaultMenuOptions, this.menuOptions, {
        nudgeTop: this.nudgeTop
      });
    },

    nudgeTop () {
      let nudgeTop = -this.inputHeight;
      if (this.label && this.$rabotify.breakpoint.mdAndDown) {
        nudgeTop -= 18;
      }
      return nudgeTop;
    },
  }
};
