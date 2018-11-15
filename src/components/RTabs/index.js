import RTabs from './RTabs.vue';
import RTab from './RTab.vue';
import RTabsItems from './RTabsItems.vue';
import RTabItem from './RTabItem.vue';
import RTabsSlider from './RTabsSlider.vue';

export { RTabs, RTabItem, RTab, RTabsItems, RTabsSlider };

/* istanbul ignore next */
RTabs.install = function install (Vue) {
  Vue.component('r-tabs', RTabs);
  Vue.component('r-tabs-slider', RTabsSlider);
  Vue.component('r-tabs-items', RTabsItems);
  Vue.component('r-tab-item', RTabItem);
  Vue.component('r-tab', RTab);
};

export default RTabs;
