<script>
  // Mixins
  import Rippleable from '../../mixins/rippleable';
  import Selectable from '../../mixins/selectable';

  // Directives
  import Touch from '../../directives/touch';

  export default {
    name: 'r-switch',

    mixins: [
      Rippleable,
      Selectable
    ],

    directives: {
      Touch
    },

    props: {
      small: Boolean,
      large: Boolean
    },

    computed: {
      classes () {
        const classes = {
          'input-group_selection-controls': true,
          'switch': true,
          'switch_small': this.small,
          'switch_large': this.large
        };

        if (this.hasError) {
          classes['text_error'] = true;
        } else {
          return this.addTextColorClassChecks(classes);
        }

        return classes;
      },
      rippleClasses () {
        return {
          'input-group_selection-controls__ripple': true,
          'input-group_selection-controls__ripple_active': this.isActive
        };
      },
      containerClasses () {
        return {
          'input-group_selection-controls__container': true,
          'input-group_selection-controls__container_disabled': this.disabled
        };
      },
      toggleClasses () {
        return {
          'input-group_selection-controls__toggle': true,
          'input-group_selection-controls__toggle_active': this.isActive
        };
      }
    },

    methods: {
      onSwipeLeft () {
        if (this.isActive) {
          this.toggle();
        }
      },
      onSwipeRight () {
        if (!this.isActive) {
          this.toggle();
        }
      }
    },

    render (h) {
      const container = h('div', {
        'class': this.containerClasses
      }, [
        h('div', { 'class': this.toggleClasses }),
        this.genRipple({
          directives: [{
            name: 'touch',
            value: {
              left: this.onSwipeLeft,
              right: this.onSwipeRight
            }
          }]
        })
      ]);

      return this.genInputGroup([ container ]);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_switch.scss";
</style>
