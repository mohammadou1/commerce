import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { WoocommerceConfig } from '..'
import { getConfig } from '../index'

export type WoocommerceApiHandler<
  T = any,
  H extends WoocommerceHandlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<WoocommerceApiResponse<T>>,
  config: WoocommerceConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>

export type WoocommerceHandler<T = any, Body = null> = (options: {
  req: NextApiRequest
  res: NextApiResponse<WoocommerceApiResponse<T>>
  config: WoocommerceConfig
  body: Body
}) => void | Promise<void>

export type WoocommerceApiResponse<T> = {
  data: T | null
  errors?: { message: string; code?: string }[]
}

export type WoocommerceHandlers<T = any> = {
  [k: string]: WoocommerceHandler<T, any>
}

export default function createApiHandler<
  T = any,
  H extends WoocommerceHandlers = {},
  Options extends {} = {}
>(
  handler: WoocommerceApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: WoocommerceConfig
    operations?: Partial<H>
    options?: Options extends {} ? Partial<Options> : never
  } = {}): NextApiHandler {
    const ops = { ...operations, ...handlers }
    const opts = { ...defaultOptions, ...options }

    return function apiHandler(req, res) {
      return handler(req, res, getConfig(config), ops, opts)
    }
  }
}
