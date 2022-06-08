export interface Config {
  apiKey: string
  appVersion: string
  appType?: string
  endpoint?: string
}
export interface Options extends Config {
  publicPath?: string
}
export interface Asset extends Config {
  path: string
}
