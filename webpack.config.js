const path = require('path')
const webpack = require('webpack')

const resolve = dir => path.join(__dirname, '.', dir)

const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: [
    'babel-polyfill',
    resolve('src/index.js')
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: [ /node_modules/ ],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [ /node_modules/ ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': process.env.NODE_ENV
    }),
    new CleanWebpackPlugin(['dist'])
  ]
}
