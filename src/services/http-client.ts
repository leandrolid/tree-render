type Params = {
  path: string
  method: 'get'
}

export const httpClient = async (params: Params) => {
  const response = await fetch(new URL(params.path, 'https://fake-api.tractian.com/'), {
    method: params.method,
  })
  return response.json()
}