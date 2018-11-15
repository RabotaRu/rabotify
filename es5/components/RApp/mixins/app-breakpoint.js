'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breakpointFactory = breakpointFactory;
/**
 * A Vue mixin to get the current width/height and the associated breakpoints.
 *
 * Useful to e.g. adapt the user interface from inside a Vue component
 * as opposed to using CSS classes. The breakpoint pixel values and
 * range names are taken from Material Design Spec
 *
 * Use within a component:
 *
 *   import breakpoint from './breakpoint.js'
 *
 *   export default {
 *     name: 'my-component',
 *     mixins: [breakpoint],
 *     ...
 *
 * Then inside a template:
 *
 *   <div v-if="$breakpoint.smAndDown">...</div>
 */

function breakpointFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$immediately = _ref.immediately,
      immediately = _ref$immediately === undefined ? true : _ref$immediately,
      _ref$debounceTimeoutM = _ref.debounceTimeoutMs,
      debounceTimeoutMs = _ref$debounceTimeoutM === undefined ? 200 : _ref$debounceTimeoutM;

  var breakpoint = {
    data: function data() {
      return {
        clientWidth: clientDimensions.getWidth(),
        clientHeight: clientDimensions.getHeight(),
        resizeTimeout: null
      };
    },


    computed: {
      breakpoint: function breakpoint() {
        var xs = this.clientWidth < 480;
        var sm = this.clientWidth < 720 && !xs;
        var md = this.clientWidth < 1024 && !(sm || xs);
        var lg = this.clientWidth < 1280 && !(md || sm || xs);
        var xl = this.clientWidth >= 1280 && !(lg || md || sm || xs);

        var xsOnly = xs;
        var xsAndDown = xs && !(sm || md || lg || xl);
        var xsAndUp = !xs && (sm || md || lg || xl);
        var smOnly = sm;
        var smAndDown = (xs || sm) && !(md || lg || xl);
        var smAndUp = !(xs || sm) && (md || lg || xl);
        var mdOnly = md;
        var mdAndDown = (xs || sm || md) && !(lg || xl);
        var mdAndUp = !(xs || sm || md) && (lg || xl);
        var lgOnly = lg;
        var lgAndDown = (xs || sm || md || lg) && !xl;
        var lgAndUp = !(xs || sm || md || lg) && xl;
        var xlOnly = xl;

        var name = void 0;
        switch (true) {
          case xs:
            name = 'xs';
            break;
          case sm:
            name = 'sm';
            break;
          case md:
            name = 'md';
            break;
          case lg:
            name = 'lg';
            break;
          default:
            name = 'xl';
            break;
        }

        var result = {
          // Definite breakpoint
          xs: xs,
          sm: sm,
          md: md,
          lg: lg,
          xl: xl,

          // Useful e.g. to construct CSS class names dynamically
          name: name,

          // Breakpoint ranges
          xsOnly: xsOnly,
          xsAndDown: xsAndDown,
          xsAndUp: xsAndUp,
          //
          smOnly: smOnly,
          smAndDown: smAndDown,
          smAndUp: smAndUp,
          //
          mdOnly: mdOnly,
          mdAndDown: mdAndDown,
          mdAndUp: mdAndUp,
          //
          lgOnly: lgOnly,
          lgAndDown: lgAndDown,
          lgAndUp: lgAndUp,
          //
          xlOnly: xlOnly,

          // For custom breakpoint logic
          width: this.clientWidth,
          height: this.clientHeight
        };

        return result;
      }
    },

    watch: {
      breakpoint: function breakpoint(val) {
        this.$rabotify.breakpoint = val;
      }
    },

    created: function created() {
      this.$rabotify.breakpoint = this.breakpoint;
    },


    methods: {
      onResize: function onResize() {
        var _this = this;

        if (immediately) {
          this.clientWidth = clientDimensions.getWidth();
          this.clientHeight = clientDimensions.getHeight();
        } else {
          clearTimeout(this.resizeTimeout);

          // Added debounce to match what
          // r-resize used to do but was
          // removed due to a memory leak
          this.resizeTimeout = setTimeout(function () {
            _this.clientWidth = clientDimensions.getWidth();
            _this.clientHeight = clientDimensions.getHeight();
          }, debounceTimeoutMs);
        }
      }
    }
  };
  return breakpoint;
}

// Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081
var clientDimensions = {
  getWidth: function getWidth() {
    if (typeof document === 'undefined') {
      return 0; // SSR
    }
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },
  getHeight: function getHeight() {
    if (typeof document === 'undefined') {
      return 0; // SSR
    }
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }
};

var breakpoint = breakpointFactory();

exports.default = breakpoint;