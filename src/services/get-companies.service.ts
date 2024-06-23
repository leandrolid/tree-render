import data from '../tests/api-data.json'
import { CompanyModel } from '../types/company.model'
import { httpClient } from './http-client'

export const getCompaniesService = async (): Promise<CompanyModel[]> => {
  await httpClient({
    path: '/companies',
    method: 'get'
  })

  return data.companies
}