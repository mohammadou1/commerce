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
export type ProductVariables = { withCoupon?: boolean } & {
  [key: string]: any
}

async function getCart({
  query = getCartQuery,
  variables = { withCoupon: false },
  config,
}: {
  query?: string
  variables?: ProductVariables
  config?: WoocommerceConfig
  preview?: boolean
}): Promise<any> {
  config = getConfig(config)

  const { data } = await config.fetch<any>(query, { variables })

  const cart = data?.cart

  return { cart }
}

export default getCart
