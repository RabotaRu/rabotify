const base = require('./webpack.prod.config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const version = process.env.VERSION || require('../package.json').version;

const builds = {
  development: {
    config: {
      output: {
        filename: 'rabotify.core.js',
        libraryTarget: 'umd'
      },
      plugins: [
        new ExtractTextPlugin('rabotify.core.css')
      ]
    }
  },
  production: {
    config: {
      output: {
        filename: 'rabotify.core.min.js',
        libraryTarget: 'umd'
      },
      plugins: [
        new ExtractTextPlugin('rabotify.core.min.css')
      ]
    },
    env: '"production"'
  }
};

function genConfig (opts) {
  const config = merge({}, base, opts.config);

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': opts.env || '"development"',
      'process.env.RABOTIFY_BASE': 'true'
    })
  ]);

  if (opts.env) {
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          postcssZindex: false
        },
        canPrint: false
      }),
      new webpack.BannerPlugin({
        banner: `/* Rabotify Core Components (c) v${version} */`,
        raw: true,
        entryOnly: true
      }),
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ]);
  }

  return config;
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET]);
} else {
  module.exports = Object.keys(builds).map(name => genConfig(builds[name]));
}
