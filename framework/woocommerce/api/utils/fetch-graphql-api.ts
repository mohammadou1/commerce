import type { GraphQLFetcher } from '@commerce/api'
import { getConfig } from '..'
import fetch from './fetch'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions
) => {
  const config = getConfig()
  const res = await fetch(config.commerceUrl, {
    ...fetchOptions,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions?.headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) console.log(json.errors)

  return { data: json.data, res }
}

export default fetchGraphqlApi
