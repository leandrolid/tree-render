import { AssetModel } from '../types/asset.model'
import { httpClient } from './http-client'

type Params = {
  companyId: string
}

export const getAssetsService = async ({ companyId }: Params): Promise<AssetModel[]> => {
  const res = await httpClient({
    path: `/companies/${companyId}/assets`,
    method: 'get'
  })

  return res
}