import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from './index'

describe('Header', () => {
  it('renders correctly', () => {
    render(<Header />)
  })
  it('renders logo', () => {
    render(<Header />)
    const logoElement = screen.getByText(/TRACTIAN/i)
    expect(logoElement).toBeInTheDocument()
  })
})