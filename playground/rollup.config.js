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
        '52ec8631e1583957f7abb5216ec7512e6824aab90eb2307a1f6ed7cf5f33f8d3',
      appVersion: '0.0.1',
      appType: 'rollup',
    }),
  ],
}
