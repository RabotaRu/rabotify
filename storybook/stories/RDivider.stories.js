import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import RDivider from '@rabota/rabotify/src/components/RDivider/RDivider.vue';

const stories = storiesOf('Rabotify', module);

stories.add('RDivider', () => ({
  components: {
    RDivider
  },
  props: {
    reset: {
      default: boolean('reset', false)
    },
    large: {
      default: boolean('large', false)
    },
    small: {
      default: boolean('small', false)
    },
    xmedium: {
      default: boolean('xmedium', false)
    }
  },
  template: `
<RDivider
:reset="reset"
:large="large"
:small="small"
:xmedium="xmedium"
/>
`
}));
