<script>
  import Colorable from '../../mixins/colorable';
  import Routable from '../../mixins/routable';

  export default {
    name: 'r-card',

    mixins: [
      Colorable,
      Routable
    ],

    props: {
      flat: Boolean,
      height: {
        type: String,
        default: 'auto'
      },
      hover: Boolean,
      img: String,
      raised: Boolean,
      tile: Boolean,
      tag: {
        type: String,
        default: 'div'
      }
    },

    computed: {
      classes () {
        const classes = {
          'card': true,
          'card_flat': this.flat,
          'card_horizontal': this.horizontal,
          'card_hover': this.hover,
          'card_raised': this.raised,
          'card_tile': this.tile
        };
        return this.addBackgroundColorClassChecks(classes);
      },
      styles () {
        const style = {
          height: isNaN(this.height) ? this.height : `${this.height}px`
        };

        if (this.img) {
          style.background = `url("${this.img}") center center / cover no-repeat`;
        }

        return style;
      }
    },

    render (h) {
      const { tag, data } = this.generateRouteLink();

      data.style = this.styles;

      return h(tag, data, this.$slots.default);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_cards.scss";
</style>