import { storiesOf } from '@storybook/vue';
import { boolean, number, select } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info';

import RLoading from '../../src/components/RLoading/RLoading.vue';

const stories = storiesOf('Rabotify', module);

const optionsColor = {
  primary: 'primary',
  secondary: 'secondary',
  white: 'white',
  None: null
};

stories.addDecorator(withInfo).add('RLoading', () => ({
  components: {
    RLoading
  },
  props: {
    colorful: {
      default: boolean('colorful', true)
    },
    line: {
      default: boolean('line', false)
    },
    lineRound: {
      default: boolean('lineRound', false)
    },
    lineShadow: {
      default: boolean('lineShadow', false)
    },
    lineHeight: {
      default: number('lineHeight', 10)
    },
    progress: {
      default: number('progress', 50)
    },
    lineColor: {
      default: select('color', optionsColor, 'primary')
    }
  },
  template: `
<RLoading
  :colorful="colorful"
  :line="line"
  :lineRound="lineRound"
  :lineShadow="lineShadow"
  :lineHeight="lineHeight"
  :lineColor="lineColor"
  :progress="progress"
>
</RLoading>
`
}), { info: {} });
