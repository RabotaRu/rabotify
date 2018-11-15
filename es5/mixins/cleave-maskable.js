'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cleave = require('cleave.js');

var _cleave2 = _interopRequireDefault(_cleave);

require('cleave.js/dist/addons/cleave-phone.ru');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Cleave masks
 *
 * @mixin
 *
 * Creates an input mask that is
 * generated from a masked str
 *
 */

exports.default = {
  data: function data() {
    return {
      cleave: null
    };
  },

  props: {
    cleaveMask: Boolean,
    cleaveOptions: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },

  mounted: function mounted() {
    if (this.cleaveMask) {
      this.createCleave();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.destroyCleave();
  },


  methods: {
    createCleave: function createCleave() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.cleaveOptions;

      this.cleave = new _cleave2.default(this.$refs.input, opts);
    },
    destroyCleave: function destroyCleave() {
      this.cleave && this.cleave.destroy();
    }
  },

  watch: {
    options: {
      deep: true,
      handler: function handler(val) {
        this.destroyCleave();
        this.createCleave(val);
      }
    }
  }
};