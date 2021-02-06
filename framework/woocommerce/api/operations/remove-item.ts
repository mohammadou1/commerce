import { getConfig, WoocommerceConfig } from '..'
import { cartInfoFragment } from '../fragments/cart'

export const removeItemsQuery = /* GraphQL */ `
  mutation removeItems($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cart {
        ...cartInfo
      }
    }
  }
  ${cartInfoFragment}
`

export type RemoveItemsVariables = {
  input: {
    all?: boolean
    keys?: string[]
  }
}

async function removeItems({
  query = removeItemsQuery,
  variables = { input: { all: false } },
  config,
}: {
  query?: string
  variables: RemoveItemsVariables
  config?: WoocommerceConfig
  preview?: boolean
}): Promise<any> {
  config = getConfig(config)

  if (!variables.input.all && !variables.input.keys) {
    throw new Error(`Variables should at least contain "all" or "keys"`)
  }

  const headers = { 'woocommerce-session': `Session ${config.cartCookie}` }

  const { data } = await config.fetch<any>(query, { variables }, { headers })

  const cart = data?.removeItemsFromCart?.cart
  return { cart }
}

export default removeItems
