<script>
  import Colorable from '../../mixins/colorable';
  import Toggleable from '../../mixins/toggleable';

  // Icons
  import MdClose from '@rabota/md-svg-vue/dist/navigation/MdClose.vue';

  // Components
  import RBtn from '../RBtn/RBtn.vue';

  export default {
    name: 'r-chip',

    mixins: [
      Colorable,
      Toggleable
    ],

    components: {
      MdClose,
      RBtn
    },

    props: {
      close: Boolean,
      disabled: Boolean,
      label: Boolean,
      outline: Boolean,
      round: Boolean,
      // Used for selects/tagging
      selected: Boolean,
      small: Boolean,
      textColor: String,
      value: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      classes () {
        const classes = this.addBackgroundColorClassChecks({
          'r-chip_disabled': this.disabled,
          'r-chip_selected': this.selected,
          'r-chip_label': this.label,
          'r-chip_outline': this.outline,
          'r-chip_round': this.round,
          'r-chip_small': this.small,
          'r-chip_removable': this.close,
          'r-chip_default': !this.color
        });

        return (this.textColor || this.outline)
          ? this.addTextColorClassChecks(classes, this.textColor ? 'textColor' : 'color')
          : classes;
      }
    },

    methods: {
      genClose (h) {
        const data = {
          staticClass: 'r-chip__close',
          props: {
            icon: true,
            flat: true,
            ripple: true
          },
          on: {
            click: e => {
              e.stopPropagation();

              this.$emit('input', false);
            }
          }
        };

        return h('r-btn', data, [ h('md-close') ]);
      },
      genContent (h) {
        const children = [ this.$slots.default ];

        this.close && children.push(this.genClose(h));

        return h('span', {
          staticClass: 'r-chip__content'
        }, children);
      }
    },

    render (h) {
      const data = {
        staticClass: 'r-chip',
        'class': this.classes,
        attrs: { tabindex: this.disabled ? -1 : 0 },
        directives: [{
          name: 'show',
          value: this.isActive
        }],
        on: this.$listeners
      };

      return h('span', data, [ this.genContent(h) ]);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_chip.scss";
</style>
