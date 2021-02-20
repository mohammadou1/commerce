import { ReactNode } from 'react'
import Cookies from 'js-cookie'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

export const woocommerceConfig: CommerceConfig = {
  locale: '',
  cartCookie: process.env.NEXT_PUBLIC_CART_COOKIE ?? 'woocommerce-session',
  async fetcher({ url, method = 'GET', body: bodyObj }) {
    const hasBody = Boolean(bodyObj)
    const cartId = Cookies.get('woocommerce-session')

    const body = hasBody ? JSON.stringify(bodyObj) : undefined

    const headers = hasBody
      ? {
          'Content-Type': 'application/json',
          ...(cartId && { 'woocommerce-session': `Session ${cartId}` }),
        }
      : undefined
    const res = await fetch(url!, { method, body, headers })

    if (res.ok) {
      const resCartId = res.headers.get('woocommerce-session')
      if (resCartId && cartId !== resCartId)
        Cookies.set('woocommerce-session', String(resCartId))

      const { data } = await res.json()
      return data
    }
  },
}

export type WoocommerceProps = {
  children?: ReactNode
}

export function CommerceProvider({ children }: WoocommerceProps) {
  return (
    <CoreCommerceProvider config={{ ...woocommerceConfig }}>
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
