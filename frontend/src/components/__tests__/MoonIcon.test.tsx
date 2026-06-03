import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MoonIcon } from '../MoonIcon'

describe('MoonIcon', () => {
  it('renders the phase emoji', () => {
    render(<MoonIcon phaseEmoji="🌖" phaseName="Waning Gibbous" />)
    expect(screen.getByText('🌖')).toBeInTheDocument()
  })

  it('has an accessible label with the phase name', () => {
    render(<MoonIcon phaseEmoji="🌕" phaseName="Full Moon" />)
    expect(screen.getByLabelText('Full Moon')).toBeInTheDocument()
  })

  it('renders at a large size', () => {
    render(<MoonIcon phaseEmoji="🌑" phaseName="New Moon" />)
    const icon = screen.getByLabelText('New Moon')
    expect(icon).toBeInTheDocument()
  })
})
