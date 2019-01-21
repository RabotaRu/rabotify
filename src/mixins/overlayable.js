import { isBrowserSafari } from '../util/helpers';
import Colorable from './colorable';

export default {
  name: 'overlayable',

  data () {
    return {
      overlay: null,
      overlayOffset: 0,
      overlayTimeout: null,
      overlayTransitionDuration: 300 + 150 // transition + delay
    };
  },

  mixins: [
    Colorable
  ],

  props: {
    hideOverlay: Boolean,
    transparentOverlay: Boolean,
    safariBlurOverlay: {
      type: Boolean,
      default: true
    },
    hideGlobalScroll: Boolean
  },

  beforeDestroy () {
    this.removeOverlay();
  },

  watch: {
    fullscreen (val) {
      if (val) {
        this.overlay && this.removeOverlay();
      } else if (!this.hideOverlay && !this.overlay) {
        this.genOverlay();
      }
    }
  },

  methods: {
    genOverlay () {
      // If fn is called and timeout is active
      // or overlay already exists
      // cancel removal of overlay and re-add active
      if ((!this.isActive || this.hideOverlay) ||
        (this.isActive && this.overlayTimeout) ||
        this.overlay
      ) {
        clearTimeout(this.overlayTimeout);

        return this.overlay &&
          this.overlay.classList.add('overlay_active');
      }

      this.overlay = document.createElement('div');
      this.overlay.className = [
        'overlay', ...Object.keys(this.addBackgroundColorClassChecks())
      ].join(' ');

      if (this.absolute) {
        this.overlay.classList.add('overlay_absolute');
      }

      if (this.transparentOverlay) {
        this.overlay.classList.add('overlay_transparent');
      }

      if (this.safariBlurOverlay && isBrowserSafari()) {
        this.overlay.classList.add('overlay_safari-blur');
      }

      this.hideScroll();

      const parent = this.absolute
        ? this.$el.parentNode
        : document.querySelector('[data-app]');

      parent && parent.insertBefore(this.overlay, parent.firstChild);

      this.overlay.clientHeight; // Force repaint
      requestAnimationFrame(() => {
        if (!this.overlay) {
          return;
        }
        this.overlay.classList.add('overlay_active');

        if (this.activeZIndex !== undefined) {
          this.overlay.style.zIndex = this.activeZIndex - 1;
        }
      });

      return true;
    },
    removeOverlay () {
      const activeElements = this.getActiveStackedElements();

      if (!this.overlay) {
        return this.showScroll();
      }

      this.overlay.classList.remove('overlay_active');

      this.overlayTimeout = setTimeout(() => {
        // IE11 Fix
        try {
          this.overlay.parentNode.removeChild(this.overlay);
          this.overlay = null;
          if (activeElements.length <= 1) {
            this.showScroll();
          } else {
            this.removeScrollListeners();
          }
        } catch (e) {}

        clearTimeout(this.overlayTimeout);
        this.overlayTimeout = null;
      }, this.overlayTransitionDuration);
    },
    /**
     * @param {Event} e
     * @returns void
     */
    scrollListener (e) {
      if (e.type === 'keydown') {
        if ([ 'INPUT', 'TEXTAREA', 'SELECT' ].includes(e.target.tagName)) {
          return;
        }

        const up = [ 38, 33 ];
        const down = [ 40, 34 ];

        if (up.includes(e.keyCode)) {
          e.deltaY = -1;
        } else if (down.includes(e.keyCode)) {
          e.deltaY = 1;
        } else {
          return;
        }
      }

      if (e.target === this.overlay ||
        (e.type !== 'keydown' && e.target === document.body) ||
        this.checkPath(e)
      ) {
        e.preventDefault();
      }
    },
    hasScrollbar (el) {
      if (!el || el.nodeType !== Node.ELEMENT_NODE) {
        return false;
      }
      const style = window.getComputedStyle(el);
      return [ 'auto', 'scroll' ].includes(style['overflow-y']) && el.scrollHeight > el.clientHeight;
    },
    shouldScroll (el, delta) {
      if (el.scrollTop === 0 && delta < 0) {
        return true;
      }
      return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
    },
    isInside (el, parent) {
      if (el === parent) {
        return true;
      } else if (el === null || el === document.body) {
        return false;
      } else {
        return this.isInside(el.parentNode, parent);
      }
    },
    /**
     * @param {Event} e
     * @returns boolean
     */
    checkPath (e) {
      const path = e.path || this.composedPath(e);
      const delta = e.deltaY || -e.wheelDelta;

      if (e.type === 'keydown' && path[0] === document.body) {
        const dialog = this.$refs.dialog;
        const selected = window.getSelection().anchorNode;
        if (this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return this.shouldScroll(dialog, delta);
        }
        return true;
      }

      for (let index = 0; index < path.length; index++) {
        const el = path[index];

        if (el === document) {
          return true;
        }
        if (el === document.documentElement) {
          return true;
        }
        if (el === this.$refs.content) {
          return true;
        }

        if (this.hasScrollbar(el)) {
          return this.shouldScroll(el, delta);
        }
      }

      return true;
    },
    /**
     * Polyfill for Event.prototype.composedPath
     * @param {Event} e
     * @returns Element[]
     */
    composedPath (e) {
      if (e.composedPath) {
        return e.composedPath();
      }

      const path = [];
      let el = e.target;

      while (el) {
        path.push(el);

        if (el.tagName === 'HTML') {
          path.push(document);
          path.push(window);

          return path;
        }

        el = el.parentElement;
      }
    },
    hideScroll () {
      if (this.hideGlobalScroll) {
        document.documentElement.classList.add('overflow-y-hidden');
      }
      this.addScrollListeners(this.scrollListener.bind(this));
    },
    showScroll () {
      document.documentElement.classList.remove('overflow-y-hidden');
      this.removeScrollListeners();
    },
    addScrollListeners (scrollListener) {
      window.addEventListener('wheel', scrollListener);
      window.addEventListener('keydown', scrollListener);
      this._scrollListener = scrollListener;
    },
    removeScrollListeners () {
      window.removeEventListener('wheel', this._scrollListener);
      window.removeEventListener('keydown', this._scrollListener);
      this._scrollListener = null;
      delete this._scrollListener;
    }
  }
};
