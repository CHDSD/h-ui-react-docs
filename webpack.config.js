var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/index'
  ],
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },

      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },

      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=512&&name=image/[name].[ext]?[hash]'
      }
    ]
  }
};
