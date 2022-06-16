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
        'f8b38e2ea956e6d295aefcc88e0bbd6739021fd07eebe420e71a4ac4d70f43eb',
      appVersion: '0.0.0',
      appType: 'webpack',
    }),
  ],
}
