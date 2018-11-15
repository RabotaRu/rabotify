import RCard from './RCard.vue';
import RCardMedia from './RCardMedia.vue';
import RCardTitle from './RCardTitle.vue';
import RCardActions from './RCardActions.vue';
import RCardText from './RCardText.vue';

export { RCard, RCardMedia, RCardTitle, RCardActions, RCardText };

/* istanbul ignore next */
RCard.install = function install (Vue) {
  Vue.component('r-card', RCard);
  Vue.component('r-card-media', RCardMedia);
  Vue.component('r-card-title', RCardTitle);
  Vue.component('r-card-actions', RCardActions);
  Vue.component('r-card-text', RCardText);
};

export default RCard;
