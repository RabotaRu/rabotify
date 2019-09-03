import Loadable from './loadable';
import Validatable from './validatable';

// Icons
import MdClose from '@rabota/md-svg-vue/dist/navigation/MdClose.vue';

// Components
import RBtn from '../components/RBtn/RBtn.vue';

// Transitions
import { RExpandTransition, RSlideYTransition } from '../components/transitions';

export default {
  components: {
    MdClose,
    RBtn,
    RExpandTransition,
    RSlideYTransition
  },

  mixins: [
    Loadable,
    Validatable
  ],

  data () {
    return {
      isFocused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value
    };
  },

  props: {
    appendIcon: [ Object, String ],
    appendIconCb: Function,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: String,
    staticLabel: {
      type: Boolean,
      default: false
    },
    persistentHint: Boolean,
    preserveDetails: Boolean,
    placeholder: String,
    prependIcon: [ Object, String ],
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    optional: Boolean,
    tabindex: {
      default: 0
    },
    toggleKeys: {
      type: Array,
      default: () => [ 13, 32 ]
    },
    value: {
      required: false
    }
  },

  computed: {
    inputGroupClasses () {
      return Object.assign({
        'input-group': true,
        'input-group_async-loading': this.loading !== false,
        'input-group_focused': this.isFocused,
        'input-group_dirty': this.isDirty,
        'input-group_tab-focused': this.tabFocused,
        'input-group_disabled': this.disabled,
        'input-group_readonly': this.readonly,
        'input-group_error': this.hasError,
        'input-group_append-icon': this.appendIcon || this.$slots.appendIcon,
        'input-group_prepend-icon': this.prependIcon || this.$slots.prependIcon,
        'input-group_required': this.required,
        'input-group_required-slot': this.required && this.$slots.required,
        'input-group_optional': this.optional,
        'input-group_optional-slot': this.optional && this.$slots.optional,
        'input-group_hide-details': this.hideDetails,
        'input-group_placeholder': !!this.placeholder,
        'input-group_label': !!this.label || this.$slots.label,
        'input-group_static-label': (!!this.label || this.$slots.label) && this.staticLabel
      }, this.classes);
    },
    isDirty () {
      return !!this.inputValue;
    },
    hasDetailsContent () {
      return this.hint &&
        this.isFocused ||
        this.hint &&
        this.persistentHint ||
        this.validations.length ||
        this.counter;
    },
    isDetailsHidden () {
      return this.hideDetails || !this.preserveDetails && !this.hasDetailsContent;
    },
    isDetailsAlwaysShowing () {
      return !this.hideDetails && (
        this.preserveDetails || (
          this.hint && this.persistentHint
        ) || this.counter
      );
    }
  },

  methods: {
    groupFocus (e) {},
    groupBlur (e) {
      this.tabFocused = false;
    },
    genLabel () {
      const children = [ this.$slots.label || this.label ];
      if (this.optional && this.$slots.optional) {
        children.push(this.$slots.optional);
      }
      if (this.required && this.$slots.required) {
        children.push(this.$slots.required);
      }
      return this.$createElement('label', {
        attrs: {
          for: this.$attrs.id
        }
      }, children);
    },
    genMessages () {
      let messages = null;

      if ((this.hint &&
            this.isFocused ||
            this.hint &&
            this.persistentHint) &&
          this.validations.length === 0
      ) {
        messages = [ this.genHint() ];
      } else if (this.validations.length) {
        messages = [ this.genError(this.validations[0]) ];
      }

      return this.$createElement('r-slide-y-transition', messages);
    },
    genHint () {
      return this.$createElement('div', {
        'class': 'input-group__messages input-group__hint',
        domProps: { innerHTML: this.hint }
      });
    },
    genError (error) {
      return this.$createElement(
        'div', {
          'class': 'input-group__messages input-group__error'
        },
        error
      );
    },
    genIcon (type, defaultCallback = null) {
      const shouldMenuArrowHide = type === 'append' &&
        typeof this.menu !== 'undefined' &&
        this.menu === false;

      if (shouldMenuArrowHide) {
        return null;
      }

      const shouldClear = type === 'append' && this.clearable && this.isDirty;
      const icon = shouldClear ? 'md-close' : (this[`${type}Icon`] || this.$slots[`${type}Icon`]);
      const slotMode = !!this.$slots[`${type}Icon`];

      if (!icon) {
        return null;
      }
      const key = typeof icon === 'string' ? icon : `${type}Icon`;
      const callback = shouldClear
        ? this.clearableCallback
        : (this[`${type}IconCb`] || defaultCallback);

      const wrapTag = shouldClear ? 'r-btn' : 'span';
      const props = shouldClear ? {
        disabled: this.disabled,
        icon: true,
        ripple: true,
        flat: true,
        round: true,
        small: true
      } : {
        disabled: this.disabled
      };
      return this.$createElement(wrapTag, {
        'class': {
          [`input-group__${type}-icon`]: true,
          'input-group__icon-cb': !!callback,
          'input-group__icon-clearable': shouldClear
        },
        attrs: {
          tabindex: '-1'
        },
        props,
        on: {
          click: e => {
            if (!callback) {
              return;
            }
            e.stopPropagation();
            callback();
          }
        }
      }, [
        slotMode ? icon : this.$createElement(icon, { key })
      ]);
    },
    // eslint-disable-next-line max-statements
    genInputGroup (input, data = {}, defaultAppendCallback = null) {
      const children = [];
      const wrapperChildren = [];
      const detailsChildren = [];

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.disabled
            ? -1
            : this.internalTabIndex || this.tabindex
        },
        ref: 'inputGroup',
        on: {
          focus: this.groupFocus,
          blur: this.groupBlur,
          click: () => (this.tabFocused = false),
          keyup: e => {
            if ([ 9, 16 ].includes(e.keyCode)) {
              this.tabFocused = true;
            }
          },
          keydown: e => {
            if (!this.toggle) {
              return;
            }

            if (this.toggleKeys.includes(e.keyCode)) {
              e.preventDefault();
              this.toggle();
            }
          }
        }
      }, data);

      if (this.$slots.label || this.label) {
        if (!this.staticLabel) {
          children.push(this.genLabel());
        } else if (Array.isArray(input) && this.staticLabel) {
          input.push(this.genLabel());
        }
      }

      wrapperChildren.push(input);

      if (this.prependIcon || this.$slots.prependIcon) {
        wrapperChildren.unshift(this.genIcon('prepend'));
      }

      if (this.appendIcon || this.$slots.appendIcon || this.clearable) {
        wrapperChildren.push(this.genIcon('append', defaultAppendCallback));
      }

      const progress = this.genProgress();
      progress && detailsChildren.push(progress);

      children.push(
        this.$createElement('div', {
          'class': 'input-group__input'
        }, wrapperChildren)
      );

      !this.hideDetails && detailsChildren.push(this.genMessages());

      if (this.counter) {
        detailsChildren.push(this.genCounter());
      }

      const detailsDirectives = [];
      if (!this.isDetailsAlwaysShowing && !this.hideDetails) {
        detailsDirectives.push({
          name: 'show',
          value: !this.isDetailsHidden
        });
      }

      const detailsContainer = this.$createElement('div', {
        'class': 'input-group__details',
        directives: detailsDirectives,
        key: 'details'
      }, detailsChildren);

      children.push(
        !this.preserveDetails
          ? this.$createElement('r-expand-transition', {
            attrs: {
              mode: 'out-in'
            }
          }, [ detailsContainer ])
          : detailsContainer
      );

      // if component is RSelect we could add static container to attach menu
      // after all elements
      this.staticAttach &&
        children.push(this.genStaticMenuContainer());

      return this.$createElement('div', data, children);
    }
  }
};
