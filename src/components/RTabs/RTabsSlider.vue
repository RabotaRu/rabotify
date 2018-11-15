<script>
  import Colorable from '../../mixins/colorable';

  export default {
    name: 'r-tabs-slider',

    mixins: [
      Colorable
    ],

    data: () => ({
      defaultColor: 'primary'
    }),

    render (h) {
      return h('div', {
        staticClass: 'tabs__slider',
        'class': this.addBackgroundColorClassChecks()
      });
    }
  };
</script>
