type Params = {
  path: string
  method: 'get'
}

export const httpClient = async (params: Params) => {
  const response = await new Promise((resolve) => {
    setTimeout(() => resolve(params), 200)
  })
  return response
}