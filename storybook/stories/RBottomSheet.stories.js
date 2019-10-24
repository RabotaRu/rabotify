import { storiesOf } from '@storybook/vue';
import { text, boolean, color } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import RBottomSheet from '@rabota/rabotify/src/components/RBottomSheet/RBottomSheet.vue';

const stories = storiesOf('Rabotify', module);

stories.add('RBottomSheet', () => ({
  components: { RBottomSheet },
  props: {
    text: {
      default: text('Text', 'Hello Storybook')
    },
    value: {
      default: boolean('value', false)
    },
    backgroundColor: {
      default: color('backgroundColor', 'white')
    }
  },
  computed: {
    style () {
      return {
        'background-color': this.backgroundColor
      };
    }
  },
  methods: {
    input: action('input')
  },
  template: `<RBottomSheet :value="value" @input="input">
  <div :style="style">{{ text }}</div>
  </RBottomSheet>`
}));
