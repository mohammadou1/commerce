import { RequestInit, Response } from '@vercel/fetch'
import { getConfig } from '..'
import fetch from './fetch'

export default async function fetchStoreApi<T>(
  endpoint: string,
  options: RequestInit
): Promise<T> {
  const config = getConfig()
  let res: Response

  const auth = Buffer.from(
    `${config.storeConsumerKey}:${config.storeSecretKey}`
  ).toString('base64')

  try {
    res = await fetch(config.storeApiUrl + endpoint, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
    })
  } catch (error) {
    console.log(error)
    throw new Error(`Fetch woocommerce failed ${error.message}`)
  }

  if (!res.ok) {
    const data = await res.json()
    const headers = getRawHeaders(res)
    const msg = `Woo Commerce API error (${
      res.status
    })\n Headers: ${JSON.stringify(headers, null, 2)}\n 
    ${JSON.stringify(data, null, 2)}`

    throw new Error(msg)
  }
  return await res.json()
}

function getRawHeaders(res: Response) {
  const headers: { [key: string]: string } = {}

  res.headers.forEach((value, key) => {
    headers[key] = value
  })

  return headers
}

// const url = new URL('/wp-json/wc/v3/products', 'http://a')

// Object.entries(queries).map(([key, value]) => {
//   url.searchParams.set(key, String(value))
// })

// const result = await fetch(config.storeApiUrl + url.pathname + url.search, {
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Basic ${Buffer.from(
//       `${config.storeConsumerKey}:${config.storeSecretKey}`
//     ).toString('base64')}`,
//   },
// })

// /* */
// if (result.ok) {
//   res.status(200).json(await result.json())
// } else {
//   const { message, status } = await result.json()
//   res.status(500).json({ data: null, errors: [{ message }] })
// }
/* */
