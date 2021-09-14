const path = require('path')
const Unplugin = require('..')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: './main.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  plugins: [
    Unplugin.default.webpack({
      apiKey:
        'e99df437ec10e77fbd84bd8f093da749a36c633cca4d0200f33838cbe9b52833',
      appVersion: '0.0.0',
      appType: 'webpack',
    }),
  ],
}
