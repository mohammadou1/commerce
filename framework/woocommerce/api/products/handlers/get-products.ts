import type { ProductsHandlers } from '..'
const getProducts: ProductsHandlers['getProducts'] = async ({
  res,
  body,
  config,
}) => {
  const url = new URL('/wp-json/wc/v3/products', 'http://a')

  Object.entries(body).map(([key, value]) => {
    url.searchParams.set(key, String(value))
  })
  const data = await config.storeApiFetch<any>(url.pathname + url.search)
  res.status(200).json({ data })
}

export default getProducts
