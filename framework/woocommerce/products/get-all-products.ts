import { getConfig, WoocommerceConfig } from '../api'
// import { Product } from '@commerce/types'
import { productConnectionFragment } from '../api/fragments/product'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $first: Int = 10
    $products: Boolean = false
    $featuredProducts: Boolean = false
    $newestProducts: Boolean = false
    $bestSellingProducts: Boolean = false
    $includeIds: [Int!]
  ) {
    products(first: $first, where: { include: $includeIds })
      @include(if: $products) {
      ...productConnection
    }
    newestProducts: products(first: $first) @include(if: $newestProducts) {
      ...productConnection
    }

    featuredProducts: products(first: $first, where: { featured: true })
      @include(if: $featuredProducts) {
      ...productConnection
    }

    bestSellingProducts: products(
      first: $first
      where: { orderby: { field: TOTAL_SALES } }
    ) @include(if: $bestSellingProducts) {
      ...productConnection
    }
  }

  ${productConnectionFragment}
`

const FIELDS = [
  'products',
  'featuredProducts',
  'newestProducts',
  'bestSellingProducts',
]

export type ProductTypes =
  | 'products'
  | 'featuredProducts'
  | 'newestProducts'
  | 'bestSellingProducts'

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
