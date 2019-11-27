import { storiesOf } from '@storybook/vue';
import { text, boolean, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-vue-router';
import { withInfo } from 'storybook-addon-vue-info';

import RTextField from '../../src/components/RTextField/RTextField.vue';

const stories = storiesOf('Rabotify', module);

const optionsColor = {
  primary: 'primary',
  secondary: 'secondary',
  white: 'white',
  None: ''
};

const optionsType = {
  text: 'text',
  number: 'number',
  password: 'password',
  time: 'time',
  data: 'date',
  dateTimeLocal: 'datetime-local',
  week: 'week',
  month: 'month',
  None: ''
};

stories.addDecorator(withInfo).addDecorator(StoryRouter()).add('RTextField', () => ({
  components: { RTextField },
  data: () => ({
    value: ''
  }),
  props: {
    disabled: {
      default: boolean('disabled', false)
    },
    fullWidth: {
      default: boolean('fullWidth', false)
    },
    error: {
      default: boolean('error', false)
    },
    required: {
      default: boolean('required', false)
    },
    addedRequiredRule: {
      default: boolean('Added required rules', false)
    },
    label: {
      default: text('label', 'Hello Label')
    },
    color: {
      default: select('color', optionsColor, '')
    },
    type: {
      default: select('type', optionsType, '')
    },
    maxlength: {
      default: number('maxlength', undefined)
    }
  },
  methods: {
    updateError: action('update:error'),
    input: action('input'),
    change: action('change'),
    blur: action('blur'),
    focus: action('focus'),
    keydown: action('keydown')
  },
  template: `<RTextField
  v-model="value"

  :color="color"
  :disabled="disabled"
  :fullWidth="fullWidth"
  :error="error"
  :type="type"
  :label="label"
  :required="required"

  :rules="[ addedRequiredRule ? (val => !!val || 'Required field') : () => true ]"

  @update:error="updateError"
  @input="input"
  @change="change"
  @blur="blur"
  @focus="focus"
  @keydown="keydown"

  :maxlength="maxlength"
  />`
}), { info: {} });
