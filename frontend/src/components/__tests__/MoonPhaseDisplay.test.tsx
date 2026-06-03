import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MoonPhaseDisplay } from '../MoonPhaseDisplay'
import type { MoonPhaseData } from '../../types/moon'

const mockData: MoonPhaseData = {
  phase_name: 'Waning Gibbous',
  illumination: 96,
  phase_emoji: '🌖',
  cat_description: 'The moon is winding down, like a cat after a long play session',
}

describe('MoonPhaseDisplay', () => {
  it('renders the phase name', () => {
    render(<MoonPhaseDisplay data={mockData} />)
    expect(screen.getByText('Waning Gibbous')).toBeInTheDocument()
  })

  it('renders the illumination percentage', () => {
    render(<MoonPhaseDisplay data={mockData} />)
    expect(screen.getByText(/96%/)).toBeInTheDocument()
  })

  it('renders the cat description', () => {
    render(<MoonPhaseDisplay data={mockData} />)
    expect(screen.getByText(mockData.cat_description)).toBeInTheDocument()
  })

  it('renders the moon icon', () => {
    render(<MoonPhaseDisplay data={mockData} />)
    expect(screen.getByLabelText('Waning Gibbous')).toBeInTheDocument()
  })

  it('renders loading state when data is null', () => {
    render(<MoonPhaseDisplay data={null} />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders error state', () => {
    render(<MoonPhaseDisplay data={null} error="API error: 500" />)
    expect(screen.getByText(/API error: 500/)).toBeInTheDocument()
  })
})
