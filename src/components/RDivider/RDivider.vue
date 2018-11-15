<script>
  import { normalizeClassName } from '../../util/helpers';

  export default {
    name: 'r-divider',

    functional: true,

    props: {
      inset: Boolean,
      shifted: Boolean,
      large: Boolean,
      small: Boolean,
      reset: Boolean
    },

    render (h, { props, data, children }) {
      data.staticClass = normalizeClassName(`divider ${data.staticClass || ''}`);

      data.class = {
        'divider_inset': props.inset,
        'divider_shifted': props.shifted,
        'divider_large': props.large,
        'divider_small': props.small,
        'divider_reset': props.reset
      };

      return h('hr', data);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_divider.scss";
</style>
