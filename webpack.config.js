var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/server/static');
var APP_DIR = path.resolve(__dirname, 'src/client/app');
var BOWER = path.resolve(__dirname, 'bower_components');

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
    extensions: ['', '.js', '.jsx'],
    alias: {
      bower: path.join(__dirname, 'bower_components') 
   }
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
       test: /\.scss$/,
       exclude: /node_modules/,
       loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
         root: path.resolve('./node/static/sass')
     },
     {
       test: /\.(jpe?g|gif|png)$/,
       loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
      }
    ],
  },
  plugins: [
      new ExtractTextPlugin('styles.css')
  ]
};

module.exports = config;