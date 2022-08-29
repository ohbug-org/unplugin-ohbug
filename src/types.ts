export interface Config {
  apiKey: string
  appVersion: string
  appType?: string
  endpoint?: string
}
export interface Options extends Config {
  publicPath?: string
  deleteAfterUploading?: boolean
}
export interface Asset extends Config {
  path: string
}
