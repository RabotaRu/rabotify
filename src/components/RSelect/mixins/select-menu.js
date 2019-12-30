import { ensureString } from "../../../util/helpers";

/**
 * Select menu methods
 *
 * @mixin
 *
 * Menu based methods for
 * the r-select component
 */
export default {
  methods: {
    activateInput () {
      this.isActive = true;
      this.isFocused = true;
    },
    deactivateInput () {
      this.isFocused = false;
      this.isActive = false;
      this.selectedIndex = -1;
    },
    hideMenu () {
      this.menuIsActive = this.persistentMenu;
    },
    showMenu () {
      this.activateInput();
      this.showMenuItems();
      this.isMultiple && this.resetMenuIndex();
    },
    showMenuItems () {
      this.$nextTick(_ => {
        this.menuIsActive = true;
      });
    },
    toggleMenu () {
      if (this.disabled || this.readonly || this.menuIsVisible) {
        return this.hideMenu();
      }

      this.showMenu();
      this.focusInput();
    },
    refreshMenuParams (val, prev) {
      // Wrap input to next line if overflowing
      if (this.$refs.input.scrollWidth > this.$refs.input.clientWidth) {
        this.shouldBreak = true;
        this.$nextTick(this.updateDimensionsMenu);
      } else if (val === null) {
        this.shouldBreak = false;
      }

      // Activate menu if inactive and searching
      if (this.isActive &&
        !this.menuIsActive &&
        val !== this.getText(this.selectedItem)
      ) {
        this.menuIsActive = true;
      }

      // Only reset list index
      // if typing in search
      !val && prev && this.resetMenuIndex();

      this.$nextTick(() => {
        let isNeedSelectFirst = -1;

        if (this.menuItems.length && this.searchValue) {
          const firstItem = this.menuItems[0][this.itemText];
          const searchValuePrepare = ensureString(val).toLowerCase();
          const firstItemValuePrepare = ensureString(firstItem).toLowerCase();
          const isValuesIncludes = firstItemValuePrepare.includes(searchValuePrepare);

          isNeedSelectFirst = isValuesIncludes && (!this.isAnyValueAllowed || this.creatableChips)
            ? 0
            : -1;
        }

        this.setMenuIndex(isNeedSelectFirst);

        if (val !== null && this.selectedIndex > -1) {
          this.selectedIndex = -1;
        }
      });
    }
  }
};
