<script>
  /* eslint-disable no-unused-vars */

  import { ensureNumber } from '../../util/helpers';

  import SsrBootable from '../../mixins/ssr-bootable';

  export default {
    name: 'r-smart-render',

    mixins: [
      SsrBootable
    ],

    props: {
      onlyBrowser: Boolean,
      elementWidth: {
        type: [ String, Number ],
        default: null
      },
      elementHeight: {
        type: [ String, Number ],
        default: null
      },
      contentClass: String,
      emptyClass: String,
      breakpoints: [ String, Array ],
      visibilityObserver: {
        type: [ Boolean, String, Number ],
        default: null
      },
      rootMargin: {
        type: [ String, Number, Array ],
        default: null
      },
      threshold: {
        type: [ Number, Array ],
        default () {
          return Array(101).fill(0).map((v, i) => v + i / 100); // each 1% of visibility change
        }
      },
      debug: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      isServer: typeof window === 'undefined',
      isBrowser: typeof window !== 'undefined',
      renderedBefore: false,
      $io: null,
      lazyVisibilityCondition: false
    }),

    methods: {
      showContentLazy (content) {
        const shouldRender = this.shouldRender;
        if (shouldRender && !this.renderedBefore) {
          this.hasRenderListener && this.$emit('render', this.$el);
          this.renderedBefore = true;
        }
        return shouldRender
          ? this.wrapContent(content)
          : this.emptyContent;
      },

      wrapContent (content) {
        const debugContent = this.debug ? this.debugInfo : null;
        return this.$createElement('div', [ content, debugContent ]);
      },

      initIntersectionObserver () {
        this.$io = new IntersectionObserver(rectangles => {
          rectangles.forEach(rect => {
            if (rect.isIntersecting) {
              this.hasVisibilityChangeListener && this.$emit('visibilityChange', rect.intersectionRatio);
              this.lazyVisibilityCondition = this.visibilityThreshold <= rect.intersectionRatio;

              if (this.lazyVisibilityCondition && !this.hasVisibilityChangeListener) {
                this.$io.unobserve(this.$el);
              }
            } else if (this.lazyVisibilityCondition) {
              this.lazyVisibilityCondition = false;

              if (this.hasVisibilityChangeListener) {
                this.$emit('visibilityChange', 0);
              }
            }
          });
        }, {
          rootMargin: this.rootMarginValues,
          threshold: this.threshold
        });
        // start observing
        this.$io.observe(this.$el);
      },

      evaluateExpression (expression, evaluationMapping = {}, operation = 'and') {
        if (typeof expression === 'string') {
          return evaluationMapping[expression];
        } else if (Array.isArray(expression)) {
          return expression.reduce((evaluatedExpression, expression) => {
            if (operation === 'and') {
              return evaluatedExpression && this.evaluateExpression(expression, evaluationMapping, 'or');
            } else if (operation === 'or') {
              return evaluatedExpression || this.evaluateExpression(expression, evaluationMapping, 'or');
            }
          }, operation === 'and');
        }
      },

      evaluateBreakpointsExpression (expression, operation = 'and') {
        return this.evaluateExpression(expression, this.$rabotify.breakpoint, operation);
      }
    },

    computed: {
      shouldRender () {
        if (this.isServer || !this.isBooted) {
          return !this.onlyBrowser; // should always render on server if onlyBrowser is false
        }
        // client
        const shouldUseBreakpoints = this.breakpoints && this.breakpoints.length;
        if (this.renderedBefore && !shouldUseBreakpoints) {
          return true;
        }

        const evaluatedBreakpointsExpression = shouldUseBreakpoints
          ? this.evaluatedBreakpointsExpression
          : true;

        // when visibility observer prop is not defined - lazyVisibilityCondition is always true
        return this.lazyVisibilityCondition && evaluatedBreakpointsExpression;
      },

      emptyContent () {
        const data = {};
        if (this.emptyClass) {
          data.class = {
            [this.emptyClass]: true
          };
        }
        if (this.elementWidth || this.elementHeight) {
          data.style = {
            ...this.elementSize
          };
        }
        const children = [];
        if (this.debug) {
          children.push(
            this.debugInfo
          );
        }
        return this.$createElement('div', data, children);
      },

      rootMarginValues () {
        const toProperArray = array => {
          return array.map(val => {
            if (typeof val === 'string') {
              const units = [ 'px', '%', 'em', 'rem' ];
              if (units.some(unit => val.includes(unit))) {
                return val;
              }
            }
            return `${ensureNumber(val)}px`;
          });
        };

        if (Array.isArray(this.rootMargin)) {
          return toProperArray(this.rootMargin).join(' ');
        } else if (typeof this.rootMargin === 'string') {
          const array = this.rootMargin.split(' ');
          if (array.length > 1) {
            return toProperArray(array).join(' ');
          } else if (array.length === 1) {
            const val = toProperArray(array)[0];
            return `${val} ${val}`;
          }
        } else if (typeof this.rootMargin === 'number') {
          return `${this.rootMargin}px ${this.rootMargin}px`;
        }
        return '0px 0px';
      },

      visibilityThreshold () {
        let value = 0;
        if (typeof this.visibilityObserver === 'number') {
          value = this.visibilityObserver;
        } else {
          const numberValue = Number(this.visibilityObserver);
          value = !Number.isNaN(numberValue) ? numberValue : 0; // rest cases will return only 0
        }
        if (value > 1) {
          // if the value > 1 then it's percents (i know ;()
          value = value / 100;
        }
        return Math.min(1, Math.max(0, value));
      },

      elementSize () {
        return {
          width: this.elementWidth || '0px',
          height: this.elementHeight || '0px'
        };
      },

      evaluatedBreakpointsExpression () {
        return this.evaluateBreakpointsExpression(this.breakpoints);
      },

      hasRenderListener () {
        return Object.keys(this.$listeners).includes('render');
      },

      hasVisibilityChangeListener () {
        return Object.keys(this.$listeners).includes('visibilityChange');
      },

      debugInfo () {
        let text = `<h4>Debug info</h4>`;
        const mode = this.onlyBrowser ? 'client' : 'server and client';
        const breakpoints = typeof this.breakpoint === 'string'
          ? this.breakpoints
          : JSON.stringify(this.breakpoints);
        const visibilityObserver = this.visibilityObserver;
        const rootMargin = this.rootMarginValues;
        const renderRestore = this.renderRestore || false;
        const threshold = Array.isArray(this.threshold) && this.threshold.length > 5
          ? this.threshold.slice(0, 2).concat('...').concat(this.threshold.slice(-2))
          : this.threshold;

        text += `Mode: <b>${mode}</b>`;
        text += `\nShould render: <b>${this.shouldRender}</b>`;
        text += `\nKeep size: [<b>${this.elementWidth || '0px'}, ${this.elementHeight || '0px'}</b>]`;
        text += `\nEmpty class: <b>${this.emptyClass || 'none'}</b>`;
        text += `\nBreakpoints: <b>${breakpoints || 'none'}</b>`;

        if (visibilityObserver !== null) {
          text += `\nVisibility Observer: <b>${visibilityObserver !== null ? (visibilityObserver || true) : 'none'}</b>`;
          text += `\nRoot Margin for Visibility Observer: <b>${rootMargin || '0px 0px'}</b>`;
          text += `\nVisibility Restore: <b>${renderRestore}</b>`;
          text += `\nThresholds: <b>${threshold}</b>`;
        }

        const data = {
          staticClass: 'debug-content',
          domProps: {
            innerHTML: text
          }
        };
        return this.$createElement('pre', data);
      }
    },

    mounted () {
      // mounted function runs only in browser

      // running in another tick to prevent hydration error (nuxt)
      this.$nextTick(() => {
        // in case there is no IntersectionObserver API in user's browser
        // we need to omit visibility observer logic
        if (this.visibilityObserver !== null && typeof window.IntersectionObserver !== 'undefined') {
          this.initIntersectionObserver();
        } else {
          this.lazyVisibilityCondition = true;
        }
      });
    },

    render (h) {
      return this.showContentLazy(this.$slots.default);
    }
  };
</script>

<style lang="scss" scoped>
  .debug-content {
    border: 1px solid;
    padding: 8px;
    margin: 8px 0 0;
    line-height: 1.5;
    font-size: .85em;
    background-color: #FFEB3B;
  }
</style>
