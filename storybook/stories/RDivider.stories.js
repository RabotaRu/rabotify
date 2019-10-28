import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info';

import RDivider from '../../src/components/RDivider/RDivider.vue';

const stories = storiesOf('Rabotify', module);

stories.addDecorator(withInfo).add('RDivider', () => ({
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
}), { info: {} });
