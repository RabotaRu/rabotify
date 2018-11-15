<script>
  import Routable from '../../mixins/routable';
  import Toggleable from '../../mixins/toggleable';
  import Rippleable from '../../mixins/rippleable';
  import Colorable from '../../mixins/colorable';

  export default {
    name: 'r-list-tile',

    mixins: [
      Colorable,
      Routable,
      Toggleable,
      Rippleable
    ],

    inheritAttrs: false,

    data: () => ({
      proxyClass: 'list__tile_active'
    }),

    props: {
      activeClass: {
        type: String,
        default: 'text_primary'
      },
      avatar: Boolean,
      inactive: Boolean,
      tag: String,
      ripple: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      listClasses () {
        return this.disabled
          ? 'text_disabled'
          : this.color
            ? this.addTextColorClassChecks()
            : this.defaultColor;
      },
      classes () {
        return {
          'list__tile': true,
          'list__tile_link': this.isLink && !this.inactive,
          'list__tile_avatar': this.avatar,
          'list__tile_disabled': this.disabled,
          'list__tile_active': !this.to && this.isActive,
          [this.activeClass]: this.isActive
        };
      },
      isLink () {
        return this.href || this.to ||
          (this.$listeners && (this.$listeners.click || this.$listeners['!click']));
      }
    },

    render (h) {
      const isRouteLink = !this.inactive && this.isLink;
      const { tag, data } = isRouteLink ? this.generateRouteLink() : {
        tag: this.tag || 'div',
        data: {
          class: this.classes
        }
      };

      data.attrs = Object.assign({}, data.attrs, this.$attrs);

      return h('li', {
        'class': this.listClasses,
        attrs: {
          disabled: this.disabled
        },
        on: {
          ...this.$listeners
        }
      }, [ h(tag, data, this.$slots.default) ]);
    }
  };
</script>
