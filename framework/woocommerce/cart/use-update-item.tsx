import type { HookFetcher } from '@commerce/utils/types'
import { useCallback } from 'react'
import useCommerceUpdateItem from '@commerce/cart/use-update-item'
import { UpdateItemVariables } from '../api/operations/update-item'
import useCart, { Cart } from './use-cart'
import { updateItemQuery } from '../api/fragments/cart'

const defaultOpts = {
  url: 'https://www.next-commerce.store/graphql',
  method: 'POST',
}

export type AddItemInput = {
  query?: string
  variables: UpdateItemVariables
}

export const fetcher: HookFetcher<{ updateItemQuantities: Cart }, any> = async (
  options,
  { query = updateItemQuery, variables },
  fetch
) => {
  if (!variables.input.items) {
    throw new Error(`Variables should contain an item Object`)
  }

  return fetch({
    ...defaultOpts,
    ...options,
    body: { query, variables },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useUpdateItem = () => {
    const { mutate } = useCart()
    const fn = useCommerceUpdateItem<
      { updateItemQuantities: Cart },
      AddItemInput
    >(defaultOpts, customFetcher)
    return useCallback(
      async function signup(input: AddItemInput) {
        const { updateItemQuantities: data } = await fn(input)
        await mutate(data, false)
        return data
      },
      [fn, mutate]
    )
  }

  useUpdateItem.extend = extendHook

  return useUpdateItem
}

export default extendHook(fetcher)
