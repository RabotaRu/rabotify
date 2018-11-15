'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _console = require('../util/console');

var _bootable = require('./bootable');

var _bootable2 = _interopRequireDefault(_bootable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateAttachTarget(val) {
  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);

  if (type === 'boolean' || type === 'string') {
    return true;
  }

  return val.nodeType === Node.ELEMENT_NODE;
}

exports.default = {
  name: 'detachable',

  mixins: [_bootable2.default],

  props: {
    attach: {
      type: [Boolean, String, Object],
      default: false,
      validator: validateAttachTarget
    },
    contentClass: {
      type: String,
      default: ''
    }
  },

  mounted: function mounted() {
    this.initDetach();
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.$refs.content) {
      return;
    }

    // IE11 Fix
    try {
      this.$refs.content.parentNode.removeChild(this.$refs.content);
    } catch (e) {}
  },


  methods: {
    initDetach: function initDetach() {
      if (this._isDestroyed || !this.$refs.content ||
      // Leave menu in place if attached
      // and dev has not changed target
      this.attach === '' || // If used as a boolean prop (<r-menu attach>)
      this.attach === true || // If bound to a boolean (<r-menu :attach="true">)
      this.attach === 'attach' // If bound as boolean prop in pug (r-menu(attach))
      ) {
          return;
        }

      var target = void 0;
      if (this.attach === false) {
        // Default, detach to app
        target = document.querySelector('[data-app]');
      } else if (typeof this.attach === 'string') {
        // CSS selector
        target = document.querySelector(this.attach);
      } else {
        // DOM Element
        target = this.attach;
      }

      if (!target) {
        return (0, _console.consoleWarn)('Unable to locate target ' + (this.attach || '[data-app]'));
      }

      target.insertBefore(this.$refs.content, target.firstChild);
    }
  }
};