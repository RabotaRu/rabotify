'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../../../util/helpers');

exports.default = {
  watch: {
    filteredItems: function filteredItems() {
      this.updateDimensionsMenu();
      this.refreshMenuParams(this.searchValue);
    },
    inputValue: function inputValue(val) {
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
    isActive: function isActive(val) {
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
    isBooted: function isBooted() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.content && _this.content.addEventListener) {
          _this.content.addEventListener('scroll', _this.onScroll, false);
        }
      });
    },
    items: function items(val) {
      var _this2 = this;

      if (this.cacheItems) {
        this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val));
      }

      this.resetMenuIndex();

      // Tags and combobox should not
      // pre-select the first entry
      if (this.searchValue && !this.isAnyValueAllowed) {
        this.$nextTick(function () {
          return _this2.setMenuIndex(0);
        });
      }

      this.genSelectedItems();
    },
    menuIsActive: function menuIsActive(val) {
      this.$emit('toggle-menu', val);

      if (!val) {
        return;
      }

      this.isBooted = true;
    },
    isMultiple: function isMultiple(val) {
      this.inputValue = val ? [] : null;
    },
    searchInput: function searchInput(val) {
      this.searchValue = val;
    },
    searchValue: function searchValue(val, prev) {
      this.refreshMenuParams(val, prev);
    },
    selectedItems: function selectedItems() {
      var _this3 = this;

      if (this.isAutocomplete) {
        this.$nextTick(function (_) {
          if (_this3.isDetailsAlwaysShowing || !_this3.rules.length) {
            _this3.updateDimensionsMenu();
          } else {
            // details element could be collapsed/expanded after validation
            // with duration ~ 350 ms
            setTimeout(_this3.updateDimensionsMenu, 350);
          }
        });
      }

      if (this.hideMenuAfterSelect) {
        this.resetMenuIndex();
        this.hideMenu();
      }
    },
    value: function value(val) {
      this.inputValue = val;
      this.validate();
    }
  }
}; /**
    * Select watchers
    *
    * @mixin
    *
    * Watchers for the
    * r-select component
    */