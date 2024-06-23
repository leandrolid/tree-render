import data from '../tests/api-data.json'
import { AssetModel } from '../types/asset.model'
import { httpClient } from './http-client'

type Params = {
  companyId: string
}

export const getAssetsService = async ({ companyId }: Params): Promise<AssetModel[]> => {
  await httpClient({
    path: `/companies/${companyId}/assets`,
    method: 'get'
  })

  const company = Reflect.get(data, companyId)
  return company ? company.assets : []
}