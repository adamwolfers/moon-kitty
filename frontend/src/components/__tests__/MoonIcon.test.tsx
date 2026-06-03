import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MoonIcon } from '../MoonIcon'

describe('MoonIcon', () => {
  it('renders the phase emoji', () => {
    render(<MoonIcon phaseEmoji="🌖" phaseName="Waning Gibbous" />)
    expect(screen.getByText('🌖')).toBeInTheDocument()
  })

  it('uses role="img" with accessible label', () => {
    render(<MoonIcon phaseEmoji="🌕" phaseName="Full Moon" />)
    const icon = screen.getByRole('img', { name: 'Full Moon' })
    expect(icon).toBeInTheDocument()
  })
})
