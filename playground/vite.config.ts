/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../dist/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      apiKey:
        '52ec8631e1583957f7abb5216ec7512e6824aab90eb2307a1f6ed7cf5f33f8d3',
      appVersion: '0.0.0',
      appType: 'vite',
      deleteAfterUploading: true
    }),
  ],
  build: {
    sourcemap: true,
  },
})
