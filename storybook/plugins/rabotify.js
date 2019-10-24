import Vue from 'vue';
import Semver from 'semver';
import { peerDependencies, version } from '@rabota/rabotify/package.json';
import RabotifyModule from '@rabota/rabotify/src/components/Rabotify';
import Transitions from '@rabota/rabotify/src/components/transitions';
import * as directives from '@rabota/rabotify/src/directives';

function Rabotify (Vue, args) {
  const Rabotify = RabotifyModule;

  Vue.use(Rabotify, {
    components: {}, // components omitted for webpack code-splitting
    directives,
    ...args
  });

  Vue.config.ignoredElements = [ 'noindex' ];

  // use transitions from rabotify
  Vue.use(Transitions);
}

Rabotify.version = version;

function checkVueVersion () {
  const vueDep = peerDependencies.vue;
  if (!Semver.satisfies(window.Vue.version, vueDep)) {
    console.warn(`Rabotify requires Vue version ${vueDep}`);
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion();
  window.Vue.use(Rabotify);
} else {
  Vue.use(Rabotify);
}
