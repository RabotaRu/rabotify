import { storiesOf } from '@storybook/vue';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-vue-router';
import { withInfo } from 'storybook-addon-vue-info';

import RBtn from '../../src/components/RBtn/RBtn.vue';

const stories = storiesOf('Rabotify', module);

const optionsColor = {
  primary: 'primary',
  secondary: 'secondary',
  white: 'white',
  None: null
};

const optionsType = {
  button: 'button',
  file: 'file',
  None: null
};

stories.addDecorator(withInfo).addDecorator(StoryRouter()).add('RBtn', () => ({
  components: { RBtn },
  props: {
    ripple: {
      default: boolean('ripple', true)
    },
    block: {
      default: boolean('block', false)
    },
    loading: {
      default: boolean('loading', false)
    },
    disabled: {
      default: boolean('disabled', false)
    },
    link: {
      default: boolean('link', false)
    },
    flat: {
      default: boolean('flat', false)
    },
    round: {
      default: boolean('round', false)
    },
    outline: {
      default: boolean('outline', false)
    },
    icon: {
      default: boolean('icon', false)
    },
    large: {
      default: boolean('large', false)
    },
    small: {
      default: boolean('small', false)
    },
    fullWidth: {
      default: boolean('fullWidth', false)
    },
    shadowed: {
      default: boolean('shadowed', false)
    },
    href: {
      default: text('href')
    },
    to: {
      default: text('to')
    },
    text: {
      default: text('Text', 'Hello Storybook')
    },
    color: {
      default: select('color', optionsColor, 'primary')
    },
    type: {
      default: select('type', optionsType, 'None')
    }
  },
  methods: {
    click: action('click'),
    change: action('change')
  },
  template: `<RBtn
  :ripple="ripple"
  :color="color"
  :block="block"
  :loading="loading"
  :disabled="disabled"
  :link="link"
  :flat="flat"
  :round="round"
  :outline="outline"
  :icon="icon"
  :large="large"
  :small="small"
  :fullWidth="fullWidth"
  :shadowed="shadowed"
  :href="href"
  :to="to"
  :type="type"
  @click="click"
  @change="change"
  >{{ text }}</RBtn>`
}), { info: {} });
