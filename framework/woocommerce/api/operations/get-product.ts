import { productInfoFragment } from '../fragments/product'

export enum ProductIdTypeEnum {
  SLUG,
  SKU,
  ID,
  DATABASE_ID,
}

export const getProductQuery = /* GraphQL */ `
query getProduct(
  $path:String!
  idType: ProductIdTypeEnum
) {
...productInfo
description
}

${productInfoFragment}
`
