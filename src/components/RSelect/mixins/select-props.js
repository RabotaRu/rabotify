export default {
  props: {
    appendIcon: {
      type: String,
      default: 'md-keyboard-arrow-down'
    },
    renderingMenu: {
      type: Boolean,
      default: true
    },
    appendIconCb: Function,
    attach: Boolean,
    staticAttach: Boolean,
    auto: Boolean,
    autocomplete: Boolean,
    browserAutocomplete: {
      type: String,
      default: 'on'
    },
    cacheItems: Boolean,
    chips: Boolean,
    chipsColor: String,
    chipsOutline: Boolean,
    chipsRound: Boolean,
    chipsSmall: {
      type: Boolean,
      default: true
    },
    chipsOutside: {
      type: Boolean,
      default: false
    },
    clearable: Boolean,
    combobox: Boolean,
    contentClass: String,
    creatableChips: Boolean,
    deletableChips: Boolean,
    backspaceDeletable: {
      type: Boolean,
      default: true
    },
    arrowNavigation: {
      type: Boolean,
      default: true
    },
    dense: Boolean,
    editable: Boolean,
    fitToContent: Boolean,
    hideSelected: Boolean,
    hideMenuAfterSelect: Boolean,
    hideNoData: Boolean,
    lazy: Boolean,
    listRipple: Boolean,
    removeItemAfterSelect: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: () => []
    },
    itemAvatar: {
      type: String,
      default: 'avatar'
    },
    itemDisabled: {
      type: String,
      default: 'disabled'
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    maxHeight: {
      type: [ Number, String ],
      default: 300
    },
    menu: {
      type: Boolean,
      default: true
    },
    minWidth: {
      type: [ Boolean, Number, String ],
      default: false
    },
    multiple: Boolean,
    multiLine: Boolean,
    openOnClear: Boolean,
    overflow: Boolean,
    persistentMenu: Boolean,
    returnObject: Boolean,
    searchInput: {
      default: null
    },
    segmented: Boolean,
    singleLine: Boolean,
    tags: Boolean,
    valueComparator: {
      type: Function,
      default: (a, b) => {
        if (a !== Object(a)) {
          return a === b;
        }
        const aProps = Object.keys(a);
        const bProps = Object.keys(b);
        return aProps.length === bProps.length && aProps.every(propName => (a[propName] === b[propName]));
      }
    },
    virtual: {
      type: [ Object, Boolean ],
      default: false
    },
    withoutBorders: Boolean
  }
};
