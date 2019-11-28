'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Menu generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for RMenu
 */
exports.default = {
  methods: {
    genActivator: function genActivator() {
      if (!this.$slots.activator) {
        return null;
      }

      var options = {
        staticClass: 'menu__activator',
        'class': {
          'menu__activator_active': this.hasJustFocused || this.isActive
        },
        ref: 'activator',
        on: {}
      };

      if (this.openOnHover) {
        options.on['mouseenter'] = this.mouseEnterHandler;
        options.on['mouseleave'] = this.mouseLeaveHandler;
      } else if (this.openOnClick) {
        options.on['click'] = this.activatorClickHandler;
      }

      return this.$createElement('div', options, this.$slots.activator);
    },
    genTransition: function genTransition() {
      if (!this.transition) {
        return this.genContent();
      }

      return this.$createElement('transition', {
        props: {
          name: typeof this.transition === 'string' ? this.transition : 'menu-transition'
        }
      }, [this.genContent()]);
    },
    genDirectives: function genDirectives() {
      var _this = this;

      // Do not add click outside for hover menu
      var directives = !this.openOnHover ? [{
        name: 'click-outside',
        value: function value() {
          return _this.isActive = false;
        },
        args: {
          closeConditional: function closeConditional() {
            return _this.closeOnClick;
          },
          include: function include() {
            var elements = [_this.$el].concat(_toConsumableArray(_this.getOpenDependentElements()));

            if (_this.includeActivator) {
              elements.push(_this.getActivator());
            }

            return elements;
          }
        }
      }] : [];

      directives.push({
        name: 'show',
        value: this.isContentActive
      });

      return directives;
    },
    genContent: function genContent() {
      var _class,
          _this2 = this;

      var options = {
        staticClass: 'menu__content',
        'class': (_class = {}, _defineProperty(_class, this.contentClass.trim(), true), _defineProperty(_class, 'menuable__content__active', this.isActive), _class),
        style: this.styles,
        directives: this.genDirectives(),
        ref: 'content',
        on: {
          click: function click(e) {
            e.stopPropagation();
            if (e.target.getAttribute('disabled')) {
              return;
            }
            if (_this2.closeOnContentClick) {
              _this2.isActive = false;
            }
          }
        }
      };

      !this.disabled && this.openOnHover && (options.on.mouseenter = this.mouseEnterHandler);
      this.openOnHover && (options.on.mouseleave = this.mouseLeaveHandler);

      return this.$createElement('div', options, this.showLazyContent(this.$slots.default));
    }
  }
};