'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorable = require('./colorable');

var _colorable2 = _interopRequireDefault(_colorable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_colorable2.default],

  data: function data() {
    return {
      defaultColor: 'accent',
      isSaving: false
    };
  },


  props: {
    actions: Boolean,
    autosave: Boolean,
    headerColor: String,
    landscape: Boolean,
    noTitle: Boolean,
    scrollable: Boolean,
    value: {
      required: true
    }
  },

  computed: {
    titleColor: function titleColor() {
      var darkTheme = this.dark || !this.light && this.$rabotify.dark;
      var defaultTitleColor = darkTheme ? null : 'primary';
      return this.headerColor || this.color || defaultTitleColor;
    }
  },

  methods: {
    save: function save() {},
    cancel: function cancel() {},
    genSlot: function genSlot() {
      return this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      });
    },
    genPickerTitle: function genPickerTitle(children) {
      return this.$createElement('div', {
        staticClass: 'picker__title',
        'class': this.addBackgroundColorClassChecks({}, 'titleColor')
      }, children);
    }
  }
};