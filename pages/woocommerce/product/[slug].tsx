import { GetServerSideProps } from 'next'
import getProduct from 'framework/woocommerce/api/operations/get-product'
import getCart from 'framework/woocommerce/api/operations/get-cart'
import { useState } from 'react'

const ProductPage = ({ product, cart }: any) => {
  const [myCart, setCart] = useState(cart)

  const addProductToCart = async () => {
    const res = await fetch(
      'http://localhost:3000/api/woocommerce/add-to-cart',
      {
        method: 'POST',

        body: JSON.stringify({
          productId: product.databaseId,
          quantity: 1,
        }),
      }
    )
  }
  return (
    <div>
      <div>{product.name}</div>
      <button
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#c6c6c6',
        }}
        onClick={addProductToCart}
      >
        Add to cart
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { product } = await getProduct({
      variables: { id: String(ctx.query.slug) },
    })

    const { cart } = await getCart({})

    return {
      props: { product, cart },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        products: {},
      },
    }
  }
}
export default ProductPage
