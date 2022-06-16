import Unplugin from '../dist/rollup'

export default {
  input: 'main.js',
  output: {
    dir: 'dist',
    sourcemap: true,
    format: 'esm',
  },
  plugins: [
    Unplugin({
      apiKey:
        'f8b38e2ea956e6d295aefcc88e0bbd6739021fd07eebe420e71a4ac4d70f43eb',
      appVersion: '0.0.0',
      appType: 'rollup',
    }),
  ],
}
