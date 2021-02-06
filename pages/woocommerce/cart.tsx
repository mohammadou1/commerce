import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
const CartPage = () => {
  const [cart, setCart] = useState<any>()
  useEffect(() => {
    ;(async function () {
      const cartSession = Cookies.get('woocommerce-session')
      const res = await fetch('/api/woocommerce/cart', {
        headers: {
          ...(cartSession && {
            'woocommerce-session': `${cartSession}`,
          }),
        },
      })

      const session = res.headers.get('woocommerce-session')
      Cookies.set('woocommerce-session', String(session))

      const data = await res.json()
      setCart(data)
    })()
  }, [])

  const removeItem = async (key: string) => {
    const cartSession = Cookies.get('woocommerce-session')
    const res = await fetch('/api/woocommerce/cart', {
      method: 'DELETE',
      headers: {
        'woocommerce-session': `${cartSession}`,
      },
      body: JSON.stringify({ itemId: key }),
    })

    setCart(await res.json())
  }

  if (!cart) return <div>loading...</div>

  return (
    <div>
      {cart.contents?.edges?.map(({ node }: any) => (
        <div key={node.key}>
          <span className="mr-2 text-bold">{node.product.node.name}</span>
          <input
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

export default CartPage
