import { getConfig, WoocommerceConfig } from '..'
import { productInfoFragment } from '../fragments/product'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $first: Int = 10
    $products: Boolean = false
    $featuredProducts: Boolean = false
  ) {
    products(first: $first) @include(if: $products) {
      ...productInfo
    }

    featuredProducts: products(first: $first, where: { featured: true })
      @include(if: $featuredProducts) {
      ...productInfo
    }
  }

  ${productInfoFragment}
`

const FIELDS = ['products', 'featuredProducts', 'newestProducts']

export type ProductTypes = 'products' | 'featuredProducts' | 'newestProducts'

export type ProductVariables = { field?: ProductTypes } & { [key: string]: any }

async function getAllProducts({
  query = getAllProductsQuery,
  variables: { field = 'products', ...vars } = {},
  config,
}: {
  query?: string
  variables?: ProductVariables
  config?: WoocommerceConfig
  preview?: boolean
}): Promise<any> {
  config = getConfig(config)

  const variables = { ...vars }

  if (!FIELDS.includes(field)) {
    throw new Error(
      `The field variable has to match one of ${FIELDS.join(', ')}`
    )
  }

  variables[field] = true

  const { data } = await config.fetch<any>(query, { variables })

  const products = data?.[field]?.edges

  return { products }
}

export default getAllProducts
