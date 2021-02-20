import { useState, useCallback } from 'react'
// import Cookies from 'js-cookie'
import debounce from 'lodash.debounce'
import Layout from '@components/woocommerce/common/Layout'
import useRemoveItem from '@woocommerce/cart/use-remove-item'
import useUpdateItem from '@woocommerce/cart/use-update-item'
import useCart from '@woocommerce/cart/use-cart'

const CartPage = () => {
  const { data, isEmpty, isValidating } = useCart()
  const remove = useRemoveItem()
  const update = useUpdateItem()

  const removeItem = async (key: string) => {
    await remove({ variables: { input: { keys: [key] } } })
  }

  const updateQuantity = useCallback(
    debounce(async (quantity: string, key: string) => {
      const items = [{ key, quantity: Number(quantity) }]
      await update({
        variables: { input: { items } },
      })
    }, 300),
    []
  )

  if (isValidating) return <div>loading...</div>

  const items = data?.cart?.contents.edges ?? []

  return (
    <div>
      {items?.map(({ node }: any) => (
        <div key={node.key}>
          <span className="mr-2 text-bold">{node.product.node.name}</span>
          <input
            min={1}
            max={10}
            onChange={(e) => updateQuantity(e.currentTarget.value, node.key)}
            className="form-input"
            type="number"
            defaultValue={node.quantity}
          />
          <button
            onClick={() => removeItem(node.key)}
            className="text-red ml-2"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

CartPage.Layout = Layout

export default CartPage
