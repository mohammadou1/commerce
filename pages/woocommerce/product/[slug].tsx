import { GetServerSideProps } from 'next'
import getProduct from 'framework/woocommerce/api/operations/get-product'

const ProductPage = (props: any) => {
  console.log(props)
  return <div>This page is to test WooCommerce</div>
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
