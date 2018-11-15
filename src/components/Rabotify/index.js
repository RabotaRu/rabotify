import application from './mixins/application';
import scrollTo from './util/scrollTo';

const Rabotify = {
  install (Vue, opts = {}) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    const $rabotify = {};
    Vue.util.defineReactive($rabotify, 'rx', {
      breakpoint: {},
      application,
      scrollTo
    });

    Vue.prototype.$rabotify = $rabotify.rx;

    if (opts.transitions) {
      Object.keys(opts.transitions).forEach(key => {
        const t = opts.transitions[key];
        if (t.name !== undefined) {
          Vue.component(t.name, t);
        }
      });
    }

    if (opts.directives) {
      Object.keys(opts.directives).forEach(key => {
        const d = opts.directives[key];
        Vue.directive(d.name, d);
      });
    }

    if (opts.components) {
      Object.keys(opts.components).forEach(key => {
        const c = opts.components[key];
        Vue.use(c);
      });
    }
  }
};

export default Rabotify;
