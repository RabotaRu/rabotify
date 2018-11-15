<script>
  /** Icons */
  import MdClose from 'md-svg-vue/dist/navigation/MdClose.vue';

  /** Transitions */
  import { RFadeTransition } from '../transitions';

  /** Mixins */
  import Rippleable from '../../mixins/rippleable';
  import Selectable from '../../mixins/selectable';

  export default {
    name: 'r-checkbox',

    components: {
      RFadeTransition,
      MdClose
    },

    mixins: [
      Rippleable,
      Selectable
    ],

    data () {
      return {
        inputIndeterminate: this.indeterminate,
        indeterminatePath: 'M1.73,12.91 22.79,12.91',
        activePath: 'M1.73,12.91 8.1,19.28 22.79,4.59'
      };
    },

    props: {
      indeterminate: Boolean,
      small: Boolean,
      large: Boolean
    },

    computed: {
      classes () {
        const classes = {
          'checkbox': true,
          'checkbox_small': this.small,
          'checkbox_large': this.large,
          'checkbox_indeterminate': this.indeterminate,
          'input-group_selection-controls': true,
          'input-group_active': this.isActive
        };

        if (this.hasError) {
          classes['text_error'] = true;
        } else {
          return this.addTextColorClassChecks(classes);
        }

        return classes;
      },
      iconKey () {
        if (this.isActive || this.inputIndeterminate) {
          return 'checkbox-checked';
        } else {
          return 'checkbox-unchecked';
        }
      },
      path () {
        if (this.inputIndeterminate) {
          return this.indeterminatePath;
        } else if (this.isActive) {
          return this.activePath;
        } else {
          return this.activePath;
        }
      }
    },
    methods: {
      groupFocus (e) {
        this.isFocused = true;
        this.$emit('focus', e);
      },

      groupBlur (e) {
        this.isFocused = false;
        this.tabFocused = false;
        this.$emit('blur', this.inputValue);
      },

      genIcon () {
        return this.$createElement('svg', {
          'class': {
            'icon': true,
            'md-icon': true
          },
          attrs: {
            viewBox: '0 0 24 24'
          }
        }, [
          this.$createElement('path', {
            attrs: {
              d: this.path,
              stroke: 'white',
              fill: 'none'
            }
          })
        ]);
      },

      genCheckbox (icon) {
        return this.$createElement('span', {
          staticClass: 'checkbox__content',
          key: this.iconKey,
          on: Object.assign({
            click: this.toggle
          }, this.$listeners)
        }, [ icon ]);
      }
    },

    render (h) {
      const icon = this.genIcon();
      const checkbox = this.genCheckbox(icon);
      const transition = h('transition', {
        props: {
          name: 'checkbox-transition',
          mode: 'out-in'
        }
      }, [ checkbox ]);

      const data = {
        attrs: {
          tabindex: this.disabled
            ? -1
            : this.internalTabIndex || this.tabindex,
          role: 'checkbox',
          'aria-checked': this.inputIndeterminate && 'mixed' || this.isActive && 'true' || 'false',
          'aria-label': this.label
        }
      };

      const ripple = this.ripple ? this.genRipple() : null;

      return this.genInputGroup([ transition, ripple ], data);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_checkbox.scss";
</style>
