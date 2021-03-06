import { configure, addDecorator } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import '@storybook/addon-console';

import Vue from 'vue';
import Vuex from 'vuex';
import Rabotify from '../../src/components/Rabotify';
import Transitions from '../../src/components/transitions';
import * as directives from '../../src/directives';

import RApp from '../../src/components/RApp/RApp.vue';

Vue.use(Rabotify, {
  components: {}, // components omitted for webpack code-splitting
  directives
});

// use transitions from rabotify
Vue.use(Transitions);

Vue.use(Vuex); // for some component

addDecorator(withKnobs);

// place all components in RApp
addDecorator(() => ({
  components: { RApp },
  template: `
    <RApp>
      <story/>
    </RApp>
  `,
}))

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
