<script>
  // Mixins
  import Dependent from '../../mixins/dependent';
  import Detachable from '../../mixins/detachable';
  import Overlayable from '../../mixins/overlayable';
  import Stackable from '../../mixins/stackable';
  import Toggleable from '../../mixins/toggleable';
  import Returnable from '../../mixins/returnable';

  // Directives
  import ClickOutside from '../../directives/click-outside';
  import KeydownToggle from '../../directives/keydown-toggle';

  // Helpers
  import { getZIndex } from '../../util/helpers';

  export default {
    name: 'r-dialog',

    mixins: [
      Dependent,
      Detachable,
      Overlayable,
      Returnable,
      Stackable,
      Toggleable
    ],

    directives: {
      ClickOutside,
      KeydownToggle
    },

    data () {
      return {
        isDependent: false,
        stackClass: 'dialog__content__active',
        stackMinZIndex: 200
      };
    },

    props: {
      disabled: Boolean,
      persistent: Boolean,
      fullscreen: Boolean,
      fullWidth: Boolean,
      fullHeight: Boolean,
      attachLeft: Boolean,
      attachRight: Boolean,
      attachTop: Boolean,
      attachBottom: Boolean,
      maxWidth: {
        type: [ String, Number ],
        default: 'none'
      },
      origin: {
        type: String,
        default: 'center center'
      },
      width: {
        type: [ String, Number ],
        default: 'auto'
      },
      scrollable: Boolean,
      escCloseable: {
        type: Boolean,
        default: true
      },
      transition: {
        type: [ String, Boolean ],
        default: 'dialog-transition'
      }
    },

    computed: {
      classes () {
        return {
          'dialog': true,
          'dialog_active': this.isActive,
          'dialog_persistent': this.persistent,
          'dialog_fullscreen': this.fullscreen,
          'dialog_sidebar': ( this.attachRight || this.attachLeft ) && this.fullHeight,
          'dialog_full-height': this.fullHeight,
          'dialog_scrollable': this.scrollable,
          [this.contentClass]: !!this.contentClass
        };
      },
      contentClasses () {
        return {
          'dialog__content': true,
          [this.stackClass]: this.isActive,
          'dialog__content_left': this.attachLeft,
          'dialog__content_right': this.attachRight,
          'dialog__content_top': this.attachTop,
          'dialog__content_bottom': this.attachBottom
        };
      }
    },

    watch: {
      isActive (val) {
        if (val) {
          this.show();
        } else {
          this.removeOverlay();
          this.unbind();
        }
      }
    },

    mounted () {
      this.isBooted = this.isActive;
      this.isActive && this.show();
    },

    beforeDestroy () {
      if (typeof window !== 'undefined') {
        this.unbind();
      }
    },

    methods: {
      canCloseImplicitly () {
        return this.isActive && !this.persistent &&
          getZIndex(this.$refs.content) >= this.getMaxZIndex();
      },
      closeConditional (e) {
        // close dialog if !persistent, clicked outside and we're the topmost dialog.
        // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
        return this.canCloseImplicitly() &&
          !this.$refs.content.contains(e.target);
      },
      show () {
        !this.fullscreen && !this.hideOverlay && this.genOverlay();
        this.fullscreen && this.hideScroll();
        this.$refs.content.focus();
        this.$listeners.keydown && this.bind();
      },
      bind () {
        window.addEventListener('keydown', this.onKeydown);
      },
      unbind () {
        window.removeEventListener('keydown', this.onKeydown);
      },
      onKeydown (e) {
        this.$emit('keydown', e);
      }
    },

    render (h) {
      const directives = [];
      if (this.escCloseable) {
        directives.push({
          name: 'keydown-toggle',
          value: {
            closeConditional: (e) => {
              return this.escCloseable &&
                e.keyCode === 27 &&
                this.canCloseImplicitly();
            },
            callback: () => {
              this.isActive = false;
            }
          }
        });
      }
      const children = [];
      const data = {
        'class': this.classes,
        ref: 'dialog',
        directives: [{
          name: 'click-outside',
          value: () => (this.isActive = false),
          args: {
            closeConditional: this.closeConditional,
            include: this.getOpenDependentElements
          }
        }, {
          name: 'show',
          value: this.isActive
        }, ...directives ],
        on: {
          click: e => {
            e.stopPropagation();
          }
        }
      };

      if (!this.fullscreen) {
        data.style = {
          maxWidth: this.maxWidth === 'none' ? undefined : (isNaN(this.maxWidth) ? this.maxWidth : `${this.maxWidth}px`),
          width: this.width === 'auto' ? undefined : (isNaN(this.width) ? this.width : `${this.width}px`)
        };
      }

      if (this.$slots.activator) {
        children.push(h('div', {
          'class': 'dialog__activator',
          on: {
            click: e => {
              e.stopPropagation();
              if (!this.disabled) {
                this.isActive = !this.isActive;
              }
            }
          }
        }, [ this.$slots.activator ]));
      }

      const dialog = h(`r-${this.transition}`, {
        props: {
          origin: this.origin
        }
      }, [
        h('div', data,
          this.showLazyContent(this.$slots.default)
        )
      ]);

      children.push(h('div', {
        'class': this.contentClasses,
        domProps: { tabIndex: -1 },
        style: { zIndex: this.activeZIndex },
        ref: 'content'
      }, [ dialog ]));

      return h('div', {
        'class': 'dialog__container',
        style: {
          display: !this.$slots.activator && 'none' || this.fullWidth ? 'block' : 'inline-block'
        }
      }, children);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/dialog/_dialog.scss";
  @import "../../styles/components/_overlay.scss";
</style>
