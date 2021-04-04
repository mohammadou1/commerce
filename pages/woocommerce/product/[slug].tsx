import { GetServerSideProps } from 'next'
import getProduct from '@woocommerce/products/get-product'
import useAddItem from '@woocommerce/cart/use-add-item'
import Layout from '@components/woocommerce/common/Layout'

const ProductPage = ({ product, cart }: any) => {
  const addItem = useAddItem()

  const addProductToCart = async () => {
    await addItem({
      variables: { input: { productId: product.databaseId, quantity: 1 } },
    })
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

    return {
      props: { product },
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

ProductPage.Layout = Layout
