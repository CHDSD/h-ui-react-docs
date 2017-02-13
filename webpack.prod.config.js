var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: {
    app: "./src/js/index.js",
    vendor: ['react', 'react-dom', 'react-router', 'react-router-redux', 'react-redux', 'redux']
  },

  output: {
    path: './docs/',
    filename: 'js/[name].js',
    publicPath: '/HONG-UI/',
    chunkFilename: "js/[id].bundle.js"
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
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?sourceMap=true", "sass-loader?sourceMap=true"]
        })
        // loader: ExtractTextPlugin.extract(
        //   'style-loader',
        //   [
        //     'css?sourceMap=true',
        //     'sass?sourceMap=true'
        //   ]
        // )
      },

      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=512&name=image/[name].[ext]?[hash]'
      }
    ]
  },

  plugins: [
    // react、react-router、redux等单独打包到vendor包里面
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"],
      minChunks: Infinity
    }),

    // 将代码中的process.env.NODE_ENV替换为production，方便webpack压缩代码
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),

    // 压缩js代码
    new webpack.optimize.UglifyJsPlugin(),

    // 提取css
    new ExtractTextPlugin('app.css'),

    // 更新index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/template.html',
      inject: 'body'
    })
  ],

  devtool: "source-map"
};

var env = process.env.NODE_ENV;
console.log("node env: \x1b[32m" + env + "\x1b[0m");

module.exports = config;