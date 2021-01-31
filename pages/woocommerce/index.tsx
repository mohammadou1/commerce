import { GetServerSideProps } from 'next'
import getAllProducts from 'framework/woocommerce/api/operations/get-all-products'

const IndexPage = (props: any) => {
  console.log(props)
  return <div>This page is to test WooCommerce</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { products: featuredProducts } = await getAllProducts({
      variables: { first: 6, field: 'featuredProducts' },
    })
    const { products } = await getAllProducts({
      variables: { first: 6, field: 'products' },
    })

    return {
      props: {
        featuredProducts,
        products,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        products: [],
      },
    }
  }
}
export default IndexPage
