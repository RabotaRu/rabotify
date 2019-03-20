'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultMenuOptions = exports.defaultMenuOptions = {
  closeOnClick: true,
  closeOnContentClick: true,
  fitToContent: true,
  maxHeight: '300px',
  openOnClick: false,
  lazy: true,
  transition: null,
  offsetY: false,
  offsetOverflow: false,
  allowOverflow: true
};

var Props = exports.Props = {
  props: {
    value: [Object, String, Number],
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabled: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    contentClass: String,
    lazy: Boolean,
    itemText: {
      type: String,
      default: 'name'
    },
    itemValue: {
      type: String,
      default: 'id'
    },
    placeholder: String,
    label: String,

    fitToContent: {
      type: Boolean,
      default: true
    },
    menuOptions: {
      type: Object,
      default: function _default() {
        return defaultMenuOptions;
      }
    },
    fetch: Function,
    cacheItems: {
      type: Boolean,
      default: true
    },
    prefetch: Boolean,
    strictValue: Boolean,
    selectFirstOnEnter: Boolean,
    removeQueryOnFocus: Boolean,
    color: String
  }
};