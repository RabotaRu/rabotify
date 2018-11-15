import RToast from './RToast.vue';

/* istanbul ignore next */
RToast.install = function install (Vue) {
  Vue.component('r-toast', RToast);
};

export default RToast;
