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
      var _this = this;

      this.$nextTick(function (_) {
        _this.menuIsActive = true;
      });
    },
    toggleMenu: function toggleMenu() {
      if (this.disabled || this.readonly || this.menuIsVisible) {
        return this.hideMenu();
      }

      this.showMenu();
      this.focusInput();
    },
    refreshMenuParams: function refreshMenuParams(val, prev) {
      var _this2 = this;

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

        if (_this2.menuItems.length && _this2.searchValue) {
          var firstItem = _this2.menuItems[0][_this2.itemText];
          var searchValuePrepare = (0, _helpers.ensureString)(val).toLowerCase();
          var firstItemValuePrepare = (0, _helpers.ensureString)(firstItem).toLowerCase();
          var isValuesIncludes = firstItemValuePrepare.includes(searchValuePrepare);

          isNeedSelectFirst = isValuesIncludes && (!_this2.isAnyValueAllowed || _this2.creatableChips) ? 0 : -1;
        }

        _this2.setMenuIndex(isNeedSelectFirst);

        if (val !== null && _this2.selectedIndex > -1) {
          _this2.selectedIndex = -1;
        }
      });
    }
  }
};