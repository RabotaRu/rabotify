<script>
  import Colorable from '../../mixins/colorable';

  export default {
    name: 'r-toolbar',

    mixins: [
      Colorable
    ],

    data: () => ({
      heights: {
        mobileLandscape: 56,
        mobile: 64,
        desktop: 64,
        dense: 48
      },
      isExtended: false
    }),

    props: {
      absolute: Boolean,
      card: Boolean,
      dense: Boolean,
      extended: Boolean,
      fixed: Boolean,
      flat: Boolean,
      light: Boolean,
      floating: Boolean,
      height: [ Number, String ],
      prominent: Boolean
    },

    computed: {
      computedHeight () {
        if (this.height) {
          return parseInt(this.height);
        }
        if (this.dense) {
          return this.heights.dense;
        }
        if (this.prominent || this.$rabotify.breakpoint.mdAndUp) {
          return this.heights.desktop;
        }
        if (this.$rabotify.breakpoint.width > this.$rabotify.breakpoint.height) {
          return this.heights.mobileLandscape;
        }
        return this.heights.mobile;
      },
      classes () {
        return this.addBackgroundColorClassChecks({
          'toolbar': true,
          'toolbar_flat': this.flat,
          'toolbar_light': this.light,
          'toolbar_absolute': this.absolute,
          'toolbar_card': this.card,
          'toolbar_dense': this.dense,
          'toolbar_fixed': this.fixed,
          'toolbar_floating': this.floating,
          'toolbar_prominent': this.prominent,
          'toolbar_extended': this.isExtended
        });
      }
    },

    render (h) {
      this.isExtended = this.extended || !!this.$slots.extension;

      const children = [];
      const data = {
        'class': this.classes,
        on: this.$listeners
      };

      children.push(h('div', {
        staticClass: 'toolbar__content',
        style: {
          height: `${this.computedHeight}px`
        },
        ref: 'content'
      }, this.$slots.default));

      if (this.isExtended) {
        children.push(h('div', {
          staticClass: 'toolbar__extension',
          style: { height: `${this.computedHeight}px` }
        }, this.$slots.extension));
      }

      return h('nav', data, children);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_toolbar.scss";
</style>
