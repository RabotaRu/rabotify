import { generateNumber, getObjectValueByPath } from '../../../util/helpers';
import { consoleWarn } from '../../../util/console';

/**
 * Select generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for VSelect
 */
export default {
  methods: {
    genMenu () {
      const attachTo = this.staticAttach
        ? `[data-uid="${this._uid}"] .input-group__menu-static-container`
        : `[data-uid="${this._uid}"]`;
      const data = {
        ref: 'menu',
        props: {
          activator: this.$refs.inputGroup,
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
          input: val => {
            if (!val) {
              this.menuIsActive = this.persistentMenu;
            }
          }
        }
      };

      if (this.isAutocomplete) {
        data.props.transition = false;
      }

      this.minWidth && (data.props.minWidth = this.minWidth);

      const child = this.virtual && this.menuItems.length > 0
        ? this.genVirtualList() : this.genList();

      return this.$createElement('r-menu', data, [ child ]);
    },
    genStaticMenuContainer () {
      return this.staticAttach ? this.$createElement('div', {
        attrs: {
          'class': 'input-group__menu-static-container'
        }
      }) : null;
    },
    getMenuIndex () {
      return this.$refs.menu ? this.$refs.menu.listIndex : -1;
    },
    setMenuIndex (index) {
      this.$refs.menu && (this.$refs.menu.listIndex = index);
    },
    resetMenuIndex () {
      this.setMenuIndex(-1);
    },
    isMenuItemSelected () {
      return this.menuIsActive && this.menuItems.length && this.getMenuIndex() > -1;
    },
    genSelectionsAndSearch ({ search = true, selections = true }) {
      const genSearch = search ? this.genSearch() : null;
      const genSelections = selections ? this.genSelections() : [];
      const ref = search ? 'activator' : 'selections';
      let classes = 'input-group__selections';

      if (!search) {
        classes += this.selectedItems.length ?
          ' input-group__selections-outside'
          : '';
      }

      return this.$createElement('div', {
        'class': classes,
        style: { 'overflow': 'hidden' },
        ref
      }, [
        ...genSelections,
        genSearch
      ]);
    },
    genSelections () {
      if (this.hideSelections) {
        return [];
      }

      let length = this.selectedItems.length;
      const children = new Array(length);

      let genSelection;
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
    genSearch () {
      const data = {
        staticClass: 'input-group_select__autocomplete',
        'class': {
          'input-group_select__autocomplete_index': this.selectedIndex > -1
        },
        style: {
          flex: this.shouldBreak ? '1 0 100%' : null
        },
        attrs: {
          ...this.$attrs,
          disabled: this.disabled || !this.isAutocomplete,
          readonly: this.readonly,
          tabindex: this.disabled || !this.isAutocomplete ? -1 : this.tabindex
        },
        domProps: {
          value: this.lazySearch || ''
        },
        directives: [{
          name: 'show',
          value: this.isAutocomplete || (this.placeholder && !this.selectedItems.length)
        }],
        ref: 'input',
        key: 'input'
      };

      if (this.isAutocomplete) {
        data.attrs.role = 'combobox';
        data.domProps.autocomplete = this.browserAutocomplete;

        data.on = {
          ...this.genListeners(),
          input: e => {
            if (this.selectedIndex > -1) {
              return;
            }
            this.searchValue = e.target.value;
          }
        };

        data.directives = data.directives.concat(this.genDirectives());
      }

      if (this.placeholder) {
        data.domProps.placeholder = this.placeholder;
      }

      return this.$createElement('input', data);
    },
    genSegmentedBtn (item) {
      if (!item.text || !item.callback) {
        consoleWarn('When using \'segmented\' prop without a selection slot, items must contain both a text and callback property', this);
        return null;
      }

      return this.$createElement('r-btn', {
        props: {
          flat: true
        },
        on: {
          click (e) {
            e.stopPropagation();
            item.callback(e);
          }
        }
      }, [ item.text ]);
    },
    genSlotSelection (item, index) {
      return this.$scopedSlots.selection({
        parent: this,
        item,
        index,
        selected: index === this.selectedIndex,
        disabled: this.disabled || this.readonly
      });
    },
    genChipSelection (item, index) {
      const isDisabled = this.disabled || this.readonly;
      const click = e => {
        if (isDisabled) {
          return;
        }

        e.stopPropagation();
        this.focusInput();
        setTimeout(() => {
          this.activateInput();
          this.selectedIndex = index;
        });
      };

      return this.$createElement('r-chip', {
        staticClass: 'r-chip_select-multi',
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
          click,
          focus: click,
          input: () => {
            if (this.isMultiple) {
              this.selectItem(item, { focusInputAfterSelect: !this.chipsOutside });
            } else {
              this.inputValue = null;
            }
          }
        },
        key: this.getValue(item)
      }, [
        // to wrap text and apply some styles to text content later
        this.$createElement('span', {
          staticClass: 'r-chip__content-text'
        }, this.getText(item))
      ]);
    },
    genCommaSelection (item, index, last) {
      return this.$createElement('div', {
        staticClass: 'input-group__selections__comma',
        'class': {
          'input-group__selections__comma_active': index === this.selectedIndex
        },
        key: JSON.stringify(this.getValue(item)) // Item may be an object
      }, `${this.getText(item)}${last ? '' : ', '}`);
    },
    genVirtualList () {
      const defaultVirtualOpts = {
        items: this.menuItems,
        itemHeight: 32,
        anyHeight: true,
        poolSize: 400,
        buffer: 100,
        maxContentHeight: this.maxHeight
      };
      const opts = typeof this.virtual === 'object' ? this.virtual : {};
      const virtualOpts = Object.assign({}, defaultVirtualOpts, opts);

      const itemScoped = props => {
        const disabled = getObjectValueByPath(props.item, this.itemDisabled);
        return this.$scopedSlots.item({
          selectItem: item => {
            if (disabled) {
              return;
            }
            this.selectItem(item);
          },
          selected: this.selectedItems.indexOf(props.item) > -1,
          ...props,
          itemKey: props.itemIndex + 1
        });
      };

      const itemDefault = props => {
        const item = props.item;
        if (item.header) {
          return this.genHeader(item);
        } else if (item.divider) {
          return this.genDivider(item);
        } else {
          return this.genTile(item);
        }
      };

      const scopedSlots = {
        ...this.$scopedSlots,
        item: props => this.$scopedSlots.item
          ? itemScoped(props) : itemDefault(props)
      };

      return this.$createElement('r-card', {
        style: {
          'max-height': typeof this.maxHeight === 'number'
            ? `${this.maxHeight}px` : this.maxHeight
        }
      }, [
        this.$createElement('r-list', {
          props: {
            dense: this.dense,
            virtual: true,
            ...virtualOpts
          },
          scopedSlots,
          ref: 'list'
        })
      ]);
    },
    genList () {
      const children = this.menuItems.map(o => {
        if (o.header) {
          return this.genHeader(o);
        } else if (o.divider) {
          return this.genDivider(o);
        } else {
          return this.genTile(o);
        }
      });

      if (!children.length && !this.hideNoData) {
        const noData = this.$slots['no-data'];
        if (noData) {
          children.push(noData);
        } else {
          children.push(this.genTile(this.noDataText, true));
        }
      }

      const prependItem = this.$slots['prepend-item'];
      prependItem && children.unshift(prependItem);

      const creatableTile = this.creatableChips && this.searchValue && !this.isFindInList(this.searchValue)
       ? this.genCreatableTile()
       : null;

      return this.$createElement('r-card', [
        creatableTile,
        this.$createElement('r-list', {
          props: {
            dense: this.dense
          },
          ref: 'list'
        }, children)
      ]);
    },
    genCreatableTile () {
      return this.$createElement('r-list', {
        'class': 'list_creatable'
      }, [
        this.genTile({
          [this.itemText]: this.searchValue,
          [this.itemValue]: generateNumber(-1e15, -1e20),
        }, false, this.createItem, true)
      ])
    },
    genHeader (item) {
      return this.$createElement('r-subheader', {
        props: item
      }, item.header);
    },
    genDivider (item) {
      return this.$createElement('r-divider', {
        props: item
      });
    },
    genLabel () {
      const singleLine = this.singleLine || this.isDropdown;

      if (singleLine && this.isDirty ||
        singleLine && this.isFocused && this.searchValue
      ) return null;

      const data = {};

      if (this.id) {
        data.attrs = { for: this.id };
      }

      return this.$createElement('label', data, this.$slots.label || this.label);
    },
    genTile (item, disabled, functionOnClick, isNotSelectable) {
      const active = this.selectedItems.indexOf(item) !== -1;

      if (typeof disabled === 'undefined') {
        disabled = getObjectValueByPath(item, this.itemDisabled);
      }

      const data = {
        on: {
          click: e => {
            if (disabled) {
              return;
            }

            if (functionOnClick) {
              return functionOnClick();
            }

            this.selectItem(item, {
              focusInputAfterSelect: true,
              removeItem: this.removeItemAfterSelect
            });
          }
        },
        props: {
          avatar: item === Object(item) && this.itemAvatar in item,
          ripple: this.listRipple,
          value: active
        },
        'class': isNotSelectable ? '' : 'list__tile_selectable'
      };

      if (disabled) {
        data.props.disabled = disabled;
      }

      data.props.activeClass = Object.keys(this.addTextColorClassChecks()).join(' ');

      if (this.$scopedSlots.item) {
        let tile = this.$scopedSlots.item({ parent: this, item, tile: data });
        if (Array.isArray(tile)) {
          tile = tile[0];
        }
        return this.needsTile(tile)
          ? this.$createElement('r-list-tile', data, [ tile ])
          : tile;
      }

      return this.$createElement('r-list-tile', data,
        [ this.genAction(item, active), this.genContent(item) ]
      );
    },
    genAction (item, active) {
      if (!this.isMultiple || this.isHidingSelected || this.chipsOutside) {
        return null;
      }

      const data = {
        staticClass: 'list__tile__action_select-multi',
        on: {
          click: e => {
            e.stopPropagation();
            this.selectItem(item);
          }
        }
      };

      return this.$createElement('r-list-tile-action', data, [
        this.$createElement('r-checkbox', {
          props: {
            color: this.computedColor,
            inputValue: active
          }
        })
      ]);
    },
    genContent (item) {
      const text = this.getText(item);

      return this.$createElement('r-list-tile-content', [
        this.$createElement('r-list-tile-sub-title', {
          domProps: {
            innerHTML: this.genFiltered(text)
          }
        })
      ]);
    }
  }
};
