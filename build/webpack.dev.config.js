require('dotenv').config();
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');

// Helpers
const resolve = file => require('path').resolve(__dirname, file);

const extractPlugin = ExtractTextPlugin.extract({
  use: [ 'css-loader', 'postcss-loader', 'sass-loader' ]
});

const extractPluginLess = ExtractTextPlugin.extract({
  use: [ 'css-loader', 'postcss-loader', 'less-loader' ]
});

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: [ 'babel-polyfill', './dev/index.js' ],
  output: {
    filename: '[name].js',
    path: resolve('../dev'),
    publicPath: '/dev/',
    library: 'Rabotify'
  },
  resolve: {
    extensions: [ '*', '.js', '.json', '.vue' ],
    alias: {
      rabotify: resolve('../src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loaders: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              sass: extractPlugin,
              less: extractPluginLess
            }
          }
        }, 'eslint-loader' ],
        exclude: /node_modules\/(?!md-svg-vue)\/.*/
      },
      {
        test: /\.js$/,
        loaders: [ 'babel-loader', 'eslint-loader' ],
        exclude: /node_modules\/(?!md-svg-vue)\/.*/
      },
      {
        test: /\.scss$/,
        loaders: extractPlugin,
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loaders: extractPluginLess,
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
  },
  devServer: {
    contentBase: resolve('../dev'),
    publicPath: '/dev/',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '3200',
    disableHostCheck: true
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new WriteFilePlugin({
      test: /\.css$/
    })
  ]
};
