import { resolve } from 'node:path'
import { unlink } from 'node:fs/promises'
import type { Compilation, Compiler } from 'webpack'
import { createUnplugin } from 'unplugin'
import { uploadSourceMap } from '@ohbug/cli'
import type { Asset, Options } from './types'

const NAME = 'unplugin-ohbug'
const LOG_PREFIX = '[UnpluginOhbug]'

function getAssets(
  compiler: Compiler,
  compilation: Compilation,
  options: Options,
): Asset[] | undefined {
  const { chunks } = compilation.getStats().toJson()
  const outputPath = compilation.getPath(compiler.outputPath, {})

  return chunks?.reduce<Asset[]>((result, chunk) => {
    const filename = chunk.files?.find(file => /\.js\.map$/.test(file)) || chunk.auxiliaryFiles?.find(file => /\.js\.map$/.test(file))
    if (!filename) return result

    const path = compiler.outputFileSystem?.join?.(outputPath, filename) ?? `${outputPath}/${filename}`

    return [...result, { ...options, path }]
  }, [])
}

async function deleteSourceMaps(assets: Asset[], options: Options) {
  if (options.deleteAfterUploading) {
    await Promise.all(assets.map(asset => asset && unlink(asset.path)))
  }
}

const unplugin = createUnplugin<Options>(options => ({
  name: NAME,

  writeBundle(outputOptions: any, outputBundle: any) {
    if (typeof options?.apiKey !== 'string' || options.apiKey.length < 1) {
      throw new Error(`${LOG_PREFIX} "apiKey" is required!`)
    }

    if (typeof options.appVersion !== 'string' || options.appVersion.length < 1) {
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
      .filter(v => !!v) as Asset[]

    Promise.all(assets.map(asset => asset && uploadSourceMap(asset)))
      .then(() => deleteSourceMaps(assets, options))
      .catch((err) => {
        throw err
      })
  },

  webpack(compiler) {
    const plugin = async(compilation: Compilation) => {
      const assets = getAssets(compiler, compilation, options!)

      if (assets?.length) {
        Promise.all(assets.map(asset => uploadSourceMap(asset)))
          .then(() => deleteSourceMaps(assets, options!))
          .catch((err) => {
            throw err
          })
      }
    }

    if (compiler.hooks && compiler.hooks.afterEmit) {
      compiler.hooks.afterEmit.tapPromise(NAME, plugin)
    }
    else {
      // @ts-expect-error 兼容 webpack < 4
      compiler.plugin('after-emit', plugin)
    }
  },
}))

export default unplugin
