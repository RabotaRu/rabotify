<script>
  import { normalizeClassName } from '../../util/helpers';

  export default {
    name: 'r-card-title',

    functional: true,

    props: {
      primaryTitle: Boolean
    },

    render (h, { data, props, children }) {
      data.staticClass = normalizeClassName(`card__title ${data.staticClass || ''}`).trim();

      if (props.primaryTitle) {
        data.staticClass += ' card__title_primary';
      }

      return h('div', data, children);
    }
  };
</script>
