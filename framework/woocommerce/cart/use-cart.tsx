import type { HookFetcher } from '@commerce/utils/types'
import useCommerceCart, { CartInput } from '@commerce/cart/use-cart'
import type { SwrOptions } from '@commerce/utils/use-data'
import { getCartQuery } from '../api/fragments/cart'

const defaultOpts = {
  url: 'https://www.next-commerce.store/graphql',
  method: 'POST',
}

type Edges = { edges: any[] }

export type Cart = {
  cart: {
    appliedCoupons?: Edges
    chosenShippingMethod?: string
    contents: Edges
    contentsTax: string
    contentsTotal: string
    discountTax: string
    discountTotal: string
    displayPricesIncludeTax: boolean
    feeTax: string
    feeTotal: string
    needsShippingAddress: boolean
    shippingTax: string
    shippingTotal: string
    subtotal: string
    subtotalTax: string
    total: string
    totalTax: string
  } & { [key: string]: any }
}

export const fetcher: HookFetcher<Cart, any> = async (
  options,
  { query = getCartQuery, variables },
  fetch
) => {
  return fetch({
    ...defaultOpts,
    ...options,
    body: { query, variables },
  })
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<Cart | null, CartInput>
) {
  const useCart = () => {
    const response = useCommerceCart(defaultOpts, [], customFetcher, {
      revalidateOnFocus: false,
      ...swrOptions,
    })
    response.isEmpty = response.data?.cart?.isEmpty

    return response
  }

  useCart.extend = extendHook

  return useCart
}

export default extendHook(fetcher)
