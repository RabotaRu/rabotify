'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../../../util/helpers');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Select autocomplete
 *
 * @mixin
 *
 * Handles logic when using the "autocomplete" prop
 */
exports.default = {
  props: {
    filter: {
      type: Function,
      default: function _default(item, queryText, itemText) {
        var hasValue = function hasValue(val) {
          return val != null ? val : '';
        };

        var text = hasValue(itemText);
        var query = hasValue(queryText);

        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
      }
    }
  },

  methods: {
    filterSearch: function filterSearch() {
      var _this = this;

      if (!this.isAutocomplete) {
        return this.computedItems;
      }

      return this.computedItems.filter(function (i) {
        return _this.filter(i, _this.searchValue, _this.getText(i));
      });
    },
    genFiltered: function genFiltered(text) {
      text = (text || '').toString();

      if (!this.isAutocomplete || !this.searchValue || this.filteredItems.length < 1) {
        return (0, _helpers.escapeHTML)(text);
      }

      var _getMaskedCharacters = this.getMaskedCharacters(text),
          start = _getMaskedCharacters.start,
          middle = _getMaskedCharacters.middle,
          end = _getMaskedCharacters.end;

      return '' + (0, _helpers.escapeHTML)(start) + this.genHighlight(middle) + (0, _helpers.escapeHTML)(end);
    },
    genHighlight: function genHighlight(text) {
      if (this.isNotFiltering) {
        return (0, _helpers.escapeHTML)(text);
      }

      return '<span class="list__tile__mask">' + (0, _helpers.escapeHTML)(text) + '</span>';
    },
    getMaskedCharacters: function getMaskedCharacters(text) {
      var searchValue = (this.searchValue || '').toString().toLowerCase();
      var index = text.toLowerCase().indexOf(searchValue);

      if (index < 0) {
        return { start: '', middle: text, end: '' };
      }

      var start = text.slice(0, index);
      var middle = text.slice(index, index + searchValue.length);
      var end = text.slice(index + searchValue.length);
      return { start: start, middle: middle, end: end };
    },
    getCurrentTag: function getCurrentTag() {
      return this.isMenuItemSelected() ? this.filteredItems[this.getMenuIndex()] : this.isAnyValueAllowed ? this.searchValue : null;
    },
    tabOut: function tabOut() {
      this.blur();
    },
    onTabDown: function onTabDown(e) {
      // If tabbing through inputs and
      // and there is no need for an
      // update, blur the r-select
      if (!this.isAutocomplete || !this.getCurrentTag() || this.combobox) {
        return this.tabOut();
      }

      // When adding tags, if searching and
      // there is not a filtered options,
      // add the value to the tags list
      if (this.tags && this.searchValue && !this.filteredItems.length) {
        e.preventDefault();

        return this.updateTags(this.searchValue);
      }

      // An item that is selected by
      // menu-index should toggled
      if (this.menuIsActive) {
        e.preventDefault();
        this.selectListTile(this.getMenuIndex());
      }
    },
    onEnterDown: function onEnterDown(e) {
      this.$emit('enter', e);
      if (this.creatableChips) {
        this.createItem();
      } else {
        this.updateTags(this.getCurrentTag());
      }
    },
    onEscDown: function onEscDown(e) {
      e.preventDefault();
      // Prevents closing of a
      // dialog when pressing esc
      e.stopPropagation();
      this.menuIsActive = this.persistentMenu;
    },
    onKeyDown: function onKeyDown(e) {
      var _this2 = this;

      // If enter, space, up, or down is pressed, open menu
      if (!this.menuIsActive && [13, 32, 38, 40].includes(e.keyCode)) {
        e.preventDefault();
        return this.showMenu();
      }

      // If escape deactivate the menu
      if (e.keyCode === 27) {
        return this.onEscDown(e);
      }

      // If tab - select item or close menu
      if (e.keyCode === 9) {
        return this.onTabDown(e);
      }

      if (!this.isAutocomplete || ![32].includes(e.keyCode) // space
      ) this.refMenu.changeListIndex(e);

      // Up or down
      if ([38, 40].includes(e.keyCode)) {
        this.selectedIndex = -1;
      }

      if (this.isAutocomplete && !this.hideSelections && !this.searchValue) {
        this.changeSelectedIndex(e.keyCode);
      }

      if (!this.isAnyValueAllowed || !this.searchValue) {
        return;
      }

      // Enter
      if (e.keyCode === 13) {
        return this.onEnterDown(e);
      }

      // Left arrow
      if (e.keyCode === 37 && this.$refs.input.selectionStart === 0 && this.selectedItems.length) {
        this.updateTags(this.searchValue);
        this.$nextTick(function () {
          _this2.selectedIndex = Math.max(_this2.selectedItems.length - 2, 0);
        });
      }

      // Right arrow
      if (e.keyCode === 39 && this.$refs.input.selectionEnd === this.searchValue.length) {
        this.resetMenuIndex();
      }
    },
    selectListTile: function selectListTile(index) {
      if (!this.refMenu.tiles[index]) return;

      this.refMenu.tiles[index].click();
    },
    updateTags: function updateTags(content) {
      var _this3 = this;

      // Avoid direct mutation
      // for vuex strict mode
      var selectedItems = this.selectedItems.slice();

      // If a duplicate item
      // exists, remove it
      if (selectedItems.includes(content)) {
        this.$delete(selectedItems, selectedItems.indexOf(content));
      }

      // When updating tags ensure
      // that that the search text
      // is populated if needed
      var searchValue = null;

      if (this.combobox) {
        selectedItems = [content];
        searchValue = this.chips ? null : content;
      } else {
        selectedItems.push(content);
      }

      this.selectedItems = selectedItems;

      this.$nextTick(function () {
        _this3.searchValue = searchValue;
        _this3.$emit('input', _this3.combobox ? content : _this3.selectedItems);

        // Combobox should close its menu when tags are updated
        _this3.menuIsActive = !_this3.combobox || _this3.persistentMenu;
      });
    },
    createItem: function createItem() {
      var _this4 = this;

      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.searchValue;

      if (this.isNeedCreateItem(item)) {
        var _item;

        item = (_item = {}, _defineProperty(_item, this.itemText, item), _defineProperty(_item, this.itemValue, (0, _helpers.generateNumber)(-1e15, -1e20)), _defineProperty(_item, 'created', true), _item);

        this.items.push(item);
        this.selectItem(item);
      }

      this.$nextTick(function () {
        _this4.searchValue = null;
        _this4.menuIsActive = !_this4.hideMenuAfterSelect;
      });
    }
  }
};