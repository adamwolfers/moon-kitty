import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../components/ErrorBoundary'

vi.mock('../hooks/useMoonPhase', () => ({
  useMoonPhase: () => { throw new Error('render crash') }
}))

describe('App', () => {
  const originalError = console.error
  beforeEach(() => { console.error = vi.fn() })
  afterEach(() => { console.error = originalError })

  it('is caught by ErrorBoundary when a render error occurs', async () => {
    const { default: App } = await import('../App')
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    )
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })
})
