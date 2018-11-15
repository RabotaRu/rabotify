/**
 * Cleave masks
 *
 * @mixin
 *
 * Creates an input mask that is
 * generated from a masked str
 *
 */

import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.ru';

export default {
  data: () => ({
    cleave: null
  }),

  props: {
    cleaveMask: Boolean,
    cleaveOptions: {
      type: Object,
      default: () => ({})
    }
  },

  mounted () {
    if (this.cleaveMask) {
      this.createCleave();
    }
  },

  beforeDestroy () {
    this.destroyCleave();
  },

  methods: {
    createCleave (opts = this.cleaveOptions) {
      this.cleave = new Cleave(this.$refs.input, opts);
    },

    destroyCleave () {
      this.cleave && this.cleave.destroy();
    }
  },

  watch: {
    options: {
      deep: true,
      handler (val) {
        this.destroyCleave();
        this.createCleave(val);
      }
    }
  }
};
