import { consoleWarn } from '../util/console';

import Bootable from './bootable';

function validateAttachTarget (val) {
  const type = typeof val;

  if (type === 'boolean' || type === 'string') {
    return true;
  }

  return val.nodeType === Node.ELEMENT_NODE;
}

export default {
  name: 'detachable',

  mixins: [
    Bootable
  ],

  props: {
    attach: {
      type: [ Boolean, String, Object ],
      default: false,
      validator: validateAttachTarget
    },
    contentClass: {
      type: String,
      default: ''
    }
  },

  mounted () {
    this.initDetach();
  },

  beforeDestroy () {
    if (!this.$refs.content) {
      return;
    }

    // IE11 Fix
    try {
      this.$refs.content.parentNode.removeChild(this.$refs.content);
    } catch (e) {}
  },

  methods: {
    initDetach () {
      if (this._isDestroyed ||
        !this.$refs.content ||
        // Leave menu in place if attached
        // and dev has not changed target
        this.attach === '' || // If used as a boolean prop (<r-menu attach>)
        this.attach === true || // If bound to a boolean (<r-menu :attach="true">)
        this.attach === 'attach' // If bound as boolean prop in pug (r-menu(attach))
      ) {
        return;
      }

      let target;
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
        return consoleWarn(`Unable to locate target ${this.attach || '[data-app]'}`);
      }

      target.insertBefore(
        this.$refs.content,
        target.firstChild
      );
    }
  }
};
