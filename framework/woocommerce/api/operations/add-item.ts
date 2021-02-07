import { cartInfoFragment } from '../fragments/cart'
import { WoocommerceConfig, getConfig } from '..'

export const addToCartQuery = /* GraphQL */ `
  mutation addToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        ...cartInfo
      }
    }
  }
  ${cartInfoFragment}
`

export type AddToCartVariables = {
  input: {
    productId: number
    quantity: number
    variation?: any
    variationId?: any
  }
} & {
  [key: string]: any
}

async function addItem({
  query = addToCartQuery,
  variables,
  config,
}: {
  query?: string
  variables: AddToCartVariables
  config?: WoocommerceConfig
  preview?: boolean
}): Promise<any> {
  config = getConfig(config)

  if (!variables?.input.productId || !variables.input.quantity) {
    throw new Error(`Variables productId and quanitity are required`)
  }

  const headers = config.cartCookie
    ? { 'woocommerce-session': `Session ${config.cartCookie}` }
    : undefined

  const { data, res } = await config.fetch<any>(
    query,
    { variables },
    { headers }
  )
  const cart = data?.addToCart?.cart
  return { cart, session: res.headers.get('woocommerce-session') }
}

export default addItem
