import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useCommerceSearch from '@commerce/products/use-search'
import { SearchProductsData } from '../api/products'

const defaultOpts = {
  url: '/wp-json/wc/v3/products',
  method: 'GET',
}

export type SearchWoocommerceProductsInput = {
  page?: number
  per_page?: number
  search?: string
  // Limit response to posts published after a given ISO8601 compliant date
  after?: string
  // Limit response to posts published before a given ISO8601 compliant date
  before?: string
  // Array of IDs to exclude from the result
  exclude?: number[]
  // Array of IDs to include from the result
  include?: number[]
  // Offset the result set by a specific number of items.
  offset?: number
  order?: 'asc' | 'desc'
  orderby?: string
  slug?: string
  status?: string
  // Filter products by their category ID
  category?: string
  // Filter products by their tag ID
  tag?: string
  on_sale?: boolean
  min_price?: string
  max_price?: string
}

export const fetcher: HookFetcher<
  SearchProductsData,
  SearchWoocommerceProductsInput
> = (options, queries, fetch) => {
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')

  Object.entries(queries).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })

  return fetch({
    url: url.pathname + url.search,
    method: options?.method ?? defaultOpts.method,
  })
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<SearchProductsData, SearchWoocommerceProductsInput>
) {
  const useSearch = (input: SearchWoocommerceProductsInput = {}) => {
    const response = useCommerceSearch(
      defaultOpts,
      Object.entries(input).map(([key, value]) => [key, String(value)]),
      customFetcher,
      {
        revalidateOnFocus: false,
        ...swrOptions,
      }
    )
    return response
  }

  useSearch.extend = extendHook
  return useSearch
}

export default extendHook(fetcher)
