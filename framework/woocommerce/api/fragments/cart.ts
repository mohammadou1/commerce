export const cartItemFragment = /* GraphQL */ `
  fragment cartItem on CartItem {
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
`

export const cartItemUpdateFragment = /* GraphQL */ `
  fragment cartUpdateInfo on UpdateItemQuantitiesPayload {
    items {
      ...cartItem
    }
  }
`

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
          ...cartItem
        }
      }
    }
  }
  ${cartItemFragment}
`
