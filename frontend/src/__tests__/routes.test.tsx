import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

vi.mock('../hooks/useMoonPhase', () => ({
  useMoonPhase: () => ({
    data: {
      phase_name: 'Full Moon',
      illumination: 100,
      phase_emoji: '\u{1F315}',
      cat_description: 'The Full Meow-n shines bright, time for midnight zoomies',
    },
    loading: false,
    error: null,
  }),
}))

describe('Routing', () => {
  it('renders moon phase display on root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Full Moon')).toBeInTheDocument()
  })

  it('renders phase gallery on /gallery route', () => {
    render(
      <MemoryRouter initialEntries={['/gallery']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('All Moon Phases')).toBeInTheDocument()
  })
})
