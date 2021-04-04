import * as Core from '@commerce/types'

type Edges = { edges: any[] }

export type WoocommerceCart = {
  appliedCoupons?: Edges
  chosenShippingMethod?: string
  contents: Edges
  contentsTax: string
  contentsTotal: string
  discountTax: string
  discountTotal: string
  displayPricesIncludeTax: boolean
  feeTax: string
  feeTotal: string
  needsShippingAddress: boolean
  shippingTax: string
  shippingTotal: string
  subtotal: string
  subtotalTax: string
  total: string
  totalTax: string
}

export type Cart = Core.Cart & {
  lineItems: LineItem[]
}

export type LineItem = Core.LineItem

/**
 * Cart mutations
 */

export type OptionSelections = {
  option_id: number
  option_value: number | string
}

export type CartItemBody = Core.CartItemBody & {
  productId: string
  optionSelections?: OptionSelections
}

type X = Core.CartItemBody extends CartItemBody ? any : never
type Y = CartItemBody extends Core.CartItemBody ? any : never

export type GetCartHandlerBody = Core.GetCartHandlerBody

export type AddCartItemBody = Core.AddCartItemBody<CartItemBody>

export type AddCartItemHandlerBody = Core.AddCartItemHandlerBody<CartItemBody>

export type UpdateCartItemBody = Core.UpdateCartItemBody<CartItemBody>

export type UpdateCartItemHandlerBody = Core.UpdateCartItemHandlerBody<CartItemBody>

export type RemoveCartItemBody = Core.RemoveCartItemBody

export type RemoveCartItemHandlerBody = Core.RemoveCartItemHandlerBody
