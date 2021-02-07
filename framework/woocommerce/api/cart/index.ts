import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler from '../utils/create-api-handler'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getConfig } from '..'
import getCart from 'framework/woocommerce/api/operations/get-cart'
import removeItems from 'framework/woocommerce/api/operations/remove-item'
import addItem from 'framework/woocommerce/api/operations/add-item'
import updateItem from 'framework/woocommerce/api/operations/update-item'

const METHODS = ['GET', 'POST', 'DELETE', 'PUT']

const cartApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  const wooSession = req.headers['woocommerce-session']
  const config = getConfig({
    ...(wooSession && { cartCookie: String(wooSession) }),
  })

  /* Get cart */
  if (req.method === 'GET') {
    const { cart, session } = await getCart({ config })
    res.setHeader('woocommerce-session', session)
    res.status(200).send(cart)
  }

  /* Delete item from cart */
  if (req.method === 'DELETE') {
    const { itemId } = JSON.parse(req.body)
    const { cart } = await removeItems({
      config,
      variables: { input: { keys: [String(itemId)] } },
    })
    res.status(200).send(cart)
  }

  /*   Add item to cart */
  if (req.method === 'POST') {
    const { quantity, productId, variationId, variation } = JSON.parse(req.body)
    const { cart, session } = await addItem({
      variables: {
        input: {
          quantity,
          productId,
          ...(variationId && { variationId }),
          ...(variation && { variation }),
        },
      },
      config,
    })

    res.setHeader('woocommerce-session', session)
    res.status(200).send(cart)
  }

  /* Update cart item quantity */
  if (req.method === 'PUT') {
    let { items } = JSON.parse(req.body)

    if (!Array.isArray(items)) {
      return res
        .status(422)
        .send({ message: `items should be an array of object {key, quantity}` })
    }

    // parsing quantity to number
    // items = items.map(({ quantity, key }) => ({
    //   quantity: Number(quantity),
    //   key,
    // }))

    const { item } = await updateItem({
      config,
      variables: {
        input: { items },
      },
    })
    res.status(200).send(item)
  }
}

export default createApiHandler(cartApi, {}, {})
