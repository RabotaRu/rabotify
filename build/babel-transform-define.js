const rabotifyPackage = require('../package.json');

module.exports = {
  'process.env.RABOTIFY_VERSION': rabotifyPackage.version,
  'process.env.REQUIRED_VUE': rabotifyPackage.peerDependencies.vue
};
