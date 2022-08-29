const path = require('path')
const Unplugin = require('../dist/webpack').default

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
    Unplugin({
      apiKey:
        '52ec8631e1583957f7abb5216ec7512e6824aab90eb2307a1f6ed7cf5f33f8d3',
      appVersion: '0.0.0',
      appType: 'webpack',
    }),
  ],
}
