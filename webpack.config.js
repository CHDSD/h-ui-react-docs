const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./src/js/index.js"
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
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader',"sass-loader"]
      },

      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=512&&name=image/[name].[ext]?[hash]'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  devServer: {
    hot: true,
    // contentBase: path.resolve(__dirname, '.'),
    historyApiFallback: true,
    publicPath: '/'
  },

  devtool: 'inline-source-map'
};
