'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadable = require('./loadable');

var _loadable2 = _interopRequireDefault(_loadable);

var _validatable = require('./validatable');

var _validatable2 = _interopRequireDefault(_validatable);

var _MdClose = require('md-svg-vue/dist/navigation/MdClose.vue');

var _MdClose2 = _interopRequireDefault(_MdClose);

var _RBtn = require('../components/RBtn/RBtn.vue');

var _RBtn2 = _interopRequireDefault(_RBtn);

var _transitions = require('../components/transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Icons


// Components


// Transitions


exports.default = {
  components: {
    MdClose: _MdClose2.default,
    RBtn: _RBtn2.default,
    RExpandTransition: _transitions.RExpandTransition,
    RSlideYTransition: _transitions.RSlideYTransition
  },

  mixins: [_loadable2.default, _validatable2.default],

  data: function data() {
    return {
      isFocused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value
    };
  },


  props: {
    appendIcon: [Object, String],
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
    prependIcon: [Object, String],
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    optional: Boolean,
    tabindex: {
      default: 0
    },
    toggleKeys: {
      type: Array,
      default: function _default() {
        return [13, 32];
      }
    },
    value: {
      required: false
    }
  },

  computed: {
    inputGroupClasses: function inputGroupClasses() {
      return Object.assign({
        'input-group': true,
        'input-group_async-loading': this.loading !== false,
        'input-group_focused': this.isFocused,
        'input-group_dirty': this.isDirty,
        'input-group_tab-focused': this.tabFocused,
        'input-group_disabled': this.disabled,
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
    isDirty: function isDirty() {
      return !!this.inputValue;
    },
    hasDetailsContent: function hasDetailsContent() {
      return this.hint && this.isFocused || this.hint && this.persistentHint || this.validations.length || this.counter;
    },
    isDetailsHidden: function isDetailsHidden() {
      return this.hideDetails || !this.preserveDetails && !this.hasDetailsContent;
    },
    isDetailsAlwaysShowing: function isDetailsAlwaysShowing() {
      return !this.hideDetails && (this.preserveDetails || this.hint && this.persistentHint || this.counter);
    }
  },

  methods: {
    groupFocus: function groupFocus(e) {},
    groupBlur: function groupBlur(e) {
      this.tabFocused = false;
    },
    genLabel: function genLabel() {
      var children = [this.$slots.label || this.label];
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
    genMessages: function genMessages() {
      var messages = null;

      if ((this.hint && this.isFocused || this.hint && this.persistentHint) && this.validations.length === 0) {
        messages = [this.genHint()];
      } else if (this.validations.length) {
        messages = [this.genError(this.validations[0])];
      }

      return this.$createElement('r-slide-y-transition', messages);
    },
    genHint: function genHint() {
      return this.$createElement('div', {
        'class': 'input-group__messages input-group__hint',
        domProps: { innerHTML: this.hint }
      });
    },
    genError: function genError(error) {
      return this.$createElement('div', {
        'class': 'input-group__messages input-group__error'
      }, error);
    },
    genIcon: function genIcon(type) {
      var _class;

      var defaultCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var shouldMenuArrowHide = type === 'append' && typeof this.menu !== 'undefined' && this.menu === false;

      if (shouldMenuArrowHide) {
        return null;
      }

      var shouldClear = type === 'append' && this.clearable && this.isDirty;
      var icon = shouldClear ? 'md-close' : this[type + 'Icon'] || this.$slots[type + 'Icon'];
      var slotMode = !!this.$slots[type + 'Icon'];

      if (!icon) {
        return null;
      }
      var key = typeof icon === 'string' ? icon : type + 'Icon';
      var callback = shouldClear ? this.clearableCallback : this[type + 'IconCb'] || defaultCallback;

      var wrapTag = shouldClear ? 'r-btn' : 'span';
      var props = shouldClear ? {
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
        'class': (_class = {}, _defineProperty(_class, 'input-group__' + type + '-icon', true), _defineProperty(_class, 'input-group__icon-cb', !!callback), _defineProperty(_class, 'input-group__icon-clearable', shouldClear), _class),
        attrs: {
          tabindex: '-1'
        },
        props: props,
        on: {
          click: function click(e) {
            if (!callback) {
              return;
            }
            e.stopPropagation();
            callback();
          }
        }
      }, [slotMode ? icon : this.$createElement(icon, { key: key })]);
    },

    // eslint-disable-next-line max-statements
    genInputGroup: function genInputGroup(input) {
      var _this = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaultAppendCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var children = [];
      var wrapperChildren = [];
      var detailsChildren = [];

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.disabled ? -1 : this.internalTabIndex || this.tabindex
        },
        on: {
          focus: this.groupFocus,
          blur: this.groupBlur,
          click: function click() {
            return _this.tabFocused = false;
          },
          keyup: function keyup(e) {
            if ([9, 16].includes(e.keyCode)) {
              _this.tabFocused = true;
            }
          },
          keydown: function keydown(e) {
            if (!_this.toggle) {
              return;
            }

            if (_this.toggleKeys.includes(e.keyCode)) {
              e.preventDefault();
              _this.toggle();
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

      var progress = this.genProgress();
      progress && detailsChildren.push(progress);

      children.push(this.$createElement('div', {
        'class': 'input-group__input'
      }, wrapperChildren));

      !this.hideDetails && detailsChildren.push(this.genMessages());

      if (this.counter) {
        detailsChildren.push(this.genCounter());
      }

      var detailsDirectives = [];
      if (!this.isDetailsAlwaysShowing && !this.hideDetails) {
        detailsDirectives.push({
          name: 'show',
          value: !this.isDetailsHidden
        });
      }

      var detailsContainer = this.$createElement('div', {
        'class': 'input-group__details',
        directives: detailsDirectives,
        key: 'details'
      }, detailsChildren);

      children.push(!this.preserveDetails ? this.$createElement('r-expand-transition', {
        attrs: {
          mode: 'out-in'
        }
      }, [detailsContainer]) : detailsContainer);

      // if component is RSelect we could add static container to attach menu
      // after all elements
      this.staticAttach && children.push(this.genStaticMenuContainer());

      return this.$createElement('div', data, children);
    }
  }
};