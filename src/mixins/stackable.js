import { getZIndex } from '../util/helpers';

export default {
  name: 'stackable',

  props: {
    zIndex: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      stackBase: null,
      stackClass: 'unpecified',
      stackElement: null,
      stackExclude: null,
      stackMinZIndex: 0
    };
  },

  computed: {
    /**
     * Currently active z-index
     *
     * @return {number}
     */
    activeZIndex () {
      const content = this.stackElement || this.$refs.content;
      // Return current z-index if not active

      const index = this.zIndex || (
        !this.isActive
        ? getZIndex(content)
        : this.getMaxZIndex(this.stackExclude || [ content ]) + 2
      );

      if (index == null) {
        return index;
      }

      // Return max current z-index (excluding self) + 2
      // (2 to leave room for an overlay below, if needed)
      return parseInt( index );
    }
  },
  methods: {
    getMaxZIndex (exclude = []) {
      const base = this.stackBase || this.$el;
      // Start with lowest allowed z-index or z-index of
      // base component's element, whichever is greater
      const zis = [ this.stackMinZIndex, getZIndex(base) ];
      const activeElements = this.getActiveStackedElements();

      // Get z-index for all active dialogs
      for (let index = 0; index < activeElements.length; index++) {
        if (!exclude.includes(activeElements[index])) {
          zis.push(getZIndex(activeElements[index]));
        }
      }

      return Math.max(...zis);
    },
    getActiveStackedElements () {
      // Convert the NodeList to an array to
      // prevent an Edge bug with Symbol.iterator
      return [ ...document.getElementsByClassName(this.stackClass) ];
    }
  }
};
