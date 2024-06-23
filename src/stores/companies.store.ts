import { create } from 'zustand'
import { CompanyModel } from '../types/company.model'

type Store = {
  companies: CompanyModel[]
  setCompanies: (newCompanies: CompanyModel[]) => void
  company: CompanyModel
  setCompany: (newCompany: CompanyModel) => void
}

export const useCompanies = create<Store>((set) => ({
  companies: [],
  setCompanies: (companies) => set({ companies }),
  company: Object.create(null),
  setCompany: (company) => set({ company }),
}))