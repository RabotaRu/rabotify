import {
  createSimpleTransition,
  createSimpleTransitionGroup,
  createJavaScriptTransition
} from '../../util/helpers';

import ExpandTransitionGenerator from './expand-transition';

// Component specific transitions
export const RDialogTransition = createSimpleTransition('dialog-transition');
export const RDialogTopTransition = createSimpleTransition('dialog-top-transition');
export const RDialogBottomTransition = createSimpleTransition('dialog-bottom-transition');
export const RDialogLeftTransition = createSimpleTransition('dialog-left-transition');
export const RDialogRightTransition = createSimpleTransition('dialog-right-transition');

export const RBottomSheetTranstion = createSimpleTransition('bottom-sheet-transition');
export const RCarouselTransition = createSimpleTransition('carousel-transition');
export const RCarouselReverseTransition = createSimpleTransition('carousel-reverse-transition');
export const RTabTransition = createSimpleTransition('tab-transition');
export const RTabReverseTransition = createSimpleTransition('tab-reverse-transition');
export const RMenuTransition = createSimpleTransition('menu-transition');
export const RFabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in');
export const RToastTransition = createSimpleTransition('toast-transition', 'center center', 'out-in');

// Generic transitions
export const RFadeTransition = createSimpleTransition('fade-transition');
export const RScaleTransition = createSimpleTransition('scale-transition');
export const RSlideXTransition = createSimpleTransition('slide-x-transition');
export const RSlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition');
export const RSlideYTransition = createSimpleTransition('slide-y-transition');
export const RSlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition');

// Generic transitions' groups
export const RFadeTransitionGroup = createSimpleTransitionGroup('fade-transition');
export const RSlideXTransitionGroup = createSimpleTransitionGroup('slide-x-transition');
export const RSlideXReverseTransitionGroup = createSimpleTransitionGroup('slide-x-reverse-transition');
export const RSlideYTransitionGroup = createSimpleTransitionGroup('slide-y-transition');
export const RSlideYReverseTransitionGroup = createSimpleTransitionGroup('slide-y-reverse-transition');
export const RScaleTransitionGroup = createSimpleTransitionGroup('scale-transition');

// JavaScript transitions
export const RExpandTransition = createJavaScriptTransition('expand-transition', ExpandTransitionGenerator());

/* istanbul ignore next */
// eslint-disable-next-line max-statements
function install (Vue) {
  // Component transitions
  Vue.component('r-bottom-sheet-transition', RBottomSheetTranstion);
  Vue.component('r-carousel-transition', RCarouselTransition);
  Vue.component('r-carousel-reverse-transition', RCarouselReverseTransition);
  Vue.component('r-dialog-transition', RDialogTransition);
  Vue.component('r-dialog-top-transition', RDialogTopTransition);
  Vue.component('r-dialog-bottom-transition', RDialogBottomTransition);
  Vue.component('r-dialog-left-transition', RDialogLeftTransition);
  Vue.component('r-dialog-right-transition', RDialogRightTransition);
  Vue.component('r-tab-reverse-transition', RTabReverseTransition);
  Vue.component('r-tab-transition', RTabTransition);
  Vue.component('r-fab-transition', RFabTransition);
  Vue.component('r-menu-transition', RMenuTransition);

  // Generic transitions
  Vue.component('r-fade-transition', RFadeTransition);
  Vue.component('r-scale-transition', RScaleTransition);
  Vue.component('r-slide-x-transition', RSlideXTransition);
  Vue.component('r-slide-x-reverse-transition', RSlideXReverseTransition);
  Vue.component('r-slide-y-transition', RSlideYTransition);
  Vue.component('r-slide-y-reverse-transition', RSlideYReverseTransition);

  // Generic group transitions
  Vue.component('r-fade-transition-group', RFadeTransitionGroup);
  Vue.component('r-slide-x-transition-group', RSlideXTransitionGroup);
  Vue.component('r-slide-x-reverse-transition-group', RSlideXReverseTransitionGroup);
  Vue.component('r-slide-y-transition-group', RSlideYTransitionGroup);
  Vue.component('r-slide-y-reverse-transition-group', RSlideYReverseTransitionGroup);
  Vue.component('r-scale-transition-group', RScaleTransitionGroup);

  // JavaScript transitions
  Vue.component('r-expand-transition', RExpandTransition);
}

export default install;
