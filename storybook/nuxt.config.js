
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/rabotify'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      '@rabota/md-svg-vue',
      '@rabota/rabotify',
      '@rabota/loader'
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules = config.module.rules.map((rule) => {
        // sass-loader is only inside "oneOf" attribute
        if (!rule.oneOf) {
          return rule;
        }
        const newRule = rule;
        newRule.oneOf.map((r) => {
          if (!r.use.some(l => l.loader === 'sass-loader')) {
            return r;
          }
          const newLoaders = r;
          newLoaders.use = newLoaders.use.reduce((loaderAcc, loader) => {
            if (loader.loader !== 'sass-loader') {
              return [...loaderAcc, ...[loader]];
            }
            return [...loaderAcc, ...[{
              loader: 'fast-sass-loader',
              options: loader.options
            }]];
          }, []);
          return newLoaders;
        });
        return newRule;
      });
    }
  }
};
