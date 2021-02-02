import { productInfoFragment } from '../fragments/product'
import { WoocommerceConfig, getConfig } from '../index'

export enum ProductIdTypeEnum {
  SLUG = 'SLUG',
  SKU = 'SKU',
  ID = 'ID',
  DATABASE_ID = 'DATABASE_ID',
}

export const getProductQuery = /* GraphQL */ `
  query getProduct($id: ID!, $idType: ProductIdTypeEnum) {
    product(id: $id, idType: $idType) {
      ...productInfo
      description
    }
  }

  ${productInfoFragment}
`

export type ProductVariables = { [key: string]: any } & {
  id: string
  idType?: ProductIdTypeEnum
}

async function getProduct({
  query = getProductQuery,
  variables,
  config,
}: {
  query?: string
  variables: ProductVariables
  config?: WoocommerceConfig
  preview?: boolean
}): Promise<any> {
  config = getConfig(config)

  const { id, idType = ProductIdTypeEnum.SLUG } = variables
  if (!id) {
    throw new Error(`The variable "id" is required in order to fetch a product`)
  }

  const { data } = await config.fetch<any>(query, {
    variables: { ...variables, idType: idType ?? ProductIdTypeEnum.SLUG },
  })
  const product = data?.product

  return { product }
}

export default getProduct
