export const cartInfoFragment = /* GraphQL */ `
  fragment cartInfo on Cart {
    chosenShippingMethod
    contentsTax
    contentsTotal
    discountTax
    discountTotal
    displayPricesIncludeTax
    feeTax
    feeTotal
    isEmpty
    needsShippingAddress
    shippingTax
    shippingTotal
    subtotal
    subtotalTax
    total
    totalTax
    contents {
      edges {
        node {
          product {
            node {
              id
              name
            }
          }
          key
          quantity
          subtotal
          subtotalTax
          tax
          total
        }
      }
    }
  }
`
