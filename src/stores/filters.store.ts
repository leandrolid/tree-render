import { create } from 'zustand'
import { AssetModel } from '../types/asset.model'

type Store = {
  search: string
  status: string
  type: string
  asset: AssetModel
  setSearch: (newSearch: string) => void
  toggleStatusAlert: () => void
  toggleTypeEnergy: () => void
  setAsset: (asset: AssetModel) => void
}

export const useFilters = create<Store>((set) => ({
  search: '',
  status: '',
  type: '',
  asset: Object.create(null),
  setSearch: (search) => set({ search }),
  toggleStatusAlert: () => set((prev) => ({
    status: prev.status === 'alert' ? '' : 'alert',
    type: '',
  })),
  toggleTypeEnergy: () => set((prev) => ({
    type: prev.type === 'energy' ? '' : 'energy',
    status: '',
  })),
  setAsset: (asset) => set({ asset }),
}))
