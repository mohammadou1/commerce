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
  fragment productInfo on RootQueryToProductConnection {
    edges {
      node {
        id
        name
        slug
        date
        onSale
        featured
        description
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
    }
  }

  ${variantInfoFragment}
`
