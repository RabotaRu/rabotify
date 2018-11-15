<script>
  // Mixins
  import Bootable from '../../mixins/bootable';
  import Toggleable from '../../mixins/toggleable';
  import {
    inject as RegistrableInject
  } from '../../mixins/registrable';

  // Transitions
  import { RExpandTransition } from '../transitions';

  /** Icons */
  import MdArrowDropDown from 'md-svg-vue/dist/navigation/MdArrowDropDown.vue';

  /**
   * List group
   *
   * @component
   */
  export default {
    name: 'r-list-group',

    components: {
      MdArrowDropDown
    },

    mixins: [
      Bootable,
      RegistrableInject('list', 'r-list-group', 'r-list'),
      Toggleable
    ],

    inject: [ 'listClick' ],

    data: () => ({
      groups: []
    }),

    props: {
      activeClass: {
        type: String,
        default: 'text_primary'
      },
      appendIcon: {
        type: [ String, Object ],
        default: 'md-keyboard-arrow-down'
      },
      disabled: Boolean,
      group: String,
      noAction: Boolean,
      prependIcon: [ String, Object ],
      subGroup: Boolean
    },

    computed: {
      groupClasses () {
        return {
          'list__group_active': this.isActive,
          'list__group_disabled': this.disabled
        };
      },
      headerClasses () {
        return {
          'list__group__header_active': this.isActive,
          'list__group__header_sub-group': this.subGroup
        };
      },
      itemsClasses () {
        return {
          'list__group__items_no-action': this.noAction
        };
      }
    },

    watch: {
      isActive (val) {
        if (!this.subGroup && val) {
          this.listClick(this._uid);
        }
      },
      $route (to) {
        const isActive = this.matchRoute(to.path);

        if (this.group) {
          if (isActive && this.isActive !== isActive) {
            this.listClick(this._uid);
          }

          this.isActive = isActive;
        }
      }
    },

    mounted () {
      this.list.register(this._uid, this.toggle);

      if (this.group &&
        this.$route &&
        this.value == null
      ) {
        this.isActive = this.matchRoute(this.$route.path);
      }
    },

    beforeDestroy () {
      this.list.unregister(this._uid);
    },

    methods: {
      click () {
        if (this.disabled) {
          return;
        }

        this.isActive = !this.isActive;
      },
      genIcon (icon) {
        return this.$createElement(icon);
      },
      genAppendIcon () {
        const icon = !this.subGroup ? this.appendIcon : '';

        return this.$createElement('li', {
          staticClass: 'list__group__header__append-icon'
        }, [
          this.$slots.appendIcon || this.genIcon(icon)
        ]);
      },
      genGroup () {
        return this.$createElement('ul', {
          staticClass: 'list__group__header',
          'class': this.headerClasses,
          on: Object.assign({}, {
            click: this.click
          }, this.$listeners),
          ref: 'item'
        }, [
          this.genPrependIcon(),
          this.$slots.activator,
          this.genAppendIcon()
        ]);
      },
      genItems () {
        return this.$createElement('ul', {
          staticClass: 'list__group__items',
          'class': this.itemsClasses,
          directives: [{
            name: 'show',
            value: this.isActive
          }],
          ref: 'group'
        }, this.showLazyContent(this.$slots.default));
      },
      genPrependIcon () {
        const icon = this.prependIcon
          ? this.prependIcon
          : this.subGroup
            ? 'md-arrow-drop-down'
            : '';

        return this.$createElement('li', {
          staticClass: 'list__group__header__prepend-icon',
          'class': {
            [this.activeClass]: this.isActive
          }
        }, [
          this.$slots.prependIcon || this.genIcon(icon)
        ]);
      },
      toggle (uid) {
        this.isActive = this._uid === uid;
      },
      matchRoute (to) {
        if (!this.group) {
          return false;
        }
        return to.match(this.group) !== null;
      }
    },

    render (h) {
      return h('li', {
        staticClass: 'list__group',
        'class': this.groupClasses
      }, [
        this.genGroup(),
        h(RExpandTransition, [ this.genItems() ])
      ]);
    }
  };
</script>
