# `@ohbug/unplugin`

[![npm](https://img.shields.io/npm/v/@ohbug/unplugin.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/unplugin)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/unplugin?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/unplugin)

[English](./README.md) | 简体中文

为 Vite, Webpack 和 Rollup 自动上传 sourceMap 文件至 Ohbug. 由 [unplugin](https://github.com/unjs/unplugin) 驱动.

## 安装

```
npm install @ohbug/unplugin -D
```

## 使用

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

## Options

```typescript
interface Options {
  apiKey: string
  appVersion: string
  appType?: string
  endpoint?: string
}
```

### apiKey

这里作为客户端的唯一标识。

### appVersion

您应该提供 app 的版本号/标识符，以便于定位问题出现的时机。

### appType

如果您的 app 的代码库包含不同的入口，但向同一个服务上报，则可能需要添加 `appType` 表示问题来源的入口类型。

### endpoint

上传服务器的 URL
