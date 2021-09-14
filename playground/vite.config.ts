/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../dist'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin.vite({
      apiKey:
        'e99df437ec10e77fbd84bd8f093da749a36c633cca4d0200f33838cbe9b52833',
      appVersion: '0.0.0',
      appType: 'vite',
    }),
  ],
  build: {
    sourcemap: true,
  },
})
