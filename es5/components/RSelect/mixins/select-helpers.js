'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../../../util/helpers');

/**
 * Select helpers
 *
 * @mixin
 *
 * Helper methods for the
 * r-select component
 */
exports.default = {
  methods: {
    getText: function getText(item) {
      return this.getPropertyFromItem(item, this.itemText);
    },
    getValue: function getValue(item) {
      return this.getPropertyFromItem(item, this.itemValue);
    },
    getPropertyFromItem: function getPropertyFromItem(item, field) {
      if (item !== Object(item)) {
        return item;
      }

      var value = (0, _helpers.getObjectValueByPath)(item, field);

      return typeof value === 'undefined' ? item : value;
    },
    isItemsEqual: function isItemsEqual(firstItem, secondItem) {
      var itemText = (0, _helpers.ensureString)(firstItem[this.itemText]).toLowerCase();
      var contentText = secondItem.toLowerCase();

      return itemText === contentText;
    },
    isNeedCreateItem: function isNeedCreateItem(target) {
      var _this = this;

      if (!this.creatableChips) {
        return;
      }

      var findInList = this.computedItems.some(function (item) {
        return _this.isItemsEqual(item, target);
      });
      if (findInList) {
        return;
      }

      var findInSelected = this.selectedItems.some(function (item) {
        return _this.isItemsEqual(item, target);
      });
      if (!findInSelected) {
        return true;
      }
    }
  }
}; // Helpers