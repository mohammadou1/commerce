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

export const getCartQuery = /* GraphQL */ `
  query getCart($withCoupon: Boolean = true) {
    cart {
      ...cartInfo
      appliedCoupons @include(if: $withCoupon) {
        edges {
          node {
            id
            amount
            dateExpiry
            discountType
          }
        }
      }
    }
  }

  ${cartInfoFragment}
`

export const removeItemsQuery = /* GraphQL */ `
  mutation removeItems($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cart {
        ...cartInfo
      }
    }
  }
  ${cartInfoFragment}
`

export const updateItemQuery = /* GraphQL */ `
  mutation updateItemQuantity(
    $input: UpdateItemQuantitiesInput!
    $withCart: Boolean = true
  ) {
    updateItemQuantities(input: $input) {
      # ...cartUpdateInfo
      cart @include(if: $withCart) {
        ...cartInfo
      }
    }
  }

  ${cartInfoFragment}
`

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
