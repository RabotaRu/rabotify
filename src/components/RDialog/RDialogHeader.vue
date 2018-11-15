<script>
  export default {
    name: 'r-dialog-header',

    props: {
      flat: Boolean
    },

    computed: {
      classes () {
        return {
          'dialog-header': true,
          'dialog-header_flat': this.flat,
        };
      }
    },

    render (h) {
      const children = [];
      const data = {
        'class': this.classes,
        on: this.$listeners
      };

      children.push(
        h('div', {
          staticClass: 'dialog-header__title',
          ref: 'title'
        }, this.$slots.default)
      );

      return h( 'nav', data, children );
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/dialog/_dialog-header.scss";
</style>
