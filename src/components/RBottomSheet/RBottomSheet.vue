<script>
  import RDialog from '../RDialog/RDialog.vue';

  import { normalizeClassName } from '../../util/helpers';

  export default {
    name: 'r-bottom-sheet',

    components: {
      RDialog
    },

    props: {
      disabled: Boolean,
      fullWidth: Boolean,
      hideOverlay: Boolean,
      inset: Boolean,
      lazy: Boolean,
      maxWidth: {
        type: [ String, Number ],
        default: 'auto'
      },
      persistent: Boolean,
      value: null
    },

    render (h) {
      const activator = h('template', {
        slot: 'activator'
      }, this.$slots.activator);

      const contentClass = normalizeClassName(
        [ 'r-bottom-sheet', this.inset ? 'r-bottom-sheet_inset' : '' ].join(' ')
      );

      return h(RDialog, {
        attrs: {
          ...this.$props
        },
        on: {
          ...this.$listeners
        },
        props: {
          contentClass,
          transition: 'bottom-sheet-transition',
          attachBottom: true,
          value: this.value
        }
      }, [ activator, this.$slots.default ]);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_bottom-sheet.scss";
</style>
