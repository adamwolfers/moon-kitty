import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../ErrorBoundary'

function ThrowingChild() {
  throw new Error('Test explosion')
}

describe('ErrorBoundary', () => {
  // Suppress React error boundary console noise during tests
  const originalError = console.error
  beforeEach(() => { console.error = vi.fn() })
  afterEach(() => { console.error = originalError })

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <p>Safe content</p>
      </ErrorBoundary>
    )
    expect(screen.getByText('Safe content')).toBeInTheDocument()
  })

  it('renders fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>
    )
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('does not render the throwing child after error', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>
    )
    expect(screen.queryByText('Test explosion')).not.toBeInTheDocument()
  })
})
