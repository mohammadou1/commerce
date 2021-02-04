import { NextApiRequest, NextApiResponse } from 'next'
import addToCart from 'framework/woocommerce/api/operations/add-to-cart'

export default async function addToCartApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { quantity, productId } = JSON.parse(req.body)
    const cart = await addToCart({
      variables: {
        input: {
          quantity,
          productId,
        },
      },
    })

    res.status(200).send(cart)
  }
}
