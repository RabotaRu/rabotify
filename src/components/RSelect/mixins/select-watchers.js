/**
 * Select watchers
 *
 * @mixin
 *
 * Watchers for the
 * r-select component
 */
import { ensureString } from "../../../util/helpers";

export default {
  watch: {
    filteredItems () {
      this.$refs.menu && this.$refs.menu.updateDimensions();
      this.refreshMenuParams(this.searchValue);
    },
    inputValue (val) {
      // Search for an existing item when a
      // value was selected from the menu
      if (this.combobox && this.isNotFiltering) {
        val = this.findExistingItem(val);
      }

      // Populate selected items
      this.genSelectedItems(val);

      // Only fire an update
      // if values do not
      // match
      val !== this.value && this.$emit('input', val);

      // When inputValue is changed
      // and combobox is true set
      // menu property to false
      if (this.combobox) {
        this.menuIsActive = this.persistentMenu;
      }
    },
    isActive (val) {
      if (val) {
        if (!this.chips && !this.$scopedSlots.selection) {
          this.searchValue = this.getText(this.selectedItem);
        }
        return;
      }

      this.blur();

      if (this.tags && this.searchValue) {
        this.updateTags(this.searchValue);
      }

      if (this.combobox && this.lazySearch && !this.isNotFiltering) {
        this.inputValue = this.lazySearch;
      }

      // Only set search value if
      // there is a value to set
      this.searchValue && (this.searchValue = null);
    },
    isBooted () {
      this.$nextTick(() => {
        if (this.content && this.content.addEventListener) {
          this.content.addEventListener('scroll', this.onScroll, false);
        }
      });
    },
    items (val) {
      if (this.cacheItems) {
        this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val));
      }

      this.resetMenuIndex();

      // Tags and combobox should not
      // pre-select the first entry
      if (this.searchValue && !this.isAnyValueAllowed) {
        this.$nextTick(() => this.setMenuIndex(0));
      }

      this.genSelectedItems();
    },
    menuIsActive (val) {
      if (!val) {
        return;
      }

      this.isBooted = true;
    },
    isMultiple (val) {
      this.inputValue = val ? [] : null;
    },
    searchInput (val) {
      this.searchValue = val;
    },
    searchValue (val, prev) {
      this.refreshMenuParams(val, prev);
    },
    selectedItems () {
      if (this.isAutocomplete) {
        this.$nextTick(_ => {
          if (this.isDetailsAlwaysShowing || !this.rules.length) {
            this.$refs.menu.updateDimensions();
          } else {
            // details element could be collapsed/expanded after validation
            // with duration ~ 350 ms
            setTimeout(this.$refs.menu.updateDimensions, 350);
          }
        });
      }

      if (this.hideMenuAfterSelect) {
        this.resetMenuIndex();
        this.hideMenu();
      }
    },
    value (val) {
      this.inputValue = val;
      this.validate();
    }
  }
};
