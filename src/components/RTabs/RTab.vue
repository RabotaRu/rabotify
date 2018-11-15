<script>
  // Mixins
  import Routable from '../../mixins/routable';
  import Colorable from '../../mixins/colorable';
  import {
    inject as RegistrableInject
  } from '../../mixins/registrable';

  // Utilities
  import { getObjectValueByPath } from '../../util/helpers';

  export default {
    name: 'r-tab',

    mixins: [
      RegistrableInject('tabs', 'r-tab', 'r-tabs'),
      Routable,
      Colorable
    ],

    inject: [
      'tabClick',
      'color',
      'sliderColor'
    ],

    data () {
      return {
        isActive: false
      };
    },

    props: {
      activeClass: {
        type: String,
        default: 'tabs__item_active'
      },
      ripple: [ Boolean, Object ]
    },

    computed: {
      classes () {
        return this.addTextColorClassChecks({
          'tabs__item': true,
          'tabs__item_disabled': this.disabled,
          [this.activeClass]: !this.to && this.isActive,
          [this.color]: this.color && !this.to && this.isActive
        });
      },
      action () {
        const to = this.to || this.href;

        if (typeof to === 'string') {
          return to.replace('#', '');
        }
        if (to === Object(to) &&
          (to.hasOwnProperty('name') ||
            to.hasOwnProperty('path'))
        ) {
          return to.name || to.path;
        }

        return this;
      }
    },

    watch: {
      $route: 'onRouteChange'
    },

    mounted () {
      this.tabs.register(this);
      this.onRouteChange();
    },

    beforeDestroy () {
      this.tabs.unregister(this);
    },

    methods: {
      click (e) {
        // If user provides an
        // actual link, do not
        // prevent default
        if (this.href &&
          this.href.indexOf('#') > -1
        ) {
          e.preventDefault();
        }

        this.$emit('click', e);

        this.to || this.tabClick(this);
      },
      onRouteChange () {
        if (!this.to || !this.$refs.link) {
          return;
        }

        const path = `_vnode.data.class.${this.activeClass}`;

        this.$nextTick(() => {
          if (getObjectValueByPath(this.$refs.link, path)) {
            this.tabClick(this);
          }
        });
      },
      toggle (action) {
        this.isActive = action === this ||
          action === this.action;
      }
    },

    render (h) {
      const link = this.generateRouteLink();
      const { data } = link;

      // If disabled, use div as anchor tags do not support
      // being disabled
      const tag = this.disabled ? 'div' : link.tag;

      data.ref = 'link';

      return h('div', {
        staticClass: 'tabs__div'
      }, [ h(tag, data, this.$slots.default) ]);
    }
  };
</script>
