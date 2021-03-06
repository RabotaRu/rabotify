"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applicationable;
function applicationable(value) {
  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return {
    props: {
      absolute: Boolean,
      app: Boolean,
      fixed: Boolean
    },

    computed: {
      applicationProperty: function applicationProperty() {
        return value;
      }
    },

    watch: {
      // If previous value was app
      // reset the provided prop
      app: function app(x, prev) {
        prev ? this.removeApplication() : this.callUpdate();
      }
    },

    created: function created() {
      for (var i = 0, length = events.length; i < length; i++) {
        this.$watch(events[i], this.callUpdate);
      }
    },
    mounted: function mounted() {
      this.callUpdate();
    },
    destroyed: function destroyed() {
      this.app && this.removeApplication();
    },


    methods: {
      callUpdate: function callUpdate() {
        if (!this.app) {
          return;
        }

        this.$rabotify.application[this.applicationProperty] = this.updateApplication();
      },
      removeApplication: function removeApplication() {
        this.$rabotify.application[this.applicationProperty] = 0;
      },

      updateApplication: function updateApplication() {}
    }
  };
}