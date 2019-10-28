import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info';

import RCard from '../../src/components/RCard/RCard.vue';

const stories = storiesOf('Rabotify', module);

stories.addDecorator(withInfo).add('RCard', () => ({
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
}), { info: {} });
