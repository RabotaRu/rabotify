import {
  createSimpleFunctional
} from '../../util/helpers';

import RContent from './RContent.vue';
import RContainer from './RContainer.vue';
import RFlex from './RFlex.vue';
import RLayout from './RLayout.vue';

const RSpacer = createSimpleFunctional('spacer');

export {
  RContainer,
  RContent,
  RFlex,
  RLayout,
  RSpacer
};

/* istanbul ignore next */
const RGrid = {
  install (Vue) {
    Vue.component('r-content', RContent);
    Vue.component('r-container', RContainer);
    Vue.component('r-flex', RFlex);
    Vue.component('r-layout', RLayout);
    Vue.component('r-spacer', RSpacer);
  }
};

export default RGrid;
