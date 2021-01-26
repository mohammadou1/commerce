import isAllowedMethod from '../utils/is-allowed-method'
import {
  WoocommerceHandler,
  WoocommerceApiHandler,
} from '../utils/create-api-handler'
import { SearchWoocommerceProductsInput } from '../../products/use-search'
import getProducts from './handlers/get-products'
import createApiHandler from '../utils/create-api-handler'

export type SearchProductsData = {
  products: any[]
}

export type ProductsHandlers = {
  getProducts: WoocommerceHandler<
    SearchProductsData,
    SearchWoocommerceProductsInput
  >
}

const METHODS = ['GET']

const productApi: WoocommerceApiHandler<
  SearchProductsData,
  ProductsHandlers
> = async (req, res, config, handlers) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  try {
    const body = req.query
    return await handlers['getProducts']({ req, res, config, body })
  } catch (error) {
    // TODO: Should check error cause and types to return the response based on it
    console.log(error)
    res.status(500).json({
      data: null,
      errors: [{ message: 'An unexpected error ocurred' }],
    })
  }
}

export const handlers = { getProducts }

export default createApiHandler(productApi, handlers, {})
