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

export function breakpointFactory ({ immediately = true, debounceTimeoutMs = 200 } = {}) {
  const breakpoint = {
    data () {
      return {
        clientWidth: clientDimensions.getWidth(),
        clientHeight: clientDimensions.getHeight(),
        resizeTimeout: null
      };
    },

    computed: {
      breakpoint () {
        const xs = this.clientWidth < 480;
        const sm = this.clientWidth < 720 && !xs;
        const md = this.clientWidth < 1024 && !(sm || xs);
        const lg = this.clientWidth < 1280 && !(md || sm || xs);
        const xl = this.clientWidth >= 1280 && !(lg || md || sm || xs);

        const xsOnly = xs;
        const xsAndDown = xs && !(sm || md || lg || xl);
        const xsAndUp = !xs && (sm || md || lg || xl);
        const smOnly = sm;
        const smAndDown = (xs || sm) && !(md || lg || xl);
        const smAndUp = !(xs || sm) && (md || lg || xl);
        const mdOnly = md;
        const mdAndDown = (xs || sm || md) && !(lg || xl);
        const mdAndUp = !(xs || sm || md) && (lg || xl);
        const lgOnly = lg;
        const lgAndDown = (xs || sm || md || lg) && !xl;
        const lgAndUp = !(xs || sm || md || lg) && xl;
        const xlOnly = xl;

        let name;
        switch (true) {
          case (xs):
            name = 'xs';
            break;
          case (sm):
            name = 'sm';
            break;
          case (md):
            name = 'md';
            break;
          case (lg):
            name = 'lg';
            break;
          default:
            name = 'xl';
            break;
        }

        const result = {
          // Definite breakpoint
          xs,
          sm,
          md,
          lg,
          xl,

          // Useful e.g. to construct CSS class names dynamically
          name,

          // Breakpoint ranges
          xsOnly,
          xsAndDown,
          xsAndUp,
          //
          smOnly,
          smAndDown,
          smAndUp,
          //
          mdOnly,
          mdAndDown,
          mdAndUp,
          //
          lgOnly,
          lgAndDown,
          lgAndUp,
          //
          xlOnly,

          // For custom breakpoint logic
          width: this.clientWidth,
          height: this.clientHeight
        };

        return result;
      }
    },

    watch: {
      breakpoint (val) {
        this.$rabotify.breakpoint = val;
      }
    },

    created () {
      this.$rabotify.breakpoint = this.breakpoint;
    },

    methods: {
      onResize () {
        if (immediately) {
          this.clientWidth = clientDimensions.getWidth();
          this.clientHeight = clientDimensions.getHeight();
        } else {
          clearTimeout(this.resizeTimeout);

          // Added debounce to match what
          // r-resize used to do but was
          // removed due to a memory leak
          this.resizeTimeout = setTimeout(() => {
            this.clientWidth = clientDimensions.getWidth();
            this.clientHeight = clientDimensions.getHeight();
          }, debounceTimeoutMs);
        }
      }
    }
  };
  return breakpoint;
}

// Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081
const clientDimensions = {
  getWidth () {
    if (typeof document === 'undefined') {
      return 0; // SSR
    }
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  },
  getHeight () {
    if (typeof document === 'undefined') {
      return 0; // SSR
    }
    return Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
  }
};

const breakpoint = breakpointFactory();

export default breakpoint;
