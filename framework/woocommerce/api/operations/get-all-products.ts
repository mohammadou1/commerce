import { getConfig } from '..'
async function getAllProducts({ query, variables = {}, config }: any) {
  config = getConfig(config)
}

export default getAllProducts
