'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _helpers = require('../../../util/helpers');

var _console = require('../../../util/console');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Select generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for VSelect
 */
exports.default = {
  methods: {
    genMenu: function genMenu() {
      var _this = this;

      var attachTo = this.staticAttach ? '[data-uid="' + this._uid + '"] .input-group__menu-static-container' : '[data-uid="' + this._uid + '"]';
      var data = {
        ref: 'menu',
        props: {
          activator: this.$el,
          auto: this.auto,
          attach: (this.attach || this.staticAttach) && attachTo,
          closeOnClick: false,
          closeOnContentClick: !this.isMultiple,
          contentClass: this.computedContentClass,
          disabled: this.disabled,
          fitToContent: this.fitToContent,
          maxHeight: this.maxHeight,
          nudgeTop: this.nudgeTop,
          offsetY: this.shouldOffset,
          offsetOverflow: this.isAutocomplete,
          openOnClick: false,
          value: this.menuIsVisible,
          zIndex: this.menuZIndex,
          lazy: this.lazy
        },
        on: {
          input: function input(val) {
            if (!val) {
              _this.menuIsActive = _this.persistentMenu;
            }
          }
        }
      };

      if (this.isAutocomplete) {
        data.props.transition = false;
      }

      this.minWidth && (data.props.minWidth = this.minWidth);

      var child = this.virtual && this.menuItems.length > 0 ? this.genVirtualList() : this.genList();

      return this.$createElement('r-menu', data, [child]);
    },
    genStaticMenuContainer: function genStaticMenuContainer() {
      return this.staticAttach ? this.$createElement('div', {
        attrs: {
          'class': 'input-group__menu-static-container'
        }
      }) : null;
    },
    getMenuIndex: function getMenuIndex() {
      return this.$refs.menu ? this.$refs.menu.listIndex : -1;
    },
    setMenuIndex: function setMenuIndex(index) {
      this.$refs.menu && (this.$refs.menu.listIndex = index);
    },
    resetMenuIndex: function resetMenuIndex() {
      this.setMenuIndex(-1);
    },
    isMenuItemSelected: function isMenuItemSelected() {
      return this.menuIsActive && this.menuItems.length && this.getMenuIndex() > -1;
    },
    genSelectionsAndSearch: function genSelectionsAndSearch() {
      return this.$createElement('div', {
        'class': 'input-group__selections',
        style: { 'overflow': 'hidden' },
        ref: 'activator'
      }, [].concat(_toConsumableArray(this.genSelections()), [this.genSearch()]));
    },
    genSelections: function genSelections() {
      if (this.hideSelections) {
        return [];
      }

      var length = this.selectedItems.length;
      var children = new Array(length);

      var genSelection = void 0;
      if (this.$scopedSlots.selection) {
        genSelection = this.genSlotSelection;
      } else if (this.chips) {
        genSelection = this.genChipSelection;
      } else if (this.segmented) {
        genSelection = this.genSegmentedBtn;
      } else {
        genSelection = this.genCommaSelection;
      }

      while (length--) {
        children[length] = genSelection(this.selectedItems[length], length, length === children.length - 1);
      }

      return children;
    },
    genSearch: function genSearch() {
      var _this2 = this;

      var data = {
        staticClass: 'input-group_select__autocomplete',
        'class': {
          'input-group_select__autocomplete_index': this.selectedIndex > -1
        },
        style: {
          flex: this.shouldBreak ? '1 0 100%' : null
        },
        attrs: _extends({}, this.$attrs, {
          disabled: this.disabled || !this.isAutocomplete,
          readonly: this.readonly,
          tabindex: this.disabled || !this.isAutocomplete ? -1 : this.tabindex
        }),
        domProps: {
          value: this.lazySearch || ''
        },
        directives: [{
          name: 'show',
          value: this.isAutocomplete || this.placeholder && !this.selectedItems.length
        }],
        ref: 'input',
        key: 'input'
      };

      if (this.isAutocomplete) {
        data.attrs.role = 'combobox';
        data.domProps.autocomplete = this.browserAutocomplete;

        data.on = _extends({}, this.genListeners(), {
          input: function input(e) {
            if (_this2.selectedIndex > -1) {
              return;
            }
            _this2.searchValue = e.target.value;
          }
        });

        data.directives = data.directives.concat(this.genDirectives());
      }

      if (this.placeholder) {
        data.domProps.placeholder = this.placeholder;
      }

      return this.$createElement('input', data);
    },
    genSegmentedBtn: function genSegmentedBtn(item) {
      if (!item.text || !item.callback) {
        (0, _console.consoleWarn)('When using \'segmented\' prop without a selection slot, items must contain both a text and callback property', this);
        return null;
      }

      return this.$createElement('r-btn', {
        props: {
          flat: true
        },
        on: {
          click: function click(e) {
            e.stopPropagation();
            item.callback(e);
          }
        }
      }, [item.text]);
    },
    genSlotSelection: function genSlotSelection(item, index) {
      return this.$scopedSlots.selection({
        parent: this,
        item: item,
        index: index,
        selected: index === this.selectedIndex,
        disabled: this.disabled || this.readonly
      });
    },
    genChipSelection: function genChipSelection(item, index) {
      var _this3 = this;

      var isDisabled = this.disabled || this.readonly;
      var click = function click(e) {
        if (isDisabled) {
          return;
        }

        e.stopPropagation();
        _this3.focusInput();
        setTimeout(function () {
          _this3.activateInput();
          _this3.selectedIndex = index;
        });
      };

      return this.$createElement('r-chip', {
        staticClass: 'chip_select-multi',
        attrs: { tabindex: '-1' },
        props: {
          color: this.chipsColor || this.color,
          close: this.deletableChips && !isDisabled,
          outline: this.chipsOutline,
          round: this.chipsRound,
          small: this.chipsSmall,
          disabled: isDisabled,
          selected: index === this.selectedIndex
        },
        on: {
          click: click,
          focus: click,
          input: function input() {
            if (_this3.isMultiple) {
              _this3.selectItem(item);
            } else {
              _this3.inputValue = null;
            }
          }
        },
        key: this.getValue(item)
      }, [
      // to wrap text and apply some styles to text content later
      this.$createElement('span', {
        staticClass: 'chip__content-text'
      }, this.getText(item))]);
    },
    genCommaSelection: function genCommaSelection(item, index, last) {
      return this.$createElement('div', {
        staticClass: 'input-group__selections__comma',
        'class': {
          'input-group__selections__comma_active': index === this.selectedIndex
        },
        key: JSON.stringify(this.getValue(item)) // Item may be an object
      }, '' + this.getText(item) + (last ? '' : ', '));
    },
    genVirtualList: function genVirtualList() {
      var _this4 = this;

      var defaultVirtualOpts = {
        items: this.menuItems,
        itemHeight: 42,
        anyHeight: true,
        poolSize: 400,
        buffer: 100,
        maxContentHeight: this.maxHeight
      };
      var opts = _typeof(this.virtual) === 'object' ? this.virtual : {};
      var virtualOpts = Object.assign({}, defaultVirtualOpts, opts);

      var itemScoped = function itemScoped(props) {
        var disabled = (0, _helpers.getObjectValueByPath)(props.item, _this4.itemDisabled);
        return _this4.$scopedSlots.item(_extends({
          selectItem: function selectItem(item) {
            if (disabled) {
              return;
            }
            _this4.selectItem(item);
          },
          selected: _this4.selectedItems.indexOf(props.item) > -1
        }, props, {
          itemKey: props.itemIndex + 1
        }));
      };

      var itemDefault = function itemDefault(props) {
        var item = props.item;
        if (item.header) {
          return _this4.genHeader(item);
        } else if (item.divider) {
          return _this4.genDivider(item);
        } else {
          return _this4.genTile(item);
        }
      };

      var scopedSlots = _extends({}, this.$scopedSlots, {
        item: function item(props) {
          return _this4.$scopedSlots.item ? itemScoped(props) : itemDefault(props);
        }
      });

      return this.$createElement('r-card', {
        style: {
          'max-height': typeof this.maxHeight === 'number' ? this.maxHeight + 'px' : this.maxHeight
        }
      }, [this.$createElement('r-list', {
        props: _extends({
          dense: this.dense,
          virtual: true
        }, virtualOpts),
        scopedSlots: scopedSlots,
        ref: 'list'
      })]);
    },
    genList: function genList() {
      var _this5 = this;

      var children = this.menuItems.map(function (o) {
        if (o.header) {
          return _this5.genHeader(o);
        } else if (o.divider) {
          return _this5.genDivider(o);
        } else {
          return _this5.genTile(o);
        }
      });

      if (!children.length) {
        var noData = this.$slots['no-data'];
        if (noData) {
          children.push(noData);
        } else {
          children.push(this.genTile(this.noDataText, true));
        }
      }

      return this.$createElement('r-card', [this.$createElement('r-list', {
        props: {
          dense: this.dense
        },
        ref: 'list'
      }, children)]);
    },
    genHeader: function genHeader(item) {
      return this.$createElement('r-subheader', {
        props: item
      }, item.header);
    },
    genDivider: function genDivider(item) {
      return this.$createElement('r-divider', {
        props: item
      });
    },
    genLabel: function genLabel() {
      var singleLine = this.singleLine || this.isDropdown;

      if (singleLine && this.isDirty || singleLine && this.isFocused && this.searchValue) return null;

      var data = {};

      if (this.id) {
        data.attrs = { for: this.id };
      }

      return this.$createElement('label', data, this.$slots.label || this.label);
    },
    genTile: function genTile(item, disabled) {
      var _this6 = this;

      var active = this.selectedItems.indexOf(item) !== -1;

      if (typeof disabled === 'undefined') {
        disabled = (0, _helpers.getObjectValueByPath)(item, this.itemDisabled);
      }

      var data = {
        on: {
          click: function click(e) {
            if (disabled) {
              return;
            }

            _this6.selectItem(item);
          }
        },
        props: {
          avatar: item === Object(item) && this.itemAvatar in item,
          ripple: this.listRipple,
          value: active
        }
      };

      if (disabled) {
        data.props.disabled = disabled;
      }

      data.props.activeClass = Object.keys(this.addTextColorClassChecks()).join(' ');

      if (this.$scopedSlots.item) {
        var tile = this.$scopedSlots.item({ parent: this, item: item, tile: data });
        if (Array.isArray(tile)) {
          tile = tile[0];
        }
        return this.needsTile(tile) ? this.$createElement('r-list-tile', data, [tile]) : tile;
      }

      return this.$createElement('r-list-tile', data, [this.genAction(item, active), this.genContent(item)]);
    },
    genAction: function genAction(item, active) {
      var _this7 = this;

      if (!this.isMultiple || this.isHidingSelected) {
        return null;
      }

      var data = {
        staticClass: 'list__tile__action_select-multi',
        on: {
          click: function click(e) {
            e.stopPropagation();
            _this7.selectItem(item);
          }
        }
      };

      return this.$createElement('r-list-tile-action', data, [this.$createElement('r-checkbox', {
        props: {
          color: this.computedColor,
          inputValue: active
        }
      })]);
    },
    genContent: function genContent(item) {
      var text = this.getText(item);

      return this.$createElement('r-list-tile-content', [this.$createElement('r-list-tile-sub-title', {
        domProps: {
          innerHTML: this.genFiltered(text)
        }
      })]);
    }
  }
};