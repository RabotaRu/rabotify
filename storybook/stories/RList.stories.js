import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import RList from '@rabota/rabotify/src/components/RList/RList.vue';
import RListTile from '@rabota/rabotify/src/components/RList/RListTile.vue';
import RListTileContent from '@rabota/rabotify/src/components/RList/RListTileContent.vue';
import RListTileSubTitle from '@rabota/rabotify/src/components/RList/RListTileSubTitle.vue';

const stories = storiesOf('Rabotify', module);

stories.add('RList', () => ({
  components: {
    RList,
    RListTile,
    RListTileContent,
    RListTileSubTitle
  },
  methods: {
    click: action('click')
  },
  template: `
<RList>
  <RListTile @click="click('Настройки')">
    <RListTileContent>
      <RListTileSubTitle>Настройки</RListTileSubTitle>
    </RListTileContent>
  </RListTile>
  <RListTile @click="click('Выход')">
    <RListTileContent>
      <RListTileSubTitle>Выход</RListTileSubTitle>
    </RListTileContent>
  </RListTile>
</RList>
`
}));
