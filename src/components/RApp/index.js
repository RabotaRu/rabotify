import RApp from './RApp.vue';

/* istanbul ignore next */
RApp.install = function install (Vue) {
  Vue.component('r-app', RApp);
};

export default RApp;
