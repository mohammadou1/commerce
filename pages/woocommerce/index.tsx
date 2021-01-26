import { GetServerSideProps } from 'next'

const IndexPage = ({ products }: any) => {
  console.log(products)
  return <div>This page is to test WooCommerce</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await fetch('http://localhost:3000/api/woocommerce/products')
    const products = await data.json()

    return {
      props: {
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
