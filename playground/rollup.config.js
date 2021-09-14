import Unplugin from '..'

export default {
  input: 'main.js',
  output: {
    dir: 'dist',
    sourcemap: true,
    format: 'esm',
  },
  plugins: [
    Unplugin.rollup({
      apiKey:
        'e99df437ec10e77fbd84bd8f093da749a36c633cca4d0200f33838cbe9b52833',
      appVersion: '0.0.0',
      appType: 'rollup',
    }),
  ],
}
