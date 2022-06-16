/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../dist/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      apiKey:
        'f8b38e2ea956e6d295aefcc88e0bbd6739021fd07eebe420e71a4ac4d70f43eb',
      appVersion: '0.0.0',
      appType: 'vite',
    }),
  ],
  build: {
    sourcemap: true,
  },
})
