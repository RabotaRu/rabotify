<script>
  import RLoading from '../RLoading/RLoading.vue';

  import Colorable from '../../mixins/colorable';
  import Rippleable from '../../mixins/rippleable';
  import Positionable from '../../mixins/positionable';
  import Routable from '../../mixins/routable';

  import { factory as ToggleableFactory } from '../../mixins/toggleable';
  import { inject as RegistrableInject } from '../../mixins/registrable';

  export default {
    name: 'r-btn',

    mixins: [
      Colorable,
      Routable,
      Positionable,
      Rippleable,
      ToggleableFactory('inputValue'),
      RegistrableInject('buttonGroup')
    ],

    components: {
      RLoading
    },

    props: {
      activeClass: {
        type: String,
        default: 'r-btn_active'
      },
      block: Boolean,
      fullWidth: Boolean,
      fab: Boolean,
      flat: Boolean,
      link: Boolean,
      icon: Boolean,
      large: Boolean,
      loading: Boolean,
      outline: Boolean,
      round: Boolean,
      shadowed: Boolean,
      small: Boolean,
      reset: Boolean,
      ripple: {
        type: [ Boolean, Object ],
        default: false
      },
      tag: {
        type: String,
        default: 'button'
      },
      type: {
        type: String,
        default: 'button'
      },
      value: null
    },

    computed: {
      classes () {
        const colorBackground = !this.outline && !this.flat;
        const colorText = !this.disabled && !colorBackground;

        const classes = {
          'r-btn': true,
          'r-btn_absolute': this.absolute,
          'r-btn_block': this.block,
          'r-btn_full-width': this.fullWidth,
          'r-btn_bottom': this.bottom,
          'r-btn_disabled': this.disabled,
          'r-btn_flat': this.flat,
          'r-btn_link': this.link,
          'r-btn_floating': this.fab,
          'r-btn_fixed': this.fixed,
          'r-btn_hover': this.hover,
          'r-btn_icon': this.icon,
          'r-btn_left': this.left,
          'r-btn_top': this.top,
          'r-btn_loading': this.loading,
          'r-btn_outline': this.outline,
          'r-btn_reset': this.reset,
          'r-btn_right': this.right,
          'r-btn_round': this.round,
          'r-btn_router': this.to,
          'r-btn_shadowed': this.shadowed && !this.flat,
          'r-btn_small': this.small,
          'r-btn_medium': !(this.small || this.large),
          'r-btn_large': this.large
        };

        if (!this.color) {
          Object.assign(classes, {
            'primary': this.primary && colorBackground,
            'secondary': this.secondary && colorBackground,
            'text_primary': this.primary && colorText,
            'text_secondary': this.secondary && colorText
          });
        }

        classes[this.activeClass] = this.isActive;

        return colorBackground
          ? this.addBackgroundColorClassChecks(classes)
          : this.addTextColorClassChecks(classes);
      },

      isTypeFile () {
        return this.type && this.type === 'file';
      }
    },

    methods: {
      // Prevent focus to match md spec
      click (e) {
        !this.fab &&
        e.detail &&
        this.$el.blur();

        this.$emit('click', e);
      },
      genButton () {
        const { tag, data } = this.generateRouteLink();
        const children = this.loading
          ? [
              this.genLoader(),
              this.$createElement('span', { 'class': 'r-btn__content' }, this.$slots.default)
            ]
          : this.$slots.default;
        const type = this.isTypeFile ? 'button' : this.type

        tag === 'button' && (data.attrs.type = type);

        data.attrs.value = [ 'string', 'number' ].includes(typeof this.value)
          ? this.value
          : JSON.stringify(this.value);

        if (this.isTypeFile) {
          data.on.click = _ => this.$refs.input.click();
        }

        return this.$createElement(tag, data, children);
      },
      genInput () {
        return this.$createElement(
          'input',
          {
            ref: 'input',
            attrs: {
              type: 'file',
              hidden: true
            },
            on: {
              change: event => this.$emit( 'change', event )
            }
          }
        );
      },
      genFileLoader () {
        return this.$createElement(
          'div',
          [
            this.genInput(),
            this.genButton()
          ]
        );
      },
      genLoader () {
        const children = [];

        if (!this.$slots.loader) {
          children.push(this.$createElement('r-loading', {
            props: {
              large: this.large,
              small: this.small,
              colorful: this.disabled || this.outline || !this.color || this.color === 'white'
            }
          }));
        } else {
          children.push(this.$slots.loader);
        }

        return this.$createElement('span', {
          'class': 'r-btn__loading'
        }, children);
      }
    },

    mounted () {
      if (this.buttonGroup) {
        this.buttonGroup.register(this);
      }
    },

    beforeDestroy () {
      if (this.buttonGroup) {
        this.buttonGroup.unregister(this);
      }
    },

    render () {
      return this.isTypeFile
        ? this.genFileLoader()
        : this.genButton();
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/button/button";
</style>
