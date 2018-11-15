import RList from './RList.vue';
import RListGroup from './RListGroup.vue';
import RListTile from './RListTile.vue';
import RListTileContent from './RListTileContent.vue';
import RListTileTitle from './RListTileTitle.vue';
import RListTileSubTitle from './RListTileSubTitle.vue';
import RListTileAction from './RListTileAction.vue';
import RListTileActionText from './RListTileActionText.vue';

export {
  RList, RListGroup,
  RListTile, RListTileContent,
  RListTileTitle, RListTileSubTitle,
  RListTileAction, RListTileActionText
};

/* istanbul ignore next */
RList.install = function install (Vue) {
  Vue.component('r-list', RList);
  Vue.component('r-list-group', RListGroup);
  Vue.component('r-list-tile', RListTile);
  Vue.component('r-list-tile-action', RListTileAction);
  Vue.component('r-list-tile-action-text', RListTileActionText);
  Vue.component('r-list-tile-content', RListTileContent);
  Vue.component('r-list-tile-sub-title', RListTileSubTitle);
  Vue.component('r-list-tile-title', RListTileTitle);
};

export default RList;
