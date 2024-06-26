import { act, render, screen } from '@testing-library/react'
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { AssetsTree } from '.'
import { getAssetsService } from '../../services/get-assets.service'
import { getLocationsService } from '../../services/get-locations.service'
import { useCompanies } from '../../stores/companies.store'
import { useFilters } from '../../stores/filters.store'
import data from '../../tests/api-data.json'

vi.mock('../../stores/companies.store')
vi.mock('../../stores/filters.store')
vi.mock('../../services/get-assets.service')
vi.mock('../../services/get-locations.service')

describe('AssetsTree', () => {
  const company = data.companies[0]
  const assets = Reflect.get(data, company.id).assets
  const locations = Reflect.get(data, company.id).locations

  beforeEach(() => {
    (getAssetsService as Mock).mockReturnValue(Promise.resolve(assets));
    (getLocationsService as Mock).mockReturnValue(Promise.resolve(locations));
    (useCompanies as unknown as Mock).mockReturnValue(company);
    (useFilters as unknown as Mock).mockReturnValue({
      search: '',
      type: '',
      status: '',
      setAsset: vi.fn(),
      asset: Object.create(null),
    })
  })

  it('renders the tree correctly', async () => {
    await act(async () => {
      render(<AssetsTree />)
    })
  })

  it('renders the tree correctly with search', async () => {
    (useFilters as unknown as Mock).mockReturnValue({
      search: 'search',
      type: '',
      status: '',
      setAsset: vi.fn(),
      asset: Object.create(null),
    })

    await act(async () => {
      render(<AssetsTree />)
    })
  })

  it('renders the tree correctly with type', async () => {
    (useFilters as unknown as Mock).mockReturnValue({
      search: '',
      type: 'type',
      status: '',
      setAsset: vi.fn(),
      asset: Object.create(null),
    })

    await act(async () => {
      render(<AssetsTree />)
    })
  })

  it('renders the tree correctly with status', async () => {
    (useFilters as unknown as Mock).mockReturnValue({
      search: '',
      type: '',
      status: 'status',
      setAsset: vi.fn(),
      asset: Object.create(null),
    })

    await act(async () => {
      render(<AssetsTree />)
    })
  })

  it('calls getAssetsService and getLocationsService', async () => {
    await act(async () => {
      render(<AssetsTree />)
    })

    expect(getAssetsService).toHaveBeenCalledWith({ companyId: company.id })
    expect(getLocationsService).toHaveBeenCalledWith({ companyId: company.id })
  })

  it('sets the asset correctly', async () => {
    await act(async () => {
      render(<AssetsTree />)
    })
    const asset = assets.find((asset: { sensorType: string }) => asset.sensorType)
    const notAsset = assets.find((asset: { sensorType: string }) => !asset.sensorType)

    await act(async () => {
      screen.getByText(asset.name).click()
    })

    expect(useFilters().setAsset).toHaveBeenCalledWith({ ...asset, level: 0, children: expect.any(Array) })
    expect(useFilters().setAsset).not.toHaveBeenCalledWith(notAsset)
  })

  it('sets the attribute data-children correctly', async () => {
    await act(async () => {
      render(<AssetsTree />)
    })

    const withChildren = screen.getByTitle('Machinery house')
    expect(withChildren.firstChild).toHaveAttribute('data-children', 'true')

    const withoutChildren = screen.getByTitle('Fan - External')
    expect(withoutChildren.firstChild).toHaveAttribute('data-children', 'false')
  })

  it('sets the attribute data-active correctly', async () => {
    const asset = {
      gatewayId: 'QHI640',
      id: '656734821f4664001f296973',
      locationId: null,
      name: 'Fan - External',
      parentId: null,
      sensorId: 'MTC052',
      sensorType: 'energy',
      status: 'operating'
    };

    (useFilters as unknown as Mock).mockReturnValue({
      search: '',
      type: '',
      status: '',
      setAsset: vi.fn(),
      asset,
    })

    await act(async () => {
      render(<AssetsTree />)
    })

    const active = screen.getByRole('button', { name: new RegExp(asset.name) })
    expect(active).toHaveAttribute('data-active', 'true')

    const notActive = screen.getByRole('button', { name: /Motor H12D- Stage 1/ })
    expect(notActive).toHaveAttribute('data-active', 'false')
  })

  it('sets the attribute data-status correctly', async () => {
    await act(async () => {
      render(<AssetsTree />)
    })

    const statusAlert = screen.getByRole('button', { name: /Motor H12D- Stage 1/ })
    expect(statusAlert).toHaveAttribute('data-status', 'alert')

    const statusOperating = screen.getByRole('button', { name: /Fan - External/ })
    expect(statusOperating).toHaveAttribute('data-status', 'operating')
  })

  it('sets the attribute role correctly', async () => {
    await act(async () => {
      render(<AssetsTree />)
    })

    const div = screen.queryByRole('button', { name: /Machinery house/ })
    expect(div).toBe(null)

    const button = screen.getByRole('button', { name: /Fan - External/ })
    expect(button).toHaveAttribute('role')
  })

  it('sets the attribute tabIndex correctly', async () => {
    await act(async () => {
      render(<AssetsTree />)
    })

    const div = screen.queryByRole('button', { name: /Machinery house/ })
    expect(div).toBe(null)

    const button = await screen.findByRole('button', { name: /Fan - External/ })
    expect(button).toHaveAttribute('tabindex')
  })

  it('renders the icon correctly', async () => {
    const { container } = await act(async () => {
      return render(<AssetsTree />)
    })

    const locationItem = container.querySelector('#icon-656a07b3f2d4a1001e2144bf')
    expect(locationItem).toHaveAttribute('alt', 'location')
    const assetItem = container.querySelector('#icon-656734968eb037001e474d5a')
    expect(assetItem).toHaveAttribute('alt', 'asset')
    const componentItem = container.querySelector('#icon-656734821f4664001f296973')
    expect(componentItem).toHaveAttribute('alt', 'component')
  })
})