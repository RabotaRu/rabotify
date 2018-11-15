import * as directives from './directives';

const components = process.env.RABOTIFY_BASE
  ? require('./components/index.core')
  : require('./components');

function Rabotify (Vue, args) {
  const Rabotify = components.Rabotify;

  Vue.use(Rabotify, {
    components,
    directives,
    ...args
  });
}

Rabotify.version = process.env.RABOTIFY_VERSION;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Rabotify);
}

export default Rabotify;
