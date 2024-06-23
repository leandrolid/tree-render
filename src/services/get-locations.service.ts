import data from '../tests/api-data.json'
import { AssetModel } from '../types/asset.model'
import { httpClient } from './http-client'

type Params = {
  companyId: string
}

export const getLocationsService = async ({ companyId }: Params): Promise<AssetModel[]> => {
  await httpClient({
    path: `/companies/${companyId}/locations`,
    method: 'get'
  })

  const company = Reflect.get(data, companyId)
  return company ? company.locations : []
}