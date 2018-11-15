<script>
  // Mixins
  import Input from '../../mixins/input';

  export default {
    name: 'r-form-field-error',

    mixins: [
      Input
    ],

    computed: {
      classes () {
        return {
          'form-field-error': true,
          'text_error': this.hasError
        };
      }
    },

    render (h) {
      return this.genInputGroup(this.$slots.default);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_form-field-error.scss";
</style>
