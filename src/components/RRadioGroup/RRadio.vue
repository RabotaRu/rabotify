<script>
  // Components
  import { RFadeTransition } from '../transitions';

  // Mixins
  import Colorable from '../../mixins/colorable';
  import Rippleable from '../../mixins/rippleable';
  import TabFocusable from '../../mixins/tab-focusable';
  import {
    inject as RegistrableInject
  } from '../../mixins/registrable';

  export default {
    name: 'r-radio',

    inheritAttrs: false,

    inject: [ 'isMandatory', 'name' ],

    components: {
      RFadeTransition
    },

    mixins: [
      Colorable,
      Rippleable,
      RegistrableInject('radio', 'r-radio', 'r-radio-group'),
      TabFocusable
    ],

    data: () => ({
      defaultColor: '',
      isActive: false,
      parentError: false
    }),

    props: {
      disabled: Boolean,
      value: null,
      label: String,
      staticLabel: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        const classes = {
          'radio': true,
          'input-group': true,
          'input-group_active': this.isActive,
          'input-group_disabled': this.disabled,
          'input-group_selection-controls': true,
          'input-group_label': this.label || this.$slots.label,
          'input-group_static-label': (this.label || this.$slots.label) && this.staticLabel,
          'input-group_tab-focused': this.tabFocused
        };

        if (!this.parentError) {
          return this.addTextColorClassChecks(classes);
        }

        return classes;
      }
    },

    methods: {
      genInput (radio) {
        const value = [ 'string', 'number' ].includes(typeof this.value)
          ? this.value
          : JSON.stringify(this.value);
        const input = this.$createElement('input', {
          ref: 'input',
          style: {
            display: 'none'
          },
          attrs: Object.assign({
            name: this.name && this.name(),
            id: this.id,
            type: 'radio',
            value
          }, this.$attrs)
        }, [ value ]);

        radio.push(input);

        return this.$createElement('div', {
          class: 'input-group__input'
        }, radio);
      },
      genWrapper (radio) {
        const children = [];

        if (this.$slots.label || this.label) {
          if (this.staticLabel && Array.isArray(radio)) {
            radio.push(this.genLabel());
          } else {
            children.push(this.genLabel());
          }
        }
        children.push(this.genInput(radio));

        return this.$createElement('div', {
          class: this.classes,
          attrs: {
            role: 'radio',
            'aria-checked': this.isActive && 'true' || 'false',
            'aria-label': this.label
          },
          on: {
            keydown: e => {
              if ([ 13, 32 ].includes(e.keyCode)) {
                e.preventDefault();
                this.toggle();
              }
            },
            blur: e => {
              this.$emit('blur', e);
              this.tabFocused = false;
            }
          }
        }, children);
      },
      genLabel () {
        return this.$createElement('label', {
          on: {
            click: this.toggle
          }
        }, this.$slots.label || this.label);
      },
      toggle () {
        const mandatory = this.isMandatory &&
          this.isMandatory() || false;

        if (!this.disabled && (!this.isActive || !mandatory)) {
          this.$refs.input.checked = true;
          this.isActive = true;
          this.$emit('change', this.value);
        }
      },
      genInnerCircle () {
        const inner = this.$createElement('span', {
          staticClass: 'radio__inner-circle',
          directives: [{
            name: 'show',
            value: this.isActive
          }]
        });
        return this.$createElement('transition', {
          props: {
            name: 'scale-transition',
            mode: 'out-in'
          }
        }, [ inner ]);
      },
      genRadioCircle () {
        return this.$createElement('span', {
          staticClass: 'radio__content',
          on: Object.assign({
            click: this.toggle
          }, this.$listeners)
        }, [ this.genInnerCircle() ]);
      }
    },

    mounted () {
      this.radio.register(this);
    },

    beforeDestroy () {
      this.radio.unregister(this);
    },

    render (h) {
      const radio = this.genRadioCircle();

      const ripple = this.ripple
        ? this.genRipple() : null;

      return this.genWrapper([ radio, ripple ]);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_radio.scss";
</style>
