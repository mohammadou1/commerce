import type { GraphQLFetcher } from '@commerce/api'
import { getConfig } from '..'
import fetch from './fetch'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables, preview } = {},
  fetchOptions
) => {
  const config = getConfig()
  const res = await fetch(config.commerceUrl + (preview ? '/preview' : ''), {
    ...fetchOptions,
    method: 'POST',
    headers: {
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  return { data: json.data, res }
}

export default fetchGraphqlApi
