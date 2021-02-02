import { CommerceAPIFetchOptions, GraphQLFetcherResult } from '@commerce/api'
import type { RequestInit } from '@vercel/fetch'
import fetchGraphqlApi from './utils/fetch-graphql-api'
import fetchStoreApi from './utils/fetch-store-api'

export type WoocommerceConfig = { [key: string]: any } & {
  storeApiUrl: string
  storeConsumerKey: string
  storeSecretKey: string
  commerceUrl: string
  fetch<Data = any, Variables = any>(
    query: string,
    queryData?: CommerceAPIFetchOptions<Variables>,
    fetchOptions?: RequestInit
  ): Promise<GraphQLFetcherResult<Data>>
  storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}

const API_URL = process.env.GRAPHQL_STORE_URL
const STORE_API_URL = process.env.WOOCOMMERCE_API_URL
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET

if (!API_URL) {
  throw new Error(
    `The enviroment variable GRAPHQL_STORE_URL is missing  and it's required to access your store`
  )
}

if (!STORE_API_URL) {
  throw new Error(
    `The enviroment variable WOOCOMMERCE_API_URL is missing  and it's required to access your store`
  )
}
if (!CONSUMER_KEY) {
  throw new Error(
    `The enviroment variable WOOCOMMERCE_CONSUMER_KEY is missing  and it's required to access your store`
  )
}
if (!CONSUMER_SECRET) {
  throw new Error(
    `The enviroment variable WOOCOMMERCE_CONSUMER_SECRET is missing  and it's required to access your store`
  )
}

export class Config {
  private config: WoocommerceConfig

  constructor(config: WoocommerceConfig) {
    this.config = {
      ...config,
    }
  }

  getConfig(userConfig: Partial<WoocommerceConfig> = {}) {
    return Object.entries(userConfig).reduce<WoocommerceConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }
  setConfig(newConfig: Partial<WoocommerceConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const ONE_DAY = 60 * 60 * 24

const config = new Config({
  commerceUrl: API_URL,
  storeApiUrl: STORE_API_URL,
  storeConsumerKey: CONSUMER_KEY,
  storeSecretKey: CONSUMER_SECRET,
  cartCookie: process.env.BIGCOMMERCE_CART_COOKIE ?? 'woo_cartId',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
  // REST API only
  storeApiFetch: fetchStoreApi,
})

export function getConfig(userConfig?: Partial<WoocommerceConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<WoocommerceConfig>) {
  return config.setConfig(newConfig)
}
