'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../../../util/helpers');

exports.default = {
  computed: {
    classes: function classes() {
      var classes = {
        'input-group_text-field input-group_select': true,
        'input-group_auto': this.auto,
        'input-group_overflow': this.overflow,
        'input-group_segmented': this.segmented,
        'input-group_editable': this.editable,
        'input-group_autocomplete': this.isAutocomplete,
        'input-group_single-line': this.singleLine || this.isDropdown,
        'input-group_multi-line': this.multiLine,
        'input-group_chips': this.chips,
        'input-group_multiple': this.multiple,
        'input-group_open': this.menuIsVisible,
        'input-group_select_selecting-index': this.selectedIndex > -1
      };

      if (this.hasError) {
        classes['text_error'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    computedContentClass: function computedContentClass() {
      var children = ['menu__content_select', this.auto ? 'menu__content_auto' : '', this.isDropdown ? 'menu__content_dropdown' : '', this.isAutocomplete ? 'menu__content_autocomplete' : '', this.contentClass || ''];

      return (0, _helpers.normalizeClassName)(children.join(' '));
    },
    computedItems: function computedItems() {
      return this.filterDuplicates(this.cachedItems.concat(this.items));
    },

    /**
     * The range of the current input text
     *
     * @return {Number}
     */
    currentRange: function currentRange() {
      if (this.selectedItem == null) {
        return 0;
      }

      return this.getText(this.selectedItem).toString().length;
    },
    filteredItems: function filteredItems() {
      // If we are not actively filtering
      // Show all available items
      var items = this.isNotFiltering ? this.computedItems : this.filterSearch();

      return !this.auto && !this.virtual ? items.slice(0, this.lastItem) : items;
    },
    hideSelections: function hideSelections() {
      return this.isAutocomplete && !this.isMultiple && this.isFocused && !this.chips && !this.$scopedSlots.selection;
    },
    isNotFiltering: function isNotFiltering() {
      return this.isAutocomplete && this.isDirty && this.searchValue === this.getText(this.selectedItem);
    },
    isHidingSelected: function isHidingSelected() {
      return this.hideSelected && (this.isAutocomplete || this.chipsOutside) && this.isMultiple;
    },
    isAutocomplete: function isAutocomplete() {
      return this.autocomplete || this.editable || this.tags || this.combobox;
    },
    isDirty: function isDirty() {
      return this.selectedItems.length > 0 || this.isAutocomplete && this.searchValue;
    },
    isDropdown: function isDropdown() {
      return this.segmented || this.overflow || this.editable;
    },
    isMultiple: function isMultiple() {
      return this.multiple || this.tags;
    },
    isAnyValueAllowed: function isAnyValueAllowed() {
      return this.tags || this.combobox || this.creatableChips;
    },
    menuIsVisible: function menuIsVisible() {
      if (!this.menu) {
        return false;
      }

      return this.creatableChips ? this.menuIsActive : this.menuIsActive && this.computedItems.length > 0 && (!this.isAnyValueAllowed || this.filteredItems.length > 0);
    },
    menuItems: function menuItems() {
      var _this = this;

      return this.isHidingSelected ? this.filteredItems.filter(function (o) {
        return (_this.selectedItems || []).every(function (selectedItem) {
          return _this.getValue(selectedItem) !== _this.getValue(o);
        });
      }) : this.filteredItems;
    },
    nudgeTop: function nudgeTop() {
      var nudgeTop = 0;

      if (this.shouldOffset) {
        nudgeTop += -18;
        nudgeTop += 44;

        if (this.isDetailsHidden) {
          nudgeTop += -24;
        }

        nudgeTop += this.isAutocomplete && !this.isDropdown ? -2 : 0;
      }

      return nudgeTop;
    },

    searchValue: {
      get: function get() {
        return this.lazySearch;
      },
      set: function set(val) {
        if (!this.isAutocomplete || !this.multiple && this.selectedIndex > -1) {
          return;
        }

        this.lazySearch = val;

        this.$emit('update:searchInput', val);
      }
    },
    selectedItem: function selectedItem() {
      var _this2 = this;

      if (this.isMultiple) {
        return null;
      }

      return this.selectedItems.find(function (i) {
        return _this2.getValue(i) === _this2.getValue(_this2.inputValue);
      });
    },
    shouldOffset: function shouldOffset() {
      return this.isAutocomplete || this.isDropdown;
    }
  }
}; /**
    * Select computed properties
    *
    * @mixin
    *
    * Computed properties for
    * the r-select component
    */