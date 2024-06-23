import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCompaniesService } from '../../services/get-companies.service'
import { useCompanies } from '../../stores/companies.store'
import { Companies } from './index'

vi.mock('../../stores/companies.store')
vi.mock('../../services/get-companies.service')

describe('Companies', () => {
  const mockCompanies = [
    { id: 1, name: 'Company 1' },
    { id: 2, name: 'Company 2' },
    { id: 3, name: 'Company 3' },
  ]

  beforeEach(() => {
    // @ts-expect-error - mockImplementation is not recognized
    useCompanies.mockReturnValue({
      companies: mockCompanies,
      setCompanies: vi.fn(),
      setCompany: vi.fn(),
      company: mockCompanies[0],
    })
  })

  it('renders the list of companies', () => {
    render(<Companies />)
    const companyButtons = screen.getAllByRole('button')
    expect(companyButtons).toHaveLength(mockCompanies.length)
    expect(screen.getByText('Company 1 Unit')).toBeInTheDocument()
    expect(screen.getByText('Company 2 Unit')).toBeInTheDocument()
    expect(screen.getByText('Company 3 Unit')).toBeInTheDocument()
  })

  it('sets the active company when a button is clicked', () => {
    render(<Companies />)
    const companyButton = screen.getByText('Company 2 Unit')
    fireEvent.click(companyButton)
    expect(useCompanies().setCompany).toHaveBeenCalledWith(mockCompanies[1])
  })

  it('calls the getCompaniesService on mount', async () => {
    render(<Companies />)
    expect(getCompaniesService).toHaveBeenCalled()
  })
})