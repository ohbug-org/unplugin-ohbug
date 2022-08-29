# `@ohbug/unplugin`

[![npm](https://img.shields.io/npm/v/@ohbug/unplugin.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/unplugin)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/unplugin?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/unplugin)

English | [简体中文](./README-zh_CN.md)

Auto upload your sourceMap files to Ohbug for Vite, Webpack and Rollup. Powered by [unplugin](https://github.com/unjs/unplugin).

## Installation

```
npm install @ohbug/unplugin -D
```

## Usage

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import OhbugUnplugin from '@ohbug/unplugin/vite'

export default defineConfig({
  plugins: [
    OhbugUnplugin({
      apiKey: 'YOUR_API_KEY',
      appVersion: 'YOUR_APP_VERSION',
    }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import OhbugUnplugin from '@ohbug/unplugin/rollup'

export default {
  plugins: [
    OhbugUnplugin({
      apiKey: 'YOUR_API_KEY',
      appVersion: 'YOUR_APP_VERSION',
    }),
    // other plugins
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('@ohbug/unplugin/webpack')({
      apiKey: 'YOUR_API_KEY',
      appVersion: 'YOUR_APP_VERSION',
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    [
      '@ohbug/unplugin/nuxt',
      {
        apiKey: 'YOUR_API_KEY',
        appVersion: 'YOUR_APP_VERSION',
      },
    ],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('@ohbug/unplugin/webpack')({
        apiKey: 'YOUR_API_KEY',
        appVersion: 'YOUR_APP_VERSION',
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Starter from '@ohbug/unplugin/esbuild'

build({ plugins: [Starter()] })
```

<br></details>

## Options

```typescript
interface Options {
  apiKey: string
  appVersion: string
  appType?: string
  endpoint?: string
  deleteAfterUploading?: boolean
}
```

### apiKey

Your project API key.

### appVersion

The version number of your app. Conveniently locate the problem version.

### appType

The type of your app. If your app's codebase contains different entries, but reports to the same service, you may need to add `appType` to indicate the type of entry for the source of the problem.

### endpoint

The url of the upload server

### deleteAfterUploading

default is `false`
