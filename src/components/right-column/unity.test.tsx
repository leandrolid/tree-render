import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RightColumn } from '.'
import * as filters from '../../stores/filters.store'

const asset = {
  gatewayId: 'FRH546',
  id: '656a07cdc50ec9001e84167b',
  locationId: null,
  name: 'MOTOR RT COAL AF01',
  parentId: '656a07c3f2d4a1001e2144c5',
  sensorId: 'FIJ309',
  sensorType: 'vibration',
  status: 'operating'
}

vi.spyOn(filters, 'useFilters').mockReturnValue(asset)

describe('RightColumn', () => {
  it('renders correctly', () => {
    render(<RightColumn />)
  })

  it('displays the asset name and status icon', () => {
    const { container } = render(<RightColumn />)
    expect(screen.getByText(asset.name)).toBeInTheDocument()
    expect(container.querySelector('[data-icon]')).toBeInTheDocument()
  })

  it('shows the "Adicionar imagem do ativo" section', () => {
    render(<RightColumn />)
    expect(screen.getByText('Adicionar imagem do ativo')).toBeInTheDocument()
  })

  it('displays the asset type and responsible', () => {
    render(<RightColumn />)
    expect(screen.getByText('Motor Elétrico (Trifásico)')).toBeInTheDocument()
    expect(screen.getByText('Elétrica')).toBeInTheDocument()
  })

  it('displays the asset sensor and gateway', () => {
    render(<RightColumn />)
    expect(screen.getByText(asset.sensorId)).toBeInTheDocument()
    expect(screen.getByText(asset.gatewayId)).toBeInTheDocument()
  })
})