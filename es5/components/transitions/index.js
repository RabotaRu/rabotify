'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RExpandTransition = exports.RScaleTransitionGroup = exports.RSlideYReverseTransitionGroup = exports.RSlideYTransitionGroup = exports.RSlideXReverseTransitionGroup = exports.RSlideXTransitionGroup = exports.RFadeTransitionGroup = exports.RSlideYReverseTransition = exports.RSlideYTransition = exports.RSlideXReverseTransition = exports.RSlideXTransition = exports.RScaleTransition = exports.RFadeTransition = exports.RToastTransition = exports.RFabTransition = exports.RMenuTransition = exports.RTabReverseTransition = exports.RTabTransition = exports.RCarouselReverseTransition = exports.RCarouselTransition = exports.RBottomSheetTranstion = exports.RDialogRightTransition = exports.RDialogLeftTransition = exports.RDialogBottomTransition = exports.RDialogTopTransition = exports.RDialogTransition = undefined;

var _helpers = require('../../util/helpers');

var _expandTransition = require('./expand-transition');

var _expandTransition2 = _interopRequireDefault(_expandTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Component specific transitions
var RDialogTransition = exports.RDialogTransition = (0, _helpers.createSimpleTransition)('dialog-transition');
var RDialogTopTransition = exports.RDialogTopTransition = (0, _helpers.createSimpleTransition)('dialog-top-transition');
var RDialogBottomTransition = exports.RDialogBottomTransition = (0, _helpers.createSimpleTransition)('dialog-bottom-transition');
var RDialogLeftTransition = exports.RDialogLeftTransition = (0, _helpers.createSimpleTransition)('dialog-left-transition');
var RDialogRightTransition = exports.RDialogRightTransition = (0, _helpers.createSimpleTransition)('dialog-right-transition');

var RBottomSheetTranstion = exports.RBottomSheetTranstion = (0, _helpers.createSimpleTransition)('bottom-sheet-transition');
var RCarouselTransition = exports.RCarouselTransition = (0, _helpers.createSimpleTransition)('carousel-transition');
var RCarouselReverseTransition = exports.RCarouselReverseTransition = (0, _helpers.createSimpleTransition)('carousel-reverse-transition');
var RTabTransition = exports.RTabTransition = (0, _helpers.createSimpleTransition)('tab-transition');
var RTabReverseTransition = exports.RTabReverseTransition = (0, _helpers.createSimpleTransition)('tab-reverse-transition');
var RMenuTransition = exports.RMenuTransition = (0, _helpers.createSimpleTransition)('menu-transition');
var RFabTransition = exports.RFabTransition = (0, _helpers.createSimpleTransition)('fab-transition', 'center center', 'out-in');
var RToastTransition = exports.RToastTransition = (0, _helpers.createSimpleTransition)('toast-transition', 'center center', 'out-in');

// Generic transitions
var RFadeTransition = exports.RFadeTransition = (0, _helpers.createSimpleTransition)('fade-transition');
var RScaleTransition = exports.RScaleTransition = (0, _helpers.createSimpleTransition)('scale-transition');
var RSlideXTransition = exports.RSlideXTransition = (0, _helpers.createSimpleTransition)('slide-x-transition');
var RSlideXReverseTransition = exports.RSlideXReverseTransition = (0, _helpers.createSimpleTransition)('slide-x-reverse-transition');
var RSlideYTransition = exports.RSlideYTransition = (0, _helpers.createSimpleTransition)('slide-y-transition');
var RSlideYReverseTransition = exports.RSlideYReverseTransition = (0, _helpers.createSimpleTransition)('slide-y-reverse-transition');

// Generic transitions' groups
var RFadeTransitionGroup = exports.RFadeTransitionGroup = (0, _helpers.createSimpleTransitionGroup)('fade-transition');
var RSlideXTransitionGroup = exports.RSlideXTransitionGroup = (0, _helpers.createSimpleTransitionGroup)('slide-x-transition');
var RSlideXReverseTransitionGroup = exports.RSlideXReverseTransitionGroup = (0, _helpers.createSimpleTransitionGroup)('slide-x-reverse-transition');
var RSlideYTransitionGroup = exports.RSlideYTransitionGroup = (0, _helpers.createSimpleTransitionGroup)('slide-y-transition');
var RSlideYReverseTransitionGroup = exports.RSlideYReverseTransitionGroup = (0, _helpers.createSimpleTransitionGroup)('slide-y-reverse-transition');
var RScaleTransitionGroup = exports.RScaleTransitionGroup = (0, _helpers.createSimpleTransitionGroup)('scale-transition');

// JavaScript transitions
var RExpandTransition = exports.RExpandTransition = (0, _helpers.createJavaScriptTransition)('expand-transition', (0, _expandTransition2.default)());

/* istanbul ignore next */
// eslint-disable-next-line max-statements
function install(Vue) {
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

exports.default = install;