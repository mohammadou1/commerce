import { getConfig, WoocommerceConfig } from '..'
import { cartInfoFragment, cartItemUpdateFragment } from '../fragments/cart'

export const updateItemQuery = /* GraphQL */ `
  mutation updateItemQuantity(
    $input: UpdateItemQuantitiesInput!
    $withCart: Boolean = false
  ) {
    updateItemQuantities(input: $input) {
      ...cartUpdateInfo
      cart @include(if: $withCart) {
        ...cartInfo
      }
    }
  }

  ${cartInfoFragment}
  ${cartItemUpdateFragment}
`

export type UpdateItems = { key: string; quantity: number }[]
export type UpdateItemVariables = {
  input: {
    items: UpdateItems
  }
  withCart?: boolean
}

async function updateItem({
  query = updateItemQuery,
  variables,
  config,
}: {
  query?: string
  variables: UpdateItemVariables
  config?: WoocommerceConfig
  preview?: boolean
}): Promise<any> {
  config = getConfig(config)

  if (!variables.input.items) {
    throw new Error(`Variables should contain an item Object`)
  }
  const headers = { 'woocommerce-session': `Session ${config.cartCookie}` }

  const { data } = await config.fetch<any>(query, { variables }, { headers })

  const item = data?.updateItemQuantities

  return { item }
}

export default updateItem
