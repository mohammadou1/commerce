import type { RequestInit } from '@vercel/fetch'
import type { CommerceAPIConfig } from '@commerce/api'
import fetchGraphqlApi from './utils/fetch-graphql-api'
import fetchStoreApi from './utils/fetch-store-api'
import {
  WOOCOMMERCE_COOKIE_SESSION,
  WOOCOMMERCE_COOKIE_AGE,
  API_URL,
  STORE_API_URL,
} from '../const'

export interface WoocommerceConfig extends CommerceAPIConfig {
  storeApiUrl: string
  commerceUrl: string
  storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}

// const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY
// const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET

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

export class Config {
  private config: WoocommerceConfig

  constructor(config: Omit<WoocommerceConfig, 'customerCookie' | 'apiToken'>) {
    this.config = {
      ...config,
      customerCookie: '',
      apiToken: '',
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
  cartCookieMaxAge: ONE_DAY * WOOCOMMERCE_COOKIE_AGE,
  cartCookie: WOOCOMMERCE_COOKIE_SESSION ?? 'woocommerce-session',
  fetch: fetchGraphqlApi,
  storeApiFetch: fetchStoreApi,
})

export function getConfig(userConfig?: Partial<WoocommerceConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<WoocommerceConfig>) {
  return config.setConfig(newConfig)
}
