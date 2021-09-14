// eslint-disable-next-line import/no-extraneous-dependencies
import type { Compilation, Compiler } from 'webpack'
import { createUnplugin } from 'unplugin'
import { uploadSourceMap } from '@ohbug/cli'
import { resolve } from 'path'
import type { Asset, Options } from './types'

const NAME = `unplugin-ohbug`
const LOG_PREFIX = `[UnpluginOhbug]`

function getAssets(
  compiler: Compiler,
  compilation: Compilation,
  options: Options
): Asset[] | undefined {
  const { chunks } = compilation.getStats().toJson()
  const outputPath = compilation.getPath(compiler.outputPath, {})

  // @ts-ignore
  return chunks?.reduce<Asset[]>((result, chunk) => {
    const filename =
      chunk.files?.find((file) => /\.js\.map$/.test(file)) ||
      chunk.auxiliaryFiles?.find((file) => /\.js\.map$/.test(file))
    if (!filename) {
      return result
    }
    const path =
      compiler.outputFileSystem?.join?.(outputPath, filename) ??
      `${outputPath}/${filename}`

    return [...result, { ...options, path }]
  }, [])
}

export default createUnplugin<Options>((options) => ({
  name: NAME,

  writeBundle(outputOptions: any, outputBundle: any) {
    if (typeof options?.apiKey !== 'string' || options.apiKey.length < 1) {
      throw new Error(`${LOG_PREFIX} "apiKey" is required!`)
    }
    if (
      typeof options.appVersion !== 'string' ||
      options.appVersion.length < 1
    ) {
      throw new Error(`${LOG_PREFIX} "appVersion" is required!`)
    }

    const assets = Object.keys(outputBundle)
      .map((key) => {
        const value = outputBundle[key]
        if (value.map) {
          const path = resolve(outputOptions.dir, `${value.fileName}.map`)
          return {
            ...options,
            path,
          }
        }
        return null
      })
      .filter((v) => !!v)

    Promise.all(assets.map((asset) => asset && uploadSourceMap(asset))).catch(
      (err) => {
        throw err
      }
    )
  },

  webpack(compiler) {
    const plugin = async (compilation: Compilation) => {
      const assets = getAssets(compiler, compilation, options!)

      if (assets?.length) {
        await Promise.all(assets.map((asset) => uploadSourceMap(asset)))
      }
    }

    if (compiler.hooks && compiler.hooks.afterEmit) {
      compiler.hooks.afterEmit.tapPromise(NAME, plugin)
    } else {
      // @ts-ignore
      compiler.plugin('after-emit', plugin)
    }
  },
}))
