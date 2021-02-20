import type { HookFetcher } from '@commerce/utils/types'
import { useCallback } from 'react'
import useCommerceRemoveItem from '@commerce/cart/use-remove-item'
import { RemoveItemsVariables } from '../api/operations/remove-item'
import useCart, { Cart } from './use-cart'
import { removeItemsQuery } from '../api/fragments/cart'

const defaultOpts = {
  url: 'https://www.next-commerce.store/graphql',
  method: 'POST',
}

export type RemoveItemInput = {
  query?: string
  variables: RemoveItemsVariables
}

export const fetcher: HookFetcher<{ removeItemsFromCart: Cart }, any> = async (
  options,
  { query = removeItemsQuery, variables },
  fetch
) => {
  if (!variables.input.all && !variables.input.keys) {
    throw new Error(`Variables should at least contain "all" or "keys"`)
  }

  return fetch({
    ...defaultOpts,
    ...options,
    body: { query, variables },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useRemoveItem = () => {
    const { mutate } = useCart()
    const fn = useCommerceRemoveItem<
      { removeItemsFromCart: Cart },
      RemoveItemInput
    >(defaultOpts, customFetcher)

    return useCallback(
      async function signup(input: RemoveItemInput) {
        const { removeItemsFromCart: data } = await fn(input)
        await mutate(data, false)
        return data
      },
      [fn, mutate]
    )
  }

  useRemoveItem.extend = extendHook

  return useRemoveItem
}

export default extendHook(fetcher)
