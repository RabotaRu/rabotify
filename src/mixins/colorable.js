export default {
  props: {
    color: String
  },

  data () {
    return {
      defaultColor: null
    };
  },

  computed: {
    computedColor () {
      return this.color || this.defaultColor;
    }
  },

  methods: {
    addBackgroundColorClassChecks (obj = {}, prop = 'computedColor') {
      const classes = Object.assign({}, obj);

      if (prop && this[prop]) {
        classes[this[prop]] = true;
      }

      return classes;
    },
    addTextColorClassChecks (obj = {}, prop = 'computedColor') {
      const classes = Object.assign({}, obj);

      if (prop && this[prop]) {
        const parts = this[prop].trim().split(' ');

        let color = 'text_' + parts[0];

        if (parts.length > 1) {
          color += ' text_' + parts[1];
        }

        classes[color] = !!this[prop];
      }

      return classes;
    }
  }
};
