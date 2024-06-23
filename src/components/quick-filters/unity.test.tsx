import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { QuickFilters } from '.'
import * as filters from '../../stores/filters.store'

describe('QuickFilters', () => {
  let status = ''
  let type = ''
  const toggleStatusAlert = vi.fn().mockImplementation(() => {
    status = status === 'alert' ? '' : 'alert'
  })
  const toggleTypeEnergy = vi.fn().mockImplementation(() => {
    type = type === 'energy' ? '' : 'energy'
  })

  const useFiltersSpy = vi.spyOn(filters, 'useFilters')
  useFiltersSpy.mockReturnValue({
    status,
    type,
    toggleStatusAlert,
    toggleTypeEnergy,
  })

  it('renders correctly', () => {
    render(<QuickFilters />)
  })

  it('displays the "Sensor de Energia" button', () => {
    render(<QuickFilters />)
    expect(screen.getByText('Sensor de Energia')).toBeInTheDocument()
  })

  it('displays the "Crítico" button', () => {
    render(<QuickFilters />)
    expect(screen.getByText('Crítico')).toBeInTheDocument()
  })

  it('calls toggleTypeEnergy when the "Sensor de Energia" button is clicked', () => {
    render(<QuickFilters />)
    const button = screen.getByText('Sensor de Energia')
    expect(button).toHaveAttribute('data-active', 'false')
    button.click()
    expect(toggleTypeEnergy).toHaveBeenCalled()
  })

  it('calls toggleStatusAlert when the "Crítico" button is clicked', () => {
    render(<QuickFilters />)
    const element = screen.getByText('Crítico')
    expect(element).toHaveAttribute('data-active', 'false')
    element.click()
    expect(toggleStatusAlert).toHaveBeenCalled()
  })

  it('change data-active atribute when state changes', () => {
    useFiltersSpy.mockReturnValueOnce({
      type: 'energy'
    })
    render(<QuickFilters />)
    const button = screen.getByText('Sensor de Energia')
    expect(button).toHaveAttribute('data-active', 'true')
  })
})