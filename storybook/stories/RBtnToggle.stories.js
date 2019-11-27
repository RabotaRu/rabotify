import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-vue-router';
import { withInfo } from 'storybook-addon-vue-info';

import RBtnToggle from '../../src/components/RBtnToggle/RBtnToggle.vue';
import RBtn from '../../src/components/RBtn/RBtn.vue';

const stories = storiesOf('Rabotify', module);

stories.addDecorator(withInfo).addDecorator(StoryRouter()).add('RBtnToggle', () => ({
  components: { RBtnToggle, RBtn },
  data: () => ({
    value: null,
    valueArray: []
  }),
  props: {
    mandatory: {
      default: boolean('mandatory', false)
    },
    multiple: {
      default: boolean('multiple', false)
    },
    autofit: {
      default: boolean('autofit', false)
    }
  },
  methods: {
    change: action('change')
  },
  template: `
    <div>
      <RBtnToggle
        v-model="value"
        :mandatory="mandatory"
        :multiple="false"
        :autofit="autofit"

        @change="change"
      >
        <RBtn active-class="primary">
          One
        </RBtn>
        <RBtn active-class="primary">
          Two
        </RBtn>
        <RBtn active-class="primary">
          Three
        </RBtn>
      </RBtnToggle>
      <div style="text-align: center;"><span>Model: {{ JSON.stringify(value) }}</span></div>
      <RBtnToggle
        v-model="valueArray"
        :mandatory="mandatory"
        :multiple="true"
        :autofit="autofit"

        @change="change"
      >
        <RBtn active-class="primary">
          One
        </RBtn>
        <RBtn active-class="primary">
          Two
        </RBtn>
        <RBtn active-class="primary">
          Three
        </RBtn>
      </RBtnToggle>
      <div style="text-align: center;"><span>Model: {{ JSON.stringify(valueArray) }}</span></div>
    </div>
`
}), { info: {} });
