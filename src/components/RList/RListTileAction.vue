<script>
  import { normalizeClassName } from '../../util/helpers';

  export default {
    functional: true,

    name: 'r-list-tile-action',

    render (h, { data, children }) {
      const classes = [ 'list__tile__action' ];
      if (data.staticClass) {
        const staticClassList = normalizeClassName(data.staticClass || '').split(' ');
        if (staticClassList.length) {
          classes.push(...staticClassList);
        }
      }
      if ((children || []).length > 1) {
        classes.push('list__tile__action_stack');
      }
      data.staticClass = classes.join(' ');

      return h('div', data, children);
    }
  };
</script>
