import { getConfig, WoocommerceConfig } from '..'
import { cartInfoFragment } from '../fragments/cart'

export const getCartQuery = /* GraphQL */ `
  query getCart($withCoupon: Boolean = false) {
    cart {
      ...cartInfo
      appliedCoupons @include(if: $withCoupon) {
        edges {
          node {
            id
            amount
            dateExpiry
            discountType
          }
        }
      }
    }
  }

  ${cartInfoFragment}
`
export type GetCartVariables = { withCoupon?: boolean } & {
  [key: string]: any
}

async function getCart({
  query = getCartQuery,
  variables = { withCoupon: false },
  config,
}: {
  query?: string
  variables?: GetCartVariables
  config?: WoocommerceConfig
  preview?: boolean
}): Promise<any> {
  config = getConfig(config)

  const headers = config.cartCookie
    ? { 'woocommerce-session': `Session ${config.cartCookie}` }
    : undefined

  const { data, res } = await config.fetch<any>(
    query,
    { variables },
    { headers }
  )

  const cart = data?.cart

  return {
    cart,
    session: res.headers.get('woocommerce-session') || config.cartCookie,
  }
}

export default getCart
