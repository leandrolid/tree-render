import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import * as companies from '../../stores/companies.store'
import { Dashboard } from './index'

vi.spyOn(companies, 'useCompanies').mockReturnValue({
  id: '1',
  name: 'Company Name',
})

describe('Dashboard', () => {
  it('renders correctly', () => {
    render(<Dashboard />)
  })

  it('renders the company name', async () => {
    render(<Dashboard />)
    const companyNameElement = await screen.findByText(/Company Name/)
    expect(companyNameElement).toBeInTheDocument()
  })

  it('renders the QuickFilters component', () => {
    render(<Dashboard />)
    const quickFiltersElement = screen.getByText('Sensor de Energia')
    expect(quickFiltersElement).toBeInTheDocument()
  })

  it('renders the LeftColumn component', () => {
    render(<Dashboard />)
    const leftColumnElement = screen.getByPlaceholderText('Buscar Ativo ou Local')
    expect(leftColumnElement).toBeInTheDocument()
  })

  it('renders the RightColumn component', () => {
    render(<Dashboard />)
    const rightColumnElement = screen.getByText('Tipo de equipamento')
    expect(rightColumnElement).toBeInTheDocument()
  })
})