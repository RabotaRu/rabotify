const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = ExtractTextPlugin.extract({
  use: [ 'css-loader', 'postcss-loader', 'sass-loader' ]
});

const extractPluginLess = ExtractTextPlugin.extract({
  use: [ 'css-loader', 'postcss-loader', 'less-loader' ]
});

// Helpers
const resolve = file => require('path').resolve(__dirname, file);

module.exports = merge(baseWebpackConfig, {
  devtool: '#source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'Rabotify'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                sass: extractPlugin,
                less: extractPluginLess
              }
            }
          },
          'eslint-loader'
        ],
        exclude: /node_modules\/(?!md-svg-vue)\/.*/
      },
      {
        test: /\.js$/,
        loaders: [ 'babel-loader', 'eslint-loader' ],
        exclude: /node_modules\/(?!md-svg-vue)\/.*/
      },
      {
        test: /\.scss$/,
        use: extractPlugin,
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: extractPluginLess,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  performance: {
    hints: false
  }
});
