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
      const rootTag = children ? 'div' : 'hr';
      const innerText = children
        ? [ h('div', { class: 'divider__text' }, children) ]
        : [];

      data.staticClass = normalizeClassName(`divider ${data.staticClass || ''}`);

      data.class = {
        'divider_inset': props.inset,
        'divider_shifted': props.shifted,
        'divider_large': props.large,
        'divider_small': props.small,
        'divider_reset': props.reset
      };

      return h(rootTag, data, innerText);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_divider.scss";
</style>
