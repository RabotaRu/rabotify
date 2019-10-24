import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';

import RMenu from '@rabota/rabotify/src/components/RMenu/RMenu.vue';
import RList from '@rabota/rabotify/src/components/RList/RList.vue';
import RListTile from '@rabota/rabotify/src/components/RList/RListTile.vue';
import RListTileContent from '@rabota/rabotify/src/components/RList/RListTileContent.vue';
import RListTileSubTitle from '@rabota/rabotify/src/components/RList/RListTileSubTitle.vue';
import RCard from '@rabota/rabotify/src/components/RCard/RCard.vue';

const stories = storiesOf('Rabotify', module);

const originType = {
  'top left': 'top left',
  'top right': 'top right',
  None: null
};

stories.add('RMenu', () => ({
  components: {
    RMenu,
    RList,
    RListTile,
    RListTileContent,
    RListTileSubTitle,
    RCard
  },
  props: {
    activatorText: {
      default: text('activatorText', 'Click Me! It is activator text')
    },
    offsetX: {
      default: boolean('offsetX', false)
    },
    offsetY: {
      default: boolean('offsetY', false)
    },
    closeOnContentClick: {
      default: boolean('closeOnContentClick', false)
    },
    right: {
      default: boolean('right', false)
    },
    origin: {
      default: select('origin', originType, 'None')
    }
  },
  methods: {
    click: action('click')
  },
  template: `
<div
style="display: flex; justify-content: space-around;"
>
<RMenu
:offsetX="offsetX"
:offsetY="offsetY"
:close-on-content-click="closeOnContentClick"
:right="right"
:origin="origin"
>
  <div
  slot="activator">
   {{ activatorText }}
  </div>
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
</RMenu>
<RMenu
:offsetX="offsetX"
:offsetY="offsetY"
:close-on-content-click="closeOnContentClick"
:right="right"
:origin="origin"
>
  <div
  slot="activator">
   Menu with RCard
  </div>
  <RCard>
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
  </RCard>
</RMenu>
</div>
`
}));
