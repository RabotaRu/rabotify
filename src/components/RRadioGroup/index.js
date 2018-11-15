import RRadioGroup from './RRadioGroup.vue';
import RRadio from './RRadio.vue';

export { RRadioGroup, RRadio };

/* istanbul ignore next */
RRadioGroup.install = function install (Vue) {
  Vue.component('r-radio-group', RRadioGroup);
  Vue.component('r-radio', RRadio);
};

export default RRadioGroup;
