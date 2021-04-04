import rangeMap from '@lib/range-map'
import getAllProducts from '@woocommerce/products/get-all-products'
import { getConfig } from '@woocommerce/api'
import type { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
const nonNullable = (v: any) => v

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const config = getConfig()

  const { products: featuredProducts } = await getAllProducts({
    variables: { first: 6, field: 'featuredProducts' },
    config,
    preview,
  })
  const { products: newestProducts } = await getAllProducts({
    variables: { first: 6, field: 'newestProducts' },
    config,
    preview,
  })
  const { products: bestSellingProducts } = await getAllProducts({
    variables: { first: 6, field: 'bestSellingProducts' },
    config,
    preview,
  })

  // These are the products that are going to be displayed in the landing.
  // We prefer to do the computation at buildtime/servertime
  const { featured, bestSelling } = (() => {
    // Create a copy of products that we can mutate
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.node.price - b.node.price)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  })()

  return {
    props: {
      featured,
      newestProducts,
      bestSelling,
    },
    revalidate: 14400,
  }
}

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  console.log(props)
  return <div></div>
}
