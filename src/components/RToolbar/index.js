import RToolbar from './RToolbar.vue';
import RToolbarItems from './RToolbarItems.vue';
import RToolbarTitle from './RToolbarTitle.vue';

export { RToolbar, RToolbarTitle, RToolbarItems };

/* istanbul ignore next */
RToolbar.install = function install (Vue) {
  Vue.component('r-toolbar', RToolbar);
  Vue.component('r-toolbar-items', RToolbarItems);
  Vue.component('r-toolbar-title', RToolbarTitle);
};

export default RToolbar;
