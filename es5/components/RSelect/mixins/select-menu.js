"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require("../../../util/helpers");

/**
 * Select menu methods
 *
 * @mixin
 *
 * Menu based methods for
 * the r-select component
 */
exports.default = {
  methods: {
    activateInput: function activateInput() {
      this.isActive = true;
      this.isFocused = true;
    },
    deactivateInput: function deactivateInput() {
      this.isFocused = false;
      this.isActive = false;
      this.selectedIndex = -1;
    },
    hideMenu: function hideMenu() {
      this.menuIsActive = this.persistentMenu;
    },
    showMenu: function showMenu() {
      this.activateInput();
      this.showMenuItems();
      this.isMultiple && this.resetMenuIndex();
    },
    showMenuItems: function showMenuItems() {
      this.menuIsActive = true;
    },
    toggleMenu: function toggleMenu() {
      if (this.disabled || this.readonly || this.menuIsVisible) {
        return this.hideMenu();
      }

      this.showMenu();
      this.focusInput();
    },
    refreshMenuParams: function refreshMenuParams(val, prev) {
      var _this = this;

      // Wrap input to next line if overflowing
      if (this.$refs.input.scrollWidth > this.$refs.input.clientWidth) {
        this.shouldBreak = true;
        this.$nextTick(this.updateDimensionsMenu);
      } else if (val === null) {
        this.shouldBreak = false;
      }

      // Activate menu if inactive and searching
      if (this.isActive && !this.menuIsActive && val !== this.getText(this.selectedItem)) {
        this.menuIsActive = true;
      }

      // Only reset list index
      // if typing in search
      !val && prev && this.resetMenuIndex();

      this.$nextTick(function () {
        var isNeedSelectFirst = -1;

        if (_this.menuItems.length && _this.searchValue) {
          var firstItem = _this.menuItems[0][_this.itemText];
          var searchValuePrepare = (0, _helpers.ensureString)(val).toLowerCase();
          var firstItemValuePrepare = (0, _helpers.ensureString)(firstItem).toLowerCase();
          var isValuesIncludes = firstItemValuePrepare.includes(searchValuePrepare);

          isNeedSelectFirst = isValuesIncludes && (!_this.isAnyValueAllowed || _this.creatableChips) ? 0 : -1;
        }

        _this.setMenuIndex(isNeedSelectFirst);

        if (val !== null && _this.selectedIndex > -1) {
          _this.selectedIndex = -1;
        }
      });
    }
  }
};