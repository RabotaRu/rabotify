/**
 * Select computed properties
 *
 * @mixin
 *
 * Computed properties for
 * the r-select component
 */

import { normalizeClassName } from '../../../util/helpers';

export default {
  computed: {
    classes () {
      const classes = {
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
    computedContentClass () {
      const children = [
        'menu__content_select',
        this.auto ? 'menu__content_auto' : '',
        this.isDropdown ? 'menu__content_dropdown' : '',
        this.isAutocomplete ? 'menu__content_autocomplete' : '',
        this.contentClass || ''
      ];

      return normalizeClassName(children.join(' '));
    },
    computedItems () {
      return this.filterDuplicates(this.cachedItems.concat(this.items));
    },
    /**
     * The range of the current input text
     *
     * @return {Number}
     */
    currentRange () {
      if (this.selectedItem == null) {
        return 0;
      }

      return this.getText(this.selectedItem).toString().length;
    },
    filteredItems () {
      // If we are not actively filtering
      // Show all available items
      const items = this.isNotFiltering
        ? this.computedItems
        : this.filterSearch();

      return !this.auto && !this.virtual ? items.slice(0, this.lastItem) : items;
    },
    hideSelections () {
      return this.isAutocomplete &&
        !this.isMultiple &&
        this.isFocused &&
        !this.chips &&
        !this.$scopedSlots.selection;
    },
    isNotFiltering () {
      return this.isAutocomplete &&
        this.isDirty &&
        this.searchValue === this.getText(this.selectedItem);
    },
    isHidingSelected () {
      return this.hideSelected && this.isAutocomplete && this.isMultiple;
    },
    isAutocomplete () {
      return this.autocomplete || this.editable || this.tags || this.combobox;
    },
    isDirty () {
      return this.selectedItems.length > 0 ||
        (this.isAutocomplete && this.searchValue);
    },
    isDropdown () {
      return this.segmented || this.overflow || this.editable;
    },
    isMultiple () {
      return this.multiple || this.tags;
    },
    isAnyValueAllowed () {
      return this.tags || this.combobox;
    },
    menuIsVisible () {
      if (!this.menu) {
        return false;
      }
      return this.menuIsActive &&
        this.computedItems.length > 0 &&
        (!this.isAnyValueAllowed || this.filteredItems.length > 0);
    },
    menuItems () {
      return this.isHidingSelected ? this.filteredItems.filter(o => {
        return (this.selectedItems || []).indexOf(o) === -1;
      }) : this.filteredItems;
    },
    nudgeTop () {
      let nudgeTop = 0;

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
      get () { return this.lazySearch; },
      set (val) {
        if (!this.isAutocomplete ||
          (!this.multiple && this.selectedIndex > -1)
        ) {
          return;
        }

        this.lazySearch = val;

        this.$emit('update:searchInput', val);
      }
    },
    selectedItem () {
      if (this.isMultiple) {
        return null;
      }

      return this.selectedItems.find(i => (
        this.getValue(i) === this.getValue(this.inputValue)
      ));
    },
    shouldOffset () {
      return this.isAutocomplete || this.isDropdown;
    }
  }
};
