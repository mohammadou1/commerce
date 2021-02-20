import type { HookFetcher } from '@commerce/utils/types'
import { AddToCartVariables } from '../api/operations/add-item'
import { useCallback } from 'react'
import useCommerceAddItem from '@commerce/cart/use-add-item'
import useCart, { Cart } from './use-cart'
import { addToCartQuery } from '../api/fragments/cart'

const defaultOpts = {
  url: 'https://www.next-commerce.store/graphql',
  method: 'POST',
}

export type AddItemInput = {
  query?: string
  variables: AddToCartVariables
}

export const fetcher: HookFetcher<{ addToCart: Cart }, any> = async (
  options,
  { query = addToCartQuery, variables },
  fetch
) => {
  if (!variables?.input.productId || !variables.input.quantity) {
    throw new Error(`Variables productId and quanitity are required`)
  }

  return fetch({
    ...defaultOpts,
    ...options,
    body: { query, variables },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useAddItem = () => {
    const { mutate } = useCart()
    const fn = useCommerceAddItem<{ addToCart: Cart }, AddItemInput>(
      defaultOpts,
      customFetcher
    )
    return useCallback(
      async function signup(input: AddItemInput) {
        const { addToCart: data } = await fn(input)
        await mutate(data, false)
        return data
      },
      [fn, mutate]
    )
  }

  useAddItem.extend = extendHook

  return useAddItem
}

export default extendHook(fetcher)
