'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorable = require('./colorable');

var _colorable2 = _interopRequireDefault(_colorable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
  name: 'overlayable',

  data: function data() {
    return {
      overlay: null,
      overlayOffset: 0,
      overlayTimeout: null,
      overlayTransitionDuration: 300 + 150 // transition + delay
    };
  },


  mixins: [_colorable2.default],

  props: {
    hideOverlay: Boolean,
    transparentOverlay: Boolean,
    safariBlurOverlay: {
      type: Boolean,
      default: true
    },
    hideGlobalScroll: Boolean
  },

  beforeDestroy: function beforeDestroy() {
    this.removeOverlay();
  },


  watch: {
    fullscreen: function fullscreen(val) {
      if (val) {
        this.overlay && this.removeOverlay();
      } else if (!this.hideOverlay && !this.overlay) {
        this.genOverlay();
      }
    }
  },

  methods: {
    genOverlay: function genOverlay() {
      var _this = this;

      // If fn is called and timeout is active
      // or overlay already exists
      // cancel removal of overlay and re-add active
      if (!this.isActive || this.hideOverlay || this.isActive && this.overlayTimeout || this.overlay) {
        clearTimeout(this.overlayTimeout);

        return this.overlay && this.overlay.classList.add('overlay_active');
      }

      this.overlay = document.createElement('div');
      this.overlay.className = ['overlay'].concat(_toConsumableArray(Object.keys(this.addBackgroundColorClassChecks()))).join(' ');

      if (this.absolute) {
        this.overlay.classList.add('overlay_absolute');
      }

      if (this.transparentOverlay) {
        this.overlay.classList.add('overlay_transparent');
      }

      if (this.safariBlurOverlay) {
        this.overlay.classList.add('overlay_safari-blur');
      }

      this.hideScroll();

      var parent = this.absolute ? this.$el.parentNode : document.querySelector('[data-app]');

      parent && parent.insertBefore(this.overlay, parent.firstChild);

      this.overlay.clientHeight; // Force repaint
      requestAnimationFrame(function () {
        if (!_this.overlay) {
          return;
        }
        _this.overlay.classList.add('overlay_active');

        if (_this.activeZIndex !== undefined) {
          _this.overlay.style.zIndex = _this.activeZIndex - 1;
        }
      });

      return true;
    },
    removeOverlay: function removeOverlay() {
      var _this2 = this;

      var activeElements = this.getActiveStackedElements();

      if (!this.overlay) {
        return this.showScroll();
      }

      this.overlay.classList.remove('overlay_active');

      this.overlayTimeout = setTimeout(function () {
        // IE11 Fix
        try {
          _this2.overlay.parentNode.removeChild(_this2.overlay);
          _this2.overlay = null;
          if (activeElements.length <= 1) {
            _this2.showScroll();
          } else {
            _this2.removeScrollListeners();
          }
        } catch (e) {}

        clearTimeout(_this2.overlayTimeout);
        _this2.overlayTimeout = null;
      }, this.overlayTransitionDuration);
    },

    /**
     * @param {Event} e
     * @returns void
     */
    scrollListener: function scrollListener(e) {
      if (e.type === 'keydown') {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
          return;
        }

        var up = [38, 33];
        var down = [40, 34];

        if (up.includes(e.keyCode)) {
          e.deltaY = -1;
        } else if (down.includes(e.keyCode)) {
          e.deltaY = 1;
        } else {
          return;
        }
      }

      if (e.target === this.overlay || e.type !== 'keydown' && e.target === document.body || this.checkPath(e)) {
        e.preventDefault();
      }
    },
    hasScrollbar: function hasScrollbar(el) {
      if (!el || el.nodeType !== Node.ELEMENT_NODE) {
        return false;
      }
      var style = window.getComputedStyle(el);
      return ['auto', 'scroll'].includes(style['overflow-y']) && el.scrollHeight > el.clientHeight;
    },
    shouldScroll: function shouldScroll(el, delta) {
      if (el.scrollTop === 0 && delta < 0) {
        return true;
      }
      return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
    },
    isInside: function isInside(el, parent) {
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
    checkPath: function checkPath(e) {
      var path = e.path || this.composedPath(e);
      var delta = e.deltaY || -e.wheelDelta;

      if (e.type === 'keydown' && path[0] === document.body) {
        var dialog = this.$refs.dialog;
        var selected = window.getSelection().anchorNode;
        if (this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return this.shouldScroll(dialog, delta);
        }
        return true;
      }

      for (var index = 0; index < path.length; index++) {
        var el = path[index];

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
    composedPath: function composedPath(e) {
      if (e.composedPath) {
        return e.composedPath();
      }

      var path = [];
      var el = e.target;

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
    hideScroll: function hideScroll() {
      if (this.hideGlobalScroll) {
        document.documentElement.classList.add('overflow-y-hidden');
      }
      this.addScrollListeners(this.scrollListener.bind(this));
    },
    showScroll: function showScroll() {
      document.documentElement.classList.remove('overflow-y-hidden');
      this.removeScrollListeners();
    },
    addScrollListeners: function addScrollListeners(scrollListener) {
      window.addEventListener('wheel', scrollListener);
      window.addEventListener('keydown', scrollListener);
      this._scrollListener = scrollListener;
    },
    removeScrollListeners: function removeScrollListeners() {
      window.removeEventListener('wheel', this._scrollListener);
      window.removeEventListener('keydown', this._scrollListener);
      this._scrollListener = null;
      delete this._scrollListener;
    }
  }
};