// Helpers
import { ensureString, getObjectValueByPath } from '../../../util/helpers';

/**
 * Select helpers
 *
 * @mixin
 *
 * Helper methods for the
 * r-select component
 */
export default {
  methods: {
    getText (item) {
      return this.getPropertyFromItem(item, this.itemText);
    },
    getValue (item) {
      return this.getPropertyFromItem(item, this.itemValue);
    },
    getPropertyFromItem (item, field) {
      if (item !== Object(item)) {
        return item;
      }

      const value = getObjectValueByPath(item, field);

      return typeof value === 'undefined' ? item : value;
    },
    isItemsEqual (firstItem, secondItem) {
      const itemText = ensureString(firstItem[this.itemText]).toLowerCase();
      const contentText = secondItem.toLowerCase();

      return itemText === contentText;
    },
    isNeedCreateItem (target) {
      if (!this.creatableChips) {
        return;
      }

      const findInList = this.computedItems.some( item => this.isItemsEqual(item, target) );
      if (findInList) {
        return;
      }

      const findInSelected = this.selectedItems.some( item => this.isItemsEqual(item, target) );
      if (!findInSelected) {
        return true;
      }
    },
  }
};
