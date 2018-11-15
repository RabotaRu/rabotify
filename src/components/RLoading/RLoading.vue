<script>
  import Colorable from '../../mixins/colorable';
  import Positionable from '../../mixins/positionable';

  /**
   * @see https://loading.io/spinner/custom/90276/
   */

  export default {
    name: 'r-loading',

    mixins: [
      Colorable,
      Positionable
    ],
    props: {
      large: Boolean,
      small: Boolean,
      disabled: Boolean,
      colorful: Boolean,
      tilesNumber: {
        type: [ String, Number ],
        default: 3
      },
      line: Boolean,
      lineHeight: {
        type: Number,
        default: 3
      },
      progress: {
        type: Number,
        default: 0
      },
      lineColor: {
        type: String,
        default: 'primary'
      },
      lineBackground: {
        type: String,
        default: 'transparent'
      },
      lineRound: Boolean,
      lineShadow: Boolean
    },

    computed: {
      classes () {
        let classes = {
          'loading': true,
          'loading_disabled': this.disabled,
          'loading_large': this.large,
          'loading_small': this.small,
          'loading_colorful': this.colorful
        };

        if (this.line) {
          classes = {
            'loading': true,
            'loading_disabled': this.disabled,
            'loading_line': this.line,
            'loading_round-line': this.lineRound,
            'loading_shadow-line': this.lineShadow
          };
        }

        return this.addBackgroundColorClassChecks(classes);
      },
      tiles () {
        return Number(this.tilesNumber) || 3;
      }
    },

    render (h) {
      const data = {
        class: this.classes
      };
      const children = [];

      if (!this.line) {
        let tiles = this.tiles;
        while (tiles--) {
          children.push(
            h('div', {
              staticClass: 'loading__circle'
            })
          );
        }
      } else {
        data.style = {
          background: this.lineBackground,
          height: `${this.lineHeight}px`
        };
        children.push(
          h('div', {
            staticClass: 'loading__line',
            class: {
              [this.lineColor]: true
            },
            style: {
              width: `${this.progress}%`
            }
          })
        );
      }

      return h('div', data, children);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_loading.scss";
</style>
