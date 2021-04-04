import fetcher from './fetcher'
import { WOOCOMMERCE_COOKIE_SESSION } from './const'

export const woocommerceProvider = {
  cartCookie: WOOCOMMERCE_COOKIE_SESSION,
  locale: '',
  fetcher,
  cart: {},
  customer: {},
  products: {},
}

export type WoocommerceProvider = typeof woocommerceProvider
