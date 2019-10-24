import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import RCard from '@rabota/rabotify/src/components/RCard/RCard.vue';

const stories = storiesOf('Rabotify', module);

stories.add('RCard', () => ({
  components: {
    RCard
  },
  props: {
    flat: {
      default: boolean('flat', false)
    }
  },
  template: `
<RCard
:flat="flat"
>
  <div>It is RCard default slot</div>
</RCard>
`
}));
