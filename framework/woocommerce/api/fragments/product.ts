export const variantInfoFragment = /* GraphQL */ `
  fragment variationInfo on VariableProduct {
    variations {
      edges {
        node {
          id
          price
          attributes {
            edges {
              node {
                id
                label
                name
                value
              }
            }
          }
        }
      }
    }
  }
`

export const productInfoFragment = /* GraphQL */ `
  fragment productInfo on Product {
    id
    name
    slug
    date
    onSale
    featured
    dateOnSaleFrom
    dateOnSaleTo
    averageRating
    image {
      altText
      isPreview
      link
      sizes
      slug
    }

    galleryImages {
      edges {
        node {
          id
          link
          slug
        }
      }
    }

    ... on SimpleProduct {
      salePrice
      price
    }

    ... on VariableProduct {
      salePrice
      price
      ...variationInfo
    }
  }
`

export const productConnectionFragment = /* GraphQL */ `
  fragment productConnection on RootQueryToProductConnection {
    edges {
      node {
        ...productInfo
      }
    }
  }

  ${productInfoFragment}
  ${variantInfoFragment}
`
