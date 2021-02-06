import { NextApiRequest, NextApiResponse } from 'next'
import { getConfig } from 'framework/woocommerce/api'
import getCart from 'framework/woocommerce/api/operations/get-cart'
import removeItems from 'framework/woocommerce/api/operations/remove-item'

export default async function addToCartApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const wooSession = req.headers['woocommerce-session']
  const config = getConfig({
    ...(wooSession && { cartCookie: String(wooSession) }),
  })
  if (req.method === 'GET') {
    const { cart, session } = await getCart({ config })
    res.setHeader('woocommerce-session', session)
    res.status(200).send(cart)
  } else if (req.method === 'DELETE') {
    const { itemId } = JSON.parse(req.body)
    const { cart } = await removeItems({
      config,
      variables: { input: { keys: [String(itemId)] } },
    })

    res.status(200).send(cart)
  }
}
