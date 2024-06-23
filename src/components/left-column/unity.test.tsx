import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import * as filters from '../../stores/filters.store'
import { LeftColumn } from './index'

describe('LeftColumn', () => {
  const setSearch = vi.fn()

  vi.spyOn(filters, 'useFilters').mockReturnValue({
    setSearch,
  })

  it('renders correctly', () => {
    render(<LeftColumn />)
  })
  it('renders the search input', () => {
    render(<LeftColumn />)
    const searchInput = screen.getByPlaceholderText('Buscar Ativo ou Local')
    expect(searchInput).toBeInTheDocument()
  })

  it('updates the search value when typing', () => {
    render(<LeftColumn />)
    const searchInput = screen.getByPlaceholderText<HTMLInputElement>('Buscar Ativo ou Local')
    fireEvent.change(searchInput, { target: { value: 'example' } })
    expect(searchInput.value).toBe('example')
    expect(setSearch).toHaveBeenCalledWith('example')
  })

  it('renders the search button', () => {
    render(<LeftColumn />)
    const searchButton = screen.getByRole('button')
    expect(searchButton).toBeInTheDocument()
  })
})