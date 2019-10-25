const path = require('path')

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  // https://storybook.js.org/docs/configurations/custom-webpack-config/#webpack-customisation-modes
  // use fast-sass-loader
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'fast-sass-loader']
  });

  // чёрная магия по транспайлингу node_modules/@rabota
  // может можно проще, но через .babelrc не получилось
  const babelLoaderIndex = config.module.rules.findIndex(rule => rule.use && rule.use[0].loader === 'babel-loader')
  config.module.rules[babelLoaderIndex] = {
    test: /\.m?js$/,
    exclude: /node_modules\/(?!(@rabota)\/).*/,
    use: [{
      loader: 'babel-loader',
      options: {
        "presets": [
          "@nuxt/babel-preset-app"
        ],
        "plugins": [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-transform-classes"
        ],
        babelrc: false
      }
    }]
  };

  // https://github.com/storybookjs/storybook/tree/master/addons/storysource
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  });

  // https://github.com/pocka/storybook-addon-vue-info
  config.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    enforce: 'post'
  })

  return config;
};
