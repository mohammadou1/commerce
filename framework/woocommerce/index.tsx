import type { ReactNode } from 'react'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import { woocommerceProvider, WoocommerceProvider } from './provider'
import { WOOCOMMERCE_COOKIE_SESSION } from './const'

export { woocommerceProvider }
export type { WoocommerceProvider }

export const woocommerceConfig: CommerceConfig = {
  locale: '',
  cartCookie: WOOCOMMERCE_COOKIE_SESSION,
}

export type WoocommerceConfig = Partial<CommerceConfig>

export type WoocommerceProps = {
  children?: ReactNode
  locale: never
} & WoocommerceConfig

export function CommerceProvider({ children, ...config }: WoocommerceProps) {
  return (
    <CoreCommerceProvider
      provider={woocommerceProvider}
      config={{ ...woocommerceConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<WoocommerceProvider>()
