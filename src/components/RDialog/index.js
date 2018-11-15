import RDialog from './RDialog.vue';
import RDialogCard from './RDialogCard.vue';
import RDialogHeader from './RDialogHeader.vue';

export {
  RDialog,
  RDialogCard,
  RDialogHeader
};

/* istanbul ignore next */
RDialog.install = function install (Vue) {
  Vue.component('r-dialog', RDialog);
  Vue.component('r-dialog-card', RDialogCard);
  Vue.component('r-dialog-header', RDialogHeader);
};

export default RDialog;
