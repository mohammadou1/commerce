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

export type ProductVariables = {
  input: {
    productId: number
    quantity: number
    variation?: any
    variationId?: any
  }
} & {
  [key: string]: any
}

async function addToCart({
  query = addToCartQuery,
  variables,
  config,
}: {
  query?: string
  variables: ProductVariables
  config?: WoocommerceConfig
  preview?: boolean
}): Promise<any> {
  config = getConfig(config)

  if (!variables?.input.productId || !variables.input.quantity) {
    throw new Error(`Variables productId and quanitity are required`)
  }

  const { data } = await config.fetch<any>(
    query,
    { variables },
    {
      headers: {
        'woocommerce-session':
          'Session eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3Lm5leHQtY29tbWVyY2Uuc3RvcmUiLCJpYXQiOjE2MTIzODkyMjIsIm5iZiI6MTYxMjM4OTIyMiwiZXhwIjoxNjEyNTYyMDIyLCJkYXRhIjp7ImN1c3RvbWVyX2lkIjoiYzQxZTY2NTNhYzJiYWVmMGY0MDFiMTliMzk2NWIwMWMifX0.iCs7W-B9wDTTylJJdMFTh4qjpdcXsxKTWIfJADMQiZA',
      },
    }
  )

  return { data }
}

export default addToCart
