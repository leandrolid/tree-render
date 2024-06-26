import { CompanyModel } from '../types/company.model'
import { httpClient } from './http-client'

export const getCompaniesService = async (): Promise<CompanyModel[]> => {
  const res = await httpClient({
    path: '/companies',
    method: 'get'
  })

  return res
}