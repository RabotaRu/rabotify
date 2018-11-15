<script>
  import Colorable from '../../mixins/colorable';
  import Toggleable from '../../mixins/toggleable';
  import { factory as PositionableFactory } from '../../mixins/positionable';

  export default {
    name: 'r-toast',

    mixins: [
      Colorable,
      Toggleable,
      PositionableFactory([ 'absolute', 'top', 'bottom', 'left', 'right' ])
    ],

    data () {
      return {
        activeTimeout: {}
      };
    },

    props: {
      autoHeight: Boolean,
      multiLine: Boolean,
      closeDelay: {
        type: Number,
        default: 6000
      },
      vertical: Boolean
    },

    computed: {
      classes () {
        return {
          'r-toast_active': this.isActive,
          'r-toast_absolute': this.absolute,
          'r-toast_auto-height': this.autoHeight,
          'r-toast_bottom': this.bottom || !this.top,
          'r-toast_left': this.left,
          'r-toast_multi-line': this.multiLine && !this.vertical,
          'r-toast_right': this.right,
          'r-toast_top': this.top,
          'r-toast_vertical': this.vertical
        };
      }
    },

    watch: {
      isActive () {
        this.setTimeout();
      }
    },

    methods: {
      setTimeout () {
        clearTimeout(this.activeTimeout);

        if (this.isActive && this.closeDelay) {
          this.activeTimeout = setTimeout(() => {
            this.isActive = false;
          }, this.closeDelay);
        }
      }
    },

    mounted () {
      this.setTimeout();
    },

    render (h) {
      const children = [];

      if (this.isActive) {
        children.push(
          h('div', {
            staticClass: 'r-toast',
            class: this.classes,
            on: this.$listeners
          }, [
            h('div', {
              staticClass: 'r-toast__wrapper',
              class: this.addBackgroundColorClassChecks()
            }, [
              h('div', {
                staticClass: 'r-toast__content'
              }, this.$slots.default)
            ])
          ])
        );
      }

      return h('transition', {
        attrs: { name: 'toast-transition' }
      }, children);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_toast.scss";
</style>
