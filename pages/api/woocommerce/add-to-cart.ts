import { NextApiRequest, NextApiResponse } from 'next'
import addToCart from 'framework/woocommerce/api/operations/add-to-cart'
import { getConfig } from 'framework/woocommerce/api'

export default async function addToCartApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const wooSession = req.headers['woocommerce-session']
    const config = getConfig({
      ...(wooSession && { cartCookie: String(wooSession) }),
    })

    const { quantity, productId } = JSON.parse(req.body)
    const { cart, session } = await addToCart({
      variables: {
        input: {
          quantity,
          productId,
        },
      },
      config,
    })

    res.setHeader('woocommerce-session', session)
    res.status(200).send(cart)
  }
}
