import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingSkeleton } from '../LoadingSkeleton'

describe('LoadingSkeleton', () => {
  it('renders with status role', () => {
    render(<LoadingSkeleton />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('is marked as busy', () => {
    render(<LoadingSkeleton />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
  })

  it('has accessible loading text', () => {
    render(<LoadingSkeleton />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})
