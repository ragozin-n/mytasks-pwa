var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: {
    bundle: APP_DIR + '/app.jsx',
    styles: APP_DIR + '/main.scss'
  },
  output: {
    filename: '[name].js',
    path: BUILD_DIR,
    library: '[name]'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: '#cheap-module-source-map',
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        exclude: [/bower_components/, /node_modules/],
        loader : 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader'
      }
    ],
  },
  plugins: [
      new ExtractTextPlugin('styles.css', {
          allChunks: true
      })
  ]
};

module.exports = config;