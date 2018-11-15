<script>
  import { normalizeClassName } from '../../util/helpers';

  export default {
    name: 'r-subheader',

    functional: true,

    props: {
      inset: Boolean
    },

    render (h, { data, children, props }) {
      data.staticClass = normalizeClassName(`subheader ${data.staticClass || ''}`).trim();

      if (props.inset) {
        data.staticClass += ' subheader_inset';
      }

      return h('li', data, children);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_subheader.scss";
</style>
